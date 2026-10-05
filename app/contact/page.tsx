import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import CheckList from "@/components/content/CheckList";
import PageHeader from "@/components/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, CONTACT_HREF, LINKEDIN_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Consultation | Ezomod",
  description:
    "Book a free 30-minute call with Ezomod to discuss AI lead follow-up, AI agents, automation or a new website. No sales script, no obligation.",
  path: "/contact",
});

const MAILTO = `${CONTACT_HREF}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(
  "Name:\nCompany:\nService I'm interested in:\nCRM / tools we use:\nBest times to talk:\n",
)}`;

const LINK = "font-medium text-[#007BFF] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <PageHeader title="Book a free 30-minute consultation">
        <p>
          Talk to the people who would build your system. We&apos;ll look at how things work today,
          where time or leads are slipping through the cracks, and what Ezomod would build. No sales
          script, no obligation.
        </p>
      </PageHeader>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Phase 4 replaces this panel with the scheduling widget and contact form. */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
            <h2 className="h2 !text-2xl">How do I book a call?</h2>
            <p className="lead mt-3">
              Email us with a few details and we&apos;ll reply with times that suit you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={MAILTO}>Email to book a call</ButtonLink>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Or write to us directly at{" "}
              <a href={CONTACT_HREF} className={`${LINK} break-all`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">What happens on the call?</h2>
              <div className="mt-4">
                <CheckList
                  items={[
                    "A walkthrough of how the work is handled today",
                    "Where time, leads or revenue are slipping through the cracks",
                    "What we would build, plus the timeline and scope",
                  ]}
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">What happens after the call?</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                If it&apos;s a good fit, you receive a written scope and timeline. Nothing starts
                until you approve it.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Other ways to reach Ezomod</h2>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>
                  Email:{" "}
                  <a href={CONTACT_HREF} className={`${LINK} break-all`}>
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  LinkedIn:{" "}
                  <a href={LINKEDIN_URL} className={LINK} rel="noopener">
                    Ezomod on LinkedIn
                  </a>
                </li>
                <li>
                  Questions first? Read the{" "}
                  <Link href="/faq" className={LINK}>
                    FAQ
                  </Link>
                  .
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
