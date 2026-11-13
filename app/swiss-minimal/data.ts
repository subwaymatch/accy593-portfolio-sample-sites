export type Category = "Analytics" | "Systems" | "Web" | "Writing" | "Photography" | "Craft" | "Design";

export type Img = { src: string; width: number; height: number; alt: string; caption?: string };

export type Section = { heading: string; body: string[] };

export type Demo = "anomaly" | "process" | "controls" | "homes" | "budget" | "cycling";

export type WorkItem = {
  slug: string;
  title: string;
  category: Category;
  track: "Business" | "Personal";
  year: string;
  role: string;
  tools: string[];
  summary: string;
  image?: Img;
  /** Show the cover image on the detail page (false when the demo is the better visual). */
  heroOnDetail?: boolean;
  gallery?: Img[];
  sections: Section[];
  demo?: Demo;
};

export const person = {
  name: "Maya Chen",
  program: "MS in Accountancy",
  school: "Gies College of Business, University of Illinois Urbana-Champaign",
  email: "maya.chen@example.com",
  linkedin: "https://www.linkedin.com/",
};

const img = (file: string, alt: string, width = 1200, height = 800, caption?: string): Img => ({
  src: `/swiss-minimal/${file}`,
  width,
  height,
  alt,
  caption,
});

export const items: WorkItem[] = [
  {
    slug: "journal-entry-anomalies",
    title: "Journal entries, after hours",
    category: "Analytics",
    track: "Business",
    year: "2026",
    role: "Analysis, Python scripts, write-up",
    tools: ["Python", "pandas", "Benford test", "SVG"],
    summary:
      "An anomaly screen for a synthetic general ledger. I combined three simple tests (posting time, amounts just under an approval limit, and first-digit frequencies) to narrow 2,400 entries to a short list worth a second look.",
    image: img("journal-entries.webp", "Abstract chart: a dense band of black dots with three isolated red dots far above it"),
    heroOnDetail: false,
    sections: [
      {
        heading: "The question",
        body: [
          "Auditing standards ask auditors to test journal entries for signs of management override, but most guidance stops at listing risk characteristics. I wanted to see how far a few transparent rules could get before reaching for anything that needs a model to explain.",
          "The data is a synthetic ledger I generated for an ACCY 593 lab: 2,400 entries over one fiscal year, posted by 14 user IDs, with a manual approval limit of $25,000. I seeded a handful of problems into it on purpose and then tried to find them without looking at my own seed file.",
        ],
      },
      {
        heading: "What I did",
        body: [
          "Each entry gets one point per rule it trips: posted between 10 p.m. and 5 a.m. or on a weekend, an amount between $24,000 and $24,999, a round-thousand amount on a manual entry, and a user who rarely posts to that account. Anything with two or more points goes on the review list.",
          "Separately, I ran a first-digit (Benford) test on all manual entries. It does not point at single entries, but it told me which user IDs to look at first, which made the rule-based list easier to prioritise.",
        ],
      },
      {
        heading: "What I would change",
        body: [
          "The scoring is additive and every rule weighs the same, which is easy to defend but clearly too blunt. The next version will weight rules by how often they catch a seeded issue, and I want to test the false-positive rate on a ledger with no seeded problems at all.",
        ],
      },
    ],
    demo: "anomaly",
  },
  {
    slug: "p2p-process-mining",
    title: "Purchase-to-pay, as it actually ran",
    category: "Analytics",
    track: "Business",
    year: "2026",
    role: "Event-log prep, process discovery, findings memo",
    tools: ["PM4Py", "pandas", "Excel", "Celonis Academic"],
    summary:
      "A process-mining study of a synthetic purchase-to-pay event log. I rebuilt the as-is flow from timestamps, compared it with the documented three-way-match process, and wrote up where the two disagree.",
    image: img("process-mining.webp", "Four black squares joined by arrows, with a red arrow looping back from the third square to the second"),
    heroOnDetail: false,
    sections: [
      {
        heading: "Context",
        body: [
          "Process mining is one of the topics in ACCY 593 that changed how I think about walkthroughs. Instead of asking a clerk how purchasing works, you reconstruct every case from system timestamps and let the variants speak.",
          "I worked with a synthetic event log of 1,200 purchase orders and six activities, modelled on the structure of public purchase-to-pay logs used in process-mining research.",
        ],
      },
      {
        heading: "Findings",
        body: [
          "Only 61% of cases followed the happy path of requisition, approval, PO, goods receipt, invoice and payment. The most common deviation (14% of cases) was a change to the PO after approval, which sent the order back for rework without a second approval in 40% of those cases.",
          "Another 9% of invoices were recorded before the goods receipt. That is not automatically wrong, but it means the three-way match was being performed after the fact, which is worth raising with whoever owns the control.",
        ],
      },
      {
        heading: "Deliverable",
        body: [
          "A four-page memo for a fictional controller with the process map, the three variants that matter, and one recommendation per variant. The figures at the top of this page are simplified versions of the ones in the memo.",
        ],
      },
    ],
    demo: "process",
  },
  {
    slug: "internal-controls-dashboard",
    title: "A controls dashboard people would open",
    category: "Systems",
    track: "Business",
    year: "2025",
    role: "Requirements, wireframes, prototype",
    tools: ["Figma", "Power BI", "COSO 2013"],
    summary:
      "A one-screen dashboard design for tracking SOX-style control testing at a mid-size company. The brief I set myself: a controller should know in ten seconds what is late, what failed, and who owns it.",
    image: img("controls-dashboard.webp", "Abstract dashboard of black outlined panels with bar shapes and one red status square"),
    heroOnDetail: false,
    sections: [
      {
        heading: "Problem",
        body: [
          "Most control trackers I have seen in internships are spreadsheets with one row per control and thirty columns. Everything is visible, so nothing stands out. I wanted to design the summary layer that sits above that spreadsheet.",
        ],
      },
      {
        heading: "Design decisions",
        body: [
          "Status uses a shape and a word as well as colour, so the screen still works printed in black and white. Exceptions sort to the top by days overdue, not by control ID. Each row names an owner, because a remediation plan without a person attached tends not to move.",
          "I mapped every control to one of the five COSO components so the audit committee view can roll up without a separate report.",
        ],
      },
      {
        heading: "Prototype",
        body: [
          "The panel at the top of this page is a static HTML version of the main view, filled with sample data. The Power BI version reads from the same table layout.",
        ],
      },
    ],
    demo: "controls",
  },
  {
    slug: "website-project-cu-homes",
    title: "Website Project: Champaign-Urbana home sales",
    category: "Web",
    track: "Business",
    year: "2026",
    role: "Data model, page design, front-end build",
    tools: ["Next.js", "CSV", "Figma"],
    summary:
      "The ACCY 593 Website Project: a small home-sales site for a college town. Buyers can browse recent sales by neighbourhood and see price per square foot instead of a wall of listing photos.",
    image: img("home-sales.webp", "Flat illustration of a listings website: a grid of house outlines with one house filled red, next to a small street map"),
    sections: [
      {
        heading: "Why this topic",
        body: [
          "Champaign-Urbana has an unusual housing market. Graduate students, faculty on two- or three-year horizons and long-time residents are all shopping at once, and many of them are buying a first home. I wanted a site that answers the question I kept hearing from friends: is this price normal for this part of town?",
        ],
      },
      {
        heading: "How it is built",
        body: [
          "Sales live in a single CSV with neighbourhood, beds, baths, square feet, sale price and month. The site calculates median price and price per square foot by neighbourhood at build time, so there is no database to maintain.",
          "The listing grid deliberately leads with numbers, not photos. A small table of comparable sales sits under every listing, which is the part my test users found most useful.",
        ],
      },
      {
        heading: "About the sample view",
        body: [
          "The chart near the top of this page uses illustrative figures, not real sales, to show how the comparison view is laid out.",
        ],
      },
    ],
    demo: "homes",
  },
  {
    slug: "ledger-budget-app",
    title: "Ledger: a one-screen budget",
    category: "Web",
    track: "Personal",
    year: "2025",
    role: "Design and code",
    tools: ["React", "TypeScript"],
    summary:
      "A minimalist budgeting app I built for my own stipend. One income line, a handful of categories, and a single bar that tells you how much of the month is already spoken for. Try it below.",
    image: img("budget-app.webp", "Flat illustration of a phone screen with a black, grey and red budget bar and ruled category lines"),
    heroOnDetail: false,
    sections: [
      {
        heading: "Why build another budget app",
        body: [
          "Every budgeting app I tried wanted to connect to my bank and categorise three hundred transactions. As a graduate student on a fixed monthly stipend, I only need to plan, not to track: decide where the money goes at the start of the month and see what is left.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Enter monthly income, add or remove categories, and adjust amounts. The bar splits into needs, wants and savings so you can compare against a 50/30/20 rule of thumb. Nothing is stored or sent anywhere; reloading the page resets it.",
        ],
      },
    ],
    demo: "budget",
  },
  {
    slug: "prairie-film",
    title: "Flat Country, on film",
    category: "Photography",
    track: "Personal",
    year: "2024–26",
    role: "Photography, development, scanning",
    tools: ["Pentax K1000", "Ilford HP5+", "Home darkroom"],
    summary:
      "An ongoing black-and-white series about the flat geometry of central Illinois: grain elevators, power lines, concrete and long shadows. Shot on 35 mm and developed in my bathroom.",
    image: img("film-01.webp", "Black and white photograph of a grain elevator and a line of power poles on flat, empty prairie", 1200, 800, "Elevator and power line, east of town. HP5+, 1/250 at f/11."),
    gallery: [
      img("film-02.webp", "Black and white photograph of a stair railing casting hard diagonal shadows on a concrete wall", 1024, 1024, "Stair shadow, campus parking deck, 4 p.m."),
      img("film-03.webp", "Black and white photograph of a water tower seen from below against a pale sky", 1024, 1536, "Water tower with crow, late October."),
    ],
    sections: [
      {
        heading: "About the series",
        body: [
          "When I moved to Urbana, people warned me that there was nothing to look at. I started carrying a manual camera to prove them wrong, and found that the landscape is almost entirely horizontal lines, which makes every vertical thing (an elevator, a pole, a tower) feel enormous.",
          "I shoot one roll a week, usually on a Sunday ride, and develop in HP5+ at box speed. Constraints help: one camera, one lens, one film stock.",
        ],
      },
    ],
  },
  {
    slug: "hand-thrown-ceramics",
    title: "Cups, thrown and trimmed",
    category: "Craft",
    track: "Personal",
    year: "2025",
    role: "Throwing, trimming, glazing",
    tools: ["Stoneware", "Wheel", "Cone 6 glazes"],
    summary:
      "A set of hand-thrown stoneware cups from an evening wheel class. I aimed for six cups that match without being identical, finished in a matte white and an iron red dip.",
    image: img("ceramics.webp", "Three hand-thrown stoneware cups on a white table, two in matte white glaze and one dipped in red-brown glaze"),
    sections: [
      {
        heading: "Process",
        body: [
          "Each cup starts from 350 g of clay. Weighing the clay was the first habit that made a set possible; the second was a cardboard profile rib I cut so every wall follows the same curve.",
          "Out of eleven cups thrown, six survived trimming and firing. I keep a small spreadsheet of clay weight, wet height, fired height and glaze, which is the accountant in me, but it also told me the clay shrinks about 12% from wet to fired.",
        ],
      },
    ],
  },
  {
    slug: "cycling-route-map",
    title: "Every road within 30 miles",
    category: "Analytics",
    track: "Personal",
    year: "2026",
    role: "Data cleaning, mapping",
    tools: ["GPX files", "Python", "GeoPandas"],
    summary:
      "A personal data project: I merged two seasons of ride files into one map of every rural road I have cycled around Champaign County, then measured which parts of the grid I still have not ridden.",
    image: img("cycling-map.webp", "Minimal map of a square rural road grid with one looping route traced in red"),
    sections: [
      {
        heading: "Method",
        body: [
          "Ride files from my bike computer were exported as GPX, snapped to the county road network, and deduplicated so that a road ridden fifty times counts once. Coverage is the share of road miles within 30 miles of campus that appear in at least one ride.",
          "The county's square-mile grid makes this oddly satisfying: the map fills in like a crossword. The figures below are from my own logs, rounded.",
        ],
      },
    ],
    demo: "cycling",
  },
  {
    slug: "typographic-posters",
    title: "Posters for a lecture series",
    category: "Design",
    track: "Personal",
    year: "2025",
    role: "Design and print",
    tools: ["InDesign", "Risograph", "Inter Tight"],
    summary:
      "Three posters for a student-run lecture series, designed on a strict grid with one typeface and one spot colour. Printed on a risograph at the campus library.",
    image: img("posters.webp", "Three framed posters on a white wall, each built from large black geometric shapes and a red bar"),
    sections: [
      {
        heading: "Brief",
        body: [
          "The organisers wanted posters that worked from across a hallway and could be reprinted cheaply for each talk. I built a 12-column grid, set one large letterform per poster as the image, and kept all text in a single weight.",
          "The red is the only colour, which also kept the riso run to two drums. Those constraints became the house style that this website borrows.",
        ],
      },
    ],
  },
  {
    slug: "coptic-notebooks",
    title: "Coptic-bound field notebooks",
    category: "Craft",
    track: "Personal",
    year: "2024",
    role: "Bookbinding",
    tools: ["Waxed linen thread", "Book board", "Bone folder"],
    summary:
      "Small notebooks bound by hand with an exposed coptic stitch, so they lie completely flat. I use them for photo notes and gave the rest away to my study group.",
    image: img("bookbinding.webp", "A stack of white and black hand-bound notebooks with red stitched spines"),
    sections: [
      {
        heading: "Notes",
        body: [
          "Each notebook has six signatures of four folded sheets. The red linen thread is the only decoration. A notebook takes about two hours, most of it spent punching sewing stations with a paper jig so the holes line up across signatures.",
        ],
      },
    ],
  },
  {
    slug: "documenting-analytics",
    title: "Write down every filter",
    category: "Writing",
    track: "Business",
    year: "2026",
    role: "Essay",
    tools: ["Reflection", "ACCY 593"],
    summary:
      "A short post on the most practical habit I picked up this semester: treating an analytics workpaper like an audit trail, where every filter and join is written down before the result.",
    sections: [
      {
        heading: "The post",
        body: [
          "Early in the semester I rebuilt a colleague's analysis and got a different number. Neither of us was wrong. She had excluded reversing entries and I had not, and nothing in her file said so. We spent an hour finding a decision that took her two seconds to make.",
          "Since then I keep a plain list at the top of every notebook: the population, each filter in the order applied, each join and its key, and the row count after every step. It looks tedious. It is the part of the file a reviewer actually reads.",
          "Auditors already think this way about evidence. The habit just carries it into the code: if a reviewer cannot re-perform the step from what is written down, the step is not documented yet.",
          "The surprising benefit is speed. When a manager asks what happens if we include the reversals, the answer is one line to change, not an afternoon of reverse engineering.",
        ],
      },
    ],
  },
];

export const categories: Category[] = ["Analytics", "Systems", "Web", "Writing", "Design", "Photography", "Craft"];

export const featuredSlugs = [
  "journal-entry-anomalies",
  "p2p-process-mining",
  "website-project-cu-homes",
  "internal-controls-dashboard",
  "prairie-film",
  "ledger-budget-app",
];

export function indexOf(slug: string) {
  return String(items.findIndex((i) => i.slug === slug) + 1).padStart(2, "0");
}

export function getItem(slug: string) {
  return items.find((i) => i.slug === slug);
}
