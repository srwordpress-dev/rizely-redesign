import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import StructuredData from "@/components/structured-data";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const SITE_URL = "https://cardping.netlify.app";
const DESCRIPTION =
  "CardPing is a WhatsApp- and Telegram-native AI agent and business-card scanner that turns the cards you collect at events into a managed lead pipeline and sends the follow-up automatically — in Indian languages, priced per event.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CardPing — WhatsApp business-card scanner + auto follow-up for events",
  description: DESCRIPTION,
  keywords: [
    "business card scanner WhatsApp",
    "event lead capture app India",
    "AI follow-up for events",
    "Telegram business card scanner",
    "lead capture at trade shows",
    "CardPing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CardPing",
    title: "CardPing — scan the card, send the follow-up",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CardPing — scan the card, send the follow-up",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning className="dark">
      <head>
        {/* No-JS resilience: if JavaScript never runs, don't leave animated
            (opacity:0) sections invisible — force them visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${geist.className} antialiased`}>
        <StructuredData />
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
