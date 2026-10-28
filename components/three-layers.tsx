"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CreditCard, Smartphone, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WHATSAPP_URL, SHOP_URL, DASHBOARD_URL } from "@/lib/site";

/*
  The three shipped layers (PRD v4 D1). This section owns the word "layers";
  the roadmap section further down says "stages", so a reader never meets the
  same word meaning two different things.

  The profile has no link on purpose. profile.rizely.net is still an
  unconfigured vendor script showing placeholder copy and USD plans, so it is
  described here but nothing points at it until it is fixed (PRD v4 §3).
*/

type Layer = {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
  meta: React.ReactNode;
  cta?: { label: string; href: string; external: boolean };
};

const layers: Layer[] = [
  {
    n: "01",
    icon: CreditCard,
    title: "The card",
    body: "A PVC card with a chip in it. Hold it near a phone and your profile opens — no app on their side, no typing, nothing to spell out across a loud hall. 102 designs; pick one and we print it.",
    // GST only belongs in the ₹ view (01 §2); the card is sold in ₹ to everyone.
    meta: (
      <>
        <span data-price="inr">₹599 incl. GST · one-off · free shipping over ₹999</span>
        <span data-price="usd">₹599 · one-off · ships within India</span>
      </>
    ),
    cta: { label: "Choose your card", href: SHOP_URL, external: true },
  },
  {
    n: "02",
    icon: Smartphone,
    title: "The profile",
    body: "Where the tap lands: your name, company, what you do, and every way to reach you — phone, email, WhatsApp, website — with one button to save you straight into their contacts. It comes free with the card.",
    // TODO(profile): link to the public profile page once profile.rizely.net is
    // fixed — see workstreams/08-website/profile-rizely-audit/FINDINGS-public.md.
    // The CTA below goes to the dashboard (app.rizely.net), not the profile site.
    meta: "Included free with every card",
    cta: { label: "Edit your profile", href: `${DASHBOARD_URL}/login`, external: true },
  },
  {
    n: "03",
    icon: Bot,
    title: "The agent",
    body: "The other direction: the cards you collect. Photograph them in WhatsApp or Telegram and the agent reads each one — Indian-language cards too — files the lead, and drafts a personalised follow-up for you to approve while you're still shaking the next hand.",
    meta: "Live on WhatsApp & Telegram · first 50 scans free",
    cta: { label: "Start free on WhatsApp", href: WHATSAPP_URL, external: true },
  },
];

export default function ThreeLayers() {
  return (
    <section
      id="layers"
      className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-20 md:py-24 md:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-12 max-w-2xl mx-auto"
      >
        <span className="mx-auto w-fit text-xs font-semibold uppercase tracking-widest text-primary-text">
          Three layers
        </span>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          One card in your pocket. One agent doing the chasing.
        </h2>
        <p className="text-muted-foreground text-lg">
          Handing your details over and getting theirs back are the same problem from two
          directions. Rizely does both ends, and all three pieces exist today.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3 max-w-6xl mx-auto">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.n}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="hover-card relative rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-sunrise text-white shadow-[0_0_30px_-8px_rgba(240,81,0,0.55)]">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <span className="font-heading text-2xl font-bold text-muted-foreground/60 tabular-nums">
                  {layer.n}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-lg leading-snug">{layer.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{layer.body}</p>

              <div className="mt-auto space-y-3 pt-2">
                <p className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span className="text-foreground/90">{layer.meta}</span>
                </p>
                {layer.cta && (
                  <Link
                    href={layer.cta.href}
                    {...(layer.cta.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary-text transition-colors hover:text-brand-orange"
                  >
                    {layer.cta.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
