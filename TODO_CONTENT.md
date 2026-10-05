# TODO content: real information needed

`{{TODO: ...}}` marks real information that is still missing. Never fill these with made-up details.
`node scripts/check-pages.mjs` (run after `npm run build`) fails if any `{{TODO` is left in the visible HTML or JSON-LD.

**Status: no placeholders remain on the site.** All 16 were filled or removed on 2026-10-05:

- Founder: Gowrav K M, Founder, with his bio.
- Founded: 2026.
- Location: Mysuru, Karnataka, India.
- Team intro sentence added; the second team card was deleted.
- Blog author: Ezomod Team.
- Security FAQ: the placeholder sentence was removed.
- Speed-to-lead article now cites and links the HBR source.

## Structured data (JSON-LD) fields still left out

These fields are deliberately **omitted** until you decide to publish them. Add them in `lib/schema.ts`:

| Field | Schema | Notes |
| --- | --- | --- |
| `areaServed` | Organization, ProfessionalService, Service | Countries/regions you serve, e.g. `["IN", "US"]` or `"Worldwide"`. Left out by request. |
| `streetAddress`, `postalCode` | ProfessionalService / Organization `address` | Only city, region and country are published now. |
| `telephone` | Organization, ProfessionalService | No phone published. |
| `sameAs` | Organization | Only LinkedIn is listed. Add Crunchbase, Clutch, GoodFirms, X, YouTube, Instagram and others to `SAME_AS` as each profile goes live. |

## Confirmed by the owner (2026-10-05)

- Mission statement, principles list, "we work with clients remotely", the real-estate audience list and the process descriptions were approved as written.
- Origin line changed everywhere to "Real estate is where our lead follow-up work is most specialised."
- Tool and integration lists: keep all.
- Healthcare, mortgage and insurance were removed from all industry lists. The voice-agent audience line "Clinics, agencies and service businesses…" became "Agencies and service businesses…".

## Blog

All 3 posts are still `draft: true`. They are built with `noindex`, left out of the sitemap and the blog index in production, and carry no BlogPosting schema. Set `draft: false` in `lib/blog.ts` to publish one.

## Coming in Phase 4

- `{{TODO: booking URL}}` (Cal.com or Calendly).
- Client logos, testimonials and results (hidden until filled).
- GA4 ID and Search Console verification (environment variables).
