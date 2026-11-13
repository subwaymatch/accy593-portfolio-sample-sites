"use client";

import { useMemo, useState } from "react";
import s from "./showcase.module.css";

type Town = "Champaign" | "Urbana" | "Savoy";

// SAMPLE LISTINGS: invented records for the project. Not real homes; no addresses on purpose.
const listings: {
  id: number;
  town: Town;
  area: string;
  style: string;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  built: number;
  dom: number;
}[] = [
  { id: 1, town: "Champaign", area: "Near Clark Park", style: "Brick bungalow", beds: 2, baths: 1, sqft: 1080, price: 189_900, built: 1938, dom: 9 },
  { id: 2, town: "Champaign", area: "Garden Hills", style: "Ranch", beds: 3, baths: 1, sqft: 1150, price: 154_500, built: 1957, dom: 21 },
  { id: 3, town: "Champaign", area: "Cherry Hills", style: "Split-level", beds: 4, baths: 2, sqft: 1890, price: 289_000, built: 1972, dom: 14 },
  { id: 4, town: "Champaign", area: "Near downtown", style: "Two-storey foursquare", beds: 3, baths: 2, sqft: 1640, price: 248_000, built: 1915, dom: 6 },
  { id: 5, town: "Urbana", area: "West Urbana", style: "Craftsman", beds: 3, baths: 2, sqft: 1720, price: 265_000, built: 1924, dom: 11 },
  { id: 6, town: "Urbana", area: "East Urbana", style: "Cottage", beds: 2, baths: 1, sqft: 940, price: 129_900, built: 1948, dom: 33 },
  { id: 7, town: "Urbana", area: "Near Meadowbrook Park", style: "Ranch", beds: 3, baths: 2, sqft: 1480, price: 219_500, built: 1968, dom: 17 },
  { id: 8, town: "Savoy", area: "South Savoy", style: "New-build townhome", beds: 3, baths: 2.5, sqft: 1760, price: 299_900, built: 2021, dom: 25 },
  { id: 9, town: "Savoy", area: "Near the golf course", style: "Two-storey", beds: 4, baths: 2.5, sqft: 2380, price: 364_000, built: 2006, dom: 19 },
];

const towns: ("All" | Town)[] = ["All", "Champaign", "Urbana", "Savoy"];
const caps = [Infinity, 300_000, 250_000, 200_000];
const capLabel = (c: number) => (c === Infinity ? "Any price" : `Under $${c / 1000}k`);
const ink: Record<Town, string> = { Champaign: "#2449c8", Urbana: "#00877d", Savoy: "#ff6a3d" };

const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const a = [...xs].sort((p, q) => p - q);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

export default function HomeSalesMock() {
  const [town, setTown] = useState<"All" | Town>("All");
  const [cap, setCap] = useState<number>(Infinity);

  const shown = useMemo(
    () => listings.filter((l) => (town === "All" || l.town === town) && l.price < cap),
    [town, cap],
  );
  const medPrice = median(shown.map((l) => l.price));
  const medPsf = median(shown.map((l) => l.price / l.sqft));
  const medDom = median(shown.map((l) => l.dom));

  return (
    <div className={s.stack}>
      <div className={s.browser}>
        <div className={s.browserBar} aria-hidden="true">
          <span />
          <span />
          <span />
          <p>CU First Home · Listings</p>
        </div>
        <div className={s.browserBody}>
          <div className={s.filters}>
            <div role="group" aria-label="Town" className={s.chips}>
              {towns.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={town === t}
                  className={`${s.chip} ${town === t ? s.chipOn : ""}`}
                  onClick={() => setTown(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <label className={s.selectLabel}>
              Budget
              <select value={String(cap)} onChange={(e) => setCap(Number(e.target.value))}>
                {caps.map((c) => (
                  <option key={c} value={String(c)}>
                    {capLabel(c)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={s.summary} aria-live="polite">
            <div>
              <span className={s.summaryNum}>{shown.length}</span> homes
            </div>
            <div>
              <span className={s.summaryNum}>{shown.length ? `$${Math.round(medPrice / 1000)}k` : "–"}</span> median
              price
            </div>
            <div>
              <span className={s.summaryNum}>{shown.length ? `$${Math.round(medPsf)}` : "–"}</span> per sq ft
            </div>
            <div>
              <span className={s.summaryNum}>{shown.length ? medDom : "–"}</span> median days listed
            </div>
          </div>

          {shown.length === 0 ? (
            <p className={s.empty}>Nothing in this sample under that budget. Try Urbana, or raise the budget.</p>
          ) : (
            <ul className={s.listings}>
              {shown.map((l) => (
                <li key={l.id} className={s.listing}>
                  <div className={s.listingTop} style={{ background: ink[l.town] }}>
                    <span>{l.town}</span>
                    <span>{l.dom}d</span>
                  </div>
                  <p className={s.listingPrice}>${l.price.toLocaleString("en-US")}</p>
                  <p className={s.listingStyle}>
                    {l.style}, {l.area}
                  </p>
                  <p className={s.listingMeta}>
                    {l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString("en-US")} sq ft · built {l.built}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <p className={s.caption}>Sample listings written for this project. Not real homes or prices.</p>
        </div>
      </div>

      <div className={s.memo}>
        <h3 className={s.memoTitle}>How the site is organised</h3>
        <ol className={s.memoList}>
          <li>
            <strong>Neighbourhoods.</strong> One short card per area: walkability, typical age of house, which bus lines
            run past.
          </li>
          <li>
            <strong>Listings.</strong> The page above. Median price per square foot is the number I wanted buyers to
            notice first, because it makes a small old bungalow and a big new townhome comparable.
          </li>
          <li>
            <strong>Mortgage math.</strong> Monthly payment with property tax included, since Champaign County taxes
            surprise almost everyone who moves here from out of state.
          </li>
          <li>
            <strong>Buying timeline.</strong> What happens between offer and keys, written for someone who has only
            ever signed a lease.
          </li>
        </ol>
      </div>
    </div>
  );
}
