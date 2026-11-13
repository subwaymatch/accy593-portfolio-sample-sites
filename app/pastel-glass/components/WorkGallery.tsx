"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TAGS, WORK, type Tag, type WorkItem } from "../data";
import g from "./gallery.module.css";
import WaitTimeChart from "./WaitTimeChart";
import DeductionEstimator from "./DeductionEstimator";
import Form990Compare from "./Form990Compare";
import PaycheckInfographic from "./PaycheckInfographic";
import ListingsPreview from "./ListingsPreview";
import { BlogPost, PropagationLog, SimpleNote, StoryExcerpt } from "./Extras";

function Detail({ id }: { id: string }) {
  switch (id) {
    case "vita-wait-times":
      return <WaitTimeChart />;
    case "deduction-estimator":
      return <DeductionEstimator />;
    case "form-990-ratios":
      return <Form990Compare />;
    case "first-paycheck-infographic":
      return <PaycheckInfographic />;
    case "cu-home-sales-site":
      return <ListingsPreview />;
    case "forty-returns":
      return <BlogPost />;
    case "propagation-log":
      return <PropagationLog />;
    case "lucias-moon":
      return <StoryExcerpt />;
    case "watercolor-botanicals":
      return (
        <SimpleNote>
          <p>
            Painting is the one thing I do that has no right answer, which is probably why I like it during tax season. I
            keep each study small (about 6 × 9 inches) so I can finish one in a sitting and not overwork it. The coneflower
            was painted from a photo I took at Meadowbrook Park in Urbana.
          </p>
        </SimpleNote>
      );
    case "sage-cardigan":
      return (
        <SimpleNote>
          <p>
            Top-down raglans are friendly to beginners because you can try them on as you go. I tried this one on roughly
            every other evening, which is how I caught that the sleeves were going to be short before it was too late. Total
            yarn: six skeins, about 1,150 yards.
          </p>
        </SimpleNote>
      );
    case "sunday-conchas":
      return (
        <SimpleNote>
          <p>
            Baking is a lot like a tax return: change one input at a time or you never learn what fixed it. My notebook has a
            column for each batch and a short verdict. Batch three, &ldquo;tops cracked, bottoms burnt&rdquo;, is how I found
            out the oven runs about 20 degrees hot.
          </p>
        </SimpleNote>
      );
    default:
      return null;
  }
}

export default function WorkGallery() {
  const [filter, setFilter] = useState<Tag | "All">("All");
  const [open, setOpen] = useState<WorkItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const items = filter === "All" ? WORK : WORK.filter((w) => w.tags.includes(filter));

  const show = useCallback((item: WorkItem) => {
    setOpen(item);
    // Shareable link to the open piece, without adding history entries.
    window.history.replaceState(null, "", `#work/${item.id}`);
  }, []);

  const openItem = (item: WorkItem, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    show(item);
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Open a piece straight from a link such as /pastel-glass#work/deduction-estimator
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#work\/([\w-]+)$/);
      const item = m && WORK.find((w) => w.id === m[1]);
      if (item) {
        lastTrigger.current = document.querySelector<HTMLElement>(`[data-work-id="${item.id}"]`);
        setOpen(item);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg || !open) return;
    if (!dlg.open) {
      dlg.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    dlg.scrollTop = 0;
  }, [open]);

  const onDialogClose = () => {
    document.documentElement.style.overflow = "";
    setOpen(null);
    window.history.replaceState(null, "", "#work");
    lastTrigger.current?.focus();
  };

  // Previous / next within the current filter, wrapping around.
  const index = open ? items.findIndex((w) => w.id === open.id) : -1;
  const step = (dir: 1 | -1) => {
    if (index < 0 || items.length < 2) return;
    const next = items[(index + dir + items.length) % items.length];
    lastTrigger.current = document.querySelector<HTMLElement>(`[data-work-id="${next.id}"]`);
    show(next);
  };
  const prevItem = index >= 0 ? items[(index - 1 + items.length) % items.length] : null;
  const nextItem = index >= 0 ? items[(index + 1) % items.length] : null;

  const onDialogKey = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <>
      <div className={g.filters} role="group" aria-label="Filter work by tag">
        {(["All", ...TAGS] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={g.chip}
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <p className={g.count} aria-live="polite">
        Showing {items.length} of {WORK.length} pieces{filter !== "All" ? ` tagged ${filter}` : ""}
      </p>

      <ul className={g.masonry}>
        {items.map((item, i) => (
          <li key={item.id} className={g.cell}>
            <button
              type="button"
              className={g.card}
              data-work-id={item.id}
              onClick={(e) => openItem(item, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className={`${g.media} ${g[item.tint]} ${item.image.transparent ? g.mediaIcon : ""}`}>
                <img
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt={item.image.alt}
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </span>
              <span className={g.cardBody}>
                <span className={g.kind} data-kind={item.kind}>
                  {item.kind}
                </span>
                <span className={g.cardTitle}>{item.title}</span>
                <span className={g.cardSummary}>{item.summary}</span>
                <span className={g.tagRow}>
                  {item.tags.map((t) => (
                    <span key={t} className={g.tag}>
                      {t}
                    </span>
                  ))}
                </span>
                <span className={g.more}>Open details</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={g.dialog}
        aria-labelledby="pg-modal-title"
        onClose={onDialogClose}
        onKeyDown={onDialogKey}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {open && (
          <div className={g.sheet}>
            <button type="button" className={g.close} onClick={close} aria-label="Close details">
              ×
            </button>
            <header className={g.sheetHead}>
              <div>
                <p className={g.sheetMeta}>
                  <span className={g.kind} data-kind={open.kind}>
                    {open.kind}
                  </span>
                  {open.when}
                </p>
                <h3 id="pg-modal-title" className={g.sheetTitle}>
                  {open.title}
                </h3>
                <p className={g.sheetSummary}>{open.summary}</p>
              </div>
              {open.image.transparent && (
                <img className={g.sheetIcon} src={open.image.src} width={open.image.width} height={open.image.height} alt="" />
              )}
            </header>

            {!open.image.transparent && (
              <img
                className={g.sheetImage}
                src={open.image.src}
                width={open.image.width}
                height={open.image.height}
                alt={open.image.alt}
              />
            )}

            <section className={g.role} aria-label="What I did">
              <h4>What I did</h4>
              <ul>
                {open.role.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>

            <div className={g.detail}>
              <Detail id={open.id} />
            </div>

            <div className={g.tagRow}>
              {open.tags.map((t) => (
                <span key={t} className={g.tag}>
                  {t}
                </span>
              ))}
            </div>

            {prevItem && nextItem && items.length > 1 && (
              <nav className={g.pager} aria-label="More work">
                <button type="button" className={g.pagerBtn} onClick={() => step(-1)}>
                  <span className={g.pagerDir}>← Previous</span>
                  <span className={g.pagerTitle}>{prevItem.title}</span>
                </button>
                <span className={g.pagerCount}>
                  {index + 1} / {items.length}
                </span>
                <button type="button" className={`${g.pagerBtn} ${g.pagerNext}`} onClick={() => step(1)}>
                  <span className={g.pagerDir}>Next →</span>
                  <span className={g.pagerTitle}>{nextItem.title}</span>
                </button>
              </nav>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
