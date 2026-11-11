document.addEventListener("DOMContentLoaded", () => {
    let mode = "login";
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const nameWrap = document.getElementById("name-wrap");
    const form = document.getElementById("auth-form");
    const submit = document.getElementById("auth-submit");
    const sub = document.getElementById("auth-sub");
    const title = document.getElementById("auth-title");
    const roleWrap = document.getElementById("role-wrap");
    const roleSelect = document.getElementById("auth-role");

    function toast(message, icon = "!") {
        let t = document.getElementById("gb-toast");
        if (!t) { t = document.createElement("div"); t.id = "gb-toast"; t.className = "toast"; document.body.appendChild(t); }
        t.textContent = `${icon}  ${message}`;
        t.classList.add("show");
        clearTimeout(window.__authToast);
        window.__authToast = setTimeout(() => t.classList.remove("show"), 2400);
    }

    function setMode(next) {
        mode = next;
        loginTab.classList.toggle("active", mode === "login");
        registerTab.classList.toggle("active", mode === "register");
        nameWrap.classList.toggle("hidden", mode === "login");
        roleWrap.classList.toggle("hidden", mode !== "login");
        submit.textContent = mode === "login" ? "Login" : "Create account";
        sub.textContent = mode === "login" ? "Welcome back" : "Create your GreenBasket account";
        title.textContent = mode === "login" ? "Welcome back" : "Join GreenBasket";
    }

    loginTab.onclick = () => setMode("login");
    registerTab.onclick = () => setMode("register");

    form.onsubmit = event => {
        event.preventDefault();
        const email = document.getElementById("auth-email").value.trim().toLowerCase();
        const password = document.getElementById("auth-password").value;
        const name = document.getElementById("auth-name").value.trim();
        const phone = document.getElementById("auth-phone").value.trim();
        const selectedRole = roleSelect.value;

        if (mode === "login") {
            if (selectedRole === "admin") {
                if (email !== "admin@greenbasket.in" || password !== "admin123") {
                    toast("Invalid admin email or password");
                    return;
                }
                const admin = { name: "GreenBasket Admin", email, role: "admin" };
                localStorage.setItem("gb_user", JSON.stringify(admin));
                location.href = "admin.html";
                return;
            }

            const users = JSON.parse(localStorage.getItem("gb_users") || "[]");
            const user = users.find(u => u.email === email && u.password === password && u.role !== "admin");
            if (!user) { toast("Invalid user email or password"); return; }
            localStorage.setItem("gb_user", JSON.stringify(user));
            // Normal users always enter the customer home dashboard.
            location.href = "index.html";
            return;
        }

        if (!name || password.length < 6 || !email) { toast("Enter your name, email and a 6+ character password"); return; }
        const users = JSON.parse(localStorage.getItem("gb_users") || "[]");
        if (users.some(u => u.email === email)) { toast("Account already exists. Please login."); return; }
        const user = { name, email, phone, password, role: "user", address: {}, payment: "UPI" };
        users.push(user);
        localStorage.setItem("gb_users", JSON.stringify(users));
        localStorage.setItem("gb_user", JSON.stringify(user));
        toast("Account created successfully", "✓");
        setTimeout(() => location.href = "index.html", 450);
    };

    setMode("login");
});
