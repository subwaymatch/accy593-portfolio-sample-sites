"use client";

import { useEffect, useState } from "react";
import styles from "../site.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
      <nav className={`${styles.wrap} ${styles.navInner}`} aria-label="Main">
        <a href="#top" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark} aria-hidden="true">
            MJ
          </span>
          Marcus Johnson
        </a>
        <button
          type="button"
          className={`${styles.btn} ${styles.menuButton}`}
          aria-expanded={open}
          aria-controls="nb-nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <ul id="nb-nav-links" className={styles.navLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <a className={styles.navLink} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
