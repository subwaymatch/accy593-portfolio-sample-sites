import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "../../components/ArticleBody";
import Card from "../../components/Card";
import { getItem, items, person } from "../../data";
import s from "../../journal.module.css";

type Props = { params: Promise<{ item: string }> };

export function generateStaticParams() {
  return items.map((i) => ({ item: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { item } = await params;
  const it = getItem(item);
  if (!it) return { title: "Not found" };
  return { title: it.title, description: it.dek };
}

export default async function ArticlePage({ params }: Props) {
  const { item } = await params;
  const it = getItem(item);
  if (!it) notFound();

  const idx = items.indexOf(it);
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];
  const related = items.filter((x) => x.desk === it.desk && x.slug !== it.slug).slice(0, 3);

  return (
    <article className={s.article}>
      <header className={s.articleHead}>
        <p className={s.kicker}>
          <Link href={`/editorial-journal#${it.desk}`}>
            {it.desk === "business" ? "Business & Analytics" : "Off the Clock"}
          </Link>{" "}
          &middot; {it.kicker}
        </p>
        <h1 className={s.articleTitle}>{it.title}</h1>
        <p className={s.articleDek}>{it.dek}</p>
        <p className={s.byline}>
          By <strong>{person.name}</strong> &middot; {it.date} &middot; {it.read}
        </p>
      </header>

      <figure className={s.articleFigure}>
        <img src={it.image.src} alt={it.image.alt} width={it.image.w} height={it.image.h} className={s.articleImg} />
        {it.image.caption && <figcaption className={s.caption}>{it.image.caption}</figcaption>}
      </figure>

      <div className={s.articleGrid}>
        <aside className={s.did}>
          <h2 className={s.didLabel}>What I Did</h2>
          <p>{it.did}</p>
          <dl className={s.didMeta}>
            <div>
              <dt>Filed</dt>
              <dd>{it.date}</dd>
            </div>
            <div>
              <dt>Desk</dt>
              <dd>{it.desk === "business" ? "Business & Analytics" : "Off the Clock"}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{it.kicker}</dd>
            </div>
          </dl>
          <Link href="/editorial-journal" className={s.more}>
            <span aria-hidden="true">&larr;</span> Front page
          </Link>
        </aside>
        <ArticleBody blocks={it.body} />
      </div>

      <nav className={s.prevNext} aria-label="More stories">
        <Link href={`/editorial-journal/work/${prev.slug}`}>
          <span className={s.kicker}>&larr; Previous</span>
          <span className={s.prevNextTitle}>{prev.title}</span>
        </Link>
        <Link href={`/editorial-journal/work/${next.slug}`} className={s.nextLink}>
          <span className={s.kicker}>Next &rarr;</span>
          <span className={s.prevNextTitle}>{next.title}</span>
        </Link>
      </nav>

      <section className={s.section} aria-labelledby="related-h">
        <header className={s.sectionHead}>
          <h2 id="related-h" className={s.sectionLabel}>
            More from {it.desk === "business" ? "Business & Analytics" : "Off the Clock"}
          </h2>
        </header>
        <div className={s.grid3}>
          {related.map((r) => (
            <Card key={r.slug} item={r} />
          ))}
        </div>
      </section>
    </article>
  );
}
