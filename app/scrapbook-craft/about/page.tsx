import type { Metadata } from "next";
import Link from "next/link";
import { items, person } from "../data";
import s from "../scrapbook.module.css";

export const metadata: Metadata = {
  title: "About Emma",
  description:
    "About Emma Larsen, MS in Accountancy student at Illinois Gies College of Business, interested in ESG reporting, supply-chain emissions and small farm and food businesses.",
};

export default function AboutPage() {
  const featured = items.filter((i) => i.kind === "business").slice(0, 3);
  return (
    <div className={s.aboutGrid}>
      <div className={s.aboutSide}>
        <figure className={s.portrait}>
          <span className={`${s.tape} ${s.tape_sage}`} aria-hidden="true" />
          <img
            src="/scrapbook-craft/portrait.webp"
            alt="Storybook-style illustrated portrait of Emma in a mustard cardigan holding a notebook in a garden"
            width={1024}
            height={1536}
          />
          <figcaption className={s.heroCaption}>me, drawn (not photographed)</figcaption>
        </figure>
        <section className={`${s.contactCard} ${s.glance}`} aria-label="At a glance">
          <span className={`${s.tape} ${s.tape_mustard}`} aria-hidden="true" />
          <dl className={s.ruled}>
            <dt>studying</dt>
            <dd>MS in Accountancy, Gies College of Business</dd>
            <dt>this semester</dt>
            <dd>ACCY 593</dd>
            <dt>based in</dt>
            <dd>Champaign-Urbana, Illinois</dd>
            <dt>looking for</dt>
            <dd>Sustainability assurance or advisory internship</dd>
          </dl>
        </section>
      </div>

      <div>
        <p className={s.helloKicker}>about me</p>
        <h1 className={s.helloTitle}>Accountant in training, maker on weekends</h1>

        <section className={s.paperBlock}>
          <h2>Who I am</h2>
          <p>
            I&apos;m Emma, an {person.program} student at the {person.school}. I grew up helping at my aunt&apos;s
            orchard stand every fall, which is where I first noticed that the people running small food businesses
            are usually great at growing things and short on time for the books. That stuck with me.
          </p>
          <p>
            This semester I&apos;m taking ACCY 593, where I&apos;ve been working on emissions estimates, cost
            analysis and a website project. Outside class I knit, garden, bake and press too many flowers.
          </p>
        </section>

        <section className={s.paperBlock}>
          <h2>What I&apos;m interested in</h2>
          <ul>
            <li>
              <strong>Sustainability (ESG) reporting:</strong> how companies measure and disclose climate data, and
              whether a normal reader can follow it.
            </li>
            <li>
              <strong>Supply-chain emissions accounting:</strong> Scope 3 inventories, emission factors, and where the
              estimates get shaky.
            </li>
            <li>
              <strong>Small farm and food businesses:</strong> costing, pricing and simple reporting that a farm or
              restaurant owner can actually use.
            </li>
          </ul>
        </section>

        <section className={s.paperBlock}>
          <h2>Things I&apos;m comfortable with</h2>
          <p>
            Excel (lookups, pivot tables, scenario tables), the GHG Protocol Scope 3 categories, activity-based
            costing, writing for non-accountants, and a little React and TypeScript from building the calculator on
            this site.
          </p>
          <p>
            A good place to start:{" "}
            {featured.map((f, i) => (
              <span key={f.slug}>
                <Link href={`/scrapbook-craft/work/${f.slug}`}>{f.title}</Link>
                {i < featured.length - 1 ? "; " : "."}
              </span>
            ))}
          </p>
        </section>

        <section className={s.contactCard} aria-labelledby="contact-title">
          <span className={`${s.tape} ${s.tape_terracotta}`} aria-hidden="true" />
          <div className={s.ruled}>
            <h2 id="contact-title">Get in touch</h2>
            <p>
              I&apos;m looking for internships in sustainability assurance and advisory. Email is the fastest way to
              reach me, and I usually reply within a day.
            </p>
            <p>
              Email: <a href={`mailto:${person.email}`}>{person.email}</a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com
              </a>
            </p>
          </div>
          <div className={s.contactActions}>
            <a href={`mailto:${person.email}`} className={s.button}>
              Email me
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.button} ${s.buttonGhost}`}
            >
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
