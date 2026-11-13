import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inkClass } from "../../_components/WorkCard";
import BreakEvenCalculator from "../../_components/showcases/BreakEvenCalculator";
import CampusMap from "../../_components/showcases/CampusMap";
import ClubModel from "../../_components/showcases/ClubModel";
import HomeSalesMock from "../../_components/showcases/HomeSalesMock";
import MileageChart from "../../_components/showcases/MileageChart";
import RecipeCards from "../../_components/showcases/RecipeCards";
import SongSheet from "../../_components/showcases/SongSheet";
import SponsorOnePager from "../../_components/showcases/SponsorOnePager";
import TicketChart from "../../_components/showcases/TicketChart";
import TravelSeries from "../../_components/showcases/TravelSeries";
import { getItem, getNeighbours, work, type Showcase } from "../../data";
import styles from "../../riso.module.css";
import d from "./detail.module.css";

type Params = { item: string };

export function generateStaticParams(): Params[] {
  return work.map((w) => ({ item: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { item } = await params;
  const w = getItem(item);
  if (!w) return { title: "Not found" };
  return { title: w.title, description: w.summary };
}

const showcases: Record<Showcase, () => React.ReactNode> = {
  tickets: () => <TicketChart />,
  model: () => <ClubModel />,
  onepager: () => <SponsorOnePager />,
  breakeven: () => <BreakEvenCalculator />,
  homes: () => <HomeSalesMock />,
  song: () => <SongSheet />,
  travel: () => <TravelSeries />,
  recipes: () => <RecipeCards />,
  map: () => <CampusMap />,
  marathon: () => <MileageChart />,
};

export default async function WorkDetail({ params }: { params: Promise<Params> }) {
  const { item } = await params;
  const w = getItem(item);
  if (!w) notFound();
  const { prev, next } = getNeighbours(w.slug);
  const index = work.findIndex((x) => x.slug === w.slug) + 1;

  return (
    <article className={`${styles.wrap} ${inkClass[w.ink]}`}>
      <nav className={d.crumbs} aria-label="Breadcrumb">
        <Link href="/risograph-print/work">Work</Link>
        <span aria-hidden="true">/</span>
        <span>
          {String(index).padStart(2, "0")} of {work.length}
        </span>
      </nav>

      <header className={d.head}>
        <span className={styles.kicker}>{w.kicker}</span>
        <h1 className={`${styles.misreg} ${d.title}`}>{w.title}</h1>
        <p className={styles.lede}>{w.summary}</p>
      </header>

      <div className={d.cover}>
        <img src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} />
      </div>

      <div className={d.body}>
        <div className={d.text}>
          <h2 className={d.h}>What it is</h2>
          {w.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2 className={d.h}>What I did</h2>
          <ul className={d.did}>
            {w.did.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <aside className={d.meta}>
          <dl>
            <dt>When</dt>
            <dd>{w.date}</dd>
            <dt>My role</dt>
            <dd>{w.role}</dd>
            <dt>Tools</dt>
            <dd>
              <ul className={d.tools}>
                {w.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </aside>
      </div>

      <section className={d.showcase} aria-labelledby="riso-showcase">
        <h2 id="riso-showcase" className={`${styles.misreg} ${d.showcaseTitle}`}>
          The work
        </h2>
        {showcases[w.showcase]()}
      </section>

      <nav className={d.pager} aria-label="More work">
        <Link href={`/risograph-print/work/${prev.slug}`} className={d.pagerLink}>
          <span className={d.pagerDir}>← Previous</span>
          <span className={d.pagerTitle}>{prev.title}</span>
        </Link>
        <Link href={`/risograph-print/work/${next.slug}`} className={`${d.pagerLink} ${d.pagerNext}`}>
          <span className={d.pagerDir}>Next →</span>
          <span className={d.pagerTitle}>{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
