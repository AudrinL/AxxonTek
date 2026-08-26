"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { easeOutExpo } from "@/lib/motion";
import { MagneticButton } from "@/components/motion/MagneticButton";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

const fieldBase =
  "peer w-full border-b border-hairline bg-transparent pt-7 pb-3 text-[1.0625rem] text-bone outline-none transition-colors duration-300 placeholder:text-transparent hover:border-hairline-strong focus:border-ember";

const labelBase =
  "pointer-events-none absolute left-0 top-7 origin-left text-[1.0625rem] text-faint transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.75rem] peer-focus:tracking-[0.16em] peer-focus:text-ember peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.75rem] peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:uppercase";

export function ContactForm({ defaultEmail }: { defaultEmail?: string } = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="glass rounded-2xl p-10 text-center sm:p-14"
        role="status"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-ember/40 bg-ember/10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="var(--color-ember)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mb-3 text-2xl">Message received.</h3>
        <p className="text-lede mx-auto max-w-md">
          Thank you for reaching out. We read every message ourselves — expect a reply within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm text-mute underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-bone"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-9">
      {/* Honeypot */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] opacity-0">
        <label>
          Do not fill this in
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          autoComplete="name"
          error={errors.name}
          disabled={busy}
        />
        <Field
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          defaultValue={defaultEmail}
          error={errors.email}
          disabled={busy}
        />
      </div>

      <Field
        name="company"
        label="Company (optional)"
        autoComplete="organization"
        error={errors.company}
        disabled={busy}
      />

      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder=" "
          disabled={busy}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldBase} resize-none ${errors.message ? "border-red-500/60" : ""}`}
        />
        <label htmlFor="message" className={labelBase}>
          What are you building?
        </label>
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <MagneticButton type="submit" size="lg" disabled={busy}>
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
        </MagneticButton>

        <p className="text-[0.8125rem] text-faint">
          We reply within one business day.
        </p>
      </div>

      <div aria-live="assertive">
        <AnimatePresence>
          {formError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
            >
              {formError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  disabled,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder=" "
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${fieldBase} ${error ? "border-red-500/60" : ""}`}
      />
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute -bottom-6 left-0 text-[0.8125rem] text-red-400"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
