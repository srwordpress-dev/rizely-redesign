import { HomeStructuredData } from "@/components/structured-data";
import Hero from "@/components/hero";
import Partners from "@/components/partners";
import HowItWorks from "@/components/how-it-works";
import ChatDemo from "@/components/chat-demo";
import TheCard from "@/components/the-card";
import CardToAgent from "@/components/card-to-agent";
import WhyRizely from "@/components/why-rizely";
import Proof from "@/components/proof";
import Personas from "@/components/personas";
import ClaudeChat from "@/components/claude-chat";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import MobileCtaBar from "@/components/mobile-cta-bar";

/*
  Positioning: the homepage sells one thing to one buyer — event follow-up for
  sales and event teams — and only what works today. The card comes in as the
  add-on. The wider platform story (the agent hive, Connect for Claude, the
  roadmap) lives on /agents and /connect; the homepage shows only the
  Claude chat, as one more way to use what works today.
*/
export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      {/* Product + FAQ schema belongs on this page only — it is the page that
          shows them. Site-wide publisher schema stays in the root layout. */}
      <HomeStructuredData />
      {/* Sections alternate canvas and parchment (DESIGN.md: rhythm from the
          surface, not divider lines). */}
      <Hero />
      <Partners />
      <div className="bg-parchment">
        <HowItWorks />
      </div>
      <ChatDemo />
      <div className="bg-parchment">
        <WhyRizely />
      </div>
      <Proof />
      <div className="bg-parchment">
        <Personas />
      </div>
      <ClaudeChat />
      <div className="bg-parchment">
        <TheCard />
      </div>
      <CardToAgent />
      <div className="bg-parchment">
        <Pricing />
      </div>
      <Faq />
      <Footer />
      <MobileCtaBar />
    </main>
  );
}
