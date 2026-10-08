import { CalendarCheck, Check, PhoneIncoming } from "lucide-react";
import VisualFrame from "@/components/visuals/VisualFrame";

/** Bar heights for the live waveform (fractions of the track height). */
const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.85, 0.55, 0.95, 0.7, 0.45, 0.8, 0.6, 0.35, 0.7, 0.9, 0.5, 0.65, 0.4, 0.75];

const LINES = [
  { who: "ai", text: "Thanks for calling! How can I help today?" },
  { who: "caller", text: "I'd like a quote for a kitchen remodel." },
  { who: "ai", text: "Happy to help. Does Thursday at 4 pm work for a free visit?" },
  { who: "caller", text: "Thursday works." },
] as const;

/** AI Voice Agents: a live call card with waveform, transcript and the booked outcome. */
export default function VoiceAgentVisual() {
  return (
    <VisualFrame
      label="Inbound call"
      status={
        <span className="relative flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
          <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          Live
        </span>
      }
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#6D5BFF] to-[#00A3FF] text-white">
          <PhoneIncoming className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">New caller</p>
          <p className="text-xs text-slate-500">AI receptionist answering · 00:42</p>
        </div>
      </div>

      <div className="mt-4 flex h-10 items-center gap-[3px] rounded-xl bg-slate-50 px-3">
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h * 100}%`, animationDelay: `${(i % 7) * 0.12}s` }}
            className="w-full flex-1 animate-wave rounded-full bg-gradient-to-b from-[#6D5BFF] to-[#00A3FF] motion-reduce:animate-none"
          />
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {LINES.map((line, i) => (
          <li
            key={line.text}
            style={{ animationDelay: `${0.3 + i * 0.6}s` }}
            className={`rise flex ${line.who === "ai" ? "justify-start" : "justify-end"}`}
          >
            <span
              className={
                line.who === "ai"
                  ? "max-w-[85%] rounded-2xl rounded-bl-md bg-[#F1EFFF] px-3 py-2 text-[13px] leading-snug text-slate-800"
                  : "max-w-[85%] rounded-2xl rounded-br-md bg-slate-100 px-3 py-2 text-[13px] leading-snug text-slate-700"
              }
            >
              {line.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white">
          <CalendarCheck className="h-3.5 w-3.5 text-[#22C55E]" />
          Visit booked · Thu 4:00 pm
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700">
          <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} />
          Transcript saved to CRM
        </span>
      </div>
    </VisualFrame>
  );
}
