import type { ReactNode } from "react";

/** Window chrome shared by every coded service visual (matches the hero "live execution" card). */
export default function VisualFrame({ label, status, children }: { label: string; status?: ReactNode; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_24px_48px_-20px_rgba(0,30,70,0.18)]"
    >
      <div className="relative flex h-9 items-center justify-between border-b border-slate-200/60 px-3">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
        </span>
        <span className="absolute inset-x-0 text-center font-mono text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
        {status}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
