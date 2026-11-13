export type Ink = "blue" | "orange" | "yellow" | "teal";

export type Showcase =
  | "tickets"
  | "model"
  | "onepager"
  | "breakeven"
  | "homes"
  | "song"
  | "travel"
  | "recipes"
  | "map"
  | "marathon";

export type WorkItem = {
  slug: string;
  title: string;
  kicker: string;
  group: "business" | "personal";
  ink: Ink;
  date: string;
  summary: string;
  role: string;
  tools: string[];
  image: { src: string; alt: string; width: number; height: number };
  intro: string[];
  did: string[];
  showcase: Showcase;
};

export const work: WorkItem[] = [
  {
    slug: "ticket-pricing-season",
    title: "Empty Tuesdays: pricing a basketball season",
    kicker: "Analytics",
    group: "business",
    ink: "orange",
    date: "Fall 2026",
    summary:
      "Sixteen home games of sample data and one question: why do weekday non-conference games sit 40% empty, and what would a smarter price ladder do about it?",
    role: "Solo project. Built the sample dataset, ran the analysis, drew the chart and wrote the recommendation memo.",
    tools: ["Excel", "Python (pandas)", "Inline SVG"],
    image: {
      src: "/risograph-print/basketball-pricing.webp",
      alt: "Risograph illustration of a college basketball arena seen from the upper bowl, seats printed in blue, orange and yellow blocks.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Ticket offices usually price a season in three or four tiers and then leave it alone. I wanted to see what a single season looks like when you put price and attendance on the same chart, game by game, and ask where the money was left on the table.",
      "The numbers here are a sample dataset I built for practice, modelled on a 15,500-seat arena with typical opponent tiers and day-of-week patterns. They are not any real school's figures, but the shape of the problem is very real: the arena is full when it is already easy to sell, and half empty when it is not.",
    ],
    did: [
      "Built a 16-game table: opponent tier, weekday, average paid price and paid attendance.",
      "Compared fill rate by day and by tier, then tested two price moves against simple demand assumptions.",
      "Turned the result into one chart and a half-page memo a ticketing manager could read in two minutes.",
    ],
    showcase: "tickets",
  },
  {
    slug: "prairie-lightning-model",
    title: "Prairie Lightning FC: a three-statement model",
    kicker: "Financial modelling",
    group: "business",
    ink: "blue",
    date: "Fall 2026",
    summary:
      "A linked income statement, balance sheet and cash flow for a fictional minor-league soccer club, built to answer one question: can it afford a new scoreboard?",
    role: "Designed the assumptions, linked the three statements, and wrote the board-style summary.",
    tools: ["Excel", "TypeScript (web version)"],
    image: {
      src: "/risograph-print/soccer-club.webp",
      alt: "Risograph illustration of a small soccer stadium at dusk with floodlights and a single grandstand.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Prairie Lightning FC is invented, but it is built from the kind of numbers you see in lower-league club accounts: around 2,000 fans a match, wages that eat more than half of revenue, and sponsors who pay a few months late.",
      "The club wants a $250,000 video scoreboard. The income statement says yes. The cash flow statement says be careful. That gap is the whole point of building all three statements instead of just a P&L.",
      "Every figure in the tables below is calculated from the assumptions on this page when the site is built, and the balance sheet check row has to come out at zero or the page is wrong.",
    ],
    did: [
      "Set up driver-based revenue (matches × attendance × price) and cost lines with explicit growth rates.",
      "Linked working capital (sponsor receivables, season-ticket deferred revenue, payables) into the cash flow.",
      "Added a balance check and wrote a three-bullet recommendation for a fictional club board.",
    ],
    showcase: "model",
  },
  {
    slug: "sponsorship-roi-one-pager",
    title: "One page, one decision: a sponsorship ROI sheet",
    kicker: "Design",
    group: "business",
    ink: "teal",
    date: "Summer 2026",
    summary:
      "A single-page leave-behind showing a local credit union what $35,000 of club sponsorship actually returned, in numbers a branch manager can repeat in a meeting.",
    role: "Wrote the valuation method, chose the numbers to show, and designed the sheet.",
    tools: ["Excel", "Figma", "Print layout"],
    image: {
      src: "/risograph-print/sponsorship.webp",
      alt: "Risograph illustration of a striped soccer jersey with a blank sponsor patch, a megaphone and a stack of flyers.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Sponsorship renewals are usually sold with a glossy deck and a vague promise of exposure. I wanted the opposite: one sheet, one headline number, and a table that shows exactly where that number comes from.",
      "The sponsor and club are fictional (Corn Belt Credit Union and the same Prairie Lightning FC from my three-statement model), but the method is one I would use for real: value each asset at a market benchmark, count only the members you can trace to a promo code, and say clearly what you did not measure.",
    ],
    did: [
      "Valued each sponsorship asset with a conservative benchmark (CPM for media, cost for events).",
      "Separated measured return from brand effects we could not measure, so the ROI is not oversold.",
      "Designed the page in a two-ink layout so it photocopies cleanly in black and white too.",
    ],
    showcase: "onepager",
  },
  {
    slug: "break-even-trivia-night",
    title: "Break-even calculator for a campus trivia night",
    kicker: "Interactive tool",
    group: "business",
    ink: "yellow",
    date: "Fall 2026",
    summary:
      "A working calculator I built for a student-run trivia night fundraiser. Change the ticket price, costs and turnout, and it tells you how many tickets pay for the room.",
    role: "Built the calculator and used it in the planning meeting to set the ticket price.",
    tools: ["React", "Cost-volume-profit analysis"],
    image: {
      src: "/risograph-print/campus-event.webp",
      alt: "Risograph illustration of a busy trivia night in a student union ballroom with string lights and a host on stage.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Our planning group spent twenty minutes arguing about whether tickets should be $10 or $15 before anyone wrote down what the night would cost. So I built this during the meeting and we settled it in five.",
      "It is plain cost-volume-profit analysis from intro managerial accounting: fixed costs, a variable cost per guest, a contribution margin, and a break-even point. The only twist is the sponsor contribution, which comes off fixed costs before you divide.",
    ],
    did: [
      "Listed every fixed and per-guest cost with the event committee.",
      "Built the calculator so anyone in the room could test their own price and turnout guesses.",
      "Set the default numbers to the plan we actually agreed on.",
    ],
    showcase: "breakeven",
  },
  {
    slug: "cu-home-sales-site",
    title: "Website Project: Champaign-Urbana home sales",
    kicker: "Website project",
    group: "business",
    ink: "blue",
    date: "Fall 2026 · ACCY 593",
    summary:
      "My ACCY 593 website project: a small site that helps first-time buyers compare Champaign, Urbana and Savoy, with a filterable listings page built on sample data.",
    role: "Planned the site map, wrote the copy, built the listings filter and the price-per-square-foot summary.",
    tools: ["Information architecture", "React", "Sample MLS-style data"],
    image: {
      src: "/risograph-print/cu-homes.webp",
      alt: "Risograph illustration of a tree-lined college-town street in autumn with a brick bungalow, a porch house and a for-sale sign.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Most of my friends who stay in town after graduating end up renting, partly because buying feels opaque. The brief I set myself for the ACCY 593 website project was a site that answers three questions for a first-time buyer: where can I afford, what does a house there usually cost per square foot, and how fast do they sell?",
      "The listings below are sample records I wrote to look like a typical week of local inventory. They are not real homes and have no addresses on purpose. The filter and the summary numbers are live, so try them.",
    ],
    did: [
      "Interviewed four recent graduates about what confused them when they looked at listings.",
      "Planned a five-page site: Neighborhoods, Listings, Mortgage math, Buying timeline, About.",
      "Built the listings page below, including the median price and price-per-square-foot summary that updates with the filter.",
    ],
    showcase: "homes",
  },
  {
    slug: "route-45-north",
    title: "Route 45 North (a song)",
    kicker: "Songwriting",
    group: "personal",
    ink: "orange",
    date: "Spring 2026",
    summary:
      "A song about the drive home for Easter, written on a borrowed acoustic. Full lyrics, the chord chart, and the five shapes you need to play it.",
    role: "Wrote the words and music. Recorded a rough voice memo that no one will ever hear.",
    tools: ["Acoustic guitar", "Capo 2", "Notebook"],
    image: {
      src: "/risograph-print/guitar.webp",
      alt: "Risograph illustration of an acoustic guitar leaning on a chair beside an open notebook, a capo and a pick.",
      width: 1024,
      height: 1024,
    },
    intro: [
      "I write maybe three songs a year, and this is the only one I have finished properly. It started as a line in my notes app somewhere around Kankakee and turned into a song about the drive back to my mum's.",
      "It is four chords most of the way, with an A minor bridge that I am still a little proud of. If you play, put a capo on the second fret and strum it slower than feels natural.",
    ],
    did: [
      "Wrote the lyrics over about three weeks of evenings.",
      "Worked out the chord changes and a simple down-down-up strum.",
      "Typeset the chord sheet so it fits on one page of a music stand.",
    ],
    showcase: "song",
  },
  {
    slug: "three-cities-zine",
    title: "Three cities, one zine",
    kicker: "Travel series",
    group: "personal",
    ink: "teal",
    date: "2024–2025",
    summary:
      "Lisbon, Lagos and Chicago, traced from my own travel photos into four-colour layers and printed as a small risograph zine.",
    role: "Took the photos, traced each one into ink layers, and printed 40 copies at a community print studio.",
    tools: ["Point-and-shoot camera", "Procreate", "Risograph (4 drums)"],
    image: {
      src: "/risograph-print/travel-lagos.webp",
      alt: "Risograph print of an open-air market in Lagos with colourful umbrellas, baskets of tomatoes and a yellow minibus.",
      width: 1200,
      height: 800,
    },
    intro: [
      "I am not a good photographer, but I take a lot of photos. For this series I picked one frame from each of three trips and redrew them as separate ink layers, the way a riso printer sees an image: one drum for blue, one for orange, one for yellow, one for teal.",
      "Printing them taught me more about colour than any design class. Teal over yellow makes a green you cannot get any other way, and nothing ever lines up perfectly, which is the fun of it.",
    ],
    did: [
      "Chose three photos from Lisbon (spring 2025), Lagos (December 2024) and the Chicago lakefront (summer 2025).",
      "Traced each into four separated layers and test-printed them on scrap paper.",
      "Printed, folded and stapled 40 copies; gave most of them away.",
    ],
    showcase: "travel",
  },
  {
    slug: "sunday-pot-recipes",
    title: "The Sunday pot: family recipes",
    kicker: "Recipe collection",
    group: "personal",
    ink: "orange",
    date: "Ongoing",
    summary:
      "My mum's jollof rice, dodo and puff-puff, written down properly for the first time with actual measurements instead of “until it looks right”.",
    role: "Stood in my mum's kitchen with a notebook and a measuring cup, then tested every recipe twice in my apartment.",
    tools: ["Notebook", "Kitchen scale", "Patience"],
    image: {
      src: "/risograph-print/recipes.webp",
      alt: "Risograph illustration of a family table with a pot of jollof rice, fried plantains, a bowl of stew and a recipe card.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Every family that makes jollof thinks theirs is the right one. Ours comes from my mum, who learned it from her mother in Lagos and has never measured anything in her life.",
      "When I moved into my first apartment I realised I could not make any of it without calling her, so over winter break I followed her around the kitchen writing down every pinch. These are the three recipes I make most.",
    ],
    did: [
      "Translated handfuls and splashes into cups and teaspoons.",
      "Re-tested each recipe in a small apartment kitchen and adjusted the timings.",
      "Kept her notes in where they mattered (the burnt bottom of the jollof is on purpose).",
    ],
    showcase: "recipes",
  },
  {
    slug: "main-quad-map",
    title: "A hand-drawn map of the Main Quad",
    kicker: "Illustration",
    group: "personal",
    ink: "yellow",
    date: "Fall 2025",
    summary:
      "An illustrated map of the Main Quad I drew for new students in my building, with the routes and shortcuts I actually use between classes.",
    role: "Drew the map, picked the landmarks and wrote the route notes.",
    tools: ["Pencil", "Brush pen", "Riso print"],
    image: {
      src: "/risograph-print/campus-map.webp",
      alt: "Risograph-style illustrated map of a university main quad with a domed auditorium at one end, a columned building at the other, trees, paths and students.",
      width: 1200,
      height: 800,
    },
    intro: [
      "Campus maps are accurate and useless at the same time. They show every building but not which door is unlocked at 7 a.m., or that cutting diagonally across the Quad saves you three minutes on the way to the Union.",
      "I drew this for the new students on my floor. It is deliberately not to scale. The buildings I care about are big and the ones I have never been inside are trees.",
    ],
    did: [
      "Walked the Quad with a notebook over two afternoons and sketched the main paths.",
      "Inked the map, then simplified it into four colours for printing.",
      "Wrote a short key with the routes I would give a friend.",
    ],
    showcase: "map",
  },
  {
    slug: "illinois-marathon-block",
    title: "Sixteen weeks to the Illinois Marathon",
    kicker: "Running log",
    group: "personal",
    ink: "teal",
    date: "Spring 2026",
    summary:
      "My first marathon training block, logged week by week, plus what a spreadsheet did and did not help with when the plan met a real semester.",
    role: "Ran the miles, kept the log, and wrote this up afterwards.",
    tools: ["Running shoes", "Google Sheets", "A lot of oatmeal"],
    image: {
      src: "/risograph-print/marathon.webp",
      alt: "Risograph illustration of a runner on a flat country road past cornfields at sunrise with a grain elevator in the distance.",
      width: 1024,
      height: 1024,
    },
    intro: [
      "I signed up for the Illinois Marathon in Champaign-Urbana the week after New Year, which gave me sixteen weeks and no running base to speak of. I built the plan in a spreadsheet, because of course I did.",
      "The finish line is on the field inside Memorial Stadium, and I can tell you that the last half mile, coming into the stadium, is worth every boring Tuesday run along the country roads south of town.",
    ],
    did: [
      "Built a 16-week plan peaking at 40 miles, with a cutback week every fourth week.",
      "Logged every run and compared planned against actual weekly mileage.",
      "Finished in 3:52:18, seven minutes slower than my goal and very happy about it.",
    ],
    showcase: "marathon",
  },
];

export function getItem(slug: string) {
  return work.find((w) => w.slug === slug);
}

export function getNeighbours(slug: string) {
  const i = work.findIndex((w) => w.slug === slug);
  const n = work.length;
  return { prev: work[(i - 1 + n) % n], next: work[(i + 1) % n] };
}
