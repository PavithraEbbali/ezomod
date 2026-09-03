"use client";

import {
  Blocks,
  Building2,
  Cloud,
  Facebook,
  Flame,
  Home,
  Layers,
  Megaphone,
  MessageCircle,
  Network,
  PhoneCall,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import MaskedText from "@/components/ui/MaskedText";

interface Integration {
  name: string;
  category: string;
  icon: LucideIcon;
}

const LANE_ONE: Integration[] = [
  { name: "Follow Up Boss", category: "CRM", icon: Flame },
  { name: "Lofty", category: "CRM", icon: Layers },
  { name: "kvCORE", category: "Platform", icon: Building2 },
  { name: "Zillow Premier", category: "Lead source", icon: Home },
  { name: "Salesforce", category: "Enterprise CRM", icon: Cloud },
];

const LANE_TWO: Integration[] = [
  { name: "Twilio", category: "Telephony", icon: PhoneCall },
  { name: "OpenAI", category: "Reasoning", icon: Sparkles },
  { name: "Meta Ads", category: "Lead source", icon: Facebook },
  { name: "Zapier", category: "Automation", icon: Blocks },
  { name: "WhatsApp", category: "Fallback", icon: MessageCircle },
  { name: "Google LSA", category: "Lead source", icon: Megaphone },
];

function Chip({ item }: { item: Integration }) {
  const Icon = item.icon;
  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-2xl border border-[var(--edge)] bg-white/85 px-5 py-3.5 shadow-halo backdrop-blur-xl transition-all duration-500 ease-swift hover:-translate-y-1 hover:border-[var(--edge-strong)] hover:shadow-halo-lg">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-azure transition-all duration-500 group-hover:bg-brand group-hover:text-white">
        <Icon className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap">
        <span className="block text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
          {item.name}
        </span>
        <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-steel-faint">
          {item.category}
        </span>
      </span>
    </div>
  );
}

function Lane({
  items,
  reverse,
  duration,
}: {
  items: Integration[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div
        className={`flex w-max gap-3.5 pr-3.5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <Chip key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsMarquee() {
  return (
    <section id="integrations" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[360px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,163,255,0.10),transparent)] blur-2xl"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="eyebrow">
            <Network className="h-3.5 w-3.5 text-mint" />
            Drops into your stack
          </span>
          <MaskedText
            as="h2"
            className="mt-5 font-display text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
            lines={[
              <>
                Your tools stay. <span className="text-gradient">The chasing goes.</span>
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-steel">
            EZOMOD reads and writes to the systems your brokerage already runs on, so nothing
            gets migrated and nothing gets rebuilt.
          </p>
        </div>
      </div>

      <div className="group relative mt-12 space-y-3.5">
        <Lane items={LANE_ONE} duration="46s" />
        <Lane items={LANE_TWO} reverse duration="54s" />
      </div>
    </section>
  );
}
