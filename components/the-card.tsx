"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SHOP_URL, WHATSAPP_URL } from "@/lib/site";

/*
  The card, in detail — but nothing is sold here (PRD v4 D2). Shopify already
  handles checkout, GST invoices, the pack ladder and shipping; a second copy
  of any of that is a second thing to get out of sync. Every CTA leaves.

  Every figure below is read off shop.rizely.net (verified 16 Oct, see
  FORECAST-card-to-agent-funnel.md §1). Re-verify before launch — and do not
  add a price here that the store does not show.
*/

const packs = [
  { qty: "1 card", price: "₹599", each: "" },
  { qty: "5 cards", price: "₹2,545", each: "₹509 each" },
  { qty: "25 cards", price: "₹12,475", each: "₹499 each" },
  { qty: "100 cards", price: "₹39,900", each: "₹399 each" },
];

const facts = [
  ["102 designs", "Pick one and we print it. Your details, your logo."],
  ["PVC, not metal", "Light, durable, and it goes through an airport without a fuss."],
  ["Works on any modern phone", "Tap to open. No app on their side, ever."],
  ["Profile included", "Free with the card, and it stays free. No subscription to read it."],
];

export default function TheCard() {
  return (
    <section
      id="card"
      className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-20 md:py-24 md:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col gap-4"
        >
          <span className="w-fit text-xs font-semibold uppercase tracking-widest text-primary">
            The card, up close
          </span>
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Stop spelling your email out across a loud hall.
          </h2>
          <p className="text-muted-foreground text-lg">
            One tap and they have everything — saved to their phone, not scribbled on the back of
            someone else&apos;s card. It costs ₹599 once, there is nothing to renew, and the
            profile behind it is free for good.
          </p>

          <dl className="mt-2 grid gap-4 sm:grid-cols-2">
            {facts.map(([term, desc]) => (
              <div key={term}>
                <dt className="text-sm font-semibold">{term}</dt>
                <dd className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <Button asChild size="lg" className="cta-sunrise h-12 px-6">
              <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                Choose your card
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Kitting out a team? Ask us
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0 }}
          className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
        >
          <h3 className="font-heading text-lg font-semibold">Buying for the booth</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The more you order, the less each card costs. Shipping is free over ₹999.
          </p>

          <ul className="mt-5 divide-y divide-border">
            {packs.map((p) => (
              <li key={p.qty} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-sm">{p.qty}</span>
                <span className="flex items-baseline gap-2 tabular-nums">
                  <span className="font-semibold">{p.price}</span>
                  {p.each && (
                    <span className="text-xs text-muted-foreground">{p.each}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-muted-foreground">
            Prices include GST. Packs, designs and checkout all live on the store — this page
            just points you at it.
          </p>

          <Button asChild variant="outline" className="mt-5 h-11 w-full">
            <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
              See all 102 designs
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
