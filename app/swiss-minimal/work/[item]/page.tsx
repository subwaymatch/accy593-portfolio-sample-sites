import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getItem, indexOf, items, type Demo } from "../../data";
import AnomalyChart from "../../demos/AnomalyChart";
import BudgetDemo from "../../demos/BudgetDemo";
import ControlsPanel from "../../demos/ControlsPanel";
import CyclingStats from "../../demos/CyclingStats";
import HomeSales from "../../demos/HomeSales";
import ProcessMap from "../../demos/ProcessMap";
import s from "../../site.module.css";

type Props = { params: Promise<{ item: string }> };

export function generateStaticParams() {
  return items.map((i) => ({ item: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { item } = await params;
  const found = getItem(item);
  if (!found) return { title: "Not found" };
  return { title: found.title, description: found.summary };
}

const demos: Record<Demo, () => React.ReactNode> = {
  anomaly: () => <AnomalyChart />,
  process: () => <ProcessMap />,
  controls: () => <ControlsPanel />,
  homes: () => <HomeSales />,
  budget: () => <BudgetDemo />,
  cycling: () => <CyclingStats />,
};

export default async function WorkItemPage({ params }: Props) {
  const { item: slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  const i = items.indexOf(item);
  const prev = items[(i - 1 + items.length) % items.length];
  const next = items[(i + 1) % items.length];

  return (
    <article className={`${s.wrap} ${s.detailHead}`}>
      <div className={s.grid}>
        <p className={s.eyebrow} style={{ gridColumn: "1 / -1", marginBottom: 24 }}>
          <Link href="/swiss-minimal/work">Work</Link> / {item.category}
        </p>
        <p className={s.bigNum} aria-hidden="true">
          {indexOf(item.slug)}
        </p>
        <h1 className={`${s.h1} ${s.detailTitle}`}>{item.title}</h1>

        <dl className={s.facts}>
          <div className={s.fact}>
            <dt>Type</dt>
            <dd>
              <span className={`${s.tag} ${item.track === "Business" ? s.tagBiz : ""}`}>{item.track}</span> ·{" "}
              {item.category}
            </dd>
          </div>
          <div className={s.fact}>
            <dt>Year</dt>
            <dd>{item.year}</dd>
          </div>
          <div className={s.fact}>
            <dt>What I did</dt>
            <dd>{item.role}</dd>
          </div>
          <div className={s.fact}>
            <dt>Tools</dt>
            <dd>{item.tools.join(", ")}</dd>
          </div>
        </dl>

        <p className={`${s.lead} ${s.detailLead}`}>{item.summary}</p>

        {item.image && (
          <figure className={s.detailImage}>
            <img
              className={`${s.img} ${s.frame}`}
              src={item.image.src}
              width={item.image.width}
              height={item.image.height}
              alt={item.image.alt}
            />
          </figure>
        )}

        {item.gallery && (
          <div className={s.gallery}>
            {item.gallery.map((g) => (
              <figure key={g.src}>
                <img className={s.img} src={g.src} width={g.width} height={g.height} alt={g.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        )}

        {item.demo && !item.image && <div className={`${s.demo} ${s.demoTop}`}>{demos[item.demo]()}</div>}

        {item.sections.map((sec) => (
          <section key={sec.heading} className={s.detailSection}>
            <h2 className={s.h3}>{sec.heading}</h2>
            <div className={s.body}>
              {sec.body.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {item.demo && item.image && <div className={s.demo}>{demos[item.demo]()}</div>}

        <nav className={s.pager} aria-label="More work">
          <Link href={`/swiss-minimal/work/${prev.slug}`}>
            <span className={s.eyebrow}>← {indexOf(prev.slug)} Previous</span>
            <br />
            <span className={s.h3}>{prev.title}</span>
          </Link>
          <Link href={`/swiss-minimal/work/${next.slug}`} className={s.pagerNext}>
            <span className={s.eyebrow}>Next {indexOf(next.slug)} →</span>
            <br />
            <span className={s.h3}>{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
