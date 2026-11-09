"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Nfc, Smartphone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARDS, WHATSAPP_URL } from "@/lib/site";

/*
  07 · The card, up close. Visual first (design: claude.ai/artifact/HNwzG6H1xMdcuPYsENCm4E):
  a large photo of the card, a material picker that cross-fades the photo and
  retargets the buy button, and the PVC pack ladder as bars. Nothing is sold
  here (PRD v4 D2): every button goes to that product on shop.rizely.net.

  Prices are read off shop.rizely.net (see lib/site.ts CARDS; packs verified
  27 Oct via /products.json). USD figures are approximate (about ₹85 to $1)
  for visitors who pick USD; the store charges in ₹ only.

  Photos: public/cards/*.webp, cropped from the shop's product shots. The
  transparent card is left out until there is a photo of it.
*/

type Material = {
  id: "pvc" | "custom" | "metal";
  name: string;
  inr: string;
  usd: string;
  href: string;
  photo: string;
  alt: string;
};

const byName = (n: string) => CARDS.find((c) => c.name === n)!;

const MATERIALS: Material[] = [
  {
    id: "pvc",
    name: "PVC",
    inr: byName("PVC NFC card").from,
    usd: "~$7",
    href: byName("PVC NFC card").href,
    photo: "/cards/card-pvc.webp",
    alt: "A matte black PVC Rizely NFC card, front and back",
  },
  {
    id: "custom",
    name: "Customised",
    inr: byName("Customised NFC card").from,
    usd: "~$8",
    href: byName("Customised NFC card").href,
    photo: "/cards/card-custom.webp",
    alt: "A customised NFC card with a logo and name, held in a hand",
  },
  {
    id: "metal",
    name: "Metal",
    inr: byName("Metal NFC card").from,
    usd: "~$24",
    href: byName("Metal NFC card").href,
    photo: "/cards/card-metal.webp",
    alt: "A brushed black metal NFC card, front and back",
  },
];

// PVC packs, per card. `save` is against the single-card price.
const PACKS = [
  { qty: "1 card", inr: 599, usd: "~$7.05" },
  { qty: "3 cards", inr: 569, usd: "~$6.70" },
  { qty: "5 cards", inr: 539, usd: "~$6.30" },
  { qty: "10 cards", inr: 509, usd: "~$6.00" },
].map((p) => ({ ...p, save: Math.round((1 - p.inr / 599) * 100), width: `${(p.inr / 599) * 100}%` }));

const FACTS = [
  { icon: Nfc, label: "Tap to share" },
  { icon: Smartphone, label: "No app on their side" },
  { icon: UserRound, label: "Profile included free" },
];

function Price({ inr, usd }: { inr: string; usd: string }) {
  return (
    <>
      <span data-price="inr">{inr}</span>
      <span data-price="usd">{usd}</span>
    </>
  );
}

export default function TheCard() {
  const [pick, setPick] = useState<Material["id"]>("pvc");
  const sel = MATERIALS.find((m) => m.id === pick)!;

  return (
    <section id="card" className="w-full max-w-(--breakpoint-xl) mx-auto px-4 py-20 md:py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-6">
        {/* Heading: first on phones, top right from lg */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:self-end"
        >
          <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
            Stop spelling your email out across a loud hall.
          </h2>
          <p className="text-muted-foreground text-lg">
            One tap and your details are saved on their phone. Pay once. Nothing to renew.
          </p>
        </motion.div>

        {/* The picture and the material picker: left column across both rows from lg */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col gap-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <div className="card-stage">
            <span aria-hidden="true" className="sticker absolute right-4 top-4 z-10">Free shipping in India</span>
            {MATERIALS.map((m) => (
              // eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized WebP
              <img
                key={m.id}
                src={m.photo}
                alt={m.alt}
                width={650}
                height={560}
                loading="lazy"
                decoding="async"
                aria-hidden={m.id !== pick}
                className={`card-photo ${m.id === pick ? "is-on" : ""}`}
              />
            ))}
          </div>

          <div role="radiogroup" aria-label="Card material" className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={m.id === pick}
                onClick={() => setPick(m.id)}
                className={`card-mat ${m.id === pick ? "is-on" : ""}`}
              >
                <span className="text-[15px] font-semibold">{m.name}</span>
                <span className="text-[13px] text-muted-foreground tabular-nums">
                  <Price inr={m.inr} usd={m.usd} />
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* The facts, the pack ladder and the buy button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0 }}
          className="flex flex-col gap-5 lg:col-start-2 lg:row-start-2 lg:gap-6"
        >

          <ul className="flex flex-wrap gap-2 sm:grid sm:grid-cols-3 sm:gap-3">
            {FACTS.map(({ icon: Icon, label }) => (
              <li key={label} className="card-fact">
                <span className="card-fact-icon">
                  <Icon aria-hidden="true" className="size-[18px]" />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="mb-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span className="text-sm font-semibold">Order more, pay less per card</span>
              <span className="text-xs text-muted-foreground">
                PVC, per card<span data-price="inr">, incl. GST</span>
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {PACKS.map((p, i) => (
                <li key={p.qty} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 text-[13px]">
                  <span className="text-muted-foreground">{p.qty}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-parchment" aria-hidden="true">
                    <span
                      className={`block h-full rounded-full ${i === PACKS.length - 1 ? "bg-spark-action" : "bg-[var(--line-strong)]"}`}
                      style={{ width: p.width }}
                    />
                  </span>
                  <span className="text-right font-semibold tabular-nums">
                    <Price inr={`₹${p.inr}`} usd={p.usd} />
                    {p.save > 0 && <span className="ml-1 font-normal text-muted-foreground">· −{p.save}%</span>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground" data-price="usd">
              Dollar prices are approximate: you are charged in ₹ and the card ships within India.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            <Button asChild size="lg" className="cta-sunrise h-12 px-6 text-base font-semibold">
              <Link href={sel.href} target="_blank" rel="noopener noreferrer">
                Buy the {sel.name} card · <Price inr={sel.inr} usd={sel.usd} />
              </Link>
            </Button>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-center text-[15px] font-medium text-spark-text underline-offset-4 hover:underline sm:text-left"
            >
              Kitting out a team? Ask us
            </Link>
          </div>

          {/* What the old "card to agent" section said, in one line. */}
          <Link href="#how" className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            Collecting cards too? The agent turns them into follow-ups
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
