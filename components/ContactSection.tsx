import ButtonLink from "@/components/ui/ButtonLink";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/site";

const AGENDA = [
  "A walkthrough of how your leads are handled today",
  "Where response time and follow-up are costing you deals",
  "What we would build, how long it takes, and what it costs",
] as const;

const CONSULTATION_MAILTO = `${CONTACT_HREF}?subject=${encodeURIComponent(
  "Consultation request",
)}&body=${encodeURIComponent(
  "Name:\nCompany:\nCRM you use:\nApproximate leads per month:\nBest times to talk:\n",
)}`;

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="relative isolate grid gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#0D2040] to-[#0A2E28] p-8 text-white shadow-xl sm:p-10 md:p-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#00A3FF]/40 to-[#22C55E]/30 blur-3xl"
          />
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Book a consultation
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              A 30-minute call with the people who would build your system. No sales script, no
              obligation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={CONSULTATION_MAILTO} variant="inverse">
                Book a Consultation
              </ButtonLink>
              <ButtonLink
                href={CONTACT_HREF}
                variant="secondary"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10"
              >
                Contact Us
              </ButtonLink>
            </div>
            <p className="mt-5 break-all text-sm text-white/60">{CONTACT_EMAIL}</p>
          </div>
          <div>
            <h3 className="font-semibold">What we cover on the call</h3>
            <ul className="mt-4 space-y-3">
              {AGENDA.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-white/75">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#00A3FF] to-[#22C55E]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
