import type { Metadata } from "next";
import Link from "next/link";
import { businessItems, person } from "../data";
import s from "../journal.module.css";

export const metadata: Metadata = {
  title: "About Olivia Brooks",
  description:
    "Profile of Olivia Brooks, MS in Accountancy student at Gies College of Business, University of Illinois Urbana-Champaign, interested in forensic accounting and fraud examination.",
};

const qa = [
  {
    q: "Why accounting, after an English degree?",
    a: "I spent my last year of college working in the campus business office, reconciling student organization accounts. I found I liked the moment when two sets of numbers finally agree, and I liked even more the moment when they didn't and I had to find out why. That is basically a mystery novel with a debit column.",
  },
  {
    q: "What draws you to fraud examination?",
    a: "Fraud is almost never clever. It is usually an ordinary process with one weak spot that someone noticed before the controls did. I like learning where those weak spots tend to be, and I like that the work ends with a written explanation a non-accountant can follow.",
  },
  {
    q: "Why write for general readers?",
    a: "Because most people who are affected by financial reporting never read it. Employees, small business owners and retirees all make decisions based on numbers they were never taught to question. If I can explain a going-concern warning or a shell vendor in plain words, that is useful.",
  },
  {
    q: "What are you working on in ACCY 593?",
    a: "This site. The course asked us to build a portfolio with a coding agent, and I decided to make it look like the thing I read every weekend: a newspaper. Every piece here is one I made, wrote or analyzed myself.",
  },
  {
    q: "What do you do when you are not studying?",
    a: "Bake bread badly and then less badly, walk in Urbana's parks with a sketchbook, co-host a small podcast, and write short poems on the bus.",
  },
];

export default function AboutPage() {
  return (
    <article className={s.article}>
      <header className={s.articleHead}>
        <p className={s.kicker}>Profile &middot; Meet the Editor</p>
        <h1 className={s.articleTitle}>The Accountant Who Reads the Footnotes</h1>
        <p className={s.articleDek}>
          {person.name} is studying for an {person.program} at the University of Illinois. She is interested in
          forensic accounting, fraud examination, and explaining both to people who would rather not read a 10-K.
        </p>
      </header>

      <div className={s.profileGrid}>
        <div className={s.profileMain}>
          <figure className={s.portraitFigure}>
            <img
              src="/editorial-journal/portrait.webp"
              alt="Stippled ink portrait of Olivia Brooks wearing round glasses and a cardigan"
              width={1024}
              height={1024}
              className={s.portraitImg}
            />
            <figcaption className={s.caption}>Olivia Brooks, drawn in the style of a newspaper hedcut.</figcaption>
          </figure>

          <div className={s.body}>
            <p className={s.dropcap}>
              I came to accounting sideways. I studied English as an undergraduate, wrote for the student paper,
              and assumed I would end up in publishing. Then a part-time job in a campus business office handed me a
              stack of bank statements that did not match the ledger, and I spent a very happy week finding out why.
            </p>
            <p>
              Now I am in the {person.program} program at Gies College of Business, taking {person.course} this
              semester. My coursework leans toward auditing, forensic accounting and data analytics. I want to work
              in forensic accounting or fraud examination, ideally in a role where I investigate and then explain what
              I found to people who are not accountants.
            </p>
            <blockquote className={s.pull}>
              <p>Fraud is almost never clever. It is an ordinary process with one weak spot that someone noticed first.</p>
            </blockquote>
            <p>
              This site is set up like a newspaper because that is how I think about my work: the business pieces are
              the news section, and the bread, birds and poems are the weekend supplement. Both halves are honest
              about who I am. I like evidence, I like patience, and I like writing things down.
            </p>

            <h2 className={s.bodyH}>Five Questions</h2>
            <dl className={s.qa}>
              {qa.map((x) => (
                <div key={x.q}>
                  <dt>{x.q}</dt>
                  <dd>{x.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <aside className={s.factBox}>
          <h2 className={s.didLabel}>At a Glance</h2>
          <dl className={s.facts}>
            <div>
              <dt>Studying</dt>
              <dd>{person.program}</dd>
            </div>
            <div>
              <dt>School</dt>
              <dd>{person.school}</dd>
            </div>
            <div>
              <dt>This semester</dt>
              <dd>{person.course}, plus auditing and forensic accounting coursework</dd>
            </div>
            <div>
              <dt>Interests</dt>
              <dd>Forensic accounting, fraud examination, data analytics, writing for general readers</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Excel, SQL, Tableau, a red pen</dd>
            </div>
          </dl>

          <div id="contact" className={s.contact}>
            <h2 className={s.didLabel}>Contact the Editor</h2>
            <p>I&rsquo;m looking for forensic accounting and audit opportunities. I answer email within a day.</p>
            <a href={`mailto:${person.email}`} className={s.contactBtn}>
              {person.email}
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={s.contactLink}>
              Connect on LinkedIn <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className={s.factStart}>
            <h2 className={s.didLabel}>Start Here</h2>
            <ul>
              {businessItems.slice(0, 3).map((it) => (
                <li key={it.slug}>
                  <Link href={`/editorial-journal/work/${it.slug}`}>{it.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
