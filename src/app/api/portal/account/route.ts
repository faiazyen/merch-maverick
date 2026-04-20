import { NextRequest, NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const { full_name, business_name, phone, country } = body;

  if (!full_name || typeof full_name !== "string" || !full_name.trim()) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!business_name || typeof business_name !== "string" || !business_name.trim()) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }

  const { error: upsertError } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: full_name.trim(),
    business_name: business_name.trim(),
    phone: typeof phone === "string" ? phone.trim() || null : null,
    country: typeof country === "string" ? country.trim() || null : null,
    updated_at: new Date().toISOString(),
  });

  if (upsertError) {
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
