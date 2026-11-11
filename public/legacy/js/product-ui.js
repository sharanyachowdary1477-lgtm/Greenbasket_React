function money(v) {
    return `₹${Number(v).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function productCardHTML(p) {
    return `<article class="product-card" data-id="${p.id}">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
        <div class="product-media"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=900&q=85';"><span class="qty-badge">${p.qtyLabel || p.unit}</span></div>
        <div class="product-name">${p.name}</div>
        <div class="product-unit">${p.unit}</div>
        <div class="product-foot"><span class="price-tag">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name}">+</button></div>
    </article>`;
}

function renderProductGrid(root, products) {
    if (!root) return;
    root.innerHTML = products.length
        ? products.map(productCardHTML).join("")
        : `<div class="cart-empty" style="grid-column:1/-1"><div class="big">🧺</div><p><b>No products match.</b><br>Try another search.</p></div>`;
    root.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", e => {
        const p = PRODUCT_MAP[btn.dataset.add];
        if (!p) return;
        addToCart(p.id, 1);
        addClickRipple(btn, e);
        flyToCart(btn);
        showToast(`${p.name} added to basket`, "✓");
    }));
}
