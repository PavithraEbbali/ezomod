import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ServiceIcon from "@/components/content/ServiceIcon";
import ServiceMiniVisual from "@/components/visuals/ServiceMiniVisual";
import { SERVICES, servicePath, type Service } from "@/lib/services";

/** `visual` adds a small coded vignette on top of each card (home page). */
export default function ServiceCards({
  services = SERVICES,
  headingLevel = 3,
  columns = 4,
  visual = false,
}: {
  services?: readonly Service[];
  headingLevel?: 2 | 3;
  columns?: 3 | 4;
  visual?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {services.map((service) => (
        <li key={service.slug}>
          <Link href={servicePath(service.slug)} className="card group flex h-full flex-col overflow-hidden">
            {visual ? <ServiceMiniVisual icon={service.icon} /> : null}
            <div className="flex flex-1 flex-col p-6">
              <span className="icon-tile w-fit">
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </span>
              <Heading className="mt-5 text-lg font-semibold leading-snug text-slate-900">{service.name}</Heading>
              <p className={`mt-2 flex-1 text-[15px] leading-relaxed text-slate-700 ${visual ? "line-clamp-3" : ""}`}>{service.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#0062CC]">
                Learn about {service.navLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
