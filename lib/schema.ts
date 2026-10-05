import type { Post } from "@/lib/blog";
import { OG_IMAGE } from "@/lib/seo";
import { SERVICES, servicePath, type Service } from "@/lib/services";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  SITE_ALT_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

/**
 * JSON-LD builders. Every entity links back to one Organization via @id.
 *
 * Rule: no placeholder values. Fields we don't have real data for (street address, phone,
 * areaServed, extra sameAs profiles) are omitted, not filled with placeholders. See TODO_CONTENT.md.
 */

export type JsonLdObject = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRO_SERVICE_ID = `${SITE_URL}/#professionalservice`;
const LOGO_URL = `${SITE_URL}/logo.png`;

/** Real profile URLs only. Add each new profile (Crunchbase, Clutch, X, ...) here once it exists. */
export const SAME_AS: string[] = [LINKEDIN_URL];

const KNOWS_ABOUT = [
  "AI automation",
  "AI agents",
  "Multi-agent AI systems",
  "Lead generation",
  "Speed to lead",
  "Lead follow-up automation",
  "AI voice agents",
  "CRM automation",
  "Business process automation",
  "AI chatbots",
  "Customer support automation",
  "Website development",
  "Real estate lead management",
];

const FOUNDER = { "@type": "Person", name: "Gowrav K M", jobTitle: "Founder" };
const FOUNDING_DATE = "2026";
/** City-level address only (no street address or phone published). */
const ADDRESS = { "@type": "PostalAddress", addressLocality: "Mysuru", addressRegion: "Karnataka", addressCountry: "IN" };

const ref = (id: string) => ({ "@id": id });

const hasTodo = (text: string) => text.includes("{{TODO");

export function organization(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    image: OG_IMAGE.url,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: SAME_AS,
    knowsAbout: KNOWS_ABOUT,
    founder: FOUNDER,
    foundingDate: FOUNDING_DATE,
    address: ADDRESS,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      url: absoluteUrl("/contact"),
      availableLanguage: ["English"],
    },
  };
}

export function website(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: ref(ORG_ID),
  };
}

export function professionalService(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": PRO_SERVICE_ID,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: SITE_URL,
    image: OG_IMAGE.url,
    logo: LOGO_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    founder: FOUNDER,
    foundingDate: FOUNDING_DATE,
    address: ADDRESS,
    parentOrganization: ref(ORG_ID),
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ezomod services",
      itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: ref(serviceId(s)) })),
    },
  };
}

const serviceId = (s: Service) => `${absoluteUrl(servicePath(s.slug))}#service`;

/** Full Service entity (on its own page). */
export function service(s: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(s),
    name: s.name,
    serviceType: s.primaryKeyword,
    description: s.definition,
    url: absoluteUrl(servicePath(s.slug)),
    provider: ref(ORG_ID),
  };
}

/** Services hub: list of all services. Each item carries name/url so it stands alone. */
export function serviceList(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ezomod services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": serviceId(s),
        name: s.name,
        url: absoluteUrl(servicePath(s.slug)),
        provider: ref(ORG_ID),
      },
    })),
  };
}

type FaqLike = { q: string; a: string; more?: string };

/** Visible answer text exactly as rendered by FaqList (paragraphs joined by a space). */
export const faqAnswerText = (f: FaqLike) => (f.more ? `${f.a} ${f.more}` : f.a);

/**
 * FAQPage from the same data the page renders. Questions whose text still contains a
 * placeholder are left out of the schema (they stay visible on the page until filled).
 */
export function faqPage(faqs: readonly FaqLike[]): JsonLdObject | null {
  const items = faqs.filter((f) => !hasTodo(f.q) && !hasTodo(faqAnswerText(f)));
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(f) },
    })),
  };
}

export type SchemaCrumb = { name: string; path: string };

export function breadcrumbList(crumbs: SchemaCrumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function blogPosting(post: Post, words: number): JsonLdObject {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: OG_IMAGE.url,
    datePublished: post.published,
    dateModified: post.updated,
    inLanguage: "en",
    wordCount: words,
    keywords: post.primaryKeyword,
    author: ref(ORG_ID),
    publisher: ref(ORG_ID),
    isPartOf: ref(WEBSITE_ID),
  };
}
