"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND, WHATSAPP_URL } from "@/lib/site";
import { RizelyLogo } from "@/components/logo";
import { SHOP_URL } from "@/lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  // Absolute, for the same reason as the navbar: the footer renders on the
  // legal and blog pages, where a bare hash anchor resolves nowhere.
  const footerLinks = [
    { name: "How it works", href: "/#how" },
    { name: "Agents", href: "/agents" },
    { name: "Connect", href: "/connect" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
    { name: "Blog", href: "/blogs" },
    { name: "Buy a card", href: SHOP_URL },
  ];

  return (
    <footer className="w-full border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-5 pb-14"
        >
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight text-balance max-w-2xl">
            Scan a card. Watch your business <span className="text-sunrise">rise</span>.
          </h2>
          <p className="text-muted-foreground max-w-lg">
            The live agent is on the job, your first 50 scans are free, and it works inside the
            WhatsApp you already have open. Try it on the cards from your last event.
          </p>
          <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Start free on WhatsApp
            </Link>
          </Button>
        </motion.div>

        <Separator />

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 pt-10">
          <div className="space-y-3">
            <Link href="/" aria-label="Rizely home" className="inline-flex">
              <RizelyLogo markClassName="h-6 w-6" wordClassName="text-xl" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              An NFC card, a digital profile and an AI agent that follows up. Hand your details
              over with a tap; let the agent work the cards you collected — inside WhatsApp and
              Telegram, in many languages, priced per event.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:flex lg:gap-24">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Explore</h3>
              <div className="flex flex-col gap-2">
                {footerLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Why Rizely</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>Capture and follow-up in one flow</li>
                <li>Reads cards in many languages</li>
                {/* Annual or per-event only — never monthly. RBI e-mandates
                    make monthly subscriptions hostile in India. */}
                <li>Per-event or annual pricing</li>
                <li>Run it from WhatsApp, Telegram or Claude</li>
              </ul>
            </div>

            {/* Kept from main: accurate, India-first, and it fills the third
                column the grid already expects. */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Built for India</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>GST invoice on every plan</li>
                <li>Hindi, Gujarati &amp; Marathi capture</li>
                <li>Handled with DPDP in mind</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <span>
            © {year} {BRAND}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
              Terms
            </Link>
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
