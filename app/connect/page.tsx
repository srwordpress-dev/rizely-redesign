import type { Metadata } from "next";
import ConnectPageContent from "@/components/connect-page-content";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Connect — run Rizely from inside Claude",
  description:
    "Connect your Rizely pipeline to Claude (and ChatGPT next). Add and find contacts, organise events, pull a recap, export leads and top up — all in plain language. OAuth, scoped to your account.",
  alternates: { canonical: "/connect" },
  openGraph: {
    type: "website",
    url: "https://rizely.net/connect",
    siteName: "Rizely",
    title: "Run your pipeline from inside Claude",
    description:
      "Rizely connects to the AI assistant you already use — manage your event leads in plain language. Live on Claude today.",
    locale: "en_IN",
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
