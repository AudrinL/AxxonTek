"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

/* Boxed fields with a visible label: the clearest affordance on a light page,
   and the label never disappears while you type. */
const fieldBase =
  "w-full rounded-[var(--r-inner)] border border-line-firm bg-[color-mix(in_srgb,var(--c-ink)_4%,transparent)] px-4 py-3.5 text-[1rem] text-tone outline-none transition-[border-color,box-shadow] duration-[var(--t-base)] placeholder:text-tone-faint hover:border-tone-faint focus:border-ember focus:shadow-[0_0_0_3px_var(--color-ember-wash)] disabled:opacity-60";

const labelBase = "mb-2 block text-[0.875rem] font-medium text-tone";

/** The intents from the masterplan. The first is the default. */
const INTERESTS = [
  "Building a website",
  "Building a digital product",
  "Transforming an existing system",
  "Working with AxxonTek",
  "Partnership",
  "Something else",
] as const;

export function ContactForm({
  defaultEmail,
  defaultInterest,
  concept,
}: {
  defaultEmail?: string;
  defaultInterest?: string;
  concept?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [interest, setInterest] = useState<string>(
    defaultInterest && INTERESTS.includes(defaultInterest as (typeof INTERESTS)[number])
      ? defaultInterest
      : INTERESTS[0]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.status === 422 && payload.errors) {
        setStatus("error");
        setErrors(payload.errors);
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setFormError(payload.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setFormError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-10 text-center sm:p-14" role="status">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ember-wash">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="var(--ember)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mb-3 text-2xl font-semibold">Message received.</h3>
        <p className="text-lede mx-auto max-w-md">
          Thank you for reaching out. We read every message ourselves, and you can expect a reply
          within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm text-tone-mute underline decoration-line-firm underline-offset-4 transition-colors hover:text-tone"
        >
          Send another message
        </button>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] opacity-0">
        <label>
          Do not fill this in
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Intent. Carried as a hidden field so it posts with everything else. */}
      <input type="hidden" name="interest" value={interest} />
      {concept && <input type="hidden" name="concept" value={concept} />}

      <fieldset>
        <legend className={labelBase}>I&rsquo;m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((option) => {
            const active = interest === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setInterest(option)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-[0.875rem] transition-colors duration-[var(--t-hover)] ${
                  active
                    ? "border-transparent bg-ink text-canvas"
                    : "border-line-firm text-tone-mute hover:border-tone hover:text-tone"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          placeholder="Jane Doe"
          autoComplete="name"
          error={errors.name}
          disabled={busy}
        />
        <Field
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
          autoComplete="email"
          defaultValue={defaultEmail}
          error={errors.email}
          disabled={busy}
        />
      </div>

      <Field
        name="company"
        label="Company (optional)"
        placeholder="Where you work"
        autoComplete="organization"
        error={errors.company}
        disabled={busy}
      />

      <div>
        <label htmlFor="message" className={labelBase}>
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A sentence or two is enough. We will ask the rest on the call."
          disabled={busy}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldBase} resize-y ${errors.message ? "border-red-500/70" : ""}`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={busy} className="pill pill-ember hover:bg-ember-deep disabled:opacity-60">
          {busy && (
            <span className="h-4 w-4 animate-spin rounded-full border border-white/40 border-t-white" />
          )}
          {busy ? "Sending" : "Send message"}
          {!busy && (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14m-6-6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <p className="text-[0.8125rem] text-tone-faint">
          No newsletter, no sales sequence. One reply, within a business day.
        </p>
      </div>

      <div aria-live="assertive">
        {formError && (
          <p className="rounded-[var(--r-inner)] border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-500">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  error,
  disabled,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${fieldBase} ${error ? "border-red-500/70" : ""}`}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-red-500">
      {message}
    </p>
  );
}
