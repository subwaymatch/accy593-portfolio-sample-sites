"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../site.module.css";
import { work, type Category, type WorkItem } from "../data";
import WorkDetail from "./WorkDetail";

type Filter = "all" | Category;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "business", label: "Business" },
  { value: "creative", label: "Creative" },
];

const HASH_PREFIX = "#work/";

/** Replace the URL hash without scrolling or adding a history entry. */
function setHash(hash: string) {
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}${hash}`);
}

export default function WorkSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedRef = useRef<WorkItem | null>(null);
  selectedRef.current = selected;

  const visible = filter === "all" ? work : work.filter((w) => w.category === filter);
  const index = selected ? visible.findIndex((w) => w.id === selected.id) : -1;
  const prev = index > 0 ? visible[index - 1] : null;
  const next = index >= 0 && index < visible.length - 1 ? visible[index + 1] : null;

  const show = useCallback((item: WorkItem) => {
    setSelected(item);
    setHash(`${HASH_PREFIX}${item.id}`);
    dialogRef.current?.scrollTo({ top: 0 });
  }, []);

  // Open the dialog whenever an item is selected.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, [selected]);

  // Deep links: /neo-brutalist#work/<id> opens that project.
  useEffect(() => {
    const fromHash = () => {
      const { hash } = window.location;
      if (!hash.startsWith(HASH_PREFIX)) return;
      const item = work.find((w) => w.id === hash.slice(HASH_PREFIX.length));
      if (item) setSelected(item);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const handleClose = () => {
    document.documentElement.style.overflow = "";
    const last = selectedRef.current;
    setSelected(null);
    setHash("#work");
    // Return focus to the card of the project that was open last.
    if (last) {
      const btn = document.querySelector<HTMLButtonElement>(`[data-work-id="${last.id}"]`);
      btn?.focus({ preventScroll: false });
    }
  };

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionNum}>02</span>
            <h2 id="work-title" className={styles.sectionTitle}>
              Work
            </h2>
            <p className={styles.sectionIntro}>
              Six business projects (analytics, pricing, branding, a website) and five things I make for fun. Open any
              card to see the full write-up and the work itself.
            </p>
          </div>
          <div className={styles.filters} role="group" aria-label="Filter work by category">
            {filters.map((f) => {
              const n = f.value === "all" ? work.length : work.filter((w) => w.category === f.value).length;
              return (
                <button
                  key={f.value}
                  type="button"
                  className={`${styles.btn} ${styles.filterBtn}`}
                  aria-pressed={filter === f.value}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                  <span className={styles.count}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {filter === "all" ? "" : filter} projects
        </p>

        <ul className={styles.grid} role="list">
          {visible.map((item) => (
            <li key={item.id} className={styles.gridItem}>
              <article className={styles.card}>
                <div className={`${styles.cardMedia} ${styles[`bg-${item.color}`]}`}>
                  {item.image ? (
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      style={item.image.position ? { objectPosition: item.image.position } : undefined}
                    />
                  ) : (
                    <div className={styles.postThumb} aria-hidden="true">
                      +75¢
                      <br />
                      oat milk?
                    </div>
                  )}
                  <span className={styles.cardKind}>{item.kind}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>
                    <button
                      type="button"
                      className={styles.cardButton}
                      aria-haspopup="dialog"
                      data-work-id={item.id}
                      onClick={() => show(item)}
                    >
                      {item.title}
                    </button>
                  </h3>
                  <p className={styles.cardSummary}>{item.summary}</p>
                  <span className={styles.cardMore} aria-hidden="true">
                    Open project →
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="nb-dialog-title"
        onClose={handleClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {selected && (
          <>
            <div className={`${styles.dialogHead} ${styles[`bg-${selected.color}`]}`}>
              <div>
                <p className={styles.dialogMeta}>
                  {selected.category === "business" ? "Business" : "Creative"} · {selected.kind}
                  {index >= 0 && (
                    <span className={styles.dialogCount}>
                      {" "}
                      · {index + 1} of {visible.length}
                    </span>
                  )}
                </p>
                <h2 id="nb-dialog-title" className={styles.dialogTitle}>
                  {selected.title}
                </h2>
              </div>
              <button
                type="button"
                className={`${styles.btn} ${styles.closeBtn}`}
                onClick={() => dialogRef.current?.close()}
                autoFocus
              >
                <span className={styles.closeLabel}>Close</span> <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className={styles.dialogBody}>
              {/* key resets demo state (calculator inputs, drum loop) when moving between projects */}
              <WorkDetail key={selected.id} item={selected} />
              {(prev || next) && (
                <nav className={styles.pager} aria-label="Other projects">
                  {prev ? (
                    <button type="button" className={`${styles.btn} ${styles.btnWhite}`} onClick={() => show(prev)}>
                      <span aria-hidden="true">←</span>
                      <span className={styles.pagerText}>
                        <small>Previous</small>
                        {prev.title}
                      </span>
                    </button>
                  ) : null}
                  {next && (
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.pagerNext}`}
                      onClick={() => show(next)}
                    >
                      <span className={styles.pagerText}>
                        <small>Next</small>
                        {next.title}
                      </span>
                      <span aria-hidden="true">→</span>
                    </button>
                  )}
                </nav>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
