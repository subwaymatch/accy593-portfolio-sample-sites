import Link from "next/link";
import { indexOf, type WorkItem } from "./data";
import s from "./site.module.css";

export default function WorkRow({ item, showThumb = true }: { item: WorkItem; showThumb?: boolean }) {
  return (
    <li className={s.row}>
      <Link href={`/swiss-minimal/work/${item.slug}`} className={s.rowLink}>
        <span className={s.rowNum} aria-hidden="true">
          {indexOf(item.slug)}
        </span>
        <span className={s.rowTitle}>
          <span className={s.h3}>{item.title}</span>
          {showThumb &&
            (item.image ? (
              <span className={s.rowThumb}>
                <img src={item.image.src} width={item.image.width} height={item.image.height} alt="" loading="lazy" />
              </span>
            ) : (
              <span className={`${s.rowThumb} ${s.rowThumbType}`} aria-hidden="true">
                Essay
              </span>
            ))}
        </span>
        <span className={s.rowSummary}>{item.summary}</span>
        <span className={s.rowMeta}>
          <span className={`${s.tag} ${item.track === "Business" ? s.tagBiz : ""}`}>{item.category}</span>
          <br />
          <span className={s.muted}>{item.year}</span>
        </span>
      </Link>
    </li>
  );
}
