export type Kind = "business" | "personal";

export type WorkItem = {
  slug: string;
  title: string;
  /** Short handwritten-style caption shown on the pinned card. */
  caption: string;
  kind: Kind;
  /** Small tag shown on cards, e.g. "ACCY 593" or "knitting". */
  tag: string;
  when: string;
  /** One or two sentences: what it is. */
  summary: string;
  /** What Emma actually did. */
  did: string[];
  tools: string[];
  image: { src: string; alt: string; w: number; h: number };
  /** Card style on the board. */
  card: "polaroid" | "index";
  tape: "terracotta" | "sage" | "mustard";
  /** Rotation in degrees on desktop. */
  tilt: number;
};

export const person = {
  name: "Emma Larsen",
  email: "emma.larsen@example.com",
  linkedin: "https://www.linkedin.com/",
  program: "MS in Accountancy",
  school: "University of Illinois Urbana-Champaign, Gies College of Business",
};

export const items: WorkItem[] = [
  {
    slug: "scope-3-restaurant",
    title: "Scope 3 Emissions Estimate for a Farm-to-Table Restaurant",
    caption: "where the carbon actually is",
    kind: "business",
    tag: "ACCY 593 case",
    when: "Fall 2026",
    summary:
      "A first-pass Scope 3 inventory for a 60-seat farm-to-table restaurant, built from a quarter of purchasing data and published emission factors. The restaurant is a composite I built for the case, so every number is sample data.",
    did: [
      "Sorted 13 weeks of sample invoices into GHG Protocol Scope 3 categories (purchased goods, upstream transport, waste, commuting).",
      "Matched each line to a kg CO2e per kg or per dollar factor and documented which method I used and why.",
      "Ran a sensitivity check on the beef factor, since one input drove almost half of the total.",
      "Wrote a one-page memo for the owner with two menu changes and one purchasing change, ranked by tonnes saved.",
    ],
    tools: ["Excel", "GHG Protocol Scope 3 guidance", "SVG chart"],
    image: { src: "/scrapbook-craft/scope3.webp", alt: "Gouache illustration of a farm with a red barn connected by a winding road to a small restaurant kitchen", w: 1200, h: 800 },
    card: "polaroid",
    tape: "terracotta",
    tilt: -2,
  },
  {
    slug: "esg-report-readability",
    title: "Plain Language? A Readability Review of Three ESG Reports",
    caption: "highlighter ran dry",
    kind: "business",
    tag: "blog post",
    when: "October 2026",
    summary:
      "A blog-style write-up of a small experiment: I read the climate sections of three mid-size food company sustainability reports and scored how easy they were to follow for a non-specialist reader.",
    did: [
      "Ran each climate section through a readability formula and counted sentence length, passive voice and undefined acronyms.",
      "Built a simple checklist for whether every claim sat next to a number, a baseline year and a boundary.",
      "Wrote up what I found and what I would change if I were drafting one of these reports.",
    ],
    tools: ["Close reading", "Flesch Reading Ease", "Google Sheets"],
    image: { src: "/scrapbook-craft/esg-report.webp", alt: "Printed sustainability report open on a desk with a yellow highlighter, sticky note flags and a coffee mug", w: 1200, h: 800 },
    card: "index",
    tape: "mustard",
    tilt: 1.5,
  },
  {
    slug: "csa-box-cost",
    title: "What Does a CSA Box Really Cost? A Per-Box Cost Analysis",
    caption: "one box, five cost pools",
    kind: "business",
    tag: "cost accounting",
    when: "Summer 2026",
    summary:
      "A cost build-up for one weekly box in a 20-week community-supported agriculture share, using sample figures modeled on a small diversified vegetable farm.",
    did: [
      "Split the farm's season costs into five pools and allocated shared overhead using field hours as the driver.",
      "Compared the share price with the farm's cost per box and with what the same produce would cost at a grocery store.",
      "Tested two what-ifs: returnable boxes and moving half the members from home delivery to a pickup site.",
    ],
    tools: ["Activity-based costing", "Excel", "SVG chart"],
    image: { src: "/scrapbook-craft/csa-box.webp", alt: "Wooden produce box full of carrots, kale, beets, tomatoes and lettuce on a kitchen table", w: 1200, h: 800 },
    card: "polaroid",
    tape: "sage",
    tilt: 2,
  },
  {
    slug: "carbon-cost-per-meal",
    title: "Carbon Cost per Meal Calculator",
    caption: "try your dinner!",
    kind: "business",
    tag: "interactive",
    when: "November 2026",
    summary:
      "A small working calculator that estimates the greenhouse gas footprint of one plated meal and puts a dollar figure on it using an internal carbon price you choose. It is a simplified teaching estimate, not a lifecycle assessment.",
    did: [
      "Picked rounded emission factors per kilogram of food from published lifecycle averages and kept them visible so nobody mistakes them for precise values.",
      "Built the calculator as a React client component with sliders for portion size and carbon price.",
      "Added an equivalent in miles driven, because tonnes of CO2e mean very little to most diners.",
    ],
    tools: ["React", "TypeScript", "Carbon pricing"],
    image: { src: "/scrapbook-craft/meal-plate.webp", alt: "Gouache illustration of a dinner plate with roasted vegetables, chicken and bread beside a small kitchen scale", w: 1024, h: 1024 },
    card: "index",
    tape: "terracotta",
    tilt: -1.5,
  },
  {
    slug: "cu-home-sales",
    title: "Website Project: Champaign-Urbana Home Sales Guide",
    caption: "our class website project",
    kind: "business",
    tag: "website project",
    when: "Fall 2026",
    summary:
      "A prototype website for first-time buyers looking at houses in Champaign-Urbana: neighborhood pages, a plain-language glossary of closing costs, and a price-per-square-foot comparison built on sample sales data.",
    did: [
      "Planned the site map and wrote the copy for the home page, three neighborhood pages and the closing-cost glossary.",
      "Built the price-per-square-foot table and made sure every figure was labelled as sample data.",
      "Tested the pages on my phone and cut the home page from six sections to four after watching two classmates use it.",
    ],
    tools: ["Information architecture", "Copywriting", "Excel", "Usability testing"],
    image: { src: "/scrapbook-craft/cu-homes.webp", alt: "Gouache illustration of a tree-lined college-town street with craftsman bungalows and a for-sale sign", w: 1200, h: 800 },
    card: "polaroid",
    tape: "mustard",
    tilt: -1,
  },
  {
    slug: "fair-isle-sweater",
    title: "Fair Isle Yoke Sweater with a Wheat Motif",
    caption: "11 weeks, 5 colors",
    kind: "personal",
    tag: "knitting",
    when: "Winter 2025",
    summary:
      "A bottom-up yoke sweater in Shetland-style wool. I adapted a basic yoke pattern and charted my own wheat-sheaf band for the top of the yoke.",
    did: [
      "Swatched in the round to get gauge (26 stitches per 4 inches) and resized the body for positive ease.",
      "Charted a wheat-sheaf motif on graph paper and checked that it repeated evenly into the stitch count.",
      "Knit the body and sleeves over about 11 weeks, mostly on the bus and during Sunday podcasts.",
    ],
    tools: ["Stranded colorwork", "Charting", "Steam blocking"],
    image: { src: "/scrapbook-craft/fair-isle.webp", alt: "Hand-knitted Fair Isle sweater folded on a wooden bench with a colorwork yoke in cream, mustard, rust and sage", w: 1024, h: 1024 },
    card: "polaroid",
    tape: "sage",
    tilt: 2.5,
  },
  {
    slug: "garden-log",
    title: "Backyard Garden Log, Summer 2026",
    caption: "two beds, too many beans",
    kind: "personal",
    tag: "garden",
    when: "May to September 2026",
    summary:
      "A season-long log of two 4 by 8 foot raised beds behind our rental. I wrote down plantings, harvest weights and costs, mostly to find out whether the garden paid for itself.",
    did: [
      "Planned the beds on graph paper and planted tomatoes, kale, bush beans, peppers and marigolds.",
      "Weighed every harvest on a kitchen scale and logged it in a hand-bound notebook.",
      "Totalled costs against what the produce would have cost at the Saturday farmers' market.",
    ],
    tools: ["Raised beds", "Kitchen scale", "Notebook"],
    image: { src: "/scrapbook-craft/garden.webp", alt: "Two wooden raised beds of tomatoes, kale, beans and marigolds with a watering can in evening light", w: 1200, h: 800 },
    card: "index",
    tape: "mustard",
    tilt: -2,
  },
  {
    slug: "embroidery-hoops",
    title: "Three Embroidery Hoops for the Kitchen Wall",
    caption: "stitched on study breaks",
    kind: "personal",
    tag: "embroidery",
    when: "Spring 2026",
    summary:
      "A set of three small hoops (wildflowers, a seedling and a little house) stitched as a housewarming present for my sister.",
    did: [
      "Drew each design freehand and transferred it to linen with a water-soluble pen.",
      "Kept to one shared palette of six thread colors so the three hoops would read as a set.",
      "Practised French knots on scrap fabric until they stopped unravelling.",
    ],
    tools: ["Stem stitch", "Satin stitch", "French knots", "Lazy daisy"],
    image: { src: "/scrapbook-craft/embroidery.webp", alt: "Three wooden embroidery hoops on a cream wall stitched with wildflowers, a seedling and a small house", w: 1024, h: 1024 },
    card: "polaroid",
    tape: "terracotta",
    tilt: -2.5,
  },
  {
    slug: "cardamom-knots",
    title: "Mormor's Cardamom Knots (Family Recipe)",
    caption: "Mormor's recipe, my notes",
    kind: "personal",
    tag: "recipe",
    when: "Every December",
    summary:
      "My grandmother's Norwegian cardamom buns, written down properly for the first time. Her version said \"flour until it feels right\", so I weighed everything over three batches.",
    did: [
      "Baked the recipe three times with my mom and weighed the flour each time to pin down a real amount.",
      "Converted it to grams, added timings, and tested a shaping method that is easier to teach.",
      "Typed it up so my cousins can bake it without calling anyone.",
    ],
    tools: ["Baking", "Recipe testing"],
    image: { src: "/scrapbook-craft/cardamom-buns.webp", alt: "Baking tray of cardamom knot buns with pearl sugar beside a bowl of cardamom pods and a linen towel", w: 1200, h: 800 },
    card: "index",
    tape: "sage",
    tilt: 1.5,
  },
  {
    slug: "pressed-flower-cards",
    title: "Pressed-Flower Cards",
    caption: "violets from the side yard",
    kind: "personal",
    tag: "paper craft",
    when: "Spring and summer 2026",
    summary:
      "A batch of 40 note cards decorated with flowers I pressed from the yard and the roadside: violets, cosmos, ferns and Queen Anne's lace.",
    did: [
      "Pressed flowers for two to three weeks in a homemade press and phone books.",
      "Glued them to cream cardstock with archival glue and a toothpick, then sealed them with a thin layer of matte medium.",
      "Sold 25 at a winter craft table and gave the rest away. Materials came to about 85 cents a card.",
    ],
    tools: ["Flower press", "Archival glue", "Kraft envelopes"],
    image: { src: "/scrapbook-craft/pressed-flowers.webp", alt: "Handmade greeting cards decorated with pressed violets, ferns and Queen Anne's lace next to a small flower press", w: 1024, h: 1024 },
    card: "polaroid",
    tape: "mustard",
    tilt: 2,
  },
  {
    slug: "hand-bound-notebooks",
    title: "Hand-Bound Coptic Stitch Notebooks",
    caption: "where all my notes live",
    kind: "personal",
    tag: "bookbinding",
    when: "January 2026",
    summary:
      "Three lay-flat notebooks with exposed coptic stitch spines, bound with waxed linen thread. One is my garden log, one holds ACCY 593 notes, and one is for knitting charts.",
    did: [
      "Folded and pressed 48 signatures from recycled printer paper and grid paper.",
      "Cut covers from cereal-box board wrapped in kraft paper and punched the sewing stations with an awl.",
      "Learned the coptic stitch from a library book after two failed attempts at the kettle stitch.",
    ],
    tools: ["Bone folder", "Awl", "Waxed linen thread"],
    image: { src: "/scrapbook-craft/notebooks.webp", alt: "Stack of three hand-bound notebooks with exposed terracotta and sage stitched spines next to a bone folder and thread", w: 1024, h: 1024 },
    card: "index",
    tape: "sage",
    tilt: -1,
  },
];

export function getItem(slug: string) {
  return items.find((i) => i.slug === slug);
}

export function neighbors(slug: string) {
  const idx = items.findIndex((i) => i.slug === slug);
  return {
    prev: idx > 0 ? items[idx - 1] : items[items.length - 1],
    next: idx < items.length - 1 ? items[idx + 1] : items[0],
  };
}
