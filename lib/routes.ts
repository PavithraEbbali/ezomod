import { POSTS } from "@/lib/blog";
import { SERVICES, servicePath } from "@/lib/services";

type Route = { path: string; lastModified: string; priority: number };

/** Date of the last meaningful content update to the static pages. */
const SITE_UPDATED = "2026-10-05";

/**
 * Every indexable page; the sitemap is generated from this list. Draft blog posts are
 * excluded (they are built with noindex for review only).
 */
export const INDEXABLE_ROUTES: readonly Route[] = [
  { path: "/", lastModified: SITE_UPDATED, priority: 1 },
  { path: "/services", lastModified: SITE_UPDATED, priority: 0.9 },
  ...SERVICES.map((s) => ({ path: servicePath(s.slug), lastModified: SITE_UPDATED, priority: 0.9 })),
  { path: "/industries/real-estate", lastModified: SITE_UPDATED, priority: 0.8 },
  { path: "/about", lastModified: SITE_UPDATED, priority: 0.7 },
  { path: "/faq", lastModified: SITE_UPDATED, priority: 0.7 },
  { path: "/contact", lastModified: SITE_UPDATED, priority: 0.8 },
  { path: "/blog", lastModified: SITE_UPDATED, priority: 0.6 },
  ...POSTS.filter((p) => !p.draft).map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.updated, priority: 0.6 })),
  { path: "/privacy", lastModified: SITE_UPDATED, priority: 0.3 },
  { path: "/terms", lastModified: SITE_UPDATED, priority: 0.3 },
];
