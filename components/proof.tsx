"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import "@/app/before-after.css";

/*
  04 · What one event turns into: a before/after you drag.
  Design: claude.ai/artifact/9bf6aRsJC8MAR8pkmyUdz2

  Two scenes share one frame: the Monday without Rizely (a scattered stack,
  "follow up???", day 14) and the Monday with it (the same cards filed under
  the event, drafts in their language, sent while warm). A native range input
  lies over the frame, so mouse, touch and arrow keys all move the line.

  Honest, mechanism-based before/after: deliberately NO fabricated
  percentages, ₹ figures, user counts, replies or named testimonials (see
  mission-control/CORRECTIONS.md). "80 cards" is the illustration the copy has
  always used. Names are made up. Real, logged event stories replace the
  early-access note only when they exist.

  Each scene is drawn at a fixed size (wide 1080 x 480, narrow 360 x 460 under
  640px) and scaled to the frame, whose size is pure CSS (no layout shift).
*/

const BEFORE = ["80 cards in a jacket pocket", "Excel, some Sunday night", "Half gone cold in two weeks"];
const AFTER = ["Every card filed under the event", "Drafts in their language, same night", "Sent while it's still warm"];

const LEADS = [
  { name: "Ananya Rao", co: "Kestrel Labs", sent: true },
  { name: "Arjun Desai", co: "Kestrel Labs", sent: false },
  { name: "Vikram Shah", co: "Northwind Exports", sent: true },
  { name: "Meera Iyer", co: "Bluefin Tools", sent: false },
];

// Scattered paper cards: [left, top, rotation] for the wide and narrow scenes.
const MESS_WIDE = [[40, 92, -14], [120, 70, 9], [70, 170, 4], [190, 150, -8], [30, 250, 12], [150, 245, -5], [250, 210, 15], [210, 300, -11]];
const MESS_NARROW = [[24, 70, -14], [110, 52, 9], [40, 140, 5], [150, 130, -9], [70, 210, 12], [180, 200, -6]];

const W = { wide: [1080, 480], narrow: [360, 460] } as const;
const NARROW_QUERY = "(max-width: 639px)";

function Before({ narrow }: { narrow: boolean }) {
  const mess = narrow ? MESS_NARROW : MESS_WIDE;
  return (
    <div className="bf-scene bf-before">
      <span className="bf-badge">Without Rizely</span>
      {mess.map(([x, y, r], i) => (
        <div key={i} className="bf-paper" style={{ left: x, top: y, rotate: `${r}deg` }}>
          <span className="bf-p1" />
          <span className="bf-p2" />
          <span className="bf-p3" />
        </div>
      ))}
      <div className="bf-note" style={narrow ? { left: 196, top: 300 } : { left: 330, top: 70 }}>
        follow up???
        <span>…next week</span>
      </div>
      <div className="bf-day" style={narrow ? { left: 40, top: 320 } : { left: 390, top: 230 }}>
        <div className="bf-day-head">DAY</div>
        <div className="bf-day-no">14</div>
      </div>
      {!narrow && (
        <ul className="bf-list bf-list-before">
          {BEFORE.map((l) => (
            <li key={l}>
              <X aria-hidden="true" className="size-4 shrink-0" />
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function After({ narrow }: { narrow: boolean }) {
  const leads = LEADS.slice(0, 3);
  return (
    <div className="bf-scene bf-after">
      <span className="bf-badge bf-badge-after">With Rizely</span>
      {!narrow && (
        // The same cards as the left side, now squared up and scanned.
        <div className="bf-stack" style={{ left: 150, top: 150 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="bf-paper bf-paper-neat" style={{ left: i * 8, top: i * -8 }}>
              <span className="bf-p1" />
              <span className="bf-p2" />
              <span className="bf-p3" />
            </div>
          ))}
          <span className="bf-scanned">
            <Check aria-hidden="true" className="size-3.5" />
            80 scanned
          </span>
        </div>
      )}
      <div className="bf-panel" style={narrow ? { left: 24, top: 64, width: 312 } : { left: 566, top: 70, width: 300 }}>
        <div className="bf-panel-head">
          <span className="font-bold">Tech Expo Pune</span>
          <span className="text-muted-foreground">80 leads · filed same night</span>
        </div>
        {leads.map((l) => (
          <div key={l.name} className="bf-row">
            <span className="flex flex-col">
              <span className="text-[13px] font-semibold">{l.name}</span>
              <span className="text-[11px] text-muted-foreground">{l.co}</span>
            </span>
            <span className={`bf-status ${l.sent ? "is-sent" : ""}`}>{l.sent ? "Sent ✓" : "Draft ready"}</span>
          </div>
        ))}
      </div>
      <div className="bf-draft" style={narrow ? { left: 120, top: 318, width: 216 } : { left: 884, top: 104, width: 172 }}>
        <div lang="hi" className="bf-bubble">
          नमस्ते अर्जुन जी, आज एक्सपो में मिलकर अच्छा लगा…
        </div>
        <span className="bf-chip">Drafted in Hindi · ready to send</span>
      </div>
      {!narrow && (
        <ul className="bf-list bf-list-after">
          {AFTER.map((l) => (
            <li key={l}>
              <Check aria-hidden="true" className="size-4 shrink-0" />
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Proof() {
  const [pos, setPos] = useState(50);
  const [anim, setAnim] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const mq = window.matchMedia(NARROW_QUERY);
    const measure = () => {
      const n = mq.matches;
      setNarrow(n);
      setScale(el.clientWidth / (n ? W.narrow[0] : W.wide[0]));
      setReady(true);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);

    // The first time the frame is well in view, the line sweeps once each way,
    // to show it can be moved. Not under reduced motion.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || reduce) return;
        io.disconnect();
        setAnim(true);
        const steps: [number, () => void][] = [
          [500, () => setPos(36)],
          [1300, () => setPos(64)],
          [2100, () => setPos(50)],
          [2900, () => setAnim(false)],
        ];
        timers.current = steps.map(([at, fn]) => window.setTimeout(fn, at));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    const t = timers.current;
    return () => {
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", measure);
      t.forEach(clearTimeout);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const onSlide = (v: number) => {
    timers.current.forEach(clearTimeout);
    setAnim(false);
    setPos(v);
  };

  const [sw, sh] = narrow ? W.narrow : W.wide;
  const valueText = pos < 35 ? "Mostly with Rizely" : pos > 65 ? "Mostly without Rizely" : "Half and half";

  return (
    <section className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="mx-auto mb-10 flex w-full max-w-[420px] flex-col gap-3 text-left sm:mb-12 md:max-w-[1080px] lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          What one event turns into.
        </h2>
        <p className="text-muted-foreground text-lg lg:max-w-sm lg:text-right">
          The same stack of cards, two very different Mondays. Drag to compare.
        </p>
      </motion.div>

      <div ref={frame} className={`bf-frame ${anim ? "is-anim" : ""}`}>
        <div
          className="bf-stage"
          aria-hidden="true"
          style={{ width: sw, height: sh, transform: `scale(${scale})`, opacity: ready ? 1 : 0 }}
        >
          <Before narrow={narrow} />
          <div className="bf-clip" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <After narrow={narrow} />
          </div>
        </div>
        <input
          className="bf-range"
          type="range"
          min={4}
          max={96}
          step={1}
          value={pos}
          onChange={(e) => onSlide(Number(e.target.value))}
          aria-label="Compare a Monday without Rizely and with Rizely"
          aria-valuetext={valueText}
        />
        <div className="bf-handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="bf-line" />
          <span className="bf-knob">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-6 6 6 6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Phones: the two lists sit under the frame instead of inside it. */}
      <div className="mx-auto mt-5 grid max-w-md gap-4 sm:hidden">
        <ul className="bf-list-flat">
          {BEFORE.map((l) => (
            <li key={l} className="text-muted-foreground">
              <X aria-hidden="true" className="size-4 shrink-0 text-[#8a847c]" />
              {l}
            </li>
          ))}
        </ul>
        <ul className="bf-list-flat">
          {AFTER.map((l) => (
            <li key={l}>
              <Check aria-hidden="true" className="size-4 shrink-0 text-spark-text" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* Early-access honesty note — no invented proof. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-8 max-w-4xl rounded-2xl border border-dashed border-border bg-card p-5 text-center"
      >
        <p className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles aria-hidden="true" className="size-4 text-brand-amber" />
          <span>
            <span className="font-medium text-foreground">Early access.</span> Real, logged event
            stories will land here — not invented numbers or stock testimonials.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
