/** Minimal, dependency-free validation shared by the form UI and the route
 *  handlers, so the client and the server agree on one set of rules. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type FieldErrors = Record<string, string>;

/**
 * The contact intents. This is the single source of truth: the form renders
 * these buttons and the server accepts only these values, so the two can
 * never drift apart. The first entry is the default.
 */
export const CONTACT_INTERESTS = [
  "Building a website",
  "Building a digital product",
  "Transforming an existing system",
  "Working with AxxonTek",
  "Partnership",
  "Something else",
] as const;

export type ContactInterest = (typeof CONTACT_INTERESTS)[number];

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value.trim());
}

export function text(value: unknown, { min = 1, max = 2000 } = {}) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

/** A URL-safe slug (Studio concept references), or null. Never throws. */
export function slug(value: unknown, { max = 80 } = {}): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max || !SLUG_RE.test(trimmed)) return null;
  return trimmed;
}

export type ContactPayload = {
  name: string;
  email: string;
  company: string | null;
  message: string;
  /** Chosen intent. Falls back to the first interest when absent or unknown. */
  interest: ContactInterest;
  /** Studio concept slug the enquiry came from, when any. */
  concept: string | null;
};

export function parseContact(body: unknown): { data: ContactPayload } | { errors: FieldErrors } {
  const errors: FieldErrors = {};
  const raw = (body ?? {}) as Record<string, unknown>;

  const name = text(raw.name, { min: 2, max: 120 });
  if (!name) errors.name = "Please tell us your name.";

  const email = isEmail(raw.email) ? String(raw.email).trim() : null;
  if (!email) errors.email = "Please enter a valid email address.";

  const message = text(raw.message, { min: 10, max: 4000 });
  if (!message) errors.message = "Please include at least a sentence or two.";

  const company = text(raw.company, { min: 1, max: 160 });

  // Intent is a controlled choice: accept a known value, otherwise fall back
  // to the default rather than rejecting the whole submission over it.
  const rawInterest = text(raw.interest, { max: 80 });
  const interest: ContactInterest =
    rawInterest && (CONTACT_INTERESTS as readonly string[]).includes(rawInterest)
      ? (rawInterest as ContactInterest)
      : CONTACT_INTERESTS[0];

  const concept = slug(raw.concept);

  if (Object.keys(errors).length > 0) return { errors };
  return { data: { name: name!, email: email!, company, message: message!, interest, concept } };
}
