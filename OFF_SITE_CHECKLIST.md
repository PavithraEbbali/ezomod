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

*Phase 5 will add the remaining steps: Cloudflare bot settings, the ezomod.vercel.app redirect, Search Console and Bing submission, business profiles, content plan and monthly checks.*
