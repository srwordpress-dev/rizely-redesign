"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOP_URL, WHATSAPP_URL } from "@/lib/site";
import SectionKicker from "@/components/section-kicker";
import "@/app/use-cases.css";

/*
  05 · Use cases. Three cards, each opening with a small drawn scene
  (design: claude.ai/artifact/XQ1JR4e4tojV9LMDnB5chm): the person who ATTENDS
  the event, the team that RUNS the booth, and the person who just wants a
  better card. Three short ticks each; the "best fit" line follows the ₹/$
  toggle (data-price). Plan prices are [PRICING PROPOSED]. Names are made up.
  Scenes are decorative drawings (role="img" with a short label).
*/

type Scene = "snap" | "booth" | "tap";

type Persona = {
  scene: Scene;
  sceneLabel: string;
  tag: string;
  title: string;
  points: string[];
  fit: { inr: React.ReactNode; usd: React.ReactNode };
  cta: string;
  href: string;
  secondary: { label: string; href: string };
};

const personas: Persona[] = [
  {
    scene: "snap",
    sceneLabel: "A phone camera framing a business card, with a Lead saved note",
    tag: "You attend the event",
    title: "Field sales & BD",
    points: ["Snap each card in WhatsApp as you go", "Follow-ups drafted in their language", "Ready to send before you're home"],
    fit: {
      inr: <>Best fit: <b>Solo ₹3,499/yr</b> or an Event Pass (proposed)</>,
      usd: <>Best fit: <b>Solo $79/yr</b> or an Event Pass (proposed)</>,
    },
    cta: "Start free on WhatsApp",
    href: WHATSAPP_URL,
    secondary: { label: "See pricing", href: "#pricing" },
  },
  {
    scene: "booth",
    sceneLabel: "Three people at a booth, every scan going into one shared list for the show",
    tag: "You run the booth",
    title: "Exhibitors & booth teams",
    points: ["The whole team scans into one list", "Every lead tagged to the show", "Follow-ups drafted the same day"],
    fit: {
      inr: <>Best fit: <b>Event Pass ₹2,499</b> for 5 seats (proposed)</>,
      usd: <>Best fit: <b>Event Pass $49</b> for 5 seats (proposed)</>,
    },
    cta: "Start free on WhatsApp",
    href: WHATSAPP_URL,
    secondary: { label: "See pricing", href: "#pricing" },
  },
  {
    scene: "tap",
    sceneLabel: "A Rizely NFC card tapped against a phone that shows a profile",
    tag: "You hand out cards",
    title: "Anyone who wants a better card",
    points: ["One tap and their phone saves you", "No app on their side", "Pay once, profile included"],
    fit: {
      inr: <>Best fit: <b>a Rizely NFC card</b> from ₹599</>,
      usd: <>Best fit: <b>a Rizely NFC card</b> from ~$7 (charged in ₹)</>,
    },
    cta: "Buy a card",
    href: SHOP_URL,
    secondary: { label: "See the cards", href: "#card" },
  },
];

function SceneArt({ scene, label }: { scene: Scene; label: string }) {
  if (scene === "snap") {
    return (
      <div role="img" aria-label={label} className="uc-scene uc-snap">
        <div className="uc-phone-dark">
          <div className="uc-viewfinder">
            <div className="uc-papercard">
              <span className="uc-l1" />
              <span className="uc-l2" />
            </div>
            <span className="uc-corner uc-tl" />
            <span className="uc-corner uc-tr" />
            <span className="uc-corner uc-bl" />
            <span className="uc-corner uc-br" />
            <span className="uc-shutter" />
          </div>
        </div>
        <span className="uc-toast uc-toast-a">✓ Lead saved</span>
        <span className="uc-toast uc-toast-b">Draft ready · Hindi</span>
      </div>
    );
  }
  if (scene === "booth") {
    return (
      <div role="img" aria-label={label} className="uc-scene uc-booth">
        <div className="uc-list">
          <div className="flex justify-between text-[11px]">
            <b>Tech Expo Pune</b>
            <span className="text-muted-foreground">5 seats</span>
          </div>
          <div className="uc-bar">
            <span />
          </div>
          <div className="mt-1.5 text-[10px] text-muted-foreground">One shared list for the whole team</div>
        </div>
        <div className="uc-people">
          {["#e8a27e", "#c4bcb0", "#b33c00"].map((c) => (
            <span key={c} className="uc-person">
              <span style={{ background: c }} />
              <span style={{ background: c }} />
            </span>
          ))}
        </div>
        <div className="uc-counter">
          <span>BOOTH B12</span>
          <i />
        </div>
      </div>
    );
  }
  return (
    <div role="img" aria-label={label} className="uc-scene uc-tap">
      <span className="uc-ring uc-ring-1" />
      <span className="uc-ring uc-ring-2" />
      <div className="uc-phone-light">
        <span className="uc-avatar" />
        <span className="text-[11px] font-semibold">Priya Nair</span>
        <span className="uc-save">Save contact</span>
      </div>
      <div className="uc-nfc">
        <span className="uc-nfc-dot" />
        <span className="uc-nfc-word">RIZELY</span>
        <span className="uc-nfc-line" />
      </div>
    </div>
  );
}

export default function Personas() {
  return (
    <section id="use-cases" className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 md:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0 }}
        className="flex flex-col gap-3 text-center mb-12 max-w-2xl mx-auto"
      >
        <SectionKicker no="05" className="mx-auto">Use cases</SectionKicker>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          However you meet people, it <em>fits</em>.
        </h2>
        <p className="text-muted-foreground text-lg">Pick the one that sounds like you.</p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {personas.map((p, index) => (
          <motion.article
            key={p.title}
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="hover-card flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
          >
            <SceneArt scene={p.scene} label={p.sceneLabel} />
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
                <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
              </div>
              <ul className="flex flex-col gap-2 text-[15px]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-spark-text" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-xl bg-parchment px-3 py-2.5 text-[13px] text-muted-foreground [&_b]:font-semibold [&_b]:text-foreground">
                <span data-price="inr">{p.fit.inr}</span>
                <span data-price="usd">{p.fit.usd}</span>
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-1">
                <Button asChild className="cta-sunrise">
                  <Link href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.cta}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={p.secondary.href}>{p.secondary.label}</Link>
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
