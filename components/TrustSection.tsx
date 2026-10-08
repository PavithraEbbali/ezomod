import Image from "next/image";
import { CLIENT_LOGOS, RESULTS, TESTIMONIALS } from "@/lib/trust";

/** Client logos, results and testimonials. Renders nothing until real entries exist in lib/trust.ts. */
export default function TrustSection() {
  if (CLIENT_LOGOS.length + RESULTS.length + TESTIMONIALS.length === 0) return null;
  return (
    <section className="section bg-tint">
      <div className="container-x">
        <h2 className="h2">What do Ezomod clients say?</h2>
        {CLIENT_LOGOS.length > 0 ? (
          <ul className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            {CLIENT_LOGOS.map((logo) => (
              <li key={logo.name}>
                <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} loading="lazy" className="h-10 w-auto opacity-80 grayscale" />
              </li>
            ))}
          </ul>
        ) : null}
        {RESULTS.length > 0 ? (
          <dl className="mt-10 grid gap-5 sm:grid-cols-3">
            {RESULTS.map((r) => (
              <div key={r.label} className="rounded-2xl border border-slate-200/80 bg-white p-6">
                <dt className="text-sm text-slate-600">{r.label}</dt>
                <dd className="mt-2 font-display text-3xl font-semibold text-slate-900">{r.value}</dd>
                <dd className="mt-1 text-xs text-slate-500">{r.source}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {TESTIMONIALS.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <li key={t.name}>
                <figure className="h-full rounded-2xl border border-slate-200/80 bg-white p-6">
                  <blockquote className="leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-slate-900">{t.name}</span>, <span className="text-slate-600">{t.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
