import { Check } from "lucide-react";

export default function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-slate-700">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#22C55E]/10 text-[#16A34A]">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
