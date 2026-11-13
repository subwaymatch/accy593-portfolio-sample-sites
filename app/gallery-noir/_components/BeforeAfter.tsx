"use client";

import { useId, useState } from "react";
import type { Img } from "../_data/works";
import b from "./BeforeAfter.module.css";

export default function BeforeAfter({ before, after }: { before: Img; after: Img }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure className={b.wrap}>
      <div className={b.stage} style={{ aspectRatio: `${after.width} / ${after.height}` }}>
        <img className={b.img} src={after.src} width={after.width} height={after.height} alt={after.alt} loading="lazy" />
        <div className={b.beforeLayer} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img className={b.img} src={before.src} width={before.width} height={before.height} alt={before.alt} loading="lazy" />
        </div>
        <span className={`${b.tag} ${b.tagLeft}`} aria-hidden="true">
          Before
        </span>
        <span className={`${b.tag} ${b.tagRight}`} aria-hidden="true">
          After
        </span>
        <div className={b.handle} style={{ left: `${pos}%` }} aria-hidden="true">
          <span className={b.knob}>
            <span>‹</span>
            <span>›</span>
          </span>
        </div>
        <input
          id={id}
          className={b.range}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare the original spread (left) with the redesign (right)"
        />
      </div>
      <div className={b.buttons}>
        <button type="button" onClick={() => setPos(100)} aria-pressed={pos === 100}>
          Show before
        </button>
        <button type="button" onClick={() => setPos(50)} aria-pressed={pos === 50}>
          Split
        </button>
        <button type="button" onClick={() => setPos(0)} aria-pressed={pos === 0}>
          Show after
        </button>
      </div>
      <figcaption className={b.caption}>
        Financial highlights spread. Left: the original layout. Right: my redesign concept. Drag the handle, or use
        the arrow keys once it has focus.
      </figcaption>
    </figure>
  );
}
