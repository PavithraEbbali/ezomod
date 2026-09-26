import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How EZOMOD collects, uses, and protects personal information, including SMS consent data.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        EZOMOD (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) builds and operates lead
        management and communication systems for businesses. This policy explains how we handle
        personal information collected through our website and through the systems we operate on
        behalf of our clients.
      </p>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>Contact details such as name, email address, phone number, and company name.</li>
          <li>Information you provide when you inquire about a property, service, or consultation.</li>
          <li>Records of calls, text messages, and emails, including recordings and transcripts where permitted by law and disclosed at the start of the call.</li>
          <li>Technical data such as IP address, browser type, and pages visited on our website.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "How we use information",
    body: (
      <ul>
        <li>To respond to inquiries and schedule appointments you request.</li>
        <li>To send calls, text messages, and emails you have consented to receive.</li>
        <li>To update our clients&apos; CRM records so their teams can serve you.</li>
        <li>To maintain, secure, and improve our services.</li>
        <li>To comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    heading: "SMS and mobile information",
    body: (
      <>
        <p>
          If you opt in to receive text messages, we use your mobile number only to send the
          messages you agreed to receive. Message frequency varies. Message and data rates may
          apply. Reply STOP at any time to opt out, or HELP for assistance.
        </p>
        <p>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. All of the categories of sharing described in this policy exclude
          text messaging originator opt-in data and consent; this information will not be shared
          with any third parties.
        </p>
      </>
    ),
  },
  {
    heading: "How we share information",
    body: (
      <>
        <p>We do not sell personal information. We share it only with:</p>
        <ul>
          <li>The client business you contacted, so they can respond to your inquiry.</li>
          <li>Service providers that host, process, or deliver communications for us under contracts that limit their use of the data.</li>
          <li>Authorities when required by law or to protect rights and safety.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Data retention and security",
    body: (
      <p>
        We keep personal information only as long as needed for the purposes above or as required
        by law. Data is encrypted in transit and at rest, and access is limited to personnel who need
        it to provide the service.
      </p>
    ),
  },
  {
    heading: "Your choices and rights",
    body: (
      <p>
        You can request access to, correction of, or deletion of your personal information, and you
        can opt out of calls, texts, or emails at any time. Depending on where you live, you may have
        additional rights under local law. To make a request, email us at the address below.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top
        of this page shows when it was last revised.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about this policy can be sent to{" "}
        <a href={CONTACT_HREF} className="break-all font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" updated="September 26, 2026" sections={SECTIONS} />;
}
