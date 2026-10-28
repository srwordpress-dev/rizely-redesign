"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SHOP_URL, WHATSAPP_URL } from "@/lib/site";

/*
  The card, in detail — but nothing is sold here (PRD v4 D2). Shopify already
  handles checkout, GST invoices, the pack ladder and shipping; a second copy
  of any of that is a second thing to get out of sync. Every CTA leaves.

  Every figure below is read off shop.rizely.net (PVC NFC Business Card,
  verified 27 Oct via /products.json). Re-verify before launch — and do not
  add a price here that the store does not show. The store's biggest pack is
  10; anything larger is quoted on WhatsApp.
*/

const packs = [
  { qty: "1 card", price: "₹599", each: "" },
  { qty: "3 cards", price: "₹1,707", each: "₹569 each" },
  { qty: "5 cards", price: "₹2,695", each: "₹539 each" },
  { qty: "10 cards", price: "₹5,091", each: "₹509 each" },
];

const facts = [
  ["102 designs", "Pick one and we print it. Your details, your logo."],
  ["Light, durable PVC", "It goes through an airport without a fuss."],
  ["Works on NFC phones", "Tap to open. No app on their side, ever."],
  ["Profile included", "Free with the card. No subscription to read it."],
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
          <span className="w-fit text-xs font-semibold uppercase tracking-widest text-primary-text">
            The card, up close
          </span>
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Stop spelling your email out across a loud hall.
          </h2>
          <p className="text-muted-foreground text-lg">
            One tap and they have everything — saved to their phone, not scribbled on the back of
            someone else&apos;s card. It costs ₹599 once, there is nothing to renew, and the
            profile behind it comes free.
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
          className="hover-card rounded-2xl border border-border bg-card/40 p-6 sm:p-8"
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

          <p className="mt-4 text-sm text-muted-foreground">
            Ordering more than 10? Ask us on WhatsApp for a team price.
          </p>

          <p className="mt-5 text-xs text-muted-foreground">
            <span data-price="inr">Prices include GST. </span>
            <span data-price="usd">Prices are in ₹ and the card ships within India. </span>
            Packs, designs and checkout all live on the store — this page just points you at it.
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
