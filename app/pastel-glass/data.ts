export type Tag = "Analytics" | "Tax" | "Nonprofit" | "Design" | "Web" | "Writing" | "Making";

export const TAGS: Tag[] = ["Analytics", "Tax", "Nonprofit", "Design", "Web", "Writing", "Making"];

export type WorkItem = {
  id: string;
  title: string;
  kind: "Business" | "Personal";
  tags: Tag[];
  when: string;
  /** One or two sentences shown on the card. */
  summary: string;
  /** What Sofia actually did, shown in the modal. */
  role: string[];
  image: { src: string; width: number; height: number; alt: string; transparent?: boolean };
  /** Tint used behind transparent illustrations. */
  tint: "lavender" | "peach" | "mint" | "sky";
};

export const WORK: WorkItem[] = [
  {
    id: "vita-wait-times",
    title: "How long were people really waiting? A VITA wait-time study",
    kind: "Business",
    tags: ["Analytics", "Tax", "Nonprofit"],
    when: "Spring 2026 filing season",
    summary:
      "I logged check-in and seat times for walk-in visits at our campus VITA site, found the Saturday late-morning bottleneck, and pitched a two-part staffing fix that cut the peak wait by about 40%.",
    role: [
      "Designed a two-column paper log (arrival time, time seated with a preparer) that greeters could fill in without slowing intake.",
      "Typed the logs into a spreadsheet each week and grouped arrivals into one-hour blocks.",
      "Proposed adding an intake screener at the door and moving one certified preparer from the 2 p.m. shift to 10 a.m.; the site coordinator approved both from week 6.",
      "Presented the before-and-after chart below at the end-of-season volunteer meeting.",
    ],
    image: { src: "/pastel-glass/vita.png", width: 582, height: 501, alt: "Clay illustration of a clipboard, a wall clock and three people waiting on chairs", transparent: true },
    tint: "sky",
  },
  {
    id: "deduction-estimator",
    title: "Standard or itemize? An interactive deduction estimator",
    kind: "Business",
    tags: ["Tax", "Analytics"],
    when: "Fall 2026, built for clinic training",
    summary:
      "A small calculator I built to help new VITA volunteers see why most of our clients take the standard deduction. Type in a few numbers and watch the two totals race.",
    role: [
      "Picked the five inputs that actually move the answer for our client base: filing status, AGI, state and local taxes, mortgage interest, gifts to charity and medical bills.",
      "Wrote the rules for the SALT cap and the 7.5%-of-AGI medical floor, then checked the output against a dozen practice returns from training.",
      "Kept it deliberately simple, with a plain warning that it is a teaching tool and not tax advice.",
    ],
    image: { src: "/pastel-glass/deduction.png", width: 592, height: 394, alt: "Clay illustration of a balance scale weighing one card against receipts, a house and a heart", transparent: true },
    tint: "lavender",
  },
  {
    id: "form-990-ratios",
    title: "Three food, books and garden nonprofits, read through their Form 990s",
    kind: "Business",
    tags: ["Analytics", "Nonprofit", "Tax"],
    when: "ACCY 593 module project, Fall 2026",
    summary:
      "I pulled the same five numbers from three fictional organisations' Form 990s and compared program spending, fundraising cost and reserves. The one with the 'worst' overhead ratio turned out to be the most stable.",
    role: [
      "Built a one-page template that pulls Part IX (functional expenses) and Part VIII (contributions) into a few comparable ratios.",
      "Calculated program expense ratio, cost to raise a dollar and months of operating reserve for each organisation.",
      "Wrote a short memo arguing that a single overhead percentage hides more than it shows.",
    ],
    image: { src: "/pastel-glass/form990.png", width: 600, height: 338, alt: "Clay illustration of three small community buildings, a pantry, a library and a garden house, each with a bar of different height", transparent: true },
    tint: "mint",
  },
  {
    id: "first-paycheck-infographic",
    title: "Tu primer cheque / Your first paycheck: a bilingual infographic",
    kind: "Business",
    tags: ["Design", "Tax"],
    when: "Summer 2026",
    summary:
      "A one-page explainer in English and Spanish that walks through where a first paycheck goes, made for a high-school financial literacy night in Rantoul.",
    role: [
      "Wrote both language versions myself, then had two native speakers from different countries read the Spanish so it did not sound like a textbook from one place.",
      "Used one worked example (a $1,200 biweekly check) instead of formulas, so students could follow each dollar.",
      "Laid it out with large type and colour-coded blocks that still work when printed in black and white.",
    ],
    image: { src: "/pastel-glass/paycheck.png", width: 586, height: 520, alt: "Clay illustration of an envelope with a paycheck stub, a piggy bank and two speech bubbles", transparent: true },
    tint: "peach",
  },
  {
    id: "cu-home-sales-site",
    title: "Website Project: a Champaign-Urbana home sales site",
    kind: "Business",
    tags: ["Web", "Design", "Analytics"],
    when: "Spring 2026, team of three",
    summary:
      "A home-buying site for first-time buyers in a college town, where half the houses near campus are rentals and the other half are someone's first home. I owned the neighbourhood pages and the price dashboard.",
    role: [
      "Wrote the neighbourhood guides (Campustown edge, West Urbana, Savoy, Southwest Champaign) around the questions buyers asked us in interviews: bus lines, game-day traffic, and how many neighbours are landlords.",
      "Built the listing card component and a filter for 'walkable to a bus stop'.",
      "Made the median price and days-on-market panel from a sample dataset, and wrote the rent-versus-buy explainer.",
    ],
    image: { src: "/pastel-glass/website.webp", width: 1200, height: 800, alt: "Clay illustration of a laptop and phone showing a real-estate website with a craftsman house, listing cards and a map" },
    tint: "sky",
  },
  {
    id: "forty-returns",
    title: "Five things forty VITA returns taught me (blog post)",
    kind: "Business",
    tags: ["Writing", "Tax", "Nonprofit"],
    when: "April 2026",
    summary:
      "A short reflection I wrote after my second filing season as a volunteer preparer, about documents, nerves, and why the most useful tax skill is asking the second question.",
    role: [
      "Wrote and edited the post for our VITA site's volunteer newsletter.",
      "Changed every client detail so nobody could be recognised.",
    ],
    image: { src: "/pastel-glass/notebook.png", width: 600, height: 562, alt: "Clay illustration of an open notebook, a mug of tea, a pen and a clipped stack of forms", transparent: true },
    tint: "lavender",
  },
  {
    id: "watercolor-botanicals",
    title: "Prairie and garden botanicals in watercolor",
    kind: "Personal",
    tags: ["Making", "Design"],
    when: "Ongoing since 2024",
    summary:
      "Loose botanical studies I paint on Sunday mornings: lavender from my mom's garden, a peony bud, eucalyptus from the grocery store, and purple coneflower from the Illinois prairie.",
    role: [
      "Painted on 300 gsm cold-press paper with a limited palette of five colours so the studies feel like one set.",
      "I am practising wet-on-wet petals and leaving white paper for highlights instead of reaching for white paint.",
    ],
    image: { src: "/pastel-glass/botanicals.webp", width: 1200, height: 800, alt: "Watercolor studies of lavender, a peony bud, eucalyptus and a coneflower on cream paper beside a paint palette" },
    tint: "peach",
  },
  {
    id: "sage-cardigan",
    title: "The sage cardigan: my first top-down raglan",
    kind: "Personal",
    tags: ["Making"],
    when: "Winter 2025",
    summary:
      "A chunky cable cardigan I knit over seven weeks, mostly during study breaks before my Federal Taxation final.",
    role: [
      "Knit top-down in worsted-weight wool on 5 mm circular needles, with one cable panel down each front.",
      "Added two inches to the body and sleeves and worked deeper ribbing at the cuffs.",
      "Learned to block properly after the first wash made the cables pucker.",
    ],
    image: { src: "/pastel-glass/cardigan.webp", width: 1200, height: 800, alt: "A sage green hand-knit cable cardigan with cream buttons laid flat beside a ball of yarn and needles" },
    tint: "mint",
  },
  {
    id: "propagation-log",
    title: "Houseplant propagation log",
    kind: "Personal",
    tags: ["Making", "Analytics"],
    when: "Winter 2025 to spring 2026",
    summary:
      "Five cuttings in water jars on my apartment windowsill, with a log of how many days each took to root. Yes, I made a spreadsheet for my plants.",
    role: [
      "Took cuttings from my own plants and from a friend's monstera, one node each.",
      "Changed the water weekly and noted the first visible root and the day I potted each one up.",
    ],
    image: { src: "/pastel-glass/propagation.webp", width: 1200, height: 800, alt: "Five glass jars on a windowsill holding houseplant cuttings with white roots" },
    tint: "sky",
  },
  {
    id: "lucias-moon",
    title: "La luna de Lucía / Lucía's Moon: a bilingual children's story",
    kind: "Personal",
    tags: ["Writing", "Design"],
    when: "Summer 2025",
    summary:
      "A short picture-book story written in Spanish and English on facing pages, for my niece, about a girl who thinks the moon is following her home from her grandmother's house.",
    role: [
      "Wrote the Spanish first and then the English, so the English is a translation of feeling rather than word for word.",
      "Read drafts aloud to my niece and cut anything she got bored during.",
      "Planned the book as twelve spreads, each with one picture and no more than three short lines per language.",
    ],
    image: { src: "/pastel-glass/story.webp", width: 1200, height: 800, alt: "Watercolor of a girl and her grandmother on a rooftop at dusk pointing at a smiling crescent moon" },
    tint: "lavender",
  },
  {
    id: "sunday-conchas",
    title: "Sunday conchas, adjusted for an apartment oven",
    kind: "Personal",
    tags: ["Making"],
    when: "Most Sundays",
    summary:
      "My abuela's concha recipe, re-tested until it worked in a small oven that runs hot. The pastel toppings are natural colourings: beet, matcha, butterfly pea and plain vanilla.",
    role: [
      "Tested six batches, changing one thing at a time (oven temperature, rack position, proof time) and writing down the result.",
      "Settled on 350°F instead of 375°F, middle rack, and a second proof of 75 minutes in a turned-off oven with the light on.",
    ],
    image: { src: "/pastel-glass/conchas.webp", width: 1200, height: 800, alt: "A plate of six pastel-coloured conchas beside a cup of hot chocolate" },
    tint: "peach",
  },
];
