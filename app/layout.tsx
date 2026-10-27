import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import StructuredData from "@/components/structured-data";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "Rizely is a platform of AI micro-agents for sales and event teams. The first one scans the business cards you collect at events, builds a managed lead pipeline, and drafts the follow-up for you to approve — inside WhatsApp and Telegram, in many languages, priced per event. Works worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rizely — scan the card, send the follow-up, on WhatsApp",
  description: DESCRIPTION,
  keywords: [
    "business card scanner WhatsApp",
    "event lead capture software",
    "AI follow-up for events",
    "Telegram business card scanner",
    "lead capture at trade shows",
    "AI agents for business",
    "Rizely",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rizely",
    title: "Rizely — come back from the event with replies",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizely — scan the card, send the follow-up",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className="dark"
      data-currency="usd"
    >
      <head>
        {/* Currency, decided before first paint so prices never shift or flash
            (PRD v4 §5). Precedence: the visitor's own choice > the Netlify edge
            function's geo read > this timezone guess > the USD default already
            in the markup. Everything is wrapped in try/catch: a thrown
            storage access must never stop the page rendering. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;" +
              "var c=localStorage.getItem('rizely-currency');" +
              "if(c==='inr'||c==='usd'){d.setAttribute('data-currency',c);return;}" +
              "if(d.hasAttribute('data-geo-resolved'))return;" +
              "var t=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');" +
              "if(t==='Asia/Kolkata'||t==='Asia/Calcutta')" +
              "d.setAttribute('data-currency','inr');}catch(e){}})()",
          }}
        />
        {/* No-JS resilience: if JavaScript never runs, don't leave animated
            (opacity:0) sections invisible — force them visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        <StructuredData />
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
