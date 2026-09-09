"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

// Annual-first, ex-GST — grounded in workstreams/07-research/PRICING.md.
// India: RBI e-mandates make monthly subscriptions hostile, so every plan is annual.
type Plan = {
  name: string;
  desc: string;
  annual: number;
  perMonth: number;
  isMostPop: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Solo",
    desc: "For a single rep working events",
    annual: 3499,
    perMonth: 291,
    isMostPop: false,
    features: [
      "1 seat",
      "500 scans / month",
      "200 auto follow-ups / month",
      "Indian-language capture",
      "GST invoice included",
    ],
  },
  {
    name: "Team",
    desc: "For a small sales or GTM team",
    annual: 11999,
    perMonth: 999,
    isMostPop: true,
    features: [
      "Everything in Solo",
      "3 seats",
      "2,000 scans / month",
      "1,000 auto follow-ups / month",
      "Google Sheets & CRM export",
    ],
  },
  {
    name: "Business",
    desc: "For teams running events at scale",
    annual: 27999,
    perMonth: 2333,
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

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

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
        className="mb-12 flex flex-col gap-3 text-center sm:mb-16"
      >
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          Start free. Pay only when it&apos;s earning its keep.
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-lg">
          Your first 50 scans are free — no card, no app. After that, plans are annual, in ₹,
          ex-GST, with a GST invoice you can claim and UPI checkout.
        </p>
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
                    <span className="text-3xl font-bold sm:text-4xl">{inr(plan.annual)}</span>
                    <span className="ml-1 text-sm text-muted-foreground sm:text-base">
                      /year
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    about {inr(plan.perMonth)}/month · ex-GST
                  </p>
                </div>

                <Separator className="my-4 sm:my-6" />

                <ul className="space-y-2.5 sm:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm">
                      <CheckIcon className="mr-2 h-4 w-4 shrink-0 text-primary sm:mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                <Button
                  asChild
                  className="w-full"
                  variant={plan.isMostPop ? "default" : "outline"}
                  size="lg"
                >
                  <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Start free
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Event Pass — the per-event SKU nobody else sells (PRICING.md). */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-8 max-w-5xl"
      >
        <div className="rounded-2xl border border-primary/30 bg-card/50 p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-heading font-semibold">Event Pass</h3>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                One booth, one price
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl">
              Running just one show this week? Pay per event — <strong>₹2,499 per event</strong>{" "}
              (ex-GST) for 5 seats, 750 scans and 750 follow-ups over a 30-day window. No
              subscription. GST invoice included. It matches how exhibitors actually budget:
              pay for the show, not the year.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="shrink-0">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Get an Event Pass
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          Plans are proposed and being finalised — final prices may change. All figures ex-GST.
        </p>
      </motion.div>
    </section>
  );
}
