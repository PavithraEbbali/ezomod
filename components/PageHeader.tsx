import type { ReactNode } from "react";

export default function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#00A3FF]/10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_15%_0%,rgba(0,123,255,0.08),transparent),radial-gradient(500px_300px_at_85%_100%,rgba(34,197,94,0.08),transparent)]"
      />
      <div className="container-x py-14 sm:py-20">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-5xl">
          {title}
        </h1>
        {children ? <div className="lead mt-5 max-w-2xl">{children}</div> : null}
      </div>
    </header>
  );
}
