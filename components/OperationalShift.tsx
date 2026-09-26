"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BadgeCheck, DatabaseZap, type LucideIcon } from "lucide-react";

type Standard = {
  icon: LucideIcon;
  iconTone: string;
  label: string;
  title: string;
  text: string;
  specs: readonly string[];
};

const STANDARDS: readonly Standard[] = [
  {
    icon: Activity,
    iconTone: "text-[#007BFF]",
    label: "Sub-30-Second Omnichannel Dispatch",
    title: "Instant Multi-Channel Interception",
    text: "When an inquiry arrives from Meta Ads, Google LSA, or your website IDX, the system executes an immediate outbound touchpoint within thirty seconds—dialing via neural voice and deploying SMS/WhatsApp fallbacks if unanswered.",
    specs: ["Speed: < 30s", "Channels: Voice, SMS, WhatsApp", "Availability: 24/7/365"],
  },
  {
    icon: BadgeCheck,
    iconTone: "text-[#007BFF]",
    label: "Conversational 4-Point Qualification",
    title: "Localized Real Estate Due Diligence",
    text: "The agent conducts a natural, human-grade voice conversation to verify purchasing power, financing status, move-in timelines, and target neighborhoods, while answering localized questions regarding HOA fees, tax rates, and recent comps.",
    specs: ["Budget & Pre-Approval", "Timeline & Motivation", "Neighborhood & HOA Context"],
  },
  {
    icon: DatabaseZap,
    iconTone: "text-[#22C55E]",
    label: "Deterministic CRM Sync & Warm Handoff",
    title: "Zero Data Loss & Native Calendar Booking",
    text: "Complete verbatim call audio, conversational transcripts, sentiment scores, and structured buyer parameters are written directly into your existing CRM (Follow Up Boss, Lofty, Salesforce) before the call ends, locking private showings straight onto your team's calendar.",
    specs: ["Instant CRM Telemetry", "Verbatim Audio & Transcript", "Direct Showing Lock-In"],
  },
];

export default function OperationalShift() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section bg-slate-50/70">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="h2">Core Operating Standards</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            The architectural standards our autonomous lead agents follow on every single inquiry.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STANDARDS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,#007BFF_0%,#22C55E_100%)] p-px">
                <span className="grid h-full w-full place-items-center rounded-[11px] bg-gradient-to-br from-[#F0F7FF] to-[#F0FDF4]">
                  <item.icon className={`h-6 w-6 ${item.iconTone}`} aria-hidden />
                </span>
              </span>

              <p className="mt-6 text-sm font-medium text-[#007BFF]">{item.label}</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{item.text}</p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-full bg-[linear-gradient(135deg,rgba(0,123,255,0.45)_0%,rgba(34,197,94,0.45)_100%)] p-px"
                  >
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#007BFF_0%,#22C55E_100%)]"
                      />
                      {spec}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
