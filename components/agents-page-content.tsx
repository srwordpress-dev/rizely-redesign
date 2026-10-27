"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/site";
import { ScanLine, RefreshCw, Star, PhoneCall, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Status = "live" | "roadmap" | "exploring";

const statusStyles: Record<Status, string> = {
  live: "bg-brand-teal/15 text-brand-teal border-brand-teal/30",
  roadmap: "bg-muted text-muted-foreground border-border",
  exploring: "bg-muted text-muted-foreground border-border",
};

const statusLabel: Record<Status, string> = {
  live: "Live",
  roadmap: "On the roadmap",
  exploring: "Exploring",
};

type Agent = {
  name: string;
  icon: LucideIcon;
  status: Status;
  body: string;
  limits?: string;
};

const agents: Agent[] = [
  {
    name: "The Card Agent",
    icon: ScanLine,
    status: "live",
    body: "Photograph a business card in WhatsApp or Telegram. It reads the card (Indian-language cards too, not just English), turns it into a clean lead with name, company, role, phone, email and event, and files it into your pipeline. Then it drafts a personalised follow-up for each person and sends it on WhatsApp or Telegram — you approve the first batch, and it keeps asking until you tell it to run on its own. It's the part that usually gets dropped: capture and follow-up, in one motion.",
    limits:
      "Honest limits: a badly printed or damaged card can still need a human glance, and when it's unsure it flags the lead rather than guessing.",
  },
  {
    name: "The Keeper",
    icon: RefreshCw,
    status: "roadmap",
    body: "Keeps your contacts from going stale. It enriches each lead, fills the gaps the card left blank, and updates the record when someone switches company or role — a CRM that maintains itself instead of nagging you to. Early enrichment already runs today inside the Card Agent; the Keeper turns it into an agent of its own.",
  },
  {
    name: "The Reviews Agent",
    icon: Star,
    status: "roadmap",
    body: "For local businesses — clinics, showrooms, neighbourhood shops. It turns genuinely happy customers into real Google reviews, the honest way. No fake reviews, no review-gating, no “we'll remove the bad ones” — those break Google's rules and India's consumer-protection rules, so we won't build them. Just more of the real reviews you've earned.",
  },
  {
    name: "The Caller",
    icon: PhoneCall,
    status: "roadmap",
    body: "An AI agent that makes and takes follow-up calls when a message isn't enough — so the hot leads don't go cold while you're stuck on the expo floor. This is the furthest out; we'll only claim it when it's real.",
  },
  {
    name: "More on the way",
    icon: Sparkles,
    status: "exploring",
    body: "Partner channels and a referral agent. Directional, not promised — when one is real, it gets its own card above.",
  },
];

export default function AgentsPageContent() {
  return (
    <main className="flex flex-col min-h-dvh">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 pt-20 pb-12 md:pt-28 md:px-8 text-center">
          <span className="w-fit mx-auto inline-block text-xs sm:text-sm bg-card px-3 py-1 border border-border rounded-full text-muted-foreground mb-6">
            The hive
          </span>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight md:text-5xl text-balance leading-[1.05] max-w-3xl mx-auto">
            Small agents. Real work. One <span className="text-sunrise">raises</span> your business.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-balance">
            Rizely is a platform of AI micro-agents — each built to own one job well, work on its
            own or together, and report to you where you already are: WhatsApp and Telegram.
            Here&apos;s what&apos;s live today and what&apos;s coming, told straight.
          </p>
        </div>
        <div className="w-full h-full absolute -top-40 left-1/2 -translate-x-1/2 flex justify-center items-start pointer-events-none -z-10">
          <div className="w-[42rem] h-80 bg-light blur-[130px] rounded-full opacity-25" />
        </div>
      </section>

      {/* The micro-agent model */}
      <section className="max-w-3xl mx-auto px-4 pb-6 md:px-8">
        <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8 text-center">
          <p className="text-muted-foreground leading-relaxed">
            Most software asks you to learn a big dashboard and do the work yourself. Rizely flips
            that. Instead of one bloated app, you get focused agents, each with one job. Today
            that&apos;s scanning the cards; keeping contacts fresh, growing reviews and making calls
            come next. One agent is live and
            doing real work today. The rest are on the roadmap — we ship them when they actually
            work, not before.
          </p>
        </div>
      </section>

      {/* Agent cards */}
      <section className="max-w-4xl mx-auto w-full px-4 py-12 md:px-8 flex flex-col gap-5">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const isLive = agent.status === "live";
          return (
            <motion.div
              key={agent.name}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`rounded-2xl border p-6 ${
                isLive ? "border-primary/40 bg-primary/5" : "border-border bg-card/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl border ${
                    isLive
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-heading font-semibold text-lg">{agent.name}</h2>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                        statusStyles[agent.status]
                      }`}
                    >
                      {statusLabel[agent.status]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.body}</p>
                  {agent.limits && (
                    <p className="text-sm text-muted-foreground/80 italic leading-relaxed">
                      {agent.limits}
                    </p>
                  )}
                  {isLive && (
                    <div className="pt-2">
                      <Button asChild size="sm">
                        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                          Put the Card Agent to work
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Closing block */}
      <section className="max-w-2xl mx-auto px-4 py-16 md:px-8 text-center">
        <h2 className="text-2xl font-heading font-bold sm:text-3xl tracking-tight text-balance">
          Start with the one that&apos;s live.
        </h2>
        <p className="mt-4 text-muted-foreground">
          The Card Agent is live now, your first 50 scans are free, and it works inside the WhatsApp
          you already have open. Try it on the cards from your last event — the rest of the platform
          will be here when you need it.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Scan your first 50 cards free
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/connect">See it run from Claude</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
