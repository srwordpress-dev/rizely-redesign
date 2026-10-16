import type { Metadata } from "next";
import HeroAnimLab from "@/components/hero-anim-lab";

export const metadata: Metadata = {
  title: "Hero animation prototype — Rizely",
  description: "Internal preview: the three-layer hero animation.",
  robots: { index: false, follow: false },
};

export default function HeroAnimPage() {
  return <HeroAnimLab />;
}
