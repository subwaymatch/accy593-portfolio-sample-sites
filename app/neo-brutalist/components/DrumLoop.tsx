"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../site.module.css";
import demo from "./demo.module.css";

type Voice = "kick" | "snare" | "hat";
const voices: { id: Voice; label: string }[] = [
  { id: "kick", label: "Kick" },
  { id: "snare", label: "Snare" },
  { id: "hat", label: "Hi-hat" },
];
const STEPS = 16;
const initial: Record<Voice, boolean[]> = {
  kick: Array.from({ length: STEPS }, (_, i) => [0, 7, 10].includes(i)),
  snare: Array.from({ length: STEPS }, (_, i) => [4, 12].includes(i)),
  hat: Array.from({ length: STEPS }, (_, i) => i % 2 === 0 || i === 15),
};

function noiseBuffer(ctx: AudioContext) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function play(ctx: AudioContext, noise: AudioBuffer, voice: Voice, t: number) {
  const out = ctx.createGain();
  out.connect(ctx.destination);
  if (voice === "kick") {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    out.gain.setValueAtTime(0.9, t);
    out.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
    osc.connect(out);
    osc.start(t);
    osc.stop(t + 0.45);
  } else {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = voice === "snare" ? 1200 : 7000;
    const len = voice === "snare" ? 0.2 : 0.05;
    out.gain.setValueAtTime(voice === "snare" ? 0.55 : 0.22, t);
    out.gain.exponentialRampToValueAtTime(0.001, t + len);
    src.connect(filter).connect(out);
    src.start(t);
    src.stop(t + len + 0.02);
    if (voice === "snare") {
      const body = ctx.createOscillator();
      const g = ctx.createGain();
      body.type = "triangle";
      body.frequency.value = 185;
      g.gain.setValueAtTime(0.35, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      body.connect(g).connect(ctx.destination);
      body.start(t);
      body.stop(t + 0.12);
    }
  }
}

export default function DrumLoop() {
  const [pattern, setPattern] = useState(initial);
  const [bpm, setBpm] = useState(86);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);

  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const patternRef = useRef(pattern);
  const bpmRef = useRef(bpm);
  patternRef.current = pattern;
  bpmRef.current = bpm;

  useEffect(() => {
    if (!playing) return;
    const ctx = ctxRef.current;
    const noise = noiseRef.current;
    if (!ctx || !noise) return;
    let step = 0;
    let nextTime = ctx.currentTime + 0.06;
    const queue: { step: number; time: number }[] = [];
    const timer = window.setInterval(() => {
      while (nextTime < ctx.currentTime + 0.12) {
        const p = patternRef.current;
        for (const v of voices) {
          // The snare lands a hair late, which is the whole feel of this pattern.
          if (p[v.id][step]) play(ctx, noise, v.id, nextTime + (v.id === "snare" ? 0.014 : 0));
        }
        queue.push({ step, time: nextTime });
        nextTime += 60 / bpmRef.current / 4;
        step = (step + 1) % STEPS;
      }
    }, 25);
    let raf = 0;
    const draw = () => {
      while (queue.length && queue[0].time <= ctx.currentTime) {
        setCurrent(queue.shift()!.step);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      window.clearInterval(timer);
      cancelAnimationFrame(raf);
      setCurrent(-1);
    };
  }, [playing]);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  const toggle = async () => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctor();
      noiseRef.current = noiseBuffer(ctxRef.current);
    }
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    setPlaying((v) => !v);
  };

  const flip = (v: Voice, i: number) =>
    setPattern((p) => ({ ...p, [v]: p[v].map((on, j) => (j === i ? !on : on)) }));

  return (
    <div className={`${styles.panel} ${demo.drum}`}>
      <div className={demo.drumControls}>
        <button type="button" className={`${styles.btn} ${playing ? styles.btnPink : ""}`} onClick={toggle}>
          {playing ? "■ Stop" : "▶ Play loop"}
        </button>
        <label className={demo.field} style={{ flex: "1 1 200px" }}>
          <span>
            Tempo: <strong>{bpm} BPM</strong>
          </span>
          <input
            type="range"
            min={70}
            max={120}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className={demo.range}
          />
        </label>
        <button type="button" className={`${styles.btn} ${styles.btnWhite}`} onClick={() => setPattern(initial)}>
          Reset pattern
        </button>
      </div>
      <div className={demo.seqScroll}>
        <div className={demo.seq} role="grid" aria-label="Drum pattern, 16 steps">
          {voices.map((v) => (
            <div key={v.id} className={demo.seqRow} role="row">
              <span className={demo.seqLabel} role="rowheader">
                {v.label}
              </span>
              {pattern[v.id].map((on, i) => (
                <span key={i} role="gridcell">
                  <button
                    type="button"
                    className={`${demo.step} ${on ? demo[`on-${v.id}`] : ""} ${current === i ? demo.stepNow : ""} ${
                      i % 4 === 0 ? demo.beat : ""
                    }`}
                    aria-pressed={on}
                    aria-label={`${v.label} step ${i + 1}`}
                    onClick={() => flip(v.id, i)}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className={demo.fine}>Sounds are synthesised live with the Web Audio API. Turn your volume down a bit first.</p>
    </div>
  );
}
