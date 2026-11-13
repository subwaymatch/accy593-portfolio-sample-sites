"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./site.module.css";

const links = [
  { href: "/swiss-minimal", label: "Index", n: "A" },
  { href: "/swiss-minimal/work", label: "Work", n: "B" },
  { href: "/swiss-minimal/about", label: "About", n: "C" },
];

export default function SiteNav() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/swiss-minimal" ? pathname === href || pathname === `${href}/` : pathname.startsWith(href);

  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href="/swiss-minimal" className={s.brand}>
          <span className={s.brandName}>Maya Chen</span>
          <span className={s.brandSub}>Accountancy / Audit Analytics</span>
        </Link>
        <button
          type="button"
          className={s.menuButton}
          aria-expanded={open}
          aria-controls="sm-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="sm-nav" aria-label="Main" className={`${s.nav} ${open ? s.navOpen : ""}`}>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={isActive(l.href) ? s.navActive : undefined} aria-current={isActive(l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="mailto:maya.chen@example.com">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
