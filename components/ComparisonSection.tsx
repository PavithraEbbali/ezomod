"use client";

import { motion } from "framer-motion";
import {
  BellOff,
  CalendarCheck,
  CalendarX,
  DatabaseZap,
  FileWarning,
  PhoneCall,
  UserRoundCheck,
  Voicemail,
  Zap,
  type LucideIcon,
} from "lucide-react";
import MaskedText from "@/components/ui/MaskedText";
import TiltCard from "@/components/ui/TiltCard";

interface ManualSide {
  icon: LucideIcon;
  status: string;
  body: string;
}

interface EzomodSide {
  icon: LucideIcon;
  status: string;
  body: string;
  chips?: string[];
}

interface Milestone {
  elapsed: string;
  phase: string;
  manual: ManualSide;
  ezomod: EzomodSide;
}

const MILESTONES: Milestone[] = [
  {
    elapsed: "00:15s",
    phase: "Speed to first dial",
    manual: {
      icon: BellOff,
      status: "Unread (+15m)",
      body: "The inquiry sits unread in an inbox or Slack channel while the agent is conducting a walkthrough across town.",
    },
    ezomod: {
      icon: PhoneCall,
      status: "Outbound ringing",
      body: "The autonomous neural voice engine dials in under 15 seconds. The phone rings while the buyer is still on your property landing page.",
    },
  },
  {
    elapsed: "02:00m",
    phase: "Qualification rigor",
    manual: {
      icon: Voicemail,
      status: "Voicemail left",
      body: "The callback goes to voicemail hours later and a generic script is left behind. No answers, no context.",
    },
    ezomod: {
      icon: UserRoundCheck,
      status: "4-point verified",
      body: "A conversational, human-grade voice interview dynamically verifies what your ISA would ask, without a script to read from.",
      chips: ["Budget $1.2M+", "Pre-approved", "30-day timeline", "School districts"],
    },
  },
  {
    elapsed: "03:30m",
    phase: "CRM telemetry & hygiene",
    manual: {
      icon: FileWarning,
      status: "Empty CRM fields",
      body: "Scribbled notes on post-it pads. Manual data entry is postponed until late evening, or forgotten entirely.",
    },
    ezomod: {
      icon: DatabaseZap,
      status: "CRM bi-directional sync",
      body: "Verbatim transcript, call recording, sentiment analysis and a formatted JSON buyer dossier push into Follow Up Boss or Lofty before the call concludes.",
    },
  },
  {
    elapsed: "05:00m",
    phase: "Appointment lock-in",
    manual: {
      icon: CalendarX,
      status: "Deal leakage",
      body: "A multi-day email and text tag game to coordinate availability. The buyer clicks a competing listing instead.",
    },
    ezomod: {
      icon: CalendarCheck,
      status: "Showing confirmed",
      body: "A calendar slot locks directly onto the listing agent's schedule, with a two-way SMS confirmation sent to the buyer.",
    },
  },
];

const PROOF = [
  "98.4% faster speed-to-lead",
  "Zero dropped weekend leads",
  "100% CRM data completeness",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ComparisonSection() {
  return (
    <section
      id="comparison"
      className="relative scroll-mt-24 overflow-hidden bg-canvas-sunk py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-20 -z-10 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,163,255,0.12),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="eyebrow">
            <Zap className="h-3.5 w-3.5 text-aqua" />
            Velocity benchmark
          </span>
          <MaskedText
            as="h2"
            className="mt-5 font-display text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
            lines={[
              <>The gap is not effort.</>,
              <>
                It is <span className="text-gradient">response time</span>.
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-[600px] text-[16.5px] leading-relaxed text-steel">
            What happens across the critical first 15 minutes after a high-intent buyer submits an
            inquiry.
          </p>
        </div>

        <div className="mt-14 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-slate-100/70 px-5 py-3 text-center">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              The Fragmented Agency / Manual ISA
            </span>
          </div>
          <div />
          <div className="rounded-2xl border border-[rgba(0,128,255,0.15)] bg-white px-5 py-3 text-center shadow-halo">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gradient">
              The EZOMOD Autonomous Engine
            </span>
          </div>
        </div>

        <div className="relative mt-6 space-y-8 lg:space-y-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[27px] w-px bg-[linear-gradient(to_bottom,transparent,rgba(0,123,255,0.3)_10%,rgba(34,197,94,0.3)_90%,transparent)] lg:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 overflow-hidden lg:block"
          >
            <span className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,123,255,0.34)_12%,rgba(6,182,212,0.34)_50%,rgba(34,197,94,0.34)_88%,transparent)]" />
            <motion.span
              initial={{ top: "-12%" }}
              animate={{ top: ["-12%", "104%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
              className="absolute left-1/2 h-24 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-aqua to-spring shadow-[0_0_16px_rgba(6,182,212,0.8)] motion-reduce:hidden"
            />
          </div>

          {MILESTONES.map((milestone, index) => {
            const ManualIcon = milestone.manual.icon;
            const EzomodIcon = milestone.ezomod.icon;
            return (
              <div
                key={milestone.elapsed}
                className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] lg:items-center lg:gap-0"
              >
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
                  className="order-2 pl-12 lg:order-none lg:pl-0 lg:pr-8"
                >
                  <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400">
                        <ManualIcon className="h-[17px] w-[17px]" />
                      </span>
                      <span className="rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                        {milestone.manual.status}
                      </span>
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
                      {milestone.manual.body}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.72 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 + 0.1 }}
                  className="order-1 z-10 flex items-center gap-3 lg:order-none lg:flex-col lg:justify-center lg:gap-2"
                >
                  <span className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-[var(--edge)] bg-white font-mono text-[11px] font-bold text-ink shadow-halo">
                    {milestone.elapsed}
                  </span>
                  <span className="rounded-md bg-canvas-sunk px-1.5 font-mono text-[9.5px] uppercase leading-tight tracking-[0.14em] text-steel-faint lg:max-w-[108px] lg:text-center">
                    {milestone.phase}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 + 0.06 }}
                  className="order-3 pl-12 lg:order-none lg:pl-8"
                >
                  <TiltCard
                    intensity={7}
                    className="rounded-3xl border-[rgba(0,128,255,0.15)] bg-white/95 p-6 shadow-[0_1px_2px_rgba(9,13,26,0.04),0_14px_32px_-16px_rgba(0,123,255,0.3),0_30px_66px_-34px_rgba(34,197,94,0.32)] backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-glow">
                        <EzomodIcon className="h-[17px] w-[17px]" />
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-spring/30 bg-spring/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mint">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spring opacity-70" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-spring" />
                        </span>
                        {milestone.ezomod.status}
                      </span>
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-steel">
                      {milestone.ezomod.body}
                    </p>
                    {milestone.ezomod.chips ? (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {milestone.ezomod.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-[var(--edge)] bg-white px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-azure"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </TiltCard>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 flex justify-center"
        >
          <div className="glass flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full px-6 py-3.5 shadow-halo">
            {PROOF.map((item, index) => (
              <span key={item} className="flex items-center gap-4">
                {index > 0 ? (
                  <span aria-hidden className="hidden h-4 w-px bg-[var(--edge-strong)] sm:block" />
                ) : null}
                <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink">
                  {index === 0 ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spring opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-spring" />
                    </span>
                  ) : null}
                  {item}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
