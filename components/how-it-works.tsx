"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionKicker from "@/components/section-kicker";
import "@/app/how-it-works.css";

/*
  01 · How it works, as a timeline (design: claude.ai/artifact/8wTYCnEf2nSScHeRHY2C3v, v3).
  An orange line draws itself along a dotted track; each time it reaches a
  stop, the stop fills, its time lights up and that step's card rises in and
  plays its moment (the photo lands, the lead fills, the draft is sent).

  Desktop (lg+): a horizontal zig-zag drawn at 1088 x 640 and scaled to the
  box (box size is CSS, so nothing shifts). Below lg: a vertical timeline in
  normal flow. One clock, t (ms), drives both; it starts when the section is
  in view and plays once ("Play again" replays). Reduced motion and no-JS
  show the finished timeline. The card and the times are an illustration;
  names and the number are made up / dummy.
*/

const END = 8200;
const AT = [1100, 3400, 5700]; // when the line reaches each stop
const W = 1088;

const STOPS = [
  { time: "10:42", when: "At the stall" },
  { time: "10:43", when: "Right after" },
  { time: "19:30", when: "Same evening" },
];

const STEPS = [
  { no: "01", title: "Snap it", line: "Photograph the card in WhatsApp or Telegram. Nothing to install." },
  { no: "02", title: "Rizely files it", line: "A clean lead under the event, read in Hindi, Gujarati or Marathi too." },
  { no: "03", title: "It drafts the follow-up", line: "A personal draft in their language. You check it and press Send." },
];

const FIELDS = [
  ["Name", "Ananya Iyer"],
  ["Role", "Head of Marketing"],
  ["Phone", "+91 98765 43210"],
  ["Event", "Tech Expo Pune"],
];

const show = (on: boolean) => (on ? "is-on" : "");

function Visual({ i, t }: { i: number; t: number }) {
  if (i === 0) {
    return (
      <div className="tl-visual tl-v-chat" role="img" aria-label="A photo of a business card sent to Rizely in WhatsApp">
        <div className={`tl-pop tl-photo ${show(t >= AT[0] + 500)}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized WebP */}
          <img src="/cards/card-pvc.webp" alt="" width={132} height={80} loading="lazy" decoding="async" />
          <span>10:42 ✓✓</span>
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="tl-visual tl-v-lead" role="img" aria-label="The lead Rizely saved from the photo: name, role, phone and event">
        <div className="tl-lead">
          <div className="flex items-center justify-between">
            <b className="text-[11px]">Lead saved</b>
            <span className="tl-chip">From the photo</span>
          </div>
          {FIELDS.map(([k, v], n) => (
            <div key={k} className={`tl-pop tl-field ${show(t >= AT[1] + 500 + n * 280)}`}>
              <span className="text-muted-foreground">{k}</span>
              <b className={k === "Event" ? "text-spark-text" : ""}>{v}</b>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const pressing = t >= AT[2] + 1900 && t < AT[2] + 2100;
  return (
    <div className="tl-visual tl-v-draft" role="img" aria-label="A follow-up drafted for Ananya, with Edit and Send">
      <div className={`tl-pop tl-draft ${show(t >= AT[2] + 500)}`}>
        Hi Ananya, great meeting you at Tech Expo today. Could we take 10 minutes on Monday?
      </div>
      <div className={`tl-pop tl-btns ${show(t >= AT[2] + 1000)}`}>
        <span className="tl-edit">Edit</span>
        <span className={`tl-send ${pressing ? "is-press" : ""}`}>{t >= AT[2] + 2100 ? "Sent ✓" : "Send"}</span>
      </div>
    </div>
  );
}

function Card({ i, t, dir }: { i: number; t: number; dir: "up" | "down" | "side" }) {
  const s = STEPS[i];
  return (
    <article className={`tl-card tl-from-${dir} ${show(t >= AT[i] + 100)}`}>
      <Visual i={i} t={t} />
      <div className="flex flex-col gap-1 px-[18px] pb-[18px] pt-4">
        <div className="flex items-baseline gap-2.5">
          <span className="tl-no">{s.no}</span>
          <h3 className="text-[17px] font-semibold">{s.title}</h3>
        </div>
        <p className="text-sm leading-normal text-muted-foreground">{s.line}</p>
      </div>
    </article>
  );
}

function Stop({ i, t }: { i: number; t: number }) {
  const on = t >= AT[i];
  return (
    <>
      {t >= AT[i] && t < AT[i] + 1200 && <span className="tl-ripple" />}
      <span className={`tl-node ${show(on)}`} />
      <span className={`tl-label ${show(on)}`}>
        <span className="tl-time">{STOPS[i].time}</span>
        <span className="tl-when">{STOPS[i].when}</span>
      </span>
    </>
  );
}

export default function HowItWorks() {
  const [t, setT] = useState(END);
  const [scale, setScale] = useState(1);
  const [canPlay, setCanPlay] = useState(false);
  const [settled, setSettled] = useState(true); // false: snap to t=0 without transitions
  // Phones: where each stop sits down the line, as a fraction of its length.
  const [vstops, setVstops] = useState([0, 0.4, 0.8]);
  const box = useRef<HTMLDivElement>(null);
  const vlist = useRef<HTMLOListElement>(null);
  const sec = useRef<HTMLElement>(null);
  const timer = useRef(0);

  const play = () => {
    window.clearInterval(timer.current);
    setSettled(true);
    setT(0);
    const start = performance.now();
    timer.current = window.setInterval(() => {
      const v = performance.now() - start;
      if (v >= END) {
        window.clearInterval(timer.current);
        setT(END);
      } else setT(v);
    }, 50);
  };

  // Before the first paint: hide the finished state if we are going to play it.
  useLayoutEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettled(false);
      setCanPlay(true);
      setT(0);
    }
  }, []);

  useEffect(() => {
    const el = box.current;
    const measure = () => {
      if (el) setScale(el.clientWidth / W);
      const ol = vlist.current;
      if (ol && ol.offsetHeight) {
        const line = ol.offsetHeight - 20; // the line runs 10px in from each end
        const top = ol.getBoundingClientRect().top;
        // Measured against the list itself (offsetTop would be against each item).
        const tops = [...ol.querySelectorAll<HTMLElement>(".tl-vstop")].map(
          (n) => (n.getBoundingClientRect().top - top + 11 - 10) / line,
        );
        setVstops(tops);
      }
    };
    const ro = new ResizeObserver(measure);
    if (el) ro.observe(el);
    if (vlist.current) ro.observe(vlist.current);
    let io: IntersectionObserver | null = null;
    if (canPlay && sec.current) {
      io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          io?.disconnect();
          play();
        },
        { threshold: 0.35 },
      );
      io.observe(sec.current);
    }
    return () => {
      ro.disconnect();
      io?.disconnect();
      window.clearInterval(timer.current);
    };
  }, [canPlay]);

  // The line takes 1100ms per leg, so each leg starts 1100ms before its stop
  // lights: it arrives exactly as the stop fills. Desktop stops sit at 15%,
  // 50% and 85%; phone stops wherever their cards put them.
  const leg = (stops: number[]) => {
    let v = 0;
    AT.forEach((at, i) => {
      if (t >= at - 1100) v = stops[i];
    });
    if (t >= AT[2] + 1200) v = 1;
    return v;
  };
  const line = leg([0.15, 0.5, 0.85]);
  const vline = leg(vstops);

  return (
    <section ref={sec} id="how" className={`${settled ? "" : "tl-snap "}w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8 flex flex-col items-center`}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="mb-12 grid w-full max-w-[1088px] gap-6 text-left lg:grid-cols-[auto_1fr] lg:items-end lg:gap-14"
      >
        {/* The whole trip in two times: the page's one oversized, off-grid moment. */}
        <p aria-hidden="true" className="big-clock">
          10:42<span className="arrow"> → </span>19:30
        </p>
        <div className="flex flex-col gap-3">
          <SectionKicker no="01">How it works</SectionKicker>
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight text-balance">
            From a card in your hand to a reply in their inbox.
          </h2>
          <p className="text-muted-foreground text-lg">One card, one evening. Here is the whole trip.</p>
        </div>
      </motion.div>

      {/* Desktop: horizontal zig-zag */}
      <div ref={box} className="tl-box hidden lg:block">
        <div className="tl-stage" style={{ transform: `scale(${scale})` }}>
          <div className="tl-track" />
          <div className="tl-line" style={{ transform: `scaleX(${line})` }} />
          {[15, 50, 85].map((x, i) => (
            <div key={x} className={`tl-stop ${i === 1 ? "is-below" : ""}`} style={{ left: `${x}%` }}>
              <Stop i={i} t={t} />
            </div>
          ))}
          <div className="tl-slot" style={{ left: 13, top: 356 }}>
            <Card i={0} t={t} dir="down" />
          </div>
          <div className="tl-slot" style={{ left: 394, top: 8 }}>
            <Card i={1} t={t} dir="up" />
          </div>
          <div className="tl-slot" style={{ left: 775, top: 356 }}>
            <Card i={2} t={t} dir="down" />
          </div>
          {/* Two handwritten margin notes, in the empty space under 10:43. */}
          <p aria-hidden="true" className={`tl-note hand-note ${show(t >= AT[0] + 1300)}`} style={{ left: 382, top: 472 }}>
            <svg className="tl-note-arrow" style={{ left: -62, top: 6 }} width="56" height="40" viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M54 6c-14 2-30 9-46 27" />
              <path d="M6 22l2 11 11-3" />
            </svg>
            no typing, just a photo
          </p>
          <p aria-hidden="true" className={`tl-note tl-note-r hand-note ${show(t >= AT[2] + 1500)}`} style={{ left: 468, top: 566 }}>
            you still press Send
            <svg className="tl-note-arrow" style={{ right: -70, top: -18 }} width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 30c18 4 38-2 58-24" />
              <path d="M49 6l11 0 0 11" />
            </svg>
          </p>
        </div>
      </div>

      {/* Phones and tablets: vertical timeline */}
      <ol ref={vlist} className="tl-vertical lg:hidden">
        <span className="tl-vtrack" aria-hidden="true" />
        <span className="tl-vline" aria-hidden="true" style={{ transform: `scaleY(${vline})` }} />
        {STEPS.map((s, i) => (
          <li key={s.no} className="tl-vitem">
            <div className="tl-vstop">
              <Stop i={i} t={t} />
            </div>
            <Card i={i} t={t} dir="side" />
          </li>
        ))}
      </ol>

      {canPlay && (
        <button type="button" onClick={play} className="tl-replay">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
          Play again
        </button>
      )}
    </section>
  );
}
