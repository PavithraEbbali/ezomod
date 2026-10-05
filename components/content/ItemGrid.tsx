import type { Item } from "@/lib/services";

export default function ItemGrid({ items, columns = 3 }: { items: readonly Item[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item) => (
        <li key={item.title} className="rounded-2xl border border-slate-200/60 bg-white p-6">
          <h3 className="text-lg font-semibold leading-snug text-slate-900">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-slate-600">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
