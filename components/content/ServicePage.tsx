import { ArrowRight, Check, Plug } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import Chips from "@/components/content/Chips";
import FaqList from "@/components/content/FaqList";
import ReadMore from "@/components/content/ReadMore";
import SectionIntro from "@/components/content/SectionIntro";
import ServiceCards from "@/components/content/ServiceCards";
import ServiceIcon from "@/components/content/ServiceIcon";
import JsonLd from "@/components/JsonLd";
import Process from "@/components/Process";
import ButtonLink from "@/components/ui/ButtonLink";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import { faqPage, service as serviceSchema } from "@/lib/schema";
import { getServiceDesign } from "@/lib/service-design";
import { getService, servicePath, type Service } from "@/lib/services";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINK = "font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]";

/**
 * Shared layout for every /services/[slug] page:
 * hero + visual → definition → problems → what we build → how it works (navy) →
 * tools + industries → FAQ → related → CTA. `extra` renders after "What we build".
 */
export default function ServicePage({ service, extra }: { service: Service; extra?: ReactNode }) {
  const design = getServiceDesign(service.slug);
  if (!design) throw new Error(`Missing SERVICE_DESIGN entry for ${service.slug}`);

  const related = service.related.map(getService).filter((s): s is Service => Boolean(s));
  const servesRealEstate = service.industries.some((i) => i.toLowerCase().includes("real estate"));
  const [firstIntro, ...moreIntro] = service.intro;

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqPage(service.faqs)]} />
      <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: service.name, path: servicePath(service.slug) }]} />

      {/* Hero */}
      <header className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
        <div aria-hidden className={cn("absolute inset-0 -z-10", design.accent.glow)} />
        <div className="container-x grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className={cn("flex items-center gap-2 text-sm font-semibold uppercase tracking-wider", design.accent.text)}>
              <span className={cn("grid h-8 w-8 place-items-center rounded-lg", design.accent.tile)}>
                <ServiceIcon name={service.icon} className="h-4 w-4" />
              </span>
              {service.navLabel}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl">
              {service.h1}
            </h1>
            <p className="lead mt-5 max-w-xl">{service.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
          </div>
          <ServiceVisual slug={service.slug} />
        </div>
      </header>

      {/* Definition + who it's for */}
      <section className="section bg-plain">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <SectionIntro eyebrow={service.definitionQuestion} title={design.definitionHeading}>
              <p className="font-medium text-slate-900">{service.definition}</p>
            </SectionIntro>
            <p className="body mt-4">{firstIntro}</p>
            {moreIntro.length > 0 ? (
              <ReadMore>
                {moreIntro.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </ReadMore>
            ) : null}
          </div>
          <div
            className={cn(
              "h-fit rounded-2xl border border-l-4 border-[#00A3FF]/20 bg-gradient-to-br from-[#F2F8FF] to-[#F0FBF4] p-6 shadow-[0_10px_30px_-12px_rgba(0,30,70,0.10)] sm:p-8",
              design.accent.border,
            )}
          >
            <h3 className="text-lg font-semibold text-slate-900">Who needs {service.navLabel}?</h3>
            <p className="mt-1 text-slate-700">Ezomod builds this for teams like these:</p>
            <ul className="mt-5 space-y-3">
              {service.whoFor.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-slate-800">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#22C55E]/15 text-[#15803D]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="section bg-tint">
        <div className="container-x">
          <SectionIntro eyebrow="What problems does it solve?" title={design.problemsHeading}>
            <p>The most common problems we are asked to fix, and how this service handles them.</p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.problems.map((item, i) => {
              const Icon = design.problemIcons[i];
              return (
                <li key={item.title} className="lift-card">
                  {Icon ? (
                    <span className={cn("icon-circle", design.accent.tile)}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  ) : null}
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* What we build */}
      <section className="section bg-brandwash">
        <div className="container-x">
          <SectionIntro eyebrow={`What's included in ${service.name}?`} title={design.buildHeading}>
            <p>Every project is scoped to your business, but most include the following.</p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item, i) => {
              const Icon = design.includedIcons[i];
              return (
                <li key={item.title} className="lift-card">
                  {Icon ? (
                    <span className="icon-circle bg-gradient-to-br from-[#007BFF] to-[#22C55E] text-white shadow-md shadow-[#0080FF]/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  ) : null}
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {extra}

      <Process
        id="how-it-works"
        dark
        eyebrow="How does it work?"
        title={design.stepsHeading}
        intro="A clear, step-by-step process. We do the technical work; your team reviews and approves each stage."
        steps={service.steps}
      />

      {/* Tools + industries */}
      <section className="section bg-plain">
        <div className="container-x grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-2xl border border-slate-200/80 p-6 sm:p-8">
            <p className="eyebrow">Integrations</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900">
              Which tools and integrations does it work with?
            </h2>
            <p className="body mt-3">{service.toolsNote}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.tools.map((tool) => (
                <li
                  key={tool}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-[#F8FBFF] px-3.5 py-3 text-sm font-medium leading-snug text-slate-800"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#0062CC] shadow-sm">
                    <Plug className="h-4 w-4" aria-hidden />
                  </span>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-6 sm:p-8">
            <p className="eyebrow">Industries</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900">Which industries is it for?</h2>
            <p className="body mt-3">
              {service.name} works for any business with the problems above. It is especially useful in:
            </p>
            <div className="mt-6">
              <Chips items={service.industries} />
            </div>
            {servesRealEstate ? (
              <p className="mt-8">
                <Link
                  href="/industries/real-estate"
                  className="group flex items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-[#007BFF]/10 to-[#22C55E]/10 p-4 text-slate-800"
                >
                  <span>
                    Working in property? See{" "}
                    <span className="font-semibold text-[#0062CC]">AI automation for real estate teams</span>.
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0062CC] transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-tint">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <SectionIntro compact eyebrow="FAQ" title={`${service.name}: frequently asked questions`} />
            <p className="body mt-4">
              More questions? Read the{" "}
              <Link href="/faq" className={LINK}>
                Ezomod FAQ
              </Link>
              .
            </p>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      {/* Related */}
      <section className="section bg-plain">
        <div className="container-x">
          <SectionIntro eyebrow="Related services" title="Works even better together">
            <p>
              These services are often combined with {service.navLabel}. See{" "}
              <Link href="/services" className={LINK}>
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
