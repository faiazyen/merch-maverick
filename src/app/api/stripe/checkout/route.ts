import Stripe from "stripe";
import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return key ? new Stripe(key, { apiVersion: "2024-06-20" as any }) : null;
}

type CheckoutPayload = {
  orderId?: string;
  orderNumber?: string;
  productName?: string;
  quantity?: number;
  totalAmount?: number;
  currency?: string;
  customerEmail?: string;
};

export async function POST(request: Request) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = (await request.json()) as CheckoutPayload;

  const orderId = String(body.orderId ?? "").trim();
  const orderNumber = String(body.orderNumber ?? "").trim();
  const productName = String(body.productName ?? "").trim();
  const quantity = Number(body.quantity);
  const totalAmount = Number(body.totalAmount);
  const currency = String(body.currency ?? "").trim();
  const customerEmail = String(body.customerEmail ?? "").trim();

  if (
    !orderId ||
    !orderNumber ||
    !productName ||
    !Number.isFinite(quantity) ||
    quantity <= 0 ||
    !Number.isFinite(totalAmount) ||
    totalAmount <= 0 ||
    !currency ||
    !customerEmail
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const stripe = getStripeClient();
  if (!stripe || !process.env.NEXT_PUBLIC_APP_URL) {
    return NextResponse.json(
      { error: "Stripe is not configured. Missing STRIPE_SECRET_KEY or NEXT_PUBLIC_APP_URL." },
      { status: 500 }
    );
  }

  try {
    const depositAmount = Math.round(totalAmount * 0.6 * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `60% Production Deposit - ${productName}`,
              description: `Order ${orderNumber} · ${quantity} units · Merch Maverick`,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId,
        orderNumber,
        paymentType: "deposit",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/orders?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/orders`,
    });

    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe Checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
