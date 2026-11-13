// Content for "The Footnote", Olivia Brooks's editorial portfolio.
// Every work item is one article page at /editorial-journal/work/<slug>.

export type Img = { src: string; alt: string; w: number; h: number; caption?: string };

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string; cite?: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "img"; img: Img }
  | { t: "poem"; title: string; lines: string[] }
  | { t: "table"; caption: string; head: string[]; rows: string[][] }
  | { t: "transcript"; lines: { who: string; text: string }[] }
  | { t: "outline"; items: { time: string; title: string; note: string }[] }
  | { t: "benford" }
  | { t: "newsletter" }
  | { t: "homes" };

export type Desk = "business" | "personal";

export type Item = {
  slug: string;
  desk: Desk;
  kicker: string;
  title: string;
  dek: string;
  did: string;
  date: string;
  read: string;
  image: Img;
  body: Block[];
};

const I = "/editorial-journal";

export const person = {
  name: "Olivia Brooks",
  email: "olivia.brooks@example.com",
  linkedin: "https://www.linkedin.com/",
  program: "MS in Accountancy",
  school: "Gies College of Business, University of Illinois Urbana-Champaign",
  course: "ACCY 593",
};

export const issue = {
  paper: "The Footnote",
  volume: "Vol. II",
  number: "No. 11",
  place: "Urbana, Illinois",
  date: "November 2026",
};

const rawItems: Item[] = [
  {
    slug: "shell-vendor",
    desk: "business",
    kicker: "Fraud Examination",
    title: "How a Shell Vendor Hides in Plain Sight",
    dek: "The red flags in a vendor master file rarely look suspicious on their own. The pattern is what gives a fake supplier away.",
    did: "Wrote a 550-word essay for general readers, drawing on my fraud examination coursework, and turned it into a three-test checklist I would run on a real vendor file.",
    date: "Nov. 4, 2026",
    read: "4 min read",
    image: {
      src: `${I}/shell-vendor.webp`,
      alt: "Engraved illustration of an open ledger, a magnifying glass and a stack of invoices in front of an empty storefront",
      w: 1200,
      h: 800,
      caption: "The vendor on the invoice and the storefront behind it are not always the same thing.",
    },
    body: [
      { t: "p", text: "The first fake vendor I ever found was called something like Midstate Facility Services. It was sitting in a practice dataset for a fraud examination course, and it looked exactly like the forty other facility vendors around it. That was the point. A shell vendor is not designed to look strange. It is designed to look boring." },
      { t: "p", text: "In a typical billing scheme, someone with access to the vendor master file sets up a company that exists only on paper, then submits invoices from it for work nobody can easily check: consulting, cleaning, \"maintenance.\" The payments land in a bank account the employee controls. The ACFE's Report to the Nations has ranked billing schemes among the most common forms of asset misappropriation for years, and the reason is not complicated. Accounts payable is built to pay invoices, not to doubt them." },
      { t: "h", text: "The tells are small, and they rhyme" },
      { t: "p", text: "No single red flag proves anything. Plenty of honest small businesses use a PO box. What makes a shell vendor visible is the way several ordinary details line up at once:" },
      { t: "list", items: [
        "Address overlap. The remit-to address or bank account matches an employee's record in the HR system. This is the most useful join an analyst can run.",
        "A thin paper trail. No W-9 on file, a phone number that goes to voicemail, a website registered a few weeks before the first invoice.",
        "Amounts that hug a limit. Invoices for $4,800, $4,850 and $4,900, every month, just under a $5,000 approval threshold.",
        "Vague descriptions. \"Services rendered\" or \"Q3 support,\" with no deliverable anyone could walk over and look at.",
        "One sponsor. The same manager approves every invoice, and the vendor first appeared soon after that manager was given approval rights.",
        "Sequential invoice numbers. A real supplier bills many customers. If we receive invoice 1001, then 1002, then 1003, we may be its only customer.",
      ] },
      { t: "quote", text: "A shell vendor is not designed to look strange. It is designed to look boring." },
      { t: "h", text: "Why the controls miss it" },
      { t: "p", text: "Most of these flags live in different systems. The address is in HR, the bank details are in the vendor master, the approval history is in a workflow log, and the invoice descriptions are in scanned PDFs. Each team sees one piece, and each piece looks fine. Segregation of duties is supposed to stop the scheme before it starts, because the person who adds a vendor should not be the person who approves its bills. In smaller offices, though, one trusted person often does both, usually because they are good at the job and nobody else has time." },
      { t: "h", text: "What I would actually test" },
      { t: "p", text: "If someone handed me a vendor master tomorrow, I would start with three joins: vendor addresses and bank accounts against employee records; vendors created in the last year against whoever approved their first invoice; and invoice amounts against the approval thresholds. Then I would read the descriptions on whatever falls out. Data narrows the search. A person still has to look." },
      { t: "p", text: "The lesson I keep coming back to is that fraud examination is less about catching a clever trick and more about noticing when ordinary things agree with each other a little too well." },
    ],
  },
  {
    slug: "benford-expenses",
    desk: "business",
    kicker: "Data Analysis",
    title: "Testing 1,240 Expense Lines Against Benford's Law",
    dek: "A first-digit analysis of a sample expense dataset, and the one cost center that refused to follow the curve.",
    did: "Built a sample expense dataset, computed first-digit frequencies and the mean absolute deviation in a spreadsheet, and designed the interactive chart on this page.",
    date: "Oct. 22, 2026",
    read: "5 min read",
    image: {
      src: `${I}/benford.webp`,
      alt: "Engraved illustration of receipts spilling from a wire tray beside an old adding machine and a pencil",
      w: 1200,
      h: 800,
      caption: "Twelve hundred receipts, one question: how often does each amount start with a 1?",
    },
    body: [
      { t: "p", text: "Benford's law is the oddest thing I have learned in graduate school that turned out to be useful. In many real-world collections of numbers, the leading digit is not evenly spread from 1 to 9. About 30 percent of values start with a 1, and fewer than 5 percent start with a 9. The expected share for each digit d is log10(1 + 1/d). Auditors use the pattern as a screening test: when a set of transactions drifts far from it, something about how those numbers were produced deserves a closer look." },
      { t: "p", text: "For this project I built a sample dataset of 1,240 employee expense lines across five cost centers. The data is constructed for practice, not taken from any real company, but I gave it the shape real expense data tends to have: lots of small meals and parking charges, fewer hotel stays, and a handful of large conference fees." },
      { t: "benford" },
      { t: "h", text: "Reading the result" },
      { t: "p", text: "To put a number on \"close enough,\" I used the mean absolute deviation (MAD): the average gap between the observed and expected proportion across all nine digits. Mark Nigrini's widely used cutoffs for first-digit tests treat a MAD under 0.006 as close conformity and anything above 0.015 as nonconformity." },
      { t: "p", text: "The full sample conforms closely, with a MAD of about 0.002. That is what I hoped to see, since it suggests the dataset behaves like natural spending. The interesting part appears when I filter to a single cost center, which I labelled Field Operations. Its MAD jumps to roughly 0.029, and almost all of the gap comes from one digit. Claims starting with 4 make up 21.7 percent of its lines, against an expected 9.7 percent." },
      { t: "quote", text: "A spike is not an accusation. It is a reason to pull twenty receipts and read them." },
      { t: "p", text: "In my sample policy, any single claim of $500 or more needs a second approval. A cluster of claims between $400 and $499 is exactly what you would expect if people were splitting larger purchases, or rounding a claim to stay under the line. It is also what you would expect if Field Operations simply buys a lot of one $450 safety item. The test cannot tell those stories apart. Only the documents can." },
      { t: "h", text: "Caveats I would put in any memo" },
      { t: "list", items: [
        "Benford's law only fits data that spans several orders of magnitude and is not assigned (invoice numbers and ZIP codes do not qualify).",
        "Small samples wobble. With 212 lines, Field Operations is near the low end of what I would trust.",
        "Policy shapes data. Per diems, fixed fees and price lists create legitimate spikes.",
      ] },
      { t: "p", text: "What I liked about this exercise is how it changed the question. Instead of \"is anything wrong in 1,240 lines,\" it became \"why do these 46 claims start with a 4,\" which is a question a person can actually answer in an afternoon." },
    ],
  },
  {
    slug: "worldcom-case",
    desk: "business",
    kicker: "Case Study",
    title: "The Line Costs That Became Assets: Revisiting WorldCom",
    dek: "How one of the largest accounting frauds in U.S. history came down to a single, very ordinary question: is this an expense or an asset?",
    did: "Researched the WorldCom scandal from public accounts and wrote a case study in my own words for a seminar discussion, focusing on the accounting mechanics and the controls that failed.",
    date: "Oct. 9, 2026",
    read: "5 min read",
    image: {
      src: `${I}/case-study.webp`,
      alt: "Engraved illustration of a telecom tower over flat land with ledger pages blowing out of an open book",
      w: 1200,
      h: 800,
      caption: "In a telecom company, the biggest expense is often the network you do not own.",
    },
    body: [
      { t: "p", text: "Most accounting scandals are remembered for their complexity. WorldCom is worth studying for the opposite reason. At its center was a decision every first-year accounting student practices: whether a cost belongs on the income statement now, or on the balance sheet to be spread over future years." },
      { t: "h", text: "The business" },
      { t: "p", text: "WorldCom grew through the 1990s by buying other telecom companies, including MCI in 1998. Like other long-distance carriers, it paid other networks to carry its traffic over their lines. Those payments, called line costs, were its single largest expense. When the telecom boom faded around 2000, revenue growth slowed, but line costs did not shrink to match." },
      { t: "h", text: "The mechanics" },
      { t: "p", text: "According to the investigations that followed, senior finance staff first leaned on reserves, releasing accruals to reduce reported expenses. When that ran out, they began in 2001 to record billions of dollars of ordinary line costs as capital expenditures. The effect of that one reclassification is worth slowing down for:" },
      { t: "list", items: [
        "Operating expenses fell, so operating income and net income rose.",
        "The cost moved from operating to investing activities in the cash flow statement, which made operating cash flow look stronger too.",
        "The new \"assets\" would be depreciated slowly, so the true cost leaked into later years instead of hitting the current one.",
      ] },
      { t: "quote", text: "A capitalized cost is a promise that something will produce value later. A fee for last month's phone traffic cannot keep that promise." },
      { t: "h", text: "How it came apart" },
      { t: "p", text: "The fraud was uncovered in 2002 by WorldCom's own internal audit group, led by Cynthia Cooper. The team noticed capital expenditure entries that did not correspond to any real assets, traced them back, and took their findings to the board's audit committee. In June 2002 the company announced that about $3.8 billion of expenses had been improperly capitalized. Later reviews put the total misstatement at roughly $11 billion. WorldCom filed for bankruptcy in July 2002, at the time the largest in U.S. history. Its chief financial officer pleaded guilty, and its chief executive was convicted in 2005." },
      { t: "h", text: "What I take from it" },
      { t: "p", text: "Three lessons stay with me. First, large manual journal entries made after the close, in round amounts, by senior people, are exactly where testing should go. Second, internal audit only works if it can report around management, which is what Cooper's team did. Third, the timing matters: WorldCom's collapse came weeks before the Sarbanes-Oxley Act was signed in July 2002, and it is a big part of why that law focuses so heavily on management's responsibility for internal control." },
      { t: "p", text: "I went into this case expecting a story about complex instruments. I came out of it thinking about the debit side of a very simple entry." },
    ],
  },
  {
    slug: "going-concern",
    desk: "business",
    kicker: "Explainer",
    title: "What a Going-Concern Warning Actually Says",
    dek: "It sounds like a death notice. It is closer to a weather advisory. A plain-language guide for readers who are not accountants.",
    did: "Wrote a plain-language explainer for general readers, tested it on three non-accounting friends, and rewrote the parts they found confusing.",
    date: "Sept. 30, 2026",
    read: "4 min read",
    image: {
      src: `${I}/going-concern.webp`,
      alt: "Engraved illustration of a small main-street shop at dusk with its lamp still lit",
      w: 1200,
      h: 800,
      caption: "Open for business, for now. That is roughly what the phrase means.",
    },
    body: [
      { t: "p", text: "Every so often a headline announces that a company's auditor has raised \"substantial doubt about its ability to continue as a going concern.\" Friends have asked me whether that means the company is about to close. Usually the honest answer is: not necessarily, but you should read the next few pages." },
      { t: "h", text: "The assumption underneath everything" },
      { t: "p", text: "Financial statements are normally prepared on the assumption that the business will keep operating. That is why a factory is shown at what it cost, less depreciation, rather than at what it would fetch in a fire sale next week. The going-concern assumption is what lets accountants spread costs over the years a business expects to use them." },
      { t: "h", text: "Who checks, and over what time frame" },
      { t: "p", text: "Under U.S. accounting standards, management has to look ahead roughly one year and ask whether conditions such as recurring losses, debt coming due, or a lost major customer raise substantial doubt that the company can pay its obligations. The auditor makes its own evaluation. If the doubt remains after considering management's plans, like raising new capital or selling a division, the auditor's report includes an extra paragraph saying so, and the notes to the financial statements must explain what is going on." },
      { t: "quote", text: "A going-concern paragraph is less a prediction than a disclosure: these are the risks, and this is the plan." },
      { t: "h", text: "What it does not mean" },
      { t: "list", items: [
        "It is not a forecast of bankruptcy. Many companies receive the warning and recover.",
        "It is not a judgment that management did anything wrong.",
        "Its absence is not a guarantee. Businesses fail without one, sometimes because conditions change quickly after the report is signed.",
      ] },
      { t: "h", text: "How to read one" },
      { t: "p", text: "If you see the phrase, skip straight to the note that explains it. Look for three things: the specific conditions that created the doubt, the actions management says it will take, and whether those actions are already underway or still hopes. \"We have signed a new credit agreement\" is a very different sentence from \"we intend to seek additional financing.\"" },
      { t: "p", text: "When I tested a draft of this on three friends, a nurse, a music teacher and a software engineer, all three said the weather comparison helped. An advisory tells you to pay attention and plan. It does not tell you the storm has arrived." },
    ],
  },
  {
    slug: "trial-balance-newsletter",
    desk: "business",
    kicker: "Design",
    title: "The Trial Balance: Redesigning a Campus Accounting Newsletter",
    dek: "A student accounting society's monthly email went from a wall of bullet points to a three-column front page people actually scroll.",
    did: "Redesigned the monthly newsletter for a student accounting society: a new masthead, a reusable three-column layout, a type system, and a recurring advice column. The issue below is rebuilt in HTML from my design file.",
    date: "Sept. 12, 2026",
    read: "3 min read",
    image: {
      src: `${I}/newsletter.webp`,
      alt: "Engraved illustration of a small tabletop printing press beside a stack of folded newsletters",
      w: 1200,
      h: 800,
      caption: "Twelve issues a year, one layout that does not change.",
    },
    body: [
      { t: "p", text: "The society's newsletter used to be a single email with twenty-three bullet points, sent the first Monday of the month. Open rates were fine. Click rates were not. When I volunteered to take it over, I asked five members what they actually wanted from it. Every one of them said some version of \"tell me what is happening this week, and tell me who to talk to.\"" },
      { t: "h", text: "Design decisions" },
      { t: "list", items: [
        "One lead item per issue, chosen by the officers, instead of every announcement shouting at the same size.",
        "A fixed three-column grid: events on the left, the lead in the middle, recruiting deadlines on the right. On a phone the lead moves to the top and the two lists stack beneath it.",
        "Two typefaces only, a serif for headlines and a plain sans for dates and times, so a reader can scan for numbers.",
        "A recurring column, \"Ask a Second-Year,\" which quickly became the most-clicked section.",
      ] },
      { t: "newsletter" },
      { t: "p", text: "The names, dates and events in the sample above are placeholders I use in the template, so the layout can be shared without anyone's real details. The biggest lesson was that a newsletter is a promise about where to look. Once the layout stayed the same every month, members stopped reading the whole thing and started going straight to the column they needed, which is exactly the point." },
    ],
  },
  {
    slug: "cu-home-sales",
    desk: "business",
    kicker: "Website Project",
    title: "Porch & Ledger: A Champaign-Urbana Home Sales Site",
    dek: "A small, fast website for comparing recent home sales across a college town, built for buyers who care more about price per square foot than about stock photos.",
    did: "Planned, designed and built a home sales website for Champaign-Urbana: the information architecture, the listing cards, the neighborhood filter and the price-per-square-foot summary. The working demo below runs on sample data.",
    date: "Aug. 28, 2026",
    read: "3 min read",
    image: {
      src: `${I}/cu-homes.webp`,
      alt: "Engraved illustration of a tree-lined street with a foursquare house and a bungalow with front porches",
      w: 1200,
      h: 800,
      caption: "Foursquares, bungalows and a lot of oak trees: the housing stock this site was built around.",
    },
    body: [
      { t: "p", text: "Champaign-Urbana is a strange housing market to search. Graduate students, faculty, hospital staff and families all compete for the same older houses near campus, while newer subdivisions on the edges of town follow a different logic entirely. Most listing sites treat every buyer the same way: big photos first, numbers buried. I wanted the opposite." },
      { t: "h", text: "What the site does" },
      { t: "list", items: [
        "Shows each sale as a compact card with price, size, price per square foot and days on market in a consistent order.",
        "Lets a buyer filter by area and minimum bedrooms, then re-sorts instantly without a page load.",
        "Summarizes whatever is on screen as a median price and a median price per square foot, so comparisons are honest about what is being compared.",
      ] },
      { t: "homes" },
      { t: "h", text: "What I learned building it" },
      { t: "p", text: "The hardest part was not code. It was deciding which number should be biggest on each card. I tested three versions with classmates and the price-per-square-foot layout won, because it let them compare a small bungalow near campus with a larger house in Savoy without doing arithmetic in their heads. The medians matter for the same reason: one unusual sale should not set anyone's expectations for a whole neighborhood." },
      { t: "p", text: "Every listing in the demo is sample data I wrote to test the layout. No addresses are real." },
    ],
  },
  {
    slug: "sourdough-journal",
    desk: "personal",
    kicker: "Kitchen Notes",
    title: "Sourdough Journal: Twelve Loaves and a Spreadsheet",
    dek: "What happens when an accounting student keeps a baking log. Mostly: better bread, and an unreasonable number of columns.",
    did: "Baked twelve loaves over eight weeks, photographed them, and tracked hydration, proof time and kitchen temperature to find out why half of them came out flat.",
    date: "Nov. 1, 2026",
    read: "3 min read",
    image: {
      src: `${I}/sourdough-loaf.webp`,
      alt: "Photograph of a round sourdough loaf with a deep scored ear cooling on a wire rack next to a jar of starter",
      w: 1200,
      h: 800,
      caption: "Loaf eleven. The first one I was not embarrassed to bring to a potluck.",
    },
    body: [
      { t: "p", text: "My starter is named Ledger, which tells you most of what you need to know about this project. I began baking in September because my apartment was cold and I needed something to do with my hands that was not typing. By the third flat loaf I did what I always do when something goes wrong more than once. I opened a spreadsheet." },
      { t: "table", caption: "Selected entries from the log", head: ["Loaf", "Hydration", "Bulk proof", "Kitchen", "Result"], rows: [
        ["#2", "80%", "4 h", "64°F", "Flat, gummy"],
        ["#5", "75%", "6 h", "65°F", "Better rise, tight crumb"],
        ["#8", "72%", "7.5 h", "66°F", "Good ear, slightly dense"],
        ["#11", "72%", "8 h, oven light on", "74°F", "Open crumb, good ear"],
      ] },
      { t: "p", text: "The pattern was embarrassingly clear once it was in rows. I was following a recipe written for a warm kitchen and ending the bulk proof on the clock instead of by how the dough looked. My apartment sits around 64 degrees in the fall, so everything moved slower than the recipe expected. Dropping hydration made the dough easier to shape, but the real fix was time and warmth: turning on the oven light (oven off) to give the dough a warmer place to rise." },
      { t: "img", img: { src: `${I}/sourdough-crumb.webp`, alt: "Photograph of a sourdough loaf cut in half showing an open, irregular crumb", w: 1024, h: 1024, caption: "The crumb on loaf eleven. Irregular holes mean the fermentation finally kept up." } },
      { t: "p", text: "I like baking for the same reason I like reconciliations. Both reward patience and punish shortcuts, and both get easier once you stop trusting your memory and start writing things down. Loaf thirteen is proofing as I write this." },
    ],
  },
  {
    slug: "ledger-lines",
    desk: "personal",
    kicker: "Verse",
    title: "Ledger Lines: Four Short Poems",
    dek: "Small poems written between problem sets, about prairie weather, small print and the things we carry into next year.",
    did: "Wrote and revised a series of four short poems over one semester, reading them at a campus open mic in October.",
    date: "Oct. 17, 2026",
    read: "2 min read",
    image: {
      src: `${I}/poems.webp`,
      alt: "Engraved illustration of flat prairie at dusk with a grain elevator on the horizon and a crescent moon",
      w: 1024,
      h: 1024,
      caption: "East of Urbana, looking toward nothing in particular.",
    },
    body: [
      { t: "p", text: "I write poems the way some people doodle in the margins of lecture notes. These four came out of a single fall semester, mostly on the bus between Gies and my apartment. Accounting shows up in all of them, which I did not plan." },
      { t: "poem", title: "Reconciliation", lines: ["At month's end the numbers", "come home like cattle,", "one by one through the gate,", "and I count them twice", "because the second time", "is the one I believe."] },
      { t: "poem", title: "Prairie, November", lines: ["The fields are paid down to stubble.", "A grain elevator holds the horizon", "like a pencil behind an ear.", "Nothing out here is owed.", "The wind collects anyway."] },
      { t: "poem", title: "Footnote", lines: ["Small print is where the truth goes", "to sit down. Read it slowly.", "It was written by someone", "who knew you wouldn't."] },
      { t: "poem", title: "Carryforward", lines: ["What I didn't finish this year", "I bring across the line in pencil:", "a letter to my grandmother,", "the bread I keep underproofing,", "a certain kind of patience.", "Opening balance: still here."] },
    ],
  },
  {
    slug: "field-sketches",
    desk: "personal",
    kicker: "Field Notes",
    title: "Field Sketches: A Year of Birds Around Urbana",
    dek: "Ink drawings and a running species log from early-morning walks in Urbana's parks, made with a cheap pen and a lot of standing still.",
    did: "Kept a pen-and-ink sketchbook on weekend walks for twelve months, logging every species I could identify and drawing the ones that stayed still long enough.",
    date: "Sept. 21, 2026",
    read: "3 min read",
    image: {
      src: `${I}/birds.webp`,
      alt: "Ink sketchbook page with a cardinal on a branch, a hawk in flight and a pair of sandhill cranes",
      w: 1200,
      h: 800,
      caption: "A spread from the spring sketchbook: cardinal, red-tailed hawk, and cranes passing overhead.",
    },
    body: [
      { t: "p", text: "I started birding the way a lot of people do, by accident. A red-tailed hawk landed on a light pole outside the library while I was studying for an exam, and I spent ten minutes watching it instead of reviewing lease accounting. The next weekend I bought a field guide and a sketchbook." },
      { t: "p", text: "I am not a good artist, and the sketchbook has made peace with that. Drawing a bird forces me to look at it longer than a photo would: where the light catches the wing, how the tail sits, what it does with its feet. Most of my pages are half-finished, because birds leave." },
      { t: "img", img: { src: `${I}/birds-heron.webp`, alt: "Pen-and-ink sketch of a great blue heron standing in shallow water among reeds", w: 1024, h: 1024, caption: "Great blue heron, the most patient model I have had all year." } },
      { t: "table", caption: "From the species log (selected)", head: ["Month", "Species", "Note"], rows: [
        ["January", "Northern cardinal", "Bright against snow; easiest first sketch"],
        ["March", "Sandhill crane", "Heard before seen, a high flock heading north"],
        ["May", "Red-winged blackbird", "Claims every cattail, loudly"],
        ["July", "Great blue heron", "Stood still for twenty minutes"],
        ["October", "Red-tailed hawk", "Back on the same light pole"],
      ] },
      { t: "p", text: "My year-end count was 64 species, which serious birders will find modest. I am proud of it anyway. Like a good audit sample, it is not everything that was out there, but every line in it is something I actually saw." },
    ],
  },
  {
    slug: "off-the-books-podcast",
    desk: "personal",
    kicker: "Audio",
    title: "Off the Books, Episode 6: Counting Birds Like an Auditor",
    dek: "An episode outline and transcript excerpt from the hobby podcast I co-host with a classmate, about what the Christmas Bird Count has in common with sampling.",
    did: "Co-host and producer: I wrote the outline, booked the guest segment, recorded and edited the episode, and prepared the transcript.",
    date: "Aug. 14, 2026",
    read: "4 min read",
    image: {
      src: `${I}/podcast.webp`,
      alt: "Engraved illustration of a vintage ribbon microphone, headphones and a coffee cup on a small table",
      w: 1024,
      h: 1024,
      caption: "Our studio is a study room with a borrowed microphone and good intentions.",
    },
    body: [
      { t: "p", text: "Off the Books is a small podcast my classmate Dev and I record about the things accounting students do when they are not doing accounting. Each episode takes one hobby and asks what it has in common with our day jobs. Episode 6 was about birding, and specifically about Audubon's Christmas Bird Count, a volunteer census that has run every winter since 1900." },
      { t: "h", text: "Episode outline" },
      { t: "outline", items: [
        { time: "00:00", title: "Cold open", note: "A recording of a chickadee, and Dev guessing it is a car alarm." },
        { time: "01:30", title: "What the Christmas Bird Count is", note: "Volunteers count every bird they can within a 15-mile-wide circle on one day between mid-December and early January." },
        { time: "06:10", title: "Counting is sampling", note: "Why a count is an estimate, and how effort (hours, miles, observers) is recorded so results can be compared year to year." },
        { time: "14:45", title: "The auditor's angle", note: "Coverage, consistency and documentation: the same three things we test in an audit." },
        { time: "22:30", title: "Listener question", note: "Is it cheating to count a bird you only heard?" },
        { time: "27:00", title: "Close", note: "What each of us is counting next month." },
      ] },
      { t: "h", text: "Transcript excerpt (14:45)" },
      { t: "transcript", lines: [
        { who: "Dev", text: "So you are telling me a bird count has an audit trail." },
        { who: "Olivia", text: "It kind of has to. If one year the count says there were twice as many crows, the first question is whether there were more crows or more people looking. So every team writes down how many hours they spent and how far they walked." },
        { who: "Dev", text: "That is just documenting your sample." },
        { who: "Olivia", text: "Exactly. It is the same reason we write down which invoices we pulled and why. Without that, nobody can tell if the number changed or the effort changed." },
        { who: "Dev", text: "Okay, but what about the bird you only hear?" },
        { who: "Olivia", text: "If you are confident in the identification, it counts. But you note that it was heard, not seen. Evidence has different strengths, and you say which kind you have. Honestly that might be the most auditor sentence I have ever said on this show." },
      ] },
      { t: "p", text: "Editing this episode taught me more about pacing than any writing class. Cutting a four-minute tangent about crow intelligence hurt, but the episode is better for it." },
    ],
  },
  {
    slug: "typewriter-restoration",
    desk: "personal",
    kicker: "Workshop",
    title: "Bringing a 1950s Typewriter Back to Work",
    dek: "Twenty-two dollars at an estate sale, three weekends of cleaning, and a cost ledger I kept out of habit.",
    did: "Cleaned, adjusted and re-ribboned a mid-century portable typewriter, documented each step, and tracked every cost against what a shop restoration would have charged.",
    date: "July 30, 2026",
    read: "3 min read",
    image: {
      src: `${I}/typewriter.webp`,
      alt: "Engraved illustration of a 1950s portable typewriter with tools, a brush and an oil can laid out beside it",
      w: 1200,
      h: 800,
      caption: "Mid-repair, with every screw lined up in the order it came out.",
    },
    body: [
      { t: "p", text: "I found the typewriter at an estate sale in Champaign, sitting under a box of Christmas ornaments. The case was scuffed, the carriage would not move, and three keys were stuck together in a little metal knot. It cost twenty-two dollars. I told myself it was for writing letters, which is true, and that I would not spend much more on it, which turned out to be mostly true." },
      { t: "h", text: "The work" },
      { t: "list", ordered: true, items: [
        "Photographed every side before touching anything, so I could put it back together.",
        "Freed the stuck typebars with mineral spirits and a soft brush, one slot at a time.",
        "Cleaned decades of eraser crumbs out of the carriage track, which was the real reason it would not move.",
        "Replaced the dried-out ribbon and the cracked feet, and lightly oiled only the points that move against each other.",
        "Typed a full page of test sentences and adjusted the line spacing until the rows were even.",
      ] },
      { t: "table", caption: "The cost ledger", head: ["Item", "Cost"], rows: [
        ["Typewriter (estate sale)", "$22.00"],
        ["Ribbon", "$9.50"],
        ["Rubber feet (set of four)", "$7.00"],
        ["Mineral spirits and brushes", "$11.25"],
        ["Total", "$49.75"],
      ] },
      { t: "p", text: "I keep the ledger partly as a joke and partly because I genuinely like knowing what something cost. Fifty dollars and three weekends bought a machine that works, and a better understanding of how something purely mechanical fits together. It now sits on my desk next to my laptop. I use it for thank-you notes, and for first drafts of essays when I need to stop deleting sentences and just finish one." },
    ],
  },
];

// Typographer's quotes: turn straight quotes and apostrophes into curly ones
// for every piece of display text (image paths and slugs are left alone).
export function smart(text: string) {
  return text
    .replace(/(^|[\s(\[—-])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/'/g, "’");
}

function smartDeep<T>(value: T, key = ""): T {
  if (typeof value === "string") {
    return (key === "src" || key === "slug" ? value : smart(value)) as T;
  }
  if (Array.isArray(value)) return value.map((v) => smartDeep(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, smartDeep(v, k)])) as T;
  }
  return value;
}

export const items: Item[] = rawItems.map((it) => smartDeep(it));

export const businessItems = items.filter((i) => i.desk === "business");
export const personalItems = items.filter((i) => i.desk === "personal");

export function getItem(slug: string) {
  return items.find((i) => i.slug === slug);
}
