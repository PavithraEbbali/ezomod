import {
  ClipboardList,
  FileText,
  LineChart,
  ListChecks,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  ScrollText,
  Settings2,
  Timer,
  type LucideIcon,
} from "lucide-react";

/**
 * Presentation layer for service pages: short punchy headings, a per-service accent and
 * icons for problem / feature cards. All factual copy stays in lib/services-*.ts.
 * Accent classes are written out in full so Tailwind can see them.
 */
export type ServiceDesign = {
  accent: {
    /** Icon tile background + icon colour. */
    tile: string;
    /** Small text / eyebrow colour. */
    text: string;
    /** Soft hero glow. */
    glow: string;
  };
  definitionHeading: string;
  problemsHeading: string;
  buildHeading: string;
  stepsHeading: string;
  /** One icon per `problems` item, in order. */
  problemIcons: LucideIcon[];
  /** One icon per `included` item, in order. */
  includedIcons: LucideIcon[];
};

export const SERVICE_DESIGN: Record<string, ServiceDesign> = {
  "ai-voice-agents": {
    accent: {
      tile: "bg-gradient-to-br from-[#6D5BFF]/15 to-[#00A3FF]/15 text-[#5B47F0]",
      text: "text-[#5B47F0]",
      glow: "bg-[radial-gradient(600px_320px_at_85%_20%,rgba(109,91,255,0.12),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.08),transparent)]",
    },
    definitionHeading: "Answers every call. Books the meeting.",
    problemsHeading: "No more voicemail, no more lost callers.",
    buildHeading: "Everything your AI voice agent needs",
    stepsHeading: "From first call script to live agent",
    problemIcons: [PhoneMissed, Timer, ListChecks, FileText],
    includedIcons: [PhoneIncoming, PhoneOutgoing, ScrollText, Settings2, ClipboardList, LineChart],
  },
};

export function getServiceDesign(slug: string): ServiceDesign | undefined {
  return SERVICE_DESIGN[slug];
}
