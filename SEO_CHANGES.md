# SEO changes: summary

All work is on the `seo-overhaul` branch (5 phases, one commit per phase plus a content fill-in). Nothing deploys until it is merged into `main`. See `OFF_SITE_CHECKLIST.md`, Part B.

## Before → after

| | Before | After |
| --- | --- | --- |
| Pages | 1 page (`/`) + privacy + terms | 21 pages: home, services hub, 8 service pages, real estate, about, FAQ, contact, blog + 3 drafts, privacy, terms, 404 |
| Positioning | Real-estate lead management only | AI automation agency (8 services), with real estate as the lead follow-up specialisation |
| Canonical domain | `ezomod.vercel.app` in metadata | `https://www.ezomod.com` everywhere |
| Titles / descriptions | One sitewide set | Unique per page (≤60 / ≤155 characters) |
| Canonical tags | None | On every indexable page, no trailing slash |
| Share image | 512×512 logo | 1200×630 `og-image.png` with width, height and alt |
| robots.txt / sitemap | None | robots.txt explicitly allows 9 AI crawlers; sitemap.xml lists 17 pages with lastmod |
| llms.txt | None | Plain-text summary for AI tools |
| Structured data | None | Organization, WebSite, ProfessionalService, Service, ItemList, FAQPage, BreadcrumbList, BlogPosting, all linked to one Organization `@id` |
| Headings | Jargon ("Outbound Neural Dial", "Deterministic CRM Sync") | Plain English, question-style ("What does an AI voice agent do?") |
| Hidden text | 17 elements started at `opacity:0` in the HTML | None; animations only move or scale |
| Booking | `mailto:` link only | Cal.com embed (when configured) + contact form (Pages Function → Resend, Turnstile, honeypot) + email fallback |
| Analytics | None | GA4 (env var) with `booking_click` and `generate_lead` events; Search Console meta tag (env var) |
| Lighthouse (mobile) | not measured | Performance 92–93, Accessibility 100, Best Practices 100, SEO 100 |

## Phase 1: Technical foundation

- `metadataBase` is `https://www.ezomod.com`; all `ezomod.vercel.app` references removed.
- `lib/seo.ts` `pageMetadata()` gives each page its own title, description, canonical, Open Graph and Twitter tags. The meta keywords tag was removed.
- `public/og-image.png` (1200×630), favicon.ico, icon.png, apple-icon.png, 192/512 icons and a web manifest (`scripts/generate-icons.mjs`).
- `app/sitemap.ts` (generated from `lib/routes.ts`) and `app/robots.ts`. robots.txt allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot.
- `public/llms.txt`, `public/_redirects` (alias URLs → real pages), `public/_headers` (security and caching headers).
- Custom 404 page with links to the main pages. One H1 per page; semantic header, nav, main and footer.
- Unused `gsap` and `lenis` removed; logo file renamed without a space; logo link has `aria-label="Ezomod home"`; body text says "Ezomod".

## Phase 2: Structure and content

- Data-driven content: `lib/services-a.ts`, `lib/services-b.ts` (8 services), `lib/faq.ts` (23 questions), `lib/blog.ts` (3 drafts), `lib/company.ts`.
- Shared service template (`components/content/ServicePage.tsx`) with: definition, who it's for, problems, what's included, how it works, tools, industries, 6–7 FAQs and related services.
- Original real-estate content moved to `/services/ai-lead-follow-up` and `/industries/real-estate`.
- Navigation: Services dropdown, Industries, About, Blog, FAQ, plus a "Book a free 30-minute call" button. Breadcrumbs on every inner page. The footer links to every page.

## Phase 3: Structured data

- `lib/schema.ts` builders and `components/JsonLd.tsx` (server-rendered). The build fails if a placeholder ever reaches JSON-LD.
- FAQPage is built from the same data as the visible FAQs. Draft posts carry no BlogPosting.
- Organization and ProfessionalService include founder (Gowrav K M), foundingDate 2026 and a city-level address (Mysuru, Karnataka, IN).

## Phase 4: Conversion and performance

- `/contact`: lazy-loaded Cal.com embed + contact form. `functions/api/contact.ts` handles same-origin, size limits, honeypot, Turnstile, validation and sending through Resend.
- GA4 loads only when its ID is set. A sticky "Book a free 30-minute call" bar on phones. The trust section stays hidden until real content exists (`lib/trust.ts`).
- Performance: inline CSS, gradient glows instead of blur filters, no fixed background, 64px logo, stronger link contrast (`#0062CC`).

## Phase 5: QA

`node scripts/check-pages.mjs` (after `npm run build`) checks every page for:

- title and description length, canonical URL, exactly one H1, and no duplicate titles
- no `opacity:0` in the main content
- JSON-LD that parses, has the expected types and resolves its `@id` references
- FAQ schema text that matches the visible text, and well-formed breadcrumbs
- no `{{TODO` placeholders
- no broken internal links or `#anchors` (952 links checked)
- a sitemap that lists exactly the indexable pages

The git history was scanned for secrets on 2026-10-05; nothing was found.

## Page list and target keywords

| URL | Title | Primary keyword | Secondary keywords |
| --- | --- | --- | --- |
| `/` | Ezomod \| AI Automation Agency for Leads, Agents & Workflows | Ezomod; AI automation agency | AI agents, lead generation, multi-agent workflows |
| `/services` | AI Automation Services \| Ezomod | AI automation services | AI agency services, which AI service do I need |
| `/services/ai-lead-generation` | AI Lead Generation Services \| Ezomod | AI lead generation | AI lead generation services, automated lead generation, AI prospecting, B2B lead generation AI, lead qualification AI |
| `/services/ai-lead-follow-up` | AI Lead Follow-Up & Speed-to-Lead System \| Ezomod | AI lead follow-up | speed to lead, automated lead follow-up, real estate lead follow-up, instant lead response, lead nurturing automation |
| `/services/ai-voice-agents` | AI Voice Agents & Call Automation \| Ezomod | AI voice agents | AI phone agent, AI calling agent for business, automated outbound calls, AI receptionist, call automation |
| `/services/multi-agent-ai-workflows` | Multi-Agent AI Workflow Development \| Ezomod | multi-agent AI workflow development | multi-agent systems, AI agent development, agentic workflows, custom AI agents, AI agent orchestration |
| `/services/ai-automation` | AI Automation Services for Business Processes \| Ezomod | AI automation services | business process automation, workflow automation, AI automation agency, automate repetitive tasks |
| `/services/crm-automation` | CRM Automation & Integration Services \| Ezomod | CRM automation | CRM integration services, Follow Up Boss automation, Lofty CRM automation, Salesforce automation, HubSpot automation |
| `/services/ai-chatbots` | AI Chatbot Development & Support Automation \| Ezomod | AI chatbot development | customer support automation, AI customer service agent, website chatbot, WhatsApp chatbot for business |
| `/services/website-development` | Website Design & Development Agency \| Ezomod | website development agency | website design and development, Next.js development, SEO-friendly websites, conversion-focused website design |
| `/industries/real-estate` | AI Automation for Real Estate Teams \| Ezomod | AI for real estate teams | real estate lead follow-up, Follow Up Boss automation, AI ISA |
| `/about` | About Ezomod \| AI Automation Agency | Ezomod; what is Ezomod | Ezomod founder, Ezomod Mysuru |
| `/faq` | FAQ: AI Automation, Lead Follow-Up & More \| Ezomod | Ezomod FAQ | what is an AI automation agency, speed to lead |
| `/contact` | Book a Free Consultation \| Ezomod | book AI automation consultation | contact Ezomod |
| `/blog` | Ezomod Blog: AI Automation, Leads & AI Agents | AI automation blog | n/a |
| `/blog/what-is-multi-agent-ai-automation` (draft) | What Is Multi-Agent AI Automation? A Simple Guide | multi-agent AI automation | AI agents for business |
| `/blog/speed-to-lead` (draft) | Speed to Lead: Why a 5-Minute Response Wins Deals | speed to lead | lead response time |
| `/blog/ai-lead-generation-vs-traditional-lead-generation` (draft) | AI Lead Generation vs Traditional Lead Generation | AI lead generation | AI vs traditional lead generation |
| `/privacy`, `/terms` | Privacy Policy / Terms of Service \| Ezomod | n/a | n/a |

## Known limitation

The Lighthouse **simulated** LCP is 3.1–3.2 s (target 2.5 s). Real first paint measured 0.46 s. The simulation counts the JavaScript download, mostly the framer-motion animation library. Check real-user data in PageSpeed Insights after launch. If it's still slow, replace framer-motion in the above-the-fold sections with CSS animations.
