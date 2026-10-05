import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/** Static 1200x630 share image in public/. */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Ezomod — AI automation agency for lead generation, AI agents and workflows",
};

interface PageMetaInput {
  /** Full <title>, max 60 characters. Used as-is (no template suffix). */
  title: string;
  /** Meta description, max 155 characters. */
  description: string;
  /** Root-relative path, e.g. "/services/ai-voice-agents". */
  path: string;
  type?: "website" | "article";
}

/**
 * Per-page metadata: unique title and description, canonical URL, Open Graph and Twitter tags.
 * Page-level openGraph replaces the parent's, so the shared OG image is attached explicitly.
 */
export function pageMetadata({ title, description, path, type = "website" }: PageMetaInput): Metadata {
  if (process.env.NODE_ENV !== "production") {
    if (title.length > 60) console.warn(`[seo] title > 60 chars on ${path}: ${title}`);
    if (description.length > 155) console.warn(`[seo] description > 155 chars on ${path}`);
  }
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type, locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
