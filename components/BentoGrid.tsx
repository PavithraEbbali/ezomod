"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Gauge,
  Home,
  MessageSquareDot,
  type LucideIcon,
} from "lucide-react";
import MaskedText from "@/components/ui/MaskedText";
import TiltCard from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  copy: string;
  icon: LucideIcon;
  span: string;
  visual: "lexicon" | "sync" | "latency" | "fallback";
}

const FEATURES: Feature[] = [
  {
    title: "Real Estate Native Lexicon",
    copy: "The agent already speaks the language of the transaction. HOA dues, contingencies, escrow timelines, zoning overlays, dual agency, earnest money — no generic script hallucinating its way through a buyer question.",
    icon: Home,
    span: "lg:col-span-3",
    visual: "lexicon",
  },
  {
    title: "Bidirectional CRM Sync",
    copy: "Recording, full transcript, intent score and tags are pushed into the record before the call disconnects, and any change your agent makes flows straight back to the agent memory.",
    icon: ArrowLeftRight,
    span: "lg:col-span-3",
    visual: "sync",
  },
  {
    title: "Sub-500ms Human Latency",
    copy: "Natural turn-taking with dynamic pauses, backchannels and barge-in. Leads talk over it the way they talk over a person, and it handles that.",
    icon: Gauge,
    span: "lg:col-span-2",
    visual: "latency",
  },
  {
    title: "Multi-Touch Smart Fallback",
    copy: "No answer is not a dead lead. Automated SMS and WhatsApp sequences fire on a behavioural cadence, then the agent re-dials at the hour that lead historically picks up.",
    icon: MessageSquareDot,
    span: "lg:col-span-4",
    visual: "fallback",
  },
];

const LEXICON = [
  "HOA dues",
  "Contingency",
  "Escrow",
  "Zoning R-3",
  "Earnest money",
  "Appraisal gap",
  "Dual agency",
  "Title",
];

function Visual({ kind }: { kind: Feature["visual"] }) {
  if (kind === "lexicon") {
    return (
      <div className="mt-6 flex flex-wrap gap-2">
        {LEXICON.map((term, index) => (
          <motion.span
            key={term}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-[var(--edge)] bg-white px-3 py-1.5 text-[12.5px] font-medium text-steel shadow-[0_1px_2px_rgba(9,13,26,0.03)]"
          >
            {term}
          </motion.span>
        ))}
      </div>
    );
  }

  if (kind === "sync") {
    return (
      <div className="mt-6 space-y-2.5">
        {[
          { label: "Call recording", state: "pushed" },
          { label: "Transcript + tags", state: "pushed" },
          { label: "Stage: Qualified", state: "synced" },
        ].map((row, index) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between rounded-2xl border border-[var(--edge)] bg-white px-3.5 py-2.5"
          >
            <span className="text-[13px] font-medium text-steel">{row.label}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-spring" />
              {row.state}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (kind === "latency") {
    return (
      <div className="mt-6 rounded-2xl border border-[var(--edge)] bg-white px-4 py-4">
        <div className="flex items-end justify-between">
          <span className="font-display text-[2.1rem] font-extrabold leading-none tracking-tightest text-gradient">
            412ms
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-steel-faint">
            p50 turn
          </span>
        </div>
        <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-canvas-deep">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 0.82 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full origin-left rounded-full bg-brand"
          />
        </div>
        <p className="mt-2.5 font-mono text-[11px] text-steel-faint">
          human benchmark · 500ms
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {["Dial 1", "SMS", "WhatsApp", "Dial 2", "Voicemail drop"].map((touch, index) => (
        <motion.div
          key={touch}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2"
        >
          <span
            className={cn(
              "rounded-xl px-3 py-1.5 text-[12.5px] font-semibold",
              index === 4 ? "bg-brand text-white shadow-glow" : "bg-canvas-sunk text-steel",
            )}
          >
            {touch}
          </span>
          {index < 4 ? <span className="h-px w-4 bg-[var(--edge-strong)]" /> : null}
        </motion.div>
      ))}
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.12),transparent)] blur-2xl"
      />
      <div className="container-x relative">
        <div className="max-w-[720px]">
          <span className="eyebrow">
            <Gauge className="h-3.5 w-3.5 text-aqua" />
            Built for the transaction
          </span>
          <MaskedText
            as="h2"
            className="mt-5 font-display text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
            lines={[
              <>Not a chatbot with a</>,
              <>
                phone number. A <span className="text-gradient">closer</span>.
              </>,
            ]}
          />
          <p className="mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-steel">
            Every layer is tuned for one industry, which is why it holds a real conversation
            about a real property instead of reading a script back at your leads.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 38 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className={feature.span}
              >
                <TiltCard className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-white shadow-glow">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-steel-faint">
                      0{index + 1} · Capability
                    </span>
                  </div>
                  <h3 className="mt-5 text-[21px] font-bold leading-snug tracking-[-0.025em] text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] text-[14.5px] leading-relaxed text-steel">
                    {feature.copy}
                  </p>
                  <Visual kind={feature.visual} />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
