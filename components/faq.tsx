"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faqs";
import SectionKicker from "@/components/section-kicker";

export default function Faq() {
  return (
    <motion.section
      id="faq"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0 }}
      className="relative w-full max-w-(--breakpoint-xl) mx-auto px-4 py-24 gap-6 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center text-center">
        <SectionKicker no="09">FAQ</SectionKicker>
        <h2 className="text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          Questions, <em>answered</em>.
        </h2>
        <p className="max-w-xl text-muted-foreground text-center text-lg">
          What people ask before they start.
        </p>
      </div>

      {/* Native <details>: answers are always in the HTML (crawler/AI-readable, works with JS off), collapsible with zero JS. */}
      <div className="w-full max-w-2xl divide-y divide-border">
        {faqs.map((item, i) => (
          <details key={i} className="group py-1">
            <summary className="faq-summary flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium text-foreground">
              {item.q}
              <ChevronDown aria-hidden="true" className="faq-chevron size-4 shrink-0 text-spark" />
            </summary>
            <p className="pb-4 pr-8 text-muted-foreground leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </motion.section>
  );
}
