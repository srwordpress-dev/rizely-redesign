"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SHOP_URL, WHATSAPP_URL } from "@/lib/site";
import SectionKicker from "@/components/section-kicker";

/*
  The card, in detail — but nothing is sold here (PRD v4 D2). Shopify already
  handles checkout, GST invoices, the pack ladder and shipping; a second copy
  of any of that is a second thing to get out of sync. Every CTA leaves.

  Every figure below is read off shop.rizely.net (PVC NFC Business Card,
  verified 27 Oct via /products.json). Re-verify before launch — and do not
  add a price here that the store does not show. The store's biggest pack is
  10; anything larger is quoted on WhatsApp.
*/

// USD figures are approximate conversions (about ₹85 to $1) for visitors who pick
// USD; the store charges in ₹ only.
const packs = [
  { qty: "1 card", price: "₹599", usd: "~$7", each: "", eachUsd: "" },
  { qty: "3 cards", price: "₹1,707", usd: "~$20", each: "₹569 each", eachUsd: "~$6.70 each" },
  { qty: "5 cards", price: "₹2,695", usd: "~$32", each: "₹539 each", eachUsd: "~$6.30 each" },
  { qty: "10 cards", price: "₹5,091", usd: "~$60", each: "₹509 each", eachUsd: "~$6 each" },
];

const facts = [
  ["Designed for you", "Your details and logo. You approve the preview before it's printed."],
  [
    "PVC, metal or transparent",
    <>
      <span data-price="inr">PVC from ₹599, customised from ₹699, metal from ₹1,999, transparent ₹2,499.</span>
      <span data-price="usd">PVC from ~$7, customised from ~$8, metal from ~$24, transparent ~$29 (charged in ₹).</span>
    </>,
  ],
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
          <SectionKicker no="07">The card, up close</SectionKicker>
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Stop spelling your email out across a <em>loud hall</em>.
          </h2>
          <p className="text-muted-foreground text-lg">
            One tap and they have everything — saved to their phone, not scribbled on the back of
            someone else&apos;s card. It costs from <span data-price="inr">₹599</span>
            <span data-price="usd">~$7</span>, once, there is nothing to renew, and the
            profile behind it comes free.
          </p>

          <dl className="mt-2 grid gap-4 sm:grid-cols-2">
            {facts.map(([term, desc]) => (
              <div key={term as string}>
                <dt className="text-sm font-semibold">{term}</dt>
                <dd className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <Button asChild size="lg" className="cta-sunrise h-12 px-6">
              <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                Buy a card
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
          className="hover-card rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h3 className="font-heading text-lg font-semibold">Buying for the booth</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The more you order, the less each card costs. Prices below are for the PVC card; every card gets cheaper in packs. Shipping is free across India.
          </p>

          <ul className="mt-5 divide-y divide-border">
            {packs.map((p) => (
              <li key={p.qty} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-sm">{p.qty}</span>
                <span className="flex items-baseline gap-2 tabular-nums">
                  <span className="font-semibold" data-price="inr">{p.price}</span>
                  <span className="font-semibold" data-price="usd">{p.usd}</span>
                  {p.each && (
                    <>
                      <span className="text-xs text-muted-foreground" data-price="inr">{p.each}</span>
                      <span className="text-xs text-muted-foreground" data-price="usd">{p.eachUsd}</span>
                    </>
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
            <span data-price="usd">Dollar prices are approximate: you are charged in ₹ and the card ships within India. </span>
            Packs, designs and checkout all live on the store — this page just points you at it.
          </p>

          <Button asChild variant="outline" className="mt-5 h-11 w-full">
            <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
              See all the cards
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
