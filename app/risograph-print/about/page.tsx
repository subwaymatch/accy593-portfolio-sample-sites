import type { Metadata } from "next";
import styles from "../riso.module.css";
import a from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Liam Okafor: MS in Accountancy student at Gies College of Business, interested in sports business analytics, club finances and financial modelling.",
};

const skills = [
  "Excel modelling (three-statement, scenario tables)",
  "Python with pandas for cleaning and analysis",
  "SQL for pulling and joining data",
  "Tableau and Power BI dashboards",
  "Cost-volume-profit and contribution analysis",
  "Writing short memos people actually read",
];

export default function AboutPage() {
  return (
    <div className={styles.wrap}>
      <section className={a.intro}>
        <div className={a.portraitWrap}>
          <img
            className={a.portrait}
            src="/risograph-print/portrait.webp"
            alt="Risograph-style illustrated portrait of Liam Okafor smiling, wearing a blue crewneck over a yellow collared shirt."
            width={1024}
            height={1536}
          />
        </div>
        <div className={a.prose}>
          <p className={styles.eyebrow}>About</p>
          <h1 className={`${styles.misreg} ${a.title}`}>Hi, I&apos;m Liam.</h1>
          <p className={styles.lede}>
            I&apos;m in the one-year Master of Science in Accountancy program at Gies College of
            Business, University of Illinois Urbana-Champaign, after a finance undergrad here.
          </p>
          <p>
            I got into accounting sideways. In my second year I became treasurer of my club soccer
            team and discovered that our entire budget lived in one person&apos;s head. Building
            the team a simple ledger, and then a cash forecast for our spring tournament trip, was
            the first time numbers felt like they were telling a story about real people.
          </p>
          <p>
            Since then I have been drawn to the business side of sport: how clubs at every level
            pay their bills, why some tickets are underpriced and others go unsold, and what
            sponsors are really buying. This semester I&apos;m taking ACCY 593, and this site is
            part of that course.
          </p>
        </div>
      </section>

      <section className={a.columns}>
        <div className={a.panel}>
          <h2 className={a.panelTitle}>Studying</h2>
          <ul className={a.list}>
            <li>
              <strong>MS in Accountancy</strong>, Gies College of Business, UIUC. Expected May 2027.
            </li>
            <li>
              <strong>BS in Finance</strong>, Gies College of Business, UIUC. May 2026.
            </li>
            <li>This fall: ACCY 593, plus courses in data analytics for accountants, valuation and audit.</li>
          </ul>
        </div>
        <div className={a.panel}>
          <h2 className={a.panelTitle}>Interested in</h2>
          <ul className={a.list}>
            <li>Sports business analytics: pricing, attendance and fan data.</li>
            <li>Club finances, from minor-league soccer to college athletics budgets.</li>
            <li>Financial modelling that a non-finance person can follow.</li>
          </ul>
        </div>
        <div className={a.panel}>
          <h2 className={a.panelTitle}>Good at</h2>
          <ul className={a.list}>
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className={`${a.contact} ${a.prose}`}>
        <h2 className={`${styles.misreg} ${a.contactTitle}`}>Say hello</h2>
        <p>
          I&apos;m looking for full-time roles starting summer 2027 in FP&amp;A, advisory or
          finance at a sports or entertainment organisation. If you are hiring, or just want to talk
          about ticket pricing, email is the best way to reach me.
        </p>
        <div className={styles.btnRow}>
          <a className={styles.btn} href="mailto:liam.okafor@example.com">
            liam.okafor@example.com
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
      </section>
    </div>
  );
}
