"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { WHATSAPP_URL, SHOP_URL } from "@/lib/site";
import CurrencyToggle from "@/components/currency-toggle";

/*
  Annual, ex-GST, grounded in workstreams/07-research/PRICING.md.
  India: RBI e-mandates make monthly subscriptions hostile, so every plan is
  annual. Never add a monthly tier here without that constraint changing.

  Both currency sets render; CSS hides one based on data-currency on <html>
  (PRD v4 §5). Every figure is [PRICING PROPOSED] — there is an unresolved
  conflict between ₹3,499/yr here and the ₹399/mo billed annually (₹4,788)
  currently live on rizely.net.
*/

type Plan = {
  name: string;
  desc: string;
  inr: number;
  usd: number;
  isMostPop: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Solo",
    desc: "For one rep working events",
    inr: 3499,
    usd: 79,
    isMostPop: false,
    features: [
      "1 seat",
      "500 scans / month",
      "200 auto follow-ups / month",
      "Multilingual card capture",
      "WhatsApp & Telegram",
    ],
  },
  {
    name: "Team",
    desc: "For a small sales or GTM team",
    inr: 11999,
    usd: 199,
    isMostPop: true,
    features: [
      "Everything in Solo",
      "3 seats",
      "2,000 scans / month",
      "1,000 auto follow-ups / month",
      "CSV export · Connect to Claude",
    ],
  },
  {
    name: "Business",
    desc: "For teams running events at scale",
    inr: 27999,
    usd: 499,
    isMostPop: false,
    features: [
      "Everything in Team",
      "10 seats",
      "Unlimited scans",
      "5,000 auto follow-ups / month",
      "Priority support",
    ],
  },
];

const EVENT_PASS = { inr: 2499, usd: 49 };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Both prices, one hidden by CSS. No JS runs to pick — so nothing shifts. */
function Price({ plan }: { plan: { inr: number; usd: number } }) {
  return (
    <>
      <span data-price="inr">{inr(plan.inr)}</span>
      <span data-price="usd">{usd(plan.usd)}</span>
    </>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-7xl px-3 py-16 sm:px-4 sm:py-24 md:px-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16"
      >
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          Start free. Pay only when it&apos;s earning its keep.
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-lg">
          Your first 50 scans are free — no card, no app. After that, plans are annual, or buy a
          one-off Event Pass for a single show.
        </p>
        <div className="flex flex-col items-center gap-2 pt-1">
          <CurrencyToggle />
          <p className="text-xs text-muted-foreground" data-price="inr">
            Prices ex-GST. Every payment comes with a GST invoice you can claim, and UPI works at
            checkout.
          </p>
          <p className="text-xs text-muted-foreground" data-price="usd">
            Prices in USD, billed annually.
          </p>
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative ${plan.isMostPop ? "md:scale-[1.03]" : ""}`}
          >
            <Card
              className={`relative h-full rounded-2xl ${
                plan.isMostPop
                  ? "border-2 border-primary bg-primary/5 shadow-lg"
                  : "border border-border"
              }`}
            >
              {plan.isMostPop && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="rounded-full border-2 border-primary bg-card px-3 py-1 text-xs font-medium sm:px-4 sm:text-sm">
                    Most popular
                  </span>
                </div>
              )}

              <CardContent className="p-4 pt-6 sm:p-6 sm:pt-8">
                <div className="mb-5 text-center sm:mb-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold sm:text-xl">
                    {plan.name}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground sm:mb-4">{plan.desc}</p>
                  <div className="flex items-baseline justify-center tabular-nums">
                    <span className="text-3xl font-bold sm:text-4xl">
                      <Price plan={plan} />
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground sm:text-base">
                      /year
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    billed annually · [PRICING PROPOSED]
                  </p>
                </div>

                <Separator className="my-4 sm:my-6" />

                <ul className="space-y-2.5 text-sm sm:space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckIcon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-brand-teal"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                <Button asChild className="w-full cta-sunrise h-11" size="lg">
                  <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Start free on WhatsApp
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Event Pass + the card, side by side — the two ways to start that are
          not a yearly commitment. The card links out to Shopify; nothing is
          sold on this site (PRD v4 D2). */}
      <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <h3 className="font-heading text-lg font-semibold">Event Pass</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Running a booth? Pay for the show, not the year.
          </p>
          <div className="mt-3 flex items-baseline tabular-nums">
            <span className="text-3xl font-bold">
              <Price plan={EVENT_PASS} />
            </span>
            <span className="ml-1 text-sm text-muted-foreground">/event</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground/80">
            5 seats · 750 scans · 750 follow-ups · 30-day window · [PRICING PROPOSED]
          </p>
          <Button asChild variant="outline" className="mt-4 h-11 w-full">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Ask about the Event Pass
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <h3 className="font-heading text-lg font-semibold">The NFC card</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A one-off purchase, not a plan. Your profile is included free.
          </p>
          <div className="mt-3 flex items-baseline tabular-nums">
            <span className="text-3xl font-bold">₹599</span>
            <span className="ml-1 text-sm text-muted-foreground" data-price="inr">incl. GST</span>
            <span className="ml-1 text-sm text-muted-foreground" data-price="usd">· ships within India</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground/80">
            102 designs · packs down to ₹509 a card · free shipping over ₹999
          </p>
          <Button asChild variant="outline" className="mt-4 h-11 w-full">
            <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
              Choose your card
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
