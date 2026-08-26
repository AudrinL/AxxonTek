import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { parseContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: real people never fill this field in.
  if (typeof (body as Record<string, unknown>)?.website === "string" && (body as Record<string, string>).website !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseContact(body);
  if ("errors" in parsed) {
    return NextResponse.json({ errors: parsed.errors }, { status: 422 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "The contact form is not connected yet. Please email us directly and we will get right back to you.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    message: parsed.data.message,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json(
      { error: "We could not save your message. Please try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
