function renderRecipes() {
    const root = document.getElementById("recipe-grid");
    if (!root) return;
    root.innerHTML = RECIPES.map(r => `
        <article class="recipe-card" data-open="${r.id}">
            <div class="recipe-media"><img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=1000&q=85';"><span class="recipe-icon">${r.icon}</span><small>${r.region}</small></div>
            <div class="recipe-body">
                <div class="recipe-meta"><span>⏱ ${r.time}</span><span>🍽 ${r.serves} servings</span></div>
                <h3>${r.name}</h3>
                <p>Regional favourite made with familiar Indian ingredients.</p>
                <div class="recipe-cta"><span class="recipe-cost">${money(recipeCost(r))}</span><button class="btn btn-ghost btn-sm">View recipe</button></div>
            </div>
        </article>`).join("");
    root.querySelectorAll("[data-open]").forEach(card => card.addEventListener("click", () => openRecipe(card.dataset.open)));
}

function openRecipe(id) {
    const r = RECIPES.find(x => x.id === id);
    const modal = document.getElementById("recipe-modal");
    const backdrop = document.getElementById("recipe-modal-backdrop");
    if (!r || !modal || !backdrop) return;
    modal.innerHTML = `
        <button class="modal-close" id="modal-close-btn">✕</button>
        <div class="recipe-meta"><span>📍 ${r.region}</span><span>⏱ ${r.time}</span><span>🍽 ${r.serves} servings</span></div>
        <h2>${r.icon} ${r.name}</h2>
        <p>Ingredients are priced for the current GreenBasket catalogue.</p>
        <div class="ingredient-list">
            ${r.items.map(i => {
                const product = PRODUCT_MAP[i.id];
                if (!product) return "";
                return `<div class="ingredient-row"><label><input type="checkbox" checked data-id="${i.id}" data-qty="${i.qty}"><img src="${product.image}" alt=""> <span>${product.name}</span></label><span>${i.qty} × ${money(product.price)} = ${money(product.price * i.qty)}</span></div>`;
            }).join("")}
        </div>
        <h4>Method</h4>
        <ol class="steps-list">${r.steps.map(step => `<li>${step}</li>`).join("")}</ol>
        <div class="modal-total"><b>Estimated ingredients</b><strong>${money(recipeCost(r))}</strong></div>
        <button class="btn btn-primary btn-block" id="add-recipe-items">Add selected ingredients to basket</button>`;
    backdrop.classList.add("open");
    document.getElementById("modal-close-btn").onclick = () => backdrop.classList.remove("open");
    document.getElementById("add-recipe-items").onclick = () => {
        modal.querySelectorAll('input[type="checkbox"]:checked').forEach(input => addToCart(input.dataset.id, Number(input.dataset.qty)));
        backdrop.classList.remove("open");
        showToast(`${r.name} ingredients added to basket`, "✓");
    };
}

document.addEventListener("DOMContentLoaded", () => {
    renderChrome("recipes");
    wireCartEvents();
    wireBasilEvents();
    renderRecipes();
    const id = new URLSearchParams(location.search).get("open");
    if (id) openRecipe(id);
    document.getElementById("recipe-modal-backdrop")?.addEventListener("click", e => {
        if (e.target.id === "recipe-modal-backdrop") e.currentTarget.classList.remove("open");
    });
});
