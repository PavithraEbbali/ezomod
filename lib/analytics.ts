/** GA4 event helpers. No-ops when GA4 is not configured or not yet loaded. */
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}

/** Conversion events (mark both as key events in GA4). */
export const EVENTS = {
  /** Contact form submitted successfully. */
  lead: "generate_lead",
  /** A "Book a free 30-minute call" button or the calendar was clicked. */
  booking: "booking_click",
} as const;
