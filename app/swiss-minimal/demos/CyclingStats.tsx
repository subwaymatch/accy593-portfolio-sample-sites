import d from "./demos.module.css";

const stats = [
  { value: "214", label: "Rides merged (2025 and 2026 seasons)" },
  { value: "4,180", label: "Miles ridden, rounded" },
  { value: "63%", label: "Road miles within 30 mi covered" },
  { value: "38", label: "Square-mile sections never entered" },
];

export default function CyclingStats() {
  return (
    <div className={d.block}>
      <p className={d.label}>Summary · My ride logs</p>
      <div className={d.kpis}>
        {stats.map((s) => (
          <div key={s.label} className={d.kpi}>
            <div className={d.kpiValue}>{s.value}</div>
            <div className={d.kpiLabel}>{s.label}</div>
          </div>
        ))}
      </div>
      <p className={d.note}>
        Most of the uncovered sections are north-east of Urbana, where the gravel roads start. That is next
        spring&apos;s plan.
      </p>
    </div>
  );
}
