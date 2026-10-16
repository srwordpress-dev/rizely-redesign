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
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Capability = { icon: LucideIcon; title: string; desc: string };

const capabilities: Capability[] = [
  {
    icon: UserPlus,
    title: "Add & update contacts",
    desc: "Paste a card photo or describe a contact in the chat — Rizely extracts the details, files the lead and enriches it. Editing a lead only changes the fields you name; nothing else is touched.",
  },
  {
    icon: Search,
    title: "Find & segment your pipeline",
    desc: "Ask for a slice by free text, event, tag, capture channel or date range — or only the leads that have a WhatsApp number or an email. Get the shortlist without opening a dashboard.",
  },
  {
    icon: CalendarDays,
    title: "Organise events & pull a recap",
    desc: "Create or close an event, list what's open, and pull a per-event recap — leads captured and follow-ups sent. This is the “87 cards at one event” story, on demand.",
  },
  {
    icon: ListChecks,
    title: "See what just came in",
    desc: "Pull your most recent scans with their extracted fields and links to the card photo and any voice note, so you can review a batch straight after a show.",
  },
  {
    icon: Download,
    title: "Export to a sheet or CRM",
    desc: "Send a filtered set of leads out as a CSV for a spreadsheet or a one-way push into your CRM. Great for a hand-off; it's an export, not a two-way sync.",
  },
  {
    icon: Wallet,
    title: "Check balance & top up",
    desc: "See your plan, balance and which WhatsApp/Telegram numbers are linked. Top up over UPI — the payment always finishes safely in your browser, never in the chat.",
  },
];

const steps = [
  {
    n: "1",
    title: "Start on WhatsApp",
    desc: "Send Rizely the cards from your last event to create your account and build a pipeline. Your first 50 scans are free.",
  },
  {
    n: "2",
    title: "Add Rizely in Claude",
    desc: "Add Rizely as a connector and sign in. It's OAuth, scoped to your own account — you're always in control of access.",
  },
  {
    n: "3",
    title: "Just ask",
    desc: "“Add this card,” “show me leads from the Blockchain Week event,” “export them to a sheet.” Every action Rizely takes is attributed — you'll see it was done via Claude.",
  },
];

const limits = [
  "A pipeline search returns a focused shortlist, not your entire database — for the full set, ask for an export.",
  "Export is one-way: it copies leads out to a sheet or CRM. It isn't a live two-way sync.",
  "Payments always complete in your browser over UPI — never inside the chat.",
  "It's a window onto your pipeline, not a standalone product — you'll need a Rizely account with WhatsApp or Telegram linked.",
  "Scanning a photo or QR straight from the chat is on the way; today capture runs through the WhatsApp/Telegram bot.",
];

export default function ConnectPageContent() {
  return (
    <main className="flex flex-col min-h-dvh">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 pt-20 pb-12 md:pt-28 md:px-8 text-center">
          <span className="w-fit mx-auto inline-flex items-center gap-2 text-xs sm:text-sm bg-brand-teal/10 px-3 py-1 border border-brand-teal/30 rounded-full text-brand-teal mb-6">
            <span className="size-1.5 rounded-full bg-brand-teal" /> Live on Claude today
          </span>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight md:text-5xl text-balance leading-[1.05] max-w-3xl mx-auto">
            Run your pipeline from inside <span className="text-sunrise">Claude</span>.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground text-balance">
            Rizely connects to the AI assistant you already use. Add and find contacts, organise
            events, pull a recap, export your leads and top up — all in plain language, without
            learning a dashboard. Live on Claude now; ChatGPT is next.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Start free on WhatsApp
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link href="#how-to-connect">How to connect</Link>
            </Button>
          </div>
        </div>
        <div className="w-full h-full absolute -top-40 left-1/2 -translate-x-1/2 flex justify-center items-start pointer-events-none -z-10">
          <div className="w-[42rem] h-80 bg-light blur-[130px] rounded-full opacity-25" />
        </div>
      </section>

      {/* What you can do */}
      <section className="max-w-(--breakpoint-xl) mx-auto w-full px-4 py-16 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What you can do
          </span>
          <h2 className="mt-3 text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Your whole pipeline, in plain language
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
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
        </div>
      </section>

      {/* Where it works */}
      <section className="max-w-4xl mx-auto w-full px-4 py-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-6">
            <h3 className="font-heading font-semibold mb-1 flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-teal" /> Claude — live now
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Works in Claude on the web, the desktop app, and Claude Code. Connect once and go.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="font-heading font-semibold mb-1 flex items-center gap-2">
              <span className="size-2 rounded-full bg-muted-foreground/50" /> ChatGPT — next
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Works today through custom connectors on paid plans in developer mode; some tiers are
              read-only. We&apos;ll make it first-class as the platform opens up.
            </p>
          </div>
        </div>
      </section>

      {/* How to connect */}
      <section id="how-to-connect" className="max-w-4xl mx-auto w-full px-4 py-16 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            How to connect
          </span>
          <h2 className="mt-3 text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Three steps, no setup call
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.n}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card/40 p-6"
            >
              <div className="grid size-9 place-items-center rounded-full bg-sunrise text-white font-heading font-bold text-sm mb-4">
                {step.n}
              </div>
              <h3 className="font-heading font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Honest limits */}
      <section className="max-w-3xl mx-auto w-full px-4 py-8 md:px-8">
        <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
          <h3 className="font-heading font-semibold flex items-center gap-2 mb-4">
            <ShieldCheck aria-hidden="true" className="size-5 text-brand-teal" /> Straight about the edges
          </h3>
          <ul className="space-y-3">
            {limits.map((l) => (
              <li key={l} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 md:px-8 text-center">
        <h2 className="text-2xl font-heading font-bold sm:text-3xl tracking-tight text-balance">
          Bring your event pipeline into the chat.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start on WhatsApp, connect Rizely in Claude, and run your leads by just asking. Your
          first 50 scans are free.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Start free on WhatsApp
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/agents">Meet the agents</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
