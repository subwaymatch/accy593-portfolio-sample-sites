export type SampleSite = {
  slug: string;
  style: string;
  person: string;
  focus: string;
  structure: "Single page" | "Multi-page";
  blurb: string;
  accent: string;
};

export const sites: SampleSite[] = [
  {
    slug: "swiss-minimal",
    style: "Swiss Minimal",
    person: "Maya Chen",
    focus: "Audit data analytics",
    structure: "Multi-page",
    blurb: "Strict grid, black and white type, one red accent.",
    accent: "#e2231a",
  },
  {
    slug: "terminal-dark",
    style: "Terminal Dark",
    person: "Dev Patel",
    focus: "Accounting data engineering",
    structure: "Single page",
    blurb: "Code-editor theme with a typed intro and monospace type.",
    accent: "#39d353",
  },
  {
    slug: "editorial-journal",
    style: "Editorial Journal",
    person: "Olivia Brooks",
    focus: "Forensic accounting",
    structure: "Multi-page",
    blurb: "Broadsheet layout, serif type, full-length articles.",
    accent: "#7a1f2b",
  },
  {
    slug: "neo-brutalist",
    style: "Neo-Brutalist",
    person: "Marcus Johnson",
    focus: "Marketing analytics",
    structure: "Single page",
    blurb: "Thick borders, hard shadows, loud colour blocks.",
    accent: "#ff4fa3",
  },
  {
    slug: "pastel-glass",
    style: "Pastel Glass",
    person: "Sofia Ramírez",
    focus: "Tax and nonprofits",
    structure: "Single page",
    blurb: "Frosted cards over soft pastel gradients.",
    accent: "#a78bfa",
  },
  {
    slug: "risograph-print",
    style: "Risograph Print",
    person: "Liam Okafor",
    focus: "Sports business analytics",
    structure: "Multi-page",
    blurb: "Grainy paper, limited inks, halftone details.",
    accent: "#ff6b1a",
  },
  {
    slug: "finance-terminal",
    style: "Finance Dashboard",
    person: "Hana Kim",
    focus: "Corporate finance and valuation",
    structure: "Single page",
    blurb: "Tabbed data dashboard with KPI tiles and sparklines.",
    accent: "#f5a524",
  },
  {
    slug: "scrapbook-craft",
    style: "Scrapbook Craft",
    person: "Emma Larsen",
    focus: "Sustainability reporting",
    structure: "Multi-page",
    blurb: "Kraft paper, pinned polaroids and washi tape.",
    accent: "#c8643b",
  },
  {
    slug: "bento-modern",
    style: "Bento Modern",
    person: "Arjun Mehta",
    focus: "Accounting information systems",
    structure: "Single page",
    blurb: "Bento tile grid with a light and dark theme toggle.",
    accent: "#3b82f6",
  },
  {
    slug: "gallery-noir",
    style: "Gallery Noir",
    person: "Grace Nguyen",
    focus: "Brand valuation and design",
    structure: "Multi-page",
    blurb: "Dark gallery with gold hairlines and a photo lightbox.",
    accent: "#c9a96e",
  },
];
