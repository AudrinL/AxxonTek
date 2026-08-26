/** Minimal, dependency-free validation shared by the form route handlers. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldErrors = Record<string, string>;

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value.trim());
}

export function text(value: unknown, { min = 1, max = 2000 } = {}) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

export type ContactPayload = {
  name: string;
  email: string;
  company: string | null;
  message: string;
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

  if (Object.keys(errors).length > 0) return { errors };
  return { data: { name: name!, email: email!, company, message: message! } };
}
