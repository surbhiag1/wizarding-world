/* Character explorer: search, house filter, detail modal */
(function () {
  "use strict";
  const grid = document.getElementById("char-grid");
  const search = document.getElementById("char-search");
  const chipBox = document.getElementById("house-chips");
  const count = document.getElementById("char-count");
  const empty = document.getElementById("char-empty");
  const modal = document.getElementById("char-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");

  const houses = ["All", "Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff", "Staff"];
  let activeHouse = "All";
  let lastTrigger = null;

  houses.forEach(h => {
    const b = document.createElement("button");
    b.className = "chip";
    b.type = "button";
    b.textContent = h;
    b.setAttribute("aria-pressed", String(h === activeHouse));
    b.addEventListener("click", () => {
      activeHouse = h;
      chipBox.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c.textContent === h)));
      render();
    });
    chipBox.appendChild(b);
  });

  function initials(name) {
    return name.split(" ").map(p => p[0]).slice(0, 2).join("");
  }

  function card(c) {
    const cls = "house-" + c.house.toLowerCase();
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card char-card " + cls;

    const av = document.createElement("div");
    av.className = "avatar";
    av.setAttribute("aria-hidden", "true");
    av.textContent = initials(c.name);

    const h = document.createElement("h3");
    h.textContent = c.name;
    const role = document.createElement("p");
    role.className = "role";
    role.textContent = c.role;
    const badge = document.createElement("span");
    badge.className = "house-badge";
    badge.textContent = c.house;

    btn.append(av, h, role, badge);
    btn.addEventListener("click", () => openModal(c, btn));
    return btn;
  }

  function openModal(c, trigger) {
    lastTrigger = trigger;
    modalBody.innerHTML = "";
    modalBody.className = "house-" + c.house.toLowerCase();

    const av = document.createElement("div");
    av.className = "avatar";
    av.setAttribute("aria-hidden", "true");
    av.textContent = initials(c.name);
    const h = document.createElement("h2");
    h.id = "modal-name";
    h.textContent = c.name;
    const badge = document.createElement("span");
    badge.className = "house-badge";
    badge.textContent = c.house;
    const role = document.createElement("p");
    role.className = "role muted";
    role.style.fontStyle = "italic";
    role.textContent = c.role;
    const p = document.createElement("p");
    p.textContent = c.summary;
    const ul = document.createElement("ul");
    ul.className = "traits";
    c.traits.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });

    modalBody.append(av, h, badge, role, p, ul);
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function closeModal() {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
    if (lastTrigger) lastTrigger.focus();
  }
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); }); // backdrop click

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = CHARACTERS.filter(c =>
      (activeHouse === "All" || c.house === activeHouse) &&
      (!q || (c.name + " " + c.role + " " + c.traits.join(" ") + " " + c.summary).toLowerCase().includes(q))
    );
    grid.innerHTML = "";
    list.forEach(c => grid.appendChild(card(c)));
    empty.hidden = list.length > 0;
    count.textContent = list.length + " of " + CHARACTERS.length + " characters";
  }

  search.addEventListener("input", render);
  render();
})();
