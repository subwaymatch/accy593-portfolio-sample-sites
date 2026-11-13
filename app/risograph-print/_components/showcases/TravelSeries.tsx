import s from "./showcase.module.css";

const prints = [
  {
    src: "/risograph-print/travel-lisbon.webp",
    w: 1024,
    h: 1536,
    alt: "Risograph print of a yellow tram climbing a steep cobbled street in Lisbon between tiled buildings with laundry on the balconies.",
    place: "Lisbon",
    when: "March 2025",
    note: "The 28 tram, from the bottom of a hill I had just walked up. Four layers; the yellow drum did most of the work.",
  },
  {
    src: "/risograph-print/travel-lagos.webp",
    w: 1200,
    h: 800,
    alt: "Risograph print of a busy Lagos market with umbrellas, baskets of tomatoes and peppers, and a yellow minibus behind.",
    place: "Lagos",
    when: "December 2024",
    note: "A market near my grandmother's. My aunt bargained for the peppers while I pretended not to take photos.",
  },
  {
    src: "/risograph-print/travel-chicago.webp",
    w: 1200,
    h: 800,
    alt: "Risograph print of the Chicago lakefront at sunrise with the skyline, a cyclist on the path and a lifeguard chair on the sand.",
    place: "Chicago",
    when: "July 2025",
    note: "The lakefront path at 6 a.m., the only time it is quiet. Orange over teal gave the water that grey-green.",
  },
];

export default function TravelSeries() {
  return (
    <div className={s.zine}>
      {prints.map((p, i) => (
        <figure key={p.place} className={`${s.zinePrint} ${i === 0 ? s.zineTall : ""}`}>
          <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
          <figcaption>
            <span className={s.zinePlace}>
              {String(i + 1).padStart(2, "0")} · {p.place}
            </span>
            <span className={s.zineWhen}>{p.when}</span>
            <span className={s.zineNote}>{p.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
