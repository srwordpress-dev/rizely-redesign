import { HomeStructuredData } from "@/components/structured-data";
import Hero from "@/components/hero";
import ThreeLayers from "@/components/three-layers";
import Partners from "@/components/partners";
import HowItWorks from "@/components/how-it-works";
import ChatDemo from "@/components/chat-demo";
import TheCard from "@/components/the-card";
import CardToAgent from "@/components/card-to-agent";
import AgentsOrbit from "@/components/agents-orbit";
import Connect from "@/components/connect";
import Vision from "@/components/vision";
import WhyRizely from "@/components/why-rizely";
import Proof from "@/components/proof";
import Personas from "@/components/personas";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      {/* Product + FAQ schema belongs on this page only — it is the page that
          shows them. Site-wide publisher schema stays in the root layout. */}
      <HomeStructuredData />
      <Hero />
      <ThreeLayers />
      <Partners />
      <HowItWorks />
      <ChatDemo />
      <TheCard />
      <CardToAgent />
      <AgentsOrbit />
      <Connect />
      <Vision />
      <WhyRizely />
      <Proof />
      <Personas />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
