import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent";
import CtaNudge from "@/components/cta-nudge";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import StructuredData from "@/components/structured-data";
import { Bricolage_Grotesque, Instrument_Sans, Kalam } from "next/font/google";
import { SITE_URL } from "@/lib/site";

// Display headings (DESIGN.md section 2): Bricolage Grotesque, variable weight.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Handwritten margin notes only (two notes on the timeline). Not preloaded: it
// is never above the fold.
const hand = Kalam({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hand",
  display: "swap",
  preload: false,
});

// Body and UI text.
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Google Tag Manager. Set only for the production (rizely.net) build, so the
// preview and local builds never send visits into the real analytics.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const DESCRIPTION =
  "Rizely is a platform of AI micro-agents for sales and event teams. The live one scans the business cards you collect at events, builds a managed lead pipeline, and drafts the follow-up for you to send — inside WhatsApp and Telegram, in many languages, priced per event.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rizely — scan the card, draft the follow-up, on WhatsApp",
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
    title: "Rizely — scan the card, draft the follow-up",
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
      data-currency="usd"
    >
      <body className={`${display.variable} ${body.variable} ${hand.variable} antialiased`}>
        {/* These sit at the top of <body>, not in <head>: Netlify injects an HTML comment into
            <head> on some sites, and React then finds that comment where it expected this script,
            fails hydration (#418) and re-renders the document, which drops data-currency. At the
            top of <body> they still run before any content paints. */}
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
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}.ts-box{opacity:1!important;translate:none!important}`}</style>
        </noscript>
        <StructuredData />
        <Providers>
          <NavBar />
          {children}
        </Providers>
        {/* GTM (and through it GA4 and Clarity) loads only after the visitor
            accepts cookies; there is no <noscript> fallback because a visitor
            without JavaScript cannot consent. */}
        {GTM_ID && <CookieConsent gtmId={GTM_ID} />}
        <CtaNudge />
      </body>
    </html>
  );
}
