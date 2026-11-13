import type { Metadata } from "next";
import s from "./pastel.module.css";
import WorkGallery from "./components/WorkGallery";

export const metadata: Metadata = {
  title: "Sofia Ramírez · Tax, nonprofits and financial literacy",
  description:
    "Portfolio of Sofia Ramírez, MS in Taxation student at Gies College of Business (UIUC): VITA analytics, a deduction estimator, Form 990 analysis, bilingual financial-literacy design and personal projects.",
};

const EMAIL = "sofia.ramirez@example.com";

export default function PastelGlassPage() {
  return (
    <>
      <a href="#main" className={s.skip}>
        Skip to content
      </a>
      <header className={s.navWrap}>
        <nav className={s.nav} aria-label="Main">
          <a href="#top" className={s.brand}>
            <span className={s.monogram} aria-hidden="true">
              SR
            </span>
            Sofia Ramírez
          </a>
          <ul className={s.navLinks}>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main" className={s.main}>
        <section id="top" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroText}>
            <p className={s.eyebrow}>MS in Taxation · Gies College of Business · UIUC</p>
            <h1 id="hero-title" className={s.heroTitle}>
              Hola, I&apos;m Sofia. I help tax make sense, <span className={s.accent}>in two languages.</span>
            </h1>
            <p className={s.heroLead}>
              I study individual and nonprofit tax, volunteer as a VITA preparer, and spend a lot of time turning confusing
              forms into something people can actually follow. This is my work from ACCY 593 and beyond.
            </p>
            <div className={s.heroCtas}>
              <a href="#work" className={s.btnPrimary}>
                See my work
              </a>
              <a href={`mailto:${EMAIL}`} className={s.btnGhost}>
                Email me
              </a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroOrb}>
              <img
                src="/pastel-glass/hero.png"
                width={760}
                height={760}
                alt="Clay illustration of a calculator, coins, a report with a pie chart, a pothos plant and a ball of yarn"
                className={s.heroImg}
              />
            </div>
            <span className={`${s.chipFloat} ${s.chipA}`}>2 VITA seasons</span>
            <span className={`${s.chipFloat} ${s.chipB}`}>English · Español</span>
            <span className={`${s.chipFloat} ${s.chipC}`}>ACCY 593 · Fall 2026</span>
          </div>
        </section>

        <section id="about" className={s.section} aria-labelledby="about-title">
          <div className={`${s.glass} ${s.about}`}>
            <img
              src="/pastel-glass/portrait.webp"
              width={1024}
              height={1536}
              alt="Watercolor-style illustrated portrait of Sofia smiling with a mug, wearing a lavender cardigan"
              className={s.portrait}
              loading="lazy"
            />
            <div className={s.aboutText}>
              <p className={s.eyebrow}>About</p>
              <h2 id="about-title" className={s.h2}>
                Tax nerd, translator, occasional knitter.
              </h2>
              <p>
                I grew up in a bilingual household in the Chicago suburbs, where I was the family&apos;s unofficial reader of
                anything that arrived in an envelope with a government seal. That turned into an accounting degree, and now
                into a Master of Science in Taxation at the University of Illinois Urbana-Champaign.
              </p>
              <p>
                My favourite part of tax is the part where it meets people: a family figuring out whether they qualify for
                the Earned Income Tax Credit, or a small nonprofit trying to read its own Form 990. I volunteer with a campus
                VITA site, where I prepare returns in English and Spanish and help train new volunteers.
              </p>
              <dl className={s.facts}>
                <div>
                  <dt>Studying</dt>
                  <dd>MS in Taxation, Gies College of Business, expected May 2027</dd>
                </div>
                <div>
                  <dt>Interests</dt>
                  <dd>Individual tax, exempt organisations, financial literacy, VITA</dd>
                </div>
                <div>
                  <dt>This term</dt>
                  <dd>ACCY 593, plus quality review shifts at VITA</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>English and Spanish (fluent)</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="work" className={s.section} aria-labelledby="work-title">
          <div className={s.sectionHead}>
            <p className={s.eyebrow}>Work</p>
            <h2 id="work-title" className={s.h2}>
              Things I&apos;ve analysed, designed and made
            </h2>
            <p className={s.sectionLead}>
              Six business and tax pieces, including two you can interact with, and five things I made for fun. Filter by
              tag, then open any card for the full story.
            </p>
          </div>
          <WorkGallery />
        </section>

        <section id="contact" className={s.section} aria-labelledby="contact-title">
          <div className={`${s.glass} ${s.contact}`}>
            <p className={s.eyebrow}>Contact</p>
            <h2 id="contact-title" className={s.h2}>
              Let&apos;s talk about tax season.
            </h2>
            <p className={s.contactLead}>
              I&apos;m looking for full-time roles in individual or exempt-organisation tax starting after graduation in May
              2027. I&apos;m happy to talk about VITA, nonprofit reporting, or bilingual client work.
            </p>
            <div className={s.contactLinks}>
              <a href={`mailto:${EMAIL}`} className={s.btnPrimary}>
                {EMAIL}
              </a>
              <a href="https://www.linkedin.com/" className={s.btnGhost} rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p>Sofia Ramírez is a fictional student. This is a sample portfolio for ACCY 593.</p>
        <a href="/" className={s.hubLink}>
          ← All sample sites
        </a>
      </footer>
    </>
  );
}
