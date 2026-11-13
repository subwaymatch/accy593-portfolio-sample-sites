import styles from "./terminal.module.css";

/* Small, dependency-free SVG charts. All data passed in is sample data. */

export function Sparkline({
  data,
  tone = "up",
  label,
}: {
  data: number[];
  tone?: "up" | "down" | "flat";
  label: string;
}) {
  const w = 120;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * (w - 4) + 2, h - 3 - ((v - min) / span) * (h - 6)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${d} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${pts[0][0].toFixed(1)} ${h} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg
      className={`${styles.spark} ${styles[`spark_${tone}`]}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <path d={area} className={styles.sparkArea} />
      <path d={d} className={styles.sparkLine} vectorEffect="non-scaling-stroke" />
      <circle cx={lx} cy={ly} r="2.5" className={styles.sparkDot} />
    </svg>
  );
}

/* ---------- 13-week cash forecast ---------- */

export const cashWeeks = [
  { wk: 1, receipts: 56, disb: 40, end: 158 },
  { wk: 2, receipts: 46, disb: 92, end: 112 },
  { wk: 3, receipts: 55, disb: 41, end: 126 },
  { wk: 4, receipts: 46, disb: 88, end: 84 },
  { wk: 5, receipts: 52, disb: 44, end: 92 },
  { wk: 6, receipts: 50, disb: 91, end: 51 },
  { wk: 7, receipts: 31, disb: 44, end: 38 },
  { wk: 8, receipts: 117, disb: 91, end: 64 },
  { wk: 9, receipts: 66, disb: 42, end: 88 },
  { wk: 10, receipts: 62, disb: 89, end: 61 },
  { wk: 11, receipts: 67, disb: 44, end: 84 },
  { wk: 12, receipts: 63, disb: 90, end: 57 },
  { wk: 13, receipts: 80, disb: 45, end: 92 },
];

export function CashChart() {
  const W = 640;
  const H = 260;
  const m = { t: 18, r: 12, b: 34, l: 44 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = 175;
  const floor = 50;
  const y = (v: number) => m.t + ih - (v / max) * ih;
  const band = iw / cashWeeks.length;
  const bw = band - 8;
  const ticks = [0, 50, 100, 150];
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-labelledby="cf13-title cf13-desc">
        <title id="cf13-title">Ending cash balance by week, $ thousands</title>
        <desc id="cf13-desc">
          Thirteen weekly bars starting at 158 in week 1, dipping to 38 in week 7, and ending at 92 in week 13. A dashed
          line marks the 50 thousand minimum cash policy. Only week 7 falls below it.
        </desc>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className={styles.gridLine} />
            <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={styles.axisText}>
              {t}
            </text>
          </g>
        ))}
        {cashWeeks.map((d, i) => {
          const x = m.l + i * band + 4;
          const low = d.end < floor;
          const top = y(d.end);
          const h = m.t + ih - top;
          const r = Math.min(4, h / 2);
          return (
            <g key={d.wk} className={styles.barGroup}>
              <title>{`Week ${d.wk}: receipts $${d.receipts}k, disbursements $${d.disb}k, ending cash $${d.end}k`}</title>
              <rect x={m.l + i * band} y={m.t} width={band} height={ih} className={styles.hitArea} />
              <path
                d={`M${x} ${m.t + ih} V${top + r} Q${x} ${top} ${x + r} ${top} H${x + bw - r} Q${x + bw} ${top} ${x + bw} ${top + r} V${m.t + ih} Z`}
                className={low ? styles.barAlert : styles.bar}
              />
              <text x={x + bw / 2} y={H - m.b + 16} textAnchor="middle" className={styles.axisText}>
                {d.wk}
              </text>
              {(low || d.wk === 1 || d.wk === 13) && (
                <text x={x + bw / 2} y={top - 6} textAnchor="middle" className={styles.valueText}>
                  {d.end}
                </text>
              )}
            </g>
          );
        })}
        <line x1={m.l} x2={W - m.r} y1={y(floor)} y2={y(floor)} className={styles.floorLine} />
        {/* Legend for the policy line, kept clear of the bars in the top-right corner. */}
        <g aria-hidden="true">
          <line x1={W - m.r - 250} x2={W - m.r - 218} y1={m.t + 8} y2={m.t + 8} className={styles.floorLine} />
          <text x={W - m.r - 212} y={m.t + 13} textAnchor="start" className={styles.floorText}>
            Minimum cash $50k
          </text>
        </g>
      </svg>
      <figcaption className={styles.figcaption}>
        Ending cash by week, $ thousands. Sample data for a fictional contractor. Hover or tap a bar for the week&apos;s
        receipts and disbursements.
      </figcaption>
    </figure>
  );
}

/* ---------- Marathon training ---------- */

export const runWeeks = [
  { wk: 1, miles: 24, pace: 548 },
  { wk: 2, miles: 27, pace: 545 },
  { wk: 3, miles: 30, pace: 546 },
  { wk: 4, miles: 26, pace: 540 },
  { wk: 5, miles: 32, pace: 537 },
  { wk: 6, miles: 35, pace: 538 },
  { wk: 7, miles: 38, pace: 533 },
  { wk: 8, miles: 30, pace: 531 },
  { wk: 9, miles: 38, pace: 528 },
  { wk: 10, miles: 41, pace: 527 },
  { wk: 11, miles: 44, pace: 523 },
  { wk: 12, miles: 36, pace: 525 },
  { wk: 13, miles: 45, pace: 521 },
  { wk: 14, miles: 40, pace: 524 },
  { wk: 15, miles: 30, pace: 519 },
  { wk: 16, miles: 20, pace: 0 },
];

const fmtPace = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function MileageChart() {
  const W = 640;
  const H = 200;
  const m = { t: 16, r: 10, b: 30, l: 36 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = 50;
  const y = (v: number) => m.t + ih - (v / max) * ih;
  const band = iw / runWeeks.length;
  const bw = band - 6;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-labelledby="mi-title">
        <title id="mi-title">Weekly mileage over a 16-week marathon block, peaking at 45 miles in week 13</title>
        {[0, 25, 50].map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className={styles.gridLine} />
            <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={styles.axisText}>
              {t}
            </text>
          </g>
        ))}
        {runWeeks.map((d, i) => {
          const x = m.l + i * band + 3;
          const top = y(d.miles);
          const r = 3;
          return (
            <g key={d.wk} className={styles.barGroup}>
              <title>{`Week ${d.wk}: ${d.miles} miles`}</title>
              <rect x={m.l + i * band} y={m.t} width={band} height={ih} className={styles.hitArea} />
              <path
                d={`M${x} ${m.t + ih} V${top + r} Q${x} ${top} ${x + r} ${top} H${x + bw - r} Q${x + bw} ${top} ${x + bw} ${top + r} V${m.t + ih} Z`}
                className={styles.bar}
              />
              {d.wk % 2 === 1 && (
                <text x={x + bw / 2} y={H - m.b + 16} textAnchor="middle" className={styles.axisText}>
                  {d.wk}
                </text>
              )}
              {d.wk === 13 && (
                <text x={x + bw / 2} y={top - 6} textAnchor="middle" className={styles.valueText}>
                  45 mi
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className={styles.figcaption}>Weekly mileage. Cutback weeks every fourth week, taper in 15–16.</figcaption>
    </figure>
  );
}

export function PaceChart() {
  const pts = runWeeks.filter((d) => d.pace > 0);
  const W = 640;
  const H = 200;
  const m = { t: 18, r: 14, b: 30, l: 66 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const lo = 510;
  const hi = 555;
  // Faster (lower seconds) plots higher.
  const y = (s: number) => m.t + ((s - lo) / (hi - lo)) * ih;
  const x = (wk: number) => m.l + ((wk - 1) / 15) * iw;
  const d = pts.map((p, i) => `${i ? "L" : "M"}${x(p.wk).toFixed(1)} ${y(p.pace).toFixed(1)}`).join(" ");
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-labelledby="pace-title">
        <title id="pace-title">Long-run pace improving from 9:08 per mile in week 1 to 8:39 per mile in week 15</title>
        {[520, 530, 540, 550].map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} className={styles.gridLine} />
            <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className={styles.axisText}>
              {fmtPace(t)}
            </text>
          </g>
        ))}
        <path d={d} className={styles.paceLine} />
        {pts.map((p) => (
          <g key={p.wk} className={styles.barGroup}>
            <title>{`Week ${p.wk} long run: ${fmtPace(p.pace)} per mile`}</title>
            <circle cx={x(p.wk)} cy={y(p.pace)} r="10" className={styles.hitArea} />
            <circle cx={x(p.wk)} cy={y(p.pace)} r="4" className={styles.paceDot} />
          </g>
        ))}
        {[1, 15].map((wk) => {
          const p = pts.find((q) => q.wk === wk)!;
          return (
            <text
              key={wk}
              x={x(wk) + (wk === 1 ? 6 : -4)}
              y={y(p.pace) + (wk === 1 ? 26 : -12)}
              textAnchor={wk === 1 ? "start" : "end"}
              className={styles.valueText}
            >
              {fmtPace(p.pace)}
            </text>
          );
        })}
        {[1, 4, 8, 12, 15].map((wk) => (
          <text key={wk} x={x(wk)} y={H - m.b + 18} textAnchor="middle" className={styles.axisText}>
            {wk}
          </text>
        ))}
      </svg>
      <figcaption className={styles.figcaption}>
        Long-run pace, min/mile (higher on the chart is faster). Week 16 was race week.
      </figcaption>
    </figure>
  );
}

/* ---------- CU Home Ledger: neighborhood medians ---------- */

export const hoods = [
  { name: "Southwest Champaign", median: 335, sales: 88 },
  { name: "West Urbana", median: 312, sales: 54 },
  { name: "Savoy", median: 298, sales: 71 },
  { name: "Downtown Champaign", median: 214, sales: 39 },
  { name: "North Champaign", median: 168, sales: 92 },
  { name: "East Urbana", median: 152, sales: 68 },
];

export function HoodBars() {
  const max = 360;
  return (
    <figure className={styles.figure}>
      <ul className={styles.hbars} aria-label="Median sale price by neighborhood, $ thousands (illustrative sample)">
        {hoods.map((h) => (
          <li key={h.name} className={styles.hbarRow}>
            <span className={styles.hbarLabel}>{h.name}</span>
            <span className={styles.hbarTrack}>
              <span className={styles.hbarFill} style={{ width: `${(h.median / max) * 100}%` }} />
            </span>
            <span className={styles.hbarValue}>
              ${h.median}k <small>n={h.sales}</small>
            </span>
          </li>
        ))}
      </ul>
      <figcaption className={styles.figcaption}>
        Median sale price, $ thousands, with number of sales. Illustrative sample of 412 records, not live market data.
      </figcaption>
    </figure>
  );
}

/* ---------- Chess board ---------- */

const GLYPH: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };

export function ChessBoard({
  fen,
  caption,
  highlight = [],
  label,
}: {
  fen: string;
  caption: string;
  highlight?: string[];
  label: string;
}) {
  const rows = fen.split(" ")[0].split("/");
  const cells: { sq: string; piece: string | null; light: boolean; r: number; c: number }[] = [];
  rows.forEach((row, r) => {
    let c = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        for (let k = 0; k < Number(ch); k++) {
          cells.push({ sq: "abcdefgh"[c] + (8 - r), piece: null, light: (r + c) % 2 === 0, r, c });
          c++;
        }
      } else {
        cells.push({ sq: "abcdefgh"[c] + (8 - r), piece: ch, light: (r + c) % 2 === 0, r, c });
        c++;
      }
    }
  });
  const S = 40;
  return (
    <figure className={styles.boardFig}>
      <svg viewBox={`0 0 ${S * 8 + 16} ${S * 8 + 16}`} className={styles.board} role="img" aria-label={label}>
        {cells.map((cell) => (
          <rect
            key={cell.sq}
            x={16 + cell.c * S}
            y={cell.r * S}
            width={S}
            height={S}
            className={
              highlight.includes(cell.sq) ? styles.sqHi : cell.light ? styles.sqLight : styles.sqDark
            }
          />
        ))}
        {cells
          .filter((cell) => cell.piece)
          .map((cell) => {
            const white = cell.piece === cell.piece!.toUpperCase();
            return (
              <text
                key={`p-${cell.sq}`}
                x={16 + cell.c * S + S / 2}
                y={cell.r * S + S / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className={white ? styles.pieceWhite : styles.pieceBlack}
              >
                {GLYPH[cell.piece!.toLowerCase()]}
                {"︎"}
              </text>
            );
          })}
        {"abcdefgh".split("").map((f, i) => (
          <text key={f} x={16 + i * S + S / 2} y={S * 8 + 12} textAnchor="middle" className={styles.coord}>
            {f}
          </text>
        ))}
        {[8, 7, 6, 5, 4, 3, 2, 1].map((n, i) => (
          <text key={n} x={7} y={i * S + S / 2 + 4} textAnchor="middle" className={styles.coord}>
            {n}
          </text>
        ))}
      </svg>
      <figcaption className={styles.figcaption}>{caption}</figcaption>
    </figure>
  );
}
