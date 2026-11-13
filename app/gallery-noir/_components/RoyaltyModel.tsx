"use client";

import { useId, useMemo, useState } from "react";
import m from "./RoyaltyModel.module.css";

/* Assumptions for the fictional Maison Verrier (EUR millions). */
const BASE_REVENUE = 420; // FY2025 actual
const GROWTH = [0.07, 0.06, 0.05, 0.04, 0.035]; // FY2026 to FY2030
const TERMINAL_G = 0.025;
const TAX = 0.25;
const TAB_LIFE = 15; // tax amortisation period, years
const DEFAULT_ROYALTY = 9;
const DEFAULT_DISCOUNT = 11;

type Result = {
  rows: { year: number; revenue: number; savings: number; factor: number; pv: number }[];
  pvExplicit: number;
  pvTerminal: number;
  tab: number;
  value: number;
};

function valueBrand(royaltyPct: number, discountPct: number): Result {
  const r = royaltyPct / 100;
  const d = discountPct / 100;
  let revenue = BASE_REVENUE;
  const rows = GROWTH.map((g, i) => {
    revenue = revenue * (1 + g);
    const savings = revenue * r * (1 - TAX);
    const factor = 1 / Math.pow(1 + d, i + 1);
    return { year: 2026 + i, revenue, savings, factor, pv: savings * factor };
  });
  const pvExplicit = rows.reduce((a, x) => a + x.pv, 0);
  const last = rows[rows.length - 1];
  const terminal = (last.savings * (1 + TERMINAL_G)) / (d - TERMINAL_G);
  const pvTerminal = terminal * last.factor;
  let annuity = 0;
  for (let t = 1; t <= TAB_LIFE; t++) annuity += 1 / Math.pow(1 + d, t);
  const tabFactor = 1 / (1 - (TAX / TAB_LIFE) * annuity);
  const preTab = pvExplicit + pvTerminal;
  const value = preTab * tabFactor;
  return { rows, pvExplicit, pvTerminal, tab: value - preTab, value };
}

const eur = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function RoyaltyModel() {
  const [royalty, setRoyalty] = useState(DEFAULT_ROYALTY);
  const [discount, setDiscount] = useState(DEFAULT_DISCOUNT);
  const rid = useId();
  const did = useId();

  const res = useMemo(() => valueBrand(royalty, discount), [royalty, discount]);
  const base = useMemo(() => valueBrand(DEFAULT_ROYALTY, DEFAULT_DISCOUNT), []);
  const change = res.value / base.value - 1;

  const sens = useMemo(() => {
    const rs = [royalty - 2, royalty, royalty + 2].filter((x) => x >= 2);
    const ds = [discount - 1, discount, discount + 1];
    return { rs, ds };
  }, [royalty, discount]);

  const parts = [
    { key: "explicit", label: "Royalties saved, 2026 to 2030", v: res.pvExplicit, cls: m.segA },
    { key: "terminal", label: "Royalties saved after 2030", v: res.pvTerminal, cls: m.segB },
    { key: "tab", label: "Tax amortisation benefit", v: res.tab, cls: m.segC },
  ];

  return (
    <div className={m.model}>
      <div className={m.head}>
        <p className={m.kicker}>Interactive model</p>
        <h2 className={m.title}>What is the name worth?</h2>
        <p className={m.note}>
          Revenue forecast, tax rate (25%) and long-term growth (2.5%) are fixed. Move the two judgement calls.
        </p>
      </div>

      <div className={m.grid}>
        <div className={m.controls}>
          <div className={m.control}>
            <div className={m.controlTop}>
              <label htmlFor={rid}>Royalty rate</label>
              <output htmlFor={rid} className={m.controlValue}>
                {royalty.toFixed(1)}%
              </output>
            </div>
            <input
              id={rid}
              type="range"
              min={4}
              max={15}
              step={0.5}
              value={royalty}
              onChange={(e) => setRoyalty(Number(e.target.value))}
              className={m.range}
              aria-describedby={`${rid}-help`}
            />
            <p id={`${rid}-help`} className={m.help}>
              Share of revenue a licensee would pay to use the Verrier name. Base case 9%.
            </p>
          </div>

          <div className={m.control}>
            <div className={m.controlTop}>
              <label htmlFor={did}>Discount rate</label>
              <output htmlFor={did} className={m.controlValue}>
                {discount.toFixed(1)}%
              </output>
            </div>
            <input
              id={did}
              type="range"
              min={8}
              max={16}
              step={0.5}
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className={m.range}
              aria-describedby={`${did}-help`}
            />
            <p id={`${did}-help`} className={m.help}>
              Required return for the brand: company WACC of about 9% plus a premium for brand risk. Base case 11%.
            </p>
          </div>

          <button
            type="button"
            className={m.reset}
            onClick={() => {
              setRoyalty(DEFAULT_ROYALTY);
              setDiscount(DEFAULT_DISCOUNT);
            }}
            disabled={royalty === DEFAULT_ROYALTY && discount === DEFAULT_DISCOUNT}
          >
            Reset to base case
          </button>
        </div>

        <div className={m.result} aria-live="polite">
          <p className={m.kicker}>Brand value</p>
          <p className={m.big}>
            €{eur(res.value)}
            <span className={m.unit}>m</span>
          </p>
          <p className={m.sub}>
            {(res.value / BASE_REVENUE).toFixed(2)}× FY2025 revenue
            {Math.abs(change) > 0.0005 && (
              <>
                {" · "}
                <span className={m.delta}>
                  {change > 0 ? "+" : "−"}
                  {Math.abs(change * 100).toFixed(1)}% vs base case
                </span>
              </>
            )}
          </p>

          <div className={m.stack} role="img" aria-label="Composition of brand value">
            {parts.map((p) => (
              <span
                key={p.key}
                className={`${m.seg} ${p.cls}`}
                style={{ flexGrow: Math.max(p.v, 0) }}
                title={`${p.label}: €${eur(p.v)}m`}
              />
            ))}
          </div>
          <ul className={m.legend}>
            {parts.map((p) => (
              <li key={p.key}>
                <span className={`${m.swatch} ${p.cls}`} aria-hidden="true" />
                <span className={m.legendLabel}>{p.label}</span>
                <span className={m.legendValue}>€{eur(p.v)}m</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={m.tables}>
        <div className={m.tableWrap}>
          <table className={m.table}>
            <caption>Forecast royalty savings (€m, end-of-year discounting)</caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Revenue</th>
                <th scope="col">After-tax royalty</th>
                <th scope="col">Discount factor</th>
                <th scope="col">Present value</th>
              </tr>
            </thead>
            <tbody>
              {res.rows.map((r) => (
                <tr key={r.year}>
                  <th scope="row">{r.year}</th>
                  <td>{eur(r.revenue, 1)}</td>
                  <td>{eur(r.savings, 1)}</td>
                  <td>{r.factor.toFixed(3)}</td>
                  <td>{eur(r.pv, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={m.tableWrap}>
          <table className={`${m.table} ${m.sens}`}>
            <caption>Sensitivity: brand value (€m)</caption>
            <thead>
              <tr>
                <th scope="col">Royalty ↓ / Discount →</th>
                {sens.ds.map((d) => (
                  <th scope="col" key={d}>
                    {d.toFixed(1)}%
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sens.rs.map((r) => (
                <tr key={r}>
                  <th scope="row">{r.toFixed(1)}%</th>
                  {sens.ds.map((d) => (
                    <td key={d} className={r === royalty && d === discount ? m.current : undefined}>
                      {eur(valueBrand(r, d).value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
