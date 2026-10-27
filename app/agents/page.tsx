import type { Metadata } from "next";
import AgentsPageContent from "@/components/agents-page-content";
import Footer from "@/components/footer";
import { OG_IMAGE } from "@/lib/site";

const OG_TITLE = "Small agents. Real work. One raises your business.";
const OG_DESCRIPTION =
  "The Rizely micro-agents platform — the Card Agent is live; the Keeper, Reviews Agent and Caller are on the roadmap. Told straight.";

export const metadata: Metadata = {
  title: "Agents — the Rizely micro-agents platform",
  description:
    "Rizely is a platform of AI micro-agents, each built to own one job. The Card Agent is live today — scan a card, build the pipeline, draft the follow-up on WhatsApp or Telegram. See what's live and what's on the roadmap.",
  alternates: { canonical: "/agents" },
  openGraph: {
    type: "website",
    url: "https://rizely.net/agents",
    siteName: "Rizely",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
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
