import Hero from "@/components/hero";
import Partners from "@/components/partners";
import HowItWorks from "@/components/how-it-works";
import ChatDemo from "@/components/chat-demo";
import AgentsOrbit from "@/components/agents-orbit";
import Connect from "@/components/connect";
import Vision from "@/components/vision";
import WhyRizely from "@/components/why-rizely";
import Proof from "@/components/proof";
import Personas from "@/components/personas";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import { HomeStructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <HomeStructuredData />
      <Hero />
      <Partners />
      <HowItWorks />
      <ChatDemo />
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
