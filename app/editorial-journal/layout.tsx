import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import Nav from "./components/Nav";
import { issue, person } from "./data";
import s from "./journal.module.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--ej-display",
});

const text = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--ej-text",
});

export const metadata: Metadata = {
  title: { default: "The Footnote | Olivia Brooks", template: "%s | The Footnote" },
  description:
    "The Footnote: essays, analysis and side projects by Olivia Brooks, MS in Accountancy student at the University of Illinois Urbana-Champaign.",
};

export default function JournalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${text.variable} ${s.root}`}>
      <a href="#ej-main" className={s.skip}>
        Skip to content
      </a>
      <header className={s.masthead}>
        <div className={s.dateline}>
          <span>
            {issue.volume} &middot; {issue.number}
          </span>
          <span className={s.datelineMid}>{issue.place}</span>
          <span>{issue.date} Edition</span>
        </div>
        <Link href="/editorial-journal" className={s.nameplate}>
          {issue.paper}
        </Link>
        <p className={s.motto}>
          Accounting, fraud and other true stories &middot; written and edited by {person.name}
        </p>
        <Nav />
      </header>

      <main id="ej-main" className={s.main}>
        {children}
      </main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div>
            <p className={s.footerPaper}>{issue.paper}</p>
            <p className={s.footerNote}>
              {person.name} &middot; {person.program}, {person.school}
            </p>
          </div>
          <div className={s.footerLinks}>
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <Link href="/editorial-journal/about">About the editor</Link>
          </div>
        </div>
        <div className={s.footerBase}>
          <span>A fictional sample portfolio. Illustrations generated with GPT Image.</span>
          <Link href="/" className={s.hubLink}>
            &larr; All sample sites
          </Link>
        </div>
      </footer>
    </div>
  );
}
