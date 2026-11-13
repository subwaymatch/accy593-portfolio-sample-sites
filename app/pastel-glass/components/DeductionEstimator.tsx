"use client";

import { useId, useState } from "react";
import d from "./details.module.css";

type Status = "single" | "mfj" | "hoh";

// Tax year 2025 figures (the returns our clinic prepared in spring 2026).
const STANDARD: Record<Status, number> = { single: 15750, mfj: 31500, hoh: 23625 };
const STATUS_LABEL: Record<Status, string> = {
  single: "Single",
  mfj: "Married filing jointly",
  hoh: "Head of household",
};

type Inputs = { status: Status; agi: number; salt: number; mortgage: number; charity: number; medical: number };

const PRESETS: { label: string; values: Inputs }[] = [
  { label: "Grad student renter", values: { status: "single", agi: 28000, salt: 1400, mortgage: 0, charity: 300, medical: 900 } },
  { label: "New homeowners", values: { status: "mfj", agi: 118000, salt: 9800, mortgage: 14200, charity: 2500, medical: 3000 } },
  { label: "Big medical year", values: { status: "hoh", agi: 52000, salt: 3100, mortgage: 6400, charity: 600, medical: 17500 } },
];

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** SALT cap for 2025: $40,000, reduced by 30% of income over $500,000, never below $10,000. AGI stands in for MAGI here. */
function saltCap(agi: number) {
  if (agi <= 500000) return 40000;
  return Math.max(10000, 40000 - 0.3 * (agi - 500000));
}

function estimate(v: Inputs) {
  const standard = STANDARD[v.status];
  const saltAllowed = Math.min(v.salt, saltCap(v.agi));
  const medicalAllowed = Math.max(0, v.medical - 0.075 * v.agi);
  const itemized = saltAllowed + v.mortgage + v.charity + medicalAllowed;
  return { standard, saltAllowed, medicalAllowed, itemized };
}

export default function DeductionEstimator() {
  const id = useId();
  const [v, setV] = useState<Inputs>(PRESETS[0].values);
  const r = estimate(v);
  const better = r.itemized > r.standard ? "itemize" : "standard";
  const diff = Math.abs(r.itemized - r.standard);
  const max = Math.max(r.standard, r.itemized, 1);

  const num = (key: keyof Omit<Inputs, "status">, label: string, hint?: string) => (
    <label className={d.field} htmlFor={`${id}-${key}`}>
      <span className={d.fieldLabel}>{label}</span>
      <span className={d.moneyInput}>
        <span aria-hidden="true">$</span>
        <input
          id={`${id}-${key}`}
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          value={Number.isFinite(v[key]) ? v[key] : 0}
          onChange={(e) => setV({ ...v, [key]: Math.max(0, Number(e.target.value) || 0) })}
        />
      </span>
      {hint && <span className={d.fieldHint}>{hint}</span>}
    </label>
  );

  return (
    <div className={d.estimator}>
      <p className={d.warning} role="note">
        <strong>Teaching tool, not tax advice.</strong> It uses simplified tax-year 2025 federal rules and leaves out plenty
        (the extra standard deduction for age 65+ or blindness, charitable and mortgage limits, married filing separately, state
        returns). Talk to a qualified preparer or a free VITA site about your own return.
      </p>

      <div className={d.presets} role="group" aria-label="Example households">
        <span className={d.presetsLabel}>Try an example:</span>
        {PRESETS.map((p) => (
          <button key={p.label} type="button" className={d.presetBtn} onClick={() => setV(p.values)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className={d.formGrid}>
        <label className={d.field} htmlFor={`${id}-status`}>
          <span className={d.fieldLabel}>Filing status</span>
          <select id={`${id}-status`} value={v.status} onChange={(e) => setV({ ...v, status: e.target.value as Status })}>
            {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        {num("agi", "Adjusted gross income (AGI)")}
        {num("salt", "State and local taxes paid", "Income or sales tax plus property tax")}
        {num("mortgage", "Home mortgage interest")}
        {num("charity", "Gifts to charity")}
        {num("medical", "Medical and dental bills", "Only the part above 7.5% of AGI counts")}
      </div>

      <div className={d.result} aria-live="polite">
        <div className={d.resultBars}>
          <div className={d.resultRow}>
            <span className={d.resultName}>Standard</span>
            <span className={d.track}>
              <span className={d.fill} style={{ width: `${(r.standard / max) * 100}%`, background: "#d0683c" }} />
            </span>
            <span className={d.resultValue}>{money(r.standard)}</span>
          </div>
          <div className={d.resultRow}>
            <span className={d.resultName}>Itemized</span>
            <span className={d.track}>
              <span className={d.fill} style={{ width: `${(r.itemized / max) * 100}%`, background: "#6a4fb8" }} />
            </span>
            <span className={d.resultValue}>{money(r.itemized)}</span>
          </div>
        </div>
        <p className={d.verdict}>
          {better === "standard"
            ? `The standard deduction wins by ${money(diff)}.`
            : `Itemizing wins by ${money(diff)}.`}
        </p>
        <p className={d.breakdown}>
          Itemized total = state and local taxes {money(r.saltAllowed)}
          {r.saltAllowed < v.salt ? " (capped)" : ""} + mortgage interest {money(v.mortgage)} + charity {money(v.charity)} +
          medical above the floor {money(r.medicalAllowed)}.
        </p>
      </div>
    </div>
  );
}
