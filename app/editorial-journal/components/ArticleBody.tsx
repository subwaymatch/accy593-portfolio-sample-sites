import type { Block } from "../data";
import BenfordChart from "./BenfordChart";
import HomesDemo from "./HomesDemo";
import Newsletter from "./Newsletter";
import s from "../journal.module.css";

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  let firstP = true;
  return (
    <div className={s.body}>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p": {
            const cls = firstP ? s.dropcap : undefined;
            firstP = false;
            return (
              <p key={i} className={cls}>
                {b.text}
              </p>
            );
          }
          case "h":
            return (
              <h2 key={i} className={s.bodyH}>
                {b.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i} className={s.pull}>
                <p>{b.text}</p>
                {b.cite && <cite>{b.cite}</cite>}
              </blockquote>
            );
          case "list": {
            const L = b.ordered ? "ol" : "ul";
            return (
              <L key={i} className={b.ordered ? s.olist : s.ulist}>
                {b.items.map((it, j) => {
                  const dot = it.indexOf(". ");
                  const lead = dot > 0 && dot < 40 ? it.slice(0, dot + 1) : null;
                  return (
                    <li key={j}>
                      {lead ? (
                        <>
                          <strong>{lead}</strong>
                          {it.slice(dot + 1)}
                        </>
                      ) : (
                        it
                      )}
                    </li>
                  );
                })}
              </L>
            );
          }
          case "img":
            return (
              <figure key={i} className={s.inlineFigure}>
                <img src={b.img.src} alt={b.img.alt} width={b.img.w} height={b.img.h} loading="lazy" />
                {b.img.caption && <figcaption className={s.caption}>{b.img.caption}</figcaption>}
              </figure>
            );
          case "poem":
            return (
              <section key={i} className={s.poem}>
                <h2 className={s.poemTitle}>{b.title}</h2>
                {b.lines.map((l, j) => (
                  <span key={j} className={s.poemLine}>
                    {l}
                  </span>
                ))}
              </section>
            );
          case "table":
            return (
              <div key={i} className={s.tableWrap}>
                <table className={s.table}>
                  <caption>{b.caption}</caption>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (k === 0 ? <th key={k} scope="row">{c}</th> : <td key={k}>{c}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "outline":
            return (
              <ol key={i} className={s.outline}>
                {b.items.map((o) => (
                  <li key={o.time}>
                    <span className={s.outlineTime}>{o.time}</span>
                    <span>
                      <strong>{o.title}.</strong> {o.note}
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "transcript":
            return (
              <div key={i} className={s.transcript}>
                {b.lines.map((l, j) => (
                  <p key={j}>
                    <span className={s.speaker}>{l.who}</span> {l.text}
                  </p>
                ))}
              </div>
            );
          case "benford":
            return <BenfordChart key={i} />;
          case "newsletter":
            return <Newsletter key={i} />;
          case "homes":
            return <HomesDemo key={i} />;
        }
      })}
    </div>
  );
}
