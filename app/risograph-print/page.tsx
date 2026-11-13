import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "./_components/WorkCard";
import { work } from "./data";
import styles from "./riso.module.css";

export const metadata: Metadata = {
  title: "Liam Okafor · Accountancy, sports finance & analytics",
  description:
    "Liam Okafor is an MS in Accountancy student at Gies College of Business (UIUC) who models club finances, ticket pricing and sponsorship returns.",
};

const business = work.filter((w) => w.group === "business");
const personal = work.filter((w) => w.group === "personal");

export default function RisoHome() {
  return (
    <>
      <section className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.prose}>
          <p className={styles.eyebrow}>MS Accountancy · Gies · Class of 2027</p>
          <h1 className={`${styles.misreg} ${styles.heroTitle}`}>
            Liam
            <br />
            Okafor
          </h1>
          <p className={styles.lede}>
            I like the part of sport that happens in spreadsheets: what a seat is worth on a cold
            Tuesday, whether a club can afford its scoreboard, and what a sponsor really gets for
            their money.
          </p>
          <p className={styles.muted}>
            I am a Master of Science in Accountancy student at the University of Illinois
            Urbana-Champaign, taking ACCY 593 this fall. This is where I keep the work.
          </p>
          <div className={styles.btnRow}>
            <Link className={styles.btn} href="/risograph-print/work">
              See the work
            </Link>
            <Link className={`${styles.btn} ${styles.btnGhost}`} href="/risograph-print/about">
              About me
            </Link>
          </div>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.heroFrame}>
            <img
              src="/risograph-print/hero.webp"
              alt="Risograph illustration of a desk with an open ledger of bar charts, a calculator, a basketball, a soccer ball, a guitar and a coffee mug."
              width={1200}
              height={800}
            />
          </div>
          <div className={styles.stamp} aria-hidden="true">
            Ten
            <br />
            prints
            <br />
            inside
          </div>
        </div>
      </section>

      <div className={styles.band}>
        <p className={`${styles.bandInner}`}>
          <span>Ticket pricing</span>
          <span>Club finance</span>
          <span>Three-statement models</span>
          <span>Break-even</span>
          <span>Sponsorship ROI</span>
        </p>
      </div>

      <section className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2 className={`${styles.misreg} ${styles.h2}`}>Business & analytics</h2>
          <Link href="/risograph-print/work" className={styles.mono}>
            All work →
          </Link>
        </div>
        <div className={`${styles.grid} ${styles.gridFeature}`}>
          {business.map((item, i) => (
            <WorkCard key={item.slug} item={item} eager={i < 2} />
          ))}
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2 className={`${styles.misreg} ${styles.misregTeal} ${styles.h2}`}>Off the clock</h2>
        </div>
        <div className={`${styles.grid} ${styles.gridFeature}`}>
          {personal.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.now}>
          <div className={styles.nowIntro}>
            <h2 className={`${styles.misreg} ${styles.h2}`}>Right now</h2>
            <p>
              Fall 2026, second floor of the Business Instructional Facility, usually with a spreadsheet open and a
              basketball game on mute.
            </p>
          </div>
          <dl className={styles.nowList}>
            <div>
              <dt>Taking</dt>
              <dd>ACCY 593, data analytics for accountants, valuation, audit.</dd>
            </div>
            <div>
              <dt>Building</dt>
              <dd>A second version of the club model with a monthly cash forecast.</dd>
            </div>
            <div>
              <dt>Looking for</dt>
              <dd>Full-time FP&amp;A, advisory or sports finance roles from summer 2027.</dd>
            </div>
          </dl>
          <div className={styles.nowCta}>
            <a className={styles.btn} href="mailto:liam.okafor@example.com">
              Email me
            </a>
            <a
              className={`${styles.btn} ${styles.btnGhost}`}
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
