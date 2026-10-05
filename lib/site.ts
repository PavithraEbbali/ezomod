/** Canonical origin. No trailing slash; every absolute URL on the site is built from this. */
export const SITE_URL = "https://www.ezomod.com";
export const SITE_NAME = "Ezomod";
export const SITE_ALT_NAME = "EZOMOD";
export const SITE_DESCRIPTION =
  "Ezomod is an AI automation agency building AI lead generation, lead follow-up, voice agents, multi-agent workflows, CRM automation and websites.";

export const CONTACT_EMAIL = "Ezomodalltech@ezomod.com";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
export const CONSULTATION_HREF = "/contact";
export const CTA_LABEL = "Book a free 30-minute call";

export const LINKEDIN_URL = "https://www.linkedin.com/company/ezomod/";

/** Absolute URL for a root-relative path, without a trailing slash (except the root itself). */
export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE_URL}${clean}`;
}
