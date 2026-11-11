const BASIL_CHIPS = ["Telugu dinner under ₹300", "Quick South Indian breakfast", "Andhra chicken curry", "Budget vegetarian meal"];
let basilBudget = null;

function recipeCost(r) {
    return r.items.reduce((sum, item) => sum + (PRODUCT_MAP[item.id]?.price || 0) * item.qty, 0);
}
function basilAppend(html, cls = "bot") {
    const body = document.getElementById("basil-body");
    if (!body) return;
    const el = document.createElement("div");
    el.className = `b-msg ${cls}`;
    el.innerHTML = html;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
}
function extractBudget(text) {
    const match = text.match(/₹\s?(\d+)/);
    if (match) return Number(match[1]);
    if (/budget|cheap|affordable/i.test(text)) return 300;
    return null;
}
function sendBasilMessage(text) {
    if (!text.trim()) return;
    basilAppend(text, "me");
    setTimeout(() => {
        const budget = extractBudget(text);
        if (budget) basilBudget = budget;
        let matches = RECIPES.filter(r => r.keywords.some(k => text.toLowerCase().includes(k))).sort((a,b) => recipeCost(a) - recipeCost(b));
        if (!matches.length) matches = [...RECIPES].sort((a,b) => recipeCost(a) - recipeCost(b));
        if (budget) matches = matches.filter(r => recipeCost(r) <= budget).slice(0, 2);
        else matches = matches.slice(0, 2);
        basilAppend(`${budget ? `For a budget of <b>₹${budget}</b>, ` : ""}try these Indian favourites:`);
        matches.forEach(r => {
            const el = document.createElement("div");
            el.className = "b-recipe-card";
            el.innerHTML = `<b>${r.icon} ${r.name}</b><small>${r.region} · ${r.time}</small><span>Estimated ${money(recipeCost(r))}</span><button class="btn btn-dark btn-sm">Add ingredients</button>`;
            el.querySelector("button").onclick = () => {
                r.items.forEach(i => addToCart(i.id, i.qty));
                showToast(`${r.name} ingredients added`, "✓");
            };
            document.getElementById("basil-body")?.appendChild(el);
        });
    }, 450);
}
function wireBasilEvents() {
    const chips = document.getElementById("basil-chips");
    if (chips) chips.innerHTML = BASIL_CHIPS.map(x => `<button class="chip">${x}</button>`).join("");
    chips?.querySelectorAll(".chip").forEach(x => x.onclick = () => sendBasilMessage(x.textContent));
    document.getElementById("basil-btn")?.addEventListener("click", () => document.getElementById("basil-panel")?.classList.toggle("open"));
    document.getElementById("basil-close")?.addEventListener("click", () => document.getElementById("basil-panel")?.classList.remove("open"));
    const input = document.getElementById("basil-input");
    document.getElementById("basil-send")?.addEventListener("click", () => { sendBasilMessage(input.value); input.value = ""; });
    input?.addEventListener("keydown", e => { if (e.key === "Enter") { sendBasilMessage(input.value); input.value = ""; } });
}
