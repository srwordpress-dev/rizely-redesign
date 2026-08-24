"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 pt-24 pb-20 md:pt-28 md:pb-24 md:px-8 flex flex-col justify-center items-center">
        {/* Above-the-fold content renders immediately — no JS-gated fade — so the
            LCP heading paints as fast as possible and is never blank. */}
        <div className="flex flex-col justify-center items-center space-y-6 max-w-3xl mx-auto text-center">
          <span className="w-fit text-xs sm:text-sm bg-card px-3 py-1 border border-border rounded-full text-muted-foreground">
            AI lead agent for events · WhatsApp &amp; Telegram
          </span>

          <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-balance bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Scan the card. Send the follow-up. Automatically.
          </h1>

          <p className="max-w-2xl text-base sm:text-lg mx-auto text-muted-foreground text-balance">
            CardPing is the WhatsApp &amp; Telegram business-card scanner built for events:
            photograph any card, it becomes a managed lead, and a personalised follow-up goes
            out in seconds — in Indian languages, no app to install.
          </p>

          {/* Primary CTA: fire WhatsApp on mobile */}
          <div className="flex flex-col items-center gap-4 w-full pt-2">
            <Button asChild size="lg" className="h-12 px-6 text-base shadow-lg">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                Start free on WhatsApp
              </Link>
            </Button>

            {/* Secondary: phone waitlist (Netlify Forms) */}
            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="flex w-full max-w-sm items-center gap-2"
            >
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" />
                </label>
              </p>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Not ready? Leave your number — +91 98765 43210"
                className="flex-1 h-11 rounded-md border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary transition-colors"
              />
              <Button type="submit" variant="outline" size="lg" className="h-11 shrink-0">
                Notify me
              </Button>
            </form>
          </div>

          {/* Trust row: the transformation */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground">
            <span>
              <span className="text-foreground font-medium">6 hours → 2 seconds</span> to log a card
            </span>
            <span className="hidden sm:inline text-border">·</span>
            <span>
              <span className="text-foreground font-medium">9 days → 60 seconds</span> to follow up
            </span>
            <span className="hidden sm:inline text-border">·</span>
            <span>
              <span className="text-foreground font-medium">73% lost → 100%</span> followed up
            </span>
          </div>
        </div>
      </section>

      {/* single soft accent glow (decorative, behind content) */}
      <div className="w-full h-full absolute -top-40 left-1/2 -translate-x-1/2 flex justify-center items-start pointer-events-none -z-10">
        <div className="w-[36rem] h-72 bg-light blur-[120px] rounded-full opacity-30" />
      </div>
    </div>
  );
}
