/**
 * Every indexable page. The sitemap is generated from this list, so add new routes here.
 * `lastModified` is an ISO date; update it when a page's content meaningfully changes.
 */
export const INDEXABLE_ROUTES: readonly { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-10-05", priority: 1 },
  { path: "/privacy", lastModified: "2026-10-05", priority: 0.3 },
  { path: "/terms", lastModified: "2026-10-05", priority: 0.3 },
];
