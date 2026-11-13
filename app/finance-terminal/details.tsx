import type { ReactNode } from "react";
import DcfSensitivity from "./DcfSensitivity";
import { CashChart, ChessBoard, HoodBars, MileageChart, PaceChart, cashWeeks } from "./charts";
import { items, type WorkItem } from "./data";
import styles from "./terminal.module.css";

function Did({ children }: { children: ReactNode }) {
  return (
    <section className={styles.dSection}>
      <h3 className={styles.dHeading}>What I did</h3>
      {children}
    </section>
  );
}

function Hero({ item }: { item: WorkItem }) {
  if (!item.image) return null;
  return (
    <img
      className={styles.dHero}
      src={item.image.src}
      alt={item.image.alt}
      width={item.image.width}
      height={item.image.height}
    />
  );
}

const bodies: Record<string, (item: WorkItem) => ReactNode> = {
  "dcf-prairie-forge": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        Prairie Forge Components is a made-up Peoria-area maker of iron castings and machined housings for farm and
        construction equipment. I built the company from a case prompt in my valuation seminar: about $1.1B in revenue,
        13% EBITDA margins, lumpy capex, and a customer list that is mostly two OEMs.
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>Projected revenue by segment for 2027–2031 off an ag-equipment cycle assumption, not a flat growth rate.</li>
          <li>Built unlevered FCF (EBIT × (1 − 24%) + D&amp;A − capex − ΔNWC) and checked capex/D&amp;A converges to about 1.1× by the terminal year.</li>
          <li>Estimated WACC at 8.5% from a 5-company peer beta (relevered at 30% debt/cap) and a 5.5% equity risk premium.</li>
          <li>Wrote the sensitivity grid below so the reader can see how much of the answer is the terminal value.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Sensitivity: try it</h3>
        <DcfSensitivity />
      </section>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>What the table told me</h3>
        <p>
          Roughly three quarters of enterprise value sits in the terminal value, so a half-point change in WACC moves
          the price more than any operating assumption I spent hours on. My base case says about 9% upside, but the
          honest conclusion is &quot;fairly valued unless you believe in a lower cost of capital.&quot; I would rather say
          that than defend a single number.
        </p>
      </section>
    </>
  ),

  "cash-13-week": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        A direct-method 13-week cash flow forecast for a fictional 14-person HVAC contractor. The owner&apos;s question was
        simple: &quot;Do I need to draw on the line of credit this quarter, and when?&quot;
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>Mapped receipts from the AR aging by customer type (residential pays in 10 days, the school district in 45).</li>
          <li>Scheduled disbursements around biweekly payroll, a monthly equipment lease, and supplier terms of net 30.</li>
          <li>Set a $50k minimum cash policy with the owner and flagged any week that breaks it.</li>
          <li>Built it to roll: each Monday the oldest week drops off and actuals replace the forecast.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Forecast</h3>
        <CashChart />
        <div className={styles.tableScroll}>
          <table className={styles.dataTable}>
            <caption className={styles.tableCaption}>Weekly detail, $ thousands (sample data)</caption>
            <thead>
              <tr>
                <th scope="col">Wk</th>
                <th scope="col">Receipts</th>
                <th scope="col">Disb.</th>
                <th scope="col">Net</th>
                <th scope="col">Ending</th>
              </tr>
            </thead>
            <tbody>
              {cashWeeks.map((w) => {
                const net = w.receipts - w.disb;
                return (
                  <tr key={w.wk} className={w.end < 50 ? styles.rowAlert : undefined}>
                    <th scope="row">{w.wk}</th>
                    <td>{w.receipts}</td>
                    <td>({w.disb})</td>
                    <td className={net >= 0 ? styles.textUp : styles.textDown}>{net >= 0 ? net : `(${-net})`}</td>
                    <td>{w.end}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Recommendation</h3>
        <p>
          Week 7 dips to $38k because the school district&apos;s $60k progress payment lands in week 8, the same week as
          payroll. I recommended a $20k revolver draw in week 6, repaid in week 9, which costs roughly $100 in interest at the line&apos;s 9% rate.
          Cheaper than asking the crew to wait a week.
        </p>
      </section>
    </>
  ),

  "variance-dashboard": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        A dashboard design for the monthly business review of a fictional dental-supply distributor. The old version
        was a 40-tab workbook; the meeting spent its first 20 minutes finding the right tab.
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>Interviewed two classmates playing the CFO and a sales VP about what they actually decide in the meeting.</li>
          <li>Split revenue variance into price, volume and mix so the conversation starts from the cause.</li>
          <li>Labelled every variance F or U next to the colour, so it still reads in grayscale or for color-blind viewers.</li>
          <li>Mocked it in Power BI, then cut three charts that nobody in usability testing looked at.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Q3 revenue bridge (sample)</h3>
        <div className={styles.tableScroll}>
          <table className={styles.dataTable}>
            <caption className={styles.tableCaption}>Budget to actual, $ thousands</caption>
            <thead>
              <tr>
                <th scope="col">Driver</th>
                <th scope="col">Amount</th>
                <th scope="col">F / U</th>
                <th scope="col">Main cause</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Budgeted revenue</th>
                <td>8,450</td>
                <td>–</td>
                <td className={styles.cellText}>Plan set in March</td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td className={styles.textDown}>(268)</td>
                <td className={styles.textDown}>U</td>
                <td className={styles.cellText}>Rebates to two group practices</td>
              </tr>
              <tr>
                <th scope="row">Volume</th>
                <td className={styles.textUp}>141</td>
                <td className={styles.textUp}>F</td>
                <td className={styles.cellText}>New clinic accounts in Peoria</td>
              </tr>
              <tr>
                <th scope="row">Mix</th>
                <td className={styles.textDown}>(85)</td>
                <td className={styles.textDown}>U</td>
                <td className={styles.cellText}>Shift to lower-margin consumables</td>
              </tr>
              <tr className={styles.rowTotal}>
                <th scope="row">Actual revenue</th>
                <td>8,238</td>
                <td className={styles.textDown}>U 212</td>
                <td className={styles.cellText}>−2.5% vs budget</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Design rules I kept</h3>
        <p>
          One screen, one question per panel, and the number before the chart. If a panel could not answer &quot;so what
          do we do about it,&quot; it moved to an appendix page.
        </p>
      </section>
    </>
  ),

  "lease-vs-buy": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        A lab in one of the life-science buildings asked a friend of mine whether to lease or buy a −80 °C freezer. I
        offered to run the numbers. This is the short memo I wrote, lightly edited. Figures are rounded and the vendor
        is unnamed.
      </p>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>The memo</h3>
        <p>
          <strong>Buy:</strong> $14,200 up front, first-year warranty, then a $900/year service contract for years 2–5,
          and about $1,500 resale value at the end of year 5.
        </p>
        <p>
          <strong>Lease:</strong> $310/month for 60 months, paid in advance, with service and a 48-hour replacement
          guarantee included.
        </p>
        <p>
          The usual corporate textbook answer leans on the depreciation tax shield. That does not apply here: the
          university is tax-exempt, so there is no shield to capture on either side. That makes the comparison a plain
          present-value cost problem. I used 4%, close to the university&apos;s borrowing rate, as the discount rate.
        </p>
        <div className={styles.tableScroll}>
          <table className={styles.dataTable}>
            <caption className={styles.tableCaption}>Present value of cost at 4%</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Buy</th>
                <th scope="col">Lease</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Purchase / payments</th>
                <td>14,200</td>
                <td>16,889</td>
              </tr>
              <tr>
                <th scope="row">Service, years 2–5</th>
                <td>3,141</td>
                <td>incl.</td>
              </tr>
              <tr>
                <th scope="row">Resale, year 5</th>
                <td className={styles.textUp}>(1,233)</td>
                <td>–</td>
              </tr>
              <tr className={styles.rowTotal}>
                <th scope="row">PV of cost</th>
                <td>16,108</td>
                <td>16,889</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Buying is about <strong>$781 cheaper</strong> in present value, which is under 5% of the total. So the
          decision really turns on things the spreadsheet does not price: how bad is a failure? One thawed rack of
          samples can cost a semester. My recommendation was to buy, keep the service contract, and put a temperature
          alarm on it. If the lab expected to move buildings within three years, the lease would win.
        </p>
      </section>
    </>
  ),

  "cu-home-ledger": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        For the ACCY 593 website project I built CU Home Ledger, a small site about home sales in Champaign, Urbana and
        Savoy. The audience is people who are new to town and new to buying: grad students with a partner, postdocs,
        new faculty. It is a class prototype and not published.
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>Cleaned an illustrative sample of 412 sales records (dropping duplicates and non-arm&apos;s-length transfers).</li>
          <li>Grouped sales into six neighborhoods and reported medians, not averages, because a few large houses skew everything.</li>
          <li>Wrote a plain-English &quot;what does $300k buy here&quot; page and a closing-cost calculator walkthrough.</li>
          <li>Designed it mobile-first, since most people browse listings on their phones.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Neighborhood medians</h3>
        <HoodBars />
      </section>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>What I learned</h3>
        <p>
          The hardest part was not the data. It was deciding what to leave out so a nervous first-time buyer can find one
          answer in under a minute. That is the same editing problem as a good board deck.
        </p>
      </section>
    </>
  ),

  "lifo-reserve": () => (
    <>
      <p className={styles.dLead}>
        Posted June 2026. A note I wrote after comparing two fictional industrial distributors for a case: Midland
        Supply (LIFO) and Harbor Parts (FIFO).
      </p>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>The post</h3>
        <p>
          On the first pass Harbor looked like the better operator: gross margin of 29.4% against Midland&apos;s 27.1%.
          I had the slide half written. Then I got to Midland&apos;s inventory footnote, which disclosed a LIFO reserve of
          $86 million, up $41 million during the year.
        </p>
        <p>
          In a year when costs are rising, LIFO pushes the newest, most expensive purchases into cost of goods sold. The
          increase in the reserve is roughly how much higher Midland&apos;s COGS was than it would have been under FIFO.
          Adding that $41 million back to gross profit on about $2.2 billion of sales lifts Midland&apos;s margin to 29.0%.
        </p>
        <div className={styles.calloutRow}>
          <div className={styles.callout}>
            <span>Midland as reported</span>
            <strong>27.1%</strong>
          </div>
          <div className={styles.callout}>
            <span>Midland, FIFO-adjusted</span>
            <strong className={styles.textUp}>29.0%</strong>
          </div>
          <div className={styles.callout}>
            <span>Harbor (FIFO)</span>
            <strong>29.4%</strong>
          </div>
        </div>
        <p>
          A 2.3-point gap became 0.4 points. The &quot;better operator&quot; story mostly disappeared. Inventory turns and
          current ratio shifted the same way once I added the reserve back to Midland&apos;s balance sheet.
        </p>
        <p>
          My rule now: before I compute any ratio across two companies, I read the inventory and revenue recognition
          footnotes for both. It takes ten minutes and it is the cheapest insurance I know of.
        </p>
      </section>
    </>
  ),

  "chess-italian": () => (
    <>
      <p className={styles.dLead}>
        Club ladder, 15+10 rapid, October 2026. I had White. My opponent was rated about 80 points above me. I lost, and
        it was the most useful game I played all semester.
      </p>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>The game</h3>
        <p className={styles.pgn}>
          1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d3 d6 6.O-O O-O 7.Bb3 a6 8.Nbd2 Ba7 9.h3 h6 10.Re1 Re8 11.Nf1 Be6
          12.Bc2 d5 13.exd5 Nxd5
        </p>
        <p>
          A quiet Italian. Both of us shuffled pieces for a dozen moves, which suits me. After 13...Nxd5 the e5 pawn looks
          loose: it is attacked by my knight and rook, defended only by the c6 knight.
        </p>
        <div className={styles.boards}>
          <ChessBoard
            fen="r2qr1k1/bpp2pp1/p1n1b2p/3np3/8/2PP1N1P/PPB2PP1/R1BQRNK1 w - - 0 14"
            highlight={["e5", "f2"]}
            label="Position after 13...Nxd5, White to move. Highlighted squares e5 and f2."
            caption="After 13...Nxd5. White to move. I counted e5 and ignored f2."
          />
          <ChessBoard
            fen="r3r1k1/1pp2pp1/p3bq1p/3nR3/8/2PP3P/PPB2KP1/R1BQ1N2 w - - 1 17"
            highlight={["f6", "f2", "e5"]}
            label="Position after 16...Qf6+, the black queen checks the king on f2 and attacks the rook on e5."
            caption="After 16...Qf6+. The queen checks the king and hits the rook on e5."
          />
        </div>
        <p className={styles.pgn}>
          14.Nxe5?! Nxe5 15.Rxe5 Bxf2+! 16.Kxf2 Qf6+ 17.Kg1 Qxe5
        </p>
        <p>
          I won the pawn and was pleased with myself for exactly one move. With my rook on e5 and nothing guarding f2
          except the king, 15...Bxf2+ deflects the king and 16...Qf6+ forks king and rook. Net result: I traded a pawn
          for the exchange and never got back into the game. I resigned on move 38.
        </p>
      </section>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Takeaway</h3>
        <p>
          I &quot;reconciled&quot; the e5 square perfectly and never checked the account next to it. The bishop on a7 had
          been staring at f2 since move 8. My new habit before any capture: list every enemy piece that is aimed at my
          king, even the ones that have been sitting still for ten moves.
        </p>
      </section>
    </>
  ),

  "marathon-log": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        My first marathon, run in Champaign-Urbana in April 2026. I trained for 16 weeks with a spreadsheet that probably
        has more conditional formatting than it needs.
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>Followed a three-up, one-down build: mileage rises for three weeks, then a cutback week.</li>
          <li>Logged every run (distance, time, heart rate, shoes, weather) and charted the long-run pace each Sunday.</li>
          <li>Ran most easy miles on the flat country roads south of campus, which is the only thing this area has plenty of.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Training block</h3>
        <MileageChart />
        <PaceChart />
      </section>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Result</h3>
        <p>
          3:52:14, about four and a half minutes under my goal. Miles 20 to 23 were miserable. I would add more
          marathon-pace work in the second half of the block next time and fewer junk miles in week 11.
        </p>
      </section>
    </>
  ),

  "blue-hour": () => (
    <>
      <p className={styles.dLead}>
        Nine photographs taken between 4:40 and 5:30 pm in December and January, after my last class and before dinner.
        That is the 20 minutes when the sky is still blue and the shops have just turned their lights on. Three of them
        are here.
      </p>
      <div className={styles.gallery}>
        <figure className={styles.galleryItem}>
          <img
            src="/finance-terminal/street-1.webp"
            alt="A cyclist passes a glowing storefront awning on a wet downtown street at dusk"
            width={1200}
            height={800}
            loading="lazy"
          />
          <figcaption>Main Street, 4:52 pm. 35mm, f/2, 1/60. Waited about ten minutes for a bike.</figcaption>
        </figure>
        <figure className={styles.galleryItem}>
          <img
            src="/finance-terminal/street-2.webp"
            alt="Two students in silhouette at a snowy bus stop as a lit bus arrives"
            width={1200}
            height={800}
            loading="lazy"
          />
          <figcaption>Bus stop near the Quad, 5:14 pm. Shot from inside the shelter to keep the lens dry.</figcaption>
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryTall}`}>
          <img
            src="/finance-terminal/street-3.webp"
            alt="A lone figure with a tote bag walks down a narrow brick alley in late light"
            width={1024}
            height={1536}
            loading="lazy"
          />
          <figcaption>Alley off Neil Street, 4:41 pm. The only frame in the series with direct sun.</figcaption>
        </figure>
      </div>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>How I worked</h3>
        <p>
          One fixed 35mm lens, no zoom, and a rule that I had to shoot at least 20 frames a day for 15 days. I kept 9 of
          214. Editing was the hard part: I wrote one sentence about why each keeper stayed, and cut anything I could not
          explain.
        </p>
      </section>
    </>
  ),

  "budget-template": () => (
    <>
      <p className={styles.dLead}>
        A zero-based budget template I built for myself during my first month on a graduate stipend. Every dollar gets a
        job at the start of the month, including the dollars meant for annual expenses.
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>One tab per month, one summary tab, and a sinking-fund tab for things like the CPA exam fees and car insurance.</li>
          <li>Used structured tables and SUMIFS so a new transaction category does not break any formula.</li>
          <li>Added a variance column with conditional formatting, and a rule: anything over 10% gets a one-line note.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>October tab (numbers changed)</h3>
        <div className={styles.tableScroll}>
          <table className={`${styles.dataTable} ${styles.sheet}`}>
            <caption className={styles.tableCaption}>Monthly plan vs actual, $</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Plan</th>
                <th scope="col">Actual</th>
                <th scope="col">Var %</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Rent + utilities", 865, 871],
                ["Groceries", 320, 296],
                ["Transit + car", 140, 152],
                ["Sinking: CPA exams", 150, 150],
                ["Sinking: insurance", 95, 95],
                ["Eating out", 90, 118],
                ["Running gear", 40, 0],
                ["Savings (Roth IRA)", 200, 200],
              ].map(([c, p, a]) => {
                const v = (Number(a) - Number(p)) / Number(p);
                return (
                  <tr key={String(c)}>
                    <th scope="row">{c}</th>
                    <td>{Number(p).toLocaleString("en-US")}</td>
                    <td>{Number(a).toLocaleString("en-US")}</td>
                    <td className={v > 0.1 ? styles.textDown : v < 0 ? styles.textUp : undefined}>
                      {v === 0 ? "0.0%" : `${v > 0 ? "+" : "−"}${Math.abs(v * 100).toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
              <tr className={styles.rowTotal}>
                <th scope="row">Total</th>
                <td>1,900</td>
                <td>1,882</td>
                <td className={styles.textUp}>−0.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.formula}>
          <span>D4</span> =IFERROR([@Actual]/[@Plan]-1, 0)
        </p>
        <p>
          Eating out ran 31% over (birthday dinner, noted). Running gear was zero because I am making the old shoes last
          until the sale in November.
        </p>
      </section>
    </>
  ),

  "coptic-notebooks": (item) => (
    <>
      <Hero item={item} />
      <p className={styles.dLead}>
        Coptic stitch is an old binding where the signatures are sewn together through the fold and the spine is left
        open, so the book lies completely flat. That makes it great for working problems by hand.
      </p>
      <Did>
        <ul className={styles.dList}>
          <li>Fold 6 signatures of 4 sheets each, punch 6 holes per fold with a cradle and an awl.</li>
          <li>Cover boards are 2mm board wrapped in navy book cloth; thread is 4-ply waxed linen.</li>
          <li>One notebook takes about three hours, and the first two I made fell apart within a month.</li>
        </ul>
      </Did>
      <section className={styles.dSection}>
        <h3 className={styles.dHeading}>Why I keep doing it</h3>
        <p>
          It is the opposite of a spreadsheet. If I count the holes wrong, I find out an hour later and there is no undo.
          I keep one book per semester for study notes. The CPA FAR notebook is the thickest one so far.
        </p>
      </section>
    </>
  ),
};

export function buildDetails() {
  const out: Record<string, { title: string; ticker: string; meta: string; body: ReactNode }> = {};
  for (const item of items) {
    const render = bodies[item.id];
    out[item.id] = {
      title: item.title,
      ticker: item.ticker,
      meta: `${item.category === "analytics" ? "Business & analytics" : "Personal"} · ${item.date} · ${item.tags.join(" · ")}`,
      body: render ? render(item) : <p>{item.summary}</p>,
    };
  }
  return out;
}
