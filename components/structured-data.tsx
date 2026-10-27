import { SITE_URL } from "@/lib/site";
import { faqs } from "@/lib/faqs";

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
const offer = (name: string, price: string) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "INR",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "INR",
    valueAddedTaxIncluded: false,
  },
});

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
         [PRICING PROPOSED] — see PRD v4 D3. Prices are ex-GST (01 §2), so each offer says so. */
      offers: [
        offer("Solo (annual)", "3499"),
        offer("Team (annual)", "11999"),
        offer("Business (annual)", "27999"),
        offer("Event Pass (per event)", "2499"),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      // Built from the same list the FAQ section renders, so the two cannot drift apart.
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
