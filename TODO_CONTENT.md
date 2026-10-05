# TODO content: real information needed

`{{TODO: ...}}` marks real information that is still missing. Never fill these with made-up details.
`node scripts/check-pages.mjs` (run after `npm run build`) fails if any `{{TODO` is left in the visible HTML or JSON-LD.

**Status: no placeholders remain on the site.** Last verified on 2026-10-05 with a full build and `check-pages.mjs` (21 pages, 952 links, 0 problems). All 16 were filled or removed on 2026-10-05:

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

## Configuration still needed (Phase 4)

These live only in environment variables, never in the code or the rendered pages. Setup steps are in `OFF_SITE_CHECKLIST.md`, Part A.

| Setting | Where | Effect while missing |
| --- | --- | --- |
| `NEXT_PUBLIC_CAL_LINK` (Cal.com booking URL) | Cloudflare Pages env | No calendar; the Contact page shows the form and email link |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Cloudflare Pages env (secret) | The form shows "temporarily unavailable" plus the email fallback |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Pages env | Spam protection relies on the honeypot only |
| `NEXT_PUBLIC_GA4_ID` | Cloudflare Pages env | No analytics loaded |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Cloudflare Pages env | No verification meta tag |

## Social proof (hidden until filled)

`lib/trust.ts` holds three empty lists: `CLIENT_LOGOS`, `TESTIMONIALS` and `RESULTS`. The trust section on the home page stays hidden until you add real entries, used with each client's permission.

## Before launch: what's left

1. Set the environment variables (table above) in Cloudflare Pages. See `OFF_SITE_CHECKLIST.md`, Part A.
2. Review the 3 draft blog posts and publish them (`draft: false`) or keep them as drafts.
3. Optional: add `areaServed` and extra `sameAs` profiles to `lib/schema.ts` as they become available (`OFF_SITE_CHECKLIST.md`, Part D2).
4. Optional: add real client logos, testimonials and results to `lib/trust.ts`, with permission.
