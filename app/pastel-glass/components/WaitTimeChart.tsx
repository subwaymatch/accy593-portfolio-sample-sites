"use client";

import { useState } from "react";
import d from "./details.module.css";

// Sample data: illustrative and rounded, reconstructed for this portfolio.
// Average minutes from check-in to sitting down with a preparer, Saturday walk-ins.
const BLOCKS = ["9–10", "10–11", "11–12", "12–1", "1–2", "2–3"];
const BEFORE = [14, 41, 52, 37, 22, 11]; // weeks 1–5
const AFTER = [12, 26, 31, 24, 18, 10]; // weeks 6–10
const VISITS = [31, 48, 52, 44, 37, 26]; // total walk-ins per block, all 10 Saturdays

const COLORS = { before: "#d0683c", after: "#6a4fb8" };

const W = 640;
const H = 300;
const M = { top: 16, right: 12, bottom: 44, left: 44 };
const PW = W - M.left - M.right;
const PH = H - M.top - M.bottom;
const Y_MAX = 60;
const BAR = 22;
const GAP = 2;

const y = (v: number) => M.top + PH - (v / Y_MAX) * PH;
const band = PW / BLOCKS.length;

/** Column with a 4px rounded top, square at the baseline. */
function column(x: number, value: number) {
  const top = y(value);
  const base = y(0);
  const r = Math.min(4, (base - top) / 2);
  return `M${x},${base} V${top + r} Q${x},${top} ${x + r},${top} H${x + BAR - r} Q${x + BAR},${top} ${x + BAR},${top + r} V${base} Z`;
}

export default function WaitTimeChart() {
  const [active, setActive] = useState<number | null>(null);
  const visits = VISITS.reduce((a, b) => a + b, 0);
  const weighted = (arr: number[]) => Math.round(arr.reduce((a, v, i) => a + v * VISITS[i], 0) / visits);
  const totalBefore = weighted(BEFORE);
  const totalAfter = weighted(AFTER);
  const peakDrop = Math.round(((BEFORE[2] - AFTER[2]) / BEFORE[2]) * 100);

  return (
    <figure className={d.figure}>
      <figcaption className={d.figTitle}>
        Average wait by arrival time, Saturday walk-ins
        <span className={d.figSub}>Minutes from check-in to sitting down with a preparer</span>
      </figcaption>

      <ul className={d.legend} aria-label="Legend">
        <li>
          <span className={d.swatch} style={{ background: COLORS.before }} /> Weeks 1–5 (before)
        </li>
        <li>
          <span className={d.swatch} style={{ background: COLORS.after }} /> Weeks 6–10 (after screener + shift change)
        </li>
      </ul>

      <div className={d.chartWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={d.svg} role="img" aria-label="Grouped column chart. The peak wait at 11 to 12 fell from 52 to 31 minutes after the change.">
          {[0, 10, 20, 30, 40, 50, 60].map((t) => (
            <g key={t}>
              <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke="#e4def0" strokeWidth={1} />
              <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className={d.tick}>
                {t}
              </text>
            </g>
          ))}
          <text x={14} y={M.top + PH / 2} transform={`rotate(-90 14 ${M.top + PH / 2})`} textAnchor="middle" className={d.tick}>
            minutes
          </text>

          {BLOCKS.map((b, i) => {
            const cx = M.left + band * i + band / 2;
            const x1 = cx - BAR - GAP / 2;
            const x2 = cx + GAP / 2;
            const dim = active !== null && active !== i;
            return (
              <g key={b} opacity={dim ? 0.45 : 1}>
                <path d={column(x1, BEFORE[i])} fill={COLORS.before} />
                <path d={column(x2, AFTER[i])} fill={COLORS.after} />
                {i === 2 && (
                  <>
                    <text x={x1 + BAR / 2} y={y(BEFORE[i]) - 6} textAnchor="middle" className={d.valueLabel}>
                      52
                    </text>
                    <text x={x2 + BAR / 2} y={y(AFTER[i]) - 6} textAnchor="middle" className={d.valueLabel}>
                      31
                    </text>
                  </>
                )}
                <text x={cx} y={H - M.bottom + 18} textAnchor="middle" className={d.tick}>
                  {b}
                </text>
                <rect
                  x={M.left + band * i}
                  y={M.top}
                  width={band}
                  height={PH + 24}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`${b}: ${BEFORE[i]} minutes before, ${AFTER[i]} minutes after, ${VISITS[i]} visits`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={d.hit}
                />
              </g>
            );
          })}
          <line x1={M.left} x2={W - M.right} y1={y(0)} y2={y(0)} stroke="#b9b0cc" strokeWidth={1} />
          <text x={M.left + PW / 2} y={H - 6} textAnchor="middle" className={d.tick}>
            arrival time (a.m. / p.m.)
          </text>
        </svg>

        {active !== null && (
          <div
            className={d.tooltip}
            style={{ left: `${((M.left + band * active + band / 2) / W) * 100}%`, top: `${(y(Math.max(BEFORE[active], AFTER[active])) / H) * 100}%` }}
            role="status"
          >
            <strong>{BLOCKS[active]}</strong>
            <span>
              <i className={d.swatch} style={{ background: COLORS.before }} /> Before: {BEFORE[active]} min
            </span>
            <span>
              <i className={d.swatch} style={{ background: COLORS.after }} /> After: {AFTER[active]} min
            </span>
            <span className={d.muted}>{VISITS[active]} visits</span>
          </div>
        )}
      </div>

      <div className={d.statRow}>
        <div className={d.stat}>
          <span className={d.statNum}>
            {totalBefore} → {totalAfter} min
          </span>
          <span className={d.statLabel}>average Saturday wait, weighted by visits</span>
        </div>
        <div className={d.stat}>
          <span className={d.statNum}>−{peakDrop}%</span>
          <span className={d.statLabel}>at the 11–12 peak</span>
        </div>
        <div className={d.stat}>
          <span className={d.statNum}>{visits}</span>
          <span className={d.statLabel}>walk-in visits logged</span>
        </div>
      </div>

      <details className={d.tableToggle}>
        <summary>Show the data as a table</summary>
        <table className={d.table}>
          <thead>
            <tr>
              <th scope="col">Arrival</th>
              <th scope="col">Before (min)</th>
              <th scope="col">After (min)</th>
              <th scope="col">Visits</th>
            </tr>
          </thead>
          <tbody>
            {BLOCKS.map((b, i) => (
              <tr key={b}>
                <th scope="row">{b}</th>
                <td>{BEFORE[i]}</td>
                <td>{AFTER[i]}</td>
                <td>{VISITS[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className={d.note}>
        Sample data: rounded and illustrative, reconstructed for this portfolio. No client information was recorded on the logs.
      </p>
    </figure>
  );
}
