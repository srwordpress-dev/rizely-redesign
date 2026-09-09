import { SITE_URL } from "@/lib/site";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rizely",
      url: SITE_URL,
      description:
        "WhatsApp- and Telegram-native AI agent that scans event business cards, builds a lead pipeline, and sends automatic follow-ups. India-first.",
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
        "Scan the business cards you collect at events inside WhatsApp or Telegram, build a managed lead pipeline, and send personalised follow-ups automatically — in Indian languages, priced per event.",
      offers: [
        { "@type": "Offer", name: "Solo", price: "399", priceCurrency: "INR" },
        { "@type": "Offer", name: "Team", price: "1299", priceCurrency: "INR" },
        { "@type": "Offer", name: "Business", price: "2999", priceCurrency: "INR" },
        { "@type": "Offer", name: "Event Pass", price: "2499", priceCurrency: "INR" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to install an app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Rizely works right inside WhatsApp and Telegram — the apps already open on your phone at every event. Nothing to download, nothing for your leads to install either.",
          },
        },
        {
          "@type": "Question",
          name: "WhatsApp or Telegram?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both. Scan and capture on either one, and your leads land in the same pipeline.",
          },
        },
        {
          "@type": "Question",
          name: "Can it read Indian-language cards?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Hindi, Gujarati, Marathi and more. Reading Indian-language cards is one of the things Rizely does that the global scanners don't.",
          },
        },
        {
          "@type": "Question",
          name: "Is my data safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your leads are yours. Data is handled with India's DPDP rules in mind, and you can export or delete it whenever you like.",
          },
        },
        {
          "@type": "Question",
          name: "Does it work with my CRM or Google Sheets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. One scan can fan out to Google Sheets, Gmail and your CRM, so leads reach wherever your team already works.",
          },
        },
        {
          "@type": "Question",
          name: "How does pricing work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start free with 50 scans. After that, choose an annual plan or a one-off Event Pass for a single show. Prices are in INR, ex-GST, and every plan comes with a GST invoice.",
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
