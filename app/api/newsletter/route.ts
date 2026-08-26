import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isEmail } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot
  if (typeof raw.website === "string" && raw.website !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!isEmail(raw.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const email = String(raw.email).trim().toLowerCase();

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Subscriptions are not connected yet. Please check back shortly." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error) {
    // 23505 = unique violation. Already subscribed is a success from the visitor's side.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error("[newsletter] insert failed:", error.message);
    return NextResponse.json(
      { error: "We could not sign you up. Please try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
