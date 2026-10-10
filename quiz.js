/* Sorting quiz data. Each answer: text, h = [primary house, secondary house]. */
window.HOUSES = {
  Gryffindor: {
    emoji: "🦁", cls: "house-gryffindor",
    tagline: "Courage, daring and chivalry",
    description: "You act when others hesitate. You stand up for what is right even when it costs you, and you would rather face a danger head-on than watch someone else take it for you.",
    traits: ["Brave", "Bold", "Loyal to a cause"]
  },
  Slytherin: {
    emoji: "🐍", cls: "house-slytherin",
    tagline: "Ambition, cunning and resourcefulness",
    description: "You set high goals and plan carefully to reach them. You read people well, use what you have and rarely leave things to chance.",
    traits: ["Ambitious", "Resourceful", "Strategic"]
  },
  Ravenclaw: {
    emoji: "🦅", cls: "house-ravenclaw",
    tagline: "Wit, curiosity and creativity",
    description: "You love ideas and the pleasure of working something out. Questions excite you more than answers, and you trust a clever solution over brute force.",
    traits: ["Curious", "Inventive", "Thoughtful"]
  },
  Hufflepuff: {
    emoji: "🦡", cls: "house-hufflepuff",
    tagline: "Loyalty, patience and fair play",
    description: "You work hard, treat everyone fairly and make people feel welcome. You are the one others rely on when things get difficult.",
    traits: ["Dependable", "Fair", "Kind"]
  }
};

window.QUIZ = [
  { q: "It's a free Saturday afternoon. What sounds best?",
    a: [
      { t: "Exploring somewhere new, with no plan", h: ["Gryffindor", "Ravenclaw"] },
      { t: "Reading or working on a project that fascinates me", h: ["Ravenclaw", "Slytherin"] },
      { t: "Cooking or hosting friends at home", h: ["Hufflepuff", "Gryffindor"] },
      { t: "Working toward a goal I've set for myself", h: ["Slytherin", "Hufflepuff"] }
    ] },
  { q: "A friend is being treated unfairly. What do you do?",
    a: [
      { t: "Speak up immediately, whatever the consequences", h: ["Gryffindor", "Hufflepuff"] },
      { t: "Quietly gather the facts and find the right person to go to", h: ["Ravenclaw", "Slytherin"] },
      { t: "Stay beside them and make sure they know they're not alone", h: ["Hufflepuff", "Ravenclaw"] },
      { t: "Find a way to turn the situation to their advantage", h: ["Slytherin", "Gryffindor"] }
    ] },
  { q: "Which of these would you most want to be known for?",
    a: [
      { t: "Greatness", h: ["Slytherin", "Gryffindor"] },
      { t: "Wisdom", h: ["Ravenclaw", "Hufflepuff"] },
      { t: "Goodness", h: ["Hufflepuff", "Gryffindor"] },
      { t: "Bravery", h: ["Gryffindor", "Slytherin"] }
    ] },
  { q: "You find a locked door in an old castle. You…",
    a: [
      { t: "Open it. Something is bound to be behind it", h: ["Gryffindor", "Slytherin"] },
      { t: "Study the lock and the walls for clues first", h: ["Ravenclaw", "Hufflepuff"] },
      { t: "Fetch a friend before going any further", h: ["Hufflepuff", "Ravenclaw"] },
      { t: "Ask who has the key, and what they'd trade for it", h: ["Slytherin", "Ravenclaw"] }
    ] },
  { q: "What do you value most in a team?",
    a: [
      { t: "Trust. We have each other's backs", h: ["Hufflepuff", "Gryffindor"] },
      { t: "Smart ideas from every direction", h: ["Ravenclaw", "Slytherin"] },
      { t: "A clear leader with a bold vision", h: ["Slytherin", "Gryffindor"] },
      { t: "Willingness to take risks together", h: ["Gryffindor", "Hufflepuff"] }
    ] },
  { q: "Pick a magical creature to have as a companion.",
    a: [
      { t: "A phoenix", h: ["Gryffindor", "Ravenclaw"] },
      { t: "An owl", h: ["Ravenclaw", "Hufflepuff"] },
      { t: "A snake", h: ["Slytherin", "Ravenclaw"] },
      { t: "A cat or a badger-like creature", h: ["Hufflepuff", "Slytherin"] }
    ] },
  { q: "You made a big mistake in front of everyone. Your first instinct?",
    a: [
      { t: "Own it loudly and fix it right away", h: ["Gryffindor", "Hufflepuff"] },
      { t: "Work out what went wrong so it never happens again", h: ["Ravenclaw", "Slytherin"] },
      { t: "Apologise sincerely to anyone affected", h: ["Hufflepuff", "Gryffindor"] },
      { t: "Limit the damage and recover my standing", h: ["Slytherin", "Ravenclaw"] }
    ] },
  { q: "Which classroom would you want to spend the most time in?",
    a: [
      { t: "Defence. Duelling and practical magic", h: ["Gryffindor", "Slytherin"] },
      { t: "Charms. Elegant, clever spellwork", h: ["Ravenclaw", "Hufflepuff"] },
      { t: "Herbology. Hands in the soil", h: ["Hufflepuff", "Ravenclaw"] },
      { t: "Potions. Precision, and a little danger", h: ["Slytherin", "Ravenclaw"] }
    ] },
  { q: "Choose a time of day.",
    a: [
      { t: "Dawn. A fresh start, a challenge ahead", h: ["Gryffindor", "Hufflepuff"] },
      { t: "Midnight. Quiet, private, full of thought", h: ["Ravenclaw", "Slytherin"] },
      { t: "Afternoon. Warm, social, everyone around", h: ["Hufflepuff", "Gryffindor"] },
      { t: "Dusk. When the real plans get made", h: ["Slytherin", "Ravenclaw"] }
    ] },
  { q: "Which would you rather have?",
    a: [
      { t: "A sword that proves your courage", h: ["Gryffindor", "Slytherin"] },
      { t: "A book that holds every answer", h: ["Ravenclaw", "Hufflepuff"] },
      { t: "A cup that always brings people together", h: ["Hufflepuff", "Gryffindor"] },
      { t: "A locket that grants influence", h: ["Slytherin", "Ravenclaw"] }
    ] }
];
