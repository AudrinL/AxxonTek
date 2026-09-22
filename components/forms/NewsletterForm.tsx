"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * One field, one button, one promise. The status lives in a polite live
 * region so a screen reader hears the outcome without the focus moving.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error ?? "That did not go through. Try again in a moment.");
        return;
      }

      setStatus("success");
      setMessage("You are on the list. Nothing but occasional engineering notes.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  const busy = status === "submitting";

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="flex max-w-sm gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          disabled={busy}
          placeholder="you@company.com"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-full border border-line-firm bg-[color-mix(in_srgb,var(--c-ink)_4%,transparent)] px-5 py-3 text-[0.9375rem] text-tone outline-none transition-colors duration-[var(--t-base)] placeholder:text-tone-faint hover:border-tone-faint focus:border-ember disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          className="pill pill-ember h-auto px-6 py-3 text-sm hover:bg-ember-deep disabled:opacity-60"
        >
          {busy ? "Sending" : "Subscribe"}
        </button>
      </form>

      <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-[0.8125rem]">
        {message && (
          <span className={status === "error" ? "text-red-500" : "text-moss"}>
            {message}
          </span>
        )}
      </p>
    </div>
  );
}
