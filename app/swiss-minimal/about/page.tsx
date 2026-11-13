import type { Metadata } from "next";
import { person } from "../data";
import s from "../site.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Maya Chen: MS in Accountancy student at Gies College of Business, UIUC, interested in audit data analytics, process mining and internal controls.",
};

const education = [
  ["2026–27", "MS in Accountancy, Gies College of Business, University of Illinois Urbana-Champaign. Data analytics concentration."],
  ["2021–25", "BS in Accountancy, minor in Statistics. University of Illinois Urbana-Champaign."],
];

const coursework = [
  ["ACCY 593", "Emerging topics in accounting: audit data analytics, process mining, the portfolio Website Project"],
  ["Core", "Data analytics for accountancy (Python, pandas, SQL)"],
  ["Core", "Audit and assurance"],
  ["Elective", "Accounting information systems and internal controls"],
];

const interests = [
  ["01", "Audit data analytics: full-population testing instead of samples, and how to explain it to a reviewer"],
  ["02", "Process mining: comparing the process people describe with the one the system log shows"],
  ["03", "Internal controls: designing controls and dashboards that busy owners will actually use"],
];

const skills = [
  ["Analysis", "Python (pandas, PM4Py), SQL, Excel, Power BI, Tableau"],
  ["Audit", "Journal-entry testing, COSO 2013, walkthroughs, workpaper documentation"],
  ["Design", "Figma, InDesign, HTML and CSS, a soft spot for grids"],
];

export default function AboutPage() {
  return (
    <section className={`${s.wrap} ${s.detailHead}`}>
      <div className={s.grid}>
        <p className={s.eyebrow} style={{ gridColumn: "1 / -1" }}>
          About
        </p>
        <h1 className={s.h1} style={{ gridColumn: "1 / -1", margin: "16px 0 clamp(40px, 5vw, 80px)" }}>
          Accountant by training, analyst by habit<span className={s.red}>.</span>
        </h1>

        <div className={s.aboutPortrait}>
          <img
            className={s.img}
            src="/swiss-minimal/portrait.webp"
            width={1024}
            height={1536}
            alt="Graphic black and white portrait of Maya Chen with a red circle behind her head"
          />
          <p className={s.caption}>Illustrated portrait.</p>
        </div>

        <div className={`${s.aboutText} ${s.body}`}>
          <p className={s.lead} style={{ marginBottom: 32 }}>
            I&apos;m Maya Chen, a Master of Science in Accountancy student at the Gies College of Business,
            University of Illinois Urbana-Champaign.
          </p>
          <p>
            I came into accounting through a part-time job reconciling invoices for a campus café. The work was
            repetitive, but I liked that every number had to agree with another number somewhere else. When I
            took my first audit course, I realised that the interesting part was not the agreeing, it was finding
            out why things did not agree.
          </p>
          <p>
            This year I am taking ACCY 593, where we work with real-sized datasets on journal-entry testing,
            process mining and controls. The projects on this site come mostly from that course and from my own
            experiments after class.
          </p>
          <p>
            Outside of school I shoot black-and-white film, take a wheel-throwing class on Tuesday nights, and
            ride the square-mile grid of Champaign County on weekends. All three reward patience and a bit of
            record-keeping, which is maybe why I enjoy them.
          </p>
          <p>
            I am looking for a full-time audit or risk advisory position starting in 2027, ideally on a team that
            brings data analytics into fieldwork.
          </p>
        </div>

        <div style={{ gridColumn: "1 / -1", height: "clamp(48px, 6vw, 96px)" }} />

        <section className={s.cvBlock}>
          <h2 className={s.h3}>Interests</h2>
          <div>
            <ul className={s.cvList}>
              {interests.map(([a, b]) => (
                <li key={a}>
                  <span className={s.red} style={{ fontWeight: 700 }}>
                    {a}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.cvBlock}>
          <h2 className={s.h3}>Education</h2>
          <div>
            <ul className={s.cvList}>
              {education.map(([a, b]) => (
                <li key={a}>
                  <span>{a}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.cvBlock}>
          <h2 className={s.h3}>Selected coursework</h2>
          <div>
            <ul className={s.cvList}>
              {coursework.map(([a, b]) => (
                <li key={b}>
                  <span>{a}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.cvBlock}>
          <h2 className={s.h3}>Skills</h2>
          <div>
            <ul className={s.cvList}>
              {skills.map(([a, b]) => (
                <li key={a}>
                  <span>{a}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className={s.cvBlock}>
          <h2 className={s.h3}>Contact</h2>
          <div>
            <p style={{ marginTop: 0 }}>The fastest way to reach me is email. I reply within a day.</p>
            <a className={s.contactBig} href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <p style={{ marginTop: 24 }}>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                LinkedIn →
              </a>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
