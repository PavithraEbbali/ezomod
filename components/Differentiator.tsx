"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

function CrmRecordMicroUI() {
  return (
    <>
      <div className="w-40 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-16 rounded-full bg-slate-200" />
        </div>
        <span className="mt-2.5 block h-1.5 w-full rounded-full bg-slate-100" />
        <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-slate-100" />
      </div>
      <span className="absolute bottom-3 right-4 rounded-full bg-gradient-to-r from-[#007BFF] to-[#22C55E] p-px shadow-sm shadow-[#0080FF]/20">
        <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700">
          <Check className="h-3 w-3 text-[#22C55E]" strokeWidth={3} />
          Native CRM Sync
        </span>
      </span>
    </>
  );
}

function WorkflowMicroUI() {
  return (
    <div className="relative flex w-48 items-center justify-between">
      <svg className="absolute inset-x-2 top-1/2 h-2 w-[calc(100%-1rem)] -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line x1="0" y1="1" x2="100" y2="1" stroke="#E2E8F0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="url(#workflow-line)"
          strokeWidth="2"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
          className="animate-dash motion-reduce:animate-none"
        />
        <defs>
          <linearGradient id="workflow-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#007BFF" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
      </svg>
      <span className="relative h-4 w-4 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
      <span className="relative h-4 w-4 rounded-full border-2 border-white bg-[#007BFF] shadow-sm shadow-[#007BFF]/30" />
      <span className="relative h-4 w-4 rounded-full border-2 border-white bg-[#22C55E] shadow-sm shadow-[#22C55E]/30" />
    </div>
  );
}

function HealthMicroUI() {
  return (
    <>
      <svg className="h-14 w-48 overflow-visible" viewBox="0 0 192 56">
        <defs>
          <linearGradient id="health-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 40 C 24 36, 36 44, 60 34 S 100 22, 124 26 S 164 12, 184 10 L 184 56 L 0 56 Z"
          fill="url(#health-fill)"
        />
        <path
          d="M0 40 C 24 36, 36 44, 60 34 S 100 22, 124 26 S 164 12, 184 10"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="184" cy="10" r="7" fill="#22C55E" opacity="0.25" className="origin-[184px_10px] animate-ping motion-reduce:animate-none" />
        <circle cx="184" cy="10" r="3.5" fill="#22C55E" />
      </svg>
      <span className="absolute right-3 top-3 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
        99.9% Uptime
      </span>
    </>
  );
}

const PILLARS: readonly { title: string; text: string; visual: ReactNode }[] = [
  {
    title: "No new dashboard",
    text: "Everything runs inside the CRM your team already uses. Notes, tags, recordings, and appointments land on the contact record.",
    visual: <CrmRecordMicroUI />,
  },
  {
    title: "Built for your process",
    text: "We map your lead sources, pipeline stages, and handoff rules first, then build around them instead of forcing a template.",
    visual: <WorkflowMicroUI />,
  },
  {
    title: "We maintain it",
    text: "We monitor, adjust, and improve the system after launch. You don't need an in-house operator to keep it running.",
    visual: <HealthMicroUI />,
  },
];

export default function Differentiator() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section border-y border-[#00A3FF]/10 bg-white/60">
      <div className="container-x">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Not another tool for your team to manage.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            We don&apos;t sell you another software subscription to manage. We build custom
            autonomous infrastructure that lives entirely inside your existing CRM, handling
            calls, texts, and emails so your team doesn&apos;t have to.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,123,255,0.12)]"
            >
              <div
                aria-hidden
                className="relative mb-5 flex h-24 items-center justify-center overflow-hidden rounded-t-xl border-b border-slate-100 bg-slate-50/50"
              >
                {pillar.visual}
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
