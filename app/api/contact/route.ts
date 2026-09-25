import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { parseContact, type ContactPayload } from "@/lib/validation";
import { log } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact submissions.
 *
 * The chosen intent and any Studio concept are first-class: they are stored
 * in their own columns when the schema has them, and folded into the message
 * as a fallback when it does not, so the qualifying context is never lost on
 * an older database. Every outcome is logged as one structured line.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: real people never fill this field in.
  const website = (body as Record<string, unknown>)?.website;
  if (typeof website === "string" && website !== "") {
    log.info("contact.honeypot");
    return NextResponse.json({ ok: true });
  }

  const parsed = parseContact(body);
  if ("errors" in parsed) {
    return NextResponse.json({ errors: parsed.errors }, { status: 422 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    log.warn("contact.not_configured");
    return NextResponse.json(
      {
        error:
          "The contact form is not connected yet. Please email us directly and we will get right back to you.",
      },
      { status: 503 },
    );
  }

  const { data } = parsed;

  // Preferred insert: interest and concept in their own columns.
  const full = await supabase.from("contact_submissions").insert({
    name: data.name,
    email: data.email,
    company: data.company,
    message: data.message,
    interest: data.interest,
    concept: data.concept,
  });

  if (!full.error) {
    log.info("contact.saved", { interest: data.interest, concept: data.concept ?? null });
    return NextResponse.json({ ok: true });
  }

  // The columns may not exist on an older schema. PostgREST reports this as
  // an undefined-column error; fall back to folding the context into the
  // message so the lead is never dropped, and flag that a migration is due.
  if (isMissingColumn(full.error)) {
    log.warn("contact.schema_fallback", { detail: full.error.message });
    const fallback = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      message: withContext(data),
    });
    if (!fallback.error) {
      log.info("contact.saved", { interest: data.interest, concept: data.concept ?? null, fallback: true });
      return NextResponse.json({ ok: true });
    }
    log.error("contact.insert_failed", { detail: fallback.error.message });
    return NextResponse.json(
      { error: "We could not save your message. Please try again in a moment." },
      { status: 502 },
    );
  }

  log.error("contact.insert_failed", { detail: full.error.message });
  return NextResponse.json(
    { error: "We could not save your message. Please try again in a moment." },
    { status: 502 },
  );
}

/** Prepend the intent and concept to the message when they have no column. */
function withContext(data: ContactPayload): string {
  const header = [`Interest: ${data.interest}`, data.concept ? `Studio concept: ${data.concept}` : null]
    .filter(Boolean)
    .join("\n");
  return `${header}\n\n${data.message}`;
}

/** Postgres 42703 / PostgREST PGRST204 both mean a column is not there. */
function isMissingColumn(error: { code?: string; message?: string }): boolean {
  return (
    error.code === "42703" ||
    error.code === "PGRST204" ||
    /column .* does not exist/i.test(error.message ?? "")
  );
}
