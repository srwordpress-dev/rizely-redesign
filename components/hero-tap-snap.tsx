"use client";

import { useEffect, useRef, useState } from "react";
import "@/app/hero-tap-snap.css";

/*
  Hero animation, concept 01 "Tap · Snap · Follow up" (wide).
  Design: claude.ai/artifact/2G7ySZU9W1LMifH7QwWsBM

  Three stations across the width, joined by a dotted line:
    left   Tap        your Rizely card taps their phone; your profile is saved
    centre Snap       three paper cards fly into a Contacts list
    right  Follow up  a WhatsApp draft appears; you press Send
  The active station is full strength, the others rest at 35%.

  One clock (t, ms into the loop) drives everything; every move itself is a
  CSS transition, so the clock only flips states and the browser does the
  in-betweens. Each element holds its end state until the stage has faded
  out; then transitions are switched off (.ts-reset) while everything snaps
  back, so nothing is ever seen sliding backwards.

  Drawn at 1280 x 390 (phones: 360 x 380, one station at a time) and scaled
  to the box, whose size comes from CSS so the page never shifts. Decorative: aria-hidden;
  the H1 below carries the meaning. Reduced motion: one still frame with all
  three stations at full strength. Names are made up.
*/

const W = 1280;
const H = 390;
// Phones and tablets (under 900px) get a narrow stage that shows one station at a time.
const MW = 360;
const MH = 380;
const PHONE_QUERY = "(max-width: 899px)";
// Where each station sits on the narrow stage, so its drawing is centred.
const MOBILE_LEFT = [50, 10, 55];
const LOOP = 12100;
const FADE_OUT = 11500; // stage fades
const RESET = 11960; // stage is invisible: snap back without transitions
const STILL = 10300; // the frame shown under reduced motion

// The dotted path, as [left, width]: phone 1 to the card pile, panel to phone 3.
const SEGMENTS: [number, number][] = [
  [336, 128],
  [820, 166],
];

const NAMES = [
  ["Ananya Rao", "Kestrel Labs"],
  ["Vikram Shah", "Northwind Exports"],
  ["Meera Iyer", "Bluefin Tools"],
];

function frame(t: number, still: boolean) {
  const on = (a: number, b: number) => t >= a && t < b;
  const held = (a: number) => t >= a && t < RESET; // true from a until the reset
  const A1 = t < 3700;
  const A2 = on(3700, 7500);
  const A3 = on(7500, FADE_OUT);

  let nfc = "translate(-40px,0) rotate(-8deg)";
  let nfcO = 0;
  if (t >= 400 && t < RESET) {
    nfcO = 1;
    nfc = on(1300, 2700) ? "translate(38px,0) rotate(-2deg)" : "translate(0,0) rotate(-6deg)";
  }

  const papers = [0, 1, 2].map((i) => {
    const fly = 4300 + i * 700;
    const rest = `translate(${i * 10}px, ${i * 8 - 8}px) rotate(${[-9, 6, -2][i]}deg)`;
    const gone = `translate(196px, ${-40 + i * 44}px) scale(0.4)`;
    return held(fly) ? { t: gone, o: 0 } : { t: rest, o: 1 };
  });

  const dim = still ? 1 : 0.35;
  return {
    stage: t < FADE_OUT ? 1 : 0,
    reset: t >= RESET,
    st: [A1 || still ? 1 : dim, A2 || still ? 1 : dim, A3 || still ? 1 : dim],
    ring: on(1300, 2500) && !still,
    nfc,
    nfcO,
    profile: held(1500),
    savePress: on(2300, 2450),
    saved: held(2450),
    fill1: held(3400),
    dot1: held(3400),
    dot1O: on(3400, 4300) && !still,
    papers,
    rows: NAMES.map((_, i) => held(4700 + i * 700)),
    fill2: held(7100),
    dot2: held(7100),
    dot2O: on(7100, 8000) && !still,
    draft: held(8000),
    chip: on(8600, 9900),
    sendPress: on(9800, 10000),
    sent: held(10000),
    acts: [A1, A2, A3],
  };
}

export default function HeroTapSnap({ className = "" }: { className?: string }) {
  const [t, setT] = useState(STILL);
  const [still, setStill] = useState(true);
  const [boot, setBoot] = useState(true); // first frame after mount: no transitions
  const [scale, setScale] = useState(1);
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false); // stage hidden until it is measured
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const mq = window.matchMedia(PHONE_QUERY);
    const measure = () => {
      const narrow = mq.matches;
      setMobile(narrow);
      setScale(el.clientWidth / (narrow ? MW : W));
      setReady(true);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return () => {
        ro.disconnect();
        mq.removeEventListener("change", measure);
      };
    setStill(false);
    setT(0);
    const bootId = window.setTimeout(() => setBoot(false), 120);
    let id = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    // The clock only flips states (the moves are CSS transitions), so 20
    // updates a second is plenty and keeps React work small.
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      acc += Math.min(100, now - last);
      last = now;
      if (acc >= 50) {
        const step = acc;
        acc = 0;
        if (visible && !document.hidden) setT((v) => (v + step) % LOOP);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(bootId);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const f = frame(t, still);
  const act = ["Your card is tapped", "You snap theirs", "The follow-up is drafted"];
  // On phones only the active station shows (the still frame shows the last).
  const active = still ? 2 : f.acts.findIndex(Boolean);
  const stationStyle = (i: number, left: number, width: number) =>
    mobile
      ? { left: MOBILE_LEFT[i], width, opacity: i === active ? 1 : 0, transitionDelay: i === active ? "320ms" : "0ms" }
      : { left, width, opacity: f.st[i] };

  return (
    <div ref={box} aria-hidden="true" className={`ts-box ${className}`}>
      <div
        className={`ts-stage ${f.reset || boot ? "ts-reset" : ""} ${mobile ? "is-mobile" : ""}`}
        style={{
          width: mobile ? MW : W,
          height: mobile ? MH : H,
          transform: `scale(${scale})`,
          opacity: ready ? f.stage : 0,
        }}
      >
        {/* the dotted path, then its two orange fills and travelling dots */}
        {!mobile && SEGMENTS.map(([x, w], i) => (
          <div key={x}>
            <div className="ts-path" style={{ left: x, width: w }} />
            <div className="ts-fill" style={{ left: x, width: w, transform: `scaleX(${(i ? f.fill2 : f.fill1) ? 1 : 0})` }} />
            <span
              className="ts-dot"
              style={{ left: x, transform: `translateX(${(i ? f.dot2 : f.dot1) ? w : 0}px)`, opacity: (i ? f.dot2O : f.dot1O) ? 1 : 0 }}
            />
          </div>
        ))}

        {/* 01 Tap */}
        <div className="ts-station" style={stationStyle(0, 60, 280)}>
          {f.ring && (
            <>
              <span className="ts-ring" />
              <span className="ts-ring ts-ring-2" />
            </>
          )}
          <div className="ts-nfc" style={{ transform: f.nfc, opacity: f.nfcO }}>
            <span className="ts-nfc-dot" />
            <span className="ts-nfc-word">RIZELY</span>
            <span className="ts-nfc-l1" />
            <span className="ts-nfc-l2" />
          </div>
          <div className="ts-phone" style={{ left: 120, width: 140 }}>
            <span className="ts-notch" />
            <div className="ts-fade ts-profile" style={{ opacity: f.profile ? 1 : 0, transform: `translateY(${f.profile ? 0 : 8}px)` }}>
              <span className="ts-avatar" />
              <span className="ts-name">Priya Nair</span>
              <span className="ts-role">Founder · Kestrel Labs</span>
              <span className="ts-bar" style={{ width: 84, marginTop: 6 }} />
              <span className="ts-bar" style={{ width: 64 }} />
              <span className={`ts-save ${f.saved ? "is-saved" : ""}`} style={{ scale: f.savePress ? "0.92" : "1" }}>
                <span className="ts-swap" style={{ opacity: f.saved ? 0 : 1 }}>Save contact</span>
                <span className="ts-swap ts-swap-2" style={{ opacity: f.saved ? 1 : 0 }}>Saved ✓</span>
              </span>
            </div>
          </div>
        </div>

        {/* 02 Snap */}
        <div className="ts-station" style={stationStyle(1, 475, 340)}>
          {f.papers.map((p, i) => (
            <div key={i} className="ts-paper" style={{ transform: p.t, opacity: p.o, zIndex: 3 - i }}>
              <span className="ts-p1" />
              <span className="ts-p2" />
              <span className="ts-p3" />
            </div>
          ))}
          <div className="ts-panel">
            <span className="ts-panel-title">Contacts</span>
            {NAMES.map(([n, c], i) => (
              <div key={n} className={`ts-row ${f.rows[i] ? "is-on" : ""}`}>
                <span className="ts-row-name">{n}</span>
                <span className="ts-row-co">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 03 Follow up */}
        <div className="ts-station" style={stationStyle(2, 950, 280)}>
          <div className="ts-phone ts-chat" style={{ left: 40, width: 170 }}>
            <div className="ts-chat-head">
              <span className="ts-chat-av" />
              Ananya Rao
            </div>
            <div className="ts-chat-body">
              <div className="ts-fade ts-bubble" style={{ opacity: f.draft ? 1 : 0, transform: `translateY(${f.draft ? 0 : 10}px)` }}>
                Hi Ananya, great meeting you at the expo today. Shall we talk on Monday?
                <span className="ts-tick" style={{ opacity: f.sent ? 1 : 0 }}>Sent ✓✓</span>
              </div>
              <span className="ts-fade ts-chip" style={{ opacity: f.chip ? 1 : 0 }}>Draft ready</span>
            </div>
            <div className="ts-chat-input">
              <span className="ts-input" />
              <span className={`ts-send ${f.sendPress ? "is-press" : ""}`}>Send</span>
            </div>
          </div>
        </div>

        {/* captions under the stations */}
        <div className="ts-caps">
          {act.map((label, i) => (
            <div key={label} className={`ts-cap ${(mobile ? i === active : f.acts[i] || still) ? "is-on" : ""}`}>
              <span className="ts-cap-no">0{i + 1}</span>
              <span className="ts-cap-label">{label}</span>
            </div>
          ))}
        </div>
        {mobile && (
          <div className="ts-dots">
            {act.map((label, i) => (
              <span key={label} className={i === active ? "is-on" : ""} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
