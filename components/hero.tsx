import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DASHBOARD_URL, WHATSAPP_URL } from "@/lib/site";
import { ArrowRight, CalendarDays, Check, Compass, CreditCard } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import HeroParticles from "@/components/hero-particles";
import HeroTapSnap from "@/components/hero-tap-snap";
import { NARROW_STAGE, WIDE_STAGE } from "@/lib/hero-anim";

/*
  Positioning (Nov 2026, revised): the hero speaks to everyone who meets people
  for work — event and sales people, people who want a better card, and people
  meeting Rizely for the first time — with one path in for each under the CTAs.

  Headline variant B (chosen 17 Oct): the H1 paints immediately and only the
  particles animate. The storyboard's 2.0-2.6s headline reveal looked better
  but put LCP at ~2.6s, and this is the page an acquisition-bottlenecked
  business sends cold traffic to.

  No "use client" here on purpose: the whole block is static markup, so the
  H1 is in the first byte of HTML. Only the canvas is a client component.
*/

/*
  Which drawing plays above the headline.
    "tap-snap"  — Tap · Snap · Follow up (Nov 2026), components/hero-tap-snap.tsx
    "particles" — the earlier particle drawing (components/hero-particles.tsx,
                  lib/hero-anim.ts), kept so it can come back by changing this word.
*/
const HERO_ANIMATION: "tap-snap" | "particles" = "tap-snap";

// Three ways in, one per kind of visitor. Each is a small card: icon, who it
// is for, and what they will find (prices follow the INR/USD toggle).
const paths = [
  {
    icon: CalendarDays,
    label: "I go to events",
    sub: <>Turn the cards you collect into replies</>,
    href: "#use-cases",
  },
  {
    icon: CreditCard,
    label: "I want a smart card",
    sub: (
      <>
        NFC cards from <span data-price="inr">₹599</span>
        <span data-price="usd">~$7</span>, once
      </>
    ),
    href: "#card",
  },
  {
    icon: Compass,
    label: "I'm new here",
    sub: <>See how it works in three steps</>,
    href: "#how",
  },
];

const chips = [
  "Reads cards in many languages",
  "Follow-ups drafted in your voice",
  "No new app — WhatsApp or Telegram",
];

export default function Hero() {
  return (
    <div className="@container relative overflow-hidden">
      {/* The shot: a card from the left, the agent from the right, the tap in
          the middle. Decorative — the H1 carries the meaning, and under
          prefers-reduced-motion this renders one composed still frame. */}
      {HERO_ANIMATION === "particles" && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <HeroParticles mode="hero" />
        </div>
      )}

      {/* The animation plays in its own band above the text at every width
          (W-01): 170px on phones, 260px from 768px up. Container queries, not
          md:, because the canvas switches layout on its own width — the two
          must agree even when a scrollbar narrows it. */}
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 pt-0 pb-28 md:pb-40 md:px-8 flex flex-col justify-center items-center">
        {HERO_ANIMATION === "particles" ? (
          <>
            <div
              aria-hidden="true"
              className="w-full @min-[768px]:hidden"
              style={{ height: NARROW_STAGE.top + NARROW_STAGE.height }}
            />
            <div
              aria-hidden="true"
              className="w-full hidden @min-[768px]:block"
              style={{ height: WIDE_STAGE.top + WIDE_STAGE.height }}
            />
          </>
        ) : (
          <HeroTapSnap className="mb-2 md:mt-2 md:mb-4" />
        )}
        <div className="flex flex-col justify-center items-center space-y-6 max-w-5xl mx-auto text-center">
          <span className="w-fit text-xs sm:text-sm bg-canvas px-3 py-1 border border-hairline rounded-full text-muted-foreground">
            For everyone who meets people for work
          </span>

          {/* DESIGN.md display: serif 500, the page's largest voice, ending on the
              orange full stop. */}
          <h1 className="text-[2.75rem] mx-auto md:text-7xl lg:text-[5rem] text-balance leading-[1.1]">
            Every person you meet, <em>kept</em> and followed up
            <span className="text-spark">.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg mx-auto text-muted-foreground text-balance">
            Give them a card they can tap. Snap the cards they give you. Rizely saves every contact
            and drafts the WhatsApp follow-up, ready for you to send.
          </p>

          <div data-hero-ctas className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
            {/* Phones (under 640px) start on WhatsApp, where the free scans run; wider
                screens sign up in the app. Both are in the HTML and CSS shows one, so
                there is no device sniffing and nothing to hydrate differently. */}
            <Button
              asChild
              size="lg"
              className="cta-sunrise h-14 px-8 text-base font-semibold w-full sm:hidden"
            >
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                Start free on WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="cta-sunrise h-14 px-8 text-lg font-semibold hidden sm:inline-flex sm:w-auto"
            >
              <Link href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
                Start free: 50 scans
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            First 50 scans free. No card or credit card needed to start.
          </p>

          {/* Three ways in, for the three kinds of visitor: event people, card
              buyers, and people meeting Rizely for the first time. */}
          <nav aria-label="Start here" className="w-full max-w-3xl pt-2">
            <p className="mb-3 text-sm text-muted-foreground">Or start where you are</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {paths.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.href}>
                    <Link href={p.href} className="path-card group">
                      <span className="path-card-icon">
                        <Icon aria-hidden="true" className="size-[18px]" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col text-left">
                        <span className="text-[15px] font-semibold text-foreground">{p.label}</span>
                        <span className="text-[13px] leading-snug text-muted-foreground">{p.sub}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className="path-card-arrow size-4 shrink-0" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-3 text-sm text-muted-foreground">
            {chips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-spark" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
