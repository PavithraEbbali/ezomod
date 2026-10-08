import { Bot, Check, Database, UserRound } from "lucide-react";
import VisualFrame from "@/components/visuals/VisualFrame";

const AGENTS = [
  { name: "Intake agent", task: "Reads the new inquiry", pass: "Lead details" },
  { name: "Research agent", task: "Looks up the company", pass: "Company profile" },
  { name: "Writer agent", task: "Drafts a tailored reply", pass: "Draft reply" },
] as const;

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-1 pl-[1.1rem]">
      <svg className="h-6 w-px overflow-visible" viewBox="0 0 1 24" preserveAspectRatio="none">
        <line x1="0.5" y1="0" x2="0.5" y2="24" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-dash motion-reduce:animate-none" />
      </svg>
      <span className="rounded-md border border-[#4F46E5]/20 bg-[#4F46E5]/5 px-1.5 py-0.5 text-[11px] font-medium text-[#4338CA]">passes: {label}</span>
    </div>
  );
}

/** Multi-Agent Workflows: specialised agents handing work along, with a human approval step. */
export default function MultiAgentVisual() {
  return (
    <VisualFrame label="Agent workflow">
      <div>
        {AGENTS.map((agent) => (
          <div key={agent.name}>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#4F46E5]/10 text-[#4338CA]">
                <Bot className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-slate-900">{agent.name}</p>
                <p className="text-xs text-slate-500">{agent.task}</p>
              </div>
              <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={3} />
            </div>
            <Connector label={agent.pass} />
          </div>
        ))}
        <div className="rounded-xl bg-gradient-to-r from-[#4F46E5] via-[#007BFF] to-[#22C55E] p-px">
          <div className="flex flex-wrap items-center gap-3 rounded-[11px] bg-white p-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-900 text-white">
              <UserRound className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-slate-900">Your approval</p>
              <p className="text-xs text-slate-500">A person checks before anything is sent</p>
            </div>
            <span className="flex gap-1.5">
              <span className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700">Edit</span>
              <span className="rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white">Approve</span>
            </span>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Database className="h-3.5 w-3.5 text-[#0062CC]" />
          Every step logged in your CRM
        </p>
      </div>
    </VisualFrame>
  );
}
