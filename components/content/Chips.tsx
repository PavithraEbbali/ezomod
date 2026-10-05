export default function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-[linear-gradient(135deg,rgba(0,123,255,0.45)_0%,rgba(34,197,94,0.45)_100%)] p-px">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#007BFF_0%,#22C55E_100%)]" />
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
