import { NextResponse } from "next/server";

import { formatPortalStatusLabel } from "@/lib/portal/record-mappers";
import { getPortalSessionUser, isInternalUser } from "@/lib/portal/data";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    recordId: string;
    recordType: string;
  }>;
};

const internalRoutesEnabled = process.env.ENABLE_INTERNAL_ROUTES === "true";

export async function PATCH(request: Request, context: RouteContext) {
  if (!internalRoutesEnabled) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const user = await getPortalSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const allowed = await isInternalUser();
  if (!allowed) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin access is required for internal CRM actions." },
      { status: 503 }
    );
  }

  const { recordId, recordType } = await context.params;
  const body = (await request.json()) as { status?: string };
  const status = typeof body.status === "string" ? body.status : "";

  if (!status) {
    return NextResponse.json({ error: "A status value is required." }, { status: 400 });
  }

  if (recordType === "orders") {
    const result = await admin
      .from("orders")
      .update({
        status,
        status_label: formatPortalStatusLabel(status),
      })
      .eq("id", recordId)
      .select("id,status,status_label")
      .maybeSingle();

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error?.message ?? "Order not found." }, { status: 400 });
    }

    return NextResponse.json({ record: result.data });
  }

  if (recordType === "quotes") {
    const result = await admin
      .from("quote_requests")
      .update({ status })
      .eq("id", recordId)
      .select("id,status")
      .maybeSingle();

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error?.message ?? "Quote not found." }, { status: 400 });
    }

    return NextResponse.json({ record: result.data });
  }

  if (recordType === "approvals") {
    const result = await admin
      .from("approvals")
      .update({ status })
      .eq("id", recordId)
      .select("id,status")
      .maybeSingle();

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error?.message ?? "Approval not found." }, { status: 400 });
    }

    return NextResponse.json({ record: result.data });
  }

  return NextResponse.json({ error: "Unsupported record type." }, { status: 400 });
}
