"use client";

import { useEffect, useState } from "react";
import s from "../pastel.module.css";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** Sticky glass nav that marks the section currently in view. */
export default function SiteNav() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200) setCurrent(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={s.navWrap}>
      <nav className={s.nav} aria-label="Main">
        <a href="#top" className={s.brand}>
          <span className={s.monogram} aria-hidden="true">
            SR
          </span>
          <span>
            Sofia<span className={s.brandLast}> Ramírez</span>
          </span>
        </a>
        <ul className={s.navLinks}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} aria-current={current === l.id ? "location" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
