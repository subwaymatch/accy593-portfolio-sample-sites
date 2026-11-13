"use client";

import { useMemo, useState } from "react";
import styles from "../terminal.module.css";

const MONO = { fontFamily: "var(--mono-font)" } as const;

/* ------------------------------------------------------------------ */
/* AP aging bar chart (sample data)                                    */
/* ------------------------------------------------------------------ */

export const agingData = [
  { bucket: "Current", invoices: 612, balance: 412_300 },
  { bucket: "1-30", invoices: 341, balance: 268_150 },
  { bucket: "31-60", invoices: 148, balance: 120_900 },
  { bucket: "61-90", invoices: 61, balance: 57_800 },
  { bucket: "90+", invoices: 78, balance: 96_400 },
];

const fmtK = (n: number) => `$${Math.round(n / 1000)}k`;
const fmtUSD = (n: number) => `$${n.toLocaleString("en-US")}`;

export function AgingChart() {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600;
  const H = 300;
  const m = { top: 30, right: 12, bottom: 52, left: 52 };
  const pw = W - m.left - m.right;
  const ph = H - m.top - m.bottom;
  const max = 450_000;
  const slot = pw / agingData.length;
  const bw = Math.min(64, slot * 0.6);
  const y = (v: number) => m.top + ph - (v / max) * ph;
  const ticks = [0, 100_000, 200_000, 300_000, 400_000];

  return (
    <figure style={{ margin: 0 }}>
      <div className={styles.chartBox}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${W} ${H}`}
          role="group"
          aria-labelledby="aging-title"
          aria-describedby="aging-desc"
        >
          <title id="aging-title">Open AP balance by aging bucket, sample data</title>
          <desc id="aging-desc">
            Current $412k, 1 to 30 days $268k, 31 to 60 days $121k, 61 to 90 days $58k, over 90 days $96k.
            The over-90 bucket is larger than the 61 to 90 bucket.
          </desc>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.left} x2={W - m.right} y1={y(t)} y2={y(t)} stroke="#252c30" strokeWidth={1} />
              <text x={m.left - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill="#8f9b94" style={MONO}>
                {t === 0 ? "$0" : fmtK(t)}
              </text>
            </g>
          ))}
          {agingData.map((d, i) => {
            const cx = m.left + slot * i + slot / 2;
            const top = y(d.balance);
            const h = m.top + ph - top;
            const r = 4;
            const x0 = cx - bw / 2;
            const late = d.bucket === "90+";
            const path = `M${x0},${m.top + ph} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + bw - r} Q${x0 + bw},${top} ${x0 + bw},${top + r} V${m.top + ph} Z`;
            const dim = hover !== null && hover !== i;
            return (
              <g
                key={d.bucket}
                tabIndex={0}
                role="img"
                aria-label={`${d.bucket}: ${fmtUSD(d.balance)} across ${d.invoices} invoices`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                style={{ outline: "none", cursor: "default" }}
              >
                {/* oversized invisible hit target */}
                <rect x={cx - slot / 2} y={m.top} width={slot} height={ph} fill="transparent" />
                <path d={path} fill={late ? "#ffb000" : "#27c268"} opacity={dim ? 0.35 : 1} />
                <text x={cx} y={top - 8} textAnchor="middle" fontSize={12} fill="#d5ddd7" style={MONO}>
                  {fmtK(d.balance)}
                </text>
                <text x={cx} y={H - m.bottom + 20} textAnchor="middle" fontSize={12} fill="#d5ddd7" style={MONO}>
                  {d.bucket}
                </text>
                <text x={cx} y={H - m.bottom + 38} textAnchor="middle" fontSize={11} fill="#8f9b94" style={MONO}>
                  {d.invoices} inv
                </text>
                {hover === i && h > 0 && (
                  <g pointerEvents="none">
                    <rect
                      x={Math.min(Math.max(cx - 100, m.left), W - m.right - 200)}
                      y={Math.max(top - 64, 2)}
                      width={200}
                      height={44}
                      rx={4}
                      fill="#161b1e"
                      stroke="#323b40"
                    />
                    <text
                      x={Math.min(Math.max(cx - 100, m.left), W - m.right - 200) + 10}
                      y={Math.max(top - 64, 2) + 18}
                      fontSize={12}
                      fill="#f2f7f3"
                      style={MONO}
                    >
                      {fmtUSD(d.balance)}
                    </text>
                    <text
                      x={Math.min(Math.max(cx - 100, m.left), W - m.right - 200) + 10}
                      y={Math.max(top - 64, 2) + 35}
                      fontSize={11}
                      fill="#8f9b94"
                      style={MONO}
                    >
                      {d.invoices} invoices, {Math.round((d.invoices / 1240) * 100)}% of count
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          <text x={W - m.right} y={16} textAnchor="end" fontSize={11} fill="#ffb000" style={MONO}>
            ▲ 90+ should be smaller than 61-90
          </text>
        </svg>
      </div>
      <figcaption className={styles.caption}>
        Sample data: 1,240 synthetic open invoices, as of 30 Sep 2026. Hover or tab through bars for exact values.
      </figcaption>
      <details style={{ marginTop: 10 }}>
        <summary className={styles.caption} style={{ cursor: "pointer" }}>
          view as table
        </summary>
        <div className={styles.tableWrap} style={{ marginTop: 8 }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>bucket</th>
                <th className={styles.num}>invoices</th>
                <th className={styles.num}>open balance</th>
              </tr>
            </thead>
            <tbody>
              {agingData.map((d) => (
                <tr key={d.bucket}>
                  <td>{d.bucket}</td>
                  <td className={styles.num}>{d.invoices}</td>
                  <td className={styles.num}>{fmtUSD(d.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Close-as-a-graph diagram                                            */
/* ------------------------------------------------------------------ */

type DagNode = { id: string; label: string; col: number; y: number };
const DAG_NODES: DagNode[] = [
  { id: "bank", label: "bank recs", col: 0, y: 70 },
  { id: "ap", label: "AP cutoff", col: 0, y: 150 },
  { id: "ar", label: "AR cutoff", col: 0, y: 230 },
  { id: "pay", label: "payroll", col: 0, y: 310 },
  { id: "fa", label: "fixed assets", col: 0, y: 390 },
  { id: "cash", label: "cash entries", col: 1, y: 70 },
  { id: "accr", label: "accruals", col: 1, y: 190 },
  { id: "ic", label: "intercompany", col: 1, y: 290 },
  { id: "dep", label: "depreciation", col: 1, y: 390 },
  { id: "tb", label: "prelim TB", col: 2, y: 230 },
  { id: "flux", label: "flux review", col: 3, y: 170 },
  { id: "pack", label: "reporting pack", col: 3, y: 310 },
];
const DAG_EDGES: [string, string][] = [
  ["bank", "cash"],
  ["ap", "accr"],
  ["ar", "accr"],
  ["pay", "accr"],
  ["fa", "dep"],
  ["cash", "tb"],
  ["accr", "tb"],
  ["ic", "tb"],
  ["dep", "tb"],
  ["tb", "flux"],
  ["flux", "pack"],
];
const CRITICAL = new Set(["ap>accr", "accr>tb", "tb>flux", "flux>pack"]);

export function CloseDag({ label, compact = false }: { label: string; compact?: boolean }) {
  const colX = [16, 196, 376, 556];
  const w = 148;
  const h = 34;
  const byId = Object.fromEntries(DAG_NODES.map((n) => [n.id, n]));
  const critNodes = new Set(["ap", "accr", "tb", "flux", "pack"]);
  return (
    <svg
      className={styles.chart}
      viewBox="0 0 720 480"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      style={{ background: "#07090a" }}
    >
      <defs>
        <pattern id={compact ? "dag-grid-c" : "dag-grid"} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#14191b" strokeWidth="1" />
        </pattern>
        <marker id={compact ? "dag-arrow-c" : "dag-arrow"} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#4c5a52" />
        </marker>
        <marker id={compact ? "dag-arrow-ca" : "dag-arrow-a"} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#ffb000" />
        </marker>
      </defs>
      <rect width="720" height="480" fill={`url(#${compact ? "dag-grid-c" : "dag-grid"})`} />
      {DAG_EDGES.map(([a, b]) => {
        const s = byId[a];
        const t = byId[b];
        const crit = CRITICAL.has(`${a}>${b}`);
        const stroke = crit ? "#ffb000" : "#4c5a52";
        const marker = `url(#${compact ? (crit ? "dag-arrow-ca" : "dag-arrow-c") : crit ? "dag-arrow-a" : "dag-arrow"})`;
        if (s.col === t.col) {
          const x = colX[s.col] + w / 2;
          return <line key={a + b} x1={x} y1={s.y + h / 2} x2={x} y2={t.y - h / 2 - 2} stroke={stroke} strokeWidth={2} markerEnd={marker} />;
        }
        const x1 = colX[s.col] + w;
        const x2 = colX[t.col] - 2;
        const mx = (x1 + x2) / 2;
        return (
          <path
            key={a + b}
            d={`M${x1},${s.y} C${mx},${s.y} ${mx},${t.y} ${x2},${t.y}`}
            fill="none"
            stroke={stroke}
            strokeWidth={2}
            markerEnd={marker}
          />
        );
      })}
      {DAG_NODES.map((n) => {
        const crit = critNodes.has(n.id);
        return (
          <g key={n.id}>
            <rect
              x={colX[n.col]}
              y={n.y - h / 2}
              width={w}
              height={h}
              rx={4}
              fill="#111517"
              stroke={crit ? "#ffb000" : "#39ff88"}
              strokeOpacity={crit ? 1 : 0.6}
              strokeWidth={1.5}
            />
            <text x={colX[n.col] + w / 2} y={n.y + 4.5} textAnchor="middle" fontSize={14} fill={crit ? "#ffd27a" : "#cdeedd"} style={MONO}>
              {n.label}
            </text>
          </g>
        );
      })}
      <text x={16} y={460} fontSize={13} fill="#8f9b94" style={MONO}>
        <tspan fill="#ffb000">━━</tspan> critical path: work that can&apos;t start until the step before it closes
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after metric bars                                          */
/* ------------------------------------------------------------------ */

export type Metric = { label: string; before: number; after: number; unit: string };

export function BeforeAfter({ metrics }: { metrics: Metric[] }) {
  return (
    <div className={styles.metrics}>
      {metrics.map((mt) => {
        const max = Math.max(mt.before, mt.after);
        return (
          <div key={mt.label} className={styles.metric}>
            <div className={styles.metricLabel}>
              <span>{mt.label}</span>
              <span>
                {mt.before.toLocaleString("en-US")} → <span className={styles.good}>{mt.after.toLocaleString("en-US")}</span> {mt.unit}
              </span>
            </div>
            <div className={`${styles.bar} ${styles.barBefore}`} style={{ width: `${(mt.before / max) * 100}%` }} aria-hidden="true" />
            <div className={`${styles.bar} ${styles.barAfter}`} style={{ width: `${Math.max((mt.after / max) * 100, 1.5)}%` }} aria-hidden="true" />
          </div>
        );
      })}
      <p className={styles.caption}>
        <span style={{ color: "#8f9b94" }}>■</span> before (June close, manual) &nbsp; <span className={styles.good}>■</span> after (August close, script)
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sparkline KPI tiles                                                 */
/* ------------------------------------------------------------------ */

export function Sparkline({ values, label }: { values: number[]; label: string }) {
  const W = 160;
  const H = 40;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * (W - 8) + 4},${H - 4 - ((v - min) / (max - min || 1)) * (H - 8)}`)
    .join(" ");
  const last = pts.split(" ").at(-1)!.split(",");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" aria-label={label} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#39ff88" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0]} cy={last[1]} r={3.5} fill="#39ff88" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* CU home sales: sortable sample table                                */
/* ------------------------------------------------------------------ */

const HOME_ROWS = [
  { area: "Southwest Champaign", sales: 133, median: 318_500, ppsf: 142, dom: 18 },
  { area: "Savoy", sales: 96, median: 289_000, ppsf: 147, dom: 22 },
  { area: "North Champaign", sales: 82, median: 149_900, ppsf: 108, dom: 31 },
  { area: "West Urbana", sales: 71, median: 262_000, ppsf: 158, dom: 14 },
  { area: "Downtown Champaign", sales: 64, median: 238_000, ppsf: 171, dom: 21 },
  { area: "East Urbana", sales: 58, median: 172_000, ppsf: 119, dom: 27 },
  { area: "Campustown (condos)", sales: 18, median: 164_500, ppsf: 189, dom: 35 },
];
type HomeKey = "area" | "sales" | "median" | "ppsf" | "dom";
const HOME_COLS: { key: HomeKey; label: string; num: boolean }[] = [
  { key: "area", label: "neighborhood", num: false },
  { key: "sales", label: "sales", num: true },
  { key: "median", label: "median price", num: true },
  { key: "ppsf", label: "$/sq ft", num: true },
  { key: "dom", label: "days on mkt", num: true },
];

export function HomeSalesTable() {
  const [sort, setSort] = useState<{ key: HomeKey; dir: 1 | -1 }>({ key: "sales", dir: -1 });
  const rows = useMemo(() => {
    return [...HOME_ROWS].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      return (typeof av === "string" ? av.localeCompare(bv as string) : av - (bv as number)) * sort.dir;
    });
  }, [sort]);
  const click = (key: HomeKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "area" ? 1 : -1 }));

  return (
    <figure style={{ margin: 0 }}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {HOME_COLS.map((c) => (
                <th
                  key={c.key}
                  className={c.num ? styles.num : undefined}
                  aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                >
                  <button type="button" className={styles.sortBtn} aria-pressed={sort.key === c.key} onClick={() => click(c.key)}>
                    {c.label}
                    {sort.key === c.key ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.area}>
                <td>{r.area}</td>
                <td className={styles.num}>{r.sales}</td>
                <td className={styles.num}>{fmtUSD(r.median)}</td>
                <td className={styles.num}>${r.ppsf}</td>
                <td className={`${styles.num} ${r.dom <= 18 ? styles.good : r.dom >= 30 ? styles.warn : ""}`}>{r.dom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className={styles.caption}>
        Illustrative sample data shaped like the site&apos;s neighborhood view, not real MLS records. Click a column to sort; on a phone, scroll the table sideways.
      </figcaption>
    </figure>
  );
}
