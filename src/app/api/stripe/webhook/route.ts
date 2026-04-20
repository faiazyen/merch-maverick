import Stripe from "stripe";
import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" as any });

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      {
        error: `Webhook signature verification failed: ${
          err instanceof Error ? err.message : "unknown"
        }`,
      },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { orderId, paymentType } = session.metadata ?? {};

    if (!orderId) {
      return NextResponse.json({ error: "No orderId in metadata." }, { status: 400 });
    }

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json({ error: "Admin client unavailable." }, { status: 503 });
    }

    const now = new Date().toISOString();

    if (paymentType === "deposit") {
      await admin.from("orders").update({ status: "confirmed", updated_at: now }).eq("id", orderId);
      await admin.from("order_events").insert({
        id: crypto.randomUUID(),
        order_id: orderId,
        label: "Deposit received",
        description: "60% production deposit confirmed. Factory slot is secured.",
        state: "done",
        created_at: now,
      });
    }

    if (paymentType === "final-balance") {
      await admin.from("orders").update({ status: "delivered", updated_at: now }).eq("id", orderId);
      await admin.from("order_events").insert({
        id: crypto.randomUUID(),
        order_id: orderId,
        label: "Final balance received",
        description: "Remaining 40% balance confirmed. Shipment is released.",
        state: "done",
        created_at: now,
      });
    }
  }

  return NextResponse.json({ received: true });
}
