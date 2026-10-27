"use client";

import { motion } from "framer-motion";
import { ScanLine, Sparkles, Send } from "lucide-react";

const steps = [
  {
    icon: ScanLine,
    step: "01",
    title: "Snap it",
    desc: "Photograph the card inside WhatsApp or Telegram — the apps already open on your phone. Nothing to download, no typing, no 'please enter your email' form.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Rizely files it",
    desc: "The agent reads the card — Hindi, Gujarati and Marathi too, not just English — sorts the details into a clean lead, and drops it into your pipeline. No retyping at midnight.",
  },
  {
    icon: Send,
    step: "03",
    title: "It follows up",
    desc: "Rizely drafts a personalised follow-up for each lead and sends it on WhatsApp or Telegram. You approve the first batch so it sounds like you — after that it can run on its own.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8 flex flex-col items-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-14 max-w-2xl"
      >
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          From a card in your hand to a reply in your inbox
        </h2>
        <p className="text-muted-foreground text-lg">
          The whole loop happens in the chat app you already have open at the event.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3 w-full max-w-5xl">
        {steps.map((s, index) => (
          <motion.div
            key={s.step}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative rounded-2xl border border-border bg-card/50 p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <s.icon aria-hidden="true" className="size-5 text-primary" />
              </div>
              <span className="font-mono text-sm text-muted-foreground/70">{s.step}</span>
            </div>
            <h3 className="text-lg font-heading font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
