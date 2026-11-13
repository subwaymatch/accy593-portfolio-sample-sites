"use client";

import { useState } from "react";
import d from "./demos.module.css";

type Kind = "Need" | "Want" | "Save";
type Line = { id: number; name: string; amount: number; kind: Kind };

const START: Line[] = [
  { id: 1, name: "Rent, shared apartment", amount: 725, kind: "Need" },
  { id: 2, name: "Groceries", amount: 280, kind: "Need" },
  { id: 3, name: "Utilities and phone", amount: 95, kind: "Need" },
  { id: 4, name: "Bike parts and film", amount: 60, kind: "Want" },
  { id: 5, name: "Eating out", amount: 120, kind: "Want" },
  { id: 6, name: "Emergency fund", amount: 200, kind: "Save" },
];

const TARGET: Record<Kind, number> = { Need: 50, Want: 30, Save: 20 };
const SEG: Record<Kind, string> = { Need: d.segNeeds, Want: d.segWants, Save: d.segSave };
const LABEL: Record<Kind, string> = { Need: "Needs", Want: "Wants", Save: "Savings" };

const usd = (n: number) => (n < 0 ? "−$" : "$") + Math.abs(Math.round(n)).toLocaleString("en-US");

export default function BudgetDemo() {
  const [income, setIncome] = useState(2150);
  const [lines, setLines] = useState<Line[]>(START);
  const [nextId, setNextId] = useState(7);

  const update = (id: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const remove = (id: number) => setLines((ls) => ls.filter((l) => l.id !== id));
  const add = () => {
    setLines((ls) => [...ls, { id: nextId, name: "New category", amount: 0, kind: "Want" }]);
    setNextId((n) => n + 1);
  };

  const total = lines.reduce((sum, l) => sum + (Number.isFinite(l.amount) ? l.amount : 0), 0);
  const left = income - total;
  const byKind = (k: Kind) => lines.filter((l) => l.kind === k).reduce((s, l) => s + (l.amount || 0), 0);
  const base = Math.max(income, total, 1);

  return (
    <div className={d.block}>
      <p className={d.label}>Working demo</p>
      <h3 className={d.title}>Plan a month</h3>
      <div className={d.budget}>
        <div className={d.budgetForm}>
          <label className={d.field}>
            <span>
              <strong>Monthly income</strong>
            </span>
            <input
              className={d.input}
              type="number"
              min={0}
              step={50}
              inputMode="numeric"
              value={Number.isFinite(income) ? income : 0}
              onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
          {lines.map((l) => (
            <div key={l.id} className={d.fieldRow}>
              <input
                className={d.input}
                aria-label="Category name"
                value={l.name}
                onChange={(e) => update(l.id, { name: e.target.value })}
              />
              <select
                className={d.select}
                aria-label={`Type for ${l.name}`}
                value={l.kind}
                onChange={(e) => update(l.id, { kind: e.target.value as Kind })}
              >
                <option value="Need">Need</option>
                <option value="Want">Want</option>
                <option value="Save">Save</option>
              </select>
              <input
                className={d.input}
                type="number"
                min={0}
                step={5}
                inputMode="numeric"
                aria-label={`Amount for ${l.name}`}
                value={l.amount}
                onChange={(e) => update(l.id, { amount: Math.max(0, Number(e.target.value) || 0) })}
              />
              <button type="button" className={d.iconBtn} onClick={() => remove(l.id)} aria-label={`Remove ${l.name}`}>
                ×
              </button>
            </div>
          ))}
          <button type="button" className={d.textBtn} onClick={add}>
            + Add category
          </button>
        </div>

        <div className={d.budgetOut} aria-live="polite">
          <p className={d.label}>Left to assign</p>
          <p className={`${d.remaining} ${left < 0 ? d.negative : ""}`}>{usd(left)}</p>
          <p style={{ margin: 0 }}>
            {usd(total)} of {usd(income)} planned
            {left < 0 ? ". You are over budget." : "."}
          </p>
          <div className={d.stack} role="img" aria-label={`Needs ${usd(byKind("Need"))}, wants ${usd(byKind("Want"))}, savings ${usd(byKind("Save"))}`}>
            {(["Need", "Want", "Save"] as Kind[]).map((k) =>
              byKind(k) > 0 ? <div key={k} className={SEG[k]} style={{ width: `${(byKind(k) / base) * 100}%` }} /> : null,
            )}
          </div>
          <ul className={d.mix}>
            {(["Need", "Want", "Save"] as Kind[]).map((k) => {
              const pct = income > 0 ? Math.round((byKind(k) / income) * 100) : 0;
              return (
                <li key={k}>
                  <span className={`${d.swatch} ${SEG[k]}`} />
                  <span>{LABEL[k]}</span>
                  <span>{usd(byKind(k))}</span>
                  <span style={{ minWidth: 112, textAlign: "right" }}>
                    {pct}% <span style={{ color: "#555" }}>/ {TARGET[k]}% guide</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
