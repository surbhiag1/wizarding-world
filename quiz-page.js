/* Sorting quiz */
(function () {
  "use strict";
  const root = document.getElementById("quiz");
  const total = QUIZ.length;
  let index = 0;
  let picks = new Array(total).fill(null); // chosen answer index per question

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) Object.assign(node, props);
    (children || []).forEach(c => node.append(c));
    return node;
  }

  function renderQuestion() {
    root.innerHTML = "";
    const pct = Math.round((index / total) * 100);

    const bar = el("div", { className: "progress", role: "progressbar" }, [el("span")]);
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", String(total));
    bar.setAttribute("aria-valuenow", String(index));
    bar.firstChild.style.width = pct + "%";

    const label = el("p", { className: "progress-label", textContent: "Question " + (index + 1) + " of " + total });
    const q = el("h2", { textContent: QUIZ[index].q });
    q.setAttribute("tabindex", "-1");

    const list = el("ul", { className: "answers" });
    QUIZ[index].a.forEach((ans, i) => {
      const btn = el("button", { className: "answer", type: "button", textContent: ans.t });
      if (picks[index] === i) btn.classList.add("selected");
      btn.addEventListener("click", () => choose(i));
      list.appendChild(el("li", null, [btn]));
    });

    const back = el("button", { className: "btn secondary small", type: "button", textContent: "← Back" });
    back.disabled = index === 0;
    back.addEventListener("click", () => { index--; renderQuestion(); });

    root.append(bar, label, q, list, el("div", { className: "quiz-nav" }, [back]));
    q.focus({ preventScroll: true });
  }

  function choose(i) {
    picks[index] = i;
    // brief highlight, then advance
    root.querySelectorAll(".answer").forEach((b, n) => b.classList.toggle("selected", n === i));
    setTimeout(() => {
      if (index < total - 1) { index++; renderQuestion(); }
      else renderResult();
    }, 280);
  }

  function score() {
    const s = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };
    picks.forEach((p, qi) => {
      if (p === null) return;
      const [main, second] = QUIZ[qi].a[p].h;
      s[main] += 2;
      s[second] += 1;
    });
    return s;
  }

  function renderResult() {
    const s = score();
    const max = Math.max(...Object.values(s));
    const leaders = Object.keys(s).filter(h => s[h] === max);
    // Tie-break: the house chosen as "main" most often, then the first leader.
    let winner = leaders[0];
    if (leaders.length > 1) {
      const mains = {};
      picks.forEach((p, qi) => { const m = QUIZ[qi].a[p].h[0]; mains[m] = (mains[m] || 0) + 1; });
      winner = leaders.sort((a, b) => (mains[b] || 0) - (mains[a] || 0))[0];
    }
    WW.store.set("house", winner);

    const info = HOUSES[winner];
    root.innerHTML = "";
    const wrap = el("div", { className: "result " + info.cls });
    wrap.append(
      el("div", { className: "crest", textContent: info.emoji }),
      el("p", { className: "spell-type", textContent: "The hat has decided" }),
      el("h2", { textContent: winner }),
      el("p", { className: "lead", textContent: info.tagline }),
      el("p", { textContent: info.description })
    );

    const traits = el("ul", { className: "traits", style: "justify-content:center" });
    info.traits.forEach(t => traits.appendChild(el("li", { textContent: t })));
    wrap.appendChild(traits);

    const bars = el("div", { className: "scorebars" });
    const maxPossible = total * 3;
    Object.keys(s).sort((a, b) => s[b] - s[a]).forEach(h => {
      const row = el("div", { className: "scorebar " + HOUSES[h].cls });
      const fill = el("div", { className: "fill" });
      fill.style.width = Math.round((s[h] / maxPossible) * 100 * 1.6) + "%";
      row.append(el("span", { textContent: h }), el("div", { className: "track" }, [fill]), el("span", { textContent: String(s[h]) }));
      bars.appendChild(row);
    });
    wrap.appendChild(bars);

    const actions = el("div", { style: "display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap" });
    const retake = el("button", { className: "btn", type: "button", textContent: "Retake the Quiz" });
    retake.addEventListener("click", () => { picks = new Array(total).fill(null); index = 0; renderQuestion(); });
    const meet = el("a", { className: "btn secondary", href: "characters.html", textContent: "Meet the " + winner + " characters" });
    actions.append(retake, meet);
    wrap.appendChild(actions);

    root.appendChild(wrap);
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderQuestion();
})();
