// Central place for content that will change often — edit here, not in components.
// Rizely ("RISE-lee") — a platform of AI micro-agents that make your business rise.
// Flagship agent: Rizely Cards (India-first, WhatsApp-native lead capture + follow-up).
export const BRAND = "Rizely";
export const BRAND_DOMAIN = "rizely.net";
export const TAGLINE = "Use Rizely to rise your business.";

// Canonical origin used by metadata, JSON-LD, the OG tags and the generated
// sitemap. Cut over to rizely.net on 2026-09-09, once the domain was serving
// with a valid certificate — not before, so the canonical never pointed at a
// host that was not yet live.
//
// cardping.rankkking.com and cardping.netlify.app still resolve and return 200,
// so this canonical is what consolidates all three onto one host.
export const SITE_URL = "https://rizely.net";

// Rizely WhatsApp business number (digits only, country code first): +91 83739 78881
export const WHATSAPP_NUMBER = "918373978881";
export const WHATSAPP_MESSAGE =
  "Hi, I'd like to try Rizely on the cards from my last event.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// The NFC card store. Shopify handles checkout, GST invoices, the pack ladder
// and shipping — the marketing site never duplicates any of it (PRD v4 D2).
export const SHOP_URL = "https://shop.rizely.net";

// The three cards the shop sells, in the order the hero CTA rotates through them.
// "From" prices are the cheapest variant on shop.rizely.net (checked 28 Oct via
// /products.json). Re-check before launch; do not show a price the store doesn't.
export const CARDS = [
  { name: "Metal NFC card", from: "₹1,999", href: `${SHOP_URL}/products/metal-nfc-card` },
  { name: "PVC NFC card", from: "₹599", href: `${SHOP_URL}/products/pvc-nfc-card` },
  {
    name: "Customised NFC card",
    from: "₹699",
    href: `${SHOP_URL}/products/customised-business-nfc-card`,
  },
] as const;

// The user dashboard (log in, manage leads and cards). Not profile.rizely.net:
// that is the unconfigured vendor script handoff/01 §3 says never to link to.
export const DASHBOARD_URL = "https://app.rizely.net";

// The share image (app/opengraph-image.png, rendered from scripts/og/). A page that sets its own
// `openGraph` replaces the root one and loses the image, so pass this explicitly.
export const OG_IMAGE = "/opengraph-image.png";
