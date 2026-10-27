import type { Metadata } from "next";
import LegalLayout from "@/components/legal-layout";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Rizely",
  description: "The terms that govern your use of Rizely.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="22 August 2026">
      <p>
        These Terms govern your use of <strong>Rizely</strong> (the &quot;Service&quot;) — a
        WhatsApp- and Telegram-based tool that scans business cards, builds a lead pipeline, and
        sends follow-ups. By using the Service, you agree to these Terms.
      </p>

      <h2>1. Who can use it</h2>
      <p>
        You must be at least 18 and able to enter a contract. If you use the Service for an
        organisation, you confirm you are authorised to accept these Terms on its behalf.
      </p>

      <h2>2. Your account and responsibilities</h2>
      <p>
        You are responsible for activity under your account and for keeping your access secure. You
        must provide accurate information and use the Service only for lawful business purposes.
      </p>

      <h2>3. Your data and the people you capture</h2>
      <p>
        You own the leads and content you capture. When you scan a card, you are responsible for
        having a lawful basis to collect and process that person&apos;s data, and for meeting your
        obligations under applicable law, including the DPDP Act. We process that data on your
        behalf to provide the Service, as described in our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>4. Acceptable use</h2>
      <ul>
        <li>Don&apos;t use the Service to break the law or infringe anyone&apos;s rights.</li>
        <li>
          Don&apos;t send unlawful, misleading, or unsolicited messages, and follow the rules of
          WhatsApp, Telegram, and Meta when messaging through them.
        </li>
        <li>Don&apos;t attempt to disrupt, reverse-engineer, or misuse the Service.</li>
      </ul>

      <h2>5. Plans, pricing and billing</h2>
      <p>
        Paid plans are billed in the currency shown at checkout — US Dollars (USD) by default, or
        Indian Rupees (INR) with GST for customers in India. Plans are billed annually, or as a
        one-off Event Pass for a single event; your first 50 scans are free, then a paid plan or Event Pass. Prices shown on the site are being finalised and may
        change before general availability — the price and inclusions confirmed at checkout apply.
        A GST invoice is provided on Indian plans.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The Service, including its software, design, and content, belongs to Rizely. We grant you
        a limited, non-exclusive right to use it under these Terms. Your leads and content remain
        yours.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        The Service relies on third parties such as WhatsApp/Meta, Telegram, and hosting and AI
        providers. Their availability and terms are outside our control, and we are not responsible
        for them.
      </p>

      <h2>8. Disclaimers and limitation of liability</h2>
      <p>
        The Service is provided &quot;as is&quot; without warranties of any kind. To the maximum
        extent permitted by law, Rizely is not liable for indirect or consequential losses, and
        our total liability is limited to the amount you paid us in the three months before the
        claim.
      </p>

      <h2>9. Termination</h2>
      <p>
        You may stop using the Service at any time. We may suspend or end access if you breach these
        Terms or misuse the Service.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, and the courts of India have exclusive
        jurisdiction.
      </p>

      <h2>11. Changes and contact</h2>
      <p>
        We may update these Terms; the &quot;Last updated&quot; date above will change when we do.
        Questions? Reach us on{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          WhatsApp at +91 83739 78881
        </a>
        .
      </p>
    </LegalLayout>
  );
}
