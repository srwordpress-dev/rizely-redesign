import Hero from "@/components/hero";
import Partners from "@/components/partners";
import HowItWorks from "@/components/how-it-works";
import ChatDemo from "@/components/chat-demo";
import ScanLead from "@/components/scan-lead";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import Walkthrough from "@/components/walkthrough";
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
      <ScanLead />
      <Stats />
      <Testimonials />
      <Walkthrough />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
