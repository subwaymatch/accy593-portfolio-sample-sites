"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./work.module.css";

export type WorkTile = {
  id: string;
  title: string;
  kind: "business" | "personal";
  tag: string;
  summary: string;
  size: "wide" | "single";
  image?: { src: string; alt: string };
  teaser?: ReactNode;
  tools: string[];
  body: ReactNode;
};

const HASH_PREFIX = "#work/";

type Filter = "all" | "business" | "personal";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "business", label: "Business & analytics" },
  { id: "personal", label: "Personal" },
];

export default function WorkGallery({ items }: { items: WorkTile[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? items : items.filter((i) => i.kind === filter);
  const active = items.find((i) => i.id === activeId) ?? null;

  const open = useCallback(
    (id: string) => {
      if (!items.some((i) => i.id === id)) return;
      setActiveId(id);
      if (window.location.hash !== HASH_PREFIX + id) {
        history.replaceState(null, "", HASH_PREFIX + id);
      }
    },
    [items],
  );

  // Open from a deep link (#work/<id>) on load and whenever the hash changes,
  // which is how the featured tile in the bento grid opens its write-up.
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash;
      if (h.startsWith(HASH_PREFIX)) open(h.slice(HASH_PREFIX.length));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
    if (active) {
      d.scrollTop = 0;
      // Land focus on the article itself so screen readers start at the title
      // and the close button doesn't show a focus ring for mouse users.
      articleRef.current?.focus({ preventScroll: true });
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev;
      };
    }
  }, [active]);

  function onClose() {
    setActiveId(null);
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count = f.id === "all" ? items.length : items.filter((i) => i.kind === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              className={styles.filterBtn}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>
      <ul className={styles.grid}>
        {shown.map((item) => (
          <li key={item.id} className={styles.cell} data-size={item.size}>
            <button
              type="button"
              className={styles.tile}
              data-kind={item.kind}
              aria-haspopup="dialog"
              onClick={() => open(item.id)}
            >
              <span className={styles.media}>
                {item.image ? (
                  <img src={item.image.src} alt={item.image.alt} width={1200} height={800} loading="lazy" />
                ) : (
                  <span className={styles.teaser}>{item.teaser}</span>
                )}
              </span>
              <span className={styles.tileText}>
                <span className={styles.tag}>{item.tag}</span>
                <span className={styles.tileTitle}>{item.title}</span>
                <span className={styles.tileSummary}>{item.summary}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="bm-dialog-title"
        onClose={onClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {active ? (
          <article className={styles.detail} ref={articleRef} tabIndex={-1}>
            <header className={styles.detailHead}>
              <div>
                <p className={styles.tag}>{active.tag}</p>
                <h3 id="bm-dialog-title" className={styles.detailTitle}>
                  {active.title}
                </h3>
              </div>
              <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()} aria-label="Close">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </header>
            <div className={styles.detailBody}>
              <p className={styles.lede}>{active.summary}</p>
              {active.body}
              <p className={styles.tools}>
                <span>Tools</span>
                {active.tools.map((t) => (
                  <span key={t} className={styles.toolChip}>
                    {t}
                  </span>
                ))}
              </p>
            </div>
          </article>
        ) : null}
      </dialog>
    </>
  );
}
