"use client";

/*
  The visitor's own say on currency — it beats the edge function's geo read and
  the timezone fallback, and it persists. Labelled as a currency switch, not a
  country switch: we are not making a claim about where anyone lives.
*/

import { useEffect, useState } from "react";

type Currency = "inr" | "usd";

export default function CurrencyToggle() {
  const [currency, setCurrency] = useState<Currency | null>(null);

  // Read what the head script already decided, so the button starts in sync.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-currency");
    setCurrency(current === "inr" ? "inr" : "usd");
  }, []);

  const choose = (next: Currency) => {
    setCurrency(next);
    document.documentElement.setAttribute("data-currency", next);
    try {
      localStorage.setItem("rizely-currency", next);
    } catch {
      // Private mode or blocked storage: the switch still works for this view.
    }
  };

  return (
    <div
      className="mx-auto inline-flex items-center gap-1 rounded-full border border-border bg-card/60 p-1"
      role="group"
      aria-label="Currency"
    >
      {(
        [
          ["inr", "₹ INR"],
          ["usd", "$ USD"],
        ] as [Currency, string][]
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => choose(value)}
          aria-pressed={currency === value}
          className={`inline-flex min-h-11 items-center rounded-full px-4 text-xs font-medium transition-colors ${
            currency === value
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
