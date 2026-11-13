import d from "./demos.module.css";

/* Illustrative figures only, not real sales data. */
const areas = [
  { name: "Downtown Champaign", sales: 38, median: 268000, ppsf: 182 },
  { name: "West Urbana", sales: 44, median: 241000, ppsf: 164 },
  { name: "Southwest Champaign", sales: 71, median: 312000, ppsf: 151 },
  { name: "Savoy", sales: 29, median: 289000, ppsf: 147 },
  { name: "North Champaign", sales: 52, median: 168000, ppsf: 118 },
];

const max = Math.max(...areas.map((a) => a.ppsf));

export default function HomeSales() {
  return (
    <div className={d.block}>
      <p className={d.label}>Figure 1 · Illustrative data</p>
      <h3 className={d.title}>Price per square foot, by neighbourhood</h3>
      <p className={d.note}>
        Made-up figures that mirror the layout of the site&apos;s comparison view. The real site reads the same columns
        from its CSV.
      </p>
      <ul className={d.bars}>
        {areas.map((a) => (
          <li key={a.name}>
            <span>
              <strong>{a.name}</strong>
              <br />
              <span style={{ color: "#555", fontSize: 14 }}>
                {a.sales} sales · median ${a.median.toLocaleString("en-US")}
              </span>
            </span>
            <span className={d.barTrack} aria-hidden="true">
              <span className={d.barFill} style={{ display: "block", width: `${(a.ppsf / max) * 100}%` }} />
            </span>
            <span className={d.barValue}>${a.ppsf}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
