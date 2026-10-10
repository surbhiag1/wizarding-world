/* Wand shop data. Wand lore is a fan-made, original interpretation. Prices in sickles (17 sickles = 1 galleon). */
window.WOODS = [
  { name: "Holly", color: "#8b5a3c", price: 70, note: "Said to favour bold owners who are working through something difficult." },
  { name: "Elder", color: "#a58a63", price: 130, note: "Rare and demanding. Thought to bond only with unusually capable witches and wizards." },
  { name: "Yew", color: "#7a4a30", price: 110, note: "A wand with a fierce reputation, and a very loyal one." },
  { name: "Vine", color: "#6b4a2b", price: 85, note: "Often choosing owners with hidden depths and big ideas." },
  { name: "Willow", color: "#9c7a52", price: 75, note: "Graceful and healing in spirit. Likes owners who are unsure of their own strength." },
  { name: "Oak", color: "#6c4a2e", price: 80, note: "Sturdy and dependable, loyal to those with a strong sense of purpose." },
  { name: "Ash", color: "#b59b72", price: 65, note: "Said to stay true to its owner, and to hate being passed around." },
  { name: "Cherry", color: "#8a3f2e", price: 120, note: "Rare and graceful, linked to wizards with a lot of self-control." },
  { name: "Hazel", color: "#a1764a", price: 70, note: "Sensitive, and thought to react to its owner's moods." },
  { name: "Ebony", color: "#2b1d15", price: 100, note: "Dark and sleek, supposedly suited to independent, single-minded owners." }
];

window.CORES = [
  { name: "Phoenix feather", color: "#ff8a2a", price: 150, note: "Rare, versatile and independent. Capable of surprising its owner." },
  { name: "Dragon heartstring", color: "#e0442b", price: 110, note: "Powerful and quick to learn. Great for bold spellwork." },
  { name: "Unicorn hair", color: "#e8e8f5", price: 90, note: "Consistent and faithful. Slow to turn its back on an owner." },
  { name: "Thestral hair", color: "#8a95b8", price: 190, note: "Strikingly rare, and notoriously difficult to master." },
  { name: "Veela hair", color: "#f2d38a", price: 120, note: "Temperamental and expressive, with a graceful touch." }
];

window.FLEX = ["Rigid", "Unyielding", "Reasonably bendy", "Quite bendy", "Swishy", "Supple"];

/* Wand finder: each answer favours woods and cores by name. */
window.FINDER = [
  { q: "How do you handle a challenge?", a: [
    { t: "Charge straight in", wood: ["Holly", "Yew"], core: ["Dragon heartstring"] },
    { t: "Think it through carefully", wood: ["Vine", "Ash"], core: ["Unicorn hair"] },
    { t: "Look for a clever, unexpected angle", wood: ["Elder", "Cherry"], core: ["Phoenix feather"] },
    { t: "Stay calm and see it through", wood: ["Oak", "Willow"], core: ["Unicorn hair"] }
  ] },
  { q: "Pick a landscape.", a: [
    { t: "A windswept hilltop", wood: ["Ash", "Yew"], core: ["Dragon heartstring"] },
    { t: "A quiet old forest", wood: ["Oak", "Hazel"], core: ["Unicorn hair"] },
    { t: "A river at dusk", wood: ["Willow", "Vine"], core: ["Veela hair"] },
    { t: "A midnight sky full of stars", wood: ["Ebony", "Elder"], core: ["Thestral hair", "Phoenix feather"] }
  ] },
  { q: "Which words describe your magic best?", a: [
    { t: "Strong and steady", wood: ["Oak", "Holly"], core: ["Dragon heartstring"] },
    { t: "Delicate and graceful", wood: ["Cherry", "Willow"], core: ["Veela hair", "Unicorn hair"] },
    { t: "Unpredictable and fiery", wood: ["Hazel", "Vine"], core: ["Phoenix feather"] },
    { t: "Subtle and mysterious", wood: ["Ebony", "Yew"], core: ["Thestral hair"] }
  ] }
];
