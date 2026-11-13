import c from "./IntangiblesChart.module.css";

/**
 * ILLUSTRATIVE SAMPLE DATA. These are composite companies, not real firms.
 * Each row splits market value (= 100) into three parts.
 */
const DATA = [
  { company: "Luxury fashion house", note: "Built its brands", tangible: 14, recognised: 9, gap: 77 },
  { company: "Software company", note: "Code and customers built in-house", tangible: 8, recognised: 12, gap: 80 },
  { company: "Consumer goods group", note: "Bought most of its brands", tangible: 11, recognised: 41, gap: 48 },
  { company: "Steel producer", note: "Plants and inventory", tangible: 76, recognised: 3, gap: 21 },
  { company: "Regional bank", note: "Loans and securities", tangible: 84, recognised: 5, gap: 11 },
];

const SERIES = [
  { key: "tangible", label: "Tangible book value", cls: c.tangible },
  { key: "recognised", label: "Recognised intangibles and goodwill", cls: c.recognised },
  { key: "gap", label: "Not on the balance sheet", cls: c.gap },
] as const;

export default function IntangiblesChart() {
  return (
    <figure className={c.figure}>
      <div className={c.head}>
        <p className={c.kicker}>Chart · illustrative sample data</p>
        <h2 className={c.title}>For brand-led companies, most of the value is off the balance sheet</h2>
        <p className={c.note}>
          Market value of each company split into three parts, as a share of 100. Hover or tap a bar for values.
        </p>
      </div>

      <ul className={c.legend} aria-label="Legend">
        {SERIES.map((s) => (
          <li key={s.key}>
            <span className={`${c.swatch} ${s.cls}`} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>

      <div className={c.rows} role="list">
        {DATA.map((d) => (
          <div key={d.company} className={c.row} role="listitem">
            <div className={c.rowLabel}>
              <span className={c.company}>{d.company}</span>
              <span className={c.rowNote}>{d.note}</span>
            </div>
            <div className={c.bar}>
              {SERIES.map((s) => {
                const v = d[s.key];
                return (
                  <span
                    key={s.key}
                    className={`${c.seg} ${s.cls}`}
                    style={{ flexGrow: v }}
                    tabIndex={0}
                    aria-label={`${d.company}, ${s.label}: ${v}% of market value`}
                  >
                    {v >= 12 && <span className={c.segValue}>{v}%</span>}
                    <span className={c.tip} role="tooltip">
                      <strong>{d.company}</strong>
                      <br />
                      {s.label}: {v}%
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={c.axis} aria-hidden="true">
        <span>0</span>
        <span>50</span>
        <span>100% of market value</span>
      </div>

      <details className={c.details}>
        <summary>Show the data as a table</summary>
        <div className={c.tableWrap}>
          <table className={c.table}>
            <caption>Share of market value (%), illustrative sample data</caption>
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Tangible book</th>
                <th scope="col">Recognised intangibles</th>
                <th scope="col">Not recognised</th>
              </tr>
            </thead>
            <tbody>
              {DATA.map((d) => (
                <tr key={d.company}>
                  <th scope="row">{d.company}</th>
                  <td>{d.tangible}</td>
                  <td>{d.recognised}</td>
                  <td>{d.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <figcaption className={c.caption}>
        Sample data written to illustrate the pattern; the companies are composites, not real firms. &ldquo;Not on the
        balance sheet&rdquo; is market value minus total book equity, so it also captures market expectations, not
        only unrecognised intangibles.
      </figcaption>
    </figure>
  );
}
