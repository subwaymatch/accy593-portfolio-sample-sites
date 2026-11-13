"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../terminal.module.css";
import { workItems, type Category, type WorkItem } from "../data";
import { DETAILS } from "./details";
import { CloseDag } from "./visuals";

const GROUPS: { id: Category; title: string; blurb: string }[] = [
  { id: "business", title: "work/business/", blurb: "accounting, analytics and the systems behind them" },
  { id: "personal", title: "work/personal/", blurb: "hardware, music, code and art I make for fun" },
];

function Chrome({ file }: { file: string }) {
  return (
    <div className={styles.titlebar}>
      <span className={styles.dots} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className={styles.titleText}>{file}</span>
    </div>
  );
}

function Thumb({ item, eager }: { item: WorkItem; eager: boolean }) {
  if (!item.image.src) return <CloseDag label={item.image.alt} compact />;
  return (
    <img
      src={item.image.src}
      alt={item.image.alt}
      width={1200}
      height={800}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={item.image.pixelated ? styles.pixelated : undefined}
    />
  );
}

export default function WorkBrowser() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const index = openSlug ? workItems.findIndex((w) => w.slug === openSlug) : -1;
  const item = index >= 0 ? workItems[index] : null;

  const open = useCallback((slug: string, trigger?: HTMLElement | null) => {
    if (trigger) returnFocus.current = trigger;
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // sync <dialog> with state
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openSlug && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    scrollRef.current?.scrollTo(0, 0);
    if (openSlug && window.location.hash !== `#work/${openSlug}`) {
      history.replaceState(null, "", `#work/${openSlug}`);
    }
  }, [openSlug]);

  // deep link: /terminal-dark#work/<slug>
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#work\/([\w-]+)$/);
      if (m && workItems.some((w) => w.slug === m[1])) {
        // opened from the explorer tree: hand focus back to that link on close
        const a = document.activeElement;
        if (a instanceof HTMLAnchorElement) returnFocus.current = a;
        setOpenSlug(m[1]);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const onClose = () => {
    document.body.style.overflow = "";
    setOpenSlug(null);
    if (window.location.hash.startsWith("#work/")) history.replaceState(null, "", "#work");
    const back =
      returnFocus.current ??
      (openSlug ? document.querySelector<HTMLElement>(`[data-open="${openSlug}"]`) : null);
    back?.focus();
    returnFocus.current = null;
  };

  const go = (delta: number) => {
    const next = workItems[(index + delta + workItems.length) % workItems.length];
    returnFocus.current = document.querySelector<HTMLElement>(`[data-open="${next.slug}"]`);
    setOpenSlug(next.slug);
  };

  const Detail = item ? DETAILS[item.slug] : null;
  const prev = index >= 0 ? workItems[(index - 1 + workItems.length) % workItems.length] : null;
  const next = index >= 0 ? workItems[(index + 1) % workItems.length] : null;

  let n = 0;
  return (
    <>
      {GROUPS.map((g) => (
        <div key={g.id}>
          <div className={styles.groupHead} id={`work-${g.id}`}>
            <h3>{g.title}</h3>
            <p>{g.blurb}</p>
          </div>
          <div className={styles.grid}>
            {workItems
              .filter((w) => w.category === g.id)
              .map((w) => {
                const eager = n++ < 3;
                return (
                  <article key={w.slug} className={`${styles.window} ${styles.card}`}>
                    <Chrome file={w.file} />
                    <div className={styles.thumb}>
                      <Thumb item={w} eager={eager} />
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.cardTitle}>
                        <button
                          type="button"
                          className={styles.cardOpen}
                          data-open={w.slug}
                          aria-haspopup="dialog"
                          onClick={(e) => open(w.slug, e.currentTarget)}
                        >
                          {w.title}
                        </button>
                      </h4>
                      <p className={styles.cardSummary}>{w.summary}</p>
                      <ul className={styles.tags} aria-label="Tools">
                        {w.stack.map((s) => (
                          <li key={s} className={styles.tag}>
                            {s}
                          </li>
                        ))}
                      </ul>
                      <span className={styles.cardHint} aria-hidden="true">
                        $ open {w.file} →
                      </span>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      ))}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="td-dialog-title"
        onClose={onClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) close(); // backdrop click
        }}
      >
        {item && Detail && (
          <>
            <div className={`${styles.titlebar} ${styles.dialogBar}`}>
              <span className={styles.dots} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className={styles.titleText}>
                ~/work/{item.category}/{item.file}
              </span>
              <button type="button" className={styles.closeBtn} onClick={close} autoFocus>
                esc ✕<span className="sr-only"> close details</span>
              </button>
            </div>
            <div className={styles.dialogScroll} ref={scrollRef}>
              <h2 id="td-dialog-title" className={styles.dialogTitle}>
                {item.title}
              </h2>
              <p className={styles.meta}>
                <b>{item.category}</b> · {item.year} · {item.stack.join(", ")}
              </p>
              {item.image.src && item.slug !== "close-dag" && (
                <img
                  className={`${styles.detailImg} ${item.image.pixelated ? styles.pixelated : ""}`}
                  src={item.image.src}
                  alt={item.image.alt}
                  width={1200}
                  height={800}
                />
              )}
              <div className={styles.prose}>
                <Detail />
              </div>
              <nav className={styles.dialogNav} aria-label="More work">
                {prev && (
                  <button type="button" className={styles.btn} onClick={() => go(-1)}>
                    ← {prev.file}
                  </button>
                )}
                {next && (
                  <button type="button" className={styles.btn} onClick={() => go(1)}>
                    {next.file} →
                  </button>
                )}
              </nav>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
