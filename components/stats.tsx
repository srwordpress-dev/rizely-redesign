"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2s", label: "From card to pipeline (was 6 hours)" },
  { value: "60s", label: "To first follow-up (was 9 days)" },
  { value: "100%", label: "Leads followed up (was 27%)" },
  { value: "₹12L+", label: "Pipeline saved per year" },
];

export default function Stats() {
  return (
    <section className="py-14 md:py-20 px-4 border-y border-border/60 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="text-center"
            >
              {/* Real value is static text in the DOM (readable by crawlers / AI, and with JS off). */}
              <div className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium text-balance">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
