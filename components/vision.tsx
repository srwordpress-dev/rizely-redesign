"use client";

import { motion } from "framer-motion";
import { Handshake, Database, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Where the product is going (Acquisition -> Management -> Agentic), told
// honestly: each line labels what is live vs on the way.
//
// Deliberately says STAGES, not layers. The three-layers section above owns
// that word for the card/profile/agent story, and a reader meeting "layers"
// twice meaning two different things learns neither.
type Stage = {
  n: string;
  icon: LucideIcon;
  title: string;
  line: string;
  now: string; // what works today
  next: string; // what's coming
};

const stages: Stage[] = [
  {
    n: "01",
    icon: Handshake,
    title: "Acquisition — get the lead, with consent",
    line: "Events, business cards, review tags for local shops, partner channels — different ways to stand next to a consented opt-in and feed one pipeline.",
    now: "Live today: event cards on WhatsApp & Telegram.",
    next: "Roadmap: review tags and partner channels.",
  },
  {
    n: "02",
    icon: Database,
    title: "Management — a CRM that maintains itself",
    line: "Every lead lands in one place and keeps itself current — enriching from public signals, filling the blanks the card left, and flagging who's worth your time.",
    now: "Live today: managed pipeline + web enrichment written back to the lead.",
    next: "Roadmap: the self-updating, self-qualifying CRM.",
  },
  {
    n: "03",
    icon: Bot,
    title: "Agentic — agents that do the work",
    line: "Small AI agents that capture, follow up, and eventually carry the conversation — and that you can run from the assistant you already use.",
    now: "Live today: the Card Agent's follow-ups, and Connect on Claude.",
    next: "Roadmap: the Keeper, the Reviews Agent, and the Caller.",
  },
];

export default function Vision() {
  return (
    <section
      id="vision"
      className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-14 max-w-2xl mx-auto"
      >
        <span className="mx-auto w-fit text-xs font-semibold uppercase tracking-widest text-primary">
          Where this is going
        </span>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          Capture it, keep it, close it — as one product.
        </h2>
        <p className="text-muted-foreground text-lg">
          The card, the profile and the agent are here today. Underneath them the product is
          being built in three stages — one at a time, each turned on only when it actually
          works, and we&apos;ll always tell you which is which.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3 max-w-6xl mx-auto">
        {stages.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.n}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-sunrise text-white shadow-[0_0_30px_-8px_rgba(240,81,0,0.55)]">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <span className="font-heading text-2xl font-bold text-muted-foreground/40 tabular-nums">
                  {layer.n}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg leading-snug">{layer.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{layer.line}</p>
              <div className="mt-auto space-y-2 pt-2 text-sm">
                <p className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span className="text-foreground/90">{layer.now}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                  <span className="text-muted-foreground">{layer.next}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
