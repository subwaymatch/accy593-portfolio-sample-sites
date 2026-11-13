import styles from "../site.module.css";
import demo from "./demo.module.css";

/** SAMPLE DATA: illustrative results, not a real store's campaign. */
const N = 4000;
const metrics = [
  { name: "Open rate", a: 964, b: 1116, max: 32 },
  { name: "Click rate", a: 124, b: 156, max: 5 },
];

function ci(x: number, n: number) {
  const p = x / n;
  const half = 1.96 * Math.sqrt((p * (1 - p)) / n);
  return { p: p * 100, lo: (p - half) * 100, hi: (p + half) * 100 };
}

function zTest(x1: number, x2: number, n: number) {
  const p1 = x1 / n;
  const p2 = x2 / n;
  const pooled = (x1 + x2) / (2 * n);
  const se = Math.sqrt(pooled * (1 - pooled) * (2 / n));
  return (p2 - p1) / se;
}

function Panel({ m }: { m: (typeof metrics)[number] }) {
  const W = 300;
  const H = 230;
  const base = 190;
  const top = 20;
  const y = (v: number) => base - (v / m.max) * (base - top);
  const bars = [
    { label: "A", sub: "“Our fall restock is here”", ...ci(m.a, N), color: "#ffe14d" },
    { label: "B", sub: "“12 books our staff…”", ...ci(m.b, N), color: "#2b59ff" },
  ];
  const z = zTest(m.a, m.b, N);
  return (
    <figure className={demo.abPanel}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={demo.chart}
        role="img"
        aria-label={`${m.name}: version A ${bars[0].p.toFixed(1)}%, version B ${bars[1].p.toFixed(1)}%, with 95% confidence intervals.`}
      >
        <line x1="30" x2={W - 10} y1={base} y2={base} stroke="#111" strokeWidth="2" />
        {bars.map((b, i) => {
          const cx = 90 + i * 120;
          return (
            <g key={b.label}>
              <rect x={cx - 34} y={y(b.p)} width="68" height={base - y(b.p)} fill={b.color} stroke="#111" strokeWidth="2.5" />
              <line x1={cx} x2={cx} y1={y(b.hi)} y2={y(b.lo)} stroke="#111" strokeWidth="2.5" />
              <line x1={cx - 10} x2={cx + 10} y1={y(b.hi)} y2={y(b.hi)} stroke="#111" strokeWidth="2.5" />
              <line x1={cx - 10} x2={cx + 10} y1={y(b.lo)} y2={y(b.lo)} stroke="#111" strokeWidth="2.5" />
              <text x={cx + 40} y={y(b.p) + 4} fontSize="14" fontWeight="700" fill="#111">
                {b.p.toFixed(1)}%
              </text>
              <text x={cx} y={base + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#111">
                Version {b.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>
        <strong>{m.name}</strong> · z = {z.toFixed(2)} ·{" "}
        {Math.abs(z) >= 1.96 ? "significant at 95%" : "not significant at 95%"}
      </figcaption>
    </figure>
  );
}

export default function AbTestChart() {
  return (
    <div className={styles.panel}>
      <p className={styles.sampleNote}>Sample data · 4,000 recipients per version</p>
      <h4 className={demo.chartTitle}>Open and click rates with 95% confidence intervals</h4>
      <div className={demo.abGrid}>
        {metrics.map((m) => (
          <Panel key={m.name} m={m} />
        ))}
      </div>
      <div className={demo.tableWrap}>
        <table className={demo.table}>
          <caption>Raw counts</caption>
          <thead>
            <tr>
              <th scope="col">Version</th>
              <th scope="col">Sent</th>
              <th scope="col">Opens</th>
              <th scope="col">Clicks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">A: “Our fall restock is here”</th>
              <td>4,000</td>
              <td>964</td>
              <td>124</td>
            </tr>
            <tr>
              <th scope="row">B: “12 books our staff can’t stop passing around”</th>
              <td>4,000</td>
              <td>1,116</td>
              <td>156</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={demo.takeaway}>
        <strong>Readout:</strong> B wins on opens with room to spare. On clicks the intervals overlap and p ≈ 0.05, so I
        called it “promising, re-test” rather than declaring a winner.
      </p>
    </div>
  );
}
