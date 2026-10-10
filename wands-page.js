/* Wand shop: wand finder, wand builder with live preview, basket (localStorage) */
(function () {
  "use strict";

  // ---------- Currency ----------
  function money(sickles) {
    const g = Math.floor(sickles / 17);
    const s = sickles % 17;
    const parts = [];
    if (g) parts.push(g + (g === 1 ? " Galleon" : " Galleons"));
    if (s) parts.push(s + (s === 1 ? " Sickle" : " Sickles"));
    return parts.length ? parts.join(", ") : "0 Galleons";
  }

  // ---------- Builder ----------
  const woodSel = document.getElementById("wood");
  const coreSel = document.getElementById("core");
  const lenSel = document.getElementById("length");
  const flexSel = document.getElementById("flex");
  const woodNote = document.getElementById("wood-note");
  const coreNote = document.getElementById("core-note");
  const priceEl = document.getElementById("price");
  const wand = document.getElementById("wand");
  const holder = document.getElementById("wand-holder");

  WOODS.forEach((w, i) => woodSel.appendChild(new Option(w.name, i)));
  CORES.forEach((c, i) => coreSel.appendChild(new Option(c.name, i)));
  for (let l = 9; l <= 14; l += 0.5) lenSel.appendChild(new Option(l + '"', l));
  lenSel.value = "11";
  FLEX.forEach((f, i) => flexSel.appendChild(new Option(f, i)));
  flexSel.value = "2";

  function current() {
    const wood = WOODS[+woodSel.value];
    const core = CORES[+coreSel.value];
    const length = parseFloat(lenSel.value);
    const flex = FLEX[+flexSel.value];
    // Craftsmanship surcharge for very long wands.
    const surcharge = length > 12.5 ? 17 : 0;
    return { wood: wood.name, core: core.name, length, flex, price: wood.price + core.price + surcharge };
  }

  function updatePreview() {
    const wood = WOODS[+woodSel.value];
    const core = CORES[+coreSel.value];
    wand.style.setProperty("--wood", wood.color);
    wand.style.setProperty("--len", lenSel.value);
    holder.style.setProperty("--core", core.color);
    woodNote.textContent = wood.note;
    coreNote.textContent = core.note;
    priceEl.textContent = money(current().price);
  }
  [woodSel, coreSel, lenSel, flexSel].forEach(s => s.addEventListener("change", updatePreview));

  // ---------- Basket ----------
  const listEl = document.getElementById("cart-list");
  const emptyEl = document.getElementById("cart-empty");
  const totalEl = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear");
  let cart = WW.store.get("cart", []);

  function renderCart() {
    listEl.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price;
      const li = document.createElement("li");
      const info = document.createElement("span");
      info.textContent = item.wood + " & " + item.core + ", " + item.length + '", ' + item.flex.toLowerCase() + " (" + money(item.price) + ")";
      const rm = document.createElement("button");
      rm.className = "remove";
      rm.type = "button";
      rm.textContent = "×";
      rm.setAttribute("aria-label", "Remove " + item.wood + " wand from basket");
      rm.addEventListener("click", () => { cart.splice(i, 1); WW.store.set("cart", cart); renderCart(); });
      li.append(info, rm);
      listEl.appendChild(li);
    });
    emptyEl.hidden = cart.length > 0;
    totalEl.textContent = money(total);
    clearBtn.disabled = cart.length === 0;
  }

  document.getElementById("add").addEventListener("click", () => {
    cart.push(current());
    WW.store.set("cart", cart);
    renderCart();
    WW.toast("Wand added to your basket");
  });
  clearBtn.addEventListener("click", () => { cart = []; WW.store.set("cart", cart); renderCart(); });

  // ---------- Wand finder ----------
  const finder = document.getElementById("finder");
  const answers = new Array(FINDER.length).fill(null);

  function buildFinder() {
    finder.innerHTML = "";
    FINDER.forEach((step, qi) => {
      const wrap = document.createElement("div");
      wrap.className = "field finder-step";
      const label = document.createElement("label");
      label.setAttribute("for", "finder-" + qi);
      label.textContent = step.q;
      const sel = document.createElement("select");
      sel.id = "finder-" + qi;
      sel.appendChild(new Option("Choose…", ""));
      step.a.forEach((a, ai) => sel.appendChild(new Option(a.t, ai)));
      sel.addEventListener("change", () => { answers[qi] = sel.value === "" ? null : +sel.value; });
      wrap.append(label, sel);
      finder.appendChild(wrap);
    });
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.type = "button";
    btn.textContent = "Find my wand";
    btn.addEventListener("click", runFinder);
    const out = document.createElement("div");
    out.id = "finder-out";
    out.setAttribute("aria-live", "polite");
    finder.append(btn, out);
  }

  function top(tally, fallback) {
    const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    return entries.length ? entries[0][0] : fallback;
  }

  function runFinder() {
    const out = document.getElementById("finder-out");
    if (answers.some(a => a === null)) {
      out.innerHTML = "";
      const p = document.createElement("p");
      p.className = "finder-result";
      p.textContent = "Please answer every question so the wand can get to know you.";
      out.appendChild(p);
      return;
    }
    const woodTally = {}, coreTally = {};
    answers.forEach((ai, qi) => {
      const a = FINDER[qi].a[ai];
      a.wood.forEach((w, n) => { woodTally[w] = (woodTally[w] || 0) + (n === 0 ? 2 : 1); });
      a.core.forEach((c, n) => { coreTally[c] = (coreTally[c] || 0) + (n === 0 ? 2 : 1); });
    });
    const wood = top(woodTally, WOODS[0].name);
    const core = top(coreTally, CORES[0].name);

    out.innerHTML = "";
    const box = document.createElement("div");
    box.className = "finder-result";
    const h = document.createElement("h3");
    h.textContent = wood + " with " + core;
    const p = document.createElement("p");
    p.textContent = "This pairing suits you best. Load it into the designer to adjust the details.";
    const use = document.createElement("button");
    use.className = "btn small";
    use.type = "button";
    use.textContent = "Use this wand";
    use.addEventListener("click", () => {
      woodSel.value = WOODS.findIndex(w => w.name === wood);
      coreSel.value = CORES.findIndex(c => c.name === core);
      updatePreview();
      document.getElementById("builder-title").scrollIntoView({ behavior: "smooth" });
    });
    box.append(h, p, use);
    out.appendChild(box);
  }

  buildFinder();
  updatePreview();
  renderCart();
})();
