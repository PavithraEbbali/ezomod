import HeroTelemetry from "@/components/HeroTelemetry";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF, CTA_LABEL } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-56 -top-56 h-[760px] w-[760px] bg-[radial-gradient(closest-side,rgba(0,123,255,0.08),transparent)]" />
        <div className="absolute -right-48 top-8 h-[720px] w-[720px] bg-[radial-gradient(closest-side,rgba(34,197,94,0.08),transparent)]" />
      </div>

      <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0062CC]">AI automation agency</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.4rem]">
            AI automation for <span className="text-brand">more leads</span> and{" "}
            <span className="text-brand">less busywork.</span>
          </h1>
          <p className="lead mt-6 max-w-xl">
            Ezomod is an AI automation agency that designs, builds and maintains AI systems for lead
            generation, instant lead follow-up, AI voice agents, multi-agent workflows, CRM
            automation and websites, all inside the tools your team already uses.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={CONSULTATION_HREF}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore our services
            </ButtonLink>
          </div>
        </div>

        <HeroTelemetry />
      </div>
    </section>
  );
}
