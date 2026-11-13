"use client";

import type { ReactNode } from "react";
import styles from "../terminal.module.css";
import { AgingChart, BeforeAfter, CloseDag, HomeSalesTable, Sparkline } from "./visuals";
import SynthPlayer from "./SynthPlayer";

/* ---------- tiny highlighter: comments, strings, keywords ---------- */

type Lang = "py" | "sql" | "cpp" | "ts" | "sh";
const COMMENT: Record<Lang, string> = { py: "#.*$", sql: "--.*$", cpp: "\\/\\/.*$", ts: "\\/\\/.*$", sh: "#.*$" };
const KEYWORDS: Record<Lang, string[]> = {
  py: ["def", "return", "for", "in", "if", "elif", "else", "import", "from", "with", "as", "and", "or", "not", "None", "True", "False"],
  sql: ["WITH", "AS", "SELECT", "FROM", "LEFT", "JOIN", "ON", "AND", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "CASE", "WHEN", "THEN", "ELSE", "END", "COUNT", "SUM", "COALESCE"],
  cpp: ["const", "int", "float", "void", "if", "else", "return", "for"],
  ts: ["const", "let", "function", "return", "for", "if", "export"],
  sh: [],
};

function Code({ lang, children }: { lang: Lang; children: string }) {
  const re = new RegExp(`(${COMMENT[lang]})|("[^"\\n]*"|'[^'\\n]*')|\\b(${KEYWORDS[lang].join("|") || "$^"})\\b`, "gm");
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const src = children.replace(/^\n/, "");
  while ((m = re.exec(src))) {
    if (m.index > last) parts.push(src.slice(last, m.index));
    const cls = m[1] ? styles.c : m[2] ? styles.s : styles.k;
    parts.push(
      <span key={k++} className={cls}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  parts.push(src.slice(last));
  return (
    <pre className={styles.code} tabIndex={0}>
      <code>{parts}</code>
    </pre>
  );
}

/* ---------- item bodies ---------- */

function BankRec() {
  return (
    <>
      <h3>context</h3>
      <p>
        During my summer 2026 internship on the accounting team of a regional property management company, I owned the
        bank reconciliations for 14 operating accounts. Every month it was the same routine: export the bank activity,
        export the GL cash detail, and tick and tie in Excel. Most lines matched one-to-one. The hours went into the
        rest: deposits the bank batched together, checks that cleared a few days late, and prior-month items that kept
        getting carried forward without anyone asking why.
      </p>
      <h3>what I built</h3>
      <ul>
        <li>
          <strong>Pass 1, exact:</strong> same amount, same date, same check number.
        </li>
        <li>
          <strong>Pass 2, timing:</strong> same amount within a 3-business-day window, which catches checks and ACH
          that clear late.
        </li>
        <li>
          <strong>Pass 3, batched deposits:</strong> one bank deposit against up to four GL receipts from the same day
          that sum to it exactly.
        </li>
        <li>
          Anything with more than one candidate is <em>not</em> matched. It goes to an exceptions tab with the
          candidates listed, because a wrong auto-match is worse than a slow manual one.
        </li>
      </ul>
      <Code lang="py">{`
def match_pass(bank, gl, *, window_days=0):
    """Pair bank lines to GL lines one-to-one inside a date window.
    Amounts are stored as integer cents so == is safe."""
    pairs = []
    for i, b in bank.iterrows():
        lo, hi = b.date - BDay(window_days), b.date + BDay(window_days)
        cand = gl[(gl.amount_cents == b.amount_cents)
                  & gl.date.between(lo, hi)
                  & ~gl.index.isin([j for _, j, _ in pairs])]
        if b.check_no:
            cand = cand[cand.check_no == b.check_no]
        if len(cand) == 1:              # ambiguous? leave it for a human
            pairs.append((i, cand.index[0], f"window={window_days}d"))
    matched_bank = {i for i, _, _ in pairs}
    matched_gl = {j for _, j, _ in pairs}
    return pairs, bank.drop(matched_bank), gl.drop(matched_gl)
`}</Code>
      <p className={styles.caption}>excerpt from recon.py · the full script also writes the workbook and a run log</p>
      <h3>before and after</h3>
      <BeforeAfter
        metrics={[
          { label: "Hours spent on recs (14 accounts)", before: 22.5, after: 6, unit: "hrs/mo" },
          { label: "Lines needing a manual match", before: 1180, after: 64, unit: "lines" },
          { label: "Business day recs were signed off", before: 6, after: 2, unit: "BD" },
          { label: "Unsupported items carried forward", before: 11, after: 0, unit: "items" },
        ]}
      />
      <h3>what I&apos;d tell the next intern</h3>
      <p>
        The script doesn&apos;t post anything and doesn&apos;t sign off. A reviewer still reads every exception, and
        the run log records a hash of both input files so you can prove which export a rec was based on. That last
        part was my manager&apos;s idea, and it&apos;s the reason the team kept using it after I left.
      </p>
    </>
  );
}

function ApAging() {
  return (
    <>
      <h3>the question</h3>
      <p>
        An aging report should decay: lots of current invoices, fewer in each older bucket. When I built this one for a
        class exercise on a synthetic dataset (1,240 open invoices, 180 vendors, modeled on a mid-size distributor),
        the 90+ bucket came back bigger than 61 to 90. That&apos;s either a data problem or a process problem, and I
        wanted to know which.
      </p>
      <AgingChart />
      <h3>the query</h3>
      <Code lang="sql">{`
WITH open_items AS (
  SELECT i.invoice_id, i.vendor_id, i.due_date, i.hold_reason,
         i.amount - COALESCE(SUM(p.amount), 0) AS open_amt
  FROM ap_invoice i
  LEFT JOIN ap_payment p
         ON p.invoice_id = i.invoice_id
        AND p.paid_on <= :as_of          -- as-of, not "today"
  WHERE i.invoice_date <= :as_of
  GROUP BY i.invoice_id, i.vendor_id, i.due_date, i.hold_reason, i.amount
  HAVING i.amount - COALESCE(SUM(p.amount), 0) > 0
)
SELECT CASE
         WHEN :as_of <= due_date       THEN '0 current'
         WHEN :as_of - due_date <= 30  THEN '1 1-30'
         WHEN :as_of - due_date <= 60  THEN '2 31-60'
         WHEN :as_of - due_date <= 90  THEN '3 61-90'
         ELSE                               '4 90+'
       END            AS bucket,
       COUNT(*)       AS invoices,
       SUM(open_amt)  AS balance
FROM open_items
GROUP BY 1
ORDER BY 1;
`}</Code>
      <h3>what the drill-down showed</h3>
      <p>
        Grouping the 90+ bucket by <code>vendor_id</code> and <code>hold_reason</code> told the story: 71% of the
        balance sat with six vendors, and almost all of it was on hold for a three-way match failure (quantity received
        didn&apos;t match the PO). Nobody owed anyone a hard conversation about cash. The invoices were just parked in a
        status no report surfaced. My recommendation in the write-up was a weekly holds report owned by receiving, not
        AP, since that&apos;s where the fix lives.
      </p>
    </>
  );
}

function RevenueDashboard() {
  const kpis = [
    { label: "Net revenue, Q3", value: "$4.82M", delta: "+3.1% vs budget", good: true, series: [3.9, 4.0, 4.1, 4.0, 4.3, 4.4, 4.2, 4.5, 4.6, 4.5, 4.7, 4.82] },
    { label: "Gross margin", value: "38.4%", delta: "-0.9 pts vs Q2", good: false, series: [39.6, 39.4, 39.8, 39.1, 39.3, 38.9, 39.0, 38.7, 38.8, 38.5, 38.6, 38.4] },
    { label: "Regions under budget", value: "1 of 5", delta: "Central, -4.2%", good: false, series: [0, 1, 1, 2, 1, 1, 0, 1, 2, 1, 1, 1] },
  ];
  return (
    <>
      <h3>the problem</h3>
      <p>
        For a group project in my information systems course, we were handed a real-looking weekly revenue workbook:
        14 charts on one screen, three pie charts, a dual-axis line chart, and a fiscal calendar that didn&apos;t match
        the one finance used. The person who reads it, a controller, needs to answer about four questions on Monday
        morning. The dashboard made all four hard.
      </p>
      <h3>what I changed</h3>
      <ul>
        <li>Wrote the four questions down first, then gave each one exactly one view.</li>
        <li>Replaced the pies with sorted bars and split the dual-axis chart into two aligned charts.</li>
        <li>Added a variance-to-budget column everywhere revenue appears, since that&apos;s what gets discussed.</li>
        <li>Moved every filter into one row at the top and locked the fiscal calendar to finance&apos;s 4-4-5.</li>
      </ul>
      <div className={styles.chartBox} style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {kpis.map((k) => (
          <div key={k.label}>
            <div className={styles.caption} style={{ margin: 0 }}>
              {k.label}
            </div>
            <div style={{ fontFamily: "var(--mono-font)", fontSize: 26, color: "#f2f7f3" }}>{k.value}</div>
            <div className={`${styles.caption} ${k.good ? styles.good : styles.warn}`} style={{ margin: "0 0 6px" }}>
              {k.good ? "▲" : "▼"} {k.delta}
            </div>
            <Sparkline values={k.series} label={`${k.label}, last 12 weeks`} />
          </div>
        ))}
      </div>
      <p className={styles.caption}>The redesigned KPI row, rebuilt here with sample numbers.</p>
      <h3>did it work?</h3>
      <p>
        We ran a tiny usability test with five classmates, each answering &ldquo;which region missed budget in Q3, and
        by how much?&rdquo; on both versions. Median time went from 74 seconds to 19, and nobody misread the redesign.
        Five people is not a study, but it was enough to convince our group to cut two more charts we liked.
      </p>
    </>
  );
}

function HomeSales() {
  return (
    <>
      <h3>what it is</h3>
      <p>
        This is my &ldquo;Website Project&rdquo;: a small site about home sales in Champaign-Urbana, written for people
        like a lot of my friends in grad school, who are deciding whether buying near campus beats four more years of
        rent. It shows median price, price per square foot and days on market by neighborhood, plus a plain-language
        page on what those numbers do and don&apos;t tell you.
      </p>
      <h3>what I did</h3>
      <ul>
        <li>Cleaned a year of sales records: deduplicated relistings, dropped non-arm&apos;s-length transfers, and fixed square footage typed in as acres.</li>
        <li>Mapped addresses to neighborhoods with a hand-drawn boundary file, because ZIP codes split Urbana in ways locals don&apos;t.</li>
        <li>Used medians everywhere, since three new builds in Southwest Champaign were enough to drag the mean around.</li>
        <li>Built the site with Next.js and a SQLite file, so the whole thing deploys as static pages.</li>
      </ul>
      <h3>try the neighborhood table</h3>
      <HomeSalesTable />
      <h3>what I learned</h3>
      <p>
        Days on market was the number people asked about most, and the one I trusted least. Relisting resets the clock,
        so I ended up computing it from the first list date per property instead of reading it off the record.
      </p>
    </>
  );
}

function CloseDagPost() {
  return (
    <>
      <p>
        Every close checklist I&apos;ve seen is a list: forty-odd rows, an owner, a due day. Lists are good at telling
        you whether something is done. They&apos;re bad at telling you what&apos;s <em>blocking</em> it.
      </p>
      <CloseDag label="Month-end close tasks drawn as a dependency graph. The critical path runs from AP cutoff to accruals to the preliminary trial balance to flux review to the reporting pack." />
      <p className={styles.caption}>A simplified close, drawn as a graph. Amber is the longest chain.</p>
      <p>
        When I redrew a sample close as a graph, a few things got obvious. Bank recs feel urgent, but on this close
        they feed only cash entries, which are rarely what delays the trial balance. Accruals, on the other hand, wait
        on three different cutoffs. If AP cutoff slips a day, the whole reporting pack slips a day, no matter how fast
        everyone else is.
      </p>
      <p>
        That changed how I think about automation. The tempting targets are the tedious ones, like reconciliations,
        and I&apos;ve automated those myself. But the payoff from saving four hours on a task that isn&apos;t on the
        critical path is mostly quality of life. The days come back when you shorten the amber chain: getting AP cutoff
        data out of the system on day one instead of day two, or pre-building accrual estimates from open POs so the
        entry is a review instead of a build.
      </p>
      <p>
        None of this is new to people who run closes. Project managers have used critical-path thinking for decades. But
        as a student, drawing it out was the first time the close stopped looking like a pile of tasks and started
        looking like a system I could reason about.
      </p>
    </>
  );
}

function SoilMonitor() {
  return (
    <>
      <h3>why</h3>
      <p>
        My roommate and I disagreed about how often our pothos needed water. It was dying slowly either way. I had an
        Arduino Uno from an intro engineering class, so I settled it with data.
      </p>
      <h3>build</h3>
      <ul>
        <li>Capacitive soil moisture sensor (no exposed metal, so it doesn&apos;t corrode like the resistive kind)</li>
        <li>128×64 I2C OLED showing moisture % and a 24-hour sparkline</li>
        <li>An amber LED that turns on below 35%, which my roommate could not argue with</li>
        <li>Readings logged over USB serial every 10 minutes into a CSV on my laptop</li>
      </ul>
      <Code lang="cpp">{`
const int DRY_RAW = 612;   // sensor in open air
const int WET_RAW = 281;   // sensor in a glass of water
const int LOW_PCT = 35;

int moisturePct() {
  long sum = 0;
  for (int i = 0; i < 16; i++) { sum += analogRead(A0); delay(5); }
  int raw = sum / 16;                       // average out ADC noise
  int pct = map(raw, DRY_RAW, WET_RAW, 0, 100);
  return constrain(pct, 0, 100);
}
`}</Code>
      <h3>result</h3>
      <p>
        Three weeks of readings showed the soil drops from about 70% to 30% in six days, faster in the week the radiator
        came on. We now water on a schedule the plant picked, and it has put out four new leaves since.
      </p>
    </>
  );
}

function Synth() {
  return (
    <>
      <h3>what it is</h3>
      <p>
        I play keyboard badly and write melodies worse, so I wrote something that writes them for me. Each seed
        produces a 16-step loop: the lead takes a random walk over A minor pentatonic (it can&apos;t hit a wrong note
        in that scale), a triangle-wave bass follows an Am, F, C, G progression, and the last step always resolves
        home to A.
      </p>
      <h3>the recording</h3>
      <p>There&apos;s no audio file here. Press play and your browser synthesizes the loop live with the Web Audio API.</p>
      <SynthPlayer />
      <Code lang="ts">{`
export function generateMelody(seed: number): Step[] {
  const rand = mulberry32(seed);        // small seeded PRNG
  let i = 4;                            // start on E4
  const out: Step[] = [];
  for (let s = 0; s < STEPS; s++) {
    const rest = s % 4 !== 0 && rand() < 0.2;
    if (!rest) i = clamp(i + Math.floor(rand() * 5) - 2);
    if (s === STEPS - 1) i = 5;         // resolve to A4
    out.push({ lead: rest ? null : SCALE[i], bass: s % 4 === 0 ? ROOTS[s / 4] : null });
  }
  return out;
}
`}</Code>
      <p>
        The part that took longest was not the music. It was getting clean note starts: without a short gain ramp at
        the start and end of every note, square waves click. A 12 ms attack fixed it.
      </p>
    </>
  );
}

function Keyboard() {
  const parts = [
    ["Case + PCB", "65% aluminum kit, hot-swap, USB-C", "$118"],
    ["Switches", "70 linear switches, 45 g", "$31"],
    ["Keycaps", "dark gray PBT set + 6 amber accent caps", "$42"],
    ["Mods", "PE foam sheet, tape on PCB back", "$6"],
    ["Lube", "thin switch lube + dielectric grease for stabs", "$14"],
  ];
  return (
    <>
      <h3>build log</h3>
      <p>
        I type all day, mostly in spreadsheets and SQL editors, so this was half hobby and half ergonomics. It took
        three evenings: one to open and lube 70 switches (a brush, a switch opener and a podcast), one to tune the
        stabilizers, and one to fix the switch I bent a pin on.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>part</th>
              <th>what</th>
              <th className={styles.num}>cost</th>
            </tr>
          </thead>
          <tbody>
            {parts.map(([a, b, c]) => (
              <tr key={a}>
                <td>{a}</td>
                <td>{b}</td>
                <td className={styles.num}>{c}</td>
              </tr>
            ))}
            <tr>
              <td className={styles.good}>total</td>
              <td />
              <td className={`${styles.num} ${styles.good}`}>$211</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>the spreadsheet layer</h3>
      <p>
        The firmware is QMK. Holding the key left of the spacebar turns the right side into a number pad, puts{" "}
        <code>F2</code> (edit cell) and <code>F4</code> (absolute reference) under my thumb, and maps a single key to{" "}
        <code>Ctrl+Shift+L</code> for filters. It sounds small. It&apos;s the reason I don&apos;t miss a full-size
        board.
      </p>
      <h3>what went wrong</h3>
      <p>
        I over-lubed the first ten switches and they felt mushy. Thin coat on the stem rails only, nothing on the
        spring legs, was the fix. The rattling spacebar took a dab of dielectric grease on the wire ends and a small
        piece of fabric tape under the stabilizer housing.
      </p>
    </>
  );
}

function ExpenseCli() {
  return (
    <>
      <h3>why a CLI</h3>
      <p>
        Budget apps wanted me to categorize transactions after the fact, and I never did. A terminal is always open on
        my laptop, so adding a purchase at the register takes five seconds. Everything goes into one SQLite file I
        can query with real SQL when I want to.
      </p>
      <h3>a session</h3>
      <pre className={styles.code} tabIndex={0}>
        <code>
          <span className={styles.k}>$</span> spend add 14.50 groceries &quot;farmers market&quot;{"\n"}
          {"  "}added #412  14.50  groceries  2026-10-03{"\n"}
          <span className={styles.k}>$</span> spend add 6.25 coffee{"\n"}
          {"  "}added #413   6.25  coffee     2026-10-03{"\n"}
          <span className={styles.k}>$</span> spend month 2026-10{"\n"}
          {"  "}category     actual   budget   left{"\n"}
          {"  "}rent         725.00   725.00   0.00  <span className={styles.good}>██████████</span>{"\n"}
          {"  "}groceries    212.40   260.00  47.60  <span className={styles.good}>████████</span>░░{"\n"}
          {"  "}coffee        58.75    40.00 <span className={styles.s}>-18.75</span>  <span className={styles.s}>██████████</span>
          <span className={styles.s}>!</span>
          {"\n"}
          {"  "}transit       12.00    30.00  18.00  <span className={styles.good}>████</span>░░░░░░{"\n"}
          {"  "}books         41.99    50.00   8.01  <span className={styles.good}>████████</span>░░{"\n"}
          {"  "}──────────────────────────────────{"\n"}
          {"  "}total       1050.14  1105.00  54.86
        </code>
      </pre>
      <p className={styles.caption}>sample output with made-up numbers (the coffee line is unfortunately realistic)</p>
      <Code lang="py">{`
def month_report(db, month):
    rows = db.execute("""
        SELECT c.name, COALESCE(SUM(e.amount_cents), 0), c.budget_cents
        FROM category c
        LEFT JOIN expense e
          ON e.category_id = c.id AND strftime('%Y-%m', e.spent_on) = ?
        GROUP BY c.id ORDER BY c.sort_order
    """, (month,)).fetchall()
    for name, actual, budget in rows:
        yield name, actual, budget, bar(actual, budget)
`}</Code>
      <h3>what I learned</h3>
      <p>
        Storing money as integer cents from day one. My first version used floats and the October total was off by a
        cent, which is a very accountant way to lose an evening.
      </p>
    </>
  );
}

function Sprites() {
  const palette = ["#0b0d0e", "#1d2b2a", "#2f4f3a", "#3f7a3f", "#5fbf4a", "#a6f05a", "#39ff88", "#e8f5d0", "#ffb000", "#c46a1a", "#7a3b1d", "#4a2a20", "#d9a066", "#f2d0a4", "#8f9b94", "#c43c3c"];
  return (
    <>
      <h3>what it is</h3>
      <p>
        Art for a 48-hour game jam with two friends from my undergrad CS minor. They wrote the platformer; I drew
        everything that moves. The explorer has a four-frame walk cycle, an idle pose and a jump. The slime has a
        two-frame squash so it reads as alive even when it isn&apos;t moving.
      </p>
      <h3>constraints I set</h3>
      <ul>
        <li>16×16 tiles, drawn at 1× and scaled by whole numbers only, so pixels never blur.</li>
        <li>One shared 16-color palette across characters, pickups and UI.</li>
        <li>The hero&apos;s scarf is the only warm color on the character, so you can find yourself on a busy screen.</li>
      </ul>
      <div className={styles.swatches} aria-label="The 16-color palette" role="img">
        {palette.map((c) => (
          <span key={c} style={{ background: c }} title={c} />
        ))}
      </div>
      <p className={styles.caption}>the shared palette</p>
      <h3>what I&apos;d do differently</h3>
      <p>
        I animated the walk cycle before deciding on the jump arc, so the jump frame doesn&apos;t quite match the
        physics my friends wrote. Next time: agree on the movement numbers first, then draw.
      </p>
    </>
  );
}

function ReceiptPrinter() {
  return (
    <>
      <h3>why paper</h3>
      <p>
        I ignore phone notifications on reflex. A strip of paper on my desk is harder to ignore, and crossing things
        off with a pen is satisfying in a way a checkbox isn&apos;t. A cron job runs <code>morning.py</code> at 7:15 on
        weekdays and prints today&apos;s classes, the first three lines of my to-do file and the forecast.
      </p>
      <pre className={styles.receipt}>
        {`   THU 12 NOV 2026
--------------------------------
CLASSES
 09:30  ACCY 593 seminar
 14:00  Data mgmt lab
--------------------------------
TODAY
 [ ] finish AP aging write-up
 [ ] email TA about project 2
 [ ] water the pothos (34%)
--------------------------------
WEATHER  41F, wind 18 mph
         bring the real coat
--------------------------------
     have a good one, dev`}
      </pre>
      <p className={styles.caption}>a sample printout (the plant monitor feeds the moisture reading)</p>
      <h3>build</h3>
      <ul>
        <li>Raspberry Pi Zero 2 W and a 58 mm USB thermal printer that speaks ESC/POS</li>
        <li>Python script: reads a plain-text to-do file, my class schedule from a small JSON file, and the forecast</li>
        <li>Total cost about $55, mostly the printer, plus thermal paper rolls</li>
      </ul>
      <p>
        The bug I&apos;m proudest of fixing: on Mondays it printed Friday&apos;s weather because the forecast cache
        didn&apos;t expire over the weekend. Now the cache key includes the date.
      </p>
    </>
  );
}

export const DETAILS: Record<string, () => ReactNode> = {
  "bank-rec": BankRec,
  "ap-aging": ApAging,
  "revenue-dashboard": RevenueDashboard,
  "cu-home-sales": HomeSales,
  "close-dag": CloseDagPost,
  "soil-monitor": SoilMonitor,
  synth: Synth,
  keyboard: Keyboard,
  "expense-cli": ExpenseCli,
  sprites: Sprites,
  "receipt-printer": ReceiptPrinter,
};
