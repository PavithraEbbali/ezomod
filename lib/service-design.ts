import {
  AlarmClockOff,
  BarChart3,
  Bell,
  Blocks,
  BookOpen,
  Bot,
  BrainCircuit,
  CalendarCheck,
  CalendarClock,
  Cable,
  ClipboardList,
  Clock,
  Code2,
  Crosshair,
  Database,
  DatabaseZap,
  Eye,
  FileStack,
  FileText,
  Gauge,
  GitBranch,
  Handshake,
  Headset,
  Inbox,
  LayoutTemplate,
  LineChart,
  ListChecks,
  ListFilter,
  Map,
  MessageCircle,
  MessageSquareText,
  MessagesSquare,
  Network,
  PenTool,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Plug,
  RefreshCw,
  Rocket,
  Route,
  ScanSearch,
  ScrollText,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Shuffle,
  Sparkles,
  Split,
  Target,
  Timer,
  TrendingDown,
  UserCheck,
  UserX,
  Users,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Presentation layer for service pages: short punchy headings, a per-service accent and
 * icons for problem / feature cards. All factual copy stays in lib/services-*.ts.
 * Accent classes are written out in full so Tailwind can see them.
 */
export type ServiceDesign = {
  accent: {
    /** Icon circle background + icon colour. */
    tile: string;
    /** Small text / eyebrow colour. */
    text: string;
    /** Soft hero glow. */
    glow: string;
    /** Left border colour for the "Who needs it" card. */
    border: string;
  };
  definitionHeading: string;
  problemsHeading: string;
  /** Must contain the page's primary keyword (SEO: keyword in at least one H2). */
  buildHeading: string;
  stepsHeading: string;
  /** One icon per `problems` item, in order. */
  problemIcons: LucideIcon[];
  /** One icon per `included` item, in order. */
  includedIcons: LucideIcon[];
};

export const SERVICE_DESIGN: Record<string, ServiceDesign> = {
  "ai-lead-generation": {
    accent: {
      tile: "bg-[#007BFF]/10 text-[#0062CC]",
      text: "text-[#0062CC]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(0,123,255,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(34,197,94,0.07),transparent)]",
      border: "border-l-[#007BFF]",
    },
    definitionHeading: "The right prospects, found and contacted for you.",
    problemsHeading: "Stop guessing who to call next.",
    buildHeading: "What goes into your AI lead generation system",
    stepsHeading: "From ideal customer to booked meetings",
    problemIcons: [TrendingDown, Clock, Send, AlarmClockOff],
    includedIcons: [Crosshair, Search, Gauge, MessagesSquare, Inbox, RefreshCw],
  },
  "ai-lead-follow-up": {
    accent: {
      tile: "bg-[#22C55E]/15 text-[#15803D]",
      text: "text-[#15803D]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(34,197,94,0.14),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#22C55E]",
    },
    definitionHeading: "Every lead called in seconds. Never forgotten.",
    problemsHeading: "Fast leads go cold. Yours won't.",
    buildHeading: "Inside your AI lead follow-up system",
    stepsHeading: "Live in four clear steps",
    problemIcons: [Timer, TrendingDown, AlarmClockOff, Database],
    includedIcons: [Zap, PhoneCall, RefreshCw, Users, CalendarCheck, Handshake],
  },
  "ai-voice-agents": {
    accent: {
      tile: "bg-[#6D5BFF]/15 text-[#5B47F0]",
      text: "text-[#5B47F0]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(109,91,255,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#6D5BFF]",
    },
    definitionHeading: "Answers every call. Books the meeting.",
    problemsHeading: "No more voicemail, no more lost callers.",
    buildHeading: "Everything your AI voice agent needs",
    stepsHeading: "From first call script to live agent",
    problemIcons: [PhoneMissed, Timer, ListChecks, FileText],
    includedIcons: [PhoneIncoming, PhoneOutgoing, ScrollText, Settings2, ClipboardList, LineChart],
  },
  "multi-agent-ai-workflows": {
    accent: {
      tile: "bg-[#4F46E5]/10 text-[#4338CA]",
      text: "text-[#4338CA]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(79,70,229,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#4F46E5]",
    },
    definitionHeading: "A team of AI agents. You stay in charge.",
    problemsHeading: "One chatbot can't run a whole process.",
    buildHeading: "How we build multi-agent AI workflows",
    stepsHeading: "From process map to working agent team",
    problemIcons: [Bot, Shuffle, ShieldCheck, Eye],
    includedIcons: [Map, BrainCircuit, Network, Plug, UserCheck, ListChecks],
  },
  "ai-automation": {
    accent: {
      tile: "bg-[#F59E0B]/15 text-[#B45309]",
      text: "text-[#B45309]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(245,158,11,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#F59E0B]",
    },
    definitionHeading: "The busywork, done for you.",
    problemsHeading: "Hours of admin, every single week.",
    buildHeading: "What our AI automation services include",
    stepsHeading: "From manual process to automated flow",
    problemIcons: [ClipboardList, FileStack, GitBranch, BarChart3],
    includedIcons: [ScanSearch, Workflow, FileText, Bell, BarChart3, Wrench],
  },
  "crm-automation": {
    accent: {
      tile: "bg-[#0D9488]/10 text-[#0F766E]",
      text: "text-[#0F766E]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(13,148,136,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#0D9488]",
    },
    definitionHeading: "A CRM that updates itself.",
    problemsHeading: "Your CRM should help, not need babysitting.",
    buildHeading: "What we build with CRM automation",
    stepsHeading: "From messy pipeline to clean, automatic CRM",
    problemIcons: [Inbox, Database, AlarmClockOff, Cable],
    includedIcons: [DatabaseZap, Route, ListChecks, Cable, ListFilter, Blocks],
  },
  "ai-chatbots": {
    accent: {
      tile: "bg-[#DB2777]/10 text-[#BE185D]",
      text: "text-[#BE185D]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(219,39,119,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#DB2777]",
    },
    definitionHeading: "Instant answers. A human when it matters.",
    problemsHeading: "Customers shouldn't wait until Monday.",
    buildHeading: "What goes into AI chatbot development",
    stepsHeading: "From your content to a helpful assistant",
    problemIcons: [MessageCircle, UserX, Clock, Bot],
    includedIcons: [MessageSquareText, MessagesSquare, BookOpen, CalendarClock, Headset, Sparkles],
  },
  "website-development": {
    accent: {
      tile: "bg-[#0891B2]/10 text-[#0E7490]",
      text: "text-[#0E7490]",
      glow: "bg-[radial-gradient(640px_340px_at_85%_20%,rgba(8,145,178,0.13),transparent),radial-gradient(500px_300px_at_10%_0%,rgba(0,123,255,0.07),transparent)]",
      border: "border-l-[#0891B2]",
    },
    definitionHeading: "Fast sites that turn visitors into leads.",
    problemsHeading: "A slow website quietly costs you leads.",
    buildHeading: "What you get from our website development agency",
    stepsHeading: "From plan to launch, and beyond",
    problemIcons: [Gauge, Search, UserX, Split],
    includedIcons: [LayoutTemplate, PenTool, Code2, Target, Plug, Rocket],
  },
};

export function getServiceDesign(slug: string): ServiceDesign | undefined {
  return SERVICE_DESIGN[slug];
}
