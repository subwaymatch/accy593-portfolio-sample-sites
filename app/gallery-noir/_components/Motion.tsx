"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Slow fade-in on scroll for any element marked `data-reveal`.
 * Content is fully visible in the server HTML; only elements that start
 * below the fold are hidden (after hydration) and then revealed as they
 * enter the viewport. Nothing is hidden when the reader prefers reduced
 * motion, or in automated browsers that take full-page screenshots.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const automated = typeof navigator !== "undefined" && navigator.webdriver;
    if (reduce || automated || !("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='shown'])"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "shown";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92) continue; // already on screen: leave it alone
      el.dataset.reveal = "hidden";
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
