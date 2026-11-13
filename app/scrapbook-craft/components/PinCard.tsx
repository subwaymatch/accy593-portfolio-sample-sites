import Link from "next/link";
import type { CSSProperties } from "react";
import type { WorkItem } from "../data";
import s from "../scrapbook.module.css";

export default function PinCard({ item, lazy = true }: { item: WorkItem; lazy?: boolean }) {
  const style = { "--tilt": `${item.tilt}deg` } as CSSProperties;
  const tapeClass = s[`tape_${item.tape}`];
  return (
    <li className={s.pin} style={style}>
      <span className={`${s.tape} ${tapeClass}`} aria-hidden="true" />
      <Link href={`/scrapbook-craft/work/${item.slug}`} className={s.pinLink}>
        <article className={item.card === "polaroid" ? s.polaroid : s.indexCard}>
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.w}
            height={item.image.h}
            loading={lazy ? "lazy" : "eager"}
          />
          <p className={s.cardCaption}>{item.caption}</p>
          <h3 className={s.cardTitle}>{item.title}</h3>
          <p className={s.cardText}>{item.summary.split(". ")[0].replace(/\.$/, "")}.</p>
          <span className={`${s.tag} ${item.kind === "business" ? s.tagBusiness : ""}`}>{item.tag}</span>
        </article>
      </Link>
    </li>
  );
}
