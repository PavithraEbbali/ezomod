import { CalendarCheck, Sparkles } from "lucide-react";
import VisualFrame from "@/components/visuals/VisualFrame";

const FIELDS = [
  { label: "Source", value: "Website form" },
  { label: "Owner", value: "Assigned by round robin" },
  { label: "Stage", value: "Qualified" },
] as const;

function Auto() {
  return (
    <span className="ml-auto flex items-center gap-0.5 rounded bg-[#0D9488]/10 px-1 text-[10px] font-semibold text-[#0F766E]">
      <Sparkles className="h-2.5 w-2.5" />
      auto
    </span>
  );
}

/** CRM Automation: a contact record filling itself in (fields, tags, notes, appointment). */
export default function CrmVisual() {
  return (
    <VisualFrame label="CRM contact record">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#00A3FF] text-sm font-bold text-white">NL</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">New lead</p>
          <p className="text-xs text-slate-500">Created 2 minutes ago</p>
        </div>
        <span className="rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[11px] font-semibold text-[#166534]">Synced</span>
      </div>

      <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200/80">
        {FIELDS.map((f, i) => (
          <div key={f.label} style={{ animationDelay: `${0.2 + i * 0.35}s` }} className="rise flex items-center gap-3 px-3 py-2">
            <dt className="w-16 shrink-0 text-xs text-slate-500">{f.label}</dt>
            <dd className="text-[13px] font-medium text-slate-800">{f.value}</dd>
            <Auto />
          </div>
        ))}
      </dl>

      <div style={{ animationDelay: "1.3s" }} className="rise mt-3 flex flex-wrap gap-1.5">
        {["Hot lead", "Buyer", "Pre-approved"].map((tag) => (
          <span key={tag} className="rounded-md bg-[#0D9488]/10 px-2 py-0.5 text-[11px] font-semibold text-[#0F766E]">
            {tag}
          </span>
        ))}
      </div>

      <div style={{ animationDelay: "1.7s" }} className="rise mt-3 rounded-xl bg-slate-50 p-3">
        <p className="flex items-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Call notes
          <Auto />
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">Looking to move within 60 days. Prefers evening calls. Asked about financing options.</p>
      </div>

      <div style={{ animationDelay: "2.1s" }} className="rise mt-3 flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white">
        <CalendarCheck className="h-4 w-4 text-[#22C55E]" />
        Appointment: Thu 4:00 pm, added to calendar
      </div>
    </VisualFrame>
  );
}
