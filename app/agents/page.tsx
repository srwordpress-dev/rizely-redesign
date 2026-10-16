import type { Metadata } from "next";
import AgentsPageContent from "@/components/agents-page-content";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Agents — the Rizely micro-agents platform",
  description:
    "Rizely is a platform of AI micro-agents, each built to own one job. The Card Agent is live today — scan a card, build the pipeline, send the follow-up on WhatsApp or Telegram. See what's live and what's on the roadmap.",
  alternates: { canonical: "/agents" },
  openGraph: {
    type: "website",
    url: "https://rizely.net/agents",
    siteName: "Rizely",
    title: "Small agents. Real work. One raises your business.",
    description:
      "The Rizely micro-agents platform — the Card Agent is live; the Keeper, Reviews Agent and Caller are on the roadmap. Told straight.",
    locale: "en_IN",
  },
};

export default function AgentsPage() {
  return (
    <>
      <AgentsPageContent />
      <Footer />
    </>
  );
}
