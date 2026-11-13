import type { WorkTile } from "./WorkGallery";
import SodMatrix from "./SodMatrix";
import LoanCalculator from "./LoanCalculator";
import styles from "./work.module.css";

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className={styles.figure}>
      <img src={src} alt={alt} width={1200} height={800} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type Entity = { name: string; fields: [string, string?][] };

const ENTITIES: Entity[] = [
  { name: "member", fields: [["member_id", "PK"], ["netid"], ["full_name"], ["email"], ["is_officer"]] },
  { name: "venue", fields: [["venue_id", "PK"], ["name"], ["capacity"]] },
  { name: "event", fields: [["event_id", "PK"], ["venue_id", "FK"], ["title"], ["starts_at"], ["status"]] },
  { name: "ticket_tier", fields: [["tier_id", "PK"], ["event_id", "FK"], ["label"], ["list_price"], ["quota"]] },
  { name: "order", fields: [["order_id", "PK"], ["member_id", "FK"], ["buyer_email"], ["placed_at"], ["status"]] },
  { name: "order_line", fields: [["line_id", "PK"], ["order_id", "FK"], ["tier_id", "FK"], ["qty"], ["unit_price"]] },
  { name: "ticket", fields: [["ticket_id", "PK"], ["line_id", "FK"], ["qr_token"], ["holder_name"]] },
  { name: "payment", fields: [["payment_id", "PK"], ["order_id", "FK"], ["amount"], ["method"], ["kind"]] },
  { name: "check_in", fields: [["check_in_id", "PK"], ["ticket_id", "FK"], ["scanned_by", "FK"], ["scanned_at"]] },
];

const RELATIONSHIPS = [
  "venue 1 to many event",
  "event 1 to many ticket_tier",
  "member 0..1 to many order (guests can buy without an account)",
  "order 1 to many order_line",
  "ticket_tier 1 to many order_line",
  "order_line 1 to many ticket (one row per seat, each with its own QR)",
  "order 1 to many payment (sales, refunds and partial refunds)",
  "ticket 1 to 0..many check_in (re-entry is logged, not overwritten)",
  "member 1 to many check_in as scanner",
];

function Erd() {
  return (
    <div className={styles.erd}>
      <ul className={styles.entities}>
        {ENTITIES.map((e) => (
          <li key={e.name} className={styles.entity}>
            <p className={styles.entityName}>{e.name}</p>
            <ul>
              {e.fields.map(([f, k]) => (
                <li key={f}>
                  <code>{f}</code>
                  {k ? <span data-key={k}>{k}</span> : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ul className={styles.rels}>
        {RELATIONSHIPS.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export const WORK: WorkTile[] = [
  {
    id: "audit-evidence-assistant",
    title: "Audit evidence assistant",
    kind: "business",
    tag: "AI in audit · Prototype",
    size: "wide",
    summary:
      "A prototype that vouches vendor invoices to purchase orders and receiving records, then sorts each one into matched, needs review, or no match, with a reason code for anything it isn't sure about.",
    image: {
      src: "/bento-modern/audit-assistant.webp",
      alt: "Laptop mockup of the review screen: an invoice and a purchase order side by side, with matching rows linked and check or warning chips on each line.",
    },
    tools: ["Python", "pandas", "Tesseract OCR", "rapidfuzz", "Streamlit", "JSON Schema"],
    body: (
      <>
        <p>
          In my undergrad AIS course we vouched forty invoices by hand for an expenditure-cycle case. The judgment
          part took ten minutes. The other three hours were finding the PO number, the receiving report, and
          checking that quantities and prices agreed. I wanted to see how much of that second part a small tool
          could take over, and where it would break.
        </p>
        <Figure
          src="/bento-modern/audit-assistant.webp"
          alt="Review screen mockup with an invoice on the left and its matched purchase order on the right."
          caption="The review screen. Each invoice line is linked to the PO line it matched, with a green check or an amber flag."
        />
        <h4>How it works</h4>
        <ol className={styles.steps}>
          <li>
            <strong>Ingest.</strong> A folder of PDF invoices plus two CSV exports from the ERP: open purchase
            orders and goods receipts.
          </li>
          <li>
            <strong>Extract.</strong> If the PDF has a text layer I use it; otherwise Tesseract OCRs the page.
            Header fields (vendor, invoice number, date, PO reference, total) come from regex and layout rules.
            Line items go through a language model prompt that has to return JSON, which is validated against a
            schema before anything uses it.
          </li>
          <li>
            <strong>Match.</strong> Exact match on PO number first. With no PO reference, it looks for open POs
            from the same vendor (names normalised, fuzzy score of 90 or more) where the total is within 2% or
            $25. Then line by line: quantity invoiced can&apos;t exceed quantity received, and unit price has to be
            within tolerance of the PO price.
          </li>
          <li>
            <strong>Route.</strong> Every invoice lands in one of three buckets. Anything not cleanly matched gets
            a reason code such as <code>PRICE_VAR</code>, <code>QTY_OVER_RECEIPT</code> or{" "}
            <code>NO_PO_REF</code>, so the reviewer starts from the problem instead of from scratch.
          </li>
        </ol>
        <Figure
          src="/bento-modern/audit-pipeline.webp"
          alt="Isometric illustration of invoices moving through a scanner and splitting into green, amber and coral trays."
          caption="The pipeline in one picture: extract, match, then route to matched, needs review, or no match."
        />
        <h4>Results on a synthetic test set</h4>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Bucket</th>
                <th scope="col">Invoices</th>
                <th scope="col">What I found checking by hand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Matched</th>
                <td>168</td>
                <td>3 were wrong: all split invoices billed against one PO.</td>
              </tr>
              <tr>
                <th scope="row">Needs review</th>
                <td>38</td>
                <td>Mostly price variances and missing PO references. 11 were fine on inspection.</td>
              </tr>
              <tr>
                <th scope="row">No match</th>
                <td>8</td>
                <td>6 were phone photos the OCR could not read.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4>Limits, honestly</h4>
        <ul className={styles.bullets}>
          <li>
            It checks agreement, not validity. A fake invoice that matches a fake PO sails straight through. That
            risk lives in vendor master and PO approval controls, which this tool doesn&apos;t touch.
          </li>
          <li>
            Every document was synthetic: 214 invoices I generated from a public sample P2P dataset. I have not
            run it on real client data and wouldn&apos;t without a firm&apos;s approval and a proper data agreement.
          </li>
          <li>
            The model step is the least reliable part, so it is only allowed to fill line items. The total always
            comes from the document, and if the lines don&apos;t sum to it the invoice goes to review.
          </li>
          <li>
            Partial shipments and one invoice covering several POs are handled badly. That is the next thing I
            would fix.
          </li>
          <li>It does not decide whether evidence is sufficient. That is still the auditor&apos;s call.</li>
        </ul>
      </>
    ),
  },
  {
    id: "loan-amortization",
    title: "Loan amortization calculator",
    kind: "business",
    tag: "Finance · Interactive",
    size: "single",
    summary:
      "A working calculator: payment, total interest, a yearly schedule, and what an extra monthly payment actually saves.",
    teaser: (
      <span className={styles.loanTeaser} aria-hidden="true">
        <span className={styles.loanFigure}>$1,477.73</span>
        <span className={styles.loanSub}>per month · $240k · 6.25% · 30y</span>
        <span className={styles.loanBars}>
          {[92, 88, 84, 79, 73, 66, 58, 49, 38, 26].map((h, i) => (
            <span key={i} style={{ height: `${100 - h + 8}%` }} />
          ))}
        </span>
      </span>
    ),
    tools: ["React", "TypeScript", "SVG"],
    body: (
      <>
        <p>
          My cousin asked me whether paying an extra $200 a month on her mortgage was worth it, and the bank&apos;s
          calculator only gave her the monthly payment. So I built one that shows the whole schedule. Try the
          defaults, then put 200 in the extra payment box.
        </p>
        <LoanCalculator />
        <h4>Notes on the math</h4>
        <p>
          The scheduled payment is <code>M = P·r(1+r)^n / ((1+r)^n − 1)</code>, where <code>r</code> is the monthly
          rate and <code>n</code> the number of payments. Interest is rounded to the cent each month, the way a
          servicer would post it, and the last payment is trimmed so the balance lands on exactly zero. At a 0%
          rate it falls back to straight-line principal.
        </p>
      </>
    ),
  },
  {
    id: "ticketing-erd",
    title: "Ticketing data model for a student org",
    kind: "business",
    tag: "Information systems · ERD",
    size: "single",
    summary:
      "A normalised data model to replace a Google Form and a spreadsheet for a dance group selling about 600 tickets to its spring show.",
    image: {
      src: "/bento-modern/ticketing-erd.webp",
      alt: "3D illustration of database tables as rounded cards connected by crow's-foot relationship lines, one card shaped like a ticket.",
    },
    tools: ["ER modeling", "SQL (PostgreSQL)", "dbdiagram-style notation"],
    body: (
      <>
        <p>
          A friend&apos;s dance group sold tickets through a form that dumped into a spreadsheet. Refunds were
          deleted rows, comps were typed in by hand, and at the door two officers checked names against a printed
          list. Reconciling ticket revenue to the bank deposits after the show took a weekend. I designed the
          model below so the numbers would tie by construction.
        </p>
        <Erd />
        <h4>Design decisions</h4>
        <ul className={styles.bullets}>
          <li>
            <strong>Price lives on the order line,</strong> not only on the tier. If the officers change the early
            bird price later, past revenue doesn&apos;t silently change with it.
          </li>
          <li>
            <strong>Payments are their own table</strong> with a <code>kind</code> of sale or refund. A refund is a
            new negative row, never an edit, so the ledger has a trail.
          </li>
          <li>
            <strong>One ticket row per seat</strong>, each with a QR token, so a group order of six can still
            be checked in one person at a time.
          </li>
          <li>
            <strong>Check-ins are logged</strong> instead of a single <code>used</code> flag, which shows re-entry
            and who scanned whom. That made the door reconcilable to the tickets sold.
          </li>
        </ul>
        <p>
          The control I cared about most: sum of payments by event equals the deposit total, and tickets checked
          in never exceed tickets issued. Both are now one query each.
        </p>
      </>
    ),
  },
  {
    id: "sod-conflict-matrix",
    title: "ERP access review: SoD conflict matrix",
    kind: "business",
    tag: "IT audit · Interactive",
    size: "wide",
    summary:
      "A segregation-of-duties review for a made-up company's purchasing, payables and GL teams. Filter by department and risk, or pick a cell to see who holds that pair.",
    image: {
      src: "/bento-modern/sod-matrix.webp",
      alt: "3D isometric grid of tiles with several glowing coral tiles marking conflicts, with padlocks and keys floating nearby.",
    },
    tools: ["Excel (Power Query)", "React", "COSO / SoD rule design"],
    body: (
      <>
        <p>
          Access reviews are where my information systems background and the audit coursework overlap most.
          I started this in Excel with a user-to-permission export and a rules table, then rebuilt it here so the
          filtering is easier to show. The twelve users and their access are invented, but the conflict pairs are
          the classic purchase-to-pay and record-to-report ones.
        </p>
        <SodMatrix />
        <h4>What I would tell the client</h4>
        <ul className={styles.bullets}>
          <li>
            <strong>M. Chen</strong> can set up vendors, enter invoices and release payments. That is the
            highest-risk combination in the set and should be split before anything else.
          </li>
          <li>
            <strong>P. Walsh&apos;s firefighter ID</strong> holds everything, which is normal for emergency access but
            only acceptable with a ticket per use and a log review by someone outside IT.
          </li>
          <li>
            Where a small team can&apos;t split duties (Treasury has two people), a compensating control works: a
            monthly review of payments by someone who can&apos;t release them.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cu-home-sales",
    title: "Website Project: Champaign-Urbana home sales",
    kind: "business",
    tag: "Web · Marketing",
    size: "wide",
    summary:
      "A concept site for a small brokerage selling homes in a college town, aimed at faculty and grad students relocating to Champaign-Urbana.",
    image: {
      src: "/bento-modern/cu-homes.webp",
      alt: "Tablet mockup of a home listings site showing a grid of brick and sided houses on tree-lined streets next to a map with pins.",
    },
    tools: ["Figma", "HTML/CSS", "JavaScript", "Google Sheets as a data source"],
    body: (
      <>
        <p>
          This was the website project for an undergrad e-commerce course, which I have since cleaned up. The
          brief was a home sales site for a local business. I picked Champaign-Urbana because the buyers are
          unusual: a lot of them are moving here for a university job, they are buying from another state, and
          they often have a few weekends to see houses.
        </p>
        <Figure
          src="/bento-modern/cu-homes.webp"
          alt="Mockup of the listings page with photo cards and a map panel."
          caption="Listings page: photo cards on the left, a map on the right, filters across the top."
        />
        <h4>What I built</h4>
        <ul className={styles.bullets}>
          <li>
            A listings page with filters for price, bedrooms and neighbourhood, fed by a sheet of 60 sample
            listings with made-up addresses and prices.
          </li>
          <li>
            A &ldquo;commute to campus&rdquo; field on every card (walk, bike and bus minutes), because in interviews
            with three relocating grad students that was the first thing all of them asked about.
          </li>
          <li>
            Short neighbourhood guides and a rent-versus-buy page for people who will only be here for a
            five-year PhD.
          </li>
        </ul>
        <h4>What the listing card shows, and why</h4>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Field</th>
                <th scope="col">Why it earned a spot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Price and price per sq ft</th>
                <td>Out-of-state buyers had no feel for local prices; the ratio gave them one.</td>
              </tr>
              <tr>
                <th scope="row">Minutes to campus</th>
                <td>The top question in every interview.</td>
              </tr>
              <tr>
                <th scope="row">Lease-friendly flag</th>
                <td>Many buyers expect to rent the house out when they leave.</td>
              </tr>
              <tr>
                <th scope="row">Virtual tour badge</th>
                <td>Buyers flying in for one weekend shortlist from tours first.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If I rebuilt it now I would put the data in a real database and add a saved-search email, which is the
          feature a brokerage would actually pay for.
        </p>
      </>
    ),
  },
  {
    id: "treasurer-reconciliation",
    title: "What a club's books taught me about controls",
    kind: "business",
    tag: "Blog post · Accounting",
    size: "single",
    summary:
      "A short post on two years as treasurer of a 90-member student club, and the three controls I added after a $412 surprise.",
    teaser: (
      <span className={styles.postTeaser} aria-hidden="true">
        <span className={styles.postQuote}>&ldquo;The bank was right. Our spreadsheet was the one lying.&rdquo;</span>
        <span className={styles.postMeta}>Blog · 4 min read</span>
      </span>
    ),
    tools: ["Excel", "Venmo and bank statements", "A lot of patience"],
    body: (
      <div className={styles.post}>
        <p>
          In my second year of undergrad I became treasurer of a 90-member hiking club. I inherited a spreadsheet,
          a debit card that three people used, and a Venmo account tied to the previous treasurer&apos;s phone.
          In October the bank balance was $412 lower than the sheet said it should be.
        </p>
        <p>
          It took two evenings to find. Some of it was a trailhead parking reimbursement paid twice, once by Venmo
          and once in cash. Some was a rental deposit we never got back because nobody asked. None of it was
          theft. All of it was the predictable result of having no process.
        </p>
        <h4>Three things I changed</h4>
        <ol className={styles.steps}>
          <li>
            <strong>Monthly bank reconciliation, signed by someone else.</strong> I did it; the president
            initialled it. It took twenty minutes once the sheet was set up properly.
          </li>
          <li>
            <strong>Reimbursements need a receipt and a second officer&apos;s approval</strong> before money moves,
            and they are paid only one way: through the bank, never cash.
          </li>
          <li>
            <strong>One card, one holder.</strong> The other two cards were cancelled and the Venmo was moved to a
            club email so it would survive the next officer handover.
          </li>
        </ol>
        <p>
          When I read about segregation of duties in my first auditing class, it was the first textbook concept
          that felt like something I already knew. Small organisations can&apos;t split every duty, but they can
          almost always add a second pair of eyes after the fact. That is most of what I did, and the books tied
          every month after that.
        </p>
      </div>
    ),
  },
  {
    id: "drone-landscapes",
    title: "Drone landscapes of central Illinois",
    kind: "personal",
    tag: "Photography",
    size: "wide",
    summary:
      "Aerial photos of the flattest landscape in the country, which turns out to be all geometry from 120 metres up.",
    image: {
      src: "/bento-modern/drone-prairie.webp",
      alt: "Top-down aerial photo of harvested farm fields split by a straight gravel road, with long tree shadows at golden hour.",
    },
    tools: ["Sub-250 g drone", "Lightroom", "FAA TRUST certificate"],
    body: (
      <>
        <p>
          People told me there was nothing to photograph around here. From the ground that is almost fair. From the
          air the section roads, field edges and drainage ditches turn into clean lines, and in October the
          harvest leaves alternating stripes of gold and brown.
        </p>
        <div className={styles.gallery}>
          <Figure
            src="/bento-modern/drone-prairie.webp"
            alt="Aerial view looking straight down at golden fields divided by a gravel road and a line of autumn trees."
            caption="Harvest week, 6:40 pm. Shot straight down so the road becomes a single line."
          />
          <Figure
            src="/bento-modern/drone-lake.webp"
            alt="Sunrise over a misty prairie lake with a small wooden dock and orange and gold autumn trees along the shore."
            caption="Sunrise over a county lake, low mist, mid-October."
          />
        </div>
        <h4>How I shoot</h4>
        <ul className={styles.bullets}>
          <li>
            Much of Champaign-Urbana sits in controlled airspace near Willard Airport, so I fly out in the county
            and check the airspace app before every flight.
          </li>
          <li>Golden hour only. Midday light flattens everything that makes these photos work.</li>
          <li>
            I bracket three exposures and blend them in Lightroom so the sky and the fields both keep detail.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pi-robot",
    title: "Line-following Raspberry Pi robot",
    kind: "personal",
    tag: "Hardware · Python",
    size: "single",
    summary:
      "A two-wheeled robot that follows a line of blue painter's tape with its camera and stops for anything closer than 15 cm.",
    image: {
      src: "/bento-modern/pi-robot.webp",
      alt: "Small two-wheeled robot with a Raspberry Pi board, a camera on a mast and an ultrasonic sensor on the front, on a wooden desk.",
    },
    tools: ["Raspberry Pi 4", "Python", "OpenCV", "L298N motor driver", "HC-SR04 sensor"],
    body: (
      <>
        <Figure
          src="/bento-modern/pi-robot.webp"
          alt="The robot on a desk: Pi board, camera mast, ultrasonic sensor and two coral wheels."
          caption="Version three. The camera mast moved up 4 cm so it could see the tape further ahead."
        />
        <p>
          The camera frame is converted to HSV, thresholded for the blue tape, and the centroid of the bottom third
          of the image tells the robot how far off-centre it is. A simple proportional controller turns that error
          into a speed difference between the two motors. The ultrasonic sensor runs in its own thread and cuts the
          motors if something is within 15 cm.
        </p>
        <h4>What went wrong first</h4>
        <ul className={styles.bullets}>
          <li>Glossy floors reflect the ceiling lights and look like tape. Matte floors only, so far.</li>
          <li>
            Proportional-only control wobbled on curves. Lowering the gain and slowing down fixed most of it; adding
            a derivative term is next.
          </li>
          <li>Powering the Pi and motors from one battery pack caused brownouts. Two packs solved it.</li>
        </ul>
      </>
    ),
  },
  {
    id: "habit-tracker",
    title: "Habit tracker app: UI design",
    kind: "personal",
    tag: "Product design",
    size: "wide",
    summary:
      "Three screens for a habit app built around one rule, “never miss twice”, tested with five classmates as a clickable prototype.",
    image: {
      src: "/bento-modern/habit-app.webp",
      alt: "Three phone mockups of a habit tracker: a weekly streak grid, a ring progress chart, and a list of habits with toggles.",
    },
    tools: ["Figma", "Clickable prototype", "5 usability sessions"],
    body: (
      <>
        <Figure
          src="/bento-modern/habit-app.webp"
          alt="Three phone screens: streak grid, progress ring and habit list."
          caption="Week grid, daily ring and the habit list. Coral marks a miss; two in a row is the only alert."
        />
        <p>
          Most habit apps punish you for breaking a streak, which in my experience is exactly when people quit. This
          design only nudges you after two misses in a row, and the main screen is a week grid rather than a streak
          counter, so one bad day looks like one square, not a reset to zero.
        </p>
        <h4>What testing changed</h4>
        <ul className={styles.bullets}>
          <li>
            Four of five testers tried to check off a habit by tapping the grid, not the list. Both work now.
          </li>
          <li>I cut badges entirely. Nobody noticed they were gone.</li>
          <li>The ring chart originally showed a percentage. People preferred &ldquo;3 of 4 done&rdquo;.</li>
        </ul>
      </>
    ),
  },
  {
    id: "desk-organiser",
    title: "3D-printed modular desk organiser",
    kind: "personal",
    tag: "CAD · 3D printing",
    size: "single",
    summary:
      "Interlocking pen cups, a phone stand and a calculator dock that slide together on dovetails, designed to fit my exam calculator exactly.",
    image: {
      src: "/bento-modern/desk-organiser.webp",
      alt: "Indigo and coral 3D-printed desk organiser with hexagonal pen cups, a phone stand, a sticky note tray and a calculator dock.",
    },
    tools: ["Fusion 360", "PLA", "Calipers"],
    body: (
      <>
        <Figure
          src="/bento-modern/desk-organiser.webp"
          alt="The finished organiser on a desk holding pens, scissors, a phone and a calculator."
          caption="Five modules, about 14 hours of printing in total."
        />
        <p>
          I wanted a place for the calculator I use for the CPA exam practice sets, and nothing off the shelf fit
          it. Each module is parametric in Fusion 360, so changing one dimension resizes the dovetails on every
          piece that connects to it.
        </p>
        <h4>Iterations</h4>
        <ul className={styles.bullets}>
          <li>v1: 0.1 mm clearance on the dovetails. They did not slide; they fused.</li>
          <li>v2: 0.3 mm. Wobbly enough that the phone stand tipped over.</li>
          <li>v3: 0.2 mm with a small chamfer on the leading edge. That is the one on my desk.</li>
        </ul>
      </>
    ),
  },
  {
    id: "keyboard-build",
    title: "65% mechanical keyboard build",
    kind: "personal",
    tag: "Hobby build",
    size: "single",
    summary:
      "A frosted acrylic 65% board with lubed linear switches and tuned stabilisers. Built mostly because spreadsheets deserve a nice keyboard.",
    image: {
      src: "/bento-modern/keyboard.webp",
      alt: "Compact mechanical keyboard with a frosted acrylic case, cream and indigo keycaps, a coral escape key and a coiled cable.",
    },
    tools: ["Hot-swap PCB", "VIA keymap", "Krytox 205g0 lube"],
    body: (
      <>
        <Figure
          src="/bento-modern/keyboard.webp"
          alt="The finished keyboard on an indigo and coral desk mat."
          caption="Cream and indigo keycaps, one coral escape key for no reason except that I like it."
        />
        <p>
          The PCB is hot-swap, so there was no soldering, but there was a lot of patience: 68 switches opened, lubed
          and closed again, and the stabilisers clipped and re-lubed twice before the space bar stopped rattling.
        </p>
        <p>
          The useful part is the keymap. A function layer puts a number pad under my right hand and maps
          Excel&apos;s most-used shortcuts (fill down, paste values, trace precedents) to single keys. It saves me a
          surprising amount of reaching on long workpapers.
        </p>
      </>
    ),
  },
];
