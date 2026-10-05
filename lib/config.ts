/**
 * Public build-time configuration (NEXT_PUBLIC_* variables are inlined at build).
 * A value that is empty or still contains a "{{TODO" placeholder counts as not set,
 * so placeholders never reach the rendered HTML.
 */
function read(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v && !v.includes("{{TODO") ? v : undefined;
}

/** Cal.com booking link: a full URL (https://cal.com/ezomod/30min) or just "ezomod/30min". */
export const CAL_LINK = read(process.env.NEXT_PUBLIC_CAL_LINK);
export const TURNSTILE_SITE_KEY = read(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
export const GA4_ID = read(process.env.NEXT_PUBLIC_GA4_ID);
export const GSC_VERIFICATION = read(process.env.NEXT_PUBLIC_GSC_VERIFICATION);

/** Embeddable Cal.com URL, or undefined when no booking link is configured. */
export function calEmbedUrl(): string | undefined {
  if (!CAL_LINK) return undefined;
  const base = /^https?:\/\//.test(CAL_LINK) ? CAL_LINK : `https://cal.com/${CAL_LINK.replace(/^\/+/, "")}`;
  const url = new URL(base);
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "light");
  return url.toString();
}
