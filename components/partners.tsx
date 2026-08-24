"use client";

import { motion } from "framer-motion";

type Tool = { name: string; svg: React.ReactNode };

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
    name: "Google Sheets",
    svg: (
      <svg viewBox="0 0 48 48" className={cls} aria-hidden="true">
        <path
          fill="#0F9D58"
          d="M11 2a3 3 0 0 0-3 3v38a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V13L29 2z"
        />
        <path fill="#0C7C43" d="M29 2l11 11H29z" />
        <path fill="#fff" d="M15.5 21.5h17v16.5h-17z" />
        <path
          fill="#0F9D58"
          d="M17 23h6.2v3.2H17zm7.8 0H31v3.2h-6.2zM17 27.9h6.2v3.2H17zm7.8 0H31v3.2h-6.2zM17 32.8h6.2V36H17zm7.8 0H31V36h-6.2z"
        />
      </svg>
    ),
  },
  {
    name: "Gmail",
    svg: (
      <svg viewBox="0 0 48 48" className={cls} aria-hidden="true">
        <path fill="#fff" d="M6 11.5h36v27a1.5 1.5 0 0 1-1.5 1.5h-33A1.5 1.5 0 0 1 6 38.5z" />
        <path fill="#4285F4" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3z" />
        <path fill="#34A853" d="M3 16.2l3.61 1.71L13 23.7V40H6a3 3 0 0 1-3-3z" />
        <path fill="#EA4335" d="M35 11.2L24 19.45 13 11.2 12 17l1 6.7 11 8.25 11-8.25 1-6.7z" />
        <path fill="#FBBC04" d="M3 12.3v3.9l10 7.5V11.2L9.88 8.86A4.3 4.3 0 0 0 3 12.3z" />
        <path fill="#C5221F" d="M45 12.3v3.9l-10 7.5V11.2l3.12-2.34A4.3 4.3 0 0 1 45 12.3z" />
      </svg>
    ),
  },
  {
    name: "Your CRM",
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
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
];

export default function Partners() {
  return (
    <section className="max-w-(--breakpoint-md) w-full mx-auto px-4 py-16 gap-8 md:px-8 flex flex-col justify-center items-center text-center">
      <motion.p
        initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="text-sm uppercase tracking-widest text-muted-foreground"
      >
        Plugs into the tools you already use
      </motion.p>
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-4 place-items-center">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
