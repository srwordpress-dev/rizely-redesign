// Central place for content that will change often — edit here, not in components.
// Rizely ("RISE-lee") — a platform of AI micro-agents that make your business rise.
// Flagship agent: Rizely Cards (India-first, WhatsApp-native lead capture + follow-up).
export const BRAND = "Rizely";
export const BRAND_DOMAIN = "rizely.net";
export const TAGLINE = "Use Rizely to rise your business.";

// Rizely WhatsApp business number (digits only, country code first): +91 83739 78881
export const WHATSAPP_NUMBER = "918373978881";
export const WHATSAPP_MESSAGE =
  "Hi, I'd like to try Rizely on the cards from my last event.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
