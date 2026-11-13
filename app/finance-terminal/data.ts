// Content for Hana Kim's portfolio terminal. Everything here is fictional sample data.

export type Category = "analytics" | "personal";

export type WorkItem = {
  id: string;
  ticker: string;
  title: string;
  summary: string;
  category: Category;
  tags: string[];
  date: string;
  /** One headline figure shown in the watchlist and on the card. */
  metric: { label: string; value: string; tone: "up" | "down" | "flat" };
  image?: { src: string; alt: string; width: number; height: number };
  /** Inline SVG thumbnail used when there is no image. */
  glyph?: "chess" | "sheet" | "ledger";
};

export const person = {
  name: "Hana Kim",
  initials: "HK",
  program: "MS in Accountancy",
  school: "Gies College of Business, University of Illinois Urbana-Champaign",
  course: "ACCY 593",
  email: "hana.kim@example.com",
  linkedin: "https://www.linkedin.com/",
  city: "Champaign, IL",
};

export const items: WorkItem[] = [
  {
    id: "dcf-prairie-forge",
    ticker: "PFC.DCF",
    title: "DCF valuation of Prairie Forge Components",
    summary:
      "Five-year unlevered free cash flow model for a fictional $1.1B-revenue castings manufacturer, with a live WACC × terminal growth sensitivity table.",
    category: "analytics",
    tags: ["Valuation", "Excel model", "Interactive"],
    date: "Oct 2026",
    metric: { label: "Implied / share", value: "$41.87", tone: "up" },
    image: {
      src: "/finance-terminal/dcf-valuation.webp",
      alt: "Glowing amber bars shrinking toward the horizon, suggesting cash flows discounted to present value",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "cash-13-week",
    ticker: "CF13.WK",
    title: "Rolling 13-week cash flow forecast",
    summary:
      "Direct-method receipts and disbursements forecast for a small HVAC contractor, built to show when the revolver is needed before payroll weeks.",
    category: "analytics",
    tags: ["FP&A", "Treasury", "Chart"],
    date: "Sep 2026",
    metric: { label: "Low point (wk 7)", value: "$38k", tone: "down" },
    image: {
      src: "/finance-terminal/cash-forecast.webp",
      alt: "Thirteen columns of light rising and falling with a thin amber balance line threaded through them",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "variance-dashboard",
    ticker: "VAR.DSH",
    title: "Budget-vs-actual variance dashboard",
    summary:
      "A one-screen monthly review for a regional dental-supply distributor that splits revenue variance into price, volume and mix before anyone argues about it.",
    category: "analytics",
    tags: ["Dashboard design", "Variance analysis"],
    date: "Aug 2026",
    metric: { label: "Q3 rev. variance", value: "−$212k U", tone: "down" },
    image: {
      src: "/finance-terminal/variance-dashboard.webp",
      alt: "Tilted dashboard mock-up with amber and teal bar charts, donuts and trend lines on a dark panel",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "lease-vs-buy",
    ticker: "LVB.LAB",
    title: "Lease or buy? A −80 °C lab freezer",
    summary:
      "A short write-up comparing the present-value cost of buying versus leasing a research freezer for a campus lab, and why the usual tax argument does not apply.",
    category: "analytics",
    tags: ["Capital budgeting", "Write-up"],
    date: "Jul 2026",
    metric: { label: "Buy saves (PV)", value: "$781", tone: "up" },
    image: {
      src: "/finance-terminal/lease-vs-buy.webp",
      alt: "Wireframe microscope and centrifuge outlined in amber with two cost curves crossing behind them",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "cu-home-ledger",
    ticker: "CUHL.WEB",
    title: "Website Project: CU Home Ledger",
    summary:
      "My ACCY 593 website project: a small site that explains Champaign-Urbana home sales by neighborhood for first-time buyers, grad students and new faculty.",
    category: "analytics",
    tags: ["Website", "Real estate", "ACCY 593"],
    date: "Nov 2026",
    metric: { label: "Sales mapped", value: "412", tone: "flat" },
    image: {
      src: "/finance-terminal/homes-site.webp",
      alt: "Glowing map of a small college town street grid with amber dots marking homes",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "lifo-reserve",
    ticker: "LIFO.NTS",
    title: "Reading the LIFO reserve (a note to myself)",
    summary:
      "A blog-style post on what one footnote taught me about comparing two distributors, one on LIFO and one on FIFO, before computing a single ratio.",
    category: "analytics",
    tags: ["Financial reporting", "Post"],
    date: "Jun 2026",
    metric: { label: "Margin gap closed", value: "1.9 pts", tone: "up" },
    glyph: "ledger",
  },
  {
    id: "chess-italian",
    ticker: "CHESS.G14",
    title: "An annotated loss: the f2 square I forgot to count",
    summary:
      "A rapid game from the Champaign club ladder where I won a pawn on e5 and lost a rook on f2. Board diagrams and notes on where my calculation broke.",
    category: "personal",
    tags: ["Chess", "Annotation"],
    date: "Oct 2026",
    metric: { label: "Rapid rating", value: "1584", tone: "up" },
    glyph: "chess",
  },
  {
    id: "marathon-log",
    ticker: "RUN.26.2",
    title: "Marathon training log",
    summary:
      "Sixteen weeks of training for a spring marathon in Champaign-Urbana, logged in a spreadsheet and charted: weekly mileage and long-run pace.",
    category: "personal",
    tags: ["Running", "Chart"],
    date: "Apr 2026",
    metric: { label: "Finish", value: "3:52:14", tone: "up" },
    image: {
      src: "/finance-terminal/marathon.webp",
      alt: "A runner's legs mid-stride on a foggy rural road at sunrise, cornfields on both sides",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "blue-hour",
    ticker: "PHOTO.BLU",
    title: "Blue Hour, Main Street (photo series)",
    summary:
      "Street photographs taken between 4:40 and 5:30 pm in downtown Champaign and Urbana during the first weeks of winter.",
    category: "personal",
    tags: ["Photography", "Series"],
    date: "Jan 2026",
    metric: { label: "Frames kept", value: "9 / 214", tone: "flat" },
    image: {
      src: "/finance-terminal/street-1.webp",
      alt: "A cyclist passes a glowing storefront awning on a wet downtown street at dusk",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "budget-template",
    ticker: "BUDG.XLS",
    title: "Zero-based budget template for grad school",
    summary:
      "The spreadsheet I use to run my own money on a stipend: zero-based monthly plan, sinking funds for the irregular stuff, and a variance column that keeps me honest.",
    category: "personal",
    tags: ["Spreadsheet", "Personal finance"],
    date: "Aug 2026",
    metric: { label: "YTD vs plan", value: "−1.8%", tone: "up" },
    glyph: "sheet",
  },
  {
    id: "coptic-notebooks",
    ticker: "BIND.CPT",
    title: "Hand-bound coptic-stitch notebooks",
    summary:
      "Small notebooks I sew from folded signatures and waxed linen thread. I keep one for each semester's study notes and give the rest away.",
    category: "personal",
    tags: ["Craft", "Bookbinding"],
    date: "Ongoing",
    metric: { label: "Books sewn", value: "17", tone: "up" },
    image: {
      src: "/finance-terminal/bookbinding.webp",
      alt: "Overhead view of a hand-sewn notebook, waxed thread, an awl and a bone folder on a dark wooden desk",
      width: 1200,
      height: 800,
    },
  },
];

export const tickerStats: { label: string; value: string; delta?: string; tone: "up" | "down" | "flat" }[] = [
  { label: "PROJECTS SHIPPED", value: "11", delta: "+3 TERM", tone: "up" },
  { label: "CPA SECTIONS", value: "2/4", delta: "AUD · FAR", tone: "up" },
  { label: "DCF MODELS BUILT", value: "6", delta: "+2", tone: "up" },
  { label: "MARATHON PR", value: "3:52:14", delta: "−4:31", tone: "up" },
  { label: "CHESS RAPID", value: "1584", delta: "+62", tone: "up" },
  { label: "MILES YTD", value: "1,046", delta: "+18%", tone: "up" },
  { label: "BUDGET VAR YTD", value: "−1.8%", delta: "UNDER", tone: "up" },
  { label: "COFFEES / WK", value: "9", delta: "−2", tone: "down" },
  { label: "NOTEBOOKS SEWN", value: "17", delta: "+4", tone: "up" },
  { label: "EXCEL SHORTCUTS", value: "112", delta: "+30", tone: "up" },
];

export const kpis = [
  {
    label: "Projects shipped",
    value: "11",
    delta: "+3 this term",
    tone: "up" as const,
    spark: [2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 10, 11],
    note: "Cumulative, Dec 2025 to Nov 2026",
  },
  {
    label: "CPA exam progress",
    value: "2 / 4",
    delta: "REG booked Jan",
    tone: "flat" as const,
    spark: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    note: "AUD and FAR passed; BAR is my discipline section",
  },
  {
    label: "Long-run pace",
    value: "8:39/mi",
    delta: "−0:29 vs wk 1",
    tone: "up" as const,
    spark: [548, 545, 546, 540, 537, 538, 533, 531, 528, 527, 523, 525, 521, 524, 519],
    note: "Marathon block, weeks 1–15",
    invert: true,
  },
  {
    label: "Chess rapid rating",
    value: "1584",
    delta: "+62 in 90 days",
    tone: "up" as const,
    spark: [1510, 1522, 1515, 1531, 1540, 1536, 1549, 1561, 1555, 1570, 1578, 1584],
    note: "Club ladder plus online",
  },
];

export const skills: { name: string; level: number; note: string }[] = [
  { name: "Excel modeling (3-statement, DCF, LBO basics)", level: 90, note: "Daily" },
  { name: "Financial statement analysis", level: 85, note: "Coursework + 10-K reading" },
  { name: "Power BI / Tableau dashboards", level: 70, note: "Two shipped dashboards" },
  { name: "SQL (joins, window functions)", level: 60, note: "Audit analytics course" },
  { name: "Python (pandas)", level: 45, note: "Learning, slowly" },
];

export const courses = [
  { code: "ACCY 593", name: "Portfolio and professional communication", status: "In progress" },
  { code: "FIN", name: "Corporate finance", status: "A" },
  { code: "ACCY", name: "Advanced financial reporting", status: "A" },
  { code: "ACCY", name: "Data analytics for accountants", status: "A−" },
  { code: "FIN", name: "Valuation seminar", status: "In progress" },
];
