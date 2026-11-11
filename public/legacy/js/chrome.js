const CARROT_SVG=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 100C29 100 16 74 20 52c4-20 20-28 30-28s26 8 30 28c4 22-9 48-30 48Z" fill="#F28C3C"/><path d="M34 20c8 6 13 4 16 0 4 5 9 5 16 0" fill="none" stroke="#3F8E4A" stroke-width="8" stroke-linecap="round"/><circle cx="39" cy="56" r="5" fill="#28241D"/><circle cx="61" cy="56" r="5" fill="#28241D"/><path d="M40 71c6 7 14 7 20 0" stroke="#28241D" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
function getUser() {
    try {
        return JSON.parse(localStorage.getItem("gb_user")||"null")
    }
catch {
    return null
}
}
function renderChrome(active) {
    const h=document.getElementById("site-header");
    if(h)h.innerHTML=`<header class="site-header"><div class="container header-inner">
 <a href="index.html" class="wordmark"><span class="mark">🧺</span> GreenBasket</a>
 <nav class="main-nav"><a href="index.html" class="${active==="home"?"active":""}">Home</a><a href="shop.html" class="${active==="shop"?"active":""}">Shop</a><a href="recipes.html" class="${active==="recipes"?"active":""}">Recipes</a></nav>
 <div class="header-tools"><div class="search-box search-large"><span>⌕</span><input id="global-search" type="text" placeholder="Search groceries, rice, paneer, recipes…"></div>
 <button class="icon-btn" id="notify-btn" aria-label="Notifications">🔔<span class="notify-dot"></span></button>
 <button class="profile-chip" id="profile-btn">👤 <span id="profile-name">Account</span></button>
 <button class="icon-btn" id="cart-open-btn">🧺<span class="cart-count" id="cart-count">0</span></button></div>
 </div></header>
 <div class="notification-pop" id="notification-pop"><b>Fresh item available</b><span>Fresh chicken, coriander and idli-dosa batter are available today.</span></div>`;
    const f=document.getElementById("site-footer");
    if(f)f.innerHTML=`<footer class="site-footer"><div class="container footer-grid"><div><a class="wordmark" href="index.html">🧺 GreenBasket</a><p>Fresh Indian groceries, fair prices and familiar recipes delivered to your door.</p></div><div><h4>Shop</h4><ul><li><a href="shop.html">Fresh produce</a></li><li><a href="shop.html">Rice & staples</a></li><li><a href="recipes.html">Indian recipes</a></li></ul></div><div><h4>Customer care</h4><ul><li><a href="profile.html">Address & payment</a></li><li><a href="profile.html">My profile</a></li><li id="admin-footer-link"><a href="admin.html">Admin dashboard</a></li></ul></div><div><h4>Popular regions</h4><p>Andhra Pradesh · Telangana · Tamil Nadu · Karnataka · Kerala · North India</p></div></div><div class="footer-bottom">© 2026 GreenBasket India · Demo storefront</div></footer>`;
    const c=document.getElementById("cart-drawer-root");
    if(c)c.innerHTML=`<div class="cart-scrim" id="cart-scrim"></div><aside class="cart-drawer" id="cart-drawer"><div class="cart-head"><div><b>Your basket</b><small>Review quantities before checkout</small></div><button class="modal-close" id="cart-close-btn">✕</button></div><div id="cart-items" class="cart-items"></div><div id="cart-foot" class="cart-foot"></div></aside>`;
    const b=document.getElementById("carrot-root");
    if(b)b.innerHTML=`<button class="basil-btn" id="basil-btn" aria-label="Recipe helper">${CARROT_SVG}</button><div class="basil-hint" id="basil-hint">Need a recipe?</div><section class="basil-panel" id="basil-panel"><div class="basil-head"><b>Recipe Helper</b><button id="basil-close">✕</button></div><div class="basil-body" id="basil-body"></div><div class="basil-chips" id="basil-chips"></div><div class="basil-input"><input id="basil-input" placeholder="e.g. Telugu dinner under ₹300"><button id="basil-send">Send</button></div></section>`;
    const user=getUser(), nameEl=document.getElementById("profile-name");
    if(nameEl)nameEl.textContent=user?.role === "admin" ? "Admin" : (user?.name?.split(" ")[0]||"Account");
    if(user?.role !== "admin") document.getElementById("admin-footer-link")?.remove();
    document.getElementById("profile-btn")?.addEventListener("click",()=>{ if(user?.role === "admin") location.href="admin.html"; else location.href=user?"profile.html":"auth.html"; });
    document.getElementById("notify-btn")?.addEventListener("click",()=>document.getElementById("notification-pop")?.classList.toggle("show"));
    const savedNotice=JSON.parse(localStorage.getItem("gb_notification")||"null");
    if(savedNotice) {
        const np=document.getElementById("notification-pop");
        if(np)np.innerHTML=`<b>${savedNotice.title}</b><span>${savedNotice.message}</span>`;
    }
document.getElementById("global-search")?.addEventListener("keydown",e=> {
    if(e.key==="Enter"&&e.target.value.trim())location.href="shop.html?q="+encodeURIComponent(e.target.value.trim())
}
);
}
function addClickRipple(btn,e) {
    const r=document.createElement("span");
    r.className="ripple";
    const d=Math.max(btn.clientWidth,btn.clientHeight);
    r.style.width=r.style.height=d+"px";
    r.style.left=e.offsetX-d/2+"px";
    r.style.top=e.offsetY-d/2+"px";
    btn.appendChild(r);
    setTimeout(()=>r.remove(),600)
}
function flyToCart() {
}
function showToast(msg,icon="✓") {
    let t=document.getElementById("gb-toast");
    if(!t) {
        t=document.createElement("div");
        t.id="gb-toast";
        t.className="toast";
        document.body.appendChild(t)
    }
t.textContent=`${icon}  ${msg}`;
t.classList.add("show");
clearTimeout(window.__toast);
window.__toast=setTimeout(()=>t.classList.remove("show"),2400)
}
