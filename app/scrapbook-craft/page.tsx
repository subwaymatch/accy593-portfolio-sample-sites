import type { Metadata } from "next";
import Link from "next/link";
import PinCard from "./components/PinCard";
import { items } from "./data";
import s from "./scrapbook.module.css";

export const metadata: Metadata = {
  title: "Emma Larsen · Scrapbook Portfolio",
  description:
    "Emma Larsen's pinned board of work: Scope 3 estimates, ESG reporting, cost analysis and a carbon calculator, plus knitting, gardening and other handmade projects.",
};

export default function ScrapbookHome() {
  const business = items.filter((i) => i.kind === "business");
  const personal = items.filter((i) => i.kind === "personal");

  return (
    <>
      <section className={s.hello} aria-labelledby="hello-title">
        <div>
          <p className={s.helloKicker}>hi there, I&apos;m</p>
          <h1 id="hello-title" className={s.helloTitle}>
            Emma Larsen
          </h1>
          <p className={s.helloText}>
            I&apos;m an MS in Accountancy student at the University of Illinois Urbana-Champaign (Gies College of
            Business). I like numbers that describe something real: how much carbon sits inside a restaurant&apos;s
            beef order, what a box of carrots costs a small farm to grow and pack, whether a sustainability report
            actually says what it means.
          </p>
          <p className={s.helloText}>
            This board holds my coursework from ACCY 593 next to the things I make by hand. Click any card to see the
            full piece.
          </p>
          <div className={s.buttonRow}>
            <a href="#board" className={s.button}>
              See the board
            </a>
            <Link href="/scrapbook-craft/about" className={`${s.button} ${s.buttonGhost}`}>
              About me
            </Link>
          </div>
        </div>
        <figure className={s.heroPhoto}>
          <span className={`${s.tape} ${s.tape_mustard}`} aria-hidden="true" />
          <img
            src="/scrapbook-craft/hero.webp"
            alt="Desk flat-lay with an open notebook, calculator, mustard yarn on knitting needles, pressed flowers and a cup of tea"
            width={1200}
            height={800}
          />
          <figcaption className={s.heroCaption}>my desk, most evenings</figcaption>
        </figure>
      </section>

      <section id="board" aria-labelledby="biz-title">
        <h2 id="biz-title" className={s.sectionTitle}>
          Accounting &amp; analytics
        </h2>
        <p className={s.sectionNote}>emissions, costs and reports, mostly from ACCY 593</p>
        <ul className={s.board} role="list">
          {business.map((item) => (
            <PinCard key={item.slug} item={item} />
          ))}
          <li className={s.sticky}>
            <p>Most of these started as ACCY 593 assignments. The numbers are sample data; the methods are real.</p>
            <p>
              Short on time? <Link href="/scrapbook-craft/work/carbon-cost-per-meal">Try the calculator →</Link>
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="made-title">
        <h2 id="made-title" className={s.sectionTitle}>
          Made by hand
        </h2>
        <p className={s.sectionNote}>knitting, stitching, baking and growing things</p>
        <ul className={s.board} role="list">
          {personal.map((item) => (
            <PinCard key={item.slug} item={item} />
          ))}
        </ul>
      </section>
    </>
  );
}
