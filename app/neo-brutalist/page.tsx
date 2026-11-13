import type { Metadata } from "next";
import styles from "./site.module.css";
import SiteNav from "./components/SiteNav";
import WorkSection from "./components/WorkSection";

export const metadata: Metadata = {
  title: "Marcus Johnson · Marketing analytics + accountancy portfolio",
  description:
    "Portfolio of Marcus Johnson, MS in Accountancy student at Gies College of Business (UIUC): customer segmentation, pricing, brand strategy for small businesses, plus skate photos, zines and beats.",
};

const ticker = [
  "RFM segments",
  "Price tests",
  "Brand boards",
  "A/B readouts",
  "Skate film",
  "Photocopy zines",
  "Late-night beats",
  "Screen prints",
];

export default function NeoBrutalistHome() {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <section id="top" className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <p className={styles.kicker}>MS Accountancy · Gies College of Business</p>
              <h1 className={styles.heroTitle}>
                I make <span className={styles.nowrapWide}>small-business</span> numbers <span className={styles.highlight}>do marketing.</span>
              </h1>
              <p className={styles.heroLede}>
                I&rsquo;m Marcus Johnson. I study accountancy at the University of Illinois and spend most of my free
                time on the marketing side of the spreadsheet: who buys, what they pay, and why.
              </p>
              <div className={styles.heroActions}>
                <a href="#work" className={styles.btn}>
                  See the work ↓
                </a>
                <a href="#contact" className={`${styles.btn} ${styles.btnWhite}`}>
                  Get in touch
                </a>
              </div>
            </div>
            <div className={styles.heroArt}>
              <img
                src="/neo-brutalist/hero.webp"
                alt="Sticker-style illustration of a coffee cup, a bar chart, a price tag, a skateboard and a cassette tape"
                width={1200}
                height={800}
              />
              <span className={styles.sticker + " " + styles.stickerA}>ACCY 593</span>
              <span className={styles.sticker + " " + styles.stickerB}>Marketing minor</span>
            </div>
          </div>
        </section>

        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((n) => (
              <div key={n} className={styles.marqueeGroup} aria-hidden={n === 1 ? true : undefined}>
                {ticker.map((t) => (
                  <span key={t}>✱ {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="about" className={styles.section} aria-labelledby="about-title">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.sectionNum}>01</span>
                <h2 id="about-title" className={styles.sectionTitle}>
                  About
                </h2>
              </div>
            </div>
            <div className={styles.aboutGrid}>
              <div className={styles.portrait}>
                <img
                  src="/neo-brutalist/portrait.webp"
                  alt="Illustrated portrait of Marcus Johnson in a mint sweatshirt against a yellow circle"
                  width={1024}
                  height={1024}
                  loading="lazy"
                />
              </div>
              <div className={styles.aboutText}>
                <p>
                  I&rsquo;m in the MS in Accountancy program at Gies College of Business at the University of Illinois
                  Urbana-Champaign, and this semester I&rsquo;m taking ACCY 593. As an undergrad I minored in
                  marketing, which is where I figured out that I like accounting most when it explains a customer
                  decision.
                </p>
                <p>
                  The work I enjoy sits where the ledger meets the storefront: segmenting customers for a coffee shop,
                  checking whether a price increase actually paid off, or helping a food truck look like something you
                  would walk across the street for. Most of my projects are for small local businesses, because the
                  owner reads the memo and you find out quickly whether it was useful.
                </p>
                <p>
                  Outside class I skate, shoot film, make beats and print things. Those projects are on this page too,
                  because they taught me about budgets, deadlines and audiences just as much.
                </p>
                <div className={styles.factGrid}>
                  <div className={`${styles.fact} ${styles["bg-yellow"]}`}>
                    <h3>Studying</h3>
                    <p>MS Accountancy, Gies College of Business, UIUC</p>
                  </div>
                  <div className={`${styles.fact} ${styles["bg-mint"]}`}>
                    <h3>Into</h3>
                    <p>Marketing analytics, pricing, small-business brand strategy</p>
                  </div>
                  <div className={`${styles.fact} ${styles["bg-pink"]}`}>
                    <h3>Tools</h3>
                    <p>Excel, Python (pandas), Tableau, Figma, a stapler</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkSection />

        <section id="contact" className={styles.section} aria-labelledby="contact-title">
          <div className={styles.wrap}>
            <span className={styles.sectionNum}>03</span>
            <div className={styles.contactBox}>
              <h2 id="contact-title" className={styles.contactTitle}>
                Let&rsquo;s talk numbers (or skateboards).
              </h2>
              <p style={{ maxWidth: "60ch", fontSize: "1.15rem" }}>
                I&rsquo;m looking for roles in marketing analytics, pricing or advisory work with small and mid-sized
                businesses. Email is the fastest way to reach me.
              </p>
              <div className={styles.contactLinks}>
                <a href="mailto:marcus.johnson@example.com" className={`${styles.btn} ${styles.btnWhite}`}>
                  marcus.johnson@example.com
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className={`${styles.btn} ${styles.btnBlue}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <p>© 2026 Marcus Johnson · Sample portfolio for ACCY 593. Marcus is a fictional student.</p>
          <a href="/">← All sample sites</a>
        </div>
      </footer>
    </>
  );
}
