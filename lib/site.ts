// Central place for content that will change often — edit here, not in components.
export const BRAND = "Rizely";

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
export const WHATSAPP_MESSAGE = "Hi, I'd like to try Rizely for my next event.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
