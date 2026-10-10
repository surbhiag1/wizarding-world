/* Shared helpers: nav/footer injection, safe storage, toast */
(function () {
  "use strict";

  const PAGES = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "quiz", href: "quiz.html", label: "Sorting Quiz" },
    { id: "spells", href: "spells.html", label: "Spell Book" },
    { id: "characters", href: "characters.html", label: "Characters" },
    { id: "wands", href: "wands.html", label: "Wand Shop" }
  ];

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem("ww:" + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("ww:" + key, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
    }
  };

  function toast(message) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function renderChrome() {
    const current = document.body.dataset.page;
    const header = document.getElementById("site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML =
        '<div class="container bar">' +
        '<a class="brand" href="index.html">The Wizarding World Archive</a>' +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
        '<nav class="site-nav" id="site-nav" aria-label="Main"><ul>' +
        PAGES.map(p =>
          '<li><a href="' + p.href + '"' + (p.id === current ? ' aria-current="page"' : "") + ">" + p.label + "</a></li>"
        ).join("") +
        "</ul></nav></div>";
      const btn = header.querySelector(".nav-toggle");
      const nav = header.querySelector(".site-nav");
      btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
    }
    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML =
        '<div class="container">' +
        "<p>An unofficial, non-commercial fan project built for learning and portfolio purposes.</p>" +
        "<p>Not affiliated with, endorsed by, or sponsored by the creators or publishers of the books or films. " +
        "All names and related marks belong to their respective owners.</p></div>";
    }
  }

  window.WW = { store, toast, PAGES };
  document.addEventListener("DOMContentLoaded", renderChrome);
})();
