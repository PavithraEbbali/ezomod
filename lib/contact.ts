/**
 * Contact form validation, shared by the browser form and the Pages Function
 * (functions/api/contact.ts). Keep this file dependency-free: the function imports it
 * by relative path.
 */
export const LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  service: 100,
  message: 5000,
  messageMin: 10,
} as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Trims and normalises raw input. */
export function cleanContact(raw: Record<string, unknown>): ContactInput {
  return {
    name: str(raw.name),
    email: str(raw.email),
    company: str(raw.company),
    service: str(raw.service),
    message: str(raw.message),
  };
}

/** Returns an object of field errors; empty when the input is valid. */
export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email)) errors.email = "Please enter a valid email address.";

  if (input.company.length > LIMITS.company) errors.company = `Please keep this under ${LIMITS.company} characters.`;
  if (input.service.length > LIMITS.service) errors.service = "Please choose a service from the list.";

  if (input.message.length < LIMITS.messageMin) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (input.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return errors;
}
