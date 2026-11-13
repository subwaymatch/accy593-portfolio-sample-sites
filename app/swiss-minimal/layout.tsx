import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Link from "next/link";
import SiteNav from "./SiteNav";
import { person } from "./data";
import s from "./site.module.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--sm-display",
  display: "swap",
});

const text = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--sm-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maya Chen · Accountancy, Audit Analytics",
    template: "%s · Maya Chen",
  },
  description:
    "Portfolio of Maya Chen, MS in Accountancy student at Gies College of Business, UIUC: audit data analytics, process mining, internal controls, and things made by hand.",
};

export default function SwissLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${s.root} ${display.variable} ${text.variable}`}>
      <a href="#sm-main" className={s.skip}>
        Skip to content
      </a>
      <SiteNav />
      <main id="sm-main" className={s.main}>
        {children}
      </main>
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerGrid}>
            <p className={s.footerName}>{person.name}</p>
            <p className={s.footerCol}>
              {person.program}
              <br />
              Gies College of Business
              <br />
              University of Illinois Urbana-Champaign
            </p>
            <p className={s.footerCol}>
              <a href={`mailto:${person.email}`}>{person.email}</a>
              <br />
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
            <p className={s.footerCol}>
              <Link href="/">← All sample sites</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
