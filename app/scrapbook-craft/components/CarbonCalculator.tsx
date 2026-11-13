"use client";

import { useId, useState } from "react";
import s from "../scrapbook.module.css";
import c from "./chart.module.css";

/** Rounded, illustrative factors in kg CO2e per kg of food (simplified). */
const PROTEINS = {
  beef: { label: "Beef", factor: 60 },
  lamb: { label: "Lamb", factor: 24 },
  pork: { label: "Pork", factor: 7 },
  chicken: { label: "Chicken", factor: 6 },
  fish: { label: "Farmed fish", factor: 5 },
  eggs: { label: "Eggs", factor: 4.5 },
  tofu: { label: "Tofu", factor: 3 },
  beans: { label: "Beans or lentils", factor: 1 },
} as const;

const STARCHES = {
  rice: { label: "Rice", factor: 4 },
  pasta: { label: "Pasta", factor: 1.5 },
  bread: { label: "Bread", factor: 1.4 },
  potatoes: { label: "Potatoes", factor: 0.5 },
} as const;

const VEG_SOURCES = {
  local: { label: "Local and in season", factor: 0.4 },
  trucked: { label: "Trucked from far away", factor: 0.6 },
  greenhouse: { label: "Heated greenhouse", factor: 2.5 },
  air: { label: "Air-freighted", factor: 4 },
} as const;

const CHEESE_FACTOR = 21;
const KG_CO2_PER_MILE = 0.4;

type ProteinKey = keyof typeof PROTEINS;
type StarchKey = keyof typeof STARCHES;
type VegKey = keyof typeof VEG_SOURCES;

export default function CarbonCalculator() {
  const id = useId();
  const [protein, setProtein] = useState<ProteinKey>("chicken");
  const [proteinG, setProteinG] = useState(150);
  const [starch, setStarch] = useState<StarchKey>("rice");
  const [starchG, setStarchG] = useState(150);
  const [veg, setVeg] = useState<VegKey>("local");
  const [vegG, setVegG] = useState(200);
  const [cheeseG, setCheeseG] = useState(0);
  const [price, setPrice] = useState(50);

  const parts = [
    { label: PROTEINS[protein].label, kg: (proteinG / 1000) * PROTEINS[protein].factor },
    { label: STARCHES[starch].label, kg: (starchG / 1000) * STARCHES[starch].factor },
    { label: "Vegetables", kg: (vegG / 1000) * VEG_SOURCES[veg].factor },
    { label: "Cheese", kg: (cheeseG / 1000) * CHEESE_FACTOR },
  ];
  const total = parts.reduce((a, p) => a + p.kg, 0);
  const max = Math.max(...parts.map((p) => p.kg), 0.001);
  const dollars = (total / 1000) * price;
  const miles = total / KG_CO2_PER_MILE;

  return (
    <div className={s.calc}>
      <form onSubmit={(e) => e.preventDefault()} aria-label="Meal ingredients">
        <div className={s.field}>
          <label htmlFor={`${id}-protein`}>Main protein</label>
          <select id={`${id}-protein`} value={protein} onChange={(e) => setProtein(e.target.value as ProteinKey)}>
            {Object.entries(PROTEINS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label} ({v.factor} kg CO2e per kg)
              </option>
            ))}
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-pg`}>Protein portion: {proteinG} g</label>
          <input id={`${id}-pg`} type="range" min={0} max={400} step={10} value={proteinG} onChange={(e) => setProteinG(Number(e.target.value))} />
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-starch`}>Starch</label>
          <select id={`${id}-starch`} value={starch} onChange={(e) => setStarch(e.target.value as StarchKey)}>
            {Object.entries(STARCHES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label} ({v.factor} kg CO2e per kg)
              </option>
            ))}
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-sg`}>Starch portion: {starchG} g</label>
          <input id={`${id}-sg`} type="range" min={0} max={400} step={10} value={starchG} onChange={(e) => setStarchG(Number(e.target.value))} />
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-veg`}>Where the vegetables come from</label>
          <select id={`${id}-veg`} value={veg} onChange={(e) => setVeg(e.target.value as VegKey)}>
            {Object.entries(VEG_SOURCES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label} ({v.factor} kg CO2e per kg)
              </option>
            ))}
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-vg`}>Vegetables: {vegG} g</label>
          <input id={`${id}-vg`} type="range" min={0} max={500} step={10} value={vegG} onChange={(e) => setVegG(Number(e.target.value))} />
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-cg`}>Cheese: {cheeseG} g</label>
          <input id={`${id}-cg`} type="range" min={0} max={100} step={5} value={cheeseG} onChange={(e) => setCheeseG(Number(e.target.value))} />
        </div>
        <div className={s.field}>
          <label htmlFor={`${id}-price`}>Internal carbon price: ${price} per tonne</label>
          <input id={`${id}-price`} type="range" min={0} max={200} step={5} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
      </form>

      <div className={s.result} aria-live="polite">
        <p className={s.hand} style={{ fontSize: "1.4rem", margin: 0 }}>
          this meal is roughly
        </p>
        <p className={s.bigNumber}>{total.toFixed(2)} kg CO2e</p>
        <p style={{ margin: "0 0 0.75rem" }}>
          Carbon cost at ${price}/t: <strong>${dollars.toFixed(3)}</strong> per plate
          <br />
          About the same as driving <strong>{miles.toFixed(1)} miles</strong> in a typical gas car.
        </p>
        <ul className={c.rows} role="list" aria-label="Breakdown by ingredient">
          {parts.map((p) => (
            <li key={p.label} className={c.row} title={`${p.label}: ${p.kg.toFixed(2)} kg CO2e`}>
              <span className={c.label}>{p.label}</span>
              <svg className={c.track} viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                <rect x="0" y="0" width={Math.max((p.kg / max) * 100, 0.5)} height="10" className={c.bar} />
              </svg>
              <span className={c.value}>{p.kg.toFixed(2)} kg</span>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: "0.85rem", margin: "0.9rem 0 0" }}>
          Simplified estimate for learning only. Factors are rounded from published food lifecycle averages and
          ignore cooking energy, packaging and waste.
        </p>
      </div>
    </div>
  );
}
