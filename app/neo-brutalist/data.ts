export type Category = "business" | "creative";

export type Demo =
  | "rfm"
  | "palette"
  | "abtest"
  | "elasticity"
  | "homes"
  | "post"
  | "skate"
  | "zine"
  | "beats"
  | "tees"
  | "posters";

export type WorkItem = {
  id: string;
  title: string;
  category: Category;
  kind: string;
  tags: string[];
  summary: string;
  /** Paragraphs shown in the detail modal under "What I did". */
  body: string[];
  image?: { src: string; alt: string; width: number; height: number };
  color: "yellow" | "pink" | "blue" | "mint";
  demo: Demo;
};

export const work: WorkItem[] = [
  {
    id: "coffee-rfm",
    title: "Who actually comes back? RFM segments for a coffee shop",
    category: "business",
    kind: "Analytics",
    tags: ["RFM", "Excel", "Python"],
    summary:
      "Split 14 months of loyalty-card history into five customer segments and found that 12% of regulars bring in 38% of revenue.",
    body: [
      "The owner of a small Urbana coffee shop wanted to know whether her loyalty program was doing anything beyond giving away free lattes. I took a 14-month export of anonymised loyalty accounts and scored each one on Recency (days since last visit), Frequency (visits) and Monetary value (total spend), using quintiles for each.",
      "I collapsed the 125 possible score combinations into five segments that a person running a register could actually remember: Champions, Loyal regulars, New this term, At risk and Hibernating. The chart below compares each segment's share of customers with its share of revenue.",
      "My recommendation was not to discount Champions at all (they already come in four times a week) and instead to send a single win-back offer to the At-risk group in the second week of each semester, when campus routines reset. The memo was two pages, because nobody reads page three.",
    ],
    image: {
      src: "/neo-brutalist/coffee.webp",
      alt: "Flat illustration of a takeaway coffee cup, a punch card and a scatter-plot sticker",
      width: 1200,
      height: 800,
    },
    color: "yellow",
    demo: "rfm",
  },
  {
    id: "food-truck",
    title: "Fork & Bolt: rebrand concept for a campus food truck",
    category: "business",
    kind: "Brand strategy",
    tags: ["Branding", "Logo", "Palette"],
    summary:
      "A new name, logo and four-colour palette for a rice-bowl truck that was invisible on Green Street after 9 pm.",
    body: [
      "The truck served good food under a muddy brown wrap and a name nobody could spell. Most of its sales happen late at night, so I started from one constraint: you should be able to spot it from half a block away under streetlights.",
      "I proposed the name Fork & Bolt (fast food that is actually food), a round emblem that still reads when it is printed one inch wide on a napkin, and a palette of four flat colours plus black. Every colour pair used for text passes WCAG AA contrast so the menu board stays legible.",
      "The deliverable was a one-page brand board and a mock-up of the wrap. I priced a partial wrap from two local shops so the owner could compare the concept with a realistic budget, not just a pretty picture.",
    ],
    image: {
      src: "/neo-brutalist/food-truck.webp",
      alt: "Flat illustration of a pink and yellow food truck with a fork and lightning bolt emblem, above four colour swatches",
      width: 1200,
      height: 800,
    },
    color: "pink",
    demo: "palette",
  },
  {
    id: "email-ab",
    title: "A/B test readout: subject lines for a bookstore newsletter",
    category: "business",
    kind: "Marketing analytics",
    tags: ["A/B testing", "Stats", "Email"],
    summary:
      "Two subject lines, 8,000 subscribers, one honest answer: the open-rate lift is real, the click lift is not proven yet.",
    body: [
      "An independent bookstore wanted to know if a more specific subject line would get more people to open its monthly newsletter. Version A was the usual \"Our fall restock is here\". Version B was \"12 books our staff can't stop passing around\". Each went to a random half of an 8,000-person list.",
      "I ran two-proportion z-tests on opens and clicks and reported 95% confidence intervals instead of just a winner. Opens went from 24.1% to 27.9% (z ≈ 3.9). Clicks went from 3.1% to 3.9%, but that difference (z ≈ 1.95) sits right at the edge of significance.",
      "I also flagged that Apple Mail Privacy Protection inflates opens, so clicks are the number the store should care about. The readout recommended making B-style subject lines the default and re-running the test on clicks with two sends pooled together.",
    ],
    image: {
      src: "/neo-brutalist/email.webp",
      alt: "Flat illustration of a pink and a blue email envelope with sticker badges and a cursor clicking the blue one",
      width: 1200,
      height: 800,
    },
    color: "blue",
    demo: "abtest",
  },
  {
    id: "elasticity",
    title: "Price elasticity calculator (try it)",
    category: "business",
    kind: "Interactive tool",
    tags: ["Pricing", "React", "Economics"],
    summary:
      "A small calculator that turns two price points into an elasticity estimate and shows what a price change does to revenue and margin.",
    body: [
      "Most small-business owners I talk to have run a price experiment without calling it that: they raised the price of something and watched what happened. This tool turns that before-and-after into a midpoint (arc) elasticity, which is less sensitive to which point you start from.",
      "The second half uses that elasticity to project units, revenue and contribution margin for a new price. It assumes constant elasticity, which is only reasonable for modest changes, so the slider stops at plus or minus 30%.",
      "The default numbers are a made-up bubble tea example: a $5.75 drink raised to $6.25, with weekly cups falling from 820 to 760. Change any field and the results update.",
    ],
    image: {
      src: "/neo-brutalist/pricing.webp",
      alt: "Flat illustration of a price tag, a downward-sloping demand curve, a slider and a stack of coins",
      width: 1200,
      height: 800,
    },
    color: "mint",
    demo: "elasticity",
  },
  {
    id: "website-project",
    title: "The Website Project: CU Home Finder",
    category: "business",
    kind: "Website project",
    tags: ["Web design", "Real estate", "Champaign-Urbana"],
    summary:
      "A home sales site for Champaign-Urbana built around how grad students, staff and young faculty actually shop for a first house.",
    body: [
      "For the website project I designed a home sales site for Champaign-Urbana. Most listing sites treat every town the same, but here the questions are specific: how far is it from campus by bus, is it in the Champaign or Urbana school district, and is it cheaper to buy than to keep renting for the four years of a PhD.",
      "I sorted homes by neighbourhood (Downtown Champaign, West Urbana, Savoy, Southwest Champaign) and added a rent-versus-buy note to every listing, based on a 4-year hold. The filter below is a working slice of the prototype using a hand-made sample of listings.",
      "The hardest part was cutting features. The first wireframe had a mortgage calculator, a school map and a bus-route overlay on every page. User testing with five friends showed they only used the neighbourhood filter and the rent comparison, so those became the core.",
    ],
    image: {
      src: "/neo-brutalist/homes.webp",
      alt: "Illustration of a browser window showing three Midwestern houses, a pink map pin and a grid of listing cards",
      width: 1200,
      height: 800,
    },
    color: "yellow",
    demo: "homes",
  },
  {
    id: "oat-milk-post",
    title: "Blog: why the 75-cent oat milk upcharge works",
    category: "business",
    kind: "Blog post",
    tags: ["Pricing", "Writing", "Small business"],
    summary:
      "A short post on add-on pricing: why customers shrug at a 75-cent upcharge but would complain about a 50-cent increase on every drink.",
    body: [
      "I wrote this after a class discussion on partitioned pricing, when I realised I had been watching it happen at every coffee counter in town.",
    ],
    color: "pink",
    demo: "post",
  },
  {
    id: "skate-series",
    title: "Parking Lot Season: a skate photo series",
    category: "creative",
    kind: "Photography",
    tags: ["35mm", "Flash", "Skateboarding"],
    summary:
      "Three rolls of film shot in empty lots and a public bowl between October and the first snow.",
    body: [
      "Every fall there are about six weeks when the light is good after class and the lots near campus are empty. I shot my friends skating on a borrowed 35mm camera with a cheap on-camera flash, which freezes the trick and makes the sky go dark and saturated.",
      "I picked these three frames out of about 100. My rule for the edit was that each photo had to show the place as much as the trick.",
    ],
    image: {
      src: "/neo-brutalist/skate-1.webp",
      alt: "Low-angle photo of a skateboarder mid-ollie over a parking lot curb at dusk",
      width: 1024,
      height: 1536,
    },
    color: "blue",
    demo: "skate",
  },
  {
    id: "zine",
    title: "Static: a self-published photocopy zine",
    category: "creative",
    kind: "Zine",
    tags: ["Print", "Collage", "Self-published"],
    summary:
      "A 24-page black-and-white zine about the local skate scene. Printed 60 copies, sold out at $4 each.",
    body: [
      "Static started as a way to do something with the photos that did not make the series. Each issue is 24 pages, half-letter, photocopied and stapled by hand. Layout is cut-and-paste: printed photos, typewritten captions and a lot of glue stick.",
      "Issue one had 60 copies. I sold them at a local show and through friends, which covered the copying cost ($71) with a little left over for issue two. Doing the math on paper weight versus postage is how I learned that a 28-page zine costs more to mail than it earns.",
    ],
    image: {
      src: "/neo-brutalist/zine.webp",
      alt: "Overhead photo of an open photocopied zine with grainy skate photos, a pink stapler and a stack of copies",
      width: 1200,
      height: 800,
    },
    color: "mint",
    demo: "zine",
  },
  {
    id: "beats",
    title: "Late-night beats (with a playable loop)",
    category: "creative",
    kind: "Music",
    tags: ["Beat-making", "Web Audio", "Drums"],
    summary:
      "I make lo-fi hip-hop beats on a secondhand pad controller. Below is a tiny drum machine I built so you can poke at one of my patterns.",
    body: [
      "Most nights I make a beat before bed. The rule is that it has to be finished in an hour, even if it is bad, which has taught me more about structure than any tutorial.",
      "The loop player below synthesises a kick, snare and hi-hat in your browser with the Web Audio API (no samples, no downloads). The grid starts on a pattern I use a lot, with a slightly late snare. Click any step to change it.",
    ],
    image: {
      src: "/neo-brutalist/beats.webp",
      alt: "Flat illustration of a colourful drum pad controller, headphones and a cassette",
      width: 1200,
      height: 800,
    },
    color: "yellow",
    demo: "beats",
  },
  {
    id: "tees",
    title: "Screen-printed T-shirts for the skate crew",
    category: "creative",
    kind: "Screen printing",
    tags: ["Printmaking", "Merch", "Costing"],
    summary:
      "Two-colour shirts printed by hand in a friend's garage. 40 shirts, two screens, one very sore arm.",
    body: [
      "I designed a two-colour wheel-and-stars graphic, burned two screens and hand-pulled 40 shirts for our skate crew. Registering the second colour on the first try is still my proudest moment of the year.",
      "Because I cannot help myself, I also built a cost sheet: blanks, ink, emulsion and screens came to $6.85 per shirt. We sold them at $15, which paid for the next batch of blanks.",
    ],
    image: {
      src: "/neo-brutalist/tees.webp",
      alt: "Flat illustration of a stack of folded T-shirts with a wheel and stars print, a screen frame and a squeegee",
      width: 1200,
      height: 800,
    },
    color: "pink",
    demo: "tees",
  },
  {
    id: "posters",
    title: "Gig posters for friends' bands",
    category: "creative",
    kind: "Graphic design",
    tags: ["Posters", "Illustration", "Risograph"],
    summary:
      "A set of flyers for basement shows around Champaign. Each one has to work stapled to a pole in the rain.",
    body: [
      "When friends' bands play house shows they need a poster in about three days. I keep the brief simple: one bold image, the date in the biggest type, and no more than two ink colours so it can be printed cheaply.",
      "These three are from last spring. The text has been removed here because the venues are people's living rooms.",
    ],
    image: {
      src: "/neo-brutalist/posters.webp",
      alt: "Flat illustration of three gig posters taped to a wall, showing a lightning bolt, a cassette and a sun",
      width: 1200,
      height: 800,
    },
    color: "blue",
    demo: "posters",
  },
];
