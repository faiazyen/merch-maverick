import Stripe from "stripe";
import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { appendOrderStatusEvent } from "@/lib/portal/order-events";
import {
  formatPortalStatusLabel,
  isApprovalStatus,
  isOrderStatus,
  isQuoteStatus,
  isValidOrderTransition,
  isValidQuoteTransition,
} from "@/lib/portal/workflow";

type RouteContext = {
  params: Promise<{
    recordId: string;
    recordType: string;
  }>;
};

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key ? new Stripe(key, { apiVersion: "2024-06-20" as any }) : null;
}

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
    force?: boolean;
    cancellationReason?: string;
    // Order full-edit fields (5C)
    quantity?: number;
    unitPrice?: number;
    totalValue?: number;
    catalogItemId?: string;
    expectedDeliveryDate?: string;
  };

  if (recordType === "orders") {
    const status = String(body.status ?? "");
    if (!isOrderStatus(status)) {
      return NextResponse.json({ error: "A valid order status is required." }, { status: 400 });
    }

    if (!body.force) {
      const current = await admin
        .from("orders")
        .select("status")
        .eq("id", recordId)
        .maybeSingle();
      const currentStatus = current.data?.status;
      if (currentStatus && !isValidOrderTransition(currentStatus as Parameters<typeof isValidOrderTransition>[0], status)) {
        return NextResponse.json(
          { error: `Invalid transition: ${currentStatus} → ${status}. Pass force:true to override.` },
          { status: 422 },
        );
      }
    }

    const updatedAt = new Date().toISOString();

    const orderUpdates: Record<string, unknown> = {
      status,
      status_label: formatPortalStatusLabel(status),
      updated_at: updatedAt,
    };
    if (typeof body.assignedTo === "string") orderUpdates.assigned_to = body.assignedTo || null;
    if (typeof body.internalNotes === "string") orderUpdates.internal_notes = body.internalNotes || null;
    if (status === "cancelled" && typeof body.cancellationReason === "string") {
      orderUpdates.cancellation_reason = body.cancellationReason.trim() || null;
    }
    if (typeof body.quantity === "number" && body.quantity > 0) orderUpdates.quantity = body.quantity;
    if (typeof body.unitPrice === "number" && body.unitPrice >= 0) orderUpdates.unit_price = body.unitPrice;
    if (typeof body.totalValue === "number" && body.totalValue >= 0) orderUpdates.total_amount = body.totalValue;
    if (typeof body.catalogItemId === "string") orderUpdates.catalog_item_id = body.catalogItemId || null;
    if (typeof body.expectedDeliveryDate === "string") {
      orderUpdates.expected_delivery_date = body.expectedDeliveryDate || null;
    }

    const result = await admin
      .from("orders")
      .update(orderUpdates)
      .eq("id", recordId)
      .select("id,status,status_label,user_id")
      .maybeSingle();

    if (result.error || !result.data) {
      return NextResponse.json({ error: result.error?.message ?? "Order not found." }, { status: 400 });
    }

    await appendOrderStatusEvent(admin, recordId, result.data.user_id, status);

    if (status === "shipped") {
      try {
        const orderResult = await admin
          .from("orders")
          .select("id,order_number,product_name,total_amount,currency,internal_notes,profiles:user_id(email)")
          .eq("id", recordId)
          .maybeSingle();

        if (orderResult.data) {
          const order = orderResult.data as {
            order_number: string | null;
            product_name: string | null;
            total_amount: number | null;
            currency: string | null;
            internal_notes: string | null;
            profiles?: { email?: string | null } | { email?: string | null }[] | null;
          };
          const finalAmount = Math.round((order.total_amount ?? 0) * 0.4 * 100);
          const profileRecord = Array.isArray(order.profiles) ? order.profiles[0] : order.profiles;
          const customerEmail = profileRecord?.email ?? "";

          const stripe = getStripeClient();
          if (stripe && finalAmount > 0 && customerEmail && process.env.NEXT_PUBLIC_APP_URL) {
            const finalSession = await stripe.checkout.sessions.create({
              mode: "payment",
              payment_method_types: ["card"],
              customer_email: customerEmail,
              line_items: [
                {
                  price_data: {
                    currency: (order.currency ?? "usd").toLowerCase(),
                    product_data: {
                      name: `40% Final Balance - ${order.product_name ?? "Order"}`,
                      description: `Order ${order.order_number ?? recordId} · Final payment before shipment release`,
                    },
                    unit_amount: finalAmount,
                  },
                  quantity: 1,
                },
              ],
              metadata: {
                orderId: recordId,
                orderNumber: order.order_number ?? "",
                paymentType: "final-balance",
              },
              success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/orders?payment=success`,
              cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/orders`,
            });

            const existingNotes = order.internal_notes?.trim() ?? "";
            const paymentNote = `FINAL BALANCE LINK: ${finalSession.url}`;
            const internalNotes = existingNotes ? `${existingNotes}\n${paymentNote}` : paymentNote;

            await admin.from("orders").update({ internal_notes: internalNotes }).eq("id", recordId);
          }
        }
      } catch {
        // Non-fatal — order status still updated, link can be generated manually.
      }
    }

    return NextResponse.json({ record: result.data });
  }

  if (recordType === "quotes") {
    const status = String(body.status ?? "");
    if (!isQuoteStatus(status)) {
      return NextResponse.json({ error: "A valid quote status is required." }, { status: 400 });
    }

    if (!body.force) {
      const current = await admin
        .from("quote_requests")
        .select("status")
        .eq("id", recordId)
        .maybeSingle();
      const currentStatus = current.data?.status;
      if (currentStatus && !isValidQuoteTransition(currentStatus as Parameters<typeof isValidQuoteTransition>[0], status)) {
        return NextResponse.json(
          { error: `Invalid transition: ${currentStatus} → ${status}. Pass force:true to override.` },
          { status: 422 },
        );
      }
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
