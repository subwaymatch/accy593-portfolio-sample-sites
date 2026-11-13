import s from "./showcase.module.css";

const key = [
  {
    n: "1",
    name: "Foellinger Auditorium",
    note: "The dome at the south end. Big lectures, and the steps are the best place to wait for someone.",
  },
  {
    n: "2",
    name: "Illini Union",
    note: "North end. Coffee, printers, and the warmest place to cross through in January.",
  },
  {
    n: "3",
    name: "The diagonal",
    note: "The dotted orange path. Cutting corner to corner saves about three minutes and is how you spot who is a first-year.",
  },
  {
    n: "4",
    name: "Business Instructional Facility",
    note: "Just off the map, a few minutes east. Where most of my classes are, and the study rooms you can book.",
  },
];

export default function CampusMap() {
  return (
    <div className={s.mapWrap}>
      <figure className={s.mapFigure}>
        <img
          src="/risograph-print/campus-map.webp"
          alt="Illustrated map of the Main Quad: a long lawn with crisscrossing paths and trees, a domed auditorium at one end, a columned building at the other, students and bikes on the paths, and dotted orange walking routes."
          width={1200}
          height={800}
          loading="lazy"
        />
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
