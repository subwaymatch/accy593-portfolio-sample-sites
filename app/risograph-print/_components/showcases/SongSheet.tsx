import s from "./showcase.module.css";

// ChordPro-style: [Chord] goes above the syllable that follows it.
const song: { part: string; lines: string[] }[] = [
  {
    part: "Verse 1",
    lines: [
      "[G]Left Urbana after dark with the [Em]heater up high,",
      "[C]fields gone silver in the [D]passing headlights.",
      "[G]You said call when you get there, I [Em]said I'd call before,",
      "[C]every grain elevator looks like the [D]one I saw before.",
    ],
  },
  {
    part: "Chorus",
    lines: [
      "[C]Route 45 [G]north, the [D]radio fading [Em]out,",
      "[C]counting mile [G]markers like I'm [D]paying something down.",
      "[C]I keep a ledger for the [G]gas and a [D]ledger for the [Em]rest,",
      "[C]and the rest is never [D]balanced, but I'm [G]doing my best.",
    ],
  },
  {
    part: "Verse 2",
    lines: [
      "[G]Kankakee at midnight, one [Em]gas station glow,",
      "[C]the kid behind the counter asks me [D]where I go.",
      "[G]I say north to my mother's, he says [Em]that's a long way,",
      "[C]I say it's shorter every time and it's [D]longer every day.",
    ],
  },
  {
    part: "Bridge",
    lines: [
      "[Am]Debits on the left side, [C]credits on the right,",
      "[Am]nobody ever told me how to [D]carry over a night.",
    ],
  },
  {
    part: "Last chorus",
    lines: [
      "[C]Route 45 [G]north, the [D]porch light coming [Em]on,",
      "[C]every mile I [G]counted is a [D]mile I'm getting home.",
      "[C]I still keep a ledger for the [G]gas and a [D]ledger for the [Em]rest,",
      "[C]and the rest is never [D]balanced, but I'm [G]doing my best.",
    ],
  },
];

// frets per string low E to high e; -1 = muted
const shapes: Record<string, number[]> = {
  G: [3, 2, 0, 0, 0, 3],
  Em: [0, 2, 2, 0, 0, 0],
  C: [-1, 3, 2, 0, 1, 0],
  D: [-1, -1, 0, 2, 3, 2],
  Am: [-1, 0, 2, 2, 1, 0],
};

function ChordDiagram({ name, frets }: { name: string; frets: number[] }) {
  const sx = (i: number) => 14 + i * 14;
  const fy = (f: number) => 26 + f * 18;
  return (
    <figure className={s.chordFig}>
      <svg viewBox="0 0 98 110" role="img" aria-label={`${name} chord: ${frets.map((f) => (f < 0 ? "x" : f)).join(" ")}`}>
        <rect x={14} y={24} width={70} height={4} fill="#1b2250" />
        {[0, 1, 2, 3, 4].map((f) => (
          <line key={f} x1={14} x2={84} y1={fy(f) + 2} y2={fy(f) + 2} stroke="#1b2250" strokeWidth={1.2} opacity={0.6} />
        ))}
        {frets.map((_, i) => (
          <line key={i} x1={sx(i)} x2={sx(i)} y1={26} y2={fy(4) + 2} stroke="#1b2250" strokeWidth={1.4} />
        ))}
        {frets.map((f, i) =>
          f < 0 ? (
            <text key={i} x={sx(i)} y={18} textAnchor="middle" className={s.chordMark}>
              ×
            </text>
          ) : f === 0 ? (
            <circle key={i} cx={sx(i)} cy={13} r={4} fill="none" stroke="#1b2250" strokeWidth={1.5} />
          ) : (
            <g key={i}>
              <circle cx={sx(i) + 1.5} cy={fy(f) - 7} r={6} fill="#ff6a3d" opacity={0.7} />
              <circle cx={sx(i)} cy={fy(f) - 8} r={6} fill="#2449c8" />
            </g>
          ),
        )}
      </svg>
      <figcaption>{name}</figcaption>
    </figure>
  );
}

function LyricLine({ line }: { line: string }) {
  // split "[G]words [Em]more" into segments
  const parts = line.split(/(?=\[)/);
  return (
    <p className={s.lyricLine}>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\](.*)$/);
        const chord = m ? m[1] : "";
        const words = m ? m[2] : p;
        return (
          <span key={i} className={s.seg}>
            <span className={s.chord} aria-hidden={chord ? undefined : true}>
              {chord || " "}
            </span>
            <span className={s.words}>{words || " "}</span>
          </span>
        );
      })}
    </p>
  );
}

export default function SongSheet() {
  return (
    <div className={s.songGrid}>
      <aside className={s.songAside}>
        <p className={s.songMeta}>
          <strong>Key of G</strong> · capo 2 · about 76 bpm
          <br />
          Strum: down, down-up, down-up
        </p>
        <div className={s.chordRow}>
          {Object.entries(shapes).map(([n, f]) => (
            <ChordDiagram key={n} name={n} frets={f} />
          ))}
        </div>
      </aside>
      <div className={s.lyrics}>
        <h3 className={s.songTitle}>Route 45 North</h3>
        <p className={s.songBy}>words &amp; music by Liam Okafor</p>
        {song.map((sec) => (
          <section key={sec.part} className={s.songPart}>
            <h4>{sec.part}</h4>
            {sec.lines.map((l) => (
              <LyricLine key={l} line={l} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
