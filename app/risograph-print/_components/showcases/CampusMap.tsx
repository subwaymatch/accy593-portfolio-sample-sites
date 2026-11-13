import s from "./showcase.module.css";

const key = [
  {
    n: "1",
    x: 41,
    y: 9,
    name: "Foellinger Auditorium",
    note: "The dome. I drew the map with south at the top, because that is the view you get walking out of the Union. Big lectures, and the steps are the best place to wait for someone.",
  },
  {
    n: "2",
    x: 36,
    y: 79,
    name: "Illini Union",
    note: "The columns at the bottom. Coffee, printers, and the warmest place to cut through in January.",
  },
  {
    n: "3",
    x: 57,
    y: 40,
    name: "The diagonals",
    note: "Cutting corner to corner through the middle saves about three minutes. Walking the long way round the edge is how you spot a first-year.",
  },
  {
    n: "4",
    x: 93,
    y: 52,
    name: "Business Instructional Facility",
    note: "Off the edge of the map, a few minutes away. Where most of my classes are, and the study rooms you can book.",
  },
];

export default function CampusMap() {
  return (
    <div className={s.mapWrap}>
      <figure className={s.mapFigure}>
        <div className={s.mapCanvas}>
          <img
            src="/risograph-print/campus-map.webp"
            alt="Illustrated map of the Main Quad: a long lawn with crisscrossing paths and trees, a domed auditorium at one end, a columned building at the other, students and bikes on the paths, and dotted orange walking routes."
            width={1200}
            height={800}
            loading="lazy"
          />
          {key.map((k) => (
            <span key={k.n} className={s.mapPin} style={{ left: `${k.x}%`, top: `${k.y}%` }} aria-hidden="true">
              {k.n === "4" ? "4→" : k.n}
            </span>
          ))}
        </div>
        <figcaption className={s.caption}>The finished print. Not to scale, on purpose.</figcaption>
      </figure>
      <ol className={s.mapKey}>
        {key.map((k) => (
          <li key={k.n}>
            <span className={s.mapNum}>{k.n}</span>
            <div>
              <strong>{k.name}</strong>
              <p>{k.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
