/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the contact form, checks the honeypot and Cloudflare Turnstile, validates input,
 * and emails the enquiry to CONTACT_TO_EMAIL through the Resend API.
 *
 * Environment variables (Cloudflare Pages > Settings > Environment variables):
 *   RESEND_API_KEY        secret   Resend API key
 *   CONTACT_FROM_EMAIL    plain    verified sender, e.g. "Ezomod Website <website@ezomod.com>"
 *   CONTACT_TO_EMAIL      plain    recipient, Ezomodalltech@ezomod.com
 *   TURNSTILE_SECRET_KEY  secret   Turnstile secret key
 */
import { cleanContact, validateContact } from "../../lib/contact";

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Context = { request: Request; env: Env };

const MAX_BODY_BYTES = 20_000;
const DEFAULT_TO = "Ezomodalltech@ezomod.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Only accept posts from this site (same host), when the browser sends an Origin header. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!sameOrigin(request)) return json({ ok: false, error: "This form can only be sent from the Ezomod website." }, 403);

  const length = Number(request.headers.get("Content-Length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, error: "Your message is too long." }, 413);

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "Your message is too long." }, 413);
    raw = JSON.parse(text) as Record<string, unknown>;
    if (!raw || typeof raw !== "object") throw new Error("not an object");
  } catch {
    return json({ ok: false, error: "We couldn't read the form. Please try again." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (typeof raw.website === "string" && raw.website.trim() !== "") return json({ ok: true });

  const input = cleanContact(raw);
  const fields = validateContact(input);
  if (Object.keys(fields).length > 0) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields }, 422);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof raw.turnstileToken === "string" ? raw.turnstileToken : "";
    const passed = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, request.headers.get("CF-Connecting-IP"));
    if (!passed) return json({ ok: false, error: "The security check failed. Please complete it and try again." }, 400);
  } else {
    console.warn("TURNSTILE_SECRET_KEY is not set: spam protection relies on the honeypot only.");
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
    console.error("Contact form is not configured: RESEND_API_KEY and CONTACT_FROM_EMAIL are required.");
    return json({ ok: false, error: "Our form is temporarily unavailable." }, 503);
  }

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "Not given"],
    ["Service", input.service || "Not sure yet"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${input.message}\n`;
  const html = `<h2>New enquiry from ezomod.com</h2><table>${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL || DEFAULT_TO],
      reply_to: input.email,
      subject: `New enquiry: ${input.name}${input.company ? ` (${input.company})` : ""}`.replace(/\s+/g, " ").slice(0, 200),
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return json({ ok: false, error: "We couldn't send your message just now." }, 502);
  }

  return json({ ok: true });
}
