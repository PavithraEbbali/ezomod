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
    iconTone: "text-[#0062CC]",
    label: "Response in under 30 seconds",
    title: "Every new lead gets a call, text or email",
    text: "When an inquiry arrives from Meta Ads, Google Local Services Ads or your IDX website, the system calls the lead within thirty seconds using a natural AI voice. If they don't answer, it follows up by SMS or WhatsApp.",
    specs: ["Response: under 30 seconds", "Channels: Voice, SMS, WhatsApp", "Availability: 24/7/365"],
  },
  {
    icon: BadgeCheck,
    iconTone: "text-[#0062CC]",
    label: "Qualifies the lead on the call",
    title: "Asks the questions your agents would ask",
    text: "The AI agent has a natural conversation to check budget, financing, move-in timeline and preferred neighbourhoods, and answers local questions about HOA fees, tax rates and recent sales.",
    specs: ["Budget and pre-approval", "Timeline and motivation", "Neighbourhood and HOA questions"],
  },
  {
    icon: DatabaseZap,
    iconTone: "text-[#22C55E]",
    label: "Updates your CRM and books the showing",
    title: "Every detail saved, showings booked",
    text: "The call recording, transcript and the buyer's answers are saved to your existing CRM (Follow Up Boss, Lofty, Salesforce) before the call ends, and private showings are booked straight onto your team's calendar.",
    specs: ["CRM updated automatically", "Call recording and transcript", "Showing booked on your calendar"],
  },
];

export default function OperationalShift() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section bg-slate-50/70">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="h2">What happens when a new lead comes in?</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Every inquiry goes through the same three steps, day or night, so no lead is missed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STANDARDS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,#007BFF_0%,#22C55E_100%)] p-px">
                <span className="grid h-full w-full place-items-center rounded-[11px] bg-gradient-to-br from-[#F0F7FF] to-[#F0FDF4]">
                  <item.icon className={`h-6 w-6 ${item.iconTone}`} aria-hidden />
                </span>
              </span>

              <p className="mt-6 text-sm font-medium text-[#0062CC]">{item.label}</p>
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
