"use client";

import { useMemo, useState } from "react";
import s from "../journal.module.css";

// SAMPLE DATA written to test the layout. Not real sales; no real addresses.
type Sale = { id: string; title: string; area: string; beds: number; baths: number; sqft: number; price: number; dom: number };

const SALES: Sale[] = [
  { id: "S-01", title: "1920s foursquare with deep front porch", area: "West Urbana", beds: 4, baths: 2, sqft: 2150, price: 329000, dom: 9 },
  { id: "S-02", title: "Craftsman bungalow, detached garage", area: "West Urbana", beds: 3, baths: 1.5, sqft: 1420, price: 239500, dom: 14 },
  { id: "S-03", title: "Brick duplex, both units leased", area: "Campustown", beds: 4, baths: 2, sqft: 1880, price: 268000, dom: 31 },
  { id: "S-04", title: "Compact cottage near the bus line", area: "Campustown", beds: 2, baths: 1, sqft: 860, price: 149900, dom: 22 },
  { id: "S-05", title: "Loft condo above a storefront", area: "Downtown Champaign", beds: 2, baths: 2, sqft: 1240, price: 254000, dom: 18 },
  { id: "S-06", title: "Victorian with original woodwork", area: "Downtown Champaign", beds: 3, baths: 2, sqft: 1960, price: 279000, dom: 40 },
  { id: "S-07", title: "Ranch on a cul-de-sac, finished basement", area: "Southwest Champaign", beds: 3, baths: 2, sqft: 1720, price: 262500, dom: 6 },
  { id: "S-08", title: "Two-story with three-car garage", area: "Southwest Champaign", beds: 4, baths: 2.5, sqft: 2640, price: 389000, dom: 12 },
  { id: "S-09", title: "Newer build backing onto a pond", area: "Savoy", beds: 4, baths: 3, sqft: 2480, price: 359900, dom: 8 },
  { id: "S-10", title: "Split-level, updated kitchen", area: "Savoy", beds: 3, baths: 2, sqft: 1590, price: 228000, dom: 27 },
];

const AREAS = ["All areas", ...Array.from(new Set(SALES.map((x) => x.area)))];
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function median(xs: number[]) {
  if (!xs.length) return 0;
  const a = [...xs].sort((p, q) => p - q);
  const mid = Math.floor(a.length / 2);
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
}

export default function HomesDemo() {
  const [area, setArea] = useState(AREAS[0]);
  const [beds, setBeds] = useState(0);
  const [sort, setSort] = useState<"ppsf" | "price" | "dom">("ppsf");

  const shown = useMemo(() => {
    const f = SALES.filter((x) => (area === AREAS[0] || x.area === area) && x.beds >= beds);
    const key = (x: Sale) => (sort === "ppsf" ? x.price / x.sqft : sort === "price" ? x.price : x.dom);
    return f.sort((a, b) => key(a) - key(b));
  }, [area, beds, sort]);

  const medPrice = median(shown.map((x) => x.price));
  const medPpsf = median(shown.map((x) => x.price / x.sqft));

  return (
    <div className={s.demo}>
      <div className={s.demoBar}>
        <span className={s.demoBrand}>Porch &amp; Ledger</span>
        <span className={s.demoTag}>Working demo &middot; sample data</span>
      </div>
      <div className={s.demoControls}>
        <label>
          Area
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label>
          Bedrooms
          <select value={beds} onChange={(e) => setBeds(Number(e.target.value))}>
            <option value={0}>Any</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="ppsf">Price per sq ft</option>
            <option value="price">Price</option>
            <option value="dom">Days on market</option>
          </select>
        </label>
      </div>
      <div className={s.demoSummary} aria-live="polite">
        <div>
          <span className={s.demoStatLabel}>Sales shown</span>
          <span className={s.demoStat}>{shown.length}</span>
        </div>
        <div>
          <span className={s.demoStatLabel}>Median price</span>
          <span className={s.demoStat}>{shown.length ? usd(medPrice) : "n/a"}</span>
        </div>
        <div>
          <span className={s.demoStatLabel}>Median $/sq ft</span>
          <span className={s.demoStat}>{shown.length ? usd(medPpsf) : "n/a"}</span>
        </div>
      </div>
      {shown.length ? (
        <ul className={s.demoList}>
          {shown.map((x) => (
            <li key={x.id} className={s.demoCard}>
              <div className={s.demoPpsf}>
                {usd(x.price / x.sqft)}
                <small>per sq ft</small>
              </div>
              <div className={s.demoInfo}>
                <p className={s.demoTitle}>{x.title}</p>
                <p className={s.demoMeta}>
                  {x.area} &middot; {x.beds} bd &middot; {x.baths} ba &middot; {x.sqft.toLocaleString("en-US")} sq ft
                </p>
              </div>
              <div className={s.demoPrice}>
                {usd(x.price)}
                <small>{x.dom} days on market</small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.demoEmpty}>No sample sales match those filters.</p>
      )}
    </div>
  );
}
