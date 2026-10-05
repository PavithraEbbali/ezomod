
/**
 * FAQ accordion built on <details>, so every answer is in the static HTML and readable
 * without JavaScript. Visible text must match the FAQPage JSON-LD exactly.
 */
export default function FaqList({ faqs, headingLevel = 3 }: { faqs: readonly { q: string; a: string; more?: string }[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-white">
      {faqs.map((faq) => (
        <details key={faq.q} className="group px-5 py-1 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4">
            <Heading className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">{faq.q}</Heading>
            <span
              aria-hidden
              className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#00A3FF]/25 text-[#007BFF] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="space-y-3 pb-5 leading-relaxed text-slate-600">
            <p>{faq.a}</p>
            {faq.more ? <p>{faq.more}</p> : null}
          </div>
        </details>
      ))}
    </div>
  );
}
