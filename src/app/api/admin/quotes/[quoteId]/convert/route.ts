import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { appendManualOrderEvent } from "@/lib/portal/order-events";
import { formatPortalStatusLabel } from "@/lib/portal/workflow";

type RouteContext = {
  params: Promise<{
    quoteId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { quoteId } = await context.params;

  const quoteResult = await admin
    .from("quote_requests")
    .select("*")
    .eq("id", quoteId)
    .maybeSingle();

  if (quoteResult.error || !quoteResult.data) {
    return NextResponse.json({ error: quoteResult.error?.message ?? "Quote not found." }, { status: 404 });
  }

  const quote = quoteResult.data;
  const orderId = crypto.randomUUID();
  const orderNumber = `MM-${String(Date.now()).slice(-6)}`;
  const now = new Date().toISOString();

  const orderInsert = await admin
    .from("orders")
    .insert({
      id: orderId,
      user_id: quote.user_id,
      order_number: orderNumber,
      product_name: quote.product_name,
      category: quote.category,
      quantity: quote.quantity,
      total_amount: quote.total_max ?? 0,
      currency: "USD",
      status: "confirmed",
      status_label: formatPortalStatusLabel("confirmed"),
      delivery_date: null,
      source_quote_id: quoteId,
      reorder_quote_id: quoteId,
      assigned_to: quote.assigned_to ?? null,
      internal_notes: quote.internal_notes ?? null,
      updated_at: now,
      created_at: now,
    })
    .select("id,order_number")
    .maybeSingle();

  if (orderInsert.error || !orderInsert.data) {
    return NextResponse.json({ error: orderInsert.error?.message ?? "Unable to create order." }, { status: 400 });
  }

  let customerEmail = "";
  if (quote.user_id) {
    const profileResult = await admin
      .from("profiles")
      .select("email")
      .eq("id", quote.user_id)
      .maybeSingle();
    customerEmail = profileResult.data?.email ?? "";
  } else {
    customerEmail = quote.notes?.match(/Email:\s*([^\n]+)/)?.[1]?.trim() ?? "";
  }

  let paymentUrl: string | null = null;
  if (customerEmail) {
    try {
      const checkoutRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") ?? "",
        },
        body: JSON.stringify({
          orderId,
          orderNumber: orderInsert.data.order_number,
          productName: quote.product_name,
          quantity: quote.quantity,
          totalAmount: quote.total_max ?? 0,
          currency: "usd",
          customerEmail,
        }),
      });
      if (checkoutRes.ok) {
        const checkoutData = (await checkoutRes.json()) as { url?: string };
        paymentUrl = checkoutData.url ?? null;
      }
    } catch {
      // Non-fatal — order still created, payment link can be generated manually.
    }
  }

  if (paymentUrl) {
    const existingNotes = typeof quote.internal_notes === "string" ? quote.internal_notes : "";
    const paymentNote = `DEPOSIT LINK: ${paymentUrl}`;
    const internalNotes = existingNotes ? `${existingNotes}\n${paymentNote}` : paymentNote;

    await admin.from("orders").update({ internal_notes: internalNotes }).eq("id", orderId);
  }

  const updateQuote = await admin
    .from("quote_requests")
    .update({
      status: "converted",
      converted_order_id: orderId,
      updated_at: now,
    })
    .eq("id", quoteId);

  if (updateQuote.error) {
    return NextResponse.json({ error: updateQuote.error.message }, { status: 400 });
  }

  await admin.from("approvals").update({ linked_record_type: "order", linked_record_id: orderId }).eq("linked_record_id", quoteId);

  await admin.from("brand_assets").update({ linked_to: "order", linked_id: orderId }).eq("linked_id", quoteId);

  await appendManualOrderEvent(
    admin,
    orderId,
    quote.user_id,
    "Order confirmed",
    "Quote converted into an active production order.",
    "done"
  );

  await appendManualOrderEvent(
    admin,
    orderId,
    quote.user_id,
    "Production scheduling",
    "Operations is assigning factory timing and material reservations.",
    "current"
  );

  return NextResponse.json({
    ok: true,
    orderId,
    orderNumber: orderInsert.data.order_number,
    paymentUrl,
  });
}
