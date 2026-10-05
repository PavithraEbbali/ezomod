import Link from "next/link";
import type { ReactNode } from "react";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import CheckList from "@/components/content/CheckList";
import Chips from "@/components/content/Chips";
import FaqList from "@/components/content/FaqList";
import ItemGrid from "@/components/content/ItemGrid";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceCards from "@/components/content/ServiceCards";
import ServiceIcon from "@/components/content/ServiceIcon";
import Process from "@/components/Process";
import ButtonLink from "@/components/ui/ButtonLink";
import JsonLd from "@/components/JsonLd";
import { faqPage, service as serviceSchema } from "@/lib/schema";
import { getService, servicePath, type Service } from "@/lib/services";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";

const BAND = "section border-y border-[#00A3FF]/10 bg-white/60";

/**
 * Shared layout for every /services/[slug] page. `extra` renders after "What's included"
 * for service-specific sections (e.g. the real-estate lead follow-up visuals).
 */
export default function ServicePage({ service, extra }: { service: Service; extra?: ReactNode }) {
  const related = service.related.map(getService).filter((s): s is Service => Boolean(s));
  const servesRealEstate = service.industries.some((i) => i.toLowerCase().includes("real estate"));

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqPage(service.faqs)]} />
      <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: service.name, path: servicePath(service.slug) }]} />

      <header className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_15%_0%,rgba(0,123,255,0.08),transparent),radial-gradient(500px_300px_at_85%_100%,rgba(34,197,94,0.08),transparent)]" />
        <div className="container-x py-12 sm:py-16">
          <span className="icon-tile">
            <ServiceIcon name={service.icon} className="h-6 w-6" />
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-5xl">
            {service.h1}
          </h1>
          <p className="lead mt-5 max-w-2xl">{service.summary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container-x">
          <SectionIntro title={service.definitionQuestion}>
            <p className="font-medium text-slate-800">{service.definition}</p>
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </SectionIntro>
        </div>
      </section>

      <section className={BAND}>
        <div className="container-x">
          <SectionIntro title={`Who needs ${service.navLabel}?`}>
            <p>Ezomod builds this for teams like these:</p>
          </SectionIntro>
          <div className="mt-8">
            <CheckList items={service.whoFor} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionIntro title="What problems does it solve?">
            <p>The most common problems we are asked to fix, and how this service handles them.</p>
          </SectionIntro>
          <div className="mt-10">
            <ItemGrid items={service.problems} columns={2} />
          </div>
        </div>
      </section>

      <section className={BAND}>
        <div className="container-x">
          <SectionIntro title={`What's included in ${service.name}?`}>
            <p>Every project is scoped to your business, but most include the following.</p>
          </SectionIntro>
          <div className="mt-10">
            <ItemGrid items={service.included} />
          </div>
        </div>
      </section>

      {extra}

      <Process
        id="how-it-works"
        title="How does it work?"
        intro="A clear, step-by-step process. We do the technical work; your team reviews and approves each stage."
        steps={service.steps}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h2">Which tools and integrations does it work with?</h2>
            <p className="lead mt-4">{service.toolsNote}</p>
            <div className="mt-6">
              <Chips items={service.tools} />
            </div>
          </div>
          <div>
            <h2 className="h2">Which industries is it for?</h2>
            <p className="lead mt-4">
              {service.name} works for any business with the problems above. It is especially useful in:
            </p>
            <div className="mt-6">
              <Chips items={service.industries} />
            </div>
            {servesRealEstate ? (
              <p className="mt-6 text-slate-600">
                Working in property? See{" "}
                <Link href="/industries/real-estate" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
                  AI automation for real estate teams
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className={BAND}>
        <div className="container-x">
          <SectionIntro title={`${service.name}: frequently asked questions`} />
          <div className="mt-8 max-w-3xl">
            <FaqList faqs={service.faqs} />
          </div>
          <p className="mt-6 text-slate-600">
            More questions? Read the{" "}
            <Link href="/faq" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
              Ezomod FAQ
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionIntro title="Related services">
            <p>
              These services are often combined with {service.navLabel}. See{" "}
              <Link href="/services" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
                all Ezomod services
              </Link>
              .
            </p>
          </SectionIntro>
          <div className="mt-10">
            <ServiceCards services={related} columns={3} />
          </div>
        </div>
      </section>

      <ContactSection
        title={`Talk to Ezomod about ${service.navLabel}`}
        text="Book a free 30-minute call with the people who would build your system. We'll look at how things work today and what we would build. No sales script, no obligation."
      />
    </>
  );
}
