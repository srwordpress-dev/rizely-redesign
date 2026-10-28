"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARDS, SHOP_URL } from "@/lib/site";

/* The hero's card CTA: one button that rotates through the three cards the shop
   sells, each label linking to that card's product page.

   - Width is frozen to the longest label (invisible sizers in one grid cell, as
     in rotating.tsx), so the hero never reflows as the text changes.
   - Rotation pauses while the button is hovered or focused, so the label (and the
     link) can't change under someone's pointer just before they click.
   - Under prefers-reduced-motion it doesn't rotate at all: it shows one static
     label and links to the whole shop. */

const DWELL_MS = 2500;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const label = (c: (typeof CARDS)[number]) => `${c.name} — from ${c.from}`;
const STATIC_LABEL = `Choose your NFC card — from ${CARDS[1].from}`;

export default function CardCta({ className = "" }: { className?: string }) {
  // The server can't know the visitor's motion setting, so the first client render
  // must match the server's (first card); the static label only takes over after
  // mount. Reading useReducedMotion() straight into the render broke hydration.
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && prefersReduced;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % CARDS.length), DWELL_MS);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const card = CARDS[i];
  const text = reduce ? STATIC_LABEL : label(card);

  return (
    <Button asChild variant="outline" size="lg" className={className}>
      <Link
        href={reduce ? SHOP_URL : card.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={text}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <span className="relative inline-grid" aria-hidden="true">
          {[...CARDS.map(label), STATIC_LABEL].map((l) => (
            <span key={l} className="[grid-area:1/1] invisible whitespace-nowrap">
              {l}
            </span>
          ))}
          <span className="[grid-area:1/1] justify-self-center overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={text}
                className="inline-block whitespace-nowrap"
                initial={{ opacity: 0, y: "0.6em" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-0.6em" }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {text}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </Button>
  );
}
