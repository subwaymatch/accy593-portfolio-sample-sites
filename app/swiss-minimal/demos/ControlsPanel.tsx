import d from "./demos.module.css";

const controls = [
  { id: "P2P-04", name: "Three-way match on invoices over $10,000", owner: "AP lead", coso: "Control activities", status: "fail", days: 12 },
  { id: "FCR-11", name: "Review of manual journal entries over $25,000", owner: "Assistant controller", coso: "Control activities", status: "late", days: 6 },
  { id: "ITG-02", name: "Quarterly user access review, ERP", owner: "IT security", coso: "Control activities", status: "late", days: 3 },
  { id: "REV-07", name: "Credit memo approval", owner: "Billing manager", coso: "Control activities", status: "pass", days: 0 },
  { id: "ENT-01", name: "Code of conduct attestation", owner: "HR", coso: "Control environment", status: "pass", days: 0 },
  { id: "MON-03", name: "Internal audit follow-up on prior findings", owner: "Internal audit", coso: "Monitoring", status: "pass", days: 0 },
];

const label = { fail: "Exception", late: "Overdue", pass: "Passed" } as const;
const cls = { fail: d.statusFail, late: d.statusLate, pass: d.statusPass } as const;

export default function ControlsPanel() {
  return (
    <div className={d.block}>
      <p className={d.label}>Prototype · Sample data</p>
      <h3 className={d.title}>Q3 control testing, as of 30 September</h3>
      <div className={d.kpis}>
        <div className={d.kpi}>
          <div className={d.kpiValue}>48/52</div>
          <div className={d.kpiLabel}>Key controls tested</div>
        </div>
        <div className={d.kpi}>
          <div className={d.kpiValue}>1</div>
          <div className={d.kpiLabel}>Exception open</div>
        </div>
        <div className={d.kpi}>
          <div className={d.kpiValue}>2</div>
          <div className={d.kpiLabel}>Tests overdue</div>
        </div>
        <div className={d.kpi}>
          <div className={d.kpiValue}>0</div>
          <div className={d.kpiLabel}>Material weaknesses</div>
        </div>
      </div>
      <div className={d.tableWrap}>
        <table className={d.table}>
          <thead>
            <tr>
              <th scope="col">Control</th>
              <th scope="col" className={d.hideNarrow}>
                Owner
              </th>
              <th scope="col">Status</th>
              <th scope="col" className={d.num}>
                Days late
              </th>
            </tr>
          </thead>
          <tbody>
            {controls.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.id}</strong> {c.name}
                  <br />
                  <span style={{ color: "#555", fontSize: 13 }}>
                    {c.coso}
                    <span className={d.showNarrow}> · Owner: {c.owner}</span>
                  </span>
                </td>
                <td className={d.hideNarrow}>{c.owner}</td>
                <td>
                  <span className={`${d.status} ${cls[c.status as keyof typeof cls]}`}>{label[c.status as keyof typeof label]}</span>
                </td>
                <td className={d.num}>{c.days || "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={d.note}>
        Status is shown with a shape and a word as well as colour: filled red square for an exception, open square
        for overdue, filled black square for passed.
      </p>
    </div>
  );
}
