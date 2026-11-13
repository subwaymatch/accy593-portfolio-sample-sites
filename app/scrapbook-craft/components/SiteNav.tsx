"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import s from "../scrapbook.module.css";

const links = [
  { href: "/scrapbook-craft", label: "The board" },
  { href: "/scrapbook-craft/about", label: "About me" },
  { href: "/scrapbook-craft/work/carbon-cost-per-meal", label: "Try the calculator" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <Link href="/scrapbook-craft" className={s.brand}>
          <span className={s.brandName}>Emma Larsen</span>
          <span className={s.brandSub}>accountancy · sustainability · handmade</span>
        </Link>
        <button
          type="button"
          className={s.menuButton}
          aria-expanded={open}
          aria-controls="sb-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={s.menuIcon} aria-hidden="true" />
          {open ? "Close" : "Menu"}
        </button>
        <nav id="sb-nav" aria-label="Main" className={`${s.nav} ${open ? s.navOpen : ""}`}>
          <ul>
            {links.map((l) => {
              const active = l.href === "/scrapbook-craft" ? pathname === l.href : pathname?.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link href={l.href} className={active ? s.navActive : undefined} aria-current={active ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a href="mailto:emma.larsen@example.com" className={s.navCta}>
                Say hello
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
