// Central place for content that will change often — edit here, not in components.
export const BRAND = "Rizely";

// Canonical origin used by metadata, JSON-LD and the OG tags.
// rizely.net still serves the previous product, so the site stays on its Netlify
// domain until that cutover happens — then change this one line (and the three
// static files in public/: robots.txt, sitemap.xml, llms.txt).
export const SITE_URL = "https://cardping.netlify.app";

// Rizely WhatsApp business number (digits only, country code first): +91 83739 78881
export const WHATSAPP_NUMBER = "918373978881";
export const WHATSAPP_MESSAGE = "Hi, I'd like to try Rizely for my next event.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
