"use client";

import { useId, useState } from "react";
import styles from "../site.module.css";
import demo from "./demo.module.css";
import type { WorkItem } from "../data";

type Hood = "Downtown Champaign" | "West Urbana" | "Savoy" | "Southwest Champaign";
const hoods: Hood[] = ["Downtown Champaign", "West Urbana", "Savoy", "Southwest Champaign"];

/** SAMPLE LISTINGS: invented for the prototype. Not real homes. */
const listings: { type: string; hood: Hood; beds: number; baths: number; price: number; rent: number; bus: number }[] = [
  { type: "Brick bungalow", hood: "West Urbana", beds: 3, baths: 1.5, price: 214900, rent: 1650, bus: 12 },
  { type: "Foursquare with porch", hood: "Downtown Champaign", beds: 4, baths: 2, price: 289000, rent: 2100, bus: 15 },
  { type: "Ranch", hood: "Savoy", beds: 3, baths: 2, price: 245500, rent: 1800, bus: 24 },
  { type: "Townhouse", hood: "Southwest Champaign", beds: 2, baths: 2.5, price: 178000, rent: 1450, bus: 20 },
  { type: "Cottage", hood: "West Urbana", beds: 2, baths: 1, price: 159900, rent: 1300, bus: 9 },
  { type: "New build", hood: "Savoy", beds: 4, baths: 3, price: 339000, rent: 2350, bus: 27 },
  { type: "Loft condo", hood: "Downtown Champaign", beds: 1, baths: 1, price: 134500, rent: 1150, bus: 14 },
  { type: "Split-level", hood: "Southwest Champaign", beds: 3, baths: 2, price: 262000, rent: 1900, bus: 22 },
];

// Assumptions for the rent-vs-buy line: 10% down, 6.5% 30-year fixed,
// 2.3% property tax, $110/month insurance.
function monthlyOwn(price: number) {
  const loan = price * 0.9;
  const r = 0.065 / 12;
  const pi = (loan * r) / (1 - Math.pow(1 + r, -360));
  return pi + (price * 0.023) / 12 + 110;
}

const money = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function HomeFinder({ image }: { image: WorkItem["image"] }) {
  const [hood, setHood] = useState<Hood | "All">("All");
  const [max, setMax] = useState(350000);
  const maxId = useId();
  const shown = listings.filter((l) => (hood === "All" || l.hood === hood) && l.price <= max);

  return (
    <div className={demo.stack}>
      {image && (
        <figure className={styles.figure}>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
          <figcaption>Homepage concept: neighbourhood first, listings second.</figcaption>
        </figure>
      )}
      <div className={styles.panel}>
        <p className={styles.sampleNote}>Working prototype slice · sample listings, not real homes</p>
        <div className={demo.homeControls}>
          <div className={demo.chips} role="group" aria-label="Neighbourhood">
            {(["All", ...hoods] as const).map((h) => (
              <button
                key={h}
                type="button"
                className={demo.chip}
                aria-pressed={hood === h}
                onClick={() => setHood(h)}
              >
                {h}
              </button>
            ))}
          </div>
          <label htmlFor={maxId} className={demo.field}>
            <span>
              Max price: <strong>{money(max)}</strong>
            </span>
            <input
              id={maxId}
              type="range"
              min={125000}
              max={350000}
              step={5000}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className={demo.range}
            />
          </label>
        </div>
        <p aria-live="polite" className={demo.fine}>
          {shown.length} of {listings.length} homes
        </p>
        <ul className={demo.listings}>
          {shown.map((l) => {
            const own = monthlyOwn(l.price);
            const cheaper = own < l.rent;
            return (
              <li key={`${l.type}-${l.hood}`} className={demo.listing}>
                <p className={demo.listPrice}>{money(l.price)}</p>
                <p>
                  <strong>{l.type}</strong> · {l.beds} bd / {l.baths} ba
                </p>
                <p className={demo.fine}>
                  {l.hood} · {l.bus} min to the Quad by bus
                </p>
                <p className={`${demo.rentLine} ${cheaper ? demo.rentGood : demo.rentBad}`}>
                  Own ≈ {money(own)}/mo vs rent ≈ {money(l.rent)}/mo
                </p>
              </li>
            );
          })}
        </ul>
        {shown.length === 0 && <p>No homes match. Try raising the max price.</p>}
        <p className={demo.fine}>
          Ownership estimate: 10% down, 6.5% 30-year fixed, 2.3% property tax, $110/month insurance. Ignores
          maintenance and equity, which is exactly the conversation the real site would start.
        </p>
      </div>
    </div>
  );
}
