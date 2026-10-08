import { Bot, UserRound } from "lucide-react";
import VisualFrame from "@/components/visuals/VisualFrame";

const BOT = "max-w-[85%] rounded-2xl rounded-bl-md bg-[#FCE7F3] px-3 py-2 text-[13px] leading-snug text-slate-800";
const USER = "ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-slate-100 px-3 py-2 text-[13px] leading-snug text-slate-700";

/** AI Chatbots: a chat that answers instantly, then hands off to a person. */
export default function ChatbotVisual() {
  return (
    <VisualFrame
      label="Website chat"
      status={
        <span className="relative flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
          <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          Online
        </span>
      }
    >
      <ul className="space-y-2.5">
        <li style={{ animationDelay: "0.2s" }} className="rise flex items-end gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#DB2777]/10 text-[#BE185D]">
            <Bot className="h-4 w-4" />
          </span>
          <span className={BOT}>Hi! Ask me anything about our services or opening hours.</span>
        </li>
        <li style={{ animationDelay: "0.7s" }} className="rise flex">
          <span className={USER}>Do you deliver on weekends?</span>
        </li>
        <li style={{ animationDelay: "1.2s" }} className="rise flex items-end gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#DB2777]/10 text-[#BE185D]">
            <Bot className="h-4 w-4" />
          </span>
          <span className={BOT}>Yes, Saturday and Sunday mornings. Want me to book a slot?</span>
        </li>
        <li style={{ animationDelay: "1.7s" }} className="rise flex">
          <span className={USER}>Actually, can I talk to a person about a bulk order?</span>
        </li>
        <li style={{ animationDelay: "2.2s" }} className="rise flex items-center gap-2 py-1">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white">Handed to your team · full chat attached</span>
          <span className="h-px flex-1 bg-slate-200" />
        </li>
        <li style={{ animationDelay: "2.7s" }} className="rise flex items-end gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#007BFF] to-[#22C55E] text-white">
            <UserRound className="h-4 w-4" />
          </span>
          <span className="max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3 py-2 text-[13px] leading-snug text-slate-800">
            Hi, I&apos;ve read your chat. Let&apos;s sort out that bulk order.
          </span>
        </li>
      </ul>
    </VisualFrame>
  );
}
