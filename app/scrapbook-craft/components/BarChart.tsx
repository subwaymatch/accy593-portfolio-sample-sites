import s from "./chart.module.css";

export type BarRow = { label: string; value: number; highlight?: boolean };

/** A bar anchored square at the baseline with a rounded data end. */
export function Bar({ pct, className }: { pct: number; className: string }) {
  const w = Math.max(pct, 0.6);
  return (
    <svg className={s.track} aria-hidden="true">
      <rect x="0" y="2" width={`${w}%`} height="14" rx="4" className={className} />
      <rect x="0" y="2" width={`${w / 2}%`} height="14" className={className} />
    </svg>
  );
}

/**
 * Single-series horizontal bar chart drawn with inline SVG bars inside an HTML grid,
 * so labels stay at a readable size on phones. Includes a table view.
 */
export default function BarChart({
  title,
  caption,
  rows,
  unit,
  format = (v) => v.toFixed(1),
  tableHeading,
}: {
  title: string;
  caption: string;
  rows: BarRow[];
  unit: string;
  format?: (v: number) => string;
  tableHeading: [string, string];
}) {
  const max = Math.max(...rows.map((r) => r.value));
  const total = rows.reduce((a, r) => a + r.value, 0);
  return (
    <figure className={s.figure}>
      <figcaption className={s.title}>{title}</figcaption>
      <ul className={s.rows} role="list">
        {rows.map((r) => {
          const pct = (r.value / max) * 100;
          const share = ((r.value / total) * 100).toFixed(0);
          return (
            <li key={r.label} className={s.row} title={`${r.label}: ${format(r.value)} ${unit} (${share}% of total)`}>
              <span className={s.label}>{r.label}</span>
              <Bar pct={pct} className={r.highlight ? s.barHighlight : s.bar} />
              <span className={s.value}>
                {format(r.value)}
                <span className={s.share}> · {share}%</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className={s.caption}>{caption}</p>
      <details className={s.details}>
        <summary>Show the numbers as a table</summary>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">{tableHeading[0]}</th>
              <th scope="col" className={s.num}>
                {tableHeading[1]}
              </th>
              <th scope="col" className={s.num}>
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td className={s.num}>{format(r.value)}</td>
                <td className={s.num}>{((r.value / total) * 100).toFixed(1)}%</td>
              </tr>
            ))}
            <tr className={s.totalRow}>
              <td>Total</td>
              <td className={s.num}>{format(total)}</td>
              <td className={s.num}>100%</td>
            </tr>
          </tbody>
        </table>
      </details>
    </figure>
  );
}
