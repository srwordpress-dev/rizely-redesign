"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

/*
  Why Rizely (Nov 2026, B): an editorial list instead of the 2x2 icon grid.
  The heading holds the left column (sticky on desktop); each reason is one
  large line, a short note, and a small drawing of the thing itself.
  "Only" claims stay out (dropped in the Nov 2026 editorial pass); restore them
  only with fresh competitor evidence.
*/

function Flow() {
  return (
    <div className="wr-vis" aria-hidden="true">
      <span className="wr-chip">
        <span className="wr-mini-card" />
        Card
      </span>
      <span className="wr-arrow">→</span>
      <span className="wr-chip">Lead</span>
      <span className="wr-arrow">→</span>
      <span className="wr-chip wr-chip-hot">Draft ready</span>
    </div>
  );
}

function Scripts() {
  return (
    <div className="wr-vis wr-scripts" aria-hidden="true">
      <span lang="hi">नमस्ते</span>
      <span lang="gu">નમસ્તે</span>
      <span lang="en">Hello</span>
    </div>
  );
}

function Apps() {
  return (
    <div className="wr-vis" aria-hidden="true">
      <span className="wr-chip">
        <WhatsAppIcon className="size-4 text-[#25D366]" />
        WhatsApp
      </span>
      <span className="wr-chip">
        <svg viewBox="0 0 24 24" className="size-4 text-[#26A5E4]" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        Telegram
        <span className="wr-tag">beta</span>
      </span>
    </div>
  );
}

function Ticket() {
  return (
    <div className="wr-vis" aria-hidden="true">
      <span className="wr-ticket">
        <span className="wr-ticket-k">Event Pass</span>
        <span className="wr-ticket-v">One show</span>
      </span>
      <span className="wr-or">or</span>
      <span className="wr-chip">Yearly</span>
    </div>
  );
}

const points = [
  {
    title: "Capture and follow-up, in one step",
    desc: "No CRM drafts a follow-up when you scan. Rizely reads the card and writes the message straight away.",
    Vis: Flow,
  },
  {
    title: "Reads cards in your language",
    desc: "Hindi, Gujarati, Marathi and plenty more. A coffee-stained card at 11pm can still stump it, and we’d rather tell you that than pretend.",
    Vis: Scripts,
  },
  {
    title: "WhatsApp, with Telegram in beta",
    desc: "It works where your leads already are. No new app for anyone to install, nothing for your team to learn by Monday.",
    Vis: Apps,
  },
  {
    title: "Priced the way you actually sell",
    desc: "Annual, or a pass for a single event: pay for the show, not the year. In India, INR with a GST invoice and UPI.",
    Vis: Ticket,
  },
];

export default function WhyRizely() {
  return (
    <section className="w-full">
      <div className="max-w-(--breakpoint-xl) mx-auto grid gap-10 px-4 py-24 md:px-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col gap-4 lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
        >
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight text-balance">
            Scanning is the easy part. Rizely keeps going.
          </h2>
          <p className="text-muted-foreground text-lg">
            Capture and follow-up together, in Indian languages, priced per event.
          </p>
        </motion.div>

        <ol className="lg:col-span-8 border-t border-line">
          {points.map((p, index) => (
            <motion.li
              key={p.title}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06, type: "spring", bounce: 0 }}
              className="grid gap-5 border-b border-line py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-serif-display text-2xl leading-tight sm:text-[1.75rem]">{p.title}</h3>
                <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <p.Vis />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
