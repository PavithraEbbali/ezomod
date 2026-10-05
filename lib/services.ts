import { SERVICES_A } from "@/lib/services-a";
import { SERVICES_B } from "@/lib/services-b";

export type Faq = { q: string; a: string };
export type Item = { title: string; text: string };

export type ServiceIcon =
  | "target"
  | "zap"
  | "phone"
  | "network"
  | "workflow"
  | "database"
  | "message"
  | "globe";

export type Service = {
  slug: string;
  /** Full service name, used in cards, breadcrumbs and schema. */
  name: string;
  /** Shorter label for menus. */
  navLabel: string;
  icon: ServiceIcon;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** One or two sentences for cards on the home page and services hub. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Question used as the first H2, e.g. "What is AI lead generation?" */
  definitionQuestion: string;
  /** One-sentence plain definition, shown first. */
  definition: string;
  intro: string[];
  whoFor: string[];
  problems: Item[];
  included: Item[];
  steps: Item[];
  tools: string[];
  toolsNote: string;
  industries: string[];
  faqs: Faq[];
  related: string[];
};

export const SERVICES: readonly Service[] = [...SERVICES_A, ...SERVICES_B];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}
