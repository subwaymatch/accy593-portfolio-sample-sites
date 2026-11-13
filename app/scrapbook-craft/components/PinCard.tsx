import Link from "next/link";
import type { CSSProperties } from "react";
import type { WorkItem } from "../data";
import s from "../scrapbook.module.css";

export default function PinCard({ item, lazy = true }: { item: WorkItem; lazy?: boolean }) {
  const style = { "--tilt": `${item.tilt}deg` } as CSSProperties;
  const tapeClass = s[`tape_${item.tape}`];
  const isIndex = item.card === "index";
  return (
    <li className={s.pin} style={style}>
      <span className={`${s.tape} ${tapeClass}`} aria-hidden="true" />
      <Link href={`/scrapbook-craft/work/${item.slug}`} className={s.pinLink}>
        <article className={isIndex ? s.indexCard : s.polaroid}>
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.w}
            height={item.image.h}
            loading={lazy ? "lazy" : "eager"}
          />
          <div className={`${s.cardBody} ${isIndex ? s.ruled : ""}`}>
            <p className={s.cardCaption}>{item.caption}</p>
            <h3 className={s.cardTitle}>{item.title}</h3>
            <p className={s.cardText}>{item.summary.split(". ")[0].replace(/\.$/, "")}.</p>
            <p className={s.tagLine}>
              <span className={`${s.tag} ${item.kind === "business" ? s.tagBusiness : ""}`}>{item.tag}</span>
            </p>
          </div>
        </article>
      </Link>
    </li>
  );
}
