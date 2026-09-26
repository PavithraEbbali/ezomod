"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, DatabaseZap, Webhook, type LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Stage = {
  title: string;
  icon: LucideIcon;
  iconClass: string;
  items: readonly string[];
  engine?: boolean;
};

const STAGES: readonly Stage[] = [
  {
    title: "Triggers & Ingestion",
    icon: Webhook,
    iconClass: "bg-[#007BFF]/10 text-[#007BFF]",
    items: ["Ad Platforms", "Property Portals", "Website Webhooks", "Direct API"],
  },
  {
    title: "Autonomous Orchestration",
    icon: BrainCircuit,
    iconClass: "bg-gradient-to-br from-[#007BFF] to-[#22C55E] text-white shadow-md shadow-[#0080FF]/25",
    items: ["Neural Voice", "SMS Fallback", "WhatsApp Logic", "Email Dispatch"],
    engine: true,
  },
  {
    title: "Synchronization",
    icon: DatabaseZap,
    iconClass: "bg-[#22C55E]/10 text-[#16A34A]",
    items: ["Your CRM", "Team Calendars", "Analytics Dashboards", "Billing Engines"],
  },
];

/** Seconds for a bead to cross one connector; the second connector starts as the first finishes. */
const HOP = 1.4;

function StageCard({ stage }: { stage: Stage }) {
  const reduceMotion = useReducedMotion();

  const body = (
    <div
      className={cn(
        "h-full rounded-2xl p-6",
        stage.engine ? "bg-white/85 backdrop-blur-xl" : "border border-slate-200/70 bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("grid h-10 w-10 place-items-center rounded-xl", stage.iconClass)}>
          <stage.icon className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="font-semibold leading-tight text-slate-900">{stage.title}</h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {stage.items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex-1 rounded-2xl transition-shadow duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,123,255,0.15)]",
        stage.engine &&
          "bg-gradient-to-r from-[#007BFF]/60 via-[#00A3FF]/50 to-[#22C55E]/60 p-px shadow-[0_0_40px_-12px_rgba(0,163,255,0.35)]",
      )}
    >
      {body}
    </motion.div>
  );
}

function Connector({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();
  const timing = {
    duration: HOP,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatDelay: HOP,
    delay: index * HOP,
  };
  const bead =
    "absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#00A3FF] to-[#22C55E] shadow-[0_0_10px_2px_rgba(0,163,255,0.55)]";

  return (
    <div aria-hidden className="relative flex shrink-0 items-center justify-center">
      {/* Horizontal connector (desktop). */}
      <div className="relative hidden h-2.5 w-14 items-center lg:flex">
        <svg className="h-px w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 1">
          <line x1="0" y1="0.5" x2="100" y2="0.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="stroke-slate-200" strokeWidth="1.5" />
        </svg>
        {reduceMotion ? null : (
          <motion.span
            className={cn(bead, "top-0 -ml-[5px]")}
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={timing}
          />
        )}
      </div>

      {/* Vertical connector (below lg). */}
      <div className="relative flex h-12 w-2.5 justify-center lg:hidden">
        <svg className="h-full w-px overflow-visible" preserveAspectRatio="none" viewBox="0 0 1 100">
          <line x1="0.5" y1="0" x2="0.5" y2="100" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="stroke-slate-200" strokeWidth="1.5" />
        </svg>
        {reduceMotion ? null : (
          <motion.span
            className={cn(bead, "left-0 -mt-[5px]")}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={timing}
          />
        )}
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <section id="infrastructure" className="section border-y border-[#00A3FF]/10 bg-white/60">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="h2">Universal Pipeline Integration</h2>
          <p className="lead mt-4">
            We ingest leads from any source, execute the omnichannel outreach, and seamlessly push
            the structured data directly into your existing systems of record.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-stretch lg:flex-row">
          {STAGES.map((stage, index) => (
            <Fragment key={stage.title}>
              <StageCard stage={stage} />
              {index < STAGES.length - 1 ? <Connector index={index} /> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
