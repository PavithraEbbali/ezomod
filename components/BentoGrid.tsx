"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Gauge,
  Home,
  Mail,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  Radio,
  type LucideIcon,
} from "lucide-react";
import MaskedText from "@/components/ui/MaskedText";
import TiltCard from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

type VisualKind = "lexicon" | "sync" | "latency" | "channels";

interface Feature {
  title: string;
  copy: string;
  icon: LucideIcon;
  span: string;
  visual: VisualKind;
}

const FEATURES: Feature[] = [
  {
    title: "Real Estate Native Reasoning",
    copy: "The agent already speaks the transaction. HOA dues, contingencies, escrow timelines, zoning overlays, dual agency, earnest money — no generic script hallucinating its way through a buyer's question.",
    icon: Home,
    span: "lg:col-span-3",
    visual: "lexicon",
  },
  {
    title: "Bidirectional CRM & Billing Sync",
    copy: "Recording, transcript, intent score, and four tags land on the record before the call disconnects. Anything your team changes flows straight back into the agent's working memory.",
    icon: ArrowLeftRight,
    span: "lg:col-span-3",
    visual: "sync",
  },
  {
    title: "Sub-500ms Human Latency",
    copy: "Natural turn-taking with dynamic pauses, backchannels, and barge-in. Leads talk over it the way they talk over a person — and it handles that without losing the thread.",
    icon: Gauge,
    span: "lg:col-span-2",
    visual: "latency",
  },
  {
    title: "Four-Channel Orchestration",
    copy: "Voice, WhatsApp, SMS, and email run as one cadence rather than four disconnected tools. Silence on one channel escalates to the next automatically, on the schedule that contact actually responds to.",
    icon: Radio,
    span: "lg:col-span-4",
    visual: "channels",
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
  "Dunning",
] as const;

const SYNC_ROWS = [
  { label: "Call recording + transcript", state: "pushed" },
  { label: "Intent score & 4-point tags", state: "pushed" },
  { label: "Calendar hold", state: "pushed" },
  { label: "Subscription health", state: "watching" },
] as const;

const CHANNELS: { name: string; trigger: string; icon: LucideIcon; tone: string }[] = [
  { name: "Neural voice", trigger: "T+00:30", icon: PhoneCall, tone: "border-azure/25 bg-azure/[0.07] text-azure" },
  { name: "WhatsApp", trigger: "no answer", icon: MessageCircle, tone: "border-spring/30 bg-spring/[0.08] text-mint" },
  { name: "SMS", trigger: "T+00:42", icon: MessageSquareText, tone: "border-aqua/30 bg-aqua/[0.08] text-aqua" },
  { name: "Email brief", trigger: "T+02:00h", icon: Mail, tone: "border-lime/40 bg-lime/[0.12] text-mint" },
];

const LATENCY = [
  { label: "EZOMOD", value: 34, tone: "bg-brand", caption: "410 ms" },
  { label: "Human ISA", value: 72, tone: "bg-steel-faint/50", caption: "1.4 s" },
  { label: "Generic bot", value: 100, tone: "bg-steel-faint/30", caption: "2.6 s" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function Visual({ kind }: { kind: VisualKind }) {
  if (kind === "lexicon") {
    return (
      <div className="mt-6 flex flex-wrap gap-2">
        {LEXICON.map((term, index) => (
          <motion.span
            key={term}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.045, ease: EASE }}
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
        {SYNC_ROWS.map((row, index) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--edge)] bg-white px-4 py-2.5"
          >
            <span className="min-w-0 truncate text-[13px] font-medium text-steel">{row.label}</span>
            <span
              className={cn(
                "shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.11em]",
                row.state === "pushed" ? "text-mint" : "text-azure",
              )}
            >
              {row.state}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (kind === "latency") {
    return (
      <div className="mt-6 space-y-3.5">
        {LATENCY.map((row, index) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-medium text-steel">{row.label}</span>
              <span className="font-mono text-[11px] text-steel-faint">{row.caption}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-canvas-deep">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${row.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: EASE }}
                className={cn("block h-full rounded-full", row.tone)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {CHANNELS.map((channel, index) => {
        const Icon = channel.icon;
        return (
          <motion.div
            key={channel.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
            className={cn("rounded-2xl border px-3.5 py-3", channel.tone)}
          >
            <Icon className="h-4 w-4" />
            <p className="mt-2.5 text-[13px] font-bold tracking-[-0.01em] text-ink">
              {channel.name}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-steel-faint">
              {channel.trigger}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute left-[-10%] top-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.14),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[700px] text-center">
          <span className="eyebrow">
            <Radio className="h-3.5 w-3.5 text-mint" />
            Capabilities
          </span>
          <MaskedText
            as="h2"
            className="mt-5 font-display text-[clamp(1.75rem,4.6vw,2.95rem)] font-extrabold leading-[1.07] tracking-tightest text-ink"
            lines={[
              <>Not a dialer.</>,
              <>
                An <span className="text-gradient">operations layer.</span>
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-steel sm:text-[16.5px]">
            Everything below runs on the same agent, against the same memory, on the same record —
            which is exactly why the handoffs never drop anything.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3.5 lg:grid-cols-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: EASE }}
                className={feature.span}
              >
                <TiltCard className="p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-glow">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-[17px] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[18px]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-steel">{feature.copy}</p>
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
