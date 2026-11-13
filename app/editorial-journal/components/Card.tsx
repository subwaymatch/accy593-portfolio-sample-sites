import Link from "next/link";
import type { Item } from "../data";
import s from "../journal.module.css";

function excerpt(item: Item, max = 260) {
  const first = item.body.find((b) => b.t === "p");
  if (!first || first.t !== "p") return "";
  if (first.text.length <= max) return first.text;
  const cut = first.text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

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
        {wide && <p className={s.cardExcerpt}>{excerpt(item)}</p>}
        <p className={s.meta}>
          {item.date} &middot; {item.read}
        </p>
        {wide && (
          <Link href={href} className={s.more}>
            Read the piece <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </article>
  );
}
