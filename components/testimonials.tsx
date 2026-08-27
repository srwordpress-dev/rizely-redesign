"use client";

import { motion } from "framer-motion";

// NOTE: Placeholder / illustrative testimonials for design preview only.
// Replace with verified real customer quotes before relying on these.
const testimonials = [
  {
    quote:
      "We came back from a 3-day expo with 200 cards and, for the first time, zero data entry. Every lead had a follow-up before we'd even left the venue.",
    name: "Ananya Iyer",
    role: "Co-founder, Brightfield Labs",
    initials: "AI",
  },
  {
    quote:
      "Our reps used to lose half the cards in a hotel drawer. Now they scan on WhatsApp at the booth and the follow-up just… happens.",
    name: "Rohan Malhotra",
    role: "Founder & CEO, Vaya Analytics",
    initials: "RM",
  },
  {
    quote:
      "The Hindi and Gujarati card reading actually works — that alone made it worth it for our regional events. Per-event pricing let us start with one show.",
    name: "Karthik Reddy",
    role: "Head of Growth, NimbusPay",
    initials: "KR",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-16 md:py-24 md:px-8 flex flex-col items-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-4 max-w-2xl"
      >
        <h2 className="text-2xl font-semibold sm:text-3xl tracking-tight bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Built for teams who live at events
        </h2>
      </motion.div>
      {/* Honest marker — remove once real quotes are in */}
      <p className="mb-12 text-xs text-muted-foreground/70">
        Illustrative previews — verified customer stories launching soon.
      </p>

      <div className="grid gap-5 md:grid-cols-3 w-full max-w-5xl">
        {testimonials.map((t, index) => (
          <motion.figure
            key={t.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative rounded-2xl border border-border bg-card/50 p-6 flex flex-col gap-4"
          >
            <span className="self-end rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground/60">
              Sample
            </span>
            <blockquote className="text-sm leading-relaxed text-foreground/90">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                {t.initials}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
