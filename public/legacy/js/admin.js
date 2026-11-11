document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();
    if (!user || user.role !== "admin") { location.href = "auth.html"; return; }
    renderChrome("account");

    const users = () => JSON.parse(localStorage.getItem("gb_users") || "[]");
    const orders = () => JSON.parse(localStorage.getItem("gb_orders") || "[]");
    const adminProducts = () => JSON.parse(localStorage.getItem("gb_products") || "[]");
    const adminRecipes = () => JSON.parse(localStorage.getItem("gb_recipes") || "[]");

    function renderStats() {
        const os = orders();
        const sum = method => os.filter(o => o.payment === method).reduce((s, o) => s + Number(o.total || 0), 0);
        document.getElementById("stat-products").textContent = PRODUCTS.length;
        document.getElementById("stat-recipes").textContent = RECIPES.length;
        document.getElementById("stat-users").textContent = users().length;
        document.getElementById("stat-orders").textContent = os.length;
        document.getElementById("stat-sales").textContent = money(os.reduce((s,o) => s + Number(o.total || 0), 0));
        document.getElementById("stat-upi").textContent = money(sum("UPI"));
        document.getElementById("stat-card").textContent = money(sum("CARD"));
        document.getElementById("stat-cash").textContent = money(sum("CASH"));
    }

    function renderAdminLists() {
        const ps = adminProducts();
        document.getElementById("admin-products").innerHTML = ps.length ? ps.map(p => `<div class="admin-list-row"><img class="thumb-img" src="${p.image}" alt=""><div><b>${p.name}</b><small>${p.unit} · ${money(p.price)}</small></div><button class="btn btn-ghost btn-sm" data-delete-product="${p.id}">Delete</button></div>`).join("") : "<p>No custom products yet.</p>";
        const rs = adminRecipes();
        document.getElementById("admin-recipes").innerHTML = rs.length ? rs.map(r => `<div class="admin-list-row"><div><b>${r.icon || "🍲"} ${r.name}</b><small>${r.region} · ${r.time} · ${r.serves} servings</small></div><button class="btn btn-ghost btn-sm" data-delete-recipe="${r.id}">Delete</button></div>`).join("") : "<p>No custom recipes yet.</p>";
        document.querySelectorAll("[data-delete-product]").forEach(btn => btn.onclick = () => { const next = ps.filter(p => p.id !== btn.dataset.deleteProduct); localStorage.setItem("gb_products", JSON.stringify(next)); location.reload(); });
        document.querySelectorAll("[data-delete-recipe]").forEach(btn => btn.onclick = () => { const next = rs.filter(r => r.id !== btn.dataset.deleteRecipe); localStorage.setItem("gb_recipes", JSON.stringify(next)); location.reload(); });
    }

    function renderOrders() {
        const os = orders().slice().reverse();
        const total = os.reduce((s,o) => s + Number(o.total || 0), 0);
        const avg = os.length ? total / os.length : 0;
        document.getElementById("sales-summary").innerHTML = `<div><b>${money(total)}</b><span>Total revenue</span></div><div><b>${os.length}</b><span>Total orders</span></div><div><b>${money(avg)}</b><span>Average order</span></div><div><b>${os.filter(o=>o.status==="Confirmed").length}</b><span>Confirmed</span></div>`;
        document.getElementById("admin-orders").innerHTML = os.length ? os.map(o => `<div class="order-row"><b>${o.id}</b><span>${o.customer}</span><span>${o.payment}</span><strong>${money(o.total)}</strong><small>${o.status} · ${o.date} · ${o.address?.city || ""}</small></div>`).join("") : "<p>No orders yet.</p>";
    }

    document.getElementById("product-form").onsubmit = e => {
        e.preventDefault();
        const name = document.getElementById("product-name").value.trim();
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-5);
        const item = { id, name, cat: document.getElementById("product-cat").value, price: Number(document.getElementById("product-price").value), unit: document.getElementById("product-unit").value.trim(), qtyLabel: document.getElementById("product-unit").value.trim(), tag: document.getElementById("product-tag").value.trim(), image: document.getElementById("product-image").value.trim() };
        const list = adminProducts(); list.push(item); localStorage.setItem("gb_products", JSON.stringify(list));
        e.target.reset(); showToast("Item added to shop", "✓"); setTimeout(() => location.reload(), 350);
    };

    document.getElementById("recipe-form").onsubmit = e => {
        e.preventDefault();
        const name = document.getElementById("recipe-name").value.trim();
        const items = document.getElementById("recipe-items").value.split(",").map(x => x.trim()).filter(Boolean).map(x => { const [id, qty] = x.split(":"); return { id: id.trim(), qty: Number(qty) || 1 }; }).filter(x => PRODUCT_MAP[x.id]);
        if (!items.length) { showToast("Use valid product IDs for ingredients", "!"); return; }
        const recipe = { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-5), name, region: document.getElementById("recipe-region").value.trim(), icon: document.getElementById("recipe-icon").value.trim() || "🍲", time: document.getElementById("recipe-time").value.trim(), serves: Number(document.getElementById("recipe-serves").value), keywords: name.toLowerCase().split(/\s+/), steps: document.getElementById("recipe-steps").value.split("|").map(s => s.trim()).filter(Boolean), items };
        const list = adminRecipes(); list.push(recipe); localStorage.setItem("gb_recipes", JSON.stringify(list));
        e.target.reset(); showToast("Recipe added", "✓"); setTimeout(() => location.reload(), 350);
    };

    document.getElementById("save-notify").onclick = () => {
        localStorage.setItem("gb_notification", JSON.stringify({ title: document.getElementById("n-title").value.trim(), message: document.getElementById("n-message").value.trim() }));
        showToast("Notification published", "✓");
    };
    document.getElementById("admin-logout").onclick = () => { localStorage.removeItem("gb_user"); location.href = "auth.html"; };

    renderStats();
    renderAdminLists();
    renderOrders();
});
