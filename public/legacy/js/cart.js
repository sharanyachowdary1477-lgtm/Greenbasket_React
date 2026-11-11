const CART_KEY="greenbasket_cart_v2";
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)||"{}")
    }
catch {
    return {
    }
}
}
function saveCart(c) {
    localStorage.setItem(CART_KEY,JSON.stringify(c));
    updateCartCount();
    renderCartDrawer()
}
function cartCount() {
    return Object.values(getCart()).reduce((a,b)=>a+b,0)
}
function cartTotal() {
    return Object.entries(getCart()).reduce((s,[id,q])=>s+(PRODUCT_MAP[id]?.price||0)*q,0)
}
function addToCart(id,qty=1) {
    const c=getCart();
    c[id]=(c[id]||0)+qty;
    saveCart(c)
}
function setQty(id,qty) {
    const c=getCart();
    if(qty<=0)delete c[id];
    else c[id]=qty;
    saveCart(c)
}
function clearCart() {
    saveCart( {
    }
)
}
function updateCartCount() {
    const e=document.getElementById("cart-count");
    if(e) {
        e.textContent=cartCount();
        e.classList.toggle("show",cartCount()>0)
    }
}
function renderCartDrawer() {
    const root=document.getElementById("cart-items"),foot=document.getElementById("cart-foot");
    if(!root||!foot)return;
    const c=getCart(),ids=Object.keys(c);
    if(!ids.length) {
        root.innerHTML=`<div class="cart-empty"><div class="big">🧺</div><p><b>Your basket is empty.</b><br>Add fresh groceries to begin.</p></div>`;
        foot.innerHTML="";
        return
    }
root.innerHTML=ids.map(id=> {
    const p=PRODUCT_MAP[id];
    return `<div class="cart-item"><img class="thumb-img" src="${p.image}" alt=""><div class="info"><b>${p.name}</b><span>${money(p.price)} · ${p.qtyLabel}</span></div><div class="qty-stepper"><button data-dec="${id}">−</button><span>${c[id]}</span><button data-inc="${id}">+</button></div></div>`
}
).join("");
foot.innerHTML=`<div class="cart-row"><span>Items</span><span>${cartCount()}</span></div><div class="cart-row total"><span>Estimated total</span><span>${money(cartTotal())}</span></div><button class="btn btn-primary btn-block" id="checkout-btn">Checkout</button><button class="btn btn-ghost btn-block" id="clear-cart-btn" style="margin-top:8px">Empty basket</button>`;
root.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>setQty(b.dataset.inc,(getCart()[b.dataset.inc]||0)+1));
root.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>setQty(b.dataset.dec,(getCart()[b.dataset.dec]||0)-1));
document.getElementById("clear-cart-btn").onclick=clearCart;
document.getElementById("checkout-btn").onclick=openCheckout;
}
function openCart() {
    document.getElementById("cart-drawer")?.classList.add("open");
    document.getElementById("cart-scrim")?.classList.add("open")
}
function closeCart() {
    document.getElementById("cart-drawer")?.classList.remove("open");
    document.getElementById("cart-scrim")?.classList.remove("open")
}
function openCheckout() {
    if(!cartCount())return;
    const u=getUser();
    if(!u) {
        showToast("Please login or register first","!");
        location.href="auth.html";
        return
    }
let modal=document.getElementById("checkout-modal");
if(!modal) {
    modal=document.createElement("div");
    modal.id="checkout-modal";
    modal.className="modal-backdrop";
    document.body.appendChild(modal)
}
const a=u.address|| {
}
;
modal.innerHTML=`<div class="modal checkout-modal"><button class="modal-close" id="co-close">✕</button><div class="eyebrow-note">Secure checkout</div><h2>Delivery & payment</h2><p>Set your delivery address and choose how you want to pay.</p>
 <div class="checkout-grid"><label>Full name<input id="co-name" value="${u.name||""}"></label><label>Phone<input id="co-phone" value="${u.phone||""}" placeholder="10-digit mobile"></label><label class="wide">Address<input id="co-address" value="${a.line||""}" placeholder="House no, street, area"></label><label>City<input id="co-city" value="${a.city||""}" placeholder="e.g. Markapur"></label><label>State<input id="co-state" value="${a.state||"Andhra Pradesh"}"></label><label>PIN code<input id="co-pin" value="${a.pin||""}" placeholder="6 digits"></label></div>
 <div class="pay-options"><b>Payment method</b><div class="pay-grid"><label><input type="radio" name="pay" value="UPI" checked> UPI <small>Google Pay / PhonePe / BHIM</small></label><label><input type="radio" name="pay" value="CARD"> Card <small>Debit / Credit Card</small></label><label><input type="radio" name="pay" value="CASH"> Cash <small>Cash on delivery</small></label></div></div>
 <div class="modal-total"><b>Order total</b><strong>${money(cartTotal())}</strong></div><button class="btn btn-primary btn-block" id="place-order">Place order</button></div>`;
modal.classList.add("open");
document.getElementById("co-close").onclick=()=>modal.classList.remove("open");
document.getElementById("place-order").onclick=()=> {
    const address= {
        line:document.getElementById("co-address").value,city:document.getElementById("co-city").value,state:document.getElementById("co-state").value,pin:document.getElementById("co-pin").value
    }
;
const user= {
    ...getUser(),name:document.getElementById("co-name").value,phone:document.getElementById("co-phone").value,address,payment:document.querySelector('input[name="pay"]:checked').value
}
;
localStorage.setItem("gb_user",JSON.stringify(user));
const orders=JSON.parse(localStorage.getItem("gb_orders")||"[]");
orders.push( {
    id:"GB"+Date.now(),customer:user.name,total:cartTotal(),payment:user.payment,address,date:new Date().toLocaleString("en-IN"),status:"Confirmed"
}
);
localStorage.setItem("gb_orders",JSON.stringify(orders));
clearCart();
modal.classList.remove("open");
closeCart();
showToast("Order confirmed — thank you!","✓");
}
;
}
function wireCartEvents() {
    document.getElementById("cart-open-btn")?.addEventListener("click",openCart);
    document.getElementById("cart-close-btn")?.addEventListener("click",closeCart);
    document.getElementById("cart-scrim")?.addEventListener("click",closeCart);
    updateCartCount();
    renderCartDrawer()
}
