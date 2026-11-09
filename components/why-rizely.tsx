"use client";

import { motion } from "framer-motion";
import { Repeat2, Languages, MessageCircle, Ticket } from "lucide-react";
import SectionKicker from "@/components/section-kicker";

const points = [
  {
    icon: Repeat2,
    title: "Capture and follow-up",
    desc: "No CRM auto-sends a follow-up after a scan. Rizely reads the card and drafts the follow-up in one step.",
  },
  {
    icon: Languages,
    title: "Reads cards in your language, not just English",
    desc: "Hindi, Gujarati, Marathi and plenty more, not just English. A coffee-stained card at 11pm can still stump it — we’d rather tell you that than pretend.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp, with Telegram in beta",
    desc: "It works where your leads already are — no new app to make anyone install, nothing for your team to learn by Monday.",
  },
  {
    icon: Ticket,
    title: "Priced the way you actually sell",
    desc: "Annual, or a one-off pass for a single event — pay for the show, not the year. Prices in USD; in India, INR with a GST invoice and UPI.",
  },
];

export default function WhyRizely() {
  return (
    <section className="w-full border-y border-border/60 bg-card/30">
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col gap-3 text-center mb-14 max-w-2xl mx-auto"
        >
          <SectionKicker no="03" className="mx-auto">Why Rizely</SectionKicker>
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Scanning is the easy part. Rizely <em>keeps going</em>.
          </h2>
          <p className="text-muted-foreground text-lg">
            {/* Was handoff/01 §6's "the only tool that does capture and follow-up…".
                The "only" claim was dropped in the Nov 2026 editorial pass (approved by
                the site owner); restore it only with fresh competitor evidence. */}
            Capture <em className="not-italic text-foreground font-medium">and</em> follow-up
            together, in Indian languages, priced per event.
          </p>
        </motion.div>

        {/* auto-rows-fr: every row is as tall as the tallest card, so all four
            cards are the same size at every width. Stacked like Three Layers. */}
        <div className="grid gap-5 sm:grid-cols-2 auto-rows-fr max-w-4xl mx-auto">
          {points.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="hover-card flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-peach border border-primary/20">
                  <p.icon aria-hidden="true" className="size-5 text-primary" />
                </div>
                <span className="font-heading text-2xl font-bold text-muted-foreground/60 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
