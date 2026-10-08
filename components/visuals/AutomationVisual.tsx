import { ArrowDown, Check, FileText, Hand, Sparkles } from "lucide-react";
import VisualFrame from "@/components/visuals/VisualFrame";

const MANUAL = ["Open the email attachment", "Copy details into a spreadsheet", "Re-type them into the CRM", "Email the team an update"];
const AUTO = ["Invoice email arrives", "AI reads and extracts the details", "CRM and spreadsheet updated", "Team notified in Slack"];

/** AI Automation: before (manual steps) vs after (one automated flow). */
export default function AutomationVisual() {
  return (
    <VisualFrame label="Before / after">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            <Hand className="h-3.5 w-3.5" />
            Before: by hand
          </p>
          <ol className="mt-3 space-y-2">
            {MANUAL.map((step, i) => (
              <li key={step} className="flex items-start gap-2 text-xs leading-snug text-slate-600">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-[10px] font-bold text-slate-500">{i + 1}</span>
                <span className="pt-0.5 line-through decoration-slate-400/70">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-[#F59E0B]/50 via-[#00A3FF]/40 to-[#22C55E]/50 p-px">
          <div className="h-full rounded-[11px] bg-white p-3">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#B45309]">
              <Sparkles className="h-3.5 w-3.5" />
              After: automated
            </p>
            <ol className="mt-3">
              {AUTO.map((step, i) => (
                <li key={step} style={{ animationDelay: `${0.3 + i * 0.4}s` }} className="rise">
                  <span className="flex items-center gap-2 rounded-lg border border-slate-200/80 px-2 py-1.5 text-xs font-medium text-slate-800">
                    {i === 0 ? <FileText className="h-3.5 w-3.5 text-[#B45309]" /> : <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} />}
                    {step}
                  </span>
                  {i < AUTO.length - 1 ? <ArrowDown className="mx-auto my-0.5 h-3 w-3 text-slate-400" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
