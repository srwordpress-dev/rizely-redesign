"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  The first time a primary CTA scrolls into view, its arrow nudges twice
  (.cta-nudge in globals.css), a cue that this is the thing to press. Once per
  button per page view, never on repeat, and not at all under reduced motion.
*/
export default function CtaNudge() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          // A short beat after it settles into view, so the eye is already there.
          timers.push(
            window.setTimeout(() => {
              el.classList.add("cta-nudge");
              el.addEventListener("animationend", () => el.classList.remove("cta-nudge"), {
                once: true,
              });
            }, 600),
          );
        }
      },
      { threshold: 0.9 },
    );

    document
      .querySelectorAll<HTMLElement>('[data-slot="button"][data-variant="default"]')
      .forEach((el) => {
        if (el.dataset.nudged) return;
        el.dataset.nudged = "1";
        io.observe(el);
      });

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
