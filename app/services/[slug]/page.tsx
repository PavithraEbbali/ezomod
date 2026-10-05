import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/content/ServicePage";
import Integrations from "@/components/Integrations";
import Services from "@/components/Services";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, getService, servicePath } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: servicePath(service.slug),
  });
}

export default async function Page({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  // The original real-estate lead follow-up sections live on this service page.
  const extra =
    service.slug === "ai-lead-follow-up" ? (
      <>
        <Services />
        <Integrations />
      </>
    ) : undefined;

  return <ServicePage service={service} extra={extra} />;
}
