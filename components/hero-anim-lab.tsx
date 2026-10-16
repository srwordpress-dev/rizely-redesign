"use client";

/*
  Internal prototype for the hero animation checkpoint (PRD v4 §6).
  Noindex. Not linked from the site. Delete or keep as a lab after the decision.
*/

import { useState } from "react";
import HeroParticles from "@/components/hero-particles";

type Mode = "storyboard" | "fast" | "still" | "scrub";

const BEATS: [string, string][] = [
  ["0.0–0.8s", "Scattered dots drift in from both edges. No shape yet."],
  ["0.8–2.0s", "They organise: the PVC card from the left, the agent from the right."],
  ["2.0–2.6s", "Both drift toward the centre. The headline sits in the gap."],
  ["2.6–3.2s", "Contact — the tap. A ripple blooms out of the meeting point."],
  ["3.2–4.5s", "The profile emerges from the ripple; three follow-ups fly out in sequence."],
  ["4.5–6.0s", "Trails bend upward into the rising arc, then settle and breathe."],
];

export default function HeroAnimLab() {
  const [mode, setMode] = useState<Mode>("storyboard");
  const [replay, setReplay] = useState(0);
  const [t, setT] = useState(2.9);

  const headlineClass =
    mode === "storyboard" ? "hero-head-late" : "opacity-100";

  return (
    <main className="min-h-dvh px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Internal prototype · not linked, not indexed
          </p>
          <h1 className="font-heading mt-2 text-2xl font-extrabold md:text-3xl">
            Hero animation — physical meets AI
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Two particle fields approach from opposite sides and meet, with the headline in the
            gap. 2D canvas, no library, no image assets — both silhouettes are drawn in code and
            pixel-sampled into dot clouds. Spec: PRD-rizely-web-v4 §6.
          </p>
        </header>

        {/* ---------------------------------------------------------- controls */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(
            [
              ["storyboard", "A · Storyboard-exact"],
              ["fast", "B · Fast headline"],
              ["still", "Reduced motion"],
              ["scrub", "Scrub the beats"],
            ] as [Mode, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setReplay((r) => r + 1);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                mode === m
                  ? "border-brand-orange bg-accent text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setReplay((r) => r + 1)}
            className="ml-auto rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Replay ↻
          </button>
        </div>

        {/* ------------------------------------------------------- the shot */}
        <div
          key={replay}
          className="relative overflow-hidden rounded-2xl border border-border bg-background"
          style={{ height: "min(74vh, 620px)" }}
        >
          <div className="absolute inset-0">
            <HeroParticles
              forceStatic={mode === "still"}
              replay={replay}
              scrubTo={mode === "scrub" ? t : undefined}
            />
          </div>

          {/* The headline, in the gap between the two fields. */}
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center px-6 pt-4 md:items-center md:pt-0">
            <div
              className={`max-w-2xl text-center ${mode === "storyboard" ? headlineClass : "opacity-100"}`}
              style={{}}
            >
              <h2 className="font-heading text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-balance md:text-5xl">
                A card they tap. A profile they keep.{" "}
                <span className="text-sunrise">An agent that follows up.</span>
              </h2>
            </div>
          </div>
        </div>

        {mode === "scrub" && (
          <div className="mt-3 flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={7}
              step={0.05}
              value={t}
              onChange={(e) => setT(Number(e.target.value))}
              className="h-1 flex-1 accent-[#f05100]"
              aria-label="Scrub the animation timeline"
            />
            <span className="w-16 shrink-0 font-mono text-sm text-brand-amber">
              {t.toFixed(2)}s
            </span>
          </div>
        )}

        {/* --------------------------------------------------------- the notes */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section>
            <h3 className="font-heading text-lg font-bold">The six beats</h3>
            <ol className="mt-3 space-y-2 text-sm">
              {BEATS.map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="w-20 shrink-0 font-mono text-xs text-brand-amber">{t}</span>
                  <span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-4 text-sm">
            <div>
              <h3 className="font-heading text-lg font-bold">
                The one thing to decide: A or B
              </h3>
              <p className="mt-2 text-muted-foreground">
                The storyboard fades the headline in at 2.0–2.6s. The headline is this page&apos;s
                largest contentful paint, and a thing at zero opacity does not count as painted —
                so <strong className="text-foreground">A puts LCP at about 2.6s</strong>, right on
                Google&apos;s &ldquo;needs improvement&rdquo; line.{" "}
                <strong className="text-foreground">B paints the headline at 0s</strong> and lets
                only the particles move: LCP about 0.6s, every other beat intact, and the fields
                still close in around the words.
              </p>
              <p className="mt-2 text-muted-foreground">
                I&apos;d ship <strong className="text-foreground">B</strong> — the shot still
                reads, and a hero on an acquisition-bottlenecked site shouldn&apos;t look empty for
                two and a half seconds to someone on trade-show 4G. A is what we agreed, so A is
                built and it&apos;s yours to keep.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">Reduced motion</h3>
              <p className="mt-2 text-muted-foreground">
                The third button is what a visitor with reduced motion switched on sees: the
                settled 6-second composition, drawn once, no loop ever started. Card on the left,
                profile in the middle, agent on the right, follow-ups rising — all three layers in
                one still frame, not a jump cut.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
