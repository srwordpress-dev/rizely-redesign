"use client";

import {
  FadeRiseWord,
  ClipWipeWord,
  BlurMorphWord,
  TypewriterWord,
  SweepWord,
} from "@/components/rotating";

const EVENTS = ["event", "conference", "networking meetup", "expo", "trade show"];
const OUTCOMES = ["replies", "sales", "calls", "meetings"];
const OLD_WAY = ["a pile of cards", "a bunch of numbers", "a full camera roll"];

const strike = "line-through decoration-2 decoration-muted-foreground/50";
const H = "font-heading font-extrabold tracking-[-0.03em] text-3xl md:text-5xl text-balance leading-[1.08]";
const SUB = "mt-3 block text-xl md:text-3xl font-bold text-muted-foreground";

/* A — Fade-rise: all three words rotate (slow, staggered). */
function HeadingA() {
  return (
    <h2 className={H}>
      Come back from the <FadeRiseWord words={EVENTS} period={5200} /> with{" "}
      <FadeRiseWord words={OUTCOMES} className="text-sunrise" period={6000} />.
      <span className={SUB}>
        Not <FadeRiseWord words={OLD_WAY} strike period={7000} />.
      </span>
    </h2>
  );
}

/* Typewriter: types the outcome word; event + old-way stay fixed for calm. */
function HeadingT() {
  return (
    <h2 className={H}>
      Come back from the event with{" "}
      <TypewriterWord words={OUTCOMES} className="text-sunrise" />
      <span className={SUB}>
        Not <span className={strike}>a pile of cards</span>.
      </span>
    </h2>
  );
}

/* B — Clip-path rising wipe (the brand "rise" motif). */
function HeadingB() {
  return (
    <h2 className={H}>
      Come back from the <ClipWipeWord words={EVENTS} period={5200} /> with{" "}
      <ClipWipeWord words={OUTCOMES} className="text-sunrise" period={6000} />.
      <span className={SUB}>
        Not <ClipWipeWord words={OLD_WAY} strike period={7000} />.
      </span>
    </h2>
  );
}

/* C — Blur-morph focus swap. */
function HeadingC() {
  return (
    <h2 className={H}>
      Come back from the <BlurMorphWord words={EVENTS} period={5200} /> with{" "}
      <BlurMorphWord words={OUTCOMES} className="text-sunrise" period={6000} />.
      <span className={SUB}>
        Not <BlurMorphWord words={OLD_WAY} strike period={7000} />.
      </span>
    </h2>
  );
}

/* D — Static line + slow sunrise sweep (no rotation, zero motion cost). */
function HeadingD() {
  return (
    <h2 className={H}>
      Come back from the event with <SweepWord word="real replies" />.
      <span className={SUB}>
        Not <span className={strike}>a pile of cards</span>.
      </span>
    </h2>
  );
}

const variants = [
  {
    id: "A",
    name: "Fade-rise",
    tag: "Recommended · calmest",
    desc: "All three words rotate on a slow, staggered ~5–6s dwell. Opacity + a small upward drift. Paint-only, zero layout shift.",
    node: <HeadingA />,
  },
  {
    id: "T",
    name: "Typewriter",
    tag: "Editorial",
    desc: "The outcome word types out behind a blinking caret, holds ~4.5s, then backspaces. Event + old-way stay fixed so only one thing types.",
    node: <HeadingT />,
  },
  {
    id: "B",
    name: "Clip-wipe (rising)",
    tag: "On-brand motion",
    desc: "Each new word is revealed by a bottom-up wipe — literally the 'rise' motif. Same slow cadence, width-locked.",
    node: <HeadingB />,
  },
  {
    id: "C",
    name: "Blur-morph",
    tag: "Most 'AI'",
    desc: "The incoming word resolves from a soft blur + slight scale into focus. Feels high-tech; a touch heavier on low-end phones.",
    node: <HeadingC />,
  },
  {
    id: "D",
    name: "Static + sunrise sweep",
    tag: "Fastest / no rotation",
    desc: "No rotation at all — one strong line with a slow sunrise sheen sweeping the key word. Zero JS, zero layout shift by construction.",
    node: <HeadingD />,
  },
];

export default function HeroLab() {
  return (
    <main className="min-h-dvh w-full">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 pt-16 pb-10 md:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Hero animation lab
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-heading font-bold tracking-[-0.02em]">
          Pick the headline animation
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
          Five options, all fixed: slowed to a calm ~5–6s dwell (a full cycle ≈ 30s), and
          width-locked so the line never changes the page width. Tell me which one (A / Typewriter /
          B / C / D) and I&apos;ll ship it. Reduce-motion users see a single static line on every one.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-24 flex flex-col gap-6">
        {variants.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-lg bg-peach border border-primary/30 text-primary text-sm font-bold">
                  {v.id}
                </span>
                <span className="font-heading font-semibold">{v.name}</span>
                <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {v.tag}
                </span>
              </div>
            </div>
            <div className="grid place-items-center px-6 py-14 text-center min-h-[220px]">
              {v.node}
            </div>
            <p className="border-t border-border/70 px-5 py-3 text-sm text-muted-foreground">
              {v.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
