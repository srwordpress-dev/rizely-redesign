import type { Metadata } from "next";
import ConnectPageContent from "@/components/connect-page-content";
import Footer from "@/components/footer";
import { OG_IMAGE } from "@/lib/site";

const OG_TITLE = "Run your pipeline from inside Claude";
const OG_DESCRIPTION =
  "Rizely connects to the AI assistant you already use — manage your event leads in plain language. Live on Claude today.";

export const metadata: Metadata = {
  title: "Connect — run Rizely from inside Claude",
  description:
    "Connect your Rizely pipeline to Claude (and ChatGPT next). Add and find contacts, organise events, pull an event's leads, export leads and top up — all in plain language. OAuth, scoped to your account.",
  alternates: { canonical: "/connect" },
  openGraph: {
    type: "website",
    url: "https://rizely.net/connect",
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

export default function ConnectPage() {
  return (
    <>
      <ConnectPageContent />
      <Footer />
    </>
  );
}
