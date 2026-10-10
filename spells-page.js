/* Spell book: search, filter, sort, flip cards, favourites */
(function () {
  "use strict";
  const grid = document.getElementById("spell-grid");
  const search = document.getElementById("spell-search");
  const typeSel = document.getElementById("spell-type");
  const sortSel = document.getElementById("spell-sort");
  const favToggle = document.getElementById("fav-toggle");
  const count = document.getElementById("spell-count");
  const empty = document.getElementById("spell-empty");

  let favs = new Set(WW.store.get("favSpells", []));
  let favsOnly = false;

  const types = ["All types"].concat(Array.from(new Set(SPELLS.map(s => s.type))).sort());
  types.forEach((t, i) => {
    const o = document.createElement("option");
    o.value = i === 0 ? "" : t;
    o.textContent = t;
    typeSel.appendChild(o);
  });

  function saveFavs() { WW.store.set("favSpells", Array.from(favs)); }

  function card(spell) {
    const art = document.createElement("article");
    art.className = "spell";

    const flip = document.createElement("div");
    flip.className = "flip";
    flip.tabIndex = 0;
    flip.setAttribute("role", "button");
    flip.setAttribute("aria-pressed", "false");
    flip.setAttribute("aria-label", spell.name + ", press to reveal what it does");

    const inner = document.createElement("div");
    inner.className = "flip-inner";

    const front = document.createElement("div");
    front.className = "face front";
    front.innerHTML =
      '<span class="spell-type"></span><h3 class="spell-name"></h3><span class="stars"></span><span class="hint">Click to flip</span>';
    front.querySelector(".spell-type").textContent = spell.type;
    front.querySelector(".spell-name").textContent = spell.name;
    const stars = front.querySelector(".stars");
    stars.textContent = "★".repeat(spell.difficulty) + "☆".repeat(5 - spell.difficulty);
    stars.setAttribute("aria-label", "Difficulty " + spell.difficulty + " out of 5");

    const back = document.createElement("div");
    back.className = "face back";
    const bh = document.createElement("h3");
    bh.textContent = spell.name;
    const bp = document.createElement("p");
    bp.textContent = spell.effect;
    back.append(bh, bp);

    inner.append(front, back);
    flip.appendChild(inner);

    function toggleFlip() {
      const on = flip.classList.toggle("is-flipped");
      flip.setAttribute("aria-pressed", String(on));
    }
    flip.addEventListener("click", toggleFlip);
    flip.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleFlip(); }
    });

    const fav = document.createElement("button");
    fav.className = "fav";
    fav.type = "button";
    fav.textContent = "♥";
    const isFav = favs.has(spell.name);
    fav.setAttribute("aria-pressed", String(isFav));
    fav.setAttribute("aria-label", (isFav ? "Remove " : "Save ") + spell.name + (isFav ? " from favourites" : " to favourites"));
    fav.addEventListener("click", () => {
      if (favs.has(spell.name)) { favs.delete(spell.name); WW.toast("Removed " + spell.name); }
      else { favs.add(spell.name); WW.toast("Saved " + spell.name); }
      saveFavs();
      render();
    });

    art.append(flip, fav);
    return art;
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const type = typeSel.value;
    let list = SPELLS.filter(s =>
      (!type || s.type === type) &&
      (!favsOnly || favs.has(s.name)) &&
      (!q || s.name.toLowerCase().includes(q) || s.effect.toLowerCase().includes(q))
    );
    const sort = sortSel.value;
    list = list.slice().sort((a, b) =>
      sort === "easy" ? a.difficulty - b.difficulty || a.name.localeCompare(b.name) :
      sort === "hard" ? b.difficulty - a.difficulty || a.name.localeCompare(b.name) :
      a.name.localeCompare(b.name)
    );

    grid.innerHTML = "";
    list.forEach(s => grid.appendChild(card(s)));
    empty.hidden = list.length > 0;
    count.textContent = list.length + " of " + SPELLS.length + " spells";
  }

  search.addEventListener("input", render);
  typeSel.addEventListener("change", render);
  sortSel.addEventListener("change", render);
  favToggle.addEventListener("click", () => {
    favsOnly = !favsOnly;
    favToggle.setAttribute("aria-pressed", String(favsOnly));
    render();
  });

  render();
})();
