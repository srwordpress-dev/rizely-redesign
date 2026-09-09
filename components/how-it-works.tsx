"use client";

import { motion } from "framer-motion";
import { ScanLine, Sparkles, Send } from "lucide-react";

const steps = [
  {
    icon: ScanLine,
    step: "01",
    title: "Snap the card on WhatsApp",
    desc: "Photograph any business card inside WhatsApp or Telegram — even Hindi, Gujarati or Marathi cards. No app to install, no typing.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "The AI builds the lead",
    desc: "Rizely reads the card, files it under the right event, and turns it into a clean, managed contact in your pipeline — in about two seconds.",
  },
  {
    icon: Send,
    step: "03",
    title: "The follow-up sends itself",
    desc: "A personalised follow-up goes out automatically, so the lead hears from you in seconds instead of nine days later — or never.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-16 md:py-24 md:px-8 flex flex-col items-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-14 max-w-2xl"
      >
        <h2 className="text-2xl font-semibold sm:text-3xl tracking-tight bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          From booth to follow-up in three steps
        </h2>
        <p className="text-muted-foreground">
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
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                <s.icon className="size-5 text-primary" />
              </div>
              <span className="font-mono text-sm text-muted-foreground/70">{s.step}</span>
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
