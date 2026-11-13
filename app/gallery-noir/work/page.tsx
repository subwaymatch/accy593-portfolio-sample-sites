import type { Metadata } from "next";
import Link from "next/link";
import s from "../gallery.module.css";
import { BASE, ROOMS, WORKS } from "../_data/works";

export const metadata: Metadata = {
  title: "Exhibition list",
  description:
    "All ten works by Grace Nguyen, arranged in three rooms: valuation and analysis, photography, and studio and stage.",
};

export default function WorkIndex() {
  return (
    <>
      <header className={`${s.container} ${s.pageHead}`}>
        <p className={s.eyebrow}>Exhibition list · {WORKS.length} works</p>
        <h1 className={`${s.display} ${s.pageTitle}`}>Works, 2024 to 2026</h1>
        <p className={s.pageLede}>
          Arranged in three rooms. The first holds the business and analytics work from my accountancy degree; the
          other two hold what I make when I am not in a spreadsheet. Every piece opens to a full wall label and the
          work itself.
        </p>
      </header>

      <div className={s.container}>
        {ROOMS.map((room) => {
          const works = WORKS.filter((w) => w.room === room.id);
          return (
            <section
              key={room.id}
              id={`room-${room.id}`}
              className={s.roomBlock}
              aria-labelledby={`gn-room-${room.id}`}
            >
              <div className={s.roomHead} data-reveal>
                <span className={s.roomHeadNumeral}>{room.numeral}</span>
                <div>
                  <h2 id={`gn-room-${room.id}`} className={s.roomHeadName}>
                    <span className={s.srOnly}>Room {room.numeral}: </span>
                    {room.name}
                  </h2>
                  <p className={s.roomHeadNote}>{room.note}</p>
                </div>
              </div>
              <ol className={s.exhibit}>
                {works.map((w) => (
                  <li key={w.slug} className={s.exhibitRow} data-reveal>
                    <Link href={`${BASE}/work/${w.slug}`} className={s.exhibitLink}>
                      <span className={s.exhibitNo}>
                        <span className={s.noLabel}>No. </span>
                        {w.no}
                      </span>
                      <div>
                        <h3 className={s.exhibitTitle}>{w.title}</h3>
                        <p className={s.exhibitSub}>{w.subtitle}</p>
                      </div>
                      <p className={s.exhibitMedium}>{w.medium}</p>
                      <span className={s.exhibitYear}>{w.year}</span>
                      <img
                        className={s.exhibitThumb}
                        src={w.cover.src}
                        width={w.cover.width}
                        height={w.cover.height}
                        alt=""
                        loading="lazy"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </>
  );
}
