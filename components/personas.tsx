"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/site";
import { Briefcase, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Two use-cases, cost-differentiated: the person who ATTENDS the event vs. the
// team that RUNS the booth. Each maps to the plan that fits how they show up.
type Persona = {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  fit: string;
  cta: string;
};

const personas: Persona[] = [
  {
    icon: Briefcase,
    tag: "You attend the event",
    title: "Field sales & BD",
    body: "Conferences, expos, networking meetups — you're collecting cards in conversations all day. Snap each one in WhatsApp as you go, and Rizely files the lead and drafts the follow-up in their language, so it's ready to send before you've even landed home.",
    fit: "Best fit: Solo — $79/yr if you work events often, or a one-off Event Pass — $49 for a single show.",
    cta: "Start free on WhatsApp",
  },
  {
    icon: Store,
    tag: "You run the booth",
    title: "Exhibitors & booth teams",
    body: "Two days, hundreds of scans, several people on the stand — and normally the leads end up scattered across everyone's phones. Your whole team captures into one shared pipeline tagged to the show, follow-ups are drafted the same day, and you pull every lead from the show before you pack down.",
    fit: "Best fit: Event Pass — $49/event for 5 seats, or Team / Business if you exhibit all year.",
    cta: "Get an Event Pass",
  },
];

export default function Personas() {
  return (
    <section id="use-cases" className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-14 max-w-2xl mx-auto"
      >
        <span className="mx-auto w-fit text-xs font-semibold uppercase tracking-widest text-primary">
          Use cases
        </span>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          Walk the floor, or run the booth?
        </h2>
        <p className="text-muted-foreground text-lg">
          Same product, a different play — and a plan that matches how you actually show up.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 max-w-5xl mx-auto">
        {personas.map((p, index) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {p.tag}
                  </span>
                  <h3 className="font-heading font-semibold text-lg">{p.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>

              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-foreground/90">
                {p.fit}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    {p.cta}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#pricing">Compare plans</Link>
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
