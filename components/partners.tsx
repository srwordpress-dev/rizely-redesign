"use client";

import { motion } from "framer-motion";
import { SiWhatsapp, SiTelegram, SiGooglesheets, SiGmail } from "react-icons/si";
import { Database } from "lucide-react";

type Tool = {
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string; // official brand color; omit to fall back to the CardPing accent
};

const tools: Tool[] = [
  { name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
  { name: "Telegram", Icon: SiTelegram, color: "#26A5E4" },
  { name: "Google Sheets", Icon: SiGooglesheets, color: "#23A566" },
  { name: "Gmail", Icon: SiGmail, color: "#EA4335" },
  { name: "Your CRM", Icon: Database },
];

export default function Partners() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 md:px-8 flex flex-col items-center gap-8 text-center">
      <motion.p
        initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="text-sm uppercase tracking-widest text-muted-foreground"
      >
        Plugs into the tools you already use
      </motion.p>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {tools.map((tool, index) => {
          const { Icon } = tool;
          return (
            <motion.div
              key={tool.name}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07, type: "spring", bounce: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 shadow-sm transition-colors hover:border-foreground/20 hover:bg-card"
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${tool.color ? "" : "text-primary"}`}
                style={tool.color ? { color: tool.color } : undefined}
              />
              <span className="text-sm font-medium text-foreground/90">{tool.name}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
