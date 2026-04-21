import Stripe from "stripe";
import { NextResponse } from "next/server";

import { getPortalSessionUser } from "@/lib/portal/data";
import { getCatalogItemById } from "@/lib/portal/catalog";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key ? new Stripe(key, { apiVersion: "2024-06-20" as any }) : null;
}

function buildOrderNumber(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `MM-${yy}${mm}-D${rand}`;
}

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const user = await getPortalSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    catalogItemId?: string;
    variantIds?: string[];
    quantity?: number;
  };

  const catalogItemId = String(body.catalogItemId ?? "").trim();
  const quantity = Number(body.quantity ?? 0);
  const variantIds = Array.isArray(body.variantIds) ? body.variantIds.map(String) : [];

  if (!catalogItemId) {
    return NextResponse.json({ error: "catalogItemId is required." }, { status: 400 });
  }

  const item = await getCatalogItemById(catalogItemId);
  if (!item) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (!item.supportsDirectOrder) {
    return NextResponse.json({ error: "This product does not support direct ordering." }, { status: 400 });
  }

  if (!Number.isFinite(quantity) || quantity < item.moq) {
    return NextResponse.json({ error: `Minimum order quantity is ${item.moq} units.` }, { status: 400 });
  }

  // Determine unit price from pricing type
  const unitPrice = (() => {
    if (item.pricingType === "sale" && item.salePrice > 0) return item.salePrice;
    if (item.pricingType === "fixed") return item.minPrice;
    return item.minPrice; // range — use min as base
  })();

  const totalAmount = unitPrice * quantity;
  const depositAmount = Math.round(totalAmount * 0.6 * 100); // 60% deposit in cents
  const orderNumber = buildOrderNumber();
  const now = new Date().toISOString();

  // Create order record
  const orderInsert = await supabase.from("orders").insert({
    user_id: user.id,
    order_number: orderNumber,
    product_name: item.title,
    category: item.category,
    quantity,
    total_amount: totalAmount,
    currency: "usd",
    status: "confirmed",
    status_label: "Payment Pending",
    order_source: "direct_order",
    catalog_item_id: catalogItemId,
    variant_ids: variantIds,
    unit_price: unitPrice,
    delivery_date: new Date(Date.now() + item.leadTimeDays * 24 * 60 * 60 * 1000).toISOString(),
    created_at: now,
    updated_at: now,
  }).select("id").single();

  if (orderInsert.error || !orderInsert.data) {
    return NextResponse.json({ error: orderInsert.error?.message ?? "Failed to create order." }, { status: 500 });
  }

  const orderId = orderInsert.data.id as string;

  // Seed initial order events
  await supabase.from("order_events").insert([
    {
      order_id: orderId,
      label: "Order placed",
      description: `Direct order for ${quantity} × ${item.title}. Awaiting deposit payment.`,
      state: "current",
      created_at: now,
    },
    {
      order_id: orderId,
      label: "Production scheduling",
      description: "Order will enter production once deposit payment is confirmed.",
      state: "upcoming",
      created_at: now,
    },
  ]);

  // Create Stripe checkout session for 60% deposit
  const stripe = getStripeClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  if (!stripe || !appUrl || depositAmount <= 0) {
    return NextResponse.json({
      ok: true,
      orderId,
      orderNumber,
      checkoutUrl: null,
      message: "Order created — Stripe not configured. Please complete payment manually.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `60% Deposit — ${item.title}`,
              description: `Order ${orderNumber} · Qty ${quantity} · Direct order`,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId,
        orderNumber,
        paymentType: "direct-order",
      },
      success_url: `${appUrl}/portal/orders?payment=success`,
      cancel_url: `${appUrl}/portal/order/${catalogItemId}?cancelled=true`,
    });

    // Store checkout URL in order internal notes for reference
    await supabase.from("orders").update({
      internal_notes: `DEPOSIT CHECKOUT: ${session.url}`,
    }).eq("id", orderId);

    return NextResponse.json({ ok: true, orderId, orderNumber, checkoutUrl: session.url });
  } catch (err) {
    return NextResponse.json({
      ok: true,
      orderId,
      orderNumber,
      checkoutUrl: null,
      message: "Order created but Stripe checkout failed. Please contact support.",
    });
  }
}
