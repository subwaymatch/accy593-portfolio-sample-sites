import type { Metadata } from "next";
import { Caveat, Fraunces, Lora } from "next/font/google";
import SiteNav from "./components/SiteNav";
import { person } from "./data";
import s from "./scrapbook.module.css";

const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--sb-hand" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "700"], variable: "--sb-display" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--sb-body" });

export const metadata: Metadata = {
  title: { default: "Emma Larsen · Scrapbook Portfolio", template: "%s · Emma Larsen" },
  description:
    "Portfolio of Emma Larsen, MS in Accountancy student at Illinois: sustainability reporting, emissions accounting and handmade things.",
};

export default function ScrapbookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${s.root} ${caveat.variable} ${fraunces.variable} ${lora.variable}`}>
      <a href="#sb-main" className={s.skip}>
        Skip to content
      </a>
      <SiteNav />
      <main id="sb-main" className={s.main}>
        {children}
      </main>
      <footer className={s.footer}>
        <p className={s.footerHand}>made with glue sticks, spreadsheets and too much tea</p>
        <p>
          {person.name} · <a href={`mailto:${person.email}`}>{person.email}</a> ·{" "}
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
        <p className={s.footerSmall}>
          Emma is a fictional student. This is a sample portfolio for ACCY 593; all data on the site is sample data.
        </p>
        <p>
          <a href="/" className={s.hubLink}>
            ← All sample sites
          </a>
        </p>
      </footer>
    </div>
  );
}
