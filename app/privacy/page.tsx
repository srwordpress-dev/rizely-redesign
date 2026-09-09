import type { Metadata } from "next";
import LegalLayout from "@/components/legal-layout";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Rizely",
  description: "How Rizely collects, uses, and protects personal data. India-first, DPDP-aware.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="22 August 2026">
      <p>
        This Privacy Policy explains how <strong>Rizely</strong> (&quot;Rizely&quot;,
        &quot;we&quot;, &quot;us&quot;) collects, uses, shares, and protects personal data when you
        use our website and our WhatsApp- and Telegram-based business-card scanning and follow-up
        service (the &quot;Service&quot;). We are an India-first product and handle personal data
        with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP) in mind.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Details you give us.</strong> When you join the waitlist or contact us, we
          collect your phone number and any message you send. When you use the Service, we
          collect your WhatsApp/Telegram identifier and account details.
        </li>
        <li>
          <strong>Business-card data you capture.</strong> When you scan a card, we process the
          information on it (such as a name, company, designation, phone, email, and address) and
          any voice note or tags you add. This is your leads&apos; data, captured by you — you are
          responsible for having a lawful basis to collect and process it, and we process it on
          your behalf to provide the Service.
        </li>
        <li>
          <strong>Usage data.</strong> Basic technical and usage information (for example, scans
          made, follow-ups sent, and error logs) so we can run and improve the Service.
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To provide the Service — scan cards, build your lead pipeline, and send follow-ups.</li>
        <li>To respond to waitlist sign-ups and support requests.</li>
        <li>To operate, secure, and improve the product.</li>
        <li>To comply with legal obligations, including under the DPDP Act.</li>
      </ul>

      <h2>3. How we share it</h2>
      <p>
        We do not sell your personal data. We share it only with service providers who help us run
        the Service — for example, hosting and form providers, and the messaging platforms
        (WhatsApp/Meta and Telegram) and AI processing services used to read cards and draft
        follow-ups. These providers process data on our instructions. We may also disclose data if
        required by law.
      </p>

      <h2>4. Your rights</h2>
      <p>
        Subject to applicable law, you may request access to, correction of, or deletion of your
        personal data, ask us to export it, or withdraw consent. To make a request or raise a
        grievance, contact us (see below). We will respond within the timelines required by law.
      </p>

      <h2>5. Data retention &amp; security</h2>
      <p>
        We keep personal data only for as long as needed to provide the Service or to meet legal
        requirements, and we use reasonable technical and organisational measures to protect it. No
        method of transmission or storage is completely secure.
      </p>

      <h2>6. Children</h2>
      <p>The Service is intended for business users and is not directed to anyone under 18.</p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will change the &quot;Last updated&quot;
        date above when we do.
      </p>

      <h2>8. Contact us</h2>
      <p>
        For any privacy question or request, reach us on{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          WhatsApp at +91 83739 78881
        </a>
        .
      </p>
    </LegalLayout>
  );
}
