"use client";

import { useId, useState } from "react";
import s from "./showcase.module.css";

type Field = {
  key: keyof State;
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  help?: string;
};

type State = {
  price: number;
  variable: number;
  venue: number;
  av: number;
  prizes: number;
  marketing: number;
  sponsor: number;
  expected: number;
  capacity: number;
};

const DEFAULTS: State = {
  price: 12,
  variable: 4.5,
  venue: 400,
  av: 150,
  prizes: 250,
  marketing: 100,
  sponsor: 300,
  expected: 120,
  capacity: 180,
};

const pricing: Field[] = [
  { key: "price", label: "Ticket price", min: 0, max: 40, step: 0.5, prefix: "$" },
  { key: "variable", label: "Cost per guest", min: 0, max: 20, step: 0.5, prefix: "$", help: "pizza, drinks, answer sheets" },
  { key: "expected", label: "Expected turnout", min: 0, max: 400, step: 5 },
  { key: "capacity", label: "Room capacity", min: 20, max: 400, step: 10 },
];

const fixed: Field[] = [
  { key: "venue", label: "Room hire", min: 0, max: 2000, step: 25, prefix: "$" },
  { key: "av", label: "Sound & projector", min: 0, max: 1000, step: 25, prefix: "$" },
  { key: "prizes", label: "Prizes", min: 0, max: 1000, step: 25, prefix: "$" },
  { key: "marketing", label: "Posters & ads", min: 0, max: 1000, step: 25, prefix: "$" },
  { key: "sponsor", label: "Sponsor contribution", min: 0, max: 2000, step: 25, prefix: "$", help: "reduces fixed costs" },
];

const usd = (n: number) =>
  `${n < 0 ? "−" : ""}$${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function BreakEvenCalculator() {
  const [v, setV] = useState<State>(DEFAULTS);
  const id = useId();

  const fixedTotal = v.venue + v.av + v.prizes + v.marketing - v.sponsor;
  const margin = v.price - v.variable;
  const breakEven = margin > 0 ? Math.max(0, Math.ceil(fixedTotal / margin)) : Infinity;
  const turnout = Math.min(v.expected, v.capacity);
  const profit = turnout * margin - fixedTotal;
  const possible = Number.isFinite(breakEven) && breakEven <= v.capacity;

  const update = (key: keyof State, raw: string) => {
    const n = Number(raw);
    setV((prev) => ({ ...prev, [key]: Number.isFinite(n) ? n : 0 }));
  };

  // profit line across 0..capacity
  const W = 520;
  const H = 220;
  const pad = { l: 16, r: 16, t: 18, b: 30 };
  const maxP = Math.max(Math.abs(-fixedTotal), Math.abs(v.capacity * margin - fixedTotal), 1);
  const x = (n: number) => pad.l + ((W - pad.l - pad.r) * n) / Math.max(1, v.capacity);
  const y = (p: number) => pad.t + ((H - pad.t - pad.b) * (maxP - p)) / (2 * maxP);

  const renderField = (f: Field) => (
    <div className={s.field} key={f.key}>
      <label htmlFor={`${id}-${f.key}`}>
        {f.label}
        {f.help && <span className={s.fieldHelp}> ({f.help})</span>}
      </label>
      <div className={s.fieldRow}>
        <input
          type="range"
          min={f.min}
          max={f.max}
          step={f.step}
          value={v[f.key]}
          onChange={(e) => update(f.key, e.target.value)}
          aria-label={`${f.label} slider`}
        />
        <span className={s.numBox}>
          {f.prefix && <span aria-hidden="true">{f.prefix}</span>}
          <input
            id={`${id}-${f.key}`}
            type="number"
            inputMode="decimal"
            min={f.min}
            max={f.max}
            step={f.step}
            value={v[f.key]}
            onChange={(e) => update(f.key, e.target.value)}
          />
        </span>
      </div>
    </div>
  );

  return (
    <div className={s.calc}>
      <div className={s.calcInputs}>
        <fieldset className={s.fieldset}>
          <legend>Price, cost & turnout</legend>
          {pricing.map(renderField)}
        </fieldset>
        <fieldset className={s.fieldset}>
          <legend>Fixed costs</legend>
          {fixed.map(renderField)}
        </fieldset>
        <button type="button" className={s.resetBtn} onClick={() => setV(DEFAULTS)}>
          Reset to our plan
        </button>
      </div>

      <div className={s.calcOut} aria-live="polite">
        <div className={s.bigResult}>
          <span className={s.bigLabel}>Break-even</span>
          <span className={s.bigNum}>{Number.isFinite(breakEven) ? `${breakEven} tickets` : "Never"}</span>
          <span className={s.bigSub}>
            {!Number.isFinite(breakEven)
              ? "The ticket price does not cover the cost per guest."
              : possible
                ? `${Math.round((breakEven / v.capacity) * 100)}% of the room has to show up.`
                : "More than the room holds. Raise the price or cut costs."}
          </span>
        </div>
        <dl className={s.resultList}>
          <div>
            <dt>Net fixed costs</dt>
            <dd>{usd(fixedTotal)}</dd>
          </div>
          <div>
            <dt>Contribution per ticket</dt>
            <dd>{margin.toLocaleString("en-US", { style: "currency", currency: "USD" })}</dd>
          </div>
          <div>
            <dt>Result at {turnout} guests</dt>
            <dd className={profit >= 0 ? s.pos : s.neg}>{usd(profit)}</dd>
          </div>
        </dl>
        <svg className={s.calcChart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Profit line from zero to ${v.capacity} guests. Break-even at ${Number.isFinite(breakEven) ? breakEven : "no"} tickets.`}>
          <line x1={pad.l} x2={W - pad.r} y1={y(0)} y2={y(0)} stroke="#1b2250" strokeWidth={2} />
          <line
            x1={x(0)}
            y1={y(-fixedTotal)}
            x2={x(v.capacity)}
            y2={y(v.capacity * margin - fixedTotal)}
            stroke="#ff6a3d"
            strokeWidth={5}
            opacity={0.55}
            transform="translate(3 3)"
          />
          <line
            x1={x(0)}
            y1={y(-fixedTotal)}
            x2={x(v.capacity)}
            y2={y(v.capacity * margin - fixedTotal)}
            stroke="#2449c8"
            strokeWidth={4}
          />
          {possible && (
            <g>
              <line x1={x(breakEven)} x2={x(breakEven)} y1={pad.t} y2={H - pad.b} stroke="#1b2250" strokeDasharray="4 4" />
              <circle cx={x(breakEven)} cy={y(0)} r={7} fill="#ffc61a" stroke="#1b2250" strokeWidth={2} />
            </g>
          )}
          {turnout > 0 && (
            <circle cx={x(turnout)} cy={y(profit)} r={6} fill="#00877d" stroke="#1b2250" strokeWidth={2} />
          )}
          <text x={pad.l} y={H - 8} className={s.axis}>
            0 guests
          </text>
          <text x={W - pad.r} y={H - 8} textAnchor="end" className={s.axis}>
            {v.capacity} (full room)
          </text>
          <text x={W - pad.r} y={y(0) - 8} textAnchor="end" className={s.axisDim}>
            profit = 0
          </text>
        </svg>
        <p className={s.caption}>
          Blue line: profit or loss at each turnout. Yellow dot: break-even. Teal dot: your expected turnout.
        </p>
      </div>
    </div>
  );
}
