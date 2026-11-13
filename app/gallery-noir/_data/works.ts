export const BASE = "/gallery-noir";

export type Img = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Room = "value" | "photo" | "studio";

export const ROOMS: { id: Room; numeral: string; name: string; note: string }[] = [
  {
    id: "value",
    numeral: "I",
    name: "Value & Analysis",
    note: "Valuation, reporting and design work from the MS in Accountancy.",
  },
  {
    id: "photo",
    numeral: "II",
    name: "Photography",
    note: "Two ongoing series, shot after dark and before sunrise.",
  },
  {
    id: "studio",
    numeral: "III",
    name: "Studio & Stage",
    note: "Music, bookbinding and writing: the things I make with my hands.",
  },
];

export type Feature =
  | "royalty"
  | "intangibles"
  | "identity"
  | "beforeAfter"
  | "homes"
  | "series"
  | "programme"
  | "sketchbook"
  | "post";

export type Work = {
  slug: string;
  no: string;
  title: string;
  subtitle: string;
  room: Room;
  /** True for the business / analytics / design items the assignment counts. */
  business: boolean;
  medium: string;
  year: string;
  /** One or two sentences: what it is. */
  summary: string;
  /** What I did, in my own words. */
  role: string;
  cover: Img;
  feature: Feature;
  series?: Img[];
  body: string[];
  tags: string[];
};

const L = (src: string, alt: string, caption?: string): Img => ({
  src: `${BASE}/${src}`,
  width: 1200,
  height: 800,
  alt,
  caption,
});
const P = (src: string, alt: string, caption?: string): Img => ({
  src: `${BASE}/${src}`,
  width: 1024,
  height: 1536,
  alt,
  caption,
});

export const WORKS: Work[] = [
  {
    slug: "maison-verrier",
    no: "01",
    title: "Relief from Royalty",
    subtitle: "Valuing the Maison Verrier name",
    room: "value",
    business: true,
    medium: "Valuation model, written memo, interactive web model",
    year: "2026",
    summary:
      "A brand valuation of Maison Verrier, a fictional Paris leather-goods house, using the relief-from-royalty method. The model below is live: move the royalty and discount rates and watch the value move.",
    role:
      "Built the five-year forecast and the valuation in Excel for an ACCY 593 case, wrote a four-page memo defending the royalty rate, then rebuilt the core of the model as a small React component so a reader can test my assumptions instead of trusting them.",
    cover: L(
      "maison-verrier.webp",
      "A black structured leather handbag with a gold clasp on a dark marble plinth, beside a printed spreadsheet and a fountain pen",
    ),
    feature: "royalty",
    body: [
      "Relief from royalty asks a simple question: if Maison Verrier did not own its name and had to license it from someone else, what would it pay every year? The brand is worth the present value of the royalties it avoids paying, after tax.",
      "The hard part is the rate. Published licensing ranges for apparel and accessories are wide, so I cross-checked with a profit split. Verrier earns an operating margin of roughly 30% in my forecast. If a licensee would hand over about a third of that profit for the right to use the name (the old 25 to 33% rule of thumb), the implied royalty is around 9 to 10% of sales. I used 9% as the base case and show the rest as sensitivity rather than pretending the number is precise.",
      "The discount rate sits above the company WACC I estimated (about 9%) because a brand is riskier than the business as a whole: it cannot be sold for scrap and a single bad season can dent it. I added a tax amortisation benefit, since a buyer could amortise an acquired brand over 15 years for tax purposes, which raises the value a market participant would pay.",
      "What I took away: the method looks mechanical, but almost all of the value lives in two judgement calls. Writing the memo forced me to say out loud why 9% and not 12%, and that paragraph took longer than the spreadsheet.",
    ],
    tags: ["Valuation", "Intangible assets", "ASC 820", "React"],
  },
  {
    slug: "invisible-balance-sheet",
    no: "02",
    title: "The Invisible Balance Sheet",
    subtitle: "Where intangible assets show up, and where they don't",
    room: "value",
    business: true,
    medium: "Research note with chart",
    year: "2026",
    summary:
      "A short research note on why a company's most valuable assets are often missing from its balance sheet, with a chart comparing book value, recognised intangibles and market value for five sample companies.",
    role:
      "Wrote the note, built the sample data set to illustrate the pattern, and designed the chart in React so it reads on a phone. The companies are composites, not real firms.",
    cover: L(
      "intangibles.webp",
      "An open ledger with empty ruled columns under a glass perfume-bottle sculpture that casts a gold glow onto the blank page",
    ),
    feature: "intangibles",
    body: [
      "Under US GAAP and IFRS, a brand, a customer list or a piece of software built in-house is mostly expensed as it is created. IAS 38 is blunt about it: internally generated brands, mastheads and customer lists are not recognised as assets. The same brand bought in an acquisition, though, is measured at fair value and lands on the balance sheet, often next to a large goodwill figure.",
      "The result is that two companies with identical brands can report very different total assets depending on whether they built or bought them. The chart shows the pattern with sample data: for the luxury house and the software firm, most of the market value sits in the unrecognised gap; for the steel producer, book value and market value are close.",
      "I do not think the answer is to capitalise everything. Self-assessed brand values would be easy to manage and hard to audit. But I came out of this convinced that the notes matter more than the face of the statements for these companies, and that an analyst who reads only the balance sheet is reading the least interesting part.",
    ],
    tags: ["Financial reporting", "IAS 38", "ASC 350", "Data visualisation"],
  },
  {
    slug: "quad-capital-identity",
    no: "03",
    title: "Quad Capital Society",
    subtitle: "A visual identity for a student investment club",
    room: "value",
    business: true,
    medium: "Identity system: mark, palette, type, templates",
    year: "2025",
    summary:
      "An identity system for a student-run investment club: a monogram built from four columns, a restrained palette, and pitch-deck and one-pager templates the analysts actually use.",
    role:
      "Volunteered as the club's design lead. Ran a short survey of members, drew the mark, chose the type, and built the Google Slides and Word templates. I also wrote a two-page usage guide so the next design lead does not have to start over.",
    cover: L(
      "club-identity.webp",
      "Charcoal business cards, letterhead and a notebook with an embossed gold geometric monogram on black linen",
    ),
    feature: "identity",
    body: [
      "The club had four logos in circulation, one of them a stretched stock photo of a bull. Members wanted something that would look serious on a stock pitch slide in front of alumni without looking like a bank.",
      "The mark is four vertical bars of slightly different heights, a nod to the four sector teams and to a bar chart, set inside a square. It works embossed, in one colour, and at favicon size, which I tested before anyone saw it.",
      "The part I am proudest of is the boring part: a pitch template with fixed slots for thesis, valuation, catalysts and risks. Pitches got shorter and more comparable, and the faculty adviser started asking for the template for his own class.",
    ],
    tags: ["Brand identity", "Templates", "Student organisation"],
  },
  {
    slug: "annual-report-redesign",
    no: "04",
    title: "Annual Report, Reconsidered",
    subtitle: "Redesign concept for a regional cooperative",
    room: "value",
    business: true,
    medium: "Editorial design concept, before and after spreads",
    year: "2025",
    summary:
      "A redesign concept for the financial highlights spread of a fictional agricultural cooperative's annual report. Drag the handle to compare the original with my version.",
    role:
      "Audited the original spread, rewrote the headings, cut the charts from six to one, reset the type and grid, and presented the concept in a design-for-accountants workshop.",
    cover: L(
      "report-after.webp",
      "A redesigned annual report spread with generous white space and a single line chart",
    ),
    feature: "beforeAfter",
    series: [
      L(
        "report-before.webp",
        "The original spread: crowded tables, bright pie charts, tiny text and a stock handshake photo",
        "Before",
      ),
      L(
        "report-after.webp",
        "The redesigned spread: one serif headline, one line chart, a calm photograph and white space",
        "After",
      ),
    ],
    body: [
      "The original spread tried to say everything at once: six charts, three tables, a chairman's photo and a stock image of a handshake. The one number members care about, the patronage dividend per bushel, was in 8-point type in a table footnote.",
      "My rules for the redesign: one message per spread, one chart per message, and every chart titled with its conclusion rather than its subject. The headline became the dividend. The five-year revenue trend became a single line chart with the current year labelled directly. Everything else moved to a reference table at the back.",
      "Accountants sometimes treat design as decoration. I think of it as part of disclosure: a number nobody can find has not really been disclosed.",
    ],
    tags: ["Editorial design", "Financial communication", "Information design"],
  },
  {
    slug: "cu-homes",
    no: "05",
    title: "The Website Project",
    subtitle: "Champaign-Urbana home sales, as a website",
    room: "value",
    business: true,
    medium: "Website (HTML, CSS, JavaScript), sample data",
    year: "2026",
    summary:
      "A home-sales website for a college town: listings for Champaign, Urbana and Savoy, filters built around the academic calendar, and a plain-language cost-of-ownership estimate.",
    role:
      "Designed and built the site for the ACCY 593 website project. I wrote the listing data model, the filter logic and the monthly-cost calculator, and tested it with two classmates who were house hunting.",
    cover: L(
      "cu-homes.webp",
      "A laptop on a dark walnut desk showing a real-estate website with house photos and a map, snowy street lights behind",
    ),
    feature: "homes",
    body: [
      "Most listing sites are built for metro areas. A college town has a different rhythm: leases turn over in August, buyers are often faculty on a fixed start date, and a house two blocks from campus is priced on rental potential as much as on square footage.",
      "So the site sorts by move-in date before price, flags homes within walking distance of the main quad and bus lines, and shows a monthly cost that includes property tax and insurance, not just principal and interest. Champaign County property tax rates are high compared with many places buyers move from, and the classmates who tested it said that line surprised them most.",
      "All listings on the site are sample data I wrote to exercise the filters. The point of the project was the structure and the cost model, not a live feed.",
    ],
    tags: ["Web design", "Real estate", "JavaScript", "ACCY 593"],
  },
  {
    slug: "after-hours",
    no: "06",
    title: "After Hours",
    subtitle: "Street photographs, 10 p.m. to 2 a.m.",
    room: "photo",
    business: false,
    medium: "Digital photographs, 35mm equivalent",
    year: "2024 – 2026",
    summary:
      "An ongoing series of night street photographs made walking home from the library, mostly in downtown Champaign and on trips to Chicago.",
    role:
      "Shot, edited and sequenced the series. Everything is available light; I carry one small camera and a 35mm-equivalent lens and do not use flash.",
    cover: L(
      "night-01.webp",
      "A rain-slick downtown street at night with a glowing diner window and a figure with an umbrella",
    ),
    feature: "series",
    series: [
      L(
        "night-01.webp",
        "A rain-slick downtown street at night with a glowing diner window and a figure with an umbrella",
        "Diner, rain. Downtown Champaign.",
      ),
      P(
        "night-02.webp",
        "A figure in a long coat waits on a foggy train platform under a single sodium lamp",
        "Platform, 11:48 p.m.",
      ),
      L(
        "night-03.webp",
        "A lit laundromat seen through its window from across a dark street, one person folding clothes",
        "Laundromat, Sunday.",
      ),
      L(
        "night-04.webp",
        "A warmly lit bus at a snowy stop, a passenger looking out through fogged windows",
        "Last bus, first snow.",
      ),
    ],
    body: [
      "I started this series during my first finals week at Illinois, when the walk home was the only part of the day without a screen. Night strips a street down to a few light sources, and I like how that makes the picture choose for me.",
      "The rule I hold myself to: no staging and no asking. If someone notices me, I lower the camera. The images here are the ones I keep coming back to after two years of walking the same few blocks.",
    ],
    tags: ["Photography", "Street", "Series"],
  },
  {
    slug: "prairie-low-light",
    no: "07",
    title: "Prairie, Low Light",
    subtitle: "Landscapes from the edge of the day",
    room: "photo",
    business: false,
    medium: "Digital photographs, tripod, long exposure",
    year: "2025",
    summary:
      "Landscape photographs of central Illinois, made in the twenty minutes before sunrise and after sunset when the flat land finally has some depth.",
    role:
      "Planned shoots around weather and light, shot on a tripod, and printed a small edition of three for a campus print sale.",
    cover: L(
      "land-01.webp",
      "Flat prairie at last light, tall grasses in silhouette under heavy clouds with a thin amber band of sky",
    ),
    feature: "series",
    series: [
      L(
        "land-01.webp",
        "Flat prairie at last light, tall grasses in silhouette under heavy clouds with a thin amber band of sky",
        "Last light, restored prairie.",
      ),
      P(
        "land-02.webp",
        "A grain elevator rising out of dense morning fog over empty fields",
        "Elevator in fog, 6:40 a.m.",
      ),
      L(
        "land-03.webp",
        "A still lake at dusk in early winter, thin ice at the edges and a dark tree line reflected",
        "First ice.",
      ),
    ],
    body: [
      "People who grew up elsewhere tell me central Illinois is flat and empty. They are half right. In midday light it is. At the edges of the day the horizon turns into the subject and a single grain elevator becomes a landmark for ten miles.",
      "Most of these took several mornings. Fog is hard to forecast, and I got the elevator on the fourth try.",
    ],
    tags: ["Photography", "Landscape", "Series"],
  },
  {
    slug: "programme-note",
    no: "08",
    title: "Élégie, Op. 24",
    subtitle: "Programme note for a spring recital",
    room: "studio",
    business: false,
    medium: "Performance (cello) and written programme note",
    year: "2026",
    summary:
      "The programme note I wrote for a student chamber recital where I played Fauré's Élégie and the Prelude from Bach's Third Cello Suite.",
    role:
      "Performed both pieces on cello, with a pianist friend for the Fauré, and wrote the programme note below for the printed programme.",
    cover: P(
      "cello.webp",
      "A cello resting on a dark stage floor beside an empty chair and music stand under a single spotlight",
    ),
    feature: "programme",
    body: [],
    tags: ["Music", "Cello", "Writing"],
  },
  {
    slug: "coptic-sketchbook",
    no: "09",
    title: "Coptic Sketchbook",
    subtitle: "A hand-bound book, then a year of filling it",
    room: "studio",
    business: false,
    medium: "Bookbinding: bookboard, cloth, waxed linen thread; ink and graphite",
    year: "2025",
    summary:
      "A sketchbook I bound by hand with an exposed coptic stitch so it opens completely flat, and the drawings that filled it over the following year.",
    role:
      "Folded and pierced the signatures, covered the boards, sewed the binding, and then drew in it almost every day: street corners, my cello's scroll, lecture-hall ceilings.",
    cover: L(
      "sketchbook.webp",
      "An open hand-bound sketchbook with exposed coptic stitching, ink drawings of street corners, a bone folder and linen thread beside it",
    ),
    feature: "sketchbook",
    body: [
      "Shop sketchbooks never open flat, and I was tired of drawing across a gutter. A coptic stitch binding has no spine cover, so each signature hinges freely and the book lies open on any page.",
      "The first attempt fell apart at the kettle stitches because I pulled the thread too tight. The second is the one you see here. It has survived a year in a backpack, which is the only test I care about.",
    ],
    tags: ["Bookbinding", "Drawing", "Craft"],
  },
  {
    slug: "sixty-words",
    no: "10",
    title: "Sixty Words",
    subtitle: "What museum labels taught me about footnotes",
    room: "studio",
    business: false,
    medium: "Essay",
    year: "2026",
    summary:
      "A short essay on writing gallery wall labels as a volunteer, and why the discipline of sixty words changed how I write disclosure notes.",
    role:
      "Wrote the essay for my own blog after a semester of drafting labels for a student-curated exhibition.",
    cover: L(
      "wall-label.webp",
      "A small framed photograph of a shuttered bank branch on a charcoal gallery wall, with a blank ivory label card beside it",
    ),
    feature: "post",
    body: [
      "The first label I drafted for the student exhibition was 214 words long. The curator sent it back with one note: sixty, and the visitor is standing up.",
      "A wall label has a reader who is tired, curious, and about to walk away. You get one sentence to tell them what they are looking at, one to tell them why it matters, and maybe one more for the detail they would not notice on their own. Everything else is for the catalogue.",
      "The more I wrote, the more I noticed how close this is to a good disclosure note. A reader of a footnote on intangible assets is also tired and also about to move on. The best notes I have read in 10-Ks do the same three things: say what the number is, say what judgement went into it, and point to the one thing that would change it. The worst ones read like my first label, accurate and exhausting.",
      "I now draft every memo for class twice: once to get the facts down and once with a word limit I set before I start. It is slower. The second draft is always the one the professor quotes back to me.",
      "The exhibition closed in April. My favourite label, for a small photograph of a shuttered bank branch, ended up at 58 words.",
    ],
    tags: ["Writing", "Museums", "Disclosure"],
  },
];

export function getWork(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const CURATED = ["maison-verrier", "after-hours", "invisible-balance-sheet", "prairie-low-light", "annual-report-redesign", "programme-note"];

export const PERSON = {
  name: "Grace Nguyen",
  email: "grace.nguyen@example.com",
  linkedin: "https://www.linkedin.com/",
};
