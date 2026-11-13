import s from "./showcase.module.css";

type Tier = "Non-conference" | "Marquee" | "Conference" | "Rivalry";

// SAMPLE DATA: invented for practice, modelled on a 15,500-seat arena. Not any real school's figures.
const CAPACITY = 15500;
const games: { date: string; day: string; opp: string; tier: Tier; price: number; att: number }[] = [
  { date: "Nov 7", day: "Tue", opp: "Eastern Ridge", tier: "Non-conference", price: 18, att: 9850 },
  { date: "Nov 11", day: "Fri", opp: "Lakeshore A&M", tier: "Non-conference", price: 18, att: 11420 },
  { date: "Nov 15", day: "Tue", opp: "Prairie State", tier: "Non-conference", price: 16, att: 9120 },
  { date: "Nov 22", day: "Sat", opp: "Coastal Tech", tier: "Marquee", price: 32, att: 14980 },
  { date: "Dec 2", day: "Sat", opp: "Mid-Valley", tier: "Non-conference", price: 20, att: 12640 },
  { date: "Dec 9", day: "Sat", opp: "Northern Pines", tier: "Marquee", price: 34, att: 15210 },
  { date: "Dec 21", day: "Thu", opp: "Riverbend", tier: "Non-conference", price: 15, att: 8760 },
  { date: "Jan 3", day: "Wed", opp: "Granite State", tier: "Conference", price: 28, att: 12300 },
  { date: "Jan 10", day: "Sat", opp: "Lake Erie", tier: "Conference", price: 30, att: 14650 },
  { date: "Jan 17", day: "Tue", opp: "Ohio Valley", tier: "Conference", price: 26, att: 12050 },
  { date: "Jan 24", day: "Sat", opp: "Rival U", tier: "Rivalry", price: 45, att: 15500 },
  { date: "Feb 1", day: "Thu", opp: "Twin Rivers", tier: "Conference", price: 28, att: 13420 },
  { date: "Feb 8", day: "Sun", opp: "Great Plains", tier: "Conference", price: 30, att: 14210 },
  { date: "Feb 15", day: "Tue", opp: "Bluff City", tier: "Conference", price: 27, att: 12880 },
  { date: "Feb 22", day: "Sat", opp: "Capital State", tier: "Marquee", price: 40, att: 15480 },
  { date: "Mar 1", day: "Sat", opp: "Hawkeye Valley", tier: "Conference", price: 32, att: 15350 },
];

const tierColour: Record<Tier, string> = {
  "Non-conference": "#ffc61a",
  Marquee: "#00877d",
  Conference: "#2449c8",
  Rivalry: "#ff6a3d",
};

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export default function TicketChart() {
  const W = 800;
  const H = 390;
  const m = { l: 58, r: 58, t: 22, b: 66 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const slot = pw / games.length;
  const barW = slot * 0.62;
  const yFill = (f: number) => m.t + ph * (1 - f);
  const yPrice = (p: number) => m.t + ph * (1 - p / 50);
  const cx = (i: number) => m.l + slot * i + slot / 2;

  const fills = games.map((g) => g.att / CAPACITY);
  const avgFill = fills.reduce((a, b) => a + b, 0) / games.length;
  const gate = games.reduce((a, g) => a + g.att * g.price, 0);
  const weekday = games.filter((g) => ["Mon", "Tue", "Wed", "Thu"].includes(g.day));
  const weekend = games.filter((g) => !weekday.includes(g));
  const fillOf = (arr: typeof games) => arr.reduce((a, g) => a + g.att / CAPACITY, 0) / arr.length;
  const nearCap = games.filter((g) => g.att / CAPACITY > 0.97).length;

  const pricePath = games.map((g, i) => `${i === 0 ? "M" : "L"}${cx(i).toFixed(1)},${yPrice(g.price).toFixed(1)}`).join(" ");

  return (
    <div className={s.stack}>
      <div className={s.stats}>
        <div className={s.stat}>
          <span className={s.statNum}>{pct(avgFill)}</span>
          <span className={s.statLabel}>average seats filled</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>
            {Math.round(fillOf(weekday) * 100)}% / {Math.round(fillOf(weekend) * 100)}%
          </span>
          <span className={s.statLabel}>weekday vs weekend fill</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>{nearCap} games</span>
          <span className={s.statLabel}>above 97% of capacity</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>${(gate / 1e6).toFixed(2)}M</span>
          <span className={s.statLabel}>sample gate revenue</span>
        </div>
      </div>

      <figure className={s.figure}>
        <ul className={s.legend} aria-hidden="true">
          {(Object.keys(tierColour) as Tier[]).map((t) => (
            <li key={t}>
              <span className={s.swatch} style={{ background: tierColour[t] }} />
              {t}
            </li>
          ))}
          <li>
            <span className={s.lineSwatch} />
            Avg. paid price
          </li>
        </ul>
        <svg
          className={s.chart}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby="ticket-chart-title ticket-chart-desc"
        >
          <title id="ticket-chart-title">Share of seats filled and average ticket price, 16 home games (sample data)</title>
          <desc id="ticket-chart-desc">
            Bars show attendance as a share of a 15,500-seat capacity for each home game, coloured by opponent tier. A
            line shows the average paid ticket price on the right axis. Weekday non-conference games are the emptiest,
            around 57 to 64 percent full, while the rivalry and marquee weekend games are almost sold out.
          </desc>
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <g key={f}>
              <line x1={m.l} x2={W - m.r} y1={yFill(f)} y2={yFill(f)} stroke="#1b2250" strokeOpacity={f === 0 ? 1 : 0.18} strokeWidth={f === 0 ? 2 : 1} strokeDasharray={f === 0 ? undefined : "3 4"} />
              <text x={m.l - 10} y={yFill(f) + 4} textAnchor="end" className={s.axis}>
                {f * 100}%
              </text>
              <text x={W - m.r + 10} y={yFill(f) + 4} className={s.axis}>
                ${f * 50}
              </text>
            </g>
          ))}
          {games.map((g, i) => (
            <g key={g.date}>
              <rect
                x={cx(i) - barW / 2 + 3}
                y={yFill(fills[i]) + 3}
                width={barW}
                height={ph * fills[i]}
                fill="#ff6a3d"
                opacity={0.35}
              />
              <rect
                x={cx(i) - barW / 2}
                y={yFill(fills[i])}
                width={barW}
                height={ph * fills[i]}
                fill={tierColour[g.tier]}
                stroke="#1b2250"
                strokeWidth={1.5}
              >
                <title>{`${g.date} vs ${g.opp} (${g.day}): ${g.att.toLocaleString("en-US")} fans, ${pct(fills[i])} full, $${g.price} average`}</title>
              </rect>
              <text x={cx(i)} y={H - m.b + 20} textAnchor="middle" className={s.axis}>
                {g.date}
              </text>
              <text x={cx(i)} y={H - m.b + 36} textAnchor="middle" className={s.axisDim}>
                {g.day}
              </text>
            </g>
          ))}
          <path d={pricePath} fill="none" stroke="#1b2250" strokeWidth={2.5} strokeLinejoin="round" />
          {games.map((g, i) => (
            <circle key={g.date} cx={cx(i)} cy={yPrice(g.price)} r={4.5} fill="#fbf8f1" stroke="#1b2250" strokeWidth={2} />
          ))}
          <text x={m.l - 44} y={m.t - 8} className={s.axisDim}>
            Seats filled
          </text>
          <text x={W - m.r + 44} y={m.t - 8} textAnchor="end" className={s.axisDim}>
            Price
          </text>
        </svg>
        <figcaption className={s.caption}>
          Sample data I created for practice: 16 home games in a 15,500-seat arena. Bars show the share of seats
          filled, coloured by opponent tier. The line is the average paid ticket price (right axis).
        </figcaption>
      </figure>

      <div className={s.memo}>
        <h3 className={s.memoTitle}>What the chart says</h3>
        <ol className={s.memoList}>
          <li>
            <strong>The problem is narrow.</strong> The three weekday non-conference games averaged 59.6% full.
            Everything else is above 73%.
          </li>
          <li>
            <strong>Cutting those three to $12 is roughly neutral on the gate.</strong> If attendance rises 22 to 30%,
            ticket revenue falls by $22,000 to $49,000, but 6,100 to 8,300 extra fans at about $9 a head in
            concessions bring in $55,000 to $75,000. Net: flat to +$53,000, and a louder building in November.
          </li>
          <li>
            <strong>The near-sellouts were underpriced.</strong> Adding $4 to the four games above 97% capacity, even if
            3% of buyers walk away, adds about $169,000.
          </li>
        </ol>
        <p className={s.memoNote}>
          Recommendation: move from three tiers to five, raise the marquee and rivalry tier, and sell weekday
          non-conference games at $12 with a student guest bundle. Then measure it properly next season.
        </p>
      </div>
    </div>
  );
}
