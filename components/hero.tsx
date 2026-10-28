import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DASHBOARD_URL } from "@/lib/site";
import { Check, LayoutDashboard } from "lucide-react";
import CardCta from "@/components/card-cta";
import HeroParticles from "@/components/hero-particles";
import { NARROW_STAGE } from "@/lib/hero-anim";

/*
  The hero leads with the three layers — card, profile, agent — because all
  three have shipped, while most of the micro-agents are still roadmap. That
  framing moves to its own section further down (PRD v4 D1).

  Headline variant B (chosen 17 Oct): the H1 paints immediately and only the
  particles animate. The storyboard's 2.0-2.6s headline reveal looked better
  but put LCP at ~2.6s, and this is the page an acquisition-bottlenecked
  business sends cold traffic to.

  No "use client" here on purpose: the whole block is static markup, so the
  H1 is in the first byte of HTML. Only the canvas is a client component.
*/

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
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroParticles mode="hero" />
      </div>

      {/* Below 768px the animation gets its own band above the text (W-01).
          A container query, not md:, because the canvas switches layout on its
          own width — the two must agree even when a scrollbar narrows it. */}
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 pt-0 pb-28 @min-[768px]:pt-28 md:pb-40 md:px-8 flex flex-col justify-center items-center">
        <div
          aria-hidden="true"
          className="w-full @min-[768px]:hidden"
          style={{ height: NARROW_STAGE.top + NARROW_STAGE.height }}
        />
        <div className="flex flex-col justify-center items-center space-y-6 max-w-3xl mx-auto text-center">
          <span className="w-fit text-xs sm:text-sm bg-card/80 backdrop-blur-sm px-3 py-1 border border-border rounded-full text-muted-foreground">
            NFC card · digital profile · AI agent
          </span>

          <h1 className="text-4xl font-heading font-extrabold tracking-[-0.03em] mx-auto md:text-6xl text-balance leading-[1.08]">
            A card they tap. A profile they keep.{" "}
            <span className="text-sunrise">An agent that follows up.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg mx-auto text-muted-foreground text-balance">
            Hand over a Rizely card and your profile opens on their phone — no app, nothing to
            type. Point the same Rizely at the cards <em className="not-italic font-medium text-foreground">you</em>{" "}
            collected and the agent reads them, files every lead, and drafts each person a
            personalised WhatsApp or Telegram follow-up in their language, for you to approve.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="cta-sunrise h-14 px-8 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              <Link href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
                <LayoutDashboard aria-hidden="true" className="size-5" />
                Open your dashboard
              </Link>
            </Button>
            <CardCta className="h-14 px-6 text-base w-full sm:w-auto bg-background/60 backdrop-blur-sm" />
          </div>

          <p className="text-sm text-muted-foreground">
            First 50 scans on us — no card, no app to install. Cards are a one-off purchase from
            ₹599, and your profile comes with every one.
          </p>

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

      {/* Warm sunrise glow (decorative, behind everything) — the brand "rise" light. */}
      <div className="w-full h-full absolute -top-40 left-1/2 -translate-x-1/2 flex justify-center items-start pointer-events-none -z-20">
        <div className="w-[42rem] h-80 bg-light blur-[130px] rounded-full opacity-25" />
      </div>
    </div>
  );
}
