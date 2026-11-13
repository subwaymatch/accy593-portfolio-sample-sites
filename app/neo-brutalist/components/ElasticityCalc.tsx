"use client";

import { useId, useState } from "react";
import styles from "../site.module.css";
import demo from "./demo.module.css";

const money = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: v >= 1000 ? 0 : 2 });
const pct = (v: number) => `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%`;

function NumField({
  label,
  value,
  onChange,
  step = "0.01",
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
  prefix?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className={demo.field}>
      <span>{label}</span>
      <span className={demo.inputBox}>
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </span>
    </label>
  );
}

export default function ElasticityCalc() {
  const [p1, setP1] = useState("5.75");
  const [q1, setQ1] = useState("820");
  const [p2, setP2] = useState("6.25");
  const [q2, setQ2] = useState("760");
  const [cost, setCost] = useState("1.90");
  const [change, setChange] = useState(5);
  const sliderId = useId();

  const P1 = parseFloat(p1);
  const Q1 = parseFloat(q1);
  const P2 = parseFloat(p2);
  const Q2 = parseFloat(q2);
  const C = parseFloat(cost);

  const valid = [P1, Q1, P2, Q2].every((v) => Number.isFinite(v) && v > 0);
  const priceMoved = valid && P1 !== P2;
  const e = priceMoved ? ((Q2 - Q1) / ((Q1 + Q2) / 2)) / ((P2 - P1) / ((P1 + P2) / 2)) : NaN;

  let verdict = "";
  if (Number.isFinite(e) && e > 0) {
    verdict =
      "Positive: sales went up along with the price, so something else changed too (a promo, the weather, move-in week). I would not price off this one.";
  } else if (Number.isFinite(e)) {
    const a = Math.abs(e);
    verdict =
      a < 0.95
        ? "Inelastic: customers barely react, so a price increase raises revenue."
        : a > 1.05
          ? "Elastic: customers are price sensitive, so a price increase lowers revenue."
          : "Roughly unit elastic: revenue barely moves either way.";
  }

  // Projection from the latest observed point (P2, Q2), constant elasticity.
  const newP = P2 * (1 + change / 100);
  const usable = Number.isFinite(e) && e <= 0;
  const newQ = usable ? Q2 * Math.pow(newP / P2, e) : NaN;
  const baseRev = P2 * Q2;
  const newRev = newP * newQ;
  const unitCost = Number.isFinite(C) && C >= 0 ? C : 0;
  const baseMargin = (P2 - unitCost) * Q2;
  const newMargin = (newP - unitCost) * newQ;

  const bars = [
    { label: "Revenue", now: baseRev, next: newRev },
    { label: "Margin", now: baseMargin, next: newMargin },
  ];
  const maxBar = Math.max(...bars.flatMap((b) => [b.now, b.next]).filter(Number.isFinite), 1);

  return (
    <div className={`${styles.panel} ${demo.calc}`}>
      <p className={styles.sampleNote}>Default numbers are a made-up bubble tea example</p>

      <fieldset className={demo.fieldset}>
        <legend>1 · Measure it: two price points</legend>
        <div className={demo.fieldGrid}>
          <NumField label="Old price" prefix="$" value={p1} onChange={setP1} />
          <NumField label="Units / week at old price" step="1" value={q1} onChange={setQ1} />
          <NumField label="New price" prefix="$" value={p2} onChange={setP2} />
          <NumField label="Units / week at new price" step="1" value={q2} onChange={setQ2} />
        </div>
        <div className={demo.result} aria-live="polite">
          {!valid ? (
            <p>Enter positive numbers in all four boxes.</p>
          ) : !priceMoved ? (
            <p>The two prices are the same, so there is no price change to measure.</p>
          ) : (
            <>
              <p className={demo.bigNumber}>
                Elasticity <strong>{e.toFixed(2)}</strong>
              </p>
              <p>{verdict}</p>
            </>
          )}
        </div>
      </fieldset>

      <fieldset className={demo.fieldset} disabled={!usable}>
        <legend>2 · Use it: try a new price</legend>
        <div className={demo.fieldGrid}>
          <NumField label="Unit cost (ingredients + cup)" prefix="$" value={cost} onChange={setCost} />
          <label htmlFor={sliderId} className={demo.field}>
            <span>
              Change from {Number.isFinite(P2) ? money(P2) : "new price"}: <strong>{change > 0 ? "+" : ""}{change}%</strong>
            </span>
            <input
              id={sliderId}
              type="range"
              min={-30}
              max={30}
              step={1}
              value={change}
              onChange={(ev) => setChange(Number(ev.target.value))}
              className={demo.range}
            />
          </label>
        </div>
        {Number.isFinite(newQ) && (
          <div className={demo.result} aria-live="polite">
            <p>
              At <strong>{money(newP)}</strong> you would sell about <strong>{Math.round(newQ)}</strong> units a week (
              {pct(newQ / Q2 - 1)}).
            </p>
            <div className={demo.compare}>
              {bars.map((b) => (
                <div key={b.label} className={demo.compareRow}>
                  <span className={demo.compareLabel}>{b.label}</span>
                  <div className={demo.compareBars}>
                    <div className={demo.barTrack}>
                      <div className={demo.barNow} style={{ width: `${Math.max(0, (b.now / maxBar) * 100)}%` }} />
                      <span>now {money(b.now)}</span>
                    </div>
                    <div className={demo.barTrack}>
                      <div className={demo.barNext} style={{ width: `${Math.max(0, (b.next / maxBar) * 100)}%` }} />
                      <span>
                        new {money(b.next)} ({pct(b.next / b.now - 1)})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className={demo.fine}>
              Assumes constant elasticity, so treat anything beyond ±15% as a rough guess. Weekly figures.
            </p>
          </div>
        )}
      </fieldset>
    </div>
  );
}
