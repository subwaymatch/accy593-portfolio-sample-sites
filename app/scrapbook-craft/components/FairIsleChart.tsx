/** Knitting chart for the wheat-sheaf yoke band: one 12-stitch repeat, shown twice. */
const REPEAT = [
  "rrrrrrrrrrrr",
  "ssssssssssss",
  "sssssmssssss",
  "ssmssmssmsss",
  "sssmsmsmssss",
  "ssssmmmsssss",
  "sssmsmsmssss",
  "ssssmmmsssss",
  "sssssmssssss",
  "sssscccsssss",
  "sssssmssssss",
  "ssssmsmsssss",
  "ssssssssssss",
  "rrrrrrrrrrrr",
];

const COLORS: Record<string, { fill: string; name: string }> = {
  s: { fill: "#7f9670", name: "Sage (main color)" },
  m: { fill: "#d9a336", name: "Mustard" },
  c: { fill: "#f6ecd6", name: "Cream" },
  r: { fill: "#b8562f", name: "Rust" },
};

const CELL = 16;

export default function FairIsleChart() {
  const repeats = 2;
  const cols = REPEAT[0].length * repeats;
  const rows = REPEAT.length;
  return (
    <figure style={{ margin: "1.25rem 0" }}>
      <svg
        viewBox={`0 0 ${cols * CELL} ${rows * CELL}`}
        width={cols * CELL}
        height={rows * CELL}
        role="img"
        aria-label="Knitting chart: a wheat sheaf in mustard on a sage background, bordered by rust rows, repeating every 12 stitches"
        style={{ width: "100%", maxWidth: 440, height: "auto", display: "block", border: "2px solid #3b2c22" }}
      >
        {REPEAT.flatMap((line, y) =>
          Array.from({ length: cols }, (_, x) => {
            const key = line[x % line.length];
            return (
              <rect
                key={`${x}-${y}`}
                x={x * CELL}
                y={y * CELL}
                width={CELL}
                height={CELL}
                fill={COLORS[key].fill}
                stroke="rgba(59,44,34,0.25)"
                strokeWidth={1}
              />
            );
          }),
        )}
      </svg>
      <figcaption style={{ fontSize: "0.9rem", marginTop: "0.6rem" }}>
        Two repeats of the chart. Key:{" "}
        {Object.values(COLORS).map((c, i) => (
          <span key={c.name} style={{ whiteSpace: "nowrap" }}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                background: c.fill,
                border: "1px solid #3b2c22",
                verticalAlign: "middle",
                marginRight: 4,
              }}
            />
            {c.name}
            {i < 3 ? ", " : ""}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
