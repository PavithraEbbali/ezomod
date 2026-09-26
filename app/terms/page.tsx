import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the EZOMOD website and services.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    body: (
      <p>
        By using this website or any service provided by EZOMOD, you agree to these Terms of
        Service. If you do not agree, please do not use the website or services.
      </p>
    ),
  },
  {
    heading: "Our services",
    body: (
      <p>
        EZOMOD designs, builds, and operates lead management and communication systems for
        businesses. The specific scope, deliverables, and fees for each client are set out in a
        separate written agreement, which takes precedence over these terms where the two conflict.
      </p>
    ),
  },
  {
    heading: "Client responsibilities",
    body: (
      <ul>
        <li>Provide accurate information and the system access needed to deliver the service.</li>
        <li>Obtain and maintain any consent required to contact your leads and clients by phone, text, or email.</li>
        <li>Use the services in compliance with all applicable laws, including telemarketing and messaging regulations.</li>
      </ul>
    ),
  },
  {
    heading: "SMS messaging terms",
    body: (
      <>
        <p>
          When you opt in to text messages from EZOMOD or a business we serve, you agree to receive
          recurring messages related to your inquiry, appointments, or account. Message frequency
          varies. Message and data rates may apply.
        </p>
        <p>
          Reply STOP to cancel at any time. Reply HELP for help, or contact us at the email below.
          Carriers are not liable for delayed or undelivered messages.
        </p>
      </>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The website, its content, and our underlying systems are owned by EZOMOD. Clients retain
        ownership of their own data, including lead and customer records. Nothing in these terms
        transfers ownership of either party&apos;s intellectual property.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, EZOMOD is not liable for indirect, incidental, or
        consequential damages arising from use of the website or services. Our total liability for
        any claim is limited to the fees paid to us for the services in the three months before the
        claim arose.
      </p>
    ),
  },
  {
    heading: "Termination",
    body: (
      <p>
        We may suspend or end access to the services if these terms are breached. Termination terms
        for client engagements are set out in the applicable service agreement.
      </p>
    ),
  },
  {
    heading: "Privacy",
    body: (
      <p>
        Our handling of personal information is described in our{" "}
        <Link href="/privacy" className="font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <p>
        We may update these terms from time to time. Continued use of the website or services after
        an update means you accept the revised terms. Questions can be sent to{" "}
        <a href={CONTACT_HREF} className="break-all font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return <LegalDocument title="Terms of Service" updated="September 26, 2026" sections={SECTIONS} />;
}
