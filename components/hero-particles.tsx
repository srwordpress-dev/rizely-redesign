"use client";

/*
  React wrapper for the hero animation. The engine lives in lib/hero-anim.ts.

  Decorative: aria-hidden, and the H1 carries all the meaning. Under
  prefers-reduced-motion no animation loop is ever started — the settled
  composition is drawn once, as a still picture that reads on its own.
*/

import { useEffect, useRef } from "react";
import { COLORS, buildScene, update, type Scene } from "@/lib/hero-anim";

/** Alpha is quantised into these levels so the draw pass can batch by style. */
const LEVELS = [0.28, 0.52, 0.76, 1] as const;

export default function HeroParticles({
  className = "",
  /** Render the settled frame only, no loop (also what reduced-motion gets). */
  forceStatic = false,
  /** Bump to restart the animation from t=0. */
  replay = 0,
  /** Freeze on one moment, in seconds. Used by the prototype's scrubber. */
  scrubTo,
}: {
  className?: string;
  forceStatic?: boolean;
  replay?: number;
  scrubTo?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const frozen = typeof scrubTo === "number";
    const still = forceStatic || reduced || frozen;

    // Pre-built rgba strings: one per (colour, alpha level) pair.
    const styles: string[] = [];
    for (const hex of COLORS) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      for (const l of LEVELS) styles.push(`rgba(${r},${g},${b},${l})`);
    }

    let scene: Scene | null = null;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let X = new Float32Array(0);
    let Y = new Float32Array(0);
    let A = new Float32Array(0);
    let buckets: Int32Array[] = [];
    let counts = new Int32Array(styles.length);
    let dot = 1.6;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(320, Math.round(rect.width));
      H = Math.max(240, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fewer particles on small screens — same composition, coarser sampling.
      const density = W < 768 ? 0.45 : W < 1100 ? 0.8 : 0.95;
      dot = W < 768 ? 1.5 : 1.9;

      scene = buildScene(W, H, density);
      const n = scene.particles.length;
      X = new Float32Array(n);
      Y = new Float32Array(n);
      A = new Float32Array(n);
      buckets = styles.map(() => new Int32Array(n));
      counts = new Int32Array(styles.length);
    };

    const draw = (t: number) => {
      if (!scene) return;
      const { rings } = update(scene, t, W, H, X, Y, A);
      ctx.clearRect(0, 0, W, H);

      // The tap's ripple, behind the field and clipped out of the headline box
      // so it can bloom wide without ever competing with the text.
      if (rings.length) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, H);
        const sf = scene.safe;
        ctx.roundRect(
          (sf.cx - sf.w / 2) * W,
          (sf.cy - sf.h / 2) * H,
          sf.w * W,
          sf.h * H,
          28,
        );
        ctx.clip("evenodd");
        ctx.lineWidth = 1.5;
        for (const r of rings) {
          ctx.strokeStyle = `rgba(240,81,0,${r.a * 0.42})`;
          ctx.beginPath();
          ctx.arc(scene.contact.x, scene.contact.y, r.r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Batch the particles by (colour, alpha level): ~20 style changes a frame
      // instead of one per particle.
      counts.fill(0);
      const ps = scene.particles;
      for (let i = 0; i < ps.length; i++) {
        const a = A[i];
        if (a < 0.06) continue;
        const l = a >= 1 ? 3 : (a * 4) | 0;
        const b = ps[i].col * 4 + (l > 3 ? 3 : l);
        buckets[b][counts[b]++] = i;
      }
      for (let b = 0; b < counts.length; b++) {
        const c = counts[b];
        if (!c) continue;
        ctx.fillStyle = styles[b];
        const arr = buckets[b];
        for (let j = 0; j < c; j++) {
          const i = arr[j];
          ctx.fillRect(X[i], Y[i], dot, dot);
        }
      }
    };

    build();

    if (still) {
      // One frame. No rAF, ever. Default is well past the settle point.
      const at = frozen ? (scrubTo as number) : 60;
      draw(at);
      const onResizeStatic = () => {
        build();
        draw(at);
      };
      const ro = new ResizeObserver(onResizeStatic);
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = performance.now();
    let visible = true;
    /** Pause the loop once it has breathed for a while; scrolling back resumes. */
    const STOP_AFTER = 26;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      draw(t);
      if (visible && t < STOP_AFTER) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) {
          // Resume mid-composition rather than replaying the whole thing.
          start = performance.now() - 8000;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      build();
    });
    ro.observe(canvas);

    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [forceStatic, replay, scrubTo]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
