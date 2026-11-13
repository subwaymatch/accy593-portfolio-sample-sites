import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ItemBody from "../../components/ItemBody";
import { getItem, items, neighbors } from "../../data";
import s from "../../scrapbook.module.css";

type Params = { item: string };

export function generateStaticParams(): Params[] {
  return items.map((i) => ({ item: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { item: slug } = await params;
  const item = getItem(slug);
  if (!item) return { title: "Not found" };
  return { title: item.title, description: item.summary };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { item: slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();
  const { prev, next } = neighbors(item.slug);

  return (
    <article>
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/scrapbook-craft">The board</Link> /{" "}
        {item.kind === "business" ? "Accounting & analytics" : "Made by hand"}
      </nav>

      <header className={s.detailHead}>
        <div>
          <p className={s.helloKicker}>{item.caption}</p>
          <h1 className={s.detailTitle}>{item.title}</h1>
          <div className={s.meta}>
            <span className={`${s.tag} ${item.kind === "business" ? s.tagBusiness : ""}`} style={{ marginTop: 0 }}>
              {item.tag}
            </span>
            <span>{item.when}</span>
          </div>
          <p>{item.summary}</p>
        </div>
        <figure className={s.detailPhoto}>
          <span className={`${s.tape} ${s[`tape_${item.tape}`]}`} aria-hidden="true" />
          <img src={item.image.src} alt={item.image.alt} width={item.image.w} height={item.image.h} />
        </figure>
      </header>

      <div className={s.notes}>
        <section className={s.paperBlock}>
          <h2>What I did</h2>
          <ul>
            {item.did.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>
        <section className={s.contactCard}>
          <h2 className={s.cardTitle}>Tools &amp; techniques</h2>
          <ul>
            {item.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className={s.body} aria-label="The work">
        <ItemBody slug={item.slug} />
      </section>

      <nav className={s.pager} aria-label="More work">
        <Link href={`/scrapbook-craft/work/${prev.slug}`}>← {prev.title}</Link>
        <Link href={`/scrapbook-craft/work/${next.slug}`}>{next.title} →</Link>
      </nav>
    </article>
  );
}
