"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { LIMITS, cleanContact, validateContact, type FieldErrors } from "@/lib/contact";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const INPUT =
  "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/25 aria-[invalid=true]:border-red-500";
const LABEL = "block text-sm font-medium text-slate-800";
const ERROR = "mt-1.5 text-sm text-red-700";

/**
 * Contact form posting to the Pages Function at /api/contact. Turnstile loads only when the
 * form scrolls into view or is focused, so it never slows the first paint.
 */
export default function ContactForm({ services, turnstileSiteKey }: { services: string[]; turnstileSiteKey?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const tokenRef = useRef("");

  // Lazy-load Turnstile when the form becomes visible.
  useEffect(() => {
    if (!turnstileSiteKey || !formRef.current) return;
    let cancelled = false;
    const load = () => {
      const render = () => {
        const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
        if (cancelled || !api || !widgetRef.current || widgetId.current) return;
        widgetId.current = api.render(widgetRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token: string) => (tokenRef.current = token),
          "expired-callback": () => (tokenRef.current = ""),
          "error-callback": () => (tokenRef.current = ""),
        });
      };
      if (document.querySelector(`script[src="${TURNSTILE_SRC}"]`)) return render();
      const script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.onload = render;
      document.head.appendChild(script);
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: "200px" });
    observer.observe(formRef.current);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [turnstileSiteKey]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const input = cleanContact(data);
    const fieldErrors = validateContact(input);
    setErrors(fieldErrors);
    setServerError("");
    if (Object.keys(fieldErrors).length > 0) {
      const first = Object.keys(fieldErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (turnstileSiteKey && !tokenRef.current) {
      setServerError("Please complete the security check below the form, then send again.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: data.website ?? "", turnstileToken: tokenRef.current }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
      if (!response.ok || !result.ok) {
        if (result.fields) setErrors(result.fields);
        throw new Error(result.error || "Sorry, your message couldn't be sent.");
      }
      setStatus("success");
      track(EVENTS.lead, { form: "contact", service: input.service || "not specified" });
      formRef.current?.reset();
    } catch (error) {
      setStatus("error");
      // fetch() rejects with a TypeError when offline; don't show its technical message.
      setServerError(
        error instanceof Error && !(error instanceof TypeError)
          ? error.message
          : "Sorry, your message couldn't be sent. Please check your connection and try again.",
      );
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      api?.reset(widgetId.current);
      tokenRef.current = "";
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-[#22C55E]/30 bg-[#F0FDF4] p-6 sm:p-8">
        <CheckCircle2 className="h-8 w-8 text-[#16A34A]" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-slate-900">Thanks, your message has been sent.</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          We&apos;ll reply by email with times for a call. If it&apos;s urgent, email us at{" "}
          <a href={CONTACT_HREF} className="break-all font-medium text-[#0062CC] underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm font-medium text-[#0062CC] underline">
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof FieldErrors) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });
  const fieldError = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className={ERROR}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL}>
            Name <span className="text-red-700" aria-hidden>*</span>
          </label>
          <input {...field("name")} type="text" autoComplete="name" required maxLength={LIMITS.name} className={INPUT} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL}>
            Work email <span className="text-red-700" aria-hidden>*</span>
          </label>
          <input {...field("email")} type="email" autoComplete="email" required maxLength={LIMITS.email} className={INPUT} />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor="contact-company" className={LABEL}>
            Company
          </label>
          <input {...field("company")} type="text" autoComplete="organization" maxLength={LIMITS.company} className={INPUT} />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor="contact-service" className={LABEL}>
            Service you&apos;re interested in
          </label>
          <select {...field("service")} defaultValue="" className={INPUT}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={LABEL}>
          What would you like help with? <span className="text-red-700" aria-hidden>*</span>
        </label>
        <textarea {...field("message")} rows={5} required minLength={LIMITS.messageMin} maxLength={LIMITS.message} className={INPUT} />
        {fieldError("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers; bots that fill it are ignored. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey ? <div ref={widgetRef} className="min-h-[65px]" /> : null}

      {serverError ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {serverError} You can also email us at{" "}
          <a href={CONTACT_HREF} className="break-all font-medium underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#007BFF] via-[#00A3FF] to-[#22C55E] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#0080FF]/25 transition-all hover:shadow-lg disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p id="contact-form-note" className="text-sm text-slate-500">
        Fields marked * are required. We only use your details to reply to you. See our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
