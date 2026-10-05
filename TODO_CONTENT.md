# TODO content: real information needed

Every `{{TODO: ...}}` placeholder on the site is listed here. Replace each one with real, accurate information (or delete the line it sits on) before going live. Never fill these with made-up details.

Search the code for `{{TODO` to find them all.

## Company facts

| Placeholder | Where | What to provide |
| --- | --- | --- |
| `{{TODO: founder name}}` | `app/about/page.tsx`: team card and "Ezomod at a glance" | Full name of the founder(s) |
| `{{TODO: role, e.g. Founder}}` | `app/about/page.tsx`: team card | Founder's job title |
| `{{TODO: team member name}}` / `{{TODO: role}}` | `app/about/page.tsx`: team card | Other team members you want listed, or delete the second card |
| `{{TODO: one or two sentences about background}}` | `app/about/page.tsx`: team cards | Short, true bio for each person |
| `{{TODO: one sentence about the team...}}` | `app/about/page.tsx`: "Who is on the Ezomod team?" | e.g. team size, background, where the team works |
| `{{TODO: year founded}}` | `app/about/page.tsx`: "Ezomod at a glance" | Year Ezomod was founded |
| `{{TODO: city, country}}` | `app/about/page.tsx` and `lib/faq.ts` ("Where is Ezomod based?") | Where the company is based |

## Trust and security

| Placeholder | Where | What to provide |
| --- | --- | --- |
| `{{TODO: add any specific security practices or certifications}}` | `lib/faq.ts`: "How does Ezomod handle data security?" | Real practices only (e.g. encryption, access policies, NDAs, any certifications). Delete the placeholder if there is nothing to add. |

## Blog

| Placeholder | Where | What to provide |
| --- | --- | --- |
| `{{TODO: author name}}` | `lib/blog.ts`: all 3 draft posts | Name of the author for each article |
| `{{TODO: verify and add a link to the source you want to cite}}` | `lib/blog.ts`: "Speed to Lead" article | Check the Harvard Business Review article "The Short Life of Online Sales Leads" (or another source), confirm it says what the paragraph says, and add a link. Otherwise remove the sentence. |

All 3 blog posts are `draft: true`. They are built with `noindex`, left out of the sitemap and hidden from the blog index in production. Set `draft: false` once reviewed.

## Please review (written by Claude, not placeholders)

These aren't invented facts, but please confirm they match how you describe Ezomod:

- **Mission statement** on `/about` ("make AI genuinely useful for everyday businesses...").
- **"Real estate is where Ezomod started"** on `/industries/real-estate` and `/about`. This is based on the original site being real-estate only.
- **Tools and integrations lists** on each service page (`lib/services-a.ts`, `lib/services-b.ts`). They are phrased as "works with / can connect to". Remove any you would not want to offer.
- **Industries lists** on each service page and the home page.

## Coming in later phases

- Phase 3: Organization schema `sameAs` (other social profiles), `areaServed`, `founder`, address and phone for ProfessionalService.
- Phase 4: `{{TODO: booking URL}}` (Cal.com or Calendly), client logos, testimonials and results (hidden until filled), and the GA4 ID.
