"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CalendarClock,
  CreditCard,
  DatabaseZap,
  GitBranch,
  Mail,
  MessageCircle,
  MessageSquareText,
  Network,
  PhoneCall,
  UserRoundCheck,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import MaskedText from "@/components/ui/MaskedText";
import { cn } from "@/lib/utils";

type ChannelKey = "voice" | "whatsapp" | "sms" | "email" | "data" | "crm" | "human";

const CHANNELS: Record<ChannelKey, { label: string; icon: LucideIcon; className: string }> = {
  voice: { label: "Neural voice", icon: PhoneCall, className: "border-azure/25 bg-azure/[0.07] text-azure" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, className: "border-spring/30 bg-spring/[0.08] text-mint" },
  sms: { label: "SMS", icon: MessageSquareText, className: "border-aqua/30 bg-aqua/[0.08] text-aqua" },
  email: { label: "Email", icon: Mail, className: "border-azure/20 bg-azure/[0.05] text-azure-deep" },
  data: { label: "Data layer", icon: Network, className: "border-[var(--edge)] bg-canvas-deep text-steel" },
  crm: { label: "CRM write", icon: DatabaseZap, className: "border-azure/25 bg-azure/[0.06] text-azure" },
  human: { label: "Human", icon: UserRoundCheck, className: "border-lime/40 bg-lime/[0.12] text-mint" },
};

interface Move {
  stamp: string;
  channel: ChannelKey;
  title: string;
  detail: string;
}

interface Branch {
  key: string;
  signal: string;
  badge: string;
  trigger: string;
  icon: LucideIcon;
  accent: string;
  dot: string;
  moves: Move[];
  outcome: string;
}

const BRANCHES: Branch[] = [
  {
    key: "high-intent",
    signal: "High Intent",
    badge: "Green signal",
    trigger: "Form submit, IDX save, or ad reply carrying buying language.",
    icon: Zap,
    accent: "border-spring/35 bg-spring/[0.07]",
    dot: "bg-spring",
    moves: [
      {
        stamp: "T+00:08",
        channel: "data",
        title: "Signal scored",
        detail:
          "Source, page depth, and message language are read together to separate a browser from a buyer.",
      },
      {
        stamp: "T+00:30",
        channel: "voice",
        title: "Instant neural voice call",
        detail:
          "Outbound dial inside thirty seconds on local caller ID, while the lead is still on the listing.",
      },
      {
        stamp: "T+02:10",
        channel: "voice",
        title: "Deep 4-point qualification",
        detail:
          "Budget band, location, timeline, and pre-approval confirmed live — objections worked, not dodged.",
      },
      {
        stamp: "T+04:40",
        channel: "human",
        title: "Warm transfer or direct booking",
        detail:
          "Live transfer to the agent's mobile, or the tour is written straight onto the calendar.",
      },
    ],
    outcome: "Your agent picks up a qualified buyer already mid-conversation.",
  },
  {
    key: "warm-delay",
    signal: "Warm Delay",
    badge: "Call me next month",
    trigger: "Lead answers, shows real interest, then pushes the timeline out.",
    icon: CalendarClock,
    accent: "border-azure/30 bg-azure/[0.06]",
    dot: "bg-azure",
    moves: [
      {
        stamp: "On call",
        channel: "data",
        title: "Intelligent tagging, not archiving",
        detail:
          "The agent captures the exact re-engage date and the reason behind it, then sets the cadence.",
      },
      {
        stamp: "Week 1",
        channel: "whatsapp",
        title: "Adaptive market drop",
        detail:
          "New comps inside their pocket arrive as rich media — relevant enough to answer, never template spam.",
      },
      {
        stamp: "Week 3",
        channel: "sms",
        title: "Behavioural check-in",
        detail:
          "One line, one question, written against the blocker they actually named on the call.",
      },
      {
        stamp: "Re-engage",
        channel: "voice",
        title: "Voice re-open on the promised day",
        detail:
          "The agent dials back when it said it would and re-runs qualification from stored context.",
      },
    ],
    outcome: "The lead returns warm instead of dying inside a CRM tag.",
  },
  {
    key: "ghosted",
    signal: "Ghosted Contact",
    badge: "Hierarchy escalation",
    trigger: "Primary contact goes silent for five days across every channel.",
    icon: UsersRound,
    accent: "border-aqua/35 bg-aqua/[0.07]",
    dot: "bg-aqua",
    moves: [
      {
        stamp: "Day 1–4",
        channel: "sms",
        title: "Automatic channel pivot",
        detail:
          "Cadence rotates voice, WhatsApp, SMS, and email at the hours that contact has historically opened.",
      },
      {
        stamp: "Day 5",
        channel: "data",
        title: "Household & org-tree resolution",
        detail:
          "Public records and CRM history are queried to surface co-buyers, spouses, and alternate decision-makers.",
      },
      {
        stamp: "Day 5",
        channel: "voice",
        title: "Escalation to the second seat",
        detail:
          "Outreach re-opens against the secondary contact referencing the original inquiry — never a cold restart.",
      },
      {
        stamp: "Day 6",
        channel: "crm",
        title: "Re-attribution & merge",
        detail:
          "Whoever responds becomes the new primary; the household record merges instead of forking into duplicates.",
      },
    ],
    outcome: "Deals stop dying because one inbox went quiet.",
  },
  {
    key: "post-close",
    signal: "Post-Close Ops",
    badge: "Client desk & dunning",
    trigger: "The client is signed — the lifecycle keeps running without your team.",
    icon: CreditCard,
    accent: "border-lime/45 bg-lime/[0.10]",
    dot: "bg-lime",
    moves: [
      {
        stamp: "Always on",
        channel: "whatsapp",
        title: "Autonomous Tier-1 client desk",
        detail:
          "Service and contract questions are triaged and answered, with full account context attached.",
      },
      {
        stamp: "On failure",
        channel: "voice",
        title: "Automated payment dunning",
        detail:
          "A failed monthly subscription charge triggers a gentle voice and SMS reminder with a secure update link.",
      },
      {
        stamp: "Escalation",
        channel: "human",
        title: "Clean human handoff",
        detail:
          "Anything outside Tier-1 lands with your team, transcript and sentiment already attached.",
      },
      {
        stamp: "Continuous",
        channel: "data",
        title: "Retention signal",
        detail:
          "Sentiment and response latency roll into a churn-risk score written back onto the account.",
      },
    ],
    outcome: "Your team only touches what genuinely needs a human.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AdaptiveDecisionMatrix() {
  const [activeKey, setActiveKey] = useState(BRANCHES[0].key);
  const active = BRANCHES.find((branch) => branch.key === activeKey) ?? BRANCHES[0];

  return (
    <section
      id="adaptive"
      className="relative scroll-mt-24 overflow-hidden bg-canvas-sunk py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="grid-faint absolute inset-0 opacity-40 [mask-image:radial-gradient(820px_520px_at_50%_30%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="absolute right-[-12%] top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.16),transparent)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="eyebrow">
            <BrainCircuit className="h-3.5 w-3.5 text-azure" />
            Lifecycle intelligence engine
          </span>
          <MaskedText
            as="h2"
            className="mt-5 font-display text-[clamp(1.75rem,4.6vw,2.95rem)] font-extrabold leading-[1.07] tracking-tightest text-ink"
            lines={[
              <>Real pipelines are messy.</>,
              <>
                The agent <span className="text-gradient">decides anyway.</span>
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-steel sm:text-[16.5px]">
            Four branches cover the states every brokerage actually lives in — and every one of
            them resolves without a human opening a dashboard.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-5">
          <div
            role="tablist"
            aria-label="Decision branches"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1"
          >
            {BRANCHES.map((branch) => {
              const Icon = branch.icon;
              const selected = branch.key === activeKey;
              return (
                <button
                  key={branch.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveKey(branch.key)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 ease-swift",
                    selected
                      ? cn(branch.accent, "shadow-halo")
                      : "border-[var(--edge)] bg-white/70 hover:border-[var(--edge-strong)] hover:bg-white",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="branch-rail"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-brand"
                    />
                  ) : null}
                  <div className="flex items-start gap-3 pl-1.5">
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-500",
                        selected ? "bg-brand text-white shadow-glow" : "bg-canvas-deep text-steel",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-bold tracking-[-0.02em] text-ink">
                          {branch.signal}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-steel">
                          <span className={cn("h-1.5 w-1.5 rounded-full", branch.dot)} />
                          {branch.badge}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-steel-light">
                        {branch.trigger}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="card overflow-hidden p-4 sm:p-6">
            {/* Keyed remount, not AnimatePresence: a branch switch can never stall
                waiting on an exit frame that a backgrounded tab never renders. */}
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: EASE }}
            >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--edge)] pb-4">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-faint">
                    Decision path · {active.signal}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-mint">
                    <GitBranch className="h-3 w-3" />
                    zero human input
                  </span>
                </div>

                <ol className="relative mt-5 space-y-4">
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-3 h-[calc(100%-2.5rem)] w-[2px] rounded-full bg-gradient-to-b from-azure via-aqua to-spring opacity-30"
                  />
                  {active.moves.map((move, index) => {
                    const channel = CHANNELS[move.channel];
                    const ChannelIcon = channel.icon;
                    return (
                      <motion.li
                        key={move.title}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.06 + index * 0.075, ease: EASE }}
                        className="relative flex gap-3.5"
                      >
                        <span className="relative z-10 mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--edge)] bg-white font-mono text-[11px] font-bold text-azure shadow-[0_1px_2px_rgba(9,13,26,0.05)]">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1 rounded-2xl border border-[var(--edge)] bg-white/70 p-3.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.13em] text-steel-faint">
                              {move.stamp}
                            </span>
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.11em]",
                                channel.className,
                              )}
                            >
                              <ChannelIcon className="h-2.5 w-2.5" />
                              {channel.label}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[14.5px] font-bold tracking-[-0.02em] text-ink">
                            {move.title}
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-steel-light">
                            {move.detail}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
                  className="mt-5 flex items-start gap-2.5 rounded-2xl border border-spring/25 bg-spring/[0.07] px-4 py-3.5"
                >
                  <UserRoundCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                  <span className="text-[13.5px] font-semibold leading-relaxed tracking-[-0.01em] text-ink">
                    {active.outcome}
                  </span>
                </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
