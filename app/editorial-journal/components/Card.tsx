import Link from "next/link";
import type { Item } from "../data";
import s from "../journal.module.css";

export default function Card({ item, wide = false }: { item: Item; wide?: boolean }) {
  const href = `/editorial-journal/work/${item.slug}`;
  return (
    <article className={`${s.card} ${wide ? s.cardWide : ""}`}>
      <Link href={href} className={s.cardFigure} tabIndex={-1} aria-hidden="true">
        <img
          src={item.image.src}
          alt=""
          width={item.image.w}
          height={item.image.h}
          loading="lazy"
          className={s.cardImg}
        />
      </Link>
      <div className={s.cardText}>
        <p className={s.kicker}>{item.kicker}</p>
        <h3 className={s.cardTitle}>
          <Link href={href}>{item.title}</Link>
        </h3>
        <p className={s.cardDek}>{item.dek}</p>
        <p className={s.meta}>
          {item.date} &middot; {item.read}
        </p>
      </div>
    </article>
  );
}
