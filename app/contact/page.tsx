import type { Metadata } from "next";
import Link from "next/link";
import CalEmbed from "@/components/contact/CalEmbed";
import ContactForm from "@/components/contact/ContactForm";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import CheckList from "@/components/content/CheckList";
import PageHeader from "@/components/PageHeader";
import { TURNSTILE_SITE_KEY, calEmbedUrl } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
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

const LINK = "font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

export default function Page() {
  // Without a configured booking URL the calendar is skipped; the form and email remain.
  const calSrc = calEmbedUrl();

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

      <section className="section !pt-12">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            {calSrc ? (
              <div>
                <h2 className="h2 !text-2xl">Pick a time on the calendar</h2>
                <p className="lead mt-2">Choose a slot that suits you. You&apos;ll get a confirmation by email.</p>
                <div className="mt-5">
                  <CalEmbed src={calSrc} />
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
              <h2 className="h2 !text-2xl">{calSrc ? "Or send us a message" : "Send us a message"}</h2>
              <p className="lead mt-2">Tell us a little about your business and we&apos;ll reply with times for a call.</p>
              <div className="mt-6">
                <ContactForm services={SERVICES.map((s) => s.name)} turnstileSiteKey={TURNSTILE_SITE_KEY} />
              </div>
            </div>
          </div>

          <aside className="space-y-8">
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
                If it&apos;s a good fit, you receive a written scope and timeline. Nothing starts until
                you approve it.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Prefer email?</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                <a href={MAILTO} className={LINK}>
                  Email us to book a call
                </a>{" "}
                or write to{" "}
                <a href={CONTACT_HREF} className={`${LINK} break-all`}>
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Other ways to reach Ezomod</h2>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>
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
          </aside>
        </div>
      </section>
    </>
  );
}
