import type { Metadata } from "next";
import Script from "next/script";
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

// Google Tag Manager. Set only for the production (rizely.net) build, so the
// preview and local builds never send visits into the real analytics.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const DESCRIPTION =
  "Rizely is a platform of AI micro-agents for sales and event teams. The first one scans the business cards you collect at events, builds a managed lead pipeline, and drafts the follow-up for you to approve — inside WhatsApp and Telegram, in many languages, priced per event.";

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
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
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
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* GTM loads after hydration (afterInteractive), not from <head>, for the same
            #418 reason as above, and so it never delays the first paint. */}
        {GTM_ID && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
          </>
        )}
        <StructuredData />
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
