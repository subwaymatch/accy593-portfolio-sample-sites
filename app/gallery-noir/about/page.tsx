import type { Metadata } from "next";
import Link from "next/link";
import s from "../gallery.module.css";
import { BASE, PERSON } from "../_data/works";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Grace Nguyen: MS in Accountancy student at Gies College of Business, University of Illinois Urbana-Champaign, interested in brand valuation, intangible assets and creative-industry finance.",
};

export default function AboutPage() {
  return (
    <>
      <header className={`${s.container} ${s.pageHead}`}>
        <p className={s.eyebrow}>About the artist, so to speak</p>
        <h1 className={`${s.display} ${s.pageTitle}`}>Grace Nguyen</h1>
        <p className={s.pageLede}>
          Graduate student in accountancy at the University of Illinois Urbana-Champaign. Valuation by day,
          photographs by night, cello on Sunday afternoons.
        </p>
      </header>

      <div className={`${s.container} ${s.aboutGrid}`}>
        <figure className={s.portraitFig} data-reveal>
          <img
            src={`${BASE}/portrait.webp`}
            width={1024}
            height={1536}
            alt="A charcoal and gold drawing of Grace in a dark coat, looking up, holding a sketchbook"
          />
          <figcaption>Portrait, charcoal and gold ink (stylised illustration).</figcaption>
        </figure>

        <div>
          <div className={s.prose} data-reveal>
            <p>
              I am in the MS in Accountancy program at the Gies College of Business, where I am concentrating
              on valuation and financial reporting. This semester I am taking ACCY 593, which is where several
              of the projects on this site, including this site, started.
            </p>
            <p>
              The question I keep returning to is why the things that make a company valuable are so often the
              hardest to see in its accounts. A fashion house is worth what it is because of its name, its
              archive and its craftspeople, and almost none of that appears on the balance sheet unless someone
              buys the company. I like the technical side of answering that (royalty rates, discount rates,
              purchase price allocations) and I like the judgement it takes to explain the answer to someone
              who is not an accountant.
            </p>
            <p>
              Outside class I photograph, mostly at night and mostly within walking distance of my apartment. I
              have played cello since I was nine and still perform in student recitals. I bind my own
              sketchbooks, which started as a way to avoid buying them and turned into a habit.
            </p>
          </div>

          <div className={s.facts} data-reveal>
            <div>
              <h3>Studying</h3>
              <p>
                MS in Accountancy, Gies College of Business, University of Illinois Urbana-Champaign (expected
                May 2027)
              </p>
            </div>
            <div>
              <h3>Interests</h3>
              <ul>
                <li>Brand and IP valuation</li>
                <li>Intangible assets in financial reporting</li>
                <li>Luxury and creative-industry finance</li>
                <li>Information and editorial design</li>
              </ul>
            </div>
            <div>
              <h3>Tools</h3>
              <p>Excel and financial modelling, Tableau, Python (pandas), HTML, CSS and React, Figma, InDesign, Lightroom</p>
            </div>
            <div>
              <h3>Looking for</h3>
              <p>
                Valuation advisory or transaction services roles, especially work on brand, IP and purchase price
                allocation.
              </p>
            </div>
          </div>

          <section id="contact" className={s.contact} aria-labelledby="gn-contact" data-reveal>
            <p className={s.eyebrow}>Contact</p>
            <h2 id="gn-contact" className={s.proseHead}>
              I am glad to talk about valuation, internships, or the right lens for night photography.
            </h2>
            <ul className={s.contactLinks}>
              <li>
                <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
              </li>
              <li>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </section>

          <p style={{ marginTop: "3rem" }}>
            <Link href={`${BASE}/work`} className={s.textLink}>
              See the exhibition list <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
