"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/site";
import {
  UserPlus,
  Search,
  CalendarDays,
  Download,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// The MCP "Connect" story — Rizely's pipeline, run from inside your AI assistant.
// Live on Claude today. Capabilities are described by JOB, not by raw tool name
// (server tool names must be verified before any exact label ships).
type Capability = { icon: LucideIcon; title: string; desc: string };

const capabilities: Capability[] = [
  {
    icon: UserPlus,
    title: "Add & update contacts",
    desc: "Paste a card photo or just describe someone — Rizely files the lead and enriches it, no scan charge.",
  },
  {
    icon: Search,
    title: "Find & segment leads",
    desc: "Ask for a slice of your pipeline by event, tag, channel or date, right there in the chat.",
  },
  {
    icon: CalendarDays,
    title: "Organise events & recaps",
    desc: "Open or close an event, then pull a per-event recap — leads captured and follow-ups sent.",
  },
  {
    icon: Download,
    title: "Export to a sheet or CRM",
    desc: "Send a filtered set of leads out to a spreadsheet or your CRM in one line.",
  },
  {
    icon: Wallet,
    title: "Check balance & top up",
    desc: "See your plan and balance; top up over UPI (payment finishes safely in the browser).",
  },
];

export default function Connect() {
  return (
    <section
      id="connect"
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
          Connect
        </span>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          Run your pipeline from inside Claude.
        </h2>
        <p className="text-muted-foreground text-lg">
          Rizely plugs into the AI assistant you already have open. Connect your account once and
          work your whole pipeline in plain language — no dashboard to learn. It&apos;s live on
          Claude today; ChatGPT is next.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {capabilities.map((cap, index) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="rounded-2xl border border-border bg-card/40 p-5"
            >
              <div className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary mb-3">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="font-heading font-semibold mb-1">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </motion.div>
          );
        })}

        {/* honesty + where-it-works card */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: capabilities.length * 0.07 }}
          className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-5 flex flex-col justify-between"
        >
          <div>
            <span className="inline-block rounded-full border border-brand-teal/30 bg-brand-teal/15 px-2 py-0.5 text-[11px] font-medium text-brand-teal mb-3">
              Live on Claude
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Works today in Claude — web, desktop and Code. ChatGPT works through custom
              connectors on paid plans in developer mode (some tiers are read-only). It&apos;s a
              window onto your pipeline, not a separate product: you&apos;ll still need a Rizely
              account with WhatsApp or Telegram linked.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-10">
        <Button asChild size="lg">
          <Link href="/connect">See how Connect works</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Start free on WhatsApp
          </Link>
        </Button>
      </div>
    </section>
  );
}
