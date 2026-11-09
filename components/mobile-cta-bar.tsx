"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/site";

/*
  Phones only (under 640px): once the hero's own CTAs have scrolled away, a bar
  with "Start free on WhatsApp" sits at the bottom of the screen. It steps aside
  wherever the page already offers that choice (pricing, the FAQ, the closing
  CTA) and while the cookie banner is open, so two calls to action never stack.
*/
const STOPS = ["#pricing", "#faq", "[data-closing-cta]"];

export default function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let consentOpen = !!document.querySelector('[aria-label="Cookie consent"]');
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const hero = document.querySelector("[data-hero-ctas]");
      const heroPassed = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const atStop = STOPS.some((sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      setShow(heroPassed && !atStop && !consentOpen);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onConsent = (e: Event) => {
      consentOpen = !!(e as CustomEvent<boolean>).detail;
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("rizely:consent", onConsent);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("rizely:consent", onConsent);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-hairline bg-canvas px-4 pt-3 transition-[translate,opacity] duration-250 ease-[var(--ease-out)] motion-reduce:transition-opacity sm:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 motion-reduce:translate-y-0"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      aria-hidden={!show}
      inert={!show}
    >
      <Button asChild size="lg" className="cta-sunrise h-12 w-full text-base font-semibold">
        <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="size-5" />
          Start free on WhatsApp
        </Link>
      </Button>
    </div>
  );
}
