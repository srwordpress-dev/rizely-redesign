"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need to install an app?",
    a: "No. CardPing works right inside WhatsApp and Telegram — the apps already open on your phone at every event. Nothing to download, nothing for your leads to install either.",
  },
  {
    q: "WhatsApp or Telegram?",
    a: "Both. Scan and capture on either one, and your leads land in the same pipeline.",
  },
  {
    q: "Can it read Indian-language cards?",
    a: "Yes — Hindi, Gujarati, Marathi and more. Reading Indian-language cards is one of the things CardPing does that the global scanners don't.",
  },
  {
    q: "Is my data safe?",
    a: "Your leads are yours. Data is handled with India's DPDP rules in mind, and you can export or delete it whenever you like.",
  },
  {
    q: "Does it work with my CRM or Google Sheets?",
    a: "Yes. One scan can fan out to Google Sheets, Gmail and your CRM, so leads reach wherever your team already works.",
  },
  {
    q: "How does pricing work?",
    a: "Start free with 50 scans. After that, choose an annual plan or a one-off Event Pass for a single show. Prices are in ₹, ex-GST, and every plan comes with a GST invoice.",
  },
];

export default function Faq() {
  return (
    <motion.section
      id="faq"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0 }}
      className="relative w-full max-w-(--breakpoint-xl) mx-auto px-4 py-16 md:py-24 gap-6 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl tracking-tight bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Questions, answered
        </h2>
        <p className="max-w-xl text-muted-foreground text-center">
          The things people ask before their first event with CardPing.
        </p>
      </div>

      {/* Native <details>: answers are always in the HTML (crawler/AI-readable, works with JS off), collapsible with zero JS. */}
      <div className="w-full max-w-xl divide-y divide-border">
        {faqs.map((item, i) => (
          <details key={i} className="group py-1">
            <summary className="faq-summary flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium text-foreground">
              {item.q}
              <ChevronDown className="faq-chevron size-4 shrink-0 text-muted-foreground" />
            </summary>
            <p className="pb-4 pr-8 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </motion.section>
  );
}
