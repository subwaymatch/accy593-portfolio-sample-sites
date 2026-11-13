"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../site.module.css";
import { work, type Category, type WorkItem } from "../data";
import WorkDetail from "./WorkDetail";

type Filter = "all" | Category;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "business", label: "Business" },
  { value: "creative", label: "Creative" },
];

export default function WorkSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const visible = filter === "all" ? work : work.filter((w) => w.category === filter);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, [selected]);

  const open = (item: WorkItem, el: HTMLElement) => {
    triggerRef.current = el;
    setSelected(item);
  };

  const handleClose = () => {
    document.documentElement.style.overflow = "";
    setSelected(null);
    // Return focus to the card that opened the dialog.
    triggerRef.current?.focus();
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

        <ul className={styles.grid} role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {visible.map((item) => (
            <li key={item.id} style={{ display: "flex" }}>
              <article className={styles.card} style={{ width: "100%" }}>
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
                      onClick={(e) => open(item, e.currentTarget)}
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
                <p className={styles.dialogMeta} style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
                  {selected.category === "business" ? "Business" : "Creative"} · {selected.kind}
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
              <WorkDetail item={selected} />
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
