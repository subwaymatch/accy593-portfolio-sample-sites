"use client";

import { useEffect, useRef, useState } from "react";
import s from "../journal.module.css";

// SAMPLE DATA: constructed for this exercise, not from any real company.
// Counts of expense lines by first digit of the amount (digits 1-9).
const SAMPLES = {
  all: { label: "All cost centers", n: 1240, counts: [368, 221, 152, 127, 97, 84, 70, 66, 55] },
  field: { label: "Field Operations only", n: 212, counts: [52, 31, 24, 46, 12, 13, 11, 12, 11] },
} as const;
type Key = keyof typeof SAMPLES;

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const EXPECTED = DIGITS.map((d) => Math.log10(1 + 1 / d));
const OBSERVED_COLOR = "#9b2c35";
const EXPECTED_COLOR = "#25689c";

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

export default function BenfordChart() {
  const [key, setKey] = useState<Key>("all");
  const [hover, setHover] = useState<number | null>(null);
  const [width, setWidth] = useState(640);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setWidth(Math.max(280, Math.round(entries[0].contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sample = SAMPLES[key];
  const observed = sample.counts.map((c) => c / sample.n);
  const mad = observed.reduce((acc, o, i) => acc + Math.abs(o - EXPECTED[i]), 0) / 9;
  const verdict =
    mad <= 0.006 ? "Close conformity" : mad <= 0.012 ? "Acceptable conformity" : mad <= 0.015 ? "Marginal conformity" : "Nonconformity";

  const height = 290;
  const m = { top: 16, right: 12, bottom: 44, left: 40 };
  const iw = width - m.left - m.right;
  const ih = height - m.top - m.bottom;
  const yMax = 0.35;
  const band = iw / 9;
  const barW = Math.min(24, band * 0.55);
  const x = (i: number) => m.left + band * i + band / 2;
  const y = (v: number) => m.top + ih - (v / yMax) * ih;
  const ticks = [0, 0.1, 0.2, 0.3];
  const linePath = EXPECTED.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  // Bar with a 4px rounded top, square at the baseline.
  const barPath = (cx: number, v: number) => {
    const x0 = cx - barW / 2;
    const x1 = cx + barW / 2;
    const y0 = y(0);
    const y1 = y(v);
    const r = Math.min(4, (y0 - y1) / 2, barW / 2);
    return `M${x0},${y0} L${x0},${y1 + r} Q${x0},${y1} ${x0 + r},${y1} L${x1 - r},${y1} Q${x1},${y1} ${x1},${y1 + r} L${x1},${y0} Z`;
  };

  return (
    <figure className={s.chartFigure}>
      <div className={s.chartHead}>
        <p className={s.chartTitle}>First-digit frequency, observed vs. Benford expected</p>
        <p className={s.chartSub}>
          Sample data constructed for this exercise &middot; {sample.label}, n = {sample.n.toLocaleString("en-US")} expense lines
        </p>
        <div className={s.chartControls} role="group" aria-label="Choose sample">
          {(Object.keys(SAMPLES) as Key[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`${s.chartBtn} ${k === key ? s.chartBtnOn : ""}`}
              aria-pressed={k === key}
              onClick={() => setKey(k)}
            >
              {SAMPLES[k].label}
            </button>
          ))}
        </div>
        <ul className={s.legend}>
          <li>
            <span className={s.swatchBar} style={{ background: OBSERVED_COLOR }} /> Observed share
          </li>
          <li>
            <span className={s.swatchDot} style={{ background: EXPECTED_COLOR }} /> Benford expected
          </li>
        </ul>
      </div>

      <div ref={wrap} className={s.chartWrap} onMouseLeave={() => setHover(null)}>
        <svg width={width} height={height} role="img" aria-label={`Bar chart of first-digit shares for ${sample.label}, compared with Benford's expected curve. MAD ${mad.toFixed(4)}.`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.left} x2={width - m.right} y1={y(t)} y2={y(t)} stroke="#d9cfba" strokeWidth={1} />
              <text x={m.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className={s.axisText}>
                {t * 100}%
              </text>
            </g>
          ))}
          {DIGITS.map((d, i) => (
            <text key={d} x={x(i)} y={height - m.bottom + 20} textAnchor="middle" className={s.axisText}>
              {d}
            </text>
          ))}
          <text x={m.left + iw / 2} y={height - 2} textAnchor="middle" className={s.axisLabel}>
            Leading digit of amount
          </text>
          {hover !== null && (
            <rect x={x(hover) - band / 2} y={m.top} width={band} height={ih} fill="#1b1714" opacity={0.05} />
          )}
          {observed.map((v, i) => (
            <path key={i} d={barPath(x(i), v)} fill={OBSERVED_COLOR} opacity={hover === null || hover === i ? 1 : 0.55} />
          ))}
          <path d={linePath} fill="none" stroke={EXPECTED_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {EXPECTED.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r={4} fill={EXPECTED_COLOR} stroke="#f5eedd" strokeWidth={2} />
          ))}
          {key === "field" && (
            <text x={x(3) + barW / 2 + 6} y={y(observed[3]) + 4} className={s.chartNote}>
              21.7% vs 9.7%
            </text>
          )}
          {DIGITS.map((d, i) => (
            <rect
              key={d}
              x={x(i) - band / 2}
              y={m.top}
              width={band}
              height={ih}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onClick={() => setHover(i)}
            />
          ))}
        </svg>
        {hover !== null && (
          <div
            className={s.tooltip}
            style={{ left: Math.min(Math.max(x(hover) - 80, 0), width - 160), top: 0 }}
            role="status"
          >
            <strong>Digit {hover + 1}</strong>
            <span>
              Observed {pct(observed[hover])} ({sample.counts[hover]} lines)
            </span>
            <span>Expected {pct(EXPECTED[hover])}</span>
          </div>
        )}
      </div>

      <div className={s.madRow}>
        <span>
          Mean absolute deviation: <strong>{mad.toFixed(4)}</strong>
        </span>
        <span className={mad > 0.015 ? s.madBad : s.madGood}>{verdict}</span>
      </div>

      <details className={s.tableToggle}>
        <summary>Show the data table</summary>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <caption>{sample.label} (sample data)</caption>
            <thead>
              <tr>
                <th scope="col">Digit</th>
                <th scope="col">Lines</th>
                <th scope="col">Observed</th>
                <th scope="col">Expected</th>
                <th scope="col">Gap</th>
              </tr>
            </thead>
            <tbody>
              {DIGITS.map((d, i) => (
                <tr key={d}>
                  <th scope="row">{d}</th>
                  <td>{sample.counts[i]}</td>
                  <td>{pct(observed[i])}</td>
                  <td>{pct(EXPECTED[i])}</td>
                  <td>{((observed[i] - EXPECTED[i]) * 100).toFixed(1)} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
