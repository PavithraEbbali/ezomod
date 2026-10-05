import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Crumb = { name: string; path?: string };

/** Visible breadcrumb trail. "Home" is prepended automatically; the last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${crumb.name}-${index}`} className="flex items-center gap-1">
              {crumb.path && !last ? (
                <Link href={crumb.path} className="rounded px-0.5 transition-colors hover:text-[#007BFF]">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-slate-700" : undefined}>
                  {crumb.name}
                </span>
              )}
              {last ? null : <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
