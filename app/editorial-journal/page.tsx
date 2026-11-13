import type { Metadata } from "next";
import Link from "next/link";
import Card from "./components/Card";
import { businessItems, items, personalItems, person } from "./data";
import s from "./journal.module.css";

export const metadata: Metadata = {
  title: "The Footnote | Olivia Brooks, MS in Accountancy",
  description:
    "Front page of The Footnote: fraud examination essays, a Benford's law analysis, case studies, design work and side projects by Olivia Brooks.",
};

export default function FrontPage() {
  const [lead, ...restBusiness] = businessItems;
  const leadText = lead.body.filter((b) => b.t === "p").slice(0, 2) as { t: "p"; text: string }[];

  return (
    <>
      <section className={s.front} aria-label="Lead story">
        <article className={s.lead}>
          <p className={s.kicker}>Lead Story &middot; {lead.kicker}</p>
          <h1 className={s.leadTitle}>
            <Link href={`/editorial-journal/work/${lead.slug}`}>{lead.title}</Link>
          </h1>
          <p className={s.leadDek}>{lead.dek}</p>
          <p className={s.byline}>
            By <strong>{person.name}</strong> &middot; {lead.date} &middot; {lead.read}
          </p>
          <figure className={s.leadFigure}>
            <img
              src={lead.image.src}
              alt={lead.image.alt}
              width={lead.image.w}
              height={lead.image.h}
              className={s.leadImg}
            />
            {lead.image.caption && <figcaption className={s.caption}>{lead.image.caption}</figcaption>}
          </figure>
          <div className={s.leadColumns}>
            {leadText.map((b, i) => (
              <p key={i} className={i === 0 ? s.dropcap : undefined}>
                {b.text}
              </p>
            ))}
          </div>
          <Link href={`/editorial-journal/work/${lead.slug}`} className={s.more}>
            Continue reading <span aria-hidden="true">&rarr;</span>
          </Link>
        </article>

        <aside className={s.rail}>
          <div className={s.railBox}>
            <h2 className={s.railLabel}>In This Issue</h2>
            <ol className={s.index}>
              {items.map((it, i) => (
                <li key={it.slug}>
                  <span className={s.indexNum}>{String(i + 1).padStart(2, "0")}</span>
                  <Link href={`/editorial-journal/work/${it.slug}`}>{it.title}</Link>
                  <span className={s.indexDesk}>{it.desk === "business" ? "Business" : "Personal"}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.railBox}>
            <h2 className={s.railLabel}>From the Editor</h2>
            <div className={s.editor}>
              <img
                src="/editorial-journal/portrait.webp"
                alt="Stippled ink portrait of Olivia Brooks"
                width={1024}
                height={1024}
                className={s.editorImg}
              />
              <p>
                I&rsquo;m {person.name}, an {person.program} student at Gies College of Business. I write
                about fraud, forensic accounting and the numbers behind ordinary life, for readers who
                don&rsquo;t have a CPA.
              </p>
            </div>
            <Link href="/editorial-journal/about" className={s.more}>
              Read the profile <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </aside>
      </section>

      <section id="business" className={s.section} aria-labelledby="business-h">
        <header className={s.sectionHead}>
          <h2 id="business-h" className={s.sectionLabel}>
            Business &amp; Analytics
          </h2>
          <p className={s.sectionNote}>Essays, analysis, case studies and design work</p>
        </header>
        <div className={s.grid}>
          {restBusiness.map((it, i) => (
            <Card key={it.slug} item={it} wide={i === 0} />
          ))}
        </div>
      </section>

      <section id="personal" className={s.section} aria-labelledby="personal-h">
        <header className={s.sectionHead}>
          <h2 id="personal-h" className={s.sectionLabel}>
            Off the Clock
          </h2>
          <p className={s.sectionNote}>Bread, birds, verse and other things made by hand</p>
        </header>
        <div className={s.grid}>
          {personalItems.map((it, i) => (
            <Card key={it.slug} item={it} wide={i === 0} />
          ))}
        </div>
      </section>
    </>
  );
}
