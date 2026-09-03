"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  MapPin,
  Terminal,
  Zap,
} from "lucide-react";
import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskedText from "@/components/ui/MaskedText";
import { cn } from "@/lib/utils";

type Status = "open" | "one-left" | "reserved";

interface Territory {
  metro: string;
  status: Status;
}

const TERRITORIES: Territory[] = [
  { metro: "Austin, TX", status: "open" },
  { metro: "Phoenix, AZ", status: "one-left" },
  { metro: "Tampa, FL", status: "open" },
  { metro: "Charlotte, NC", status: "open" },
  { metro: "Denver, CO", status: "one-left" },
  { metro: "San Diego, CA", status: "reserved" },
];

const VOLUMES = [
  "Under 150 leads / month",
  "150 – 500 leads / month",
  "500 – 1,500 leads / month",
  "1,500+ leads / month",
] as const;

const STATUS_STYLES: Record<Status, string> = {
  open: "bg-spring/10 text-mint",
  "one-left": "bg-azure/10 text-azure",
  reserved: "bg-canvas-deep text-steel-faint",
};

const STATUS_LABEL: Record<Status, string> = {
  open: "Open",
  "one-left": "1 slot left",
  reserved: "Reserved",
};

export default function CtaSection() {
  const [step, setStep] = useState(0);
  const [metro, setMetro] = useState<Territory | null>(null);
  const [volume, setVolume] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setMetro(null);
    setVolume(null);
  };

  return (
    <section id="book" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-8 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.16),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="grid-faint absolute inset-0 opacity-40 [mask-image:radial-gradient(700px_420px_at_50%_40%,#000,transparent)]"
      />

      <div className="container-x relative">
        <div className="overflow-hidden rounded-[36px] border border-[var(--edge)] bg-white/85 shadow-halo-lg backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="border-b border-[var(--edge)] p-8 sm:p-11 lg:border-b-0 lg:border-r">
              <span className="eyebrow">
                <Lock className="h-3.5 w-3.5 text-mint" />
                One brokerage per territory
              </span>

              <MaskedText
                as="h2"
                className="mt-5 font-display text-[clamp(2rem,4.2vw,3.05rem)] font-extrabold leading-[1.05] tracking-tightest text-ink"
                lines={[
                  <>Claim your metro</>,
                  <>
                    before your <span className="text-gradient">competitor</span>
                  </>,
                  <>answers first.</>,
                ]}
              />

              <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-steel">
                We deploy a single autonomous engine per market to keep the lead pool
                uncontested. Book a live architecture demo, hear the agent work a real
                objection, and lock the zone in the same session.
              </p>

              <div className="mt-8 space-y-2">
                {TERRITORIES.map((territory) => (
                  <div
                    key={territory.metro}
                    className="flex items-center justify-between rounded-2xl border border-[var(--edge)] bg-white px-4 py-3"
                  >
                    <span className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                      <MapPin className="h-3.5 w-3.5 text-steel-faint" />
                      {territory.metro}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]",
                        STATUS_STYLES[territory.status],
                      )}
                    >
                      {STATUS_LABEL[territory.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-canvas-sunk p-8 sm:p-11">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
                  <Terminal className="h-3.5 w-3.5 text-azure" />
                  Territory terminal
                </span>
                <span className="font-mono text-[11px] text-steel-faint">
                  step {Math.min(step + 1, 3)} / 3
                </span>
              </div>

              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-canvas-deep">
                <motion.span
                  className="block h-full rounded-full bg-brand"
                  animate={{ width: `${((step + 1) / 3) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="mt-6 min-h-[344px] rounded-3xl border border-[var(--edge)] bg-white p-6">
                <AnimatePresence mode="wait" initial={false}>
                  {step === 0 ? (
                    <motion.div
                      key="metro"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel-faint">
                        01 · Select market
                      </p>
                      <h3 className="mt-2 text-[19px] font-bold tracking-[-0.02em] text-ink">
                        Where do your leads come from?
                      </h3>
                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {TERRITORIES.map((territory) => {
                          const disabled = territory.status === "reserved";
                          return (
                            <button
                              key={territory.metro}
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                setMetro(territory);
                                setStep(1);
                              }}
                              className={cn(
                                "rounded-2xl border px-4 py-3 text-left text-[14px] font-medium transition-all duration-300 ease-swift",
                                disabled
                                  ? "cursor-not-allowed border-[var(--edge)] bg-canvas-sunk text-steel-faint"
                                  : "border-[var(--edge)] bg-white text-ink hover:-translate-y-0.5 hover:border-[var(--edge-strong)] hover:shadow-halo",
                              )}
                            >
                              {territory.metro}
                              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-steel-faint">
                                {STATUS_LABEL[territory.status]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}

                  {step === 1 ? (
                    <motion.div
                      key="volume"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel-faint">
                        02 · Inbound volume
                      </p>
                      <h3 className="mt-2 text-[19px] font-bold tracking-[-0.02em] text-ink">
                        How much flow hits {metro?.metro}?
                      </h3>
                      <div className="mt-5 space-y-2">
                        {VOLUMES.map((band) => (
                          <button
                            key={band}
                            type="button"
                            onClick={() => {
                              setVolume(band);
                              setStep(2);
                            }}
                            className="flex w-full items-center justify-between rounded-2xl border border-[var(--edge)] bg-white px-4 py-3.5 text-left text-[14px] font-medium text-ink transition-all duration-300 ease-swift hover:-translate-y-0.5 hover:border-[var(--edge-strong)] hover:shadow-halo"
                          >
                            {band}
                            <ArrowRight className="h-4 w-4 text-steel-faint" />
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-light transition-colors hover:text-ink"
                      >
                        <ArrowLeft className="h-3 w-3" />
                        back
                      </button>
                    </motion.div>
                  ) : null}

                  {step === 2 ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel-faint">
                        03 · Availability
                      </p>
                      <div className="mt-3 flex items-center gap-2.5">
                        <CheckCircle2 className="h-5 w-5 text-mint" />
                        <h3 className="text-[19px] font-bold tracking-[-0.02em] text-ink">
                          {metro?.metro} is available
                        </h3>
                      </div>

                      <dl className="mt-5 space-y-2 rounded-2xl border border-[var(--edge)] bg-canvas-sunk p-4">
                        {[
                          { term: "Territory", value: metro?.metro ?? "" },
                          { term: "Inbound volume", value: volume ?? "" },
                          { term: "Deployment", value: "9 business days" },
                          { term: "Exclusivity", value: "Single brokerage, renewable" },
                        ].map((row) => (
                          <div key={row.term} className="flex items-center justify-between gap-4">
                            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-steel-faint">
                              {row.term}
                            </dt>
                            <dd className="text-right text-[13.5px] font-semibold text-ink">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <MagneticButton
                          href="#demo"
                          className="px-6 py-3 text-[14px]"
                          icon={<Zap className="h-4 w-4" />}
                        >
                          Experience Live Call
                        </MagneticButton>
                        <MagneticButton
                          href="#top"
                          variant="outline"
                          className="px-6 py-3 text-[14px]"
                        >
                          Book architecture demo
                        </MagneticButton>
                      </div>

                      <button
                        type="button"
                        onClick={reset}
                        className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-light transition-colors hover:text-ink"
                      >
                        <ArrowLeft className="h-3 w-3" />
                        start over
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <p className="mt-4 text-center font-mono text-[11px] text-steel-faint">
                No card, no commitment · live architecture walkthrough
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
