import type { Metadata } from "next";
import Link from "next/link";
import WorkRow from "./WorkRow";
import { featuredSlugs, items, person } from "./data";
import s from "./site.module.css";

export const metadata: Metadata = {
  title: "Maya Chen · Accountancy, Audit Analytics",
  description:
    "Maya Chen is an MS in Accountancy student at Gies College of Business, UIUC, working on audit data analytics, process mining and internal controls.",
};

export default function SwissHome() {
  const featured = items.filter((i) => featuredSlugs.includes(i.slug));
  const businessCount = items.filter((i) => i.track === "Business").length;

  return (
    <>
      <section className={`${s.wrap} ${s.hero}`}>
        <div className={s.grid}>
          <h1 className={`${s.display} ${s.heroName}`}>
            <span className={s.displayLine}>Maya</span>
            <span className={s.displayLine}>
              Chen<span className={s.red}>.</span>
            </span>
          </h1>
          <div className={s.heroMeta}>
            <p className={s.eyebrow}>{person.program}</p>
            <p className={s.muted} style={{ margin: "4px 0 0" }}>
              Gies College of Business
              <br />
              University of Illinois Urbana-Champaign
            </p>
          </div>
          <div className={s.heroLead}>
            <p className={s.lead}>
              I study accountancy and spend most of my time where audit meets data: testing journal entries,
              mining purchase-to-pay logs, and designing controls that people actually check. Outside class I
              shoot film, throw pots and ride the county grid.
            </p>
          </div>
          <nav className={s.heroIndex} aria-label="Work index">
            <p className={s.eyebrow}>Index</p>
            <ol>
              {items.map((item, n) => (
                <li key={item.slug}>
                  <span className={item.track === "Business" ? s.red : undefined}>{String(n + 1).padStart(2, "0")}</span>
                  <Link href={`/swiss-minimal/work/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className={s.heroImage}>
            <img
              className={s.img}
              src="/swiss-minimal/hero.webp"
              width={1200}
              height={800}
              alt="Abstract composition of a red circle and black bars on a grid of thin black lines"
            />
          </div>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section} ${s.sectionTight}`}>
        <div className={`${s.sectionHead} ${s.ruleTop}`}>
          <p className={s.eyebrow}>Selected work</p>
          <h2 className={s.h2}>
            {items.length} projects, {businessCount} in accounting and analytics. Six of them here.
          </h2>
        </div>
        <ul className={s.list}>
          {featured.map((item) => (
            <WorkRow key={item.slug} item={item} />
          ))}
        </ul>
        <p style={{ marginTop: 24 }}>
          <Link href="/swiss-minimal/work" className={s.h3}>
            All work →
          </Link>
        </p>
      </section>

      <section className={`${s.wrap} ${s.section} ${s.sectionTight}`}>
        <div className={`${s.sectionHead} ${s.ruleTop}`}>
          <p className={s.eyebrow}>Contact</p>
          <div>
            <p className={s.lead} style={{ marginBottom: 24 }}>
              Looking for a 2027 audit or risk advisory role, ideally on a team that uses data analytics in
              fieldwork.
            </p>
            <a className={s.contactBig} href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
