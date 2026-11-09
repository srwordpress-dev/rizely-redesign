import type { Metadata } from "next";
import HeroTapSnap from "@/components/hero-tap-snap";

export const metadata: Metadata = {
  title: "Hero animation: Tap, Snap, Follow up — Rizely",
  description: "Internal preview of the hero animation, concept 01.",
  robots: { index: false, follow: false },
};

export default function TapSnapPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-(--breakpoint-xl) flex-col items-center gap-8 px-4 py-16 md:px-8">
      <HeroTapSnap />
      <h1 className="max-w-4xl text-center text-[2.75rem] leading-[1.1] md:text-7xl">
        Every person you meet, <em>kept</em> and followed up<span className="text-spark">.</span>
      </h1>
    </main>
  );
}
