"use client";

import { motion } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";

// Honest, mechanism-based before/after — describes the manual pain vs. what the
// loop does. Deliberately NO fabricated percentages, ₹ figures, user counts, or
// named testimonials (see mission-control/CORRECTIONS.md). Real, logged event
// stories replace the early-access note below only when they actually exist.
const before = [
  "You come home from the expo with 80 cards in a jacket pocket.",
  "The follow-up is a Sunday-night Excel job you keep pushing.",
  "Two weeks later, half the stack has quietly gone cold in a drawer.",
];

const after = [
  "Each card becomes a clean lead in seconds, filed under the right event.",
  "The personalised follow-up goes out the same night — in the lead's language.",
  "Nothing gets left in the drawer. Every card gets worked, not lost.",
];

export default function Proof() {
  return (
    <section className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-14 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          What one event turns into
        </h2>
        <p className="text-muted-foreground text-lg">
          The same stack of cards, two very different Mondays.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Before */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
        >
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Without Rizely
          </h3>
          <ul className="space-y-4">
            {before.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-muted-foreground">
                <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-destructive" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-6 sm:p-8"
        >
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">
            With Rizely
          </h3>
          <ul className="space-y-4">
            {after.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-foreground/90">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Early-access honesty note — no invented proof. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-8 max-w-4xl rounded-2xl border border-dashed border-border bg-card/30 p-5 text-center"
      >
        <p className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles aria-hidden="true" className="size-4 text-brand-amber" />
          <span>
            <span className="font-medium text-foreground">Early access.</span> Rizely Cards is
            live with the first exhibitors. Real, logged event stories will land here — we
            publish those, not invented numbers or stock testimonials.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
