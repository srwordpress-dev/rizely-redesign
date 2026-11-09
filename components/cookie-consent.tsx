"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/*
  Cookie consent for the analytics tags (Google Tag Manager, which loads GA4
  and Microsoft Clarity). Nothing analytics-related loads until the visitor
  chooses "Accept"; "Decline" keeps it off. The choice is kept in this browser
  and can be changed from the footer's "Cookie settings" link, which fires
  OPEN_EVENT.
*/

const KEY = "rizely-cookie-consent";
export const OPEN_EVENT = "rizely:cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(c: Choice) {
  try {
    localStorage.setItem(KEY, c);
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
}

function loadGtm(id: string) {
  const w = window as unknown as { __rizelyGtm?: boolean; dataLayer?: unknown[] };
  if (w.__rizelyGtm) return;
  w.__rizelyGtm = true;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export default function CookieConsent({ gtmId }: { gtmId: string }) {
  // Rendered only after mount: the server cannot know the stored choice, and a
  // banner that flashes for visitors who already chose would be worse.
  const [open, setOpen] = useState(false);

  // Tell the phone CTA bar (components/mobile-cta-bar.tsx) to step aside.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("rizely:consent", { detail: open }));
  }, [open]);

  useEffect(() => {
    const c = readChoice();
    if (c === "granted") loadGtm(gtmId);
    else if (c === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, [gtmId]);

  const choose = (c: Choice) => {
    const before = readChoice();
    saveChoice(c);
    setOpen(false);
    if (c === "granted") loadGtm(gtmId);
    // Tags that already ran cannot be unloaded; a reload starts the page clean.
    else if (before === "granted") window.location.reload();
  };

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-hairline bg-canvas"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-foreground">
          We use cookies for Google Analytics and Microsoft Clarity to see how this site is used.
          Nothing loads until you choose.{" "}
          <Link href="/privacy" className="text-spark-text underline underline-offset-4">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" className="h-10 flex-1 sm:flex-none" onClick={() => choose("denied")}>
            Decline
          </Button>
          <Button className="h-10 flex-1 sm:flex-none" onClick={() => choose("granted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
