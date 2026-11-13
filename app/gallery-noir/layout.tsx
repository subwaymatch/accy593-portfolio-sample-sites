import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Jost } from "next/font/google";
import styles from "./gallery.module.css";
import Nav from "./_components/Nav";
import Motion from "./_components/Motion";
import { BASE, PERSON } from "./_data/works";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--gn-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--gn-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grace Nguyen · Portfolio",
    template: "%s · Grace Nguyen",
  },
  description:
    "Portfolio of Grace Nguyen, MS in Accountancy student at the University of Illinois Urbana-Champaign: brand valuation, financial reporting, design, photography and music.",
};

export default function GalleryNoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.root} ${serif.variable} ${sans.variable}`}>
      <a href="#gn-main" className={styles.skip}>
        Skip to content
      </a>
      <Nav />
      <Motion />
      <main id="gn-main" className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerName}>{PERSON.name}</p>
            <p className={styles.footerMeta}>MS in Accountancy · Gies College of Business · University of Illinois Urbana-Champaign</p>
          </div>
          <ul className={styles.footerLinks}>
            <li>
              <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
            </li>
            <li>
              <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <Link href={`${BASE}/work`}>Exhibition list</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerBase}>
          <Link href="/" className={styles.hubLink}>
            ← All sample sites
          </Link>
          <span>Images generated for this sample site. Grace is a fictional student.</span>
        </div>
      </footer>
    </div>
  );
}
