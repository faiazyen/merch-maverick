import { NextResponse } from "next/server";

import { getPortalSessionUser } from "@/lib/portal/data";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type OnboardingAnswers = {
  teamSize?: string;
  businessType?: string;
  orderFrequency?: string;
  brandAssets?: string;
  interests?: string[];
};

export async function PATCH(request: Request) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const user = await getPortalSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    step?: number;
    answers?: OnboardingAnswers;
    completed?: boolean;
  };

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (typeof body.step === "number") {
    updates.onboarding_step = body.step;
  }

  if (body.completed === true) {
    updates.onboarding_completed = true;
  }

  // Map answers to profile columns
  const ans = body.answers ?? {};
  if (ans.businessType) updates.industry = ans.businessType;
  if (ans.interests) updates.preferred_categories = ans.interests;
  if (ans.teamSize) {
    updates.estimated_order_volume = ans.teamSize;
  }

  const result = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select("id, onboarding_completed, onboarding_step")
    .maybeSingle();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, profile: result.data });
}
