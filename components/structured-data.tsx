import { SITE_URL } from "@/lib/site";

/* Split into two graphs on purpose (kept from main, 9 Sep).
 *
 * SITE_GRAPH (Organization + WebSite) describes the publisher and is correct on
 * every page. HOME_GRAPH (SoftwareApplication with its price Offers, and the
 * FAQPage) describes things that only exist on the homepage.
 *
 * Both used to render from the root layout, which meant /privacy, /terms and
 * every blog post claimed FAQs and pricing offers that were nowhere on the
 * page — against Google's rule that structured data must describe visible
 * content. Worse, a blog post carrying its own FAQs emitted two competing
 * FAQPage nodes. So HOME_GRAPH is rendered by app/page.tsx alone.
 */
const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rizely",
      url: SITE_URL,
      description:
        "Rizely is a platform of WhatsApp- and Telegram-native AI micro-agents for sales and event teams. The first one scans event business cards, builds a lead pipeline, and drafts follow-ups you approve, in many languages. Works worldwide.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rizely",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

const HOME_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Rizely",
      applicationCategory: "BusinessApplication",
      operatingSystem: "WhatsApp, Telegram, Web",
      url: SITE_URL,
      description:
        "Scan the business cards you collect at events inside WhatsApp or Telegram, build a managed lead pipeline, and draft personalised follow-ups you approve — in many languages, priced per event or per year.",
      /* INR only, deliberately. The page itself switches currency per visitor
         (PRD v4 §5) but this markup is served identically to everyone, so it
         states one unambiguous set rather than two competing ones.
         [PRICING PROPOSED] — see PRD v4 D3. */
      offers: [
        { "@type": "Offer", name: "Solo (annual)", price: "3499", priceCurrency: "INR" },
        { "@type": "Offer", name: "Team (annual)", price: "11999", priceCurrency: "INR" },
        { "@type": "Offer", name: "Business (annual)", price: "27999", priceCurrency: "INR" },
        { "@type": "Offer", name: "Event Pass (per event)", price: "2499", priceCurrency: "INR" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Rizely actually do right now?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rizely Cards is live: photograph a business card in WhatsApp or Telegram, and it reads the card, files the lead into your pipeline, and drafts a personalised follow-up ready to send. The other agents are on the roadmap — we'll say clearly when each one ships.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to download an app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Rizely Cards lives inside WhatsApp and Telegram — apps already open on your phone. Nothing to install, nothing for your leads to install either.",
          },
        },
        {
          "@type": "Question",
          name: "Will it read a Hindi or Gujarati card, or only English?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Indian-language cards too — Hindi, Gujarati and Marathi, not just English. This is exactly where most scanners quietly fall over. When it's unsure about a badly printed card, it flags the lead for a quick human check rather than guessing.",
          },
        },
        {
          "@type": "Question",
          name: "Does it send the follow-ups on its own, or do I approve them first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You're in control. You review and approve the first batch so it sounds like you. After that you can let it run automatically, or keep approving each batch — your call, changeable any time.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after the 50 free scans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You move to an annual plan when you're ready, or buy a one-off Event Pass for a single show. In India that is \u20b93,499/year ex-GST with a GST invoice and UPI; elsewhere it is $79/year. Plans are annual rather than monthly because RBI e-mandates make monthly subscriptions genuinely painful in India. You won't be charged the moment the free scans run out.",
          },
        },
        {
          "@type": "Question",
          name: "Whose data is it, and is it safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The leads are yours — export them any time, no ransom fee to get your own data out. We're building to India's DPDP rules and only act on contacts you've collected with consent. We won't scrape lists or blast strangers on your behalf.",
          },
        },
        {
          "@type": "Question",
          name: "Is Rizely just a card scanner, or a whole platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It's a platform of AI micro-agents — each owns one job. The Card Agent is live today (scan, file, follow up). Others, like the Keeper and the Reviews Agent, are on the roadmap. You turn on what you need rather than buying one bloated app.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Rizely from Claude or ChatGPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Rizely connects to Claude today (web, desktop and Code): add and find contacts, organise events, pull an event's leads, export leads and top up, all in plain language. ChatGPT works through custom connectors on paid plans in developer mode; some tiers are read-only. You'll need a Rizely account with WhatsApp or Telegram linked.",
          },
        },
      ],
    },
  ],
};

function Ld({ graph }: { graph: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/** Publisher identity. Rendered once from the root layout, on every page. */
export default function StructuredData() {
  return <Ld graph={SITE_GRAPH} />;
}

/** Product + FAQ markup. Homepage only — that is the page that shows them. */
export function HomeStructuredData() {
  return <Ld graph={HOME_GRAPH} />;
}
