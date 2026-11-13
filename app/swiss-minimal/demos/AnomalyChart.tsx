import d from "./demos.module.css";

/* Synthetic sample data: generated with a fixed seed so it renders identically every time. */
type Entry = { id: string; hour: number; amount: number; user: string; flagged: boolean; day: string };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const USERS = ["AP01", "AP02", "GL03", "GL04", "GL05", "FIN07", "CTRL1"];

function buildEntries(): Entry[] {
  const rand = mulberry32(593);
  const out: Entry[] = [];
  for (let i = 0; i < 232; i++) {
    // Business-hours posting with a little spread into the evening.
    const hour = Math.min(23.5, Math.max(6.5, 8 + rand() * 9.5 + (rand() < 0.08 ? rand() * 4 : 0)));
    // Right-skewed amounts, mostly under $15k.
    const amount = Math.round(Math.min(23500, 400 + Math.pow(rand(), 2.2) * 22000) / 10) * 10;
    out.push({ id: `JE-${(10412 + i * 7).toString()}`, hour, amount, user: USERS[Math.floor(rand() * USERS.length)], flagged: false, day: "" });
  }
  // Seeded issues: after-hours postings just below the $25,000 approval limit.
  const seeded: [number, number, string, string][] = [
    [23.2, 24650, "GL05", "Sat 14 Mar"],
    [1.4, 24900, "GL05", "Sun 15 Mar"],
    [22.6, 24300, "FIN07", "Fri 26 Jun"],
    [2.8, 24980, "GL05", "Mon 29 Jun"],
    [4.1, 24120, "CTRL1", "Thu 31 Dec"],
    [23.7, 24750, "GL05", "Thu 31 Dec"],
  ];
  seeded.forEach(([hour, amount, user, day], k) =>
    out.push({ id: `JE-${19870 + k * 13}`, hour, amount, user, flagged: true, day }),
  );
  return out;
}

const entries = buildEntries();
const flagged = entries.filter((e) => e.flagged);

const BENFORD = [
  { digit: 1, expected: 30.1, observed: 28.1 },
  { digit: 2, expected: 17.6, observed: 21.4 },
  { digit: 3, expected: 12.5, observed: 12.0 },
  { digit: 4, expected: 9.7, observed: 9.1 },
  { digit: 5, expected: 7.9, observed: 7.4 },
  { digit: 6, expected: 6.7, observed: 6.2 },
  { digit: 7, expected: 5.8, observed: 5.6 },
  { digit: 8, expected: 5.1, observed: 5.0 },
  { digit: 9, expected: 4.6, observed: 5.2 },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const hh = (h: number) => {
  const H = Math.floor(h);
  const m = Math.round((h - H) * 60);
  return `${String(H).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

function Scatter({ w, h, compact }: { w: number; h: number; compact?: boolean }) {
  const m = { t: 20, r: compact ? 12 : 24, b: 44, l: compact ? 44 : 64 };
  const iw = w - m.l - m.r;
  const ih = h - m.t - m.b;
  const x = (hour: number) => m.l + (hour / 24) * iw;
  const y = (amt: number) => m.t + ih - (amt / 30000) * ih;
  const xTicks = compact ? [0, 6, 12, 18, 24] : [0, 3, 6, 9, 12, 15, 18, 21, 24];
  const yTicks = [0, 10000, 20000, 30000];
  const fs = compact ? 11 : 12;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={d.svg}
      role="img"
      aria-label="Scatter plot of 238 sample journal entries by posting hour and amount. Six entries posted between 10 p.m. and 5 a.m. with amounts just under the $25,000 approval limit are flagged."
    >
      {/* after-hours bands */}
      <rect x={x(0)} y={m.t} width={x(5) - x(0)} height={ih} fill="#f2f2f2" />
      <rect x={x(22)} y={m.t} width={x(24) - x(22)} height={ih} fill="#f2f2f2" />
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#000" : "#ddd"} strokeWidth={1} />
          <text x={m.l - 8} y={y(t) + 4} textAnchor="end" fontSize={fs} fill="#555">
            {t === 0 ? "$0" : `$${t / 1000}k`}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={h - m.b + 18} textAnchor="middle" fontSize={fs} fill="#555">
          {String(t).padStart(2, "0")}:00
        </text>
      ))}
      <text x={m.l + iw / 2} y={h - 6} textAnchor="middle" fontSize={fs} fill="#000">
        Posting time (24 h)
      </text>
      {/* approval limit */}
      <line x1={m.l} x2={w - m.r} y1={y(25000)} y2={y(25000)} stroke="#000" strokeWidth={1.5} strokeDasharray="6 4" />
      <text x={w - m.r - 4} y={y(25000) - 8} textAnchor="end" fontSize={fs} fill="#000" fontWeight={600}>
        Approval limit $25,000
      </text>
      {entries
        .filter((e) => !e.flagged)
        .map((e) => (
          <circle key={e.id} cx={x(e.hour)} cy={y(e.amount)} r={compact ? 3 : 4} fill="#8a8a8a" fillOpacity={0.55}>
            <title>{`${e.id} · ${hh(e.hour)} · ${usd(e.amount)}`}</title>
          </circle>
        ))}
      {flagged.map((e) => (
        <rect
          key={e.id}
          x={x(e.hour) - 5}
          y={y(e.amount) - 5}
          width={10}
          height={10}
          fill="#e30613"
          stroke="#fff"
          strokeWidth={2}
        >
          <title>{`Flagged ${e.id} · ${e.day} ${hh(e.hour)} · ${usd(e.amount)} · ${e.user}`}</title>
        </rect>
      ))}
    </svg>
  );
}

function BenfordChart() {
  const w = 560;
  const h = 260;
  const m = { t: 16, r: 12, b: 40, l: 40 };
  const iw = w - m.l - m.r;
  const ih = h - m.t - m.b;
  const band = iw / 9;
  const y = (v: number) => m.t + ih - (v / 35) * ih;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={d.svg} role="img" aria-label="Bar chart of first-digit frequencies for 612 sample manual entries compared with Benford's expected frequencies. Digit 2 is 21.4 percent observed against 17.6 percent expected.">
      {[0, 10, 20, 30].map((t) => (
        <g key={t}>
          <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#000" : "#ddd"} />
          <text x={m.l - 8} y={y(t) + 4} textAnchor="end" fontSize={13} fill="#555">
            {t}%
          </text>
        </g>
      ))}
      {BENFORD.map((b, i) => {
        const cx = m.l + band * i + band / 2;
        const bw = band * 0.56;
        const over = b.digit === 2;
        return (
          <g key={b.digit}>
            <rect x={cx - bw / 2} y={y(b.observed)} width={bw} height={y(0) - y(b.observed)} fill={over ? "#e30613" : "#1a1a1a"}>
              <title>{`Digit ${b.digit}: observed ${b.observed}%, expected ${b.expected}%`}</title>
            </rect>
            <line x1={cx - bw / 2 - 6} x2={cx + bw / 2 + 6} y1={y(b.expected)} y2={y(b.expected)} stroke="#000" strokeWidth={2} />
            <text x={cx} y={h - m.b + 20} textAnchor="middle" fontSize={14} fill="#000" fontWeight={600}>
              {b.digit}
            </text>
            {over && (
              <text x={cx + bw / 2 + 10} y={y(b.observed) + 4} fontSize={13} fill="#000" fontWeight={600}>
                21.4% vs 17.6%
              </text>
            )}
          </g>
        );
      })}
      <text x={m.l + iw / 2} y={h - 4} textAnchor="middle" fontSize={13} fill="#000">
        Leading digit
      </text>
    </svg>
  );
}

export default function AnomalyChart() {
  return (
    <div className={d.block}>
      <p className={d.label}>Figure 1 · Sample data</p>
      <h3 className={d.title}>A 238-entry sample, by posting time and amount</h3>
      <p className={d.note}>
        Synthetic entries generated for illustration (fixed random seed), not client data. Shaded areas are
        after-hours (22:00 to 05:00). Hover a mark for its details.
      </p>
      <div className={d.legend}>
        <span>
          <i className={d.keyDot} /> Entry, no rule or one rule tripped
        </span>
        <span>
          <i className={d.keySquare} /> Flagged: after hours and within $1,000 of the limit
        </span>
      </div>
      <div className={d.chartWide}>
        <Scatter w={960} h={420} />
      </div>
      <div className={d.chartNarrow}>
        <Scatter w={360} h={320} compact />
      </div>

      <div className={d.split}>
        <div>
          <p className={d.label}>Table 1 · Review list</p>
          <div className={d.tableWrap}>
            <table className={d.table}>
              <thead>
                <tr>
                  <th scope="col">Entry</th>
                  <th scope="col">Posted</th>
                  <th scope="col">User</th>
                  <th scope="col" className={d.num}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {flagged.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>
                      {e.day}, {hh(e.hour)}
                    </td>
                    <td>{e.user}</td>
                    <td className={d.num}>{usd(e.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={d.note}>Four of six flagged entries came from one user ID, GL05. That is where I would start.</p>
        </div>
        <div>
          <p className={d.label}>Figure 2 · Sample data</p>
          <h3 className={d.title}>First digits of 612 manual entries</h3>
          <div className={d.legend}>
            <span>
              <i className={d.keyBar} /> Observed share
            </span>
            <span>
              <i className={d.keyTick} /> Benford expected
            </span>
          </div>
          <BenfordChart />
          <p className={d.note}>
            The excess at digit 2 is consistent with many entries landing in the $20,000 to $24,999 range.
          </p>
        </div>
      </div>
    </div>
  );
}
