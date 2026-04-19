import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import {
  buildOrderEventDescription,
  buildOrderEventLabel,
  formatPortalStatusLabel,
  isApprovalStatus,
  isOrderStatus,
  isQuoteStatus,
} from "@/lib/portal/workflow";

type RouteContext = {
  params: Promise<{
    recordId: string;
    recordType: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { recordId, recordType } = await context.params;
  const body = (await request.json()) as {
    status?: string;
    assignedTo?: string;
    internalNotes?: string;
    totalMin?: number;
    totalMax?: number;
  };

  if (recordType === "orders") {
    const status = String(body.status ?? "");
    if (!isOrderStatus(status)) {
      return NextResponse.json({ error: "A valid order status is required." }, { status: 400 });
    }

    const result = await admin
      .from("orders")
      .update({
        status,
        status_label: formatPortalStatusLabel(status),
        assigned_to: typeof body.assignedTo === "string" ? body.assignedTo || null : undefined,
        internal_notes: typeof body.internalNotes === "string" ? body.internalNotes || null : undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recordId)
      .select("id,status,status_label,user_id")
      .maybeSingle();

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error?.message ?? "Order not found." }, { status: 400 });
    }

    await admin.from("order_events").insert({
      id: crypto.randomUUID(),
      order_id: recordId,
      user_id: result.data.user_id,
      label: buildOrderEventLabel(status),
      description: buildOrderEventDescription(status),
      state: status === "delivered" ? "done" : "current",
      internal_only: false,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ record: result.data });
  }

  if (recordType === "quotes") {
    const status = String(body.status ?? "");
    if (!isQuoteStatus(status)) {
      return NextResponse.json({ error: "A valid quote status is required." }, { status: 400 });
    }

    const updates: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (typeof body.assignedTo === "string") {
      updates.assigned_to = body.assignedTo || null;
    }

    if (typeof body.internalNotes === "string") {
      updates.internal_notes = body.internalNotes || null;
    }

    if (typeof body.totalMin === "number" && Number.isFinite(body.totalMin)) {
      updates.total_min = body.totalMin;
    }

    if (typeof body.totalMax === "number" && Number.isFinite(body.totalMax)) {
      updates.total_max = body.totalMax;
    }

    const result = await admin
      .from("quote_requests")
      .update(updates)
      .eq("id", recordId)
      .select("id,status,assigned_to")
      .maybeSingle();

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error?.message ?? "Quote not found." }, { status: 400 });
    }

    return NextResponse.json({ record: result.data });
  }

  if (recordType === "approvals") {
    const status = String(body.status ?? "");
    if (!isApprovalStatus(status)) {
      return NextResponse.json({ error: "A valid approval status is required." }, { status: 400 });
    }

    const result = await admin
      .from("approvals")
      .update({
        status,
        notes: typeof body.internalNotes === "string" ? body.internalNotes || null : undefined,
        resolved_at: status === "pending" ? null : new Date().toISOString(),
      })
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
