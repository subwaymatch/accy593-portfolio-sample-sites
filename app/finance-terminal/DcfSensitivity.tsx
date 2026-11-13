"use client";

import { useMemo, useState } from "react";
import styles from "./terminal.module.css";

// Prairie Forge Components (fictional). Unlevered free cash flow forecast, $ millions.
const FCF = [
  { year: "2027E", fcf: 142 },
  { year: "2028E", fcf: 151 },
  { year: "2029E", fcf: 163 },
  { year: "2030E", fcf: 171 },
  { year: "2031E", fcf: 178 },
];
const NET_DEBT = 620; // $M
const SHARES = 48.5; // millions, diluted
const PRICE = 38.4; // current share price, $

const WACCS = [0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1];
const GROWTHS = [0.015, 0.02, 0.025, 0.03, 0.035];
const BASE = { w: 0.085, g: 0.025 };

function value(w: number, g: number, midYear: boolean) {
  const shift = midYear ? 0.5 : 0;
  let pvFcf = 0;
  FCF.forEach((f, i) => {
    pvFcf += f.fcf / Math.pow(1 + w, i + 1 - shift);
  });
  const last = FCF[FCF.length - 1].fcf;
  const tv = (last * (1 + g)) / (w - g);
  const pvTv = tv / Math.pow(1 + w, FCF.length - shift);
  const ev = pvFcf + pvTv;
  const equity = ev - NET_DEBT;
  return { pvFcf, tv, pvTv, ev, equity, price: equity / SHARES, tvShare: pvTv / ev };
}

const pct = (n: number, d = 1) => `${(n * 100).toFixed(d)}%`;
const usd = (n: number) => `$${n.toFixed(2)}`;
const mm = (n: number) => `$${Math.round(n).toLocaleString("en-US")}M`;

export default function DcfSensitivity() {
  const [sel, setSel] = useState(BASE);
  const [midYear, setMidYear] = useState(false);

  const grid = useMemo(
    () => GROWTHS.map((g) => WACCS.map((w) => value(w, g, midYear).price)),
    [midYear],
  );
  const s = value(sel.w, sel.g, midYear);
  const upside = s.price / PRICE - 1;

  return (
    <div className={styles.dcf}>
      <div className={styles.dcfControls}>
        <label className={styles.toggle}>
          <input type="checkbox" checked={midYear} onChange={(e) => setMidYear(e.target.checked)} />
          <span>Mid-year discounting</span>
        </label>
        <button type="button" className={styles.ghostBtn} onClick={() => setSel(BASE)}>
          Reset to base case
        </button>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.sensTable}>
          <caption className={styles.tableCaption}>
            Implied share price ($). Rows: terminal growth g. Columns: WACC. Select a cell to see the bridge.
          </caption>
          <thead>
            <tr>
              <th scope="col" className={styles.sensCorner}>
                g \ WACC
              </th>
              {WACCS.map((w) => (
                <th key={w} scope="col" className={w === sel.w ? styles.sensActiveHead : undefined}>
                  {pct(w)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROWTHS.map((g, gi) => (
              <tr key={g}>
                <th scope="row" className={g === sel.g ? styles.sensActiveHead : undefined}>
                  {pct(g)}
                </th>
                {WACCS.map((w, wi) => {
                  const p = grid[gi][wi];
                  const diff = p / PRICE - 1;
                  const tone = diff > 0.05 ? styles.cellUp : diff < -0.05 ? styles.cellDown : styles.cellFlat;
                  const active = w === sel.w && g === sel.g;
                  const isBase = w === BASE.w && g === BASE.g;
                  return (
                    <td key={w}>
                      <button
                        type="button"
                        className={`${styles.sensCell} ${tone} ${active ? styles.sensCellActive : ""}`}
                        aria-pressed={active}
                        aria-label={`WACC ${pct(w)}, growth ${pct(g)}: ${usd(p)} per share${isBase ? ", base case" : ""}`}
                        onClick={() => setSel({ w, g })}
                      >
                        {p.toFixed(2)}
                        {isBase && <span className={styles.baseDot} aria-hidden="true" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.legendRow}>
        <span className={styles.legendUp}>▲ more than 5% above</span>
        <span className={styles.legendFlat}>■ within ±5% of</span>
        <span className={styles.legendDown}>▼ more than 5% below</span>
        <span>the $38.40 current price · ● base case</span>
      </p>

      <dl className={styles.bridge} aria-live="polite">
        <div>
          <dt>PV of FCF 2027–31</dt>
          <dd>{mm(s.pvFcf)}</dd>
        </div>
        <div>
          <dt>PV of terminal value</dt>
          <dd>
            {mm(s.pvTv)} <small>({pct(s.tvShare, 0)} of EV)</small>
          </dd>
        </div>
        <div>
          <dt>Enterprise value</dt>
          <dd>{mm(s.ev)}</dd>
        </div>
        <div>
          <dt>Less net debt</dt>
          <dd>−{mm(NET_DEBT)}</dd>
        </div>
        <div>
          <dt>Equity ÷ {SHARES}M shares</dt>
          <dd className={styles.bridgeTotal}>{usd(s.price)}</dd>
        </div>
        <div>
          <dt>vs. $38.40</dt>
          <dd className={upside >= 0 ? styles.textUp : styles.textDown}>
            {upside >= 0 ? "▲ +" : "▼ "}
            {pct(upside)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
