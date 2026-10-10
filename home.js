/* Home page: house banner, spell of the day, featured character */
(function () {
  "use strict";
  const dayIndex = Math.floor(Date.now() / 86400000);

  // House banner (from last quiz result)
  const saved = WW.store.get("house", null);
  const banner = document.getElementById("house-banner");
  if (saved && HOUSES[saved] && banner) {
    banner.hidden = false;
    banner.textContent = HOUSES[saved].emoji + " Your sorted house: " + saved + ". ";
    const a = document.createElement("a");
    a.href = "quiz.html";
    a.textContent = "Retake the quiz";
    a.style.color = "var(--gold)";
    banner.appendChild(a);
  }

  // Spell of the day
  const spell = SPELLS[dayIndex % SPELLS.length];
  const spellBox = document.getElementById("spell-of-day");
  spellBox.innerHTML = "";
  const sLabel = document.createElement("p");
  sLabel.className = "spell-type";
  sLabel.textContent = "Spell of the day · " + spell.type;
  const sName = document.createElement("h3");
  sName.textContent = spell.name;
  const sText = document.createElement("p");
  sText.textContent = spell.effect;
  const sStars = document.createElement("p");
  sStars.className = "stars";
  sStars.setAttribute("aria-label", "Difficulty " + spell.difficulty + " out of 5");
  sStars.textContent = "★".repeat(spell.difficulty) + "☆".repeat(5 - spell.difficulty);
  const sLink = document.createElement("a");
  sLink.href = "spells.html";
  sLink.textContent = "Browse all spells →";
  spellBox.append(sLabel, sName, sText, sStars, sLink);

  // Featured character
  const ch = CHARACTERS[(dayIndex * 7) % CHARACTERS.length];
  const charBox = document.getElementById("char-of-day");
  charBox.innerHTML = "";
  const cLabel = document.createElement("p");
  cLabel.className = "spell-type";
  cLabel.textContent = "Featured character";
  const cName = document.createElement("h3");
  cName.textContent = ch.name;
  const badge = document.createElement("span");
  badge.className = "house-badge house-" + ch.house.toLowerCase();
  badge.textContent = ch.house;
  const cText = document.createElement("p");
  cText.textContent = ch.summary;
  const cLink = document.createElement("a");
  cLink.href = "characters.html";
  cLink.textContent = "Meet more characters →";
  charBox.append(cLabel, cName, badge, cText, cLink);
})();
