"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Img } from "../_data/works";
import g from "./SeriesGallery.module.css";

export default function SeriesGallery({ images, title }: { images: Img[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const n = images.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + n) % n)),
    [n],
  );

  const close = useCallback(() => {
    setIndex(null);
    triggerRefs.current[lastOpened.current]?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, close]);

  const current = index !== null ? images[index] : null;

  return (
    <div className={g.series}>
      <p className={g.hint}>
        {n} photographs · select any image to view it full screen. Use the arrow keys or swipe to move through
        the series.
      </p>
      <ul className={g.grid}>
        {images.map((img, i) => {
          const portrait = img.height > img.width;
          return (
            <li key={img.src} className={`${g.cell} ${i === 0 ? g.lead : ""} ${portrait ? g.portrait : ""}`} data-reveal>
              <button
                type="button"
                className={g.thumbBtn}
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                onClick={() => {
                  lastOpened.current = i;
                  setIndex(i);
                }}
                aria-label={`Open photograph ${i + 1} of ${n}: ${img.caption ?? img.alt}`}
              >
                <img src={img.src} width={img.width} height={img.height} alt={img.alt} loading="lazy" />
              </button>
              {img.caption && (
                <p className={g.cap}>
                  <span className={g.capNo}>{String(i + 1).padStart(2, "0")}</span>
                  {img.caption}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {current && index !== null && (
        <div
          className={g.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, photograph ${index + 1} of ${n}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className={g.top}>
            <span className={g.counter}>
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button ref={closeRef} type="button" className={g.close} onClick={close}>
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div
            className={g.stage}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onTouchStart={(e) => {
              const t = e.touches[0];
              touchStart.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchEnd={(e) => {
              const s = touchStart.current;
              touchStart.current = null;
              if (!s) return;
              const t = e.changedTouches[0];
              const dx = t.clientX - s.x;
              const dy = t.clientY - s.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
              else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
            }}
          >
            <img
              key={current.src}
              className={g.full}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
            />
          </div>

          <div className={g.bottom}>
            <button type="button" className={g.nav} onClick={() => go(-1)} aria-label="Previous photograph">
              <span aria-hidden="true">←</span>
            </button>
            <p className={g.lbCap}>{current.caption ?? current.alt}</p>
            <button type="button" className={g.nav} onClick={() => go(1)} aria-label="Next photograph">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
