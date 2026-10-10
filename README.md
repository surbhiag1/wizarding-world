<div align="center">

# 🪄 The Wizarding World Archive

### Get sorted. Flip a spell. Meet the magic folk. Let a wand choose you.

A fan-made, five-page wizarding world experience, handcrafted in **pure HTML, CSS and vanilla JavaScript**.
No frameworks. No build step. No dependencies. Just a little magic.

![HTML5](https://img.shields.io/badge/HTML5-7b1e2e?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-4a2c1a?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-b8923f?style=for-the-badge&logo=javascript&logoColor=white)
![No Dependencies](https://img.shields.io/badge/dependencies-zero-6b4630?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/license-MIT-7b1e2e?style=for-the-badge)

**[✨ Live Demo](https://github.com/surbhiag1/wizarding-world)** · **[🐛 Report a Bug](../../issues)** · **[💡 Suggest a Feature](../../issues)**

</div>

---

## 📜 What is this?

Imagine an old library at midnight: candlelight, worn parchment, a faint smell of ink. This project is that, as a website.

It started as a portfolio piece to show what you can build with **nothing but the web platform itself**, and grew into a small interactive world with a quiz that has opinions, a spell book you can actually play with, and a wand shop where the wand does the choosing.

> 🕯️ **Fun fact:** Every visual in this project, from the floating candles to the flip cards to the wands, is drawn with CSS. The site itself needs no image files at all.

---

## 🖼️ Screenshots

> *Screenshots coming soon.* See [Adding screenshots](#-adding-screenshots) below to add your own.

<!--
After adding your images to the screenshots/ folder, delete the line above
and remove the comment markers around this block.

| Home | Sorting Quiz |
| --- | --- |
| ![Home page with floating candles](screenshots/home.png) | ![Sorting quiz question](screenshots/quiz.png) |

| Spell Book | Character Explorer |
| --- | --- |
| ![Spell cards, one flipped](screenshots/spells.png) | ![Character grid with house filters](screenshots/characters.png) |

| Wand Shop | On mobile |
| --- | --- |
| ![Wand designer with live preview](screenshots/wands.png) | ![Mobile layout](screenshots/mobile.png) |
-->

---

## ✨ The Five Chambers

### 🏰 Home
A candlelit hero greets you, with a **spell of the day** and a **featured character** that change every day, and a banner that remembers which house you were sorted into.

### 🎩 Sorting Quiz
Ten questions, four answers each, and no wrong choices. Behind the scenes it uses **weighted scoring**: every answer gives 2 points to one house and 1 point to a runner-up, so one odd answer can't sway the result. Ties are broken fairly, you can go back and change answers, and you get a full score breakdown at the end.

### 📖 Spell Book
Thirty spells on **3D flip cards**. Search by name or effect, filter by type, sort by difficulty, and tap the ♥ to save favourites. They're remembered next time you visit. Everything works from the keyboard too.

### 🧙 Character Explorer
Twenty-two witches, wizards and magical folk. Filter by house, search by name, role or trait, and open any card for a closer look in a native `<dialog>` pop-up.

### 🪄 Wand Shop
Two ways to find your wand:
- **The Finder:** answer three questions and get a wood-and-core pairing matched to your personality.
- **The Designer:** pick the wood, core, length and flexibility, and watch the wand redraw itself live with a glow that matches its core. Add it to your basket and the total is worked out in Galleons and Sickles.

*(Nothing is actually sold. The only thing you're spending is time.)*

---

## 🧪 Under the Hood

For the curious and the code reviewers:

| Idea | How it works |
| --- | --- |
| **No images at all** | Candles, flames, flip cards, crests and wands are all CSS (gradients, `clip-path`, keyframes, 3D transforms). |
| **Works offline from `file://`** | Data lives in plain `.js` files that set `window.X`, so there are no `fetch()` calls and no CORS issues. Double-click and go. |
| **DRY layout** | One `main.js` injects the shared navigation and footer into every page. |
| **Safe persistence** | A tiny `localStorage` wrapper with `try/catch`, so the site still works in private browsing or with storage blocked. |
| **Daily rotation** | Spell and character of the day are picked from the current day number, so everyone gets the same pick, with no server involved. |
| **Weighted quiz engine** | Primary and secondary house weights plus a tie-breaker, in about 40 lines. |
| **Accessible by design** | Skip link, ARIA labels and live regions, visible focus rings, keyboard-operable cards, and a `prefers-reduced-motion` mode that turns animations off. |
| **Responsive** | Fluid grids and a collapsible mobile menu that adapts down to phone widths. |

---

## 🚀 Quick Start

**The 5-second way:** download the project and double-click `index.html`.

**With a local server:**

```bash
git clone https://github.com/YOUR-USERNAME/wizarding-world.git
cd wizarding-world
python3 -m http.server 8000
```

Then open **http://localhost:8000**.

**Deploy it free with GitHub Pages:** *Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.* Your site goes live in a minute or two.

---

## 🗂️ Project Map

```
wizarding-world/
├── index.html          🏰 Home
├── quiz.html           🎩 Sorting Quiz
├── spells.html         📖 Spell Book
├── characters.html     🧙 Character Explorer
├── wands.html          🪄 Wand Shop
├── css/
│   └── styles.css      Theme, layout and every component
├── js/
│   ├── main.js         Shared nav/footer, storage helper, toast
│   ├── home.js         Daily picks + saved-house banner
│   ├── quiz.js         Quiz flow and scoring
│   ├── spells.js       Search, filter, flip cards, favourites
│   ├── characters.js   Search, house filter, modal
│   └── wands.js        Finder, designer, basket
├── data/               All the content, easy to edit
│   ├── spells.js
│   ├── characters.js
│   ├── quiz.js
│   └── wands.js
└── screenshots/        Your images go here
```

---

## 🎨 Make It Your Own

All the content lives in `data/`, so you can extend the archive without touching any logic.

| I want to… | Edit… |
| --- | --- |
| Add a spell | `data/spells.js` → `{ name, type, difficulty (1-5), effect }`. New types show up in the filter automatically. |
| Add a character | `data/characters.js` → pick a house: `Gryffindor`, `Slytherin`, `Ravenclaw`, `Hufflepuff` or `Staff`. |
| Rewrite the quiz | `data/quiz.js` → each answer is `h: [primaryHouse, secondaryHouse]`. |
| Add a wand wood or core | `data/wands.js` → give it a hex `color`, a `price` in sickles, and a short `note`. |
| Re-colour the whole site | The CSS variables at the top of `css/styles.css` (`--burgundy`, `--brown`, `--parchment`, `--gold`). |

---

## 📸 Adding Screenshots

1. Run the site, open DevTools (`F12`), and switch on the device toolbar (`Ctrl/Cmd + Shift + M`).
2. Set the size to **1440 × 900** for desktop and **390 × 844** for mobile.
3. Open the Command Menu (`Ctrl/Cmd + Shift + P`) and run **Capture full size screenshot**.
4. Save the images in `screenshots/` as `home.png`, `quiz.png`, `spells.png`, `characters.png`, `wands.png` and `mobile.png`.
5. Remove the `<!--` and `-->` markers around the screenshot table above, and delete the "coming soon" line.

💡 *Capture a moment worth seeing: a flipped spell card, an open character pop-up, a finished quiz result.*

---

## 🔮 Roadmap

- [ ] 🧪 Potions and magical creatures pages
- [ ] 🌙 "Midnight library" dark theme toggle
- [ ] 📜 Downloadable wand certificate
- [ ] ✅ Unit tests for the quiz scoring
- [ ] 🌍 Multi-language support

Ideas and pull requests are welcome.

---

## 🎓 What This Project Demonstrates

- Building a multi-page site with a clean, scalable file structure
- Separating **data from presentation from behaviour**
- State management and persistence without a framework
- Accessible, responsive, motion-aware UI
- Pure-CSS illustration and animation
- Writing and documenting a project for others to use

---

## ⚖️ Disclaimer

This is an **unofficial, non-commercial fan project** made for learning and portfolio purposes. It is not affiliated with, endorsed by, or sponsored by the creators, publishers or studios behind the books and films. All names and related marks belong to their respective owners. No official artwork, logos, crests or text passages are used; all descriptions are written in original words and all visuals are made with CSS.



## 📄 License

The code is released under the [MIT License](LICENSE). The licence covers the code in this repository only and grants no rights to any third-party names, characters or trademarks.


---

<div align="center">

*If you enjoyed exploring, a ⭐ on the repo is the best spell of all.*

</div>
