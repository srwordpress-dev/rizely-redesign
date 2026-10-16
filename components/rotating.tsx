"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------
   Rotating headline words — premium, calm, and layout-shift-free.

   THE JITTER FIX (used by every variation): a 1x1 grid stack. Every candidate
   word is rendered once as an invisible, in-flow sizer in the SAME grid cell;
   the grid track auto-sizes to the widest word, so the line width is frozen
   and the centered headline never reflows. No JS measuring, no hardcoded ch.

   All variations rotate slowly (~5-6s dwell) and freeze on the first word
   under prefers-reduced-motion.
------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useRotator(length: number, period: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce || length <= 1) return;
    const t = setInterval(() => setI((n) => (n + 1) % length), period);
    return () => clearInterval(t);
  }, [reduce, length, period]);
  return reduce ? 0 : i;
}

/** Invisible sizers reserve the widest word; children render in the same cell. */
function Stack({
  words,
  children,
  align = "center",
}: {
  words: string[];
  children: React.ReactNode;
  align?: "center" | "start";
}) {
  const justify = align === "start" ? "justify-self-start" : "justify-self-center";
  return (
    <span className="relative inline-grid align-baseline">
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className={`[grid-area:1/1] invisible whitespace-nowrap ${justify}`}
        >
          {w}
        </span>
      ))}
      <span className={`[grid-area:1/1] ${justify}`}>{children}</span>
    </span>
  );
}

type WordProps = {
  words: string[];
  className?: string;
  period?: number;
  strike?: boolean;
};

const strikeCls = "line-through decoration-2 decoration-muted-foreground/50";

/** A — Fade-rise: opacity + translateY swap. The calm default. */
export function FadeRiseWord({ words, className = "", period = 5600, strike = false }: WordProps) {
  const i = useRotator(words.length, period);
  const reduce = useReducedMotion();
  const word = words[i];
  return (
    <Stack words={words}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className={`inline-block ${strike ? strikeCls : ""} ${className}`}
          initial={reduce ? false : { opacity: 0, y: "0.35em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: "-0.35em" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </Stack>
  );
}

/** B — Clip-path rising wipe: reveals bottom-up (the "rise" motif). */
export function ClipWipeWord({ words, className = "", period = 5600, strike = false }: WordProps) {
  const i = useRotator(words.length, period);
  const reduce = useReducedMotion();
  const word = words[i];
  return (
    <Stack words={words}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className={`inline-block ${strike ? strikeCls : ""} ${className}`}
          initial={reduce ? false : { clipPath: "inset(100% 0 0 0)", opacity: 0.4 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          exit={reduce ? undefined : { clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </Stack>
  );
}

/** Blur-morph: the incoming word resolves from blur+scale into focus. */
export function BlurMorphWord({ words, className = "", period = 5600, strike = false }: WordProps) {
  const i = useRotator(words.length, period);
  const reduce = useReducedMotion();
  const word = words[i];
  return (
    <Stack words={words}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className={`inline-block ${strike ? strikeCls : ""} ${className}`}
          initial={reduce ? false : { opacity: 0, filter: "blur(10px)", scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, filter: "blur(10px)", scale: 0.98 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </Stack>
  );
}

/** Typewriter: types the word out behind a blinking caret, holds, backspaces. */
export function TypewriterWord({
  words,
  className = "",
  caretClassName = "text-primary",
}: {
  words: string[];
  className?: string;
  caretClassName?: string;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(words[0]);
  const st = useRef({ wi: 0, ci: words[0].length });
  useEffect(() => {
    if (reduce) {
      setDisplay(words[0]);
      return;
    }
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const step = (fn: () => void, ms: number) => {
      if (alive) timer = setTimeout(fn, ms);
    };
    const typing = () => {
      const s = st.current;
      const w = words[s.wi];
      if (s.ci < w.length) {
        s.ci++;
        setDisplay(w.slice(0, s.ci));
        step(typing, 55);
      } else {
        step(deleting, 4500); // hold
      }
    };
    const deleting = () => {
      const s = st.current;
      const w = words[s.wi];
      if (s.ci > 0) {
        s.ci--;
        setDisplay(w.slice(0, s.ci));
        step(deleting, 30);
      } else {
        s.wi = (s.wi + 1) % words.length;
        step(typing, 400);
      }
    };
    step(deleting, 4500); // start by holding the first (already-full) word
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [reduce, words]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className="relative inline-grid align-baseline">
      <span aria-hidden className="[grid-area:1/1] invisible whitespace-nowrap justify-self-start">
        {longest}
      </span>
      <span className={`[grid-area:1/1] justify-self-start whitespace-nowrap ${className}`}>
        {display}
        <span aria-hidden className={`tw-caret ${caretClassName}`}>
          |
        </span>
      </span>
    </span>
  );
}

/** C — Static sunrise sweep: no rotation; one word with a slow gradient sheen. */
export function SweepWord({ word, className = "" }: { word: string; className?: string }) {
  return <span className={`text-sunrise-sweep ${className}`}>{word}</span>;
}
