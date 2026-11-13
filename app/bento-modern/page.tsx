import type { Metadata } from "next";
import styles from "./bento.module.css";
import ThemeToggle from "./ThemeToggle";
import LocalClock from "./LocalClock";
import WorkGallery from "./WorkGallery";
import { WORK } from "./work";

export const metadata: Metadata = {
  title: "Arjun Mehta · MS Accountancy, Gies",
  description:
    "Arjun Mehta is an MS in Accountancy student at Gies College of Business, UIUC. Audit tooling, ERP access reviews, data models, an interactive loan calculator and a few things built for fun.",
};

const EMAIL = "arjun.mehta@example.com";

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Audit & accounting", items: ["Internal controls testing", "Walkthrough documentation", "FASB Codification research"] },
  { group: "Data", items: ["Excel + Power Query", "SQL", "Python (pandas)", "Power BI", "Tableau"] },
  { group: "Systems", items: ["SAP S/4HANA (coursework)", "ER modeling", "BPMN", "Figma"] },
];

export default function BentoModernPage() {
  const businessCount = WORK.filter((w) => w.kind === "business").length;

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <a href="#about" className={styles.brand} aria-label="Arjun Mehta, back to top">
          <span className={styles.monogram} aria-hidden="true">
            AM
          </span>
          <span className={styles.brandName}>Arjun Mehta</span>
        </a>
        <nav aria-label="Sections" className={styles.nav}>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </header>

      <main>
        <section id="about" className={styles.bento} aria-label="About Arjun">
          <article className={`${styles.tile} ${styles.about}`}>
            <div className={styles.aboutTop}>
              <img
                src="/bento-modern/portrait.webp"
                alt="Stylised 3D portrait of Arjun: short dark wavy hair, round glasses, navy quarter-zip sweater."
                width={1024}
                height={1024}
                className={styles.portrait}
              />
              <div>
                <p className={styles.eyebrow}>MS in Accountancy · Gies College of Business</p>
                <h1 className={styles.name}>Arjun Mehta</h1>
              </div>
            </div>
            <p className={styles.intro}>
              I&apos;m a graduate student at the University of Illinois Urbana-Champaign, after an undergrad in
              information systems. I like the seam between the ledger and the systems that feed it: who has access
              to what, how audit evidence gets collected, and where a small internal tool can save a team a week of
              tick-and-tie.
            </p>
            <dl className={styles.edu}>
              <div>
                <dt>Now</dt>
                <dd>MS in Accountancy, Gies College of Business, UIUC</dd>
                <dd className={styles.eduWhen}>Expected May 2027</dd>
              </div>
              <div>
                <dt>Before</dt>
                <dd>BS in Information Systems</dd>
                <dd className={styles.eduWhen}>Treasurer, student hiking club</dd>
              </div>
            </dl>
            <ul className={styles.interestList} aria-label="Interests">
              <li>Accounting information systems</li>
              <li>AI in audit</li>
              <li>Small internal tools</li>
            </ul>
          </article>

          <a href="#work/audit-evidence-assistant" className={`${styles.tile} ${styles.featured}`}>
            <img
              src="/bento-modern/audit-assistant.webp"
              alt="Laptop mockup of an invoice-to-PO matching screen with check and warning chips."
              width={1200}
              height={800}
              className={styles.featuredImg}
            />
            <span className={styles.featuredText}>
              <span className={styles.label}>Featured project</span>
              <span className={styles.featuredTitle}>Audit evidence assistant</span>
              <span className={styles.featuredSummary}>
                Vouches invoices to POs and receiving records, then tells you which ones it isn&apos;t sure about.
              </span>
              <span className={styles.featuredCta}>Read the write-up →</span>
            </span>
          </a>

          <article className={`${styles.tile} ${styles.time}`}>
            <p className={styles.label}>Champaign, IL</p>
            <LocalClock />
            <p className={styles.coords}>40.11° N, 88.24° W</p>
          </article>

          <article className={`${styles.tile} ${styles.stats}`} aria-label="At a glance">
            <dl className={styles.statGrid}>
              <div>
                <dt>Projects here</dt>
                <dd>{WORK.length}</dd>
              </div>
              <div>
                <dt>Business & analytics</dt>
                <dd>{businessCount}</dd>
              </div>
              <div>
                <dt>Test invoices matched</dt>
                <dd>214</dd>
              </div>
              <div>
                <dt>Graduating</dt>
                <dd>May &rsquo;27</dd>
              </div>
            </dl>
          </article>

          <article className={`${styles.tile} ${styles.reading}`}>
            <p className={styles.label}>Now reading</p>
            <p className={styles.mediaTitle}>The Phoenix Project</p>
            <p className={styles.mediaBy}>Gene Kim, Kevin Behr &amp; George Spafford</p>
            <p className={styles.label}>On repeat</p>
            <p className={styles.mediaTitle}>Mordechai</p>
            <p className={styles.mediaBy}>Khruangbin</p>
          </article>

          <article className={`${styles.tile} ${styles.skills}`}>
            <p className={styles.label}>Toolkit</p>
            <div className={styles.skillGroups}>
              {SKILLS.map((s) => (
                <div key={s.group}>
                  <h2 className={styles.skillHead}>{s.group}</h2>
                  <ul className={styles.chips}>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className={styles.course}>This term: ACCY 593, plus studying for CPA REG.</p>
          </article>

          <article id="contact" className={`${styles.tile} ${styles.contact}`}>
            <p className={styles.label}>Contact</p>
            <h2 className={styles.contactHead}>Let&apos;s talk audit tooling.</h2>
            <p className={styles.contactText}>
              I&apos;m looking for full-time IT audit or risk advisory roles starting fall 2027. If you are building tools for
              auditors, I would also just like to hear how it is going.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryBtn} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <a className={styles.secondaryBtn} href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </article>
        </section>

        <section id="work" className={styles.workSection} aria-labelledby="work-heading">
          <div className={styles.sectionHead}>
            <h2 id="work-heading" className={styles.sectionTitle}>
              Work
            </h2>
            <p className={styles.sectionNote}>
              {WORK.length} projects. Select any tile to open the full write-up.
            </p>
          </div>
          <WorkGallery items={WORK} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Arjun Mehta is a fictional student. Sample portfolio for ACCY 593.</p>
        <a href="/" className={styles.hubLink}>
          ← All sample sites
        </a>
      </footer>
    </div>
  );
}
