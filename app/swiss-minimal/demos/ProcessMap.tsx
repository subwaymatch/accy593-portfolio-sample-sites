import d from "./demos.module.css";

const steps = [
  { name: "Create requisition", cases: 1200 },
  { name: "Approve requisition", cases: 1188 },
  { name: "Create purchase order", cases: 1188 },
  { name: "Record goods receipt", cases: 1131 },
  { name: "Record invoice", cases: 1176 },
  { name: "Clear invoice", cases: 1162 },
];

const variants = [
  { name: "Happy path, all six steps in order", share: 61, red: false },
  { name: "PO changed after approval, then rework", share: 14, red: true },
  { name: "Invoice recorded before goods receipt", share: 9, red: false },
  { name: "Requisition skipped, PO created directly", share: 6, red: false },
  { name: "Other variants (31 distinct)", share: 10, red: false },
];

export default function ProcessMap() {
  return (
    <div className={d.block}>
      <p className={d.label}>Figure 1 · Sample data</p>
      <h3 className={d.title}>Six activities, 1,200 cases</h3>
      <p className={d.note}>
        Synthetic event log, not company data. Counts show how many cases reached each activity at least once.
        The red rule marks the step where most rework loops back.
      </p>
      <ol className={d.steps}>
        {steps.map((st, i) => (
          <li key={st.name} className={`${d.step} ${i === 2 ? d.stepRework : ""}`}>
            <span className={d.stepNum}>{String(i + 1).padStart(2, "0")}</span>
            <span className={d.stepName}>{st.name}</span>
            <span className={d.stepCount}>{st.cases.toLocaleString("en-US")} cases</span>
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 56 }}>
        <p className={d.label}>Figure 2 · Sample data</p>
        <h3 className={d.title}>Share of cases by variant</h3>
        <ul className={d.bars}>
          {variants.map((v) => (
            <li key={v.name}>
              <span>{v.name}</span>
              <span className={d.barTrack} aria-hidden="true">
                <span
                  className={`${d.barFill} ${v.red ? d.barFillRed : ""}`}
                  style={{ display: "block", width: `${(v.share / 61) * 100}%` }}
                />
              </span>
              <span className={d.barValue}>{v.share}%</span>
            </li>
          ))}
        </ul>
        <p className={d.note}>
          In 40% of the rework cases (about 67 orders) the changed PO was not re-approved. That is the finding I
          led the memo with.
        </p>
      </div>
    </div>
  );
}
