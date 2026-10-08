import { Bot, Check, Globe, MessageSquare, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import type { ServiceIcon } from "@/lib/services";

const PILL = "rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-700";

function LeadGen() {
  return (
    <div className="w-44 space-y-1.5">
      {[92, 87, 74].map((score, i) => (
        <div key={score} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5">
          <span className="h-4 w-4 rounded-full bg-slate-200" />
          <span className="h-1.5 flex-1 rounded-full bg-slate-100" style={{ maxWidth: `${70 - i * 12}%` }} />
          <span className={i === 0 ? "rounded bg-[#22C55E]/15 px-1 text-[10px] font-bold text-[#166534]" : "rounded bg-slate-100 px-1 text-[10px] font-bold text-slate-600"}>
            {score}
          </span>
        </div>
      ))}
    </div>
  );
}

function FollowUp() {
  const steps = ["Lead", "30s call", "SMS", "Booked"];
  return (
    <ol className="flex items-center gap-1">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1">
          <span className={i === steps.length - 1 ? "rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white" : PILL}>{step}</span>
          {i < steps.length - 1 ? <span className="h-px w-2.5 bg-[#00A3FF]" /> : null}
        </li>
      ))}
    </ol>
  );
}

function Voice() {
  const bars = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.9, 0.65, 0.35, 0.75, 0.55, 0.95, 0.45, 0.7];
  return (
    <div className="flex h-10 w-44 items-center gap-[3px]">
      {bars.map((h, i) => (
        <span key={i} style={{ height: `${h * 100}%` }} className="flex-1 rounded-full bg-gradient-to-b from-[#6D5BFF] to-[#00A3FF]" />
      ))}
    </div>
  );
}

function MultiAgent() {
  return (
    <div className="flex items-center gap-1.5">
      {["Research", "Draft"].map((name) => (
        <span key={name} className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-semibold text-slate-700">
            <Bot className="h-3 w-3 text-[#007BFF]" />
            {name}
          </span>
          <span className="h-px w-2 bg-[#00A3FF]" />
        </span>
      ))}
      <span className="flex items-center gap-1 rounded-lg bg-slate-900 px-1.5 py-1 text-[10px] font-semibold text-white">
        <UserRound className="h-3 w-3 text-[#22C55E]" />
        Approve
      </span>
    </div>
  );
}

function Automation() {
  return (
    <div className="flex items-center gap-3">
      <div className="space-y-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-1.5 w-12 rounded-full bg-slate-200" />
        ))}
      </div>
      <span className="text-sm font-bold text-[#007BFF]">→</span>
      <span className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#007BFF] to-[#22C55E] px-2 py-1 text-[10px] font-semibold text-white">
        <Check className="h-3 w-3" strokeWidth={3} />
        Done automatically
      </span>
    </div>
  );
}

function Crm() {
  return (
    <div className="w-44 rounded-lg border border-slate-200 bg-white p-2">
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#007BFF]/30 to-[#22C55E]/30" />
        <span className="h-1.5 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="mt-2 flex gap-1">
        <span className="rounded bg-[#007BFF]/10 px-1 text-[10px] font-semibold text-[#0062CC]">Hot lead</span>
        <span className="rounded bg-[#22C55E]/15 px-1 text-[10px] font-semibold text-[#166534]">Booked</span>
      </div>
      <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-slate-100" />
    </div>
  );
}

function Chat() {
  return (
    <div className="w-44 space-y-1.5">
      <span className="flex w-fit items-center gap-1 rounded-xl rounded-bl-sm bg-[#EBF5FF] px-2 py-1 text-[10px] font-medium text-slate-700">
        <MessageSquare className="h-3 w-3 text-[#007BFF]" />
        How can I help?
      </span>
      <span className="ml-auto block w-fit rounded-xl rounded-br-sm bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">Talk to a person</span>
      <span className="flex w-fit items-center gap-1 rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
        <UserRound className="h-3 w-3 text-[#22C55E]" />
        Handed to your team
      </span>
    </div>
  );
}

function Website() {
  return (
    <div className="w-44 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center gap-1 border-b border-slate-100 px-2 py-1">
        <Globe className="h-3 w-3 text-slate-500" />
        <span className="h-1.5 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="space-y-1">
          <span className="block h-1.5 w-14 rounded-full bg-slate-200" />
          <span className="block h-1.5 w-10 rounded-full bg-slate-100" />
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full border-[3px] border-[#22C55E] text-[10px] font-bold text-[#166534]">SEO</span>
      </div>
    </div>
  );
}

const VISUALS: Record<ServiceIcon, () => ReactNode> = {
  target: LeadGen,
  zap: FollowUp,
  phone: Voice,
  network: MultiAgent,
  workflow: Automation,
  database: Crm,
  message: Chat,
  globe: Website,
};

/** Small static vignette for a service card, keyed by the service icon (no animation, to keep list pages light). */
export default function ServiceMiniVisual({ icon }: { icon: ServiceIcon }) {
  const Visual = VISUALS[icon];
  return (
    <div aria-hidden className="flex h-28 items-center justify-center overflow-hidden rounded-t-2xl border-b border-slate-100 bg-gradient-to-br from-[#F2F8FF] to-[#F2FBF5]">
      <Visual />
    </div>
  );
}
