"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND, WHATSAPP_URL } from "@/lib/site";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    { name: "How it works", href: "#how" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
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
          <h2 className="text-2xl font-semibold sm:text-4xl tracking-tight text-balance max-w-2xl">
            The next card you scan could be your next customer.
          </h2>
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Start free on WhatsApp
            </Link>
          </Button>
        </motion.div>

        <Separator />

        <div className="grid gap-10 pt-10 lg:grid-cols-2">
          <div className="space-y-3 lg:max-w-sm">
            <Link href="/" className="inline-block text-xl font-medium tracking-tight">
              {BRAND}
              <span className="text-primary">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Scan the card, send the follow-up — inside WhatsApp and Telegram, in Indian
              languages, priced per event.
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
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

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
          <span>© {year} {BRAND}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
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
