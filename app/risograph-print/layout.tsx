import type { Metadata } from "next";
import Link from "next/link";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import SiteHeader from "./_components/SiteHeader";
import styles from "./riso.module.css";

const display = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--riso-display" });
const body = Inter({ subsets: ["latin"], variable: "--riso-body" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--riso-mono" });

export const metadata: Metadata = {
  title: {
    default: "Liam Okafor · Accountancy, sports finance & analytics",
    template: "%s · Liam Okafor",
  },
  description:
    "Portfolio of Liam Okafor, MS in Accountancy student at Gies College of Business, University of Illinois Urbana-Champaign.",
};

export default function RisoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${styles.root} ${display.variable} ${body.variable} ${mono.variable}`}>
      <a className={styles.skip} href="#riso-main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="riso-main" className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerName}>Liam Okafor</p>
          <p>
            MS in Accountancy, Gies College of Business, University of Illinois Urbana-Champaign.
          </p>
          <p className={styles.footerLinks}>
            <a href="mailto:liam.okafor@example.com">liam.okafor@example.com</a>
            <a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </p>
          <p className={styles.footerSmall}>
            Printed in four inks: cobalt, orange, sunflower, teal.{" "}
            <Link href="/" className={styles.hubLink}>
              ← All sample sites
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
