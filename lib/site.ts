// Central place for content that will change often — edit here, not in components.
export const BRAND = "CardPing";

// CardPing WhatsApp business number (digits only, country code first): +91 83739 78881
export const WHATSAPP_NUMBER = "918373978881";
export const WHATSAPP_MESSAGE = "Hi, I'd like to try CardPing for my next event.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
