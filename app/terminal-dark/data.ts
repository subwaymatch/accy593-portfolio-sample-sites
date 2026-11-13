export type Category = "business" | "personal";

export type WorkItem = {
  slug: string;
  file: string;
  title: string;
  category: Category;
  year: string;
  stack: string[];
  summary: string;
  image: { src: string; alt: string; pixelated?: boolean };
};

export const person = {
  name: "Dev Patel",
  handle: "dev",
  email: "dev.patel@example.com",
  linkedin: "https://www.linkedin.com/",
};

export const workItems: WorkItem[] = [
  {
    slug: "bank-rec",
    file: "recon.py",
    title: "Automating a monthly bank reconciliation",
    category: "business",
    year: "2026",
    stack: ["Python", "pandas", "openpyxl"],
    summary:
      "A three-pass matcher that pairs bank activity with the GL cash account, sets aside anything ambiguous, and writes a reviewer-ready workbook. Cut recs for 14 accounts from about 22 hours a month to 6.",
    image: {
      src: "/terminal-dark/bank-rec.webp",
      alt: "Neon schematic of bank statements and a ledger with matched rows linked through a processing block and a few flagged rows set aside",
    },
  },
  {
    slug: "ap-aging",
    file: "ap_aging.sql",
    title: "AP aging in SQL, and what the 90+ bucket was hiding",
    category: "business",
    year: "2026",
    stack: ["PostgreSQL", "SQL window functions"],
    summary:
      "An as-of-date aging query over 1,240 synthetic open invoices. The 90+ bucket was bigger than 61 to 90, which should not happen, and the drill-down explained why.",
    image: {
      src: "/terminal-dark/ap-aging.webp",
      alt: "Neon schematic of invoices on a conveyor dropping into four bins of increasing height, older bins glowing amber",
    },
  },
  {
    slug: "revenue-dashboard",
    file: "revenue_dash.twbx",
    title: "Redesigning a 14-chart revenue dashboard",
    category: "business",
    year: "2025",
    stack: ["Tableau", "Excel", "usability testing"],
    summary:
      "Took a cluttered weekly revenue workbook down to four views built around the questions the controller actually asks on Monday mornings, then tested both versions with five people.",
    image: {
      src: "/terminal-dark/dashboard.webp",
      alt: "Neon illustration of a clean revenue dashboard with a line chart and KPI tiles in front of a faded cluttered older version",
    },
  },
  {
    slug: "cu-home-sales",
    file: "cu-homes/",
    title: "Website Project: Champaign-Urbana home sales",
    category: "business",
    year: "2026",
    stack: ["Next.js", "SQLite", "data cleaning"],
    summary:
      "A small site that helps grad students and first-time buyers make sense of home sales around campus: median prices, days on market and price per square foot by neighborhood.",
    image: {
      src: "/terminal-dark/home-sales.webp",
      alt: "Neon isometric map of a college town with houses, a water tower and a campus clock tower, some houses marked with map pins",
    },
  },
  {
    slug: "close-dag",
    file: "posts/close-is-a-graph.md",
    title: "Post: the month-end close is a dependency graph",
    category: "business",
    year: "2026",
    stack: ["writing", "process design"],
    summary:
      "A short essay on why I stopped thinking of the close as a checklist and started drawing it as a graph, and what that changed about where automation actually helps.",
    image: {
      src: "",
      alt: "Diagram of month-end close tasks drawn as a dependency graph",
    },
  },
  {
    slug: "soil-monitor",
    file: "plant_mon.ino",
    title: "Arduino soil-moisture monitor for a stubborn pothos",
    category: "personal",
    year: "2025",
    stack: ["Arduino", "C++", "I2C OLED"],
    summary:
      "A capacitive soil sensor, an Uno and a tiny OLED that tell me when my plant actually needs water. Three weeks of logged readings ended a long argument with my roommate.",
    image: {
      src: "/terminal-dark/soil-monitor.webp",
      alt: "Photo of a microcontroller board on a breadboard wired to a soil moisture sensor in a potted pothos, with a small glowing green screen",
    },
  },
  {
    slug: "synth",
    file: "melody.js",
    title: "A tiny synth that writes its own melodies",
    category: "personal",
    year: "2026",
    stack: ["Web Audio API", "TypeScript"],
    summary:
      "A seeded random walk over a pentatonic scale, played by two oscillators. The recording is the code itself: press play and it generates and performs a 16-step loop in your browser.",
    image: {
      src: "/terminal-dark/synth.webp",
      alt: "Neon schematic of synthesizer modules with sine and square waves, an envelope curve and a step sequencer wired to a speaker",
    },
  },
  {
    slug: "keyboard",
    file: "kb65/build.log",
    title: "Building a 65% mechanical keyboard",
    category: "personal",
    year: "2025",
    stack: ["soldering", "lubing", "QMK"],
    summary:
      "My first keyboard build: hand-lubed linear switches, tuned stabilizers and a custom layer for spreadsheet work. Took three evenings and one desoldered switch.",
    image: {
      src: "/terminal-dark/keyboard.webp",
      alt: "Photo of a 65 percent mechanical keyboard with dark keycaps and amber accent keys, a few switches exposed, a switch puller and brush beside it",
    },
  },
  {
    slug: "expense-cli",
    file: "spend",
    title: "spend: a command-line expense tracker",
    category: "personal",
    year: "2025",
    stack: ["Python", "sqlite3", "argparse"],
    summary:
      "I wanted budgeting to feel like git: fast to add, easy to query. spend stores every purchase in SQLite and prints a monthly budget-versus-actual report in the terminal.",
    image: {
      src: "/terminal-dark/expense-cli.webp",
      alt: "Neon schematic of a terminal window, a receipt and coins feeding a small database and a block-character bar chart",
    },
  },
  {
    slug: "sprites",
    file: "sprites/explorer.png",
    title: "Pixel-art sprite set for a small platformer",
    category: "personal",
    year: "2024",
    stack: ["pixel art", "16-color palette"],
    summary:
      "A hooded explorer with walk, idle and jump frames, plus a slime enemy and pickups, drawn on a 16-color palette for a weekend game jam with two friends.",
    image: {
      src: "/terminal-dark/sprites.webp",
      alt: "Pixel-art sprite sheet with a hooded explorer in several walk and jump poses, a green slime, a coin, a heart and a treasure chest",
      pixelated: true,
    },
  },
  {
    slug: "receipt-printer",
    file: "morning.py",
    title: "A receipt printer that prints my morning",
    category: "personal",
    year: "2026",
    stack: ["Raspberry Pi", "Python", "ESC/POS"],
    summary:
      "A Raspberry Pi Zero and a 58 mm thermal printer that print my classes, three to-dos and the forecast at 7:15 every weekday. Paper is harder to ignore than a notification.",
    image: {
      src: "/terminal-dark/receipt-printer.webp",
      alt: "Photo of a small thermal receipt printer printing a checklist next to a Raspberry Pi board and a mug of coffee",
    },
  },
];
