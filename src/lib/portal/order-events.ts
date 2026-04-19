import type { SupabaseClient } from "@supabase/supabase-js";

import type { OrderStatus } from "@/lib/portal/types";
import { buildOrderEventDescription, buildOrderEventLabel } from "@/lib/portal/workflow";

type AdminClient = SupabaseClient;

export async function settleCurrentOrderEvents(admin: AdminClient, orderId: string) {
  await admin
    .from("order_events")
    .update({ state: "done" })
    .eq("order_id", orderId)
    .eq("state", "current");
}

export async function appendOrderStatusEvent(
  admin: AdminClient,
  orderId: string,
  userId: string,
  status: OrderStatus
) {
  await settleCurrentOrderEvents(admin, orderId);

  return admin.from("order_events").insert({
    id: crypto.randomUUID(),
    order_id: orderId,
    user_id: userId,
    label: buildOrderEventLabel(status),
    description: buildOrderEventDescription(status),
    state: status === "delivered" ? "done" : "current",
    internal_only: false,
    created_at: new Date().toISOString(),
  });
}

export async function appendManualOrderEvent(
  admin: AdminClient,
  orderId: string,
  userId: string,
  label: string,
  description: string,
  state: "done" | "current" | "upcoming"
) {
  if (state === "current") {
    await settleCurrentOrderEvents(admin, orderId);
  }

  await admin.from("order_events").insert({
    id: crypto.randomUUID(),
    order_id: orderId,
    user_id: userId,
    label,
    description,
    state,
    internal_only: false,
    created_at: new Date().toISOString(),
  });
}
