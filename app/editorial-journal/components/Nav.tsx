"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import s from "../journal.module.css";

const links = [
  { href: "/editorial-journal", label: "Front Page" },
  { href: "/editorial-journal#business", label: "Business & Analytics" },
  { href: "/editorial-journal#personal", label: "Off the Clock" },
  { href: "/editorial-journal/about", label: "About" },
  { href: "/editorial-journal/about#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/editorial-journal") return pathname === "/editorial-journal";
    if (href === "/editorial-journal/about") return pathname === "/editorial-journal/about";
    return false;
  };

  return (
    <nav className={s.nav} aria-label="Sections">
      <button
        type="button"
        className={s.navToggle}
        aria-expanded={open}
        aria-controls="ej-nav-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span>Sections</span>
        <span aria-hidden="true" className={s.navToggleIcon}>
          {open ? "✕" : "☰"}
        </span>
      </button>
      <ul id="ej-nav-list" className={`${s.navList} ${open ? s.navOpen : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={isActive(l.href) ? s.navActive : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
