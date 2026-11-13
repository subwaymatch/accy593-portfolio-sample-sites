import s from "./showcase.module.css";

// Personal training log, miles per week.
const planned = [18, 21, 24, 20, 26, 29, 32, 26, 33, 36, 38, 30, 40, 34, 24, 14];
const actual = [17, 21, 22, 19, 26, 27, 32, 18, 31, 36, 37, 30, 38, 34, 23, 13];
const notes: Record<number, string> = {
  8: "Midterms + a cold",
  13: "Peak: 20-mile long run",
};

export default function MileageChart() {
  const W = 560;
  const H = 300;
  const m = { l: 40, r: 12, t: 28, b: 40 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const max = 45;
  const slot = pw / planned.length;
  const y = (v: number) => m.t + ph * (1 - v / max);
  const totalPlan = planned.reduce((a, b) => a + b, 0);
  const totalRun = actual.reduce((a, b) => a + b, 0);

  return (
    <div className={s.stack}>
      <div className={s.stats}>
        <div className={s.stat}>
          <span className={s.statNum}>{totalRun} mi</span>
          <span className={s.statLabel}>run in 16 weeks</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>{Math.round((totalRun / totalPlan) * 100)}%</span>
          <span className={s.statLabel}>of planned mileage</span>
        </div>
        <div className={s.stat}>
          <span className={s.statNum}>3:52:18</span>
          <span className={s.statLabel}>finish time (goal 3:45)</span>
        </div>
      </div>
      <figure className={s.figure}>
        <ul className={s.legend} aria-hidden="true">
          <li>
            <span className={s.swatch} style={{ background: "#00877d" }} />
            Miles run
          </li>
          <li>
            <span className={s.swatchOutline} />
            Planned
          </li>
        </ul>
        <svg className={s.chartNarrow} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Weekly miles, planned versus actually run, over a 16-week marathon plan. Actual mileage tracked the plan closely except week 8, which dropped to 18 miles during midterms.">
          {[0, 10, 20, 30, 40].map((v) => (
            <g key={v}>
              <line x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} stroke="#1b2250" strokeOpacity={v === 0 ? 1 : 0.18} strokeWidth={v === 0 ? 2 : 1} strokeDasharray={v === 0 ? undefined : "3 4"} />
              <text x={m.l - 8} y={y(v) + 5} textAnchor="end" className={s.axisLg}>
                {v}
              </text>
            </g>
          ))}
          {planned.map((p, i) => {
            const x = m.l + slot * i + slot * 0.15;
            const w = slot * 0.7;
            return (
              <g key={i}>
                <rect x={x} y={y(p)} width={w} height={ph * (p / max)} fill="none" stroke="#1b2250" strokeWidth={1.5} strokeDasharray="3 2" />
                <rect x={x + 3} y={y(actual[i]) + 3} width={w - 6} height={ph * (actual[i] / max) - 3} fill="#ffc61a" opacity={0.8} />
                <rect x={x + 1} y={y(actual[i])} width={w - 6} height={ph * (actual[i] / max)} fill="#00877d" opacity={0.92}>
                  <title>{`Week ${i + 1}: ran ${actual[i]} of ${p} planned miles`}</title>
                </rect>
                {(i + 1) % 2 === 1 || i === 15 ? (
                  <text x={x + w / 2} y={H - m.b + 22} textAnchor="middle" className={s.axisLg}>
                    {i + 1}
                  </text>
                ) : null}
                {notes[i + 1] && (
                  <text x={x + w / 2} y={y(Math.max(p, actual[i])) - 8} textAnchor="middle" className={s.axisNote}>
                    {notes[i + 1]}
                  </text>
                )}
              </g>
            );
          })}
          <text x={m.l} y={14} className={s.axisLg}>
            miles / week
          </text>
          <text x={W - m.r} y={H - 4} textAnchor="end" className={s.axisLg}>
            week
          </text>
        </svg>
        <figcaption className={s.caption}>My own log. Dashed outline is the plan, teal is what I actually ran.</figcaption>
      </figure>
      <div className={s.memo}>
        <h3 className={s.memoTitle}>What the spreadsheet did and did not help with</h3>
        <p>
          It helped with the boring part. Seeing planned and actual next to each other stopped me from &ldquo;making
          up&rdquo; a missed run by doubling the next one, which is how most first-timers get hurt. The cutback weeks
          (4, 8, 12) were built in, and I needed every one of them.
        </p>
        <p>
          It did not help with week 8. Two midterms and a head cold took me from 26 planned miles to 18, and no formula
          fixes that. What fixed it was deciding in advance that a bad week is a cutback week that came early, and then
          just carrying on with the plan.
        </p>
        <p>
          Race day was cold and windy on the long stretch south of town. I went out too fast, paid for it after mile 20,
          and finished on the field at Memorial Stadium in 3:52:18. I will be back next April.
        </p>
      </div>
    </div>
  );
}
