"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AI_ASSISTANTS_URL } from "@/lib/site";

/*
  "Works with Claude": one Claude chat with Rizely connected, playing a short
  loop — a question is typed and sent, Claude checks Rizely, and the answer
  streams in with the leads and a CSV. No jargon on screen (no "MCP").
  Design: claude.ai/artifact/9sPksjgEzryJmqGUdHXDhE (v3).

  Everything on screen is derived from one clock, t (ms into the loop), so the
  loop is deterministic and pausing simply stops the clock. The clock only runs
  while the chat is on screen. Under reduced motion it never runs and the
  finished conversation shows, as it does in the server HTML.

  Names and companies are made up.
*/

const LOOP = 10000;
const DONE = 7000; // a moment where the whole answer is on screen
const TICK = 40;
const QUESTION = "Who were my hot leads at Tech Expo Pune?";
const ANSWER = "You had 3 hot leads at Tech Expo Pune. Here they are, with a CSV:";
const ANSWER_WORDS = ANSWER.split(" ");
const LEADS = [
  { name: "Ananya Rao", company: "Kestrel Labs", at: 5000 },
  { name: "Vikram Shah", company: "Northwind Exports", at: 5200 },
  { name: "Meera Iyer", company: "Bluefin Tools", at: 5400 },
];

const show = (on: boolean) => (on ? "cc-show" : "cc-hide");

export default function ClaudeChat() {
  const [t, setT] = useState(DONE);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCanAnimate(true);
    setT(0); // the section starts well below the fold, so the reset is never seen
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!canAnimate || paused || !inView) return;
    const id = window.setInterval(() => setT((v) => (v + TICK) % LOOP), TICK);
    return () => window.clearInterval(id);
  }, [canAnimate, paused, inView]);

  // Timeline: type 0.6–2.2s · send 2.4s · checking 2.7–4.1s · answer streams
  // from 4.1s · leads 5.0/5.2/5.4s · CSV 5.8s · fade out 9.5s.
  const typing = t >= 600 && t < 2400;
  const typed = t < 600 ? 0 : Math.min(QUESTION.length, Math.floor(((t - 600) / 1600) * QUESTION.length));
  const sent = t >= 2400;
  const words = t < 4100 ? 0 : Math.min(ANSWER_WORDS.length, Math.floor((t - 4100) / 55) + 1);
  const pressing = t >= 2250 && t < 2450;
  const inputLive = typed > 0 && !sent;

  return (
    <section className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-20 sm:py-24 md:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 text-center sm:mb-12"
      >
        <h2 className="text-[2rem] leading-[1.15] sm:text-[2.75rem] sm:leading-[1.12] text-balance">
          Just ask Claude about your leads.
        </h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          Connect Rizely once. Then ask in plain words and the answer lands right in your chat.
        </p>
      </motion.div>

      <div
        ref={box}
        role="img"
        aria-label={`A Claude chat with Rizely connected. You ask: "${QUESTION}" Claude answers: ${ANSWER} Ananya Rao, Kestrel Labs; Vikram Shah, Northwind Exports; Meera Iyer, Bluefin Tools; and a CSV file.`}
        className="cc-window mx-auto flex h-[510px] w-full max-w-[760px] flex-col overflow-hidden rounded-[20px] border border-border bg-card sm:h-[520px]"
      >
        <div aria-hidden="true" className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-[22px] sm:py-4">
          <div className="flex items-center gap-2.5 text-[15px] font-semibold sm:text-base">
            <span className="size-2.5 rounded-full bg-[#D97757] sm:size-3" />
            Claude
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-peach px-2.5 py-1 text-xs font-semibold text-[#8A2E00] sm:text-[13px]">
            <span className="size-1.5 rounded-full bg-spark-action sm:size-[7px]" />
            Rizely connected
          </span>
        </div>

        <div
          aria-hidden="true"
          className={`flex flex-1 flex-col gap-3 overflow-hidden px-3.5 py-4 text-[15px] leading-normal sm:gap-4 sm:px-[26px] sm:py-6 sm:text-base ${
            t < 9500 ? "cc-all-on" : "cc-all-off"
          }`}
        >
          <div className={`${show(sent)} max-w-[270px] self-end rounded-[16px_16px_4px_16px] bg-parchment px-3.5 py-2.5 sm:max-w-[440px] sm:px-4 sm:py-3`}>
            {QUESTION}
          </div>

          {t >= 2700 && t < 4100 && (
          <div
            className={`cc-enter inline-flex items-center gap-2 self-start rounded-lg border border-hairline px-3 py-1.5 text-[13px] text-muted-foreground sm:text-sm`}
          >
            Checking your Rizely leads
            <span className="cc-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
          )}

          {t >= 4100 && (
          <div className={`cc-enter flex w-full max-w-[560px] flex-col gap-2.5 self-start sm:gap-3`}>
            <p>{ANSWER_WORDS.slice(0, words).join(" ")}</p>
            <div className="overflow-hidden rounded-xl border border-hairline">
              {LEADS.map((l, i) => (
                <div
                  key={l.name}
                  className={`${show(t >= l.at)} flex items-center justify-between gap-3 px-3 py-2.5 text-sm sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_56px] sm:px-4 sm:text-[15px] ${
                    i ? "border-t border-parchment" : ""
                  }`}
                >
                  <span className="flex flex-col sm:contents">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-xs text-muted-foreground sm:text-[15px]">{l.company}</span>
                  </span>
                  <span className="justify-self-end rounded-full bg-spark-action px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    hot
                  </span>
                </div>
              ))}
            </div>
            <div className={`${show(t >= 5800)} inline-flex items-center gap-2 self-start rounded-lg bg-peach px-3 py-1.5 text-[13px] font-semibold text-[#8A2E00] sm:text-sm`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              hot-leads-tech-expo.csv
            </div>
          </div>
          )}
        </div>

        <div aria-hidden="true" className="px-3 pb-3.5 pt-2.5 sm:px-[18px] sm:pb-[18px] sm:pt-3.5">
          <div className="flex items-center gap-3 rounded-[14px] border border-border py-2 pl-3.5 pr-2 sm:py-2.5 sm:pl-[18px] sm:pr-2.5">
            <span
              className={`flex-1 overflow-hidden whitespace-nowrap text-[15px] sm:text-base ${typing ? "cc-caret" : ""} ${
                inputLive ? "text-foreground" : "text-[#6F6A63]"
              }`}
            >
              {inputLive ? QUESTION.slice(0, typed) : "Ask Claude anything"}
            </span>
            <span
              className={`cc-send grid size-[34px] place-items-center rounded-[10px] text-white sm:size-9 ${
                pressing ? "cc-send-press" : inputLive ? "cc-send-on" : "cc-send-off"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
        <Button asChild size="lg" className="cta-sunrise h-12 flex-1 px-6 text-base font-semibold sm:flex-none">
          <Link href={AI_ASSISTANTS_URL} target="_blank" rel="noopener noreferrer">
            Connect Rizely to Claude
          </Link>
        </Button>
        {canAnimate && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the chat animation" : "Pause the chat animation"}
            className="grid size-12 shrink-0 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-[var(--line-strong)]"
          >
            {paused ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4v16l13-8z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
