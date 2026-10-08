import { Check, Gauge, Lock, Search, Smartphone } from "lucide-react";

const BADGES = [
  { icon: Gauge, label: "Fast loading" },
  { icon: Search, label: "SEO-ready" },
  { icon: Smartphone, label: "Mobile-friendly" },
] as const;

/** Website Development: a browser mockup with speed / SEO badges and a lead arriving. */
export default function WebsiteVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-lg pb-6 lg:max-w-none">
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_24px_48px_-20px_rgba(0,30,70,0.18)]">
        <div className="flex h-10 items-center gap-3 border-b border-slate-200/60 px-3">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
          </span>
          <span className="flex flex-1 items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600">
            <Lock className="h-3 w-3 text-[#16A34A]" />
            yourbusiness.com
          </span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="block h-2 w-16 rounded-full bg-[#0891B2]/40" />
            <span className="mt-3 block h-4 w-full rounded bg-slate-800" />
            <span className="mt-2 block h-4 w-3/4 rounded bg-slate-800" />
            <span className="mt-3 block h-2 w-full rounded-full bg-slate-200" />
            <span className="mt-1.5 block h-2 w-5/6 rounded-full bg-slate-200" />
            <span className="mt-4 inline-block rounded-lg bg-gradient-to-r from-[#007BFF] to-[#22C55E] px-3 py-1.5 text-xs font-semibold text-white">Book a call</span>
          </div>
          <div className="hidden rounded-xl bg-gradient-to-br from-[#0891B2]/15 to-[#22C55E]/15 sm:block" />
        </div>
        <ul className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4">
          {BADGES.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              style={{ animationDelay: `${0.3 + i * 0.35}s` }}
              className="rise flex items-center gap-1.5 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-2.5 py-1 text-xs font-semibold text-[#166534]"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{ animationDelay: "1.6s" }}
        className="rise absolute -bottom-1 right-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-lg"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#22C55E] text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        New enquiry sent to your CRM
      </div>
    </div>
  );
}
