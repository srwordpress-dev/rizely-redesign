import { SITE_URL } from "@/lib/site";
import { faqs } from "@/lib/faqs";

/* Split into two graphs on purpose (kept from main, 9 Sep).
 *
 * SITE_GRAPH (Organization + WebSite) describes the publisher and is correct on
 * every page. HOME_GRAPH (SoftwareApplication and the FAQPage) describes things that only exist on the homepage.
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
        "Rizely is a platform of WhatsApp- and Telegram-native AI micro-agents for sales and event teams. The live one scans event business cards, builds a lead pipeline, and drafts follow-ups for you to send, in many languages.",
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
        "Scan the business cards you collect at events inside WhatsApp or Telegram, build a managed lead pipeline, and draft personalised follow-ups for you to send — in many languages, priced per event or per year.",
      /* No `offers` while the plan prices are [PRICING PROPOSED] (tracker D-1):
         Google can show offer prices in results, and these are not final. Add
         them back once Ankush confirms the prices — INR only, ex-GST, since
         this markup is served identically to every visitor. */
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
