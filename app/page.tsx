import Hero from "@/components/hero";
import Partners from "@/components/partners";
import HowItWorks from "@/components/how-it-works";
import ChatDemo from "@/components/chat-demo";
import AgentsOrbit from "@/components/agents-orbit";
import WhyRizely from "@/components/why-rizely";
import Proof from "@/components/proof";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Hero />
      <Partners />
      <HowItWorks />
      <ChatDemo />
      <AgentsOrbit />
      <WhyRizely />
      <Proof />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
