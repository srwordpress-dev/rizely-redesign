"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";
import { Check } from "lucide-react";
import { FadeRiseWord } from "@/components/rotating";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

const chips = [
  "Reads cards in many languages",
  "Follow-ups drafted in your voice",
  "No new app — WhatsApp or Telegram",
];

// Rotating words in the hero H1 — the event type, the outcome, and the crossed-out
// "old way". Each is width-locked (no reflow) and cycles slowly and staggered.
const EVENTS = ["event", "conference", "networking meetup", "expo", "trade show"];
const OUTCOMES = ["replies", "sales", "calls", "meetings"];
const OLD_WAY = ["a pile of cards", "a bunch of numbers", "a full camera roll"];

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 pt-20 pb-20 md:pt-28 md:pb-24 md:px-8 flex flex-col justify-center items-center">
        {/* Above-the-fold content renders immediately — no JS-gated fade — so the
            LCP heading paints as fast as possible and is never blank. */}
        <div className="flex flex-col justify-center items-center space-y-6 max-w-3xl mx-auto text-center">
          <span className="w-fit text-xs sm:text-sm bg-card px-3 py-1 border border-border rounded-full text-muted-foreground">
            A platform of AI micro-agents · WhatsApp &amp; Telegram
          </span>

          <h1 className="text-4xl font-heading font-extrabold tracking-[-0.03em] mx-auto md:text-6xl text-balance leading-[1.08]">
            {/* Screen readers + crawlers get one stable sentence; the rotating
                version below is decorative. */}
            <span className="sr-only">
              Come back from the event with replies. Not a pile of cards.
            </span>
            <span aria-hidden="true">
              Come back from the <FadeRiseWord words={EVENTS} period={5200} /> with{" "}
              <FadeRiseWord words={OUTCOMES} className="text-sunrise" period={6000} />.
              <span className="mt-3 block text-2xl md:text-4xl font-bold text-muted-foreground">
                Not <FadeRiseWord words={OLD_WAY} strike period={7000} />.
              </span>
            </span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg mx-auto text-muted-foreground text-balance">
            Rizely is a platform of AI micro-agents. The first one scans every card you collect at
            an event — right inside WhatsApp or Telegram — files the lead, and sends the
            personalised follow-up in their language, while you&apos;re still shaking the next
            hand. No new app. No Excel at midnight.
          </p>

          {/* Primary CTA dominates; one low-friction secondary beside it. */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="cta-sunrise h-14 px-8 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                Start free on WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-6 text-base w-full sm:w-auto"
            >
              <Link href="#how">See it work</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            50 scans on us — no card, no app to install. On the WhatsApp you already use.
          </p>

          {/* Honest capability chips — no fabricated stats or results. */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-3 text-sm text-muted-foreground">
            {chips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-brand-teal" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Warm sunrise glow (decorative, behind content) — the brand "rise" light. */}
      <div className="w-full h-full absolute -top-40 left-1/2 -translate-x-1/2 flex justify-center items-start pointer-events-none -z-10">
        <div className="w-[42rem] h-80 bg-light blur-[130px] rounded-full opacity-25" />
      </div>
    </div>
  );
}
