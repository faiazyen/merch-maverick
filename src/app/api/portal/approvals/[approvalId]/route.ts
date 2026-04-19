import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    approvalId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { approvalId } = await context.params;
  const body = (await request.json()) as { status?: string; notes?: string };
  const status =
    body.status === "approved" || body.status === "changes-requested" ? body.status : undefined;

  if (!status) {
    return NextResponse.json({ error: "A valid approval action is required." }, { status: 400 });
  }

  const result = await supabase
    .from("approvals")
    .update({
      status,
      notes: typeof body.notes === "string" ? body.notes || null : undefined,
      resolved_at: new Date().toISOString(),
    })
    .eq("id", approvalId)
    .eq("user_id", user.id)
    .select("id,status")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json({ error: result.error?.message ?? "Approval not found." }, { status: 400 });
  }

  return NextResponse.json({ approval: result.data });
}
