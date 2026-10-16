const SITE_URL = "https://rizely.net";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rizely",
      url: SITE_URL,
      description:
        "Rizely is a platform of WhatsApp- and Telegram-native AI micro-agents for sales and event teams. The first one scans event business cards, builds a lead pipeline, and sends automatic follow-ups in many languages. Works worldwide.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rizely",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      name: "Rizely",
      applicationCategory: "BusinessApplication",
      operatingSystem: "WhatsApp, Telegram, Web",
      url: SITE_URL,
      description:
        "Scan the business cards you collect at events inside WhatsApp or Telegram, build a managed lead pipeline, and send personalised follow-ups automatically — in many languages, priced per event. Monthly or annual plans.",
      offers: [
        { "@type": "Offer", name: "Solo (annual)", price: "79", priceCurrency: "USD" },
        { "@type": "Offer", name: "Team (annual)", price: "199", priceCurrency: "USD" },
        { "@type": "Offer", name: "Business (annual)", price: "499", priceCurrency: "USD" },
        { "@type": "Offer", name: "Event Pass (per event)", price: "49", priceCurrency: "USD" },
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
            text: "You move to a paid plan when you're ready — monthly or annual (save about 25%), in USD. Solo is around $79/year, or buy a one-off Event Pass for a single show. In India, INR pricing with a GST invoice and UPI is available. You won't be charged automatically the moment the free scans run out.",
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
            text: "Yes — Rizely connects to Claude today (web, desktop and Code): add and find contacts, organise events, pull a recap, export leads and top up, all in plain language. ChatGPT works through custom connectors on paid plans in developer mode; some tiers are read-only. You'll need a Rizely account with WhatsApp or Telegram linked.",
          },
        },
      ],
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
