import styles from "../site.module.css";
import demo from "./demo.module.css";

/** SAMPLE DATA: synthetic numbers made up for this portfolio, not a real shop's records. */
const segments = [
  { name: "Champions", customers: 148, revenue: 38, visits: 15.2, lastVisit: 3 },
  { name: "Loyal regulars", customers: 231, revenue: 27, visits: 7.8, lastVisit: 8 },
  { name: "New this term", customers: 187, revenue: 8, visits: 2.1, lastVisit: 12 },
  { name: "At risk", customers: 204, revenue: 15, visits: 4.6, lastVisit: 58 },
  { name: "Hibernating", customers: 470, revenue: 12, visits: 1.3, lastVisit: 140 },
];

const total = segments.reduce((s, x) => s + x.customers, 0);

export default function RfmChart() {
  const W = 640;
  const labelW = 132;
  const rowH = 58;
  const top = 34;
  const H = top + segments.length * rowH + 30;
  const max = 40;
  const x = (v: number) => labelW + (v / max) * (W - labelW - 46);

  return (
    <div className={styles.panel}>
      <p className={styles.sampleNote}>Sample data · 1,240 synthetic loyalty accounts</p>
      <h4 className={demo.chartTitle}>Share of customers vs share of revenue, by segment</h4>
      <div className={demo.legend}>
        <span>
          <i className={demo.swatch} style={{ background: "#2b59ff" }} /> % of customers
        </span>
        <span>
          <i className={demo.swatch} style={{ background: "#ff5fa2" }} /> % of revenue
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={demo.chart}
        role="img"
        aria-label="Bar chart. Champions are 12% of customers and 38% of revenue. Loyal regulars 19% and 27%. New this term 15% and 8%. At risk 16% and 15%. Hibernating 38% and 12%."
      >
        {[0, 10, 20, 30, 40].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={top - 8} y2={H - 26} stroke="#111" strokeOpacity={t === 0 ? 1 : 0.15} strokeWidth={t === 0 ? 2 : 1} />
            <text x={x(t)} y={H - 8} textAnchor="middle" fontSize="12" fill="#111">
              {t}%
            </text>
          </g>
        ))}
        {segments.map((s, i) => {
          const y = top + i * rowH;
          const cPct = (s.customers / total) * 100;
          return (
            <g key={s.name}>
              <text x={labelW - 10} y={y + 24} textAnchor="end" fontSize="13" fontWeight="700" fill="#111">
                {s.name}
              </text>
              <rect x={x(0)} y={y + 4} width={x(cPct) - x(0)} height={18} fill="#2b59ff" stroke="#111" strokeWidth="2" />
              <text x={x(cPct) + 6} y={y + 18} fontSize="12" fill="#111">
                {cPct.toFixed(0)}%
              </text>
              <rect x={x(0)} y={y + 24} width={x(s.revenue) - x(0)} height={18} fill="#ff5fa2" stroke="#111" strokeWidth="2" />
              <text x={x(s.revenue) + 6} y={y + 38} fontSize="12" fontWeight="700" fill="#111">
                {s.revenue}%
              </text>
            </g>
          );
        })}
      </svg>
      <div className={demo.tableWrap}>
        <table className={demo.table}>
          <caption>Segment profile (sample data)</caption>
          <thead>
            <tr>
              <th scope="col">Segment</th>
              <th scope="col">Customers</th>
              <th scope="col">Visits / month</th>
              <th scope="col">Median days since last visit</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((s) => (
              <tr key={s.name}>
                <th scope="row">{s.name}</th>
                <td>{s.customers}</td>
                <td>{s.visits}</td>
                <td>{s.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={demo.takeaway}>
        <strong>Takeaway:</strong> Champions are 12% of accounts but 38% of revenue. The At-risk group still spends
        like regulars when they show up, which makes them the cheapest revenue to win back.
      </p>
    </div>
  );
}
