document.addEventListener("DOMContentLoaded",()=> {
    const u=getUser();
    if(!u) {
        location.href="auth.html";
        return
    }
renderChrome("account");
wireCartEvents();
wireBasilEvents();
document.getElementById("p-name").value=u.name||"";
document.getElementById("p-phone").value=u.phone||"";
document.getElementById("p-email").value=u.email||"";
document.getElementById("p-payment").value=u.payment||"UPI";
document.getElementById("p-line").value=u.address?.line||"";
document.getElementById("p-city").value=u.address?.city||"";
document.getElementById("p-state").value=u.address?.state||"Andhra Pradesh";
document.getElementById("p-pin").value=u.address?.pin||"";
document.getElementById("side-name").textContent=u.name;
document.getElementById("side-email").textContent=u.email;
document.getElementById("logout").onclick=()=> {
    localStorage.removeItem("gb_user");
    location.href="index.html"
}
;
document.getElementById("profile-form").onsubmit=e=> {
    e.preventDefault();
    const n= {
        ...u,name:document.getElementById("p-name").value,phone:document.getElementById("p-phone").value,payment:document.getElementById("p-payment").value,address: {
            line:document.getElementById("p-line").value,city:document.getElementById("p-city").value,state:document.getElementById("p-state").value,pin:document.getElementById("p-pin").value
        }
}
;
localStorage.setItem("gb_user",JSON.stringify(n));
if(n.role!=="admin") {
    const us=JSON.parse(localStorage.getItem("gb_users")||"[]");
    const i=us.findIndex(x=>x.email===n.email);
    if(i>=0)us[i]=n;
    localStorage.setItem("gb_users",JSON.stringify(us))
}
showToast("Profile saved","✓")
}
;
const orders=JSON.parse(localStorage.getItem("gb_orders")||"[]").filter(o=>o.customer===u.name).slice(-5).reverse();
document.getElementById("orders").innerHTML=orders.length?orders.map(o=>`<div class="order-row"><b>${o.id}</b><span>${o.date}</span><strong>${money(o.total)}</strong><small>${o.payment} · ${o.status}</small></div>`).join(""):"<p>No orders yet. Your confirmed orders will appear here.</p>"
}
);
