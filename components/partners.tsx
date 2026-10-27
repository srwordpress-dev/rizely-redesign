"use client";

import { motion } from "framer-motion";

// Only what Rizely really works with today. No Gmail and no CRM: neither integration exists
// (handoff/01 §4), and the export is a CSV file, not a Sheets connection. `note` marks
// anything that is not live yet, so it never reads as a shipped integration.
type Tool = { name: string; note?: string; svg: React.ReactNode };

const cls = "h-[22px] w-[22px] shrink-0";

const tools: Tool[] = [
  {
    name: "WhatsApp",
    svg: (
      <svg viewBox="0 0 48 48" className={cls} aria-hidden="true">
        <path
          fill="#25D366"
          d="M24 4C12.95 4 4 12.95 4 24c0 3.53.92 6.85 2.53 9.73L4 44l10.5-2.75A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"
        />
        <path
          fill="#fff"
          d="M34.6 28.1c-.6-.3-3.5-1.7-4-1.9-.5-.2-.9-.3-1.3.3-.4.6-1.5 1.9-1.8 2.3-.3.4-.7.4-1.3.1-3.5-1.7-5.8-3.1-8.1-7-.6-1 .6-1 1.8-3.2.2-.4.1-.8-.1-1.1-.2-.3-1.3-3.2-1.8-4.4-.5-1.1-1-1-1.3-1h-1.1c-.4 0-1 .1-1.5.7-.5.6-2 2-2 4.8s2 5.6 2.3 6c.3.4 4 6.1 9.7 8.6 3.6 1.5 5 1.7 6.8 1.4 1.1-.2 3.5-1.4 4-2.8.5-1.4.5-2.6.3-2.8-.1-.2-.5-.3-1.1-.6z"
        />
      </svg>
    ),
  },
  {
    name: "Telegram",
    svg: (
      <svg viewBox="0 0 48 48" className={cls} aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#29A9EB" />
        <path
          fill="#fff"
          d="M34.6 15.4 30.8 33.6c-.3 1.3-1 1.6-2.1 1l-5.8-4.3-2.8 2.7c-.3.3-.6.6-1.2.6l.4-6.1L30.4 18c.5-.4-.1-.6-.7-.3L13.9 27l-5.8-1.8c-1.3-.4-1.3-1.3.3-1.9l22.7-8.8c1-.4 2 .2 1.5 2z"
        />
      </svg>
    ),
  },
  {
    // Neutral mark, not the official logo — text-only claim (Anthropic badge not yet approved).
    name: "Claude",
    svg: (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M12 2l1.7 6.8L20.5 10l-6.8 1.2L12 22l-1.7-10.8L3.5 10l6.8-1.2z" />
      </svg>
    ),
  },
  {
    name: "CSV export",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className={cls}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M12 11v6" />
        <path d="m9 14 3 3 3-3" />
      </svg>
    ),
  },
  {
    // Neutral mark, not the official logo. Not live yet — "next" on /connect too.
    name: "ChatGPT",
    note: "next",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className={cls}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
      </svg>
    ),
  },
];

export default function Partners() {
  return (
    <section className="max-w-(--breakpoint-lg) w-full mx-auto px-4 py-16 gap-8 md:px-8 flex flex-col justify-center items-center text-center">
      <motion.p
        initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="text-sm uppercase tracking-widest text-muted-foreground"
      >
        Works where you already are
      </motion.p>
      <div className="w-full flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.08, type: "spring", bounce: 0 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            {tool.svg}
            <span className="text-sm font-medium">{tool.name}</span>
            {tool.note && (
              <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                {tool.note}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
