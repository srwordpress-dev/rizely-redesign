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
        "Rizely is a platform of WhatsApp- and Telegram-native AI micro-agents for Indian business owners. The first one scans event business cards, builds a lead pipeline, and sends automatic follow-ups. India-first.",
      areaServed: "IN",
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
        "Scan the business cards you collect at events inside WhatsApp or Telegram, build a managed lead pipeline, and send personalised follow-ups automatically — in Indian languages, priced per event. Annual plans, ex-GST.",
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
            text: "You move to an annual plan when you're ready — in INR, ex-GST, with a GST invoice you can claim, paid by UPI. Solo is around ₹3,499/year; exhibitors can buy a per-event pass instead. You won't be charged automatically the moment the free scans run out.",
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
