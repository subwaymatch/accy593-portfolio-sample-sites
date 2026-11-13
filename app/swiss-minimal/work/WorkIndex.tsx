"use client";

import { useState } from "react";
import WorkRow from "../WorkRow";
import { categories, items, type Category } from "../data";
import s from "../site.module.css";

type Filter = "All" | "Business" | Category;

export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  const options: Filter[] = ["All", "Business", ...categories.filter((c) => items.some((i) => i.category === c))];
  const count = (f: Filter) =>
    f === "All" ? items.length : f === "Business" ? items.filter((i) => i.track === "Business").length : items.filter((i) => i.category === f).length;
  const shown = items.filter((i) =>
    filter === "All" ? true : filter === "Business" ? i.track === "Business" : i.category === filter,
  );

  return (
    <>
      <div className={s.filters} role="group" aria-label="Filter work by category">
        {options.map((f) => (
          <button
            key={f}
            type="button"
            className={s.filterBtn}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === "Business" ? "Business & analytics" : f}
            <span className={s.filterCount}>{count(f)}</span>
          </button>
        ))}
      </div>
      <p className={s.muted} aria-live="polite" style={{ fontSize: 14, margin: "0 0 12px" }}>
        Showing {shown.length} of {items.length}
      </p>
      <ul className={s.list}>
        {shown.map((item) => (
          <WorkRow key={item.slug} item={item} />
        ))}
      </ul>
    </>
  );
}
