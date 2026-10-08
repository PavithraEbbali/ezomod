import { Activity, Clock, Database, Timer, UserCheck, type LucideIcon } from "lucide-react";

/** Only claims already made elsewhere on the site. Do not add numbers that aren't backed up. */
const PROOF: readonly { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Timer, value: "<30s", label: "first response to new leads" },
  { icon: Clock, value: "24/7", label: "calls, texts and follow-up" },
  { icon: Activity, value: "99.9%", label: "uptime, monitored by us" },
  { icon: Database, value: "Your CRM", label: "everything logged where you work" },
  { icon: UserCheck, value: "You approve", label: "your team reviews each stage" },
];

export default function ProofStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-[#00A3FF]/10 bg-white">
      <ul className="container-x grid grid-cols-2 gap-x-6 gap-y-5 py-7 sm:grid-cols-3 lg:grid-cols-5">
        {PROOF.map(({ icon: Icon, value, label }) => (
          <li key={value} className="flex items-center gap-3 last:col-span-2 sm:last:col-span-1">
            <span className="icon-tile shrink-0 p-2.5">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-bold leading-tight text-slate-900">{value}</span>
              <span className="block text-[13px] leading-snug text-slate-600">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
