import { Sparkles } from "lucide-react";
import VisualFrame from "@/components/visuals/VisualFrame";

const PROSPECTS = [
  { initials: "DC", name: "Dental clinic group", meta: "4 locations · decision maker found", score: 94, why: ["Hiring front-desk staff", "Matches your ICP"] },
  { initials: "PM", name: "Property management firm", meta: "38 staff · uses a legacy CRM", score: 88, why: ["Growing portfolio", "Visited pricing page"] },
  { initials: "AF", name: "Accounting practice", meta: "12 staff · owner-led", score: 71, why: ["Right size", "Seasonal demand"] },
] as const;

/** AI Lead Generation: a scored prospect list with "why this lead" tags. */
export default function LeadGenVisual() {
  return (
    <VisualFrame label="Prospect list">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">This week&apos;s best-fit prospects</p>
        <span className="flex items-center gap-1 rounded-full bg-[#007BFF]/10 px-2 py-0.5 text-[11px] font-semibold text-[#0062CC]">
          <Sparkles className="h-3 w-3" />
          AI scored
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {PROSPECTS.map((p, i) => (
          <li key={p.name} style={{ animationDelay: `${0.2 + i * 0.4}s` }} className="rise rounded-xl border border-slate-200/80 p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{p.initials}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-slate-900">{p.name}</p>
                <p className="truncate text-xs text-slate-500">{p.meta}</p>
              </div>
              <span
                className={
                  p.score >= 85
                    ? "grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-[#22C55E] text-xs font-bold text-[#166534]"
                    : "grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-[#00A3FF]/60 text-xs font-bold text-[#0062CC]"
                }
              >
                {p.score}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Why this lead</span>
              {p.why.map((tag) => (
                <span key={tag} className="rounded-md bg-[#EBF5FF] px-1.5 py-0.5 text-[11px] font-medium text-[#0062CC]">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
