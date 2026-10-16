import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab";

export const metadata: Metadata = {
  title: "Hero animation lab — Rizely",
  description: "Internal preview: compare hero headline animation options.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <HeroLab />;
}
