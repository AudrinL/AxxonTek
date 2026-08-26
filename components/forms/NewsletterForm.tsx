"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { easeOutExpo } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const data = await response.json().catch(() => ({}));

      // A response is not a success - check it.
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data.alreadySubscribed
          ? "You are already on the list — thank you."
          : "You are on the list. Welcome aboard.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div
        className={`group relative flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors duration-300 ${
          status === "error"
            ? "border-red-500/50"
            : "border-hairline focus-within:border-ember/60 hover:border-hairline-strong"
        }`}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@company.com"
          disabled={busy || status === "success"}
          className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-bone outline-none placeholder:text-faint disabled:opacity-60"
        />

        {/* Honeypot - visually hidden, never focusable, ignored by real users. */}
        <div aria-hidden className="pointer-events-none absolute left-[-9999px] opacity-0">
          <label>
            Do not fill this in
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={busy || status === "success"}
          className="relative h-10 shrink-0 overflow-hidden rounded-full bg-ember px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-ember-soft disabled:opacity-70"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              className="flex items-center gap-2"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.28, ease: easeOutExpo }}
            >
              {status === "submitting" && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/40 border-t-white" />
              )}
              {status === "submitting"
                ? "Sending"
                : status === "success"
                  ? "Done"
                  : "Subscribe"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <div aria-live="polite" className="min-h-6 px-5 pt-2.5">
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
              className={`text-[0.8125rem] ${
                status === "error" ? "text-red-400" : "text-ember-soft"
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
