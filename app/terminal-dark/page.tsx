import type { Metadata } from "next";
import styles from "./terminal.module.css";
import Explorer from "./_components/Explorer";
import WorkBrowser from "./_components/WorkBrowser";
import { person, workItems } from "./data";

export const metadata: Metadata = {
  title: "Dev Patel | Accounting data, SQL and Python",
  description:
    "Dev Patel is an MS in Accountancy (Data Analytics) student at Gies College of Business, UIUC, working on accounting data engineering, SQL and Python automation of the close.",
};

function Prompt({ cmd, typed = false }: { cmd: string; typed?: boolean }) {
  return (
    <p className={styles.prompt}>
      <span className={styles.promptUser}>dev@portfolio</span>:<span className={styles.promptPath}>~</span>${" "}
      {typed ? (
        <>
          <span className={styles.typed} style={{ ["--n" as string]: cmd.length }}>
            {cmd}
          </span>
          <span className={styles.cursor} aria-hidden="true" />
        </>
      ) : (
        cmd
      )}
    </p>
  );
}

function Window({ file, children, className }: { file: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.window} ${className ?? ""}`}>
      <div className={styles.titlebar}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.titleText}>{file}</span>
      </div>
      {children}
    </div>
  );
}

export default function TerminalDarkPage() {
  const business = workItems.filter((w) => w.category === "business").length;
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={styles.shell}>
        <Explorer />
        <main id="main" className={styles.main}>
          {/* ---------------- about ---------------- */}
          <section id="about" className={styles.section} aria-labelledby="about-title">
            <Prompt cmd="cat about.md" typed />
            <div className={`${styles.aboutGrid} ${styles.reveal}`}>
              <div>
                <h1 id="about-title" className={styles.name}>
                  Dev Patel<span className={styles.nameAccent}>_</span>
                </h1>
                <p className={styles.tagline}>
                  Accounting student who would rather fix the pipeline than re-key the numbers.
                </p>
                <div className={styles.bio}>
                  <p>
                    I&apos;m in the MS in Accountancy program (Data Analytics track) at the Gies College of Business,
                    University of Illinois Urbana-Champaign. I came in from an accounting undergrad with a computer
                    science minor, and I&apos;ve ended up most interested in the plumbing of accounting: where the
                    numbers come from, how they move between systems, and why a reconciliation that takes a full day
                    usually needs only about an hour of real judgment.
                  </p>
                  <p>
                    Most of my work happens in SQL and Python. This semester I&apos;m in ACCY 593, where I&apos;m
                    building this site and learning to work with a coding agent without handing it my judgment. Outside
                    class I build small hardware projects, make music I won&apos;t release, and keep a pothos alive
                    with an Arduino.
                  </p>
                </div>
                <Window file="profile.yml" className={styles.facts}>
                  <dl className={styles.factsBody}>
                    <dt>program</dt>
                    <dd>MS Accountancy, Data Analytics track</dd>
                    <dt>school</dt>
                    <dd>Gies College of Business, UIUC</dd>
                    <dt>course</dt>
                    <dd>ACCY 593</dd>
                    <dt>focus</dt>
                    <dd>accounting data engineering, SQL, close automation</dd>
                    <dt>tools</dt>
                    <dd>Python, pandas, PostgreSQL, Tableau, Excel, git</dd>
                    <dt>status</dt>
                    <dd>
                      <span className={styles.good}>●</span> open to 2027 full-time roles
                    </dd>
                  </dl>
                </Window>
                <div className={styles.ctaRow}>
                  <a className={`${styles.btn} ${styles.btnSolid}`} href={`mailto:${person.email}`}>
                    ✉ {person.email}
                  </a>
                  <a className={styles.btn} href={person.linkedin} target="_blank" rel="noopener noreferrer">
                    in/ LinkedIn ↗
                  </a>
                  <a className={`${styles.btn} ${styles.btnAmber}`} href="#work">
                    ls work/ ↓
                  </a>
                </div>
              </div>
              <Window file="portrait.webp" className={styles.portrait}>
                <img
                  src="/terminal-dark/portrait.webp"
                  alt="Stylised green line-art portrait of Dev Patel, smiling, in a dark sweater"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                />
                <div className={styles.portraitCaption}>// rendered, not photographed</div>
              </Window>
            </div>
          </section>

          {/* ---------------- work ---------------- */}
          <section id="work" className={styles.section} aria-labelledby="work-title">
            <Prompt cmd="ls -l work/" />
            <h2 id="work-title" className={styles.sectionHeading}>
              work<span>/</span>
            </h2>
            <p className={styles.sectionLede}>
              <strong>
                {workItems.length} projects: {business} on accounting and analytics, {workItems.length - business} I made
                for fun.
              </strong>{" "}
              Open any of them for the details: code, charts, sample data and what I&apos;d do differently.
            </p>
            <WorkBrowser />
          </section>

          {/* ---------------- contact ---------------- */}
          <section id="contact" className={styles.section} aria-labelledby="contact-title">
            <Prompt cmd="./contact.sh" />
            <Window file="contact.sh: output">
              <div className={styles.contactBody}>
                <div>
                  <h2 id="contact-title" className={styles.sectionHeading}>
                    let&apos;s talk<span>_</span>
                  </h2>
                  <p className={styles.contactNote}>
                    I&apos;m looking for full-time roles starting in 2027 in accounting data engineering, finance
                    systems, or technology-focused advisory. I&apos;m also happy to compare notes with anyone who has
                    opinions about automating the close.
                  </p>
                  <ul className={styles.contactList}>
                    <li>
                      <span className={styles.contactKey}>email</span>
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </li>
                    <li>
                      <span className={styles.contactKey}>linkedin</span>
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                        linkedin.com ↗
                      </a>
                    </li>
                    <li>
                      <span className={styles.contactKey}>based in</span>
                      <span>Champaign, IL</span>
                    </li>
                    <li>
                      <span className={styles.contactKey}>replies</span>
                      <span>usually within a day</span>
                    </li>
                  </ul>
                  <a className={`${styles.btn} ${styles.btnSolid}`} href={`mailto:${person.email}`}>
                    $ mail dev.patel ↵
                  </a>
                </div>
                <div className={styles.nowBox}>
                  <p className={styles.prompt}>
                    <span className={styles.promptPath}>$</span> cat now.txt
                  </p>
                  <ul>
                    <li>Finishing the AP aging write-up for ACCY 593</li>
                    <li>Rebuilding my bank rec matcher as a dbt model on a sample GL, to see what SQL does better</li>
                    <li>Reading about continuous close and how much of it is real</li>
                    <li>Re-lubing two scratchy switches I rushed the first time</li>
                  </ul>
                </div>
              </div>
            </Window>
          </section>

          <footer className={styles.footer}>
            <a href="/">← All sample sites</a>
            <span>Dev Patel is a fictional student. Sample site for ACCY 593.</span>
          </footer>
        </main>
      </div>
    </>
  );
}
