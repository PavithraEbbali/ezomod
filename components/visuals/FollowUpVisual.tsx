import { CalendarCheck, Inbox, MessageSquareText, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";
import VisualFrame from "@/components/visuals/VisualFrame";

const WAVE = [0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75];

const STEPS: readonly { time: string; title: string; icon: typeof Inbox; body: ReactNode; done?: boolean }[] = [
  {
    time: "0:00",
    title: "New lead arrives",
    icon: Inbox,
    body: <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-700">Website form · Ad lead · Portal</span>,
  },
  {
    time: "0:28",
    title: "AI calls the lead",
    icon: PhoneCall,
    body: (
      <span className="flex h-4 items-center gap-[2px]">
        {WAVE.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
            className="w-[3px] animate-wave rounded-full bg-gradient-to-b from-[#007BFF] to-[#22C55E] motion-reduce:animate-none"
          />
        ))}
        <span className="ml-2 text-[11px] font-medium text-slate-500">qualifying…</span>
      </span>
    ),
  },
  {
    time: "2:10",
    title: "SMS follow-up sent",
    icon: MessageSquareText,
    body: <span className="block rounded-xl rounded-bl-sm bg-[#EBF5FF] px-2.5 py-1.5 text-xs text-slate-700">Great talking! Here&apos;s the link to confirm your time.</span>,
  },
  {
    time: "4:05",
    title: "Appointment booked",
    icon: CalendarCheck,
    done: true,
    body: <span className="inline-block rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">On your team&apos;s calendar · CRM updated</span>,
  },
];

/** AI Lead Follow-Up: lead arrives → call in under 30s → SMS → booked. */
export default function FollowUpVisual() {
  return (
    <VisualFrame
      label="Speed to lead"
      status={<span className="rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[10px] font-bold text-[#166534]">&lt;30s</span>}
    >
      <ol className="relative">
        {STEPS.map((step, i) => (
          <li key={step.title} style={{ animationDelay: `${0.2 + i * 0.5}s` }} className="rise relative grid grid-cols-[2.75rem_2.25rem_1fr] gap-x-2 pb-4 last:pb-0">
            {i < STEPS.length - 1 ? <span className="absolute bottom-0 left-[3.95rem] top-9 w-px bg-slate-200" /> : null}
            <span className="pt-2 font-mono text-xs text-slate-500">{step.time}</span>
            <span
              className={
                step.done
                  ? "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#007BFF] to-[#22C55E] text-white"
                  : "grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0062CC]"
              }
            >
              <step.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-[13px] font-semibold text-slate-900">{step.title}</p>
              <div className="mt-1.5">{step.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}
