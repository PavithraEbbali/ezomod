# Off-site checklist

Things you need to do yourself, outside the code. Do them in order. Each step says where to click and what to copy.

> **Important:** this code repository is public. Never paste API keys or secret keys into any file in the project. Keys only go into the Cloudflare dashboard, as described below.

---

## Part A: Booking, contact form and analytics (set up before launch)

### A1. Resend (sends the contact form emails to you)

1. Go to **resend.com** and sign up (the free plan is enough to start).
2. In Resend, open **Domains** and click **Add Domain**. Type `ezomod.com` and choose a region close to you.
3. Resend now shows a few **DNS records** (usually one MX record and two TXT records, for SPF and DKIM). Keep this page open.
4. In a new tab, log in to **Cloudflare** and click your domain **ezomod.com**, then **DNS** › **Records**.
5. For each record Resend shows, click **Add record** in Cloudflare and copy the **Type**, **Name** and **Value/Content** exactly. For the MX record, also copy the **Priority**. Leave **Proxy status** as **DNS only** (grey cloud).
6. Back in Resend, click **Verify DNS Records**. It can take a few minutes, sometimes up to an hour. Wait until the domain shows **Verified**.
7. In Resend, open **API Keys** › **Create API Key**. Name it `ezomod-website`, give it **Sending access**, and limit it to the `ezomod.com` domain. Click **Add**.
8. **Copy the key now.** It starts with `re_` and is shown only once. You will paste it in step A4.
9. Decide on the sender address the emails will come from, for example `website@ezomod.com`. You don't need a mailbox for it; it only has to be on the verified domain.

### A2. Cloudflare Turnstile (stops spam bots, no annoying puzzles)

1. In the Cloudflare dashboard, click **Turnstile** in the left menu.
2. Click **Add widget**. Name it `ezomod contact form`.
3. Under **Hostnames**, add `www.ezomod.com` and `ezomod.com`. You can also add your `*.pages.dev` preview address if you want to test there.
4. Leave **Widget mode** on **Managed** and click **Create**.
5. Copy the **Site Key** (public) and the **Secret Key** (private). You will paste both in step A4.

### A3. Cal.com (booking calendar on the Contact page)

1. Go to **cal.com** and sign up with the email you'll use for calls.
2. Connect your calendar (Google or Outlook) so booked calls appear there and busy times are blocked.
3. Create an event type called **Free 30-minute consultation**, 30 minutes long. Add Google Meet or Zoom as the location.
4. Open the event and copy its public link, for example `https://cal.com/ezomod/30min`. You will paste it in step A4.
5. If you skip Cal.com for now, that's fine. The Contact page simply shows the form and email link instead of a calendar.

### A4. Add the settings to Cloudflare Pages

1. In Cloudflare, go to **Workers & Pages** and click your **ezomod** Pages project.
2. Open **Settings** › **Variables and Secrets** (called **Environment variables** in some accounts).
3. Make sure you are editing **Production**. Repeat for **Preview** if you want the form to work on preview links too.
4. Add each variable below with **Add**. For the ones marked **Secret**, choose the **Encrypt / Secret** type so nobody can read them later.

   | Name | Value | Type |
   | --- | --- | --- |
   | `RESEND_API_KEY` | the `re_...` key from A1 step 8 | **Secret** |
   | `TURNSTILE_SECRET_KEY` | Turnstile Secret Key from A2 | **Secret** |
   | `CONTACT_FROM_EMAIL` | `Ezomod Website <website@ezomod.com>` (your sender from A1 step 9) | Plain text |
   | `CONTACT_TO_EMAIL` | `Ezomodalltech@ezomod.com` | Plain text |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile Site Key from A2 | Plain text |
   | `NEXT_PUBLIC_CAL_LINK` | your Cal.com link from A3, e.g. `https://cal.com/ezomod/30min` | Plain text |
   | `NEXT_PUBLIC_GA4_ID` | your GA4 Measurement ID from A5, e.g. `G-XXXXXXXXXX` | Plain text |
   | `NEXT_PUBLIC_GSC_VERIFICATION` | the Search Console code from A6 | Plain text |

5. Click **Save**.
6. **Redeploy** so the new values take effect: go to **Deployments**, open the latest deployment, click the **⋯** menu › **Retry deployment**. The `NEXT_PUBLIC_...` values are baked in at build time, so a new build is required whenever you change them.
7. Check the build settings under **Settings** › **Build**: **Build command** `npm run build`, **Build output directory** `out`, **Root directory** left empty (the project root). The `functions` folder in the project root is picked up automatically and becomes the `/api/contact` endpoint.

### A5. Google Analytics 4

1. Go to **analytics.google.com** and sign in with the Google account you want to own the data.
2. Click **Admin** (gear icon) › **Create** › **Property**. Name it `Ezomod website`, choose your time zone (India) and currency, then **Next** through the business questions.
3. When asked for a platform, choose **Web**. Enter `https://www.ezomod.com` and the stream name `Ezomod website`. Click **Create stream**.
4. Copy the **Measurement ID** (starts with `G-`). Paste it into `NEXT_PUBLIC_GA4_ID` (step A4), then redeploy.
5. After the site is live and you have clicked a "Book a free 30-minute call" button and sent a test form, go to **Admin** › **Events**. Within about a day you will see `booking_click` and `generate_lead`.
6. Mark both as conversions: in **Admin** › **Key events**, click **New key event** and enter `generate_lead`. Repeat for `booking_click`.
7. Privacy note: if you expect visitors from the EU or UK, add a cookie consent banner before turning GA4 on. Ask us and we can add one.

### A6. Google Search Console verification

1. Go to **search.google.com/search-console** and click **Add property**.
2. Choose **URL prefix** and type `https://www.ezomod.com`. Click **Continue**.
3. Choose the **HTML tag** method. Google shows a tag like `<meta name="google-site-verification" content="abc123..." />`.
4. Copy **only the content value** (the `abc123...` part). Paste it into `NEXT_PUBLIC_GSC_VERIFICATION` (step A4) and redeploy.
5. When the deploy has finished, go back to Search Console and click **Verify**.
6. Tip: the **Domain** property type (verified with a DNS TXT record in Cloudflare) covers `www` and non-`www` together. You can add it as well; the meta tag isn't needed for that one.

### A7. Test everything after deploying

1. Open `https://www.ezomod.com/contact` on your phone and on a computer.
2. Check the calendar loads when you scroll to it, then book a test slot and cancel it in Cal.com.
3. Fill in the form with your own details and press **Send message**. You should see "Thanks, your message has been sent." and receive the email at Ezomodalltech@ezomod.com within a minute. Press **Reply** in your email app; it should reply to the address you typed in the form.
4. If you see an error instead, check the logs: Cloudflare › your Pages project › **Functions** › **Real-time logs**, then send the form again. A "not configured" message means a variable from step A4 is missing or misspelled.
5. In GA4, open **Reports** › **Realtime** while you click a booking button. You should see a `booking_click` event.

---

## Part B: Launch

### B1. Cloudflare settings (do these before merging)

**Let AI search engines and search crawlers read the site**

1. In Cloudflare, click **ezomod.com**, then **Security** › **Bots** (in some accounts: **Security** › **Settings** › **Bot traffic**).
2. Find **Block AI bots** (also called **AI Scrapers and Crawlers**) and set it to **Off** / **Do not block**. If it's on, ChatGPT, Claude and Perplexity can't read the site and won't mention it.
3. Find **Manage your robots.txt** (also called **Instruct AI bot traffic with robots.txt** or **Content Signals**) and turn it **Off**. The site already has its own robots.txt that welcomes these crawlers, and Cloudflare's version would replace it.
4. Check **Bot Fight Mode**:
   - On the free plan, leave it **Off**. It can challenge legitimate crawlers.
   - On **Super Bot Fight Mode** (paid plans), make sure **Verified bots** is set to **Allow**, and **Definitely automated** is not set to **Block** for verified bots.
5. Go to **Security** › **Events**. Over the next few days, filter by user agent `Googlebot` and `Bingbot`. You should see no blocks or challenges. If you do, tell us.

**Send everyone to `www.ezomod.com`**

6. Go to **Workers & Pages** › your Pages project › **Custom domains**. Make sure **both** `www.ezomod.com` and `ezomod.com` are listed and **Active**. Add any that are missing with **Set up a custom domain**.
7. Go back to **ezomod.com** › **Rules** › **Redirect Rules** › **Create rule** › choose the template **Redirect from Root to WWW**.
   - It redirects `ezomod.com/*` to `https://www.ezomod.com/${1}` with status **301** and **Preserve query string** ticked.
   - Click **Deploy**.
8. Go to **SSL/TLS** › **Edge Certificates** and turn on **Always Use HTTPS**.

**Check the address variations (after the site is live, B3)**

9. Open each address in your browser. Each one should end up on the address after the arrow, and the address bar should change:
   - `http://ezomod.com` → `https://www.ezomod.com/`
   - `https://ezomod.com/privacy` → `https://www.ezomod.com/privacy`
   - `https://www.ezomod.com/privacy.html` → `https://www.ezomod.com/privacy`
   - `https://www.ezomod.com/privacy/` → `https://www.ezomod.com/privacy`
   - `https://www.ezomod.com/book` → `https://www.ezomod.com/contact`
10. If `/privacy.html` or `/privacy/` does **not** redirect, tell us. We'll add explicit rules, but Cloudflare Pages normally does this automatically.

### B2. Take down the old copy on `ezomod.vercel.app`

A second copy of the site on another address splits your Google ranking. Do this **after** the Cloudflare site is live (B3), so there's never a moment with no site.

1. Log in to **vercel.com** and open the **ezomod** project.
2. **Recommended:** delete the project. Go to **Settings** › **General**, scroll to **Delete Project**, and confirm. The `ezomod.vercel.app` address then stops working.
3. **If you'd rather keep it:** go to **Settings** › **Deployment Protection** and turn on **Vercel Authentication** for **All deployments** (including production). Visitors and search engines then get a login screen instead of a duplicate site.
4. Check: open `https://ezomod.vercel.app` in a private window. It should show an error or a login screen, not the website.
5. Search Google for `site:ezomod.vercel.app` once a week. Old results disappear on their own within a few weeks.

### B3. Merge `seo-overhaul` into `main` and check the live site

1. On **github.com**, open the repository and click **Pull requests** › **New pull request**.
2. Set **base: main** and **compare: seo-overhaul**. Click **Create pull request**, then **Merge pull request** › **Confirm merge**.
3. In Cloudflare › **Workers & Pages** › your project › **Deployments**, wait for the new build to show **Success** (a few minutes). If it fails, open it and send us the log.
4. Open these and check they load:
   - `https://www.ezomod.com/`
   - `https://www.ezomod.com/robots.txt`
   - `https://www.ezomod.com/sitemap.xml`
   - `https://www.ezomod.com/llms.txt`
   - `https://www.ezomod.com/og-image.png`
5. **Rich Results Test:** go to **search.google.com/test/rich-results**. Test the home page, `/faq` and `/services/ai-voice-agents`. You should see **FAQ**, **Breadcrumbs** and **Organization** detected, with no errors. Warnings about optional fields are fine.
6. **Schema validator:** paste the same addresses into **validator.schema.org**. There should be no errors.
7. **PageSpeed Insights:** go to **pagespeed.web.dev**, test the home page, `/services/ai-voice-agents` and `/contact`, and look at the **Mobile** tab. The "Core Web Vitals" field data appears once enough real visitors have come (often after a few weeks).
8. **LinkedIn preview:** go to **linkedin.com/post-inspector**, enter `https://www.ezomod.com` and click **Inspect**. You should see the dark Ezomod image, the title and the description. This also clears LinkedIn's old cached preview.
9. **WhatsApp preview:** send `https://www.ezomod.com` to yourself on WhatsApp. The same image and title should appear. WhatsApp caches previews, so if you see the old one, add `?v=2` to the end of the link.
10. Do the full contact form and booking test from **A7**.

---

## Part C: Get found on Google, Bing and AI search

### C1. Google Search Console (after A6 verification)

1. Open **search.google.com/search-console** and select `https://www.ezomod.com`.
2. Click **Sitemaps** in the left menu. Type `sitemap.xml` and click **Submit**. The status should become **Success**.
3. Click **URL inspection** at the top. Paste `https://www.ezomod.com/`, press Enter, then click **Request indexing**. Repeat for:
   - `https://www.ezomod.com/about`
   - `https://www.ezomod.com/services`
   - `https://www.ezomod.com/services/ai-lead-follow-up`
   - `https://www.ezomod.com/faq`
4. Google allows only a few requests a day, so spread the rest over the week. The sitemap covers everything anyway.
5. After about a week, open **Pages** (indexing report) and check the main pages are listed as **Indexed**.

### C2. Bing Webmaster Tools (feeds ChatGPT search and Microsoft Copilot)

1. Go to **bing.com/webmasters** and sign in with a Microsoft account.
2. Choose **Import from Google Search Console** and allow access. This verifies the site and brings in your sitemap in one step.
   - If import isn't offered: click **Add site**, enter `https://www.ezomod.com`, and verify with the **DNS (CNAME)** option. Bing gives you a record to add in Cloudflare › **DNS**.
3. Open **Sitemaps** and make sure `https://www.ezomod.com/sitemap.xml` is listed. If not, click **Submit sitemap** and add it.
4. Open **URL Submission** and submit the same five main pages as in C1.
5. Optional: under **Settings** › **IndexNow**, Cloudflare can notify Bing automatically when pages change. In Cloudflare, go to **Caching** › **Configuration** › **Crawler Hints** and turn it **On**.

### C3. Google Business Profile

1. Go to **google.com/business** and click **Manage now**, using the same Google account as Search Console.
2. Business name: **Ezomod**, exactly as written (no extra keywords).
3. Category: choose the closest match. Try typing **Software company** or **Internet marketing service**, and add the other one as a secondary category.
4. When asked whether you have a location customers visit, choose **No**. Then add your **service area** (for example Mysuru, Karnataka and India, plus any countries you serve). Your street address stays hidden.
5. Add your contact details:
   - website: `https://www.ezomod.com`
   - email: Ezomodalltech@ezomod.com
   - phone: only if you want one published
6. Description: paste the one-line description from D1, then add a sentence about the services.
7. Complete verification. Google may ask for a video of your workspace or send a code.
8. Once verified, add the services (the 8 names from the website), your logo (`public/logo.png`) and a cover image (`public/og-image.png`).
9. When the profile is live, copy its link (**Share profile**) and add it to the `sameAs` list (D2).

---

## Part D: Profiles everywhere with the same details

Search engines and AI tools trust a company more when the same name, description and website appear in many places. Use **exactly** these details everywhere.

### D1. Copy-paste details

- **Name:** Ezomod
- **One-line description:** Ezomod is an AI automation agency building AI lead generation, lead follow-up, voice agents, multi-agent workflows, CRM automation and websites.
- **Website:** https://www.ezomod.com
- **Email:** Ezomodalltech@ezomod.com
- **Location:** Mysuru, Karnataka, India
- **Founded:** 2026
- **Founder:** Gowrav K M
- **Logo:** `public/logo.png` (square). **Banner:** `public/og-image.png`.

### D2. Create the profiles, then add each one to the website

Create a company profile on each site below (all free to start):

1. **LinkedIn:** already exists. Update it as in D3.
2. **Crunchbase:** crunchbase.com › **Add new profile** › **Organization**.
3. **Clutch:** clutch.co › **Get listed**. It's free; reviews are requested later from clients.
4. **GoodFirms:** goodfirms.co › **Get listed**.
5. **DesignRush:** designrush.com › **Get listed** (free agency profile).
6. **X (Twitter):** create the account `@ezomod` (or the closest available). Put the one-line description in the bio and the website in the link field.
7. **YouTube:** create a channel named **Ezomod**. In **Customise channel** › **Basic info**, add the description and website link.
8. **Instagram:** create a business account `ezomod`. Add the description to the bio and the website as the link.
9. **Google Business Profile:** from C3.

**After each profile exists, add its address to the website:**

1. Open the file **`lib/schema.ts`** in the project.
2. Find this line, near the top:
   ```ts
   export const SAME_AS: string[] = [LINKEDIN_URL];
   ```
3. Add each new profile address inside the brackets, separated by commas. For example:
   ```ts
   export const SAME_AS: string[] = [
     LINKEDIN_URL,
     "https://www.crunchbase.com/organization/ezomod",
     "https://clutch.co/profile/ezomod",
     "https://www.goodfirms.co/company/ezomod",
     "https://www.designrush.com/agency/profile/ezomod",
     "https://x.com/ezomod",
     "https://www.youtube.com/@ezomod",
     "https://www.instagram.com/ezomod/",
   ];
   ```
   Use your real profile addresses; the ones above are examples. Only add profiles that actually exist.
4. Also add the new links to `public/llms.txt` under **Company**, one per line.
5. Commit the change to `main`. Cloudflare redeploys automatically.

### D3. Update the LinkedIn company page

1. Open **linkedin.com/company/ezomod** and click **Edit page**.
2. **Website:** `https://www.ezomod.com`.
3. **Tagline:** AI automation agency: AI lead generation, follow-up, voice agents and workflows.
4. **About / Overview:** paste:

   > Ezomod is an AI automation agency based in Mysuru, India. We design, build and maintain AI systems that help businesses win more leads and spend less time on repetitive work: AI lead generation, instant AI lead follow-up, AI voice agents, multi-agent AI workflows, business process automation, CRM automation (Follow Up Boss, Lofty, Salesforce, HubSpot and more), AI chatbots and websites. Our systems work inside the tools you already use, and we maintain them after launch. Real estate is where our lead follow-up work is most specialised.
   >
   > Book a free 30-minute call: https://www.ezomod.com/contact

5. **Industry:** IT Services and IT Consulting (or the closest match). **Company size:** your real size. **Founded:** 2026. **Location:** Mysuru, Karnataka, India.
6. Under **Services**, add the 8 service names from the website.
7. Click **Save**. Then run the LinkedIn Post Inspector (B3 step 8) again.

---

## Part E: Content plan (2 posts a month for 6 months)

**Before starting:** review the 3 drafts already written. Then set `draft: false` for each in `lib/blog.ts` and change `published` and `updated` to the real publish date.

How to add a post: copy one of the existing posts in `lib/blog.ts`, change the text, and keep these rules:

- Start with a short direct answer.
- Use question-style headings.
- Include one comparison table or list.
- Link to 1–2 service pages.
- Never include made-up numbers or client stories.

| Month | Title | Target keyword | Links to |
| --- | --- | --- | --- |
| Month 1 | How Much Time Does Manual Lead Follow-Up Really Cost Your Team? | manual lead follow-up | AI lead follow-up |
| Month 1 | AI Voice Agents vs Human Receptionists: Which Is Right for Your Business? | AI receptionist | AI voice agents |
| Month 2 | Follow Up Boss Automation: 7 Workflows Every Real Estate Team Should Set Up | Follow Up Boss automation | CRM automation, real estate |
| Month 2 | What Is an AI Agent? A Plain-English Explanation for Business Owners | what is an AI agent | Multi-agent workflows |
| Month 3 | How to Respond to Real Estate Leads at Night and on Weekends | real estate lead response | AI lead follow-up, real estate |
| Month 3 | Zapier vs Make vs n8n vs Custom Code: Choosing the Right Automation Tool | Zapier vs Make vs n8n | AI automation |
| Month 4 | How to Re-Engage Old Leads in Your CRM With AI | re-engage old leads | AI lead follow-up, CRM automation |
| Month 4 | AI Chatbot vs Live Chat: What Customers Actually Prefer | AI chatbot vs live chat | AI chatbots |
| Month 5 | 10 Business Processes You Can Automate With AI This Year | business processes to automate | AI automation |
| Month 5 | Lofty CRM Automation: A Practical Setup Guide | Lofty CRM automation | CRM automation |
| Month 6 | How AI Lead Qualification Works (and the Questions It Should Ask) | AI lead qualification | AI lead generation, AI voice agents |
| Month 6 | Website Speed and SEO in 2027: What Small Businesses Need to Know | website speed SEO | Website development |

After publishing each post:

1. Share it on the LinkedIn company page and on Gowrav's personal profile.
2. Run **URL inspection** › **Request indexing** for it in Search Console (C1).

---

## Part F: Link-building ideas (genuine, no paid links)

1. **Founder posts on LinkedIn:** Gowrav posts 2–3 times a week about real lessons from building AI agents, with a link to a relevant blog post or service page now and then. This is the most valuable channel for an agency.
2. **Directory and review profiles (Part D):** Clutch, GoodFirms and DesignRush profiles each give a link. Ask happy clients for a Clutch review once you have them.
3. **Partner pages:** Follow Up Boss, Lofty, HubSpot and others list integration partners and certified experts. Apply for their partner or marketplace listings when you qualify.
4. **Guest articles:** offer a useful how-to (for example "How to set up speed-to-lead follow-up in Follow Up Boss") to real estate blogs, Indian startup publications (YourStory, Inc42 contributor programmes) and automation newsletters.
5. **Podcasts:** pitch Gowrav as a guest on real estate tech, small-business and AI podcasts. Show notes usually link to the website.
6. **Reddit and Quora:** answer questions in r/realtors, r/smallbusiness, r/automation and r/n8n only when you can genuinely help. Link to a blog post only when it directly answers the question. Never spam.
7. **Local business ecosystem:** Mysuru and Karnataka startup and IT associations, incubators and events often list member companies with a link.
8. **Tool showcases:** if you build with n8n, Make or Cal.com, submit a template or case write-up to their community galleries, with client permission.
9. **Product Hunt (optional):** launch a free tool or template (for example a "speed-to-lead calculator") and link it to the site.

---

## Part G: Monthly checks (15 minutes, first week of each month)

1. **Google:** search `Ezomod` in a private window. ezomod.com should be first. Note what else shows (LinkedIn, directories) and whether a knowledge panel appears on the right.
2. **AI assistants:** ask **ChatGPT** (with search on), **Gemini**, **Perplexity** and **Microsoft Copilot**: *"What is Ezomod?"* and *"Who offers AI lead follow-up for real estate teams in India?"*
   - Save the answers in a document each month.
   - Check they use the right name, description and website. If something is wrong, check the profiles in Part D are consistent.
3. **Search Console › Performance:** set the date range to **Last 28 days** and look at:
   - **Queries:** which searches show the site, and the clicks and position for "ezomod" and the service keywords.
   - **Pages:** which pages get impressions. Pages with many impressions but few clicks may need a better title or description.
4. **Search Console › Pages:** check no important page shows as **Not indexed**, and fix anything under **Why pages aren't indexed**.
5. **Bing Webmaster Tools:** check the **Search Performance** and **Recommendations** tabs.
6. **GA4 › Reports › Engagement › Events:** count `generate_lead` and `booking_click` for the month.
7. **PageSpeed Insights:** retest the home page on mobile. If **Core Web Vitals** show **Failed** for LCP, ask us to replace the animation library in the top sections (see `SEO_CHANGES.md`, "Known limitation").
8. Write down three numbers each month: Google position for "Ezomod", Search Console clicks, and enquiries (form + bookings). Compare them with the previous month.
