import d from "./details.module.css";

// Fictional organisations and figures, invented for this exercise.
type Org = {
  name: string;
  short: string;
  color: string;
  program: number; // Part IX line 25, column B
  management: number; // column C
  fundraising: number; // column D
  contributions: number; // Part VIII line 1h
  reserves: number; // unrestricted, liquid net assets available for operations
};

const ORGS: Org[] = [
  { name: "Prairie Table Food Pantry", short: "Pantry", color: "#d0683c", program: 1054000, management: 124000, fundraising: 62000, contributions: 980000, reserves: 310000 },
  { name: "Lantern Literacy Library", short: "Library", color: "#6a4fb8", program: 359600, management: 92300, fundraising: 34100, contributions: 412000, reserves: 520000 },
  { name: "Boneyard Creek Garden Collective", short: "Garden", color: "#16917a", program: 128000, management: 17400, fundraising: 12600, contributions: 96000, reserves: 21000 },
];

const rows = ORGS.map((o) => {
  const total = o.program + o.management + o.fundraising;
  return {
    ...o,
    total,
    programRatio: o.program / total,
    costPerDollar: o.fundraising / o.contributions,
    months: o.reserves / (total / 12),
  };
});

const FIGURES = [
  { key: "total" as const, label: "Total expenses", line: "Part IX, line 25(A)" },
  { key: "program" as const, label: "Program services", line: "Part IX, line 25(B)" },
  { key: "management" as const, label: "Management & general", line: "Part IX, line 25(C)" },
  { key: "fundraising" as const, label: "Fundraising", line: "Part IX, line 25(D)" },
  { key: "contributions" as const, label: "Contributions", line: "Part VIII, line 1h" },
  { key: "reserves" as const, label: "Liquid reserves", line: "From the balance sheet" },
];

const compact = (n: number) =>
  "$" + n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: n >= 1e6 ? 2 : 0 });
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const METRICS = [
  {
    key: "programRatio" as const,
    title: "Program expense ratio",
    sub: "Share of total spending that goes to programs (higher looks better)",
    max: 1,
    fmt: (v: number) => `${Math.round(v * 100)}%`,
  },
  {
    key: "costPerDollar" as const,
    title: "Cost to raise $1",
    sub: "Fundraising expenses ÷ contributions (lower is better)",
    max: 0.15,
    fmt: (v: number) => `$${v.toFixed(2)}`,
  },
  {
    key: "months" as const,
    title: "Months of operating reserve",
    sub: "Liquid unrestricted net assets ÷ monthly expenses (3–6 is a common target)",
    max: 14,
    fmt: (v: number) => `${v.toFixed(1)} mo`,
  },
];

export default function Form990Compare() {
  return (
    <div className={d.figure}>
      <ul className={d.legend} aria-label="Organisations">
        {rows.map((o) => (
          <li key={o.name}>
            <span className={d.swatch} style={{ background: o.color }} /> {o.name}
          </li>
        ))}
      </ul>

      <div className={d.metricGrid}>
        {METRICS.map((m) => (
          <section key={m.key} className={d.metric} aria-label={m.title}>
            <h4 className={d.metricTitle}>{m.title}</h4>
            <p className={d.metricSub}>{m.sub}</p>
            {rows.map((o) => (
              <div key={o.name} className={d.hbarRow}>
                <span className={d.srOnly}>{o.name}: </span>
                <span className={d.track}>
                  <span className={d.fill} style={{ width: `${Math.min(1, o[m.key] / m.max) * 100}%`, background: o.color }} />
                </span>
                <span className={d.hbarValue}>{m.fmt(o[m.key])}</span>
              </div>
            ))}
          </section>
        ))}
      </div>

      <div className={d.tableScroll}>
        <table className={d.table}>
          <caption className={d.tableCaption}>Figures pulled from each (fictional) return</caption>
          <thead>
            <tr>
              <th scope="col">Line item</th>
              {rows.map((o) => (
                <th scope="col" key={o.name}>
                  {o.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIGURES.map((f) => (
              <tr key={f.label}>
                <th scope="row">
                  {f.label}
                  <span className={d.lineRef}>{f.line}</span>
                </th>
                {rows.map((o) => (
                  <td key={o.name}>
                    <span className={d.full}>{usd(o[f.key])}</span>
                    <span className={d.compact}>
                      {compact(o[f.key])}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={d.prose}>
        <h4>What I took from it</h4>
        <p>
          If you only looked at the program ratio, Lantern would come last at 74%. But Lantern carries about a year of
          reserves, partly because its management line includes the part-time bookkeeper who keeps its grant reporting
          clean. The garden collective looks lean and efficient at 81%, yet it has less than two months of cushion and
          spends 13 cents to raise each dollar, so one lost grant would hurt.
        </p>
        <p>
          My memo recommended that a donor read the three ratios together, plus Schedule O, before deciding anything.
          Overhead is not waste when it is the reason the organisation will still exist next year.
        </p>
      </div>
      <p className={d.note}>All three organisations and every figure are fictional, created for this class exercise.</p>
    </div>
  );
}
