/**
 * Social proof. These lists are intentionally EMPTY until real, permission-backed content
 * exists. The trust section renders nothing while all three are empty, so no fake or
 * placeholder content can ever appear on the site.
 *
 * To add content, push real entries, e.g.:
 *   CLIENT_LOGOS.push({ name: "Client name", src: "/clients/client.svg", width: 120, height: 40 })
 *   TESTIMONIALS.push({ quote: "…", name: "Full name", role: "Title, Company" })
 *   RESULTS.push({ value: "…", label: "…", source: "Client name / project" })
 */
export type ClientLogo = { name: string; src: string; width: number; height: number };
export type Testimonial = { quote: string; name: string; role: string };
export type Result = { value: string; label: string; source: string };

export const CLIENT_LOGOS: ClientLogo[] = [];
export const TESTIMONIALS: Testimonial[] = [];
export const RESULTS: Result[] = [];
