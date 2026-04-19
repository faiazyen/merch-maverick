import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { formatPortalStatusLabel, isOrderEventState } from "@/lib/portal/workflow";

type RouteContext = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { orderId } = await context.params;
  const body = (await request.json()) as {
    label?: string;
    description?: string;
    state?: string;
  };

  const label = String(body.label ?? "").trim();
  const description = String(body.description ?? "").trim();
  const state = String(body.state ?? "current");

  if (!label) {
    return NextResponse.json({ error: "Event label is required." }, { status: 400 });
  }

  if (!isOrderEventState(state)) {
    return NextResponse.json({ error: "A valid event state is required." }, { status: 400 });
  }

  const orderResult = await admin.from("orders").select("user_id,status").eq("id", orderId).maybeSingle();
  if (orderResult.error || !orderResult.data) {
    return NextResponse.json({ error: orderResult.error?.message ?? "Order not found." }, { status: 404 });
  }

  const result = await admin
    .from("order_events")
    .insert({
      id: crypto.randomUUID(),
      order_id: orderId,
      user_id: orderResult.data.user_id,
      label,
      description: description || `Milestone logged while order is ${formatPortalStatusLabel(orderResult.data.status)}`,
      state,
      internal_only: false,
      created_at: new Date().toISOString(),
    })
    .select("*")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json({ error: result.error?.message ?? "Unable to create order event." }, { status: 400 });
  }

  return NextResponse.json({ event: result.data });
}
