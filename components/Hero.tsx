import HeroTelemetry from "@/components/HeroTelemetry";
import ButtonLink from "@/components/ui/ButtonLink";
import { CONSULTATION_HREF } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[rgba(0,123,255,0.08)] blur-3xl" />
        <div className="absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-[rgba(34,197,94,0.08)] blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.4rem]">
            We build AI systems that <span className="text-brand">manage your leads</span> from
            first click to <span className="text-brand">closed deal.</span>
          </h1>
          <p className="lead mt-6 max-w-xl">
            EZOMOD is an infrastructure agency for real estate teams. We design, build, and run
            the systems that call, text, and email every new lead, follow up until they answer,
            and put qualified appointments on your team&apos;s calendar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={CONSULTATION_HREF}>Book a Consultation</ButtonLink>
            <ButtonLink href="/#setup-process" variant="secondary">
              View Setup Process
            </ButtonLink>
          </div>
        </div>

        <HeroTelemetry />
      </div>
    </section>
  );
}
