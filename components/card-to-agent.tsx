"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/site";

/*
  The bridge: card buyer -> agent. This is the commercial point of the page
  (FORECAST-card-to-agent-funnel.md: the card nets ₹29-151, so every rupee of
  profit is made after it ships). Short on purpose, and it does not nag — the
  honest pitch is that the card solved one direction and left the other one
  untouched.
*/

const beats = [
  {
    k: "Your card handles one direction",
    v: "They tap, they get you. That half is done, and it cost you ₹599 once.",
  },
  {
    k: "The stack in your pocket is the other",
    v: "Forty cards from two days on the floor, and no record of who was worth calling.",
  },
  {
    k: "That's the half the agent takes",
    v: "Photograph them in WhatsApp. Each one becomes a lead with a follow-up already drafted, in their language, before the week goes cold.",
  },
];

export default function CardToAgent() {
  return (
    <section className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-20 md:py-24 md:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/40 p-8 sm:p-10"
      >
        <div className="max-w-2xl">
          <span className="w-fit text-xs font-semibold uppercase tracking-widest text-primary-text">
            Already have the card?
          </span>
          <h2 className="mt-3 text-2xl font-heading font-bold sm:text-3xl tracking-tight">
            The card gets you remembered. The agent gets you a reply.
          </h2>
        </div>

        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {beats.map((b, i) => (
            <li key={b.k} className="flex flex-col gap-2">
              <span className="font-heading text-sm font-bold text-brand-amber tabular-nums">
                0{i + 1}
              </span>
              <h3 className="text-sm font-semibold leading-snug">{b.k}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.v}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Button asChild size="lg" className="cta-sunrise h-12 px-6">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Try it on your last event
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            First 50 scans are free. You do not need the card to use the agent, or the agent to
            use the card.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
