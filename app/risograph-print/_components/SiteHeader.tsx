"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../riso.module.css";

const links = [
  { href: "/risograph-print", label: "Home" },
  { href: "/risograph-print/work", label: "Work" },
  { href: "/risograph-print/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/risograph-print" ? pathname === href : pathname?.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/risograph-print" className={styles.brand}>
          <span className={styles.brandDot} aria-hidden="true" />
          Liam Okafor
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="riso-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="riso-nav" className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.navLink} ${isActive(l.href) ? styles.navActive : ""}`}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <a className={`${styles.navLink} ${styles.navCta}`} href="mailto:liam.okafor@example.com">
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
