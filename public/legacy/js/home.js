function renderCategoryStrip() {
    const r=document.getElementById("cat-strip");
    if(r)r.innerHTML=CATEGORIES.map(c=>`<a class="cat-card" href="shop.html?cat=${c.id}"><div class="bubble" style="background:${c.tint}">${c.icon}</div><b>${c.name}</b></a>`).join("")
}
function renderFeatured() {
    const r=document.getElementById("featured-grid");
    if(r)renderProductGrid(r,PRODUCTS.filter(p=>p.tag).slice(0,8))
}
function renderRecipeTeaser() {
    const r=document.getElementById("recipe-teaser");
    if(r)r.innerHTML=RECIPES.slice(0,4).map(x=>`<article class="recipe-card"><div class="recipe-media"><span>${x.icon}</span><small>${x.region}</small></div><div class="recipe-body"><div class="recipe-meta"><span>⏱ ${x.time}</span><span>🍽 ${x.serves} servings</span></div><h3>${x.name}</h3><p>Authentic ${x.region} style recipe with easy-to-find ingredients.</p><div class="recipe-cta"><span class="recipe-cost">${money(recipeCost(x))}</span><a class="section-link" href="recipes.html?open=${x.id}">View recipe →</a></div></div></article>`).join("")
}
function recipeCost(r) {
    return r.items.reduce((s,i)=>s+(PRODUCT_MAP[i.id]?.price||0)*i.qty,0)
}
document.addEventListener("DOMContentLoaded",()=> {
    renderChrome("home");
    wireCartEvents();
    wireBasilEvents();
    renderCategoryStrip();
    renderFeatured();
    renderRecipeTeaser()
}
);
