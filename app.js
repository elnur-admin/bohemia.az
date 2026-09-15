(() => {
  const dynamicStyle = document.createElement("style");
  dynamicStyle.textContent = `.brand{font:700 26px 'Playfair Display',serif;color:var(--ink);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;display:inline-flex;align-items:baseline}.brand span{letter-spacing:.12em}.brand i{color:var(--terra);font-weight:700;letter-spacing:-.04em;text-transform:lowercase;font-size:1.18em;margin-left:1px}.hero-image img{animation:bohemiaZoom 14s ease-in-out infinite alternate}.space-picker{max-width:1216px;margin:0 auto;padding:68px 32px 0;display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:center}.space-picker h2{font:700 42px/1.05 'Playfair Display';letter-spacing:-.04em;margin:0}.space-picker>div>p:not(.eyebrow){color:#627064;line-height:1.6;max-width:520px}.space-options{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.space-options button{border:1px solid var(--line);background:#fffaf4;padding:23px 16px;text-align:left;color:var(--ink);font:600 19px 'Playfair Display';cursor:pointer;transition:all .2s}.space-options button:hover,.space-options button.active{background:var(--ink);border-color:var(--ink);color:#fffaf4;transform:translateY(-2px)}.reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}.reveal.visible{opacity:1;transform:none}.wa-float{transition:transform .2s}.wa-float:hover{transform:scale(1.09)}@keyframes bohemiaZoom{from{transform:scale(1)}to{transform:scale(1.035)}}.product-grid .card{display:flex;flex-direction:column}.product-grid .card-body{display:flex;flex-direction:column;flex:1}.product-grid .card-bottom{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:nowrap}.product-grid .price,.product-grid .order-btn{white-space:nowrap;flex-shrink:0}.review-grid blockquote{display:flex;flex-direction:column;min-height:190px}.review-grid blockquote footer{margin-top:auto;min-height:28px;display:flex;align-items:flex-end}.story{margin-bottom:94px}@media(max-width:800px){.space-picker{padding:50px 18px 0;grid-template-columns:1fr;gap:25px}.space-picker h2{font-size:36px}}`;
  document.head.append(dynamicStyle);
  const paletteStyle = document.createElement("style");
  paletteStyle.textContent = `:root{--cream:#e7ded2;--sand:#d6c4b3}.brand{color:#18231b!important;letter-spacing:.11em!important;font-size:24px!important;position:relative}.brand:after{content:'✦';color:var(--terra);font:11px 'DM Sans';letter-spacing:0;margin-left:7px;vertical-align:middle}.brand span,.brand i{font:inherit!important;color:inherit!important;letter-spacing:inherit!important;margin:0!important}.cart-toggle{border:1px solid var(--line);background:transparent;color:var(--ink);padding:10px 13px;font:600 12px 'DM Sans';cursor:pointer}.cart-toggle span{display:inline-grid;place-items:center;min-width:19px;height:19px;border-radius:50%;background:var(--terra);color:white;font-size:10px;margin-left:5px}.cart-row{display:grid;grid-template-columns:52px 1fr auto;gap:10px;padding:14px 0;border-bottom:1px solid var(--line)}.cart-row img{width:52px;height:52px;object-fit:cover}.cart-row h3{font:600 16px 'Playfair Display';margin:0 0 5px}.cart-row p{margin:0;font-size:12px;color:#657064}.cart-actions{display:flex;align-items:center;gap:8px;margin-top:8px}.cart-actions button{border:1px solid var(--line);background:#fff;padding:3px 8px;cursor:pointer}.cart-total{display:flex;justify-content:space-between;font:600 18px 'Playfair Display';margin:18px 0}.cart-empty{padding:15px 0;color:#657064}.cart-pop{position:fixed;z-index:99;pointer-events:none;background:var(--terra);color:#fffaf4;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:bold;animation:cartPop .75s ease-out forwards}@keyframes cartPop{0%{opacity:0;transform:translate(-50%,-50%) scale(.5)}20%{opacity:1;transform:translate(-50%,-70%) scale(1.1)}100%{opacity:0;transform:translate(-50%,-220%) scale(.7)}}`;
  document.head.append(paletteStyle);
  const layoutStyle = document.createElement("style");
  layoutStyle.textContent = `.card-body{display:flex;flex-direction:column;min-height:178px}.card-body>p{height:38px!important;overflow:hidden;margin-bottom:8px!important}.card-bottom{margin-top:auto!important;min-height:38px}.card-bottom .price,.card-bottom .order-btn{white-space:nowrap}@media(max-width:800px){.card-body{min-height:126px}.card-body>p{display:none}}`;
  document.head.append(layoutStyle);
  const cfg = window.STORE_CONFIG || {};
  const phone = cfg.whatsappNumber || "994XXXXXXXXX";
  const display = cfg.whatsappDisplay || "+994 XX XXX XX XX";
  const grid = document.querySelector("#product-grid"), dialog = document.querySelector("#order-dialog");
  const esc = (value) => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
  const wa = (message = "Salam! Bohemia kolleksiyası və məkanım üçün seçim haqqında məlumat almaq istəyirəm.") => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = display);
  document.querySelectorAll("[data-wa]").forEach(el => { el.href = wa(); el.target = "_blank"; el.rel = "noopener"; });
  document.querySelector("#year").textContent = new Date().getFullYear();
  if (cfg.googleAnalyticsId && /^G-[A-Z0-9]+$/.test(cfg.googleAnalyticsId)) {
    const s = document.createElement("script"); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${cfg.googleAnalyticsId}`; document.head.append(s);
    window.dataLayer = window.dataLayer || []; window.gtag = (...args) => dataLayer.push(args); gtag("js", new Date()); gtag("config", cfg.googleAnalyticsId);
  }
  let products = [];
  let cart = JSON.parse(localStorage.getItem("bohemia-cart") || "[]");
  const cartDialog = document.querySelector("#cart-dialog");
  const card = p => `<article class="card"><div class="card-image"><img loading="lazy" src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.closest('.card-image').style.background='#e9ded0';this.remove()"><span class="tag">${esc(p.tag)}</span></div><div class="card-body"><div class="rating">★★★★★ <span>${p.sold ? esc(p.sold) + " satılıb" : "Temu-da satılıb"}</span></div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="card-bottom"><strong class="price">${p.price.toFixed(2)} ${cfg.currency || "₼"}</strong><button class="order-btn" data-add="${esc(p.id)}">Səbətə əlavə et</button></div></div></article>`;
  const render = filter => { grid.innerHTML = products.filter(p => filter === "all" || p.tag === filter).map(card).join(""); };
  document.querySelector(".filters").addEventListener("click", e => { if (!e.target.matches("button")) return; document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active")); e.target.classList.add("active"); render(e.target.dataset.filter); });
  grid.addEventListener("click", e => { const id = e.target.dataset.add; if (!id) return; addToCart(products.find(p => p.id === id), e.target); });
  document.querySelector(".close").onclick = () => dialog.close();
  document.querySelector("#cart-toggle").onclick = () => { renderCart(); cartDialog.showModal(); };
  document.querySelector("#cart-close").onclick = () => cartDialog.close();
  function addToCart(product, source) {
    const found = cart.find(item => item.id === product.id);
    if (found) found.qty += 1; else cart.push({...product, qty:1});
    saveCart();
    if (source) { const rect = source.getBoundingClientRect(); const pop = document.createElement("span"); pop.className = "cart-pop"; pop.textContent = "✦"; pop.style.left = (rect.left + rect.width / 2) + "px"; pop.style.top = (rect.top + 8) + "px"; document.body.append(pop); pop.addEventListener("animationend", () => pop.remove()); }
  }
  function saveCart() {
    localStorage.setItem("bohemia-cart", JSON.stringify(cart));
    document.querySelector("#cart-count").textContent = cart.reduce((sum,item) => sum + item.qty, 0);
  }
  function renderCart() {
    const root = document.querySelector("#cart-content");
    if (!cart.length) { root.innerHTML = '<h2>Səbətiniz boşdur</h2><p class="cart-empty">Bəyəndiyiniz dekorları səbətə əlavə edin.</p>'; return; }
    const total = cart.reduce((sum,item) => sum + item.price * item.qty, 0);
    root.innerHTML = '<h2>Səbətiniz</h2>' + cart.map(item => '<div class="cart-row"><img src="' + esc(item.image) + '" alt="' + esc(item.name) + '"><div><h3>' + esc(item.name) + '</h3><p>' + item.price.toFixed(2) + ' ' + (cfg.currency || "₼") + '</p><div class="cart-actions"><button data-cart-change="-1" data-cart-id="' + esc(item.id) + '">−</button><b>' + item.qty + '</b><button data-cart-change="1" data-cart-id="' + esc(item.id) + '">+</button></div></div><strong>' + (item.price * item.qty).toFixed(2) + ' ' + (cfg.currency || "₼") + '</strong></div>').join('') + '<div class="cart-total"><span>Cəmi</span><span>' + total.toFixed(2) + ' ' + (cfg.currency || "₼") + '</span></div><button id="cart-checkout" class="button">WhatsApp ilə sifariş et</button>';
  }
  document.querySelector("#cart-content").addEventListener("click", e => {
    const id = e.target.dataset.cartId;
    if (id) {
      const item = cart.find(x => x.id === id); item.qty += Number(e.target.dataset.cartChange);
      if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
      saveCart(); renderCart(); return;
    }
    if (e.target.id === "cart-checkout") {
      const lines = cart.map(x => '• ' + x.name + ' × ' + x.qty + ' — ' + (x.price*x.qty).toFixed(2) + ' ' + (cfg.currency || "₼")).join("%0A");
      const total = cart.reduce((sum,x) => sum + x.price*x.qty, 0);
      window.open(wa('Salam! Səbətimdəki məhsulları sifariş etmək istəyirəm.%0A%0A' + lines + '%0A%0ACəmi: ' + total.toFixed(2) + ' ' + (cfg.currency || "₼")), "_blank", "noopener");
    }
  });
  saveCart();

  function openOrder(p) {
    document.querySelector("#order-content").innerHTML = `<h2>${esc(p.name)}</h2><p><b>${p.price.toFixed(2)} ${cfg.currency || "₼"}</b> — sifariş məlumatınızı yazın, sizə WhatsApp-da cavab verək.</p><form id="order-form" novalidate><label>Adınız *</label><input name="customer_name" maxlength="80" required autocomplete="name"><label>Telefon *</label><input name="phone" maxlength="20" required inputmode="tel" placeholder="050 000 00 00"><label>Qeyd (istəyə bağlı)</label><textarea name="note" maxlength="400" placeholder="Rəng, say və ya sualınız"></textarea><button class="button" type="submit">WhatsApp ilə davam et</button><p class="notice">Məlumat yalnız sifarişlə bağlı əlaqə üçün istifadə olunur.</p></form>`;
    dialog.showModal();
    document.querySelector("#order-form").addEventListener("submit", async e => {
      e.preventDefault(); const f = new FormData(e.currentTarget); const customerName = f.get("customer_name").trim(), customerPhone = f.get("phone").trim(), note = f.get("note").trim();
      if (customerName.length < 2 || !/^[0-9+()\-\s]{7,20}$/.test(customerPhone)) { alert("Zəhmət olmasa adınızı və düzgün telefon nömrəsini yazın."); return; }
      const order = { product_id:p.id, product_name:p.name, unit_price:p.price, customer_name:customerName, customer_phone:customerPhone, note, created_at:new Date().toISOString() };
      if (cfg.supabaseUrl && cfg.supabaseAnonKey) { try { await fetch(`${cfg.supabaseUrl}/rest/v1/orders`, {method:"POST", headers:{"apikey":cfg.supabaseAnonKey,"Authorization":`Bearer ${cfg.supabaseAnonKey}`,"Content-Type":"application/json","Prefer":"return=minimal"}, body:JSON.stringify(order)}); } catch (_) {} }
      const msg = `Salam! Sifariş vermək istəyirəm.%0A%0AMəhsul: ${p.name}%0AQiymət: ${p.price.toFixed(2)} ${cfg.currency || "₼"}%0AAd: ${customerName}%0ATelefon: ${customerPhone}${note ? `%0AQeyd: ${note}` : ""}`;
      window.open(wa(msg), "_blank", "noopener"); dialog.close();
    });
  }
  document.querySelectorAll("[data-space]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-space]").forEach(b => b.classList.remove("active")); button.classList.add("active");
    const space = button.dataset.space; const copy = document.querySelector("#space-copy"); const link = document.querySelector("#space-wa");
    copy.textContent = `${space} üçün ən uyğun bohem detallarını birlikdə seçək — WhatsApp-da yazın.`;
    if (link) link.href = wa(`Salam! Bohemia-dan ${space} məkanım üçün dekor seçimi haqqında danışmaq istəyirəm.`);
  }));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  fetch("data/products.json").then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => { products = data; render("all"); }).catch(() => { grid.innerHTML = "<p>Məhsullar yüklənmədi. Zəhmət olmasa səhifəni yeniləyin.</p>"; });
})();








