"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";
import { BASE, PERSON } from "../_data/works";

const LINKS = [
  { href: BASE, label: "Home", n: "00" },
  { href: `${BASE}/work`, label: "Work", n: "01" },
  { href: `${BASE}/about`, label: "About", n: "02" },
];

export default function Nav() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the overlay whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === BASE ? pathname === BASE || pathname === `${BASE}/` : pathname.startsWith(href);

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
        <div className={styles.bar}>
          <Link href={BASE} className={styles.brand} aria-label="Grace Nguyen, home">
            <span className={styles.brandName}>Grace Nguyen</span>
            <span className={styles.brandRule} aria-hidden="true" />
            <span className={styles.brandTag}>Accountancy &amp; Image</span>
          </Link>
  
          <nav aria-label="Main" className={styles.desktopNav}>
            <ul>
              {LINKS.slice(1).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={isActive(l.href) ? styles.active : undefined}
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${PERSON.email}`}>Contact</a>
              </li>
            </ul>
          </nav>
  
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="gn-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
            <span className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        id="gn-menu"
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ol className={styles.overlayList}>
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  <span className={styles.overlayNo}>{l.n}</span>
                  <span className={styles.overlayLabel}>{l.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.overlayFoot}>
          <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
          <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
