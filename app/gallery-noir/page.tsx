import type { Metadata } from "next";
import Link from "next/link";
import s from "./gallery.module.css";
import { BASE, CURATED, ROOMS, WORKS, getWork, type Work } from "./_data/works";

export const metadata: Metadata = {
  title: "Grace Nguyen · Portfolio",
  description:
    "Grace Nguyen studies accountancy at the University of Illinois and works where valuation meets design: brand value, intangible assets, editorial design, photography and cello.",
};

function firstSentence(text: string) {
  const i = text.indexOf(". ");
  return i === -1 ? text : text.slice(0, i + 1);
}

export default function GalleryNoirHome() {
  const curated = CURATED.map((slug) => getWork(slug)).filter((w): w is Work => Boolean(w));

  return (
    <>
      <section className={s.hero} aria-labelledby="gn-hero-title">
        <img
          className={s.heroImg}
          src={`${BASE}/hero.webp`}
          width={1200}
          height={800}
          alt="A dark gallery room at night with one framed landscape photograph lit by a single warm spotlight"
          fetchPriority="high"
        />
        <div className={s.heroShade} aria-hidden="true" />
        <div className={s.heroInner}>
          <p className={s.eyebrow}>Portfolio · Works 2024 to 2026</p>
          <h1 id="gn-hero-title" className={`${s.display} ${s.heroName}`}>
            Grace Nguyen
          </h1>
          <p className={s.heroLede}>
            MS in Accountancy student at the University of Illinois Urbana-Champaign. I study what brands and
            other intangible assets are worth, and I photograph the town at night.
          </p>
          <Link href={`${BASE}/work`} className={s.textLink}>
            Enter the exhibition <span aria-hidden="true">→</span>
          </Link>
        </div>
        <span className={s.scrollCue} aria-hidden="true">
          Scroll
        </span>
      </section>

      <section className={`${s.container} ${s.statement}`}>
        <p className={s.statementText} data-reveal>
          A balance sheet is a picture of a company, and like any picture it leaves things out of the frame. My
          work is about <em>what gets left out</em>: the value of a name, the clarity of a report, the light on a
          street after the shops close.
        </p>
      </section>

      <section className={s.container} aria-labelledby="gn-curated">
        <div className={s.sectionHead} data-reveal>
          <h2 id="gn-curated" className={s.sectionTitle}>
            A curated selection
          </h2>
          <Link href={`${BASE}/work`} className={s.textLink}>
            All ten works <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={s.curated}>
          {curated.map((w, i) => (
            <Link
              key={w.slug}
              href={`${BASE}/work/${w.slug}`}
              className={`${s.piece} ${i % 2 ? s.pieceFlip : ""}`}
              data-reveal
            >
              <figure className={s.pieceFigure}>
                <img
                  src={w.cover.src}
                  width={w.cover.width}
                  height={w.cover.height}
                  alt={w.cover.alt}
                  loading="lazy"
                  style={{ objectPosition: w.cover.height > w.cover.width ? "center 40%" : undefined }}
                />
              </figure>
              <div className={s.pieceLabel}>
                <span className={s.pieceNo}>
                  No. {w.no} · {ROOMS.find((r) => r.id === w.room)?.name}
                </span>
                <h3 className={s.pieceTitle}>{w.title}</h3>
                <p className={s.pieceSub}>{w.subtitle}</p>
                <p className={s.pieceSummary}>{firstSentence(w.summary)}</p>
                <p className={s.pieceMeta}>
                  {w.medium}, {w.year}
                </p>
                <span className={s.pieceMore}>View the work</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={s.container} aria-labelledby="gn-rooms">
        <div className={s.sectionHead} data-reveal>
          <h2 id="gn-rooms" className={s.sectionTitle}>
            Three rooms
          </h2>
          <span className={s.pieceMeta}>{WORKS.length} works on view</span>
        </div>
        <div className={s.rooms} data-reveal>
          {ROOMS.map((r) => (
            <Link key={r.id} href={`${BASE}/work#room-${r.id}`} className={s.roomCard}>
              <span className={s.roomNumeral}>{r.numeral}</span>
              <h3 className={s.roomName}>{r.name}</h3>
              <p className={s.roomNote}>{r.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${s.container} ${s.teaser}`} aria-labelledby="gn-about">
        <img
          className={s.teaserImg}
          src={`${BASE}/portrait.webp`}
          width={1024}
          height={1536}
          alt="A charcoal and gold drawing of Grace, looking up, holding a sketchbook"
          loading="lazy"
          data-reveal
        />
        <div className={s.teaserText} data-reveal>
          <p className={s.eyebrow}>About</p>
          <h2 id="gn-about" className={s.sectionTitle}>
            An accountant who reads the footnotes and the light.
          </h2>
          <p>
            I am finishing an MS in Accountancy at Gies College of Business, with a focus on valuation and
            financial reporting. I am looking for roles in valuation advisory or brand and IP valuation, ideally
            with clients in luxury and creative industries.
          </p>
          <Link href={`${BASE}/about`} className={s.textLink}>
            Read more and get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
