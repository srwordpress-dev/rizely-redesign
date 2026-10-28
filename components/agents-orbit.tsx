"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/site";
import { ScanLine, RefreshCw, Star, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Status = "live" | "roadmap";

type Agent = {
  name: string;
  short: string;
  icon: LucideIcon;
  status: Status;
  desc: string;
};

const agents: Agent[] = [
  {
    name: "Rizely Cards",
    short: "Cards",
    icon: ScanLine,
    status: "live",
    desc: "Scans event business cards, builds your lead pipeline, and drafts personalised WhatsApp and Telegram follow-ups for you to approve. This is the one doing real work today.",
  },
  {
    name: "The Keeper",
    short: "Keeper",
    icon: RefreshCw,
    status: "roadmap",
    desc: "Keeps your contacts from going stale — enriches each lead and quietly updates the record when someone changes company or role. A CRM that maintains itself. Early enrichment already runs today inside the Card Agent.",
  },
  {
    name: "The Reviews Agent",
    short: "Reviews",
    icon: Star,
    status: "roadmap",
    desc: "For local businesses: turns genuinely happy customers into real Google reviews, the honest way. No fake reviews, no gating — those get you banned, and we won't build them.",
  },
  {
    name: "The Caller",
    short: "Caller",
    icon: PhoneCall,
    status: "roadmap",
    desc: "Makes and takes follow-up calls when a message isn't enough — so the warm leads don't slip while you're stuck on the expo floor. The furthest out; we'll claim it when it's real.",
  },
];

const statusStyles: Record<Status, string> = {
  live: "bg-brand-teal/15 text-brand-teal border-brand-teal/30",
  roadmap: "bg-muted text-muted-foreground border-border",
};

const statusLabel: Record<Status, string> = {
  live: "Live",
  roadmap: "On the roadmap",
};

const statusDot: Record<Status, string> = {
  live: "bg-brand-teal",
  roadmap: "bg-muted-foreground",
};

/* One agent chip riding an orbit arm. The arm is a static transform that
   places the chip on the ring; the ring group spins and the chip counter-spins
   so the label stays upright. All motion is off under prefers-reduced-motion. */
function OrbitChip({
  agent,
  angle,
  radius,
  counterClass,
}: {
  agent: Agent;
  angle: number;
  radius: number;
  counterClass: string;
}) {
  const Icon = agent.icon;
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
      }}
    >
      <div className={`-translate-x-1/2 -translate-y-1/2 ${counterClass}`}>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-1 shadow-sm backdrop-blur">
          <Icon
            aria-hidden="true"
            className={`size-3.5 ${
              agent.status === "live" ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <span className="text-xs font-medium">{agent.short}</span>
          <span aria-hidden="true" className={`size-1.5 rounded-full ${statusDot[agent.status]}`} />
          <span className="sr-only">({statusLabel[agent.status].toLowerCase()})</span>
        </div>
      </div>
    </div>
  );
}

function OrbitVisual() {
  // radii in px relative to a 300px box; kept small enough that the pill chips
  // (centred on each ring) never overflow the box → no mobile horizontal scroll.
  const inner = 62;
  const outer = 100;
  return (
    <div className="relative mx-auto aspect-square w-[300px] max-w-full select-none overflow-hidden">
      {/* overflow-hidden: the spinning ring groups' rotated bounding box would
          otherwise spill past the box and cause a few px of page scroll on
          mobile. All visible elements sit well inside, so nothing is clipped. */}
      {/* orbit rings (static circles) — diameters = 2 × chip radius so chips ride the ring */}
      <div className="absolute left-1/2 top-1/2 size-[124px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/70" />
      <div className="absolute left-1/2 top-1/2 size-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/50" />

      {/* the sun = the user's business, at the centre */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="sun-pulse grid size-24 place-items-center rounded-full bg-sunrise shadow-[0_0_60px_-6px_rgba(240,81,0,0.55)]">
          <span className="text-center text-[11px] font-semibold uppercase tracking-wide leading-tight text-white">
            Your
            <br />
            business
          </span>
        </div>
      </div>

      {/* inner ring group (Cards, live) — spins one way, chip counter-spins */}
      <div className="orbit-ring absolute inset-0" style={{ ["--orbit-duration" as string]: "48s" }}>
        <OrbitChip agent={agents[0]} angle={20} radius={inner} counterClass="orbit-chip-counter" />
      </div>

      {/* outer ring group (roadmap agents) — spins the other way */}
      <div
        className="orbit-ring-rev absolute inset-0"
        style={{ ["--orbit-duration" as string]: "72s" }}
      >
        <OrbitChip agent={agents[1]} angle={150} radius={outer} counterClass="orbit-chip-counter-rev" />
        <OrbitChip agent={agents[2]} angle={265} radius={outer} counterClass="orbit-chip-counter-rev" />
        <OrbitChip agent={agents[3]} angle={35} radius={outer} counterClass="orbit-chip-counter-rev" />
      </div>
    </div>
  );
}

export default function AgentsOrbit() {
  return (
    <section
      id="agents"
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
          The hive
        </span>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          You&apos;re at the centre. Each agent owns one job.
        </h2>
        <p className="text-muted-foreground text-lg">
          Rizely isn&apos;t one big app that does everything badly. It&apos;s a set of focused AI
          micro-agents — each owns a single job. Today one is live and working. The rest are on
          the roadmap. We&apos;d rather ship one agent that works than four that sort of do.
        </p>
      </motion.div>

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* the orbit motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 order-1 lg:order-none py-6"
        >
          <OrbitVisual />
          {/* The chips only carry a dot, so the legend is what labels roadmap agents as roadmap (01 §5). */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground" aria-hidden="true">
            {(Object.keys(statusLabel) as Status[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={`size-1.5 rounded-full ${statusDot[s]}`} />
                {statusLabel[s]}
              </span>
            ))}
          </div>
        </motion.div>

        {/* the honest agent list */}
        <div className="flex flex-col gap-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-2xl border p-5 ${
                  agent.status === "live"
                    ? "border-primary/40 bg-primary/5"
                    : "hover-card border-border bg-card/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`grid size-10 shrink-0 place-items-center rounded-xl border ${
                      agent.status === "live"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading font-semibold">{agent.name}</h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                          statusStyles[agent.status]
                        }`}
                      >
                        {statusLabel[agent.status]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {agent.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="cta-sunrise w-full sm:w-auto">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Put the live agent to work
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/agents">Meet all the agents</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
