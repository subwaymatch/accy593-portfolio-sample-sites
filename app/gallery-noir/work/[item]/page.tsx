import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import s from "../../gallery.module.css";
import { BASE, ROOMS, WORKS, getWork, type Work } from "../../_data/works";
import RoyaltyModel from "../../_components/RoyaltyModel";
import IntangiblesChart from "../../_components/IntangiblesChart";
import BeforeAfter from "../../_components/BeforeAfter";
import SeriesGallery from "../../_components/SeriesGallery";
import { HomesFeature, IdentityFeature, ProgrammeFeature, SketchbookFeature } from "../../_components/Features";

type Params = { item: string };

export function generateStaticParams(): Params[] {
  return WORKS.map((w) => ({ item: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { item } = await params;
  const w = getWork(item);
  if (!w) return { title: "Not found" };
  return {
    title: `${w.title}: ${w.subtitle}`,
    description: w.summary,
  };
}

function Feature({ w }: { w: Work }) {
  switch (w.feature) {
    case "royalty":
      return <RoyaltyModel />;
    case "intangibles":
      return <IntangiblesChart />;
    case "beforeAfter":
      return w.series ? <BeforeAfter before={w.series[0]} after={w.series[1]} /> : null;
    case "series":
      return w.series ? <SeriesGallery images={w.series} title={w.title} /> : null;
    case "identity":
      return <IdentityFeature cover={w.cover} />;
    case "homes":
      return <HomesFeature cover={w.cover} />;
    case "programme":
      return <ProgrammeFeature />;
    case "sketchbook":
      return <SketchbookFeature cover={w.cover} />;
    default:
      return null;
  }
}

export default async function WorkDetail({ params }: { params: Promise<Params> }) {
  const { item } = await params;
  const w = getWork(item);
  if (!w) notFound();

  const idx = WORKS.findIndex((x) => x.slug === w.slug);
  const prev = WORKS[(idx - 1 + WORKS.length) % WORKS.length];
  const next = WORKS[(idx + 1) % WORKS.length];
  const room = ROOMS.find((r) => r.id === w.room);
  const portrait = w.cover.height > w.cover.width;
  const isPost = w.feature === "post";

  return (
    <article>
      <header className={s.detailHero}>
        <img
          className={s.detailHeroImg}
          src={w.cover.src}
          width={w.cover.width}
          height={w.cover.height}
          alt={w.cover.alt}
          fetchPriority="high"
          style={{ objectPosition: portrait ? "center 35%" : "center" }}
        />
        <div className={s.heroShade} aria-hidden="true" />
        <div className={s.detailHeroInner}>
          <p className={s.eyebrow}>
            No. {w.no} · Room {room?.numeral}, {room?.name}
          </p>
          <h1 className={`${s.display} ${s.detailTitle}`}>{w.title}</h1>
          <p className={s.detailSub}>{w.subtitle}</p>
        </div>
      </header>

      <section className={`${s.container} ${s.label}`} aria-label="Wall label">
        <div>
          <p className={s.labelLead} data-reveal>
            {w.summary}
          </p>
          <div className={s.labelRole} data-reveal>
            <h2>What I did</h2>
            <p>{w.role}</p>
          </div>
        </div>
        <aside className={s.labelCard} data-reveal>
          <h2>Wall label</h2>
          <dl>
            <dt>Medium</dt>
            <dd>{w.medium}</dd>
            <dt>Year</dt>
            <dd>{w.year}</dd>
            <dt>Room</dt>
            <dd>
              {room?.numeral}. {room?.name}
            </dd>
            <dt>Themes</dt>
            <dd>
              <ul className={s.tags}>
                {w.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </aside>
      </section>

      {!isPost && (
        <section className={`${s.container} ${s.featureBlock}`} aria-label="The work">
          <Feature w={w} />
        </section>
      )}

      {w.body.length > 0 && (
        <section className={`${s.narrow} ${s.notes}`} aria-labelledby="gn-notes">
          <h2 id="gn-notes" className={s.proseHead} data-reveal>
            {isPost ? "The essay" : "Notes"}
          </h2>
          <div className={`${s.prose} ${isPost ? s.essay : ""}`}>
            {w.body.map((p, i) => (
              <p key={i} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      <nav className={s.pager} aria-label="More works">
        <Link href={`${BASE}/work/${prev.slug}`}>
          <span className={s.eyebrow}>← Previous · No. {prev.no}</span>
          <span className={s.pagerTitle}>{prev.title}</span>
        </Link>
        <Link href={`${BASE}/work/${next.slug}`}>
          <span className={s.eyebrow}>Next · No. {next.no} →</span>
          <span className={s.pagerTitle}>{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
