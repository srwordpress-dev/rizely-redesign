"use client";

import { motion } from "framer-motion";
import { Repeat2, Languages, MessageCircle, Ticket } from "lucide-react";

const points = [
  {
    icon: Repeat2,
    title: "Capture and follow-up",
    desc: "No CRM auto-sends a follow-up after a scan. No AI sales tool ingests a card. Rizely lives in that gap — and that gap is the whole product.",
  },
  {
    icon: Languages,
    title: "Reads cards in your language, not just English",
    desc: "Hindi, Gujarati, Marathi and plenty more — most scanners admit, in their own docs, that they “work best with English.” A coffee-stained card at 11pm can still stump it — we’d rather tell you that than pretend.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp and Telegram, both",
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
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Most tools stop at the scan. Rizely keeps going.
          </h2>
          <p className="text-muted-foreground text-lg">
            {/* The sanctioned positioning line, used as CORRECTIONS.md writes it.
                "only one" is defensible only in the Indian-language framing —
                the verifiable gap (Karo "works best with English", Freshsales
                English-only). Broadening it to "your language" would quietly
                turn a supported claim into an unsupported one. */}
            We&apos;re not the first to scan a card on WhatsApp. We&apos;re the only one that
            does capture <em className="not-italic text-foreground font-medium">and</em>{" "}
            follow-up, in Indian languages, priced per event.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
          {points.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-4 rounded-2xl border border-border bg-background/60 p-6"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 border border-primary/20">
                <p.icon aria-hidden="true" className="size-5 text-primary" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
