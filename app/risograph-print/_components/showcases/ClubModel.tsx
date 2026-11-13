import s from "./showcase.module.css";

// A fictional club. Every number below is computed from these assumptions.
const YEARS = ["FY25A", "FY26E", "FY27E", "FY28E"];
const A = {
  homeMatches: 14,
  attendance0: 2150,
  attendanceGrowth: [0.07, 0.06, 0.04],
  price0: 14,
  priceStep: 1,
  perCap0: 9.5,
  perCapGrowth: 0.03,
  sponsorship0: 420_000,
  sponsorshipGrowth: 0.09,
  league: 60_000,
  academy0: 180_000,
  academyGrowth: 0.05,
  wages0: 760_000,
  wagesGrowth: 0.05,
  matchdayCostPct: 0.22,
  travel0: 140_000,
  travelGrowth: 0.04,
  admin0: 255_000,
  adminGrowth: 0.03,
  capex: [0, 250_000, 110_000, 110_000],
  depreciationYears: 10,
  interestRate: 0.065,
  debtRepayment: 100_000,
  taxRate: 0.21,
  receivablesPct: 0.12, // of sponsorship, sponsors pay late
  deferredPct: 0.25, // of ticket revenue, season tickets sold ahead
  payablesPct: 0.08, // of non-wage operating costs
  openingCash: 310_000,
  openingPPE: 900_000,
  openingDebt: 600_000,
};

type Year = {
  tickets: number;
  concessions: number;
  sponsorship: number;
  league: number;
  academy: number;
  revenue: number;
  wages: number;
  matchday: number;
  travel: number;
  admin: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  interest: number;
  tax: number;
  netIncome: number;
  cash: number;
  receivables: number;
  ppe: number;
  totalAssets: number;
  payables: number;
  deferred: number;
  debt: number;
  equity: number;
  totalLE: number;
  cfo: number;
  wcChange: number;
  capex: number;
  cff: number;
  netCash: number;
};

function buildModel(): Year[] {
  const out: Year[] = [];
  let att = A.attendance0;
  let price = A.price0;
  let perCap = A.perCap0;
  let spons = A.sponsorship0;
  let academy = A.academy0;
  let wages = A.wages0;
  let travel = A.travel0;
  let admin = A.admin0;

  for (let i = 0; i < YEARS.length; i++) {
    if (i > 0) {
      att *= 1 + A.attendanceGrowth[i - 1];
      price += A.priceStep;
      perCap *= 1 + A.perCapGrowth;
      spons *= 1 + A.sponsorshipGrowth;
      academy *= 1 + A.academyGrowth;
      wages *= 1 + A.wagesGrowth;
      travel *= 1 + A.travelGrowth;
      admin *= 1 + A.adminGrowth;
    }
    const tickets = A.homeMatches * att * price;
    const concessions = A.homeMatches * att * perCap;
    const revenue = tickets + concessions + spons + A.league + academy;
    const matchday = A.matchdayCostPct * (tickets + concessions);
    const opex = wages + matchday + travel + admin;
    const ebitda = revenue - opex;
    const receivables = A.receivablesPct * spons;
    const deferred = A.deferredPct * tickets;
    const payables = A.payablesPct * (opex - wages);

    if (i === 0) {
      // Actual year: opening balance sheet is given, equity is the plug.
      const totalAssets = A.openingCash + receivables + A.openingPPE;
      const equity = totalAssets - payables - deferred - A.openingDebt;
      const depreciation = A.openingPPE / A.depreciationYears;
      const ebit = ebitda - depreciation;
      const interest = A.interestRate * A.openingDebt;
      const ebt = ebit - interest;
      const tax = Math.max(0, ebt) * A.taxRate;
      out.push({
        tickets, concessions, sponsorship: spons, league: A.league, academy, revenue,
        wages, matchday, travel, admin, ebitda, depreciation, ebit, interest, tax, netIncome: ebt - tax,
        cash: A.openingCash, receivables, ppe: A.openingPPE, totalAssets,
        payables, deferred, debt: A.openingDebt, equity, totalLE: payables + deferred + A.openingDebt + equity,
        cfo: NaN, wcChange: NaN, capex: NaN, cff: NaN, netCash: NaN,
      });
      continue;
    }

    const prev = out[i - 1];
    const depreciation = prev.ppe / A.depreciationYears;
    const ebit = ebitda - depreciation;
    const interest = A.interestRate * prev.debt;
    const ebt = ebit - interest;
    const tax = Math.max(0, ebt) * A.taxRate;
    const netIncome = ebt - tax;
    const wcChange = -(receivables - prev.receivables) + (payables - prev.payables) + (deferred - prev.deferred);
    const cfo = netIncome + depreciation + wcChange;
    const capex = A.capex[i];
    const cff = -A.debtRepayment;
    const netCash = cfo - capex + cff;
    const cash = prev.cash + netCash;
    const ppe = prev.ppe + capex - depreciation;
    const debt = prev.debt - A.debtRepayment;
    const equity = prev.equity + netIncome;
    out.push({
      tickets, concessions, sponsorship: spons, league: A.league, academy, revenue,
      wages, matchday, travel, admin, ebitda, depreciation, ebit, interest, tax, netIncome,
      cash, receivables, ppe, totalAssets: cash + receivables + ppe,
      payables, deferred, debt, equity, totalLE: payables + deferred + debt + equity,
      cfo, wcChange, capex, cff, netCash,
    });
  }
  return out;
}

const k = (n: number) => {
  if (Number.isNaN(n)) return "";
  const v = Math.round(n / 1000);
  if (Object.is(v, -0) || v === 0) return "0";
  return v < 0 ? `(${Math.abs(v).toLocaleString("en-US")})` : v.toLocaleString("en-US");
};

type Row = { label: string; key?: keyof Year; values?: number[]; bold?: boolean; sign?: -1 };

function Statement({ title, rows, model, from = 0 }: { title: string; rows: Row[]; model: Year[]; from?: number }) {
  const years = YEARS.slice(from);
  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <caption className={s.tableCaption}>{title}</caption>
        <thead>
          <tr>
            <th scope="col">$000s</th>
            {years.map((y) => (
              <th key={y} scope="col">
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={r.bold ? s.totalRow : undefined}>
              <th scope="row">{r.label}</th>
              {model.slice(from).map((y, i) => {
                const raw = r.values ? r.values[i] : (y[r.key as keyof Year] as number);
                return <td key={i}>{k((r.sign ?? 1) * raw)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ClubModel() {
  const model = buildModel();
  const checks = model.map((y) => Math.round(y.totalAssets - y.totalLE));
  const lowCash = Math.min(...model.map((y) => y.cash));
  const lowYear = YEARS[model.findIndex((y) => y.cash === lowCash)];
  const firstProfit = YEARS[model.findIndex((y) => y.netIncome > 0)];

  return (
    <div className={s.stack}>
      <div className={s.stats}>
        <div className={s.stat}>
          <span className={s.statNum}>{firstProfit}</span>
          <span className={s.statLabel}>first year with positive net income</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>${k(lowCash)}k</span>
          <span className={s.statLabel}>lowest year-end cash ({lowYear})</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>{checks.every((c) => c === 0) ? "0 / 0 / 0 / 0" : checks.join(" / ")}</span>
          <span className={s.statLabel}>balance sheet check, every year</span>
        </div>
      </div>

      <div className={s.assumptions}>
        <h3 className={s.memoTitle}>Key assumptions</h3>
        <ul>
          <li>14 home matches. Attendance 2,150 in FY25, growing 7%, 6%, then 4%.</li>
          <li>Average ticket $14, up $1 a year. Concessions and merch $9.50 a head, up 3%.</li>
          <li>Sponsorship $420k growing 9%; academy and camps $180k growing 5%; league distribution flat at $60k.</li>
          <li>Wages up 5% a year. Matchday costs 22% of matchday revenue.</li>
          <li>Scoreboard capex of $250k in FY26, then $110k a year of routine spend. Ten-year straight-line depreciation.</li>
          <li>$600k loan at 6.5%, repaid $100k a year. Sponsors owe 12% of their fees at year end; 25% of ticket revenue is collected in advance.</li>
        </ul>
      </div>

      <Statement
        title="Income statement"
        model={model}
        rows={[
          { label: "Ticket revenue", key: "tickets" },
          { label: "Concessions & merch", key: "concessions" },
          { label: "Sponsorship", key: "sponsorship" },
          { label: "League distribution", key: "league" },
          { label: "Academy & camps", key: "academy" },
          { label: "Total revenue", key: "revenue", bold: true },
          { label: "Player & staff wages", key: "wages", sign: -1 },
          { label: "Matchday operations", key: "matchday", sign: -1 },
          { label: "Travel", key: "travel", sign: -1 },
          { label: "General & admin", key: "admin", sign: -1 },
          { label: "EBITDA", key: "ebitda", bold: true },
          { label: "Depreciation", key: "depreciation", sign: -1 },
          { label: "Interest", key: "interest", sign: -1 },
          { label: "Tax", key: "tax", sign: -1 },
          { label: "Net income", key: "netIncome", bold: true },
        ]}
      />

      <Statement
        title="Balance sheet (year end)"
        model={model}
        rows={[
          { label: "Cash", key: "cash" },
          { label: "Sponsor receivables", key: "receivables" },
          { label: "Stadium & equipment (net)", key: "ppe" },
          { label: "Total assets", key: "totalAssets", bold: true },
          { label: "Payables", key: "payables" },
          { label: "Deferred ticket revenue", key: "deferred" },
          { label: "Loan", key: "debt" },
          { label: "Owners' equity", key: "equity" },
          { label: "Total liabilities & equity", key: "totalLE", bold: true },
          { label: "Check (should be 0)", values: checks.map((c) => c * 1000) },
        ]}
      />

      <Statement
        title="Cash flow statement"
        model={model}
        from={1}
        rows={[
          { label: "Net income", key: "netIncome" },
          { label: "Add back depreciation", key: "depreciation" },
          { label: "Change in working capital", key: "wcChange" },
          { label: "Cash from operations", key: "cfo", bold: true },
          { label: "Capital expenditure", key: "capex", sign: -1 },
          { label: "Loan repayment", key: "cff" },
          { label: "Net change in cash", key: "netCash", bold: true },
          { label: "Year-end cash", key: "cash", bold: true },
        ]}
      />

      <div className={s.memo}>
        <h3 className={s.memoTitle}>What I told the (imaginary) board</h3>
        <ol className={s.memoList}>
          <li>
            <strong>The P&amp;L can carry the scoreboard.</strong> Net income turns positive in {firstProfit} and keeps
            improving, mostly because sponsorship grows faster than wages.
          </li>
          <li>
            <strong>The bank account cannot, at least not comfortably.</strong> Paying $250k up front while also
            repaying $100k of loan a year drives cash down to about ${k(lowCash)}k in {lowYear}. One wet season or a
            sponsor paying late and the club is overdrawn.
          </li>
          <li>
            <strong>Fix the timing, not the project.</strong> Ask the scoreboard sponsor to prepay two years, or finance
            the board over five years. Either keeps a cash cushion above $150k.
          </li>
        </ol>
      </div>
    </div>
  );
}
