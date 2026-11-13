"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../terminal.module.css";

/* A minor pentatonic, A3 to E5 (MIDI note numbers) */
const SCALE = [57, 60, 62, 64, 67, 69, 72, 74, 76];
const ROOTS = [45, 41, 48, 43]; // A2, F2, C3, G2: i - VI - III - VII
const STEPS = 16;
const BPM = 100;
const STEP_SEC = 60 / BPM / 2; // eighth notes
const PASSES = 3;

type Step = { lead: number | null; bass: number | null; idx: number | null };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateMelody(seed: number): Step[] {
  const rand = mulberry32(seed);
  let i = 4; // start on E4
  const out: Step[] = [];
  for (let s = 0; s < STEPS; s++) {
    const rest = s % 4 !== 0 && rand() < 0.2;
    if (!rest) i = Math.min(SCALE.length - 1, Math.max(0, i + Math.floor(rand() * 5) - 2));
    if (s === STEPS - 1) i = 5; // resolve to A4 so the loop lands home
    out.push({
      lead: rest ? null : SCALE[i],
      idx: rest ? null : i,
      bass: s % 4 === 0 ? ROOTS[s / 4] : null,
    });
  }
  return out;
}

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);
const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const noteName = (midi: number) => `${NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;

export default function SynthPlayer() {
  const [seed, setSeed] = useState(593);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const melody = useMemo(() => generateMelody(seed), [seed]);

  const ctxRef = useRef<AudioContext | null>(null);
  const timers = useRef<number[]>([]);
  const sources = useRef<OscillatorNode[]>([]);

  const stop = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    sources.current.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    sources.current = [];
    setPlaying(false);
    setCurrent(null);
  }, []);

  useEffect(() => {
    return () => {
      stop();
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [stop]);

  // changing the seed mid-playback stops the old loop cleanly
  useEffect(() => {
    stop();
  }, [seed, stop]);

  const play = useCallback(async () => {
    stop();
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.16;
    const delay = ctx.createDelay();
    delay.delayTime.value = STEP_SEC * 1.5;
    const fb = ctx.createGain();
    fb.gain.value = 0.28;
    delay.connect(fb).connect(delay);
    delay.connect(master);
    master.connect(ctx.destination);

    const voice = (type: OscillatorType, freq: number, t: number, len: number, level: number, cutoff: number, send: boolean) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(cutoff * 2, t);
      lp.frequency.exponentialRampToValueAtTime(cutoff, t + len);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(level, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      osc.connect(lp).connect(g).connect(master);
      if (send) g.connect(delay);
      osc.start(t);
      osc.stop(t + len + 0.05);
      sources.current.push(osc);
    };

    const start = ctx.currentTime + 0.08;
    for (let p = 0; p < PASSES; p++) {
      melody.forEach((st, s) => {
        const t = start + (p * STEPS + s) * STEP_SEC;
        if (st.lead !== null) voice("square", hz(st.lead), t, STEP_SEC * 0.9, 0.5, 1800, true);
        if (st.bass !== null) voice("triangle", hz(st.bass), t, STEP_SEC * 3.6, 0.9, 700, false);
        const ms = (t - ctx.currentTime) * 1000;
        timers.current.push(window.setTimeout(() => setCurrent(s), ms));
      });
    }
    const endMs = (start + PASSES * STEPS * STEP_SEC - ctx.currentTime) * 1000 + 400;
    timers.current.push(window.setTimeout(() => stop(), endMs));
    setPlaying(true);
  }, [melody, stop]);

  const leadNotes = melody.filter((m) => m.lead !== null).map((m) => noteName(m.lead!));

  return (
    <div className={styles.synth}>
      <div className={styles.synthControls}>
        <button type="button" className={`${styles.btn} ${styles.btnSolid}`} onClick={playing ? stop : play} aria-pressed={playing}>
          {playing ? "■ stop" : "▶ play recording"}
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnAmber}`} onClick={() => setSeed((s) => (s * 48271 + 11) % 99991)}>
          ↻ new seed
        </button>
        <span className={styles.seed}>
          seed={seed} · {BPM} bpm · {PASSES} loops · {Math.round(PASSES * STEPS * STEP_SEC)}s
        </span>
      </div>
      <div className={styles.steps} aria-hidden="true">
        {melody.map((st, s) => (
          <div key={s} className={`${styles.step} ${current === s ? styles.stepActive : ""}`}>
            {st.idx !== null && (
              <span className={styles.stepNote} style={{ top: `${8 + ((SCALE.length - 1 - st.idx) / (SCALE.length - 1)) * 70}%` }} />
            )}
          </div>
        ))}
      </div>
      <p className={styles.caption} aria-live="polite">
        {playing ? `playing seed ${seed}…` : `lead: ${leadNotes.join(" ")}`}
      </p>
    </div>
  );
}
