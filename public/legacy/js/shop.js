let shopState = { cat: "all", q: "", maxPrice: 800, sort: "featured" };
function applyShopFilters() {
    let list = PRODUCTS.slice();
    if (shopState.cat !== "all") list = list.filter(p => p.cat === shopState.cat);
    if (shopState.q) { const q = shopState.q.toLowerCase(); list = list.filter(p => `${p.name} ${p.region || ""} ${p.unit}`.toLowerCase().includes(q)); }
    list = list.filter(p => p.price <= shopState.maxPrice);
    if (shopState.sort === "price-asc") list.sort((a,b) => a.price-b.price);
    if (shopState.sort === "price-desc") list.sort((a,b) => b.price-a.price);
    if (shopState.sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));
    return list;
}
function renderFilterRail() {
    const root = document.getElementById("filter-rail");
    if (!root) return;
    const counts = { all: PRODUCTS.length };
    CATEGORIES.forEach(c => counts[c.id] = PRODUCTS.filter(p => p.cat === c.id).length);
    const cats = [{id:"all", name:"All groceries", icon:"🧺"}, ...CATEGORIES];
    root.innerHTML = `<h3>Categories</h3><div class="filter-list">${cats.map(c => `<div class="filter-item ${shopState.cat===c.id?"active":""}" data-cat="${c.id}"><span>${c.icon} ${c.name}</span><span class="count">${counts[c.id] || 0}</span></div>`).join("")}</div><h3>Maximum price</h3><input type="range" id="price-range" min="20" max="800" step="10" value="${shopState.maxPrice}"><div class="range-label">Up to ₹<span id="price-range-val">${shopState.maxPrice}</span></div>`;
    root.querySelectorAll("[data-cat]").forEach(el => el.onclick = () => { shopState.cat = el.dataset.cat; renderShop(); });
    root.querySelector("#price-range").oninput = e => { shopState.maxPrice = Number(e.target.value); renderShop(); };
}
function renderShop() {
    renderFilterRail();
    const list = applyShopFilters();
    document.getElementById("result-count").textContent = `${list.length} items`;
    renderProductGrid(document.getElementById("product-grid"), list);
}
document.addEventListener("DOMContentLoaded", () => {
    renderChrome("shop"); wireCartEvents(); wireBasilEvents();
    const params = new URLSearchParams(location.search);
    shopState.q = params.get("q") || ""; shopState.cat = params.get("cat") || "all";
    document.getElementById("global-search").value = shopState.q;
    document.getElementById("shop-search").value = shopState.q;
    document.getElementById("shop-search").oninput = e => { shopState.q = e.target.value; renderShop(); };
    document.getElementById("sort-select").onchange = e => { shopState.sort = e.target.value; renderShop(); };
    renderShop();
});
