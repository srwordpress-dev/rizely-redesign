"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

/*
  A hand-drawn mark (rough-notation) on a word or two: the one human, slightly
  imperfect stroke on the page. Drawn once, after the hero has settled; with
  reduced motion it appears already drawn. The colour comes from --spark.
*/
export default function Scribble({
  children,
  type = "underline",
  delay = 1100,
}: {
  children: React.ReactNode;
  type?: "underline" | "circle" | "box" | "highlight";
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--spark").trim() || "#F05100";
    const a = annotate(el, {
      type,
      color,
      strokeWidth: 3,
      padding: [0, 2],
      animate: !reduce,
      animationDuration: 700,
      iterations: 1,
      multiline: true,
    });
    const id = window.setTimeout(() => a.show(), reduce ? 0 : delay);
    return () => {
      window.clearTimeout(id);
      a.remove();
    };
  }, [type, delay]);
  return <span ref={ref}>{children}</span>;
}
