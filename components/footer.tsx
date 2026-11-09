"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND, WHATSAPP_URL } from "@/lib/site";
import { RizelyLogo } from "@/components/logo";
import { SHOP_URL } from "@/lib/site";
import { OPEN_EVENT } from "@/components/cookie-consent";

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
    <footer className="w-full">
      {/* Closing CTA: the page's one --night band (DESIGN.md). */}
      <div data-closing-cta className="bg-night text-canvas">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-5"
        >
          <h2 className="text-4xl sm:text-5xl leading-[1.1] text-balance max-w-2xl">
            Meet someone today. <em>Follow up</em> tonight<span className="text-spark">.</span>
          </h2>
          <p className="text-canvas/75 max-w-lg text-lg">
            First 50 scans are free, inside the WhatsApp you already have open.
          </p>
          <Button asChild size="lg" className="cta-sunrise h-12 px-6 text-base font-semibold">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Start free on WhatsApp
            </Link>
          </Button>
        </motion.div>
      </div>
      </div>

      <div className="bg-parchment border-t border-hairline">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 pt-10">
          <div className="space-y-3">
            <Link href="/" aria-label="Rizely home" className="inline-flex">
              <RizelyLogo className="h-6 w-auto" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              An NFC card, a digital profile and an AI agent that follows up. Hand your details
              over with a tap; let the agent work the cards you collected — inside WhatsApp and
              Telegram, in many languages, priced per event.
            </p>
          </div>

          {/* Spans the two grid columns beside the brand blurb on desktop; as a
              flex row squeezed into one third, each list wrapped a word a line. */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:col-span-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Explore</h3>
              {/* The links' own height is the spacing: 32px rows sit close to the
                  plain lists beside them, 40px on touch so a tap still lands. */}
              <div className="flex flex-col">
                {footerLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-sm text-muted-foreground transition-colors hover:text-foreground pointer-coarse:min-h-10"
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
                <li>GST invoice on Indian plans</li>
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
            {/* Reopens the cookie banner (components/cookie-consent.tsx). Shown only
                where analytics are configured, since that is the only place it does anything. */}
            {process.env.NEXT_PUBLIC_GTM_ID && (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
                className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
              >
                Cookie settings
              </button>
            )}
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
