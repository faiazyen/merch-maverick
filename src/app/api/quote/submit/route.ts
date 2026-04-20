import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    category,
    product,
    quantity,
    decoration,
    isRush,
    name,
    email,
    company,
    phone,
    message,
    unitPriceMin,
    unitPriceMax,
    totalMin,
    totalMax,
    leadTime,
  } = body as {
    category: string;
    product: string;
    quantity: number;
    decoration: string;
    isRush: boolean;
    name: string;
    email: string;
    company: string;
    phone?: string;
    message?: string;
    unitPriceMin: number;
    unitPriceMax: number;
    totalMin: number;
    totalMax: number;
    leadTime: string;
  };

  if (
    !name || typeof name !== "string" || !name.trim() ||
    !email || typeof email !== "string" || !email.trim() ||
    !company || typeof company !== "string" || !company.trim() ||
    !category || typeof category !== "string" || !category.trim() ||
    !product || typeof product !== "string" || !product.trim()
  ) {
    return NextResponse.json({ error: "Name, email, company, category, and product are required." }, { status: 400 });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return NextResponse.json({ error: "Quantity must be a positive integer." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const notes = [
    "Guest lead",
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    "Client notes:",
    message || "None",
  ].join("\n");

  const now = new Date().toISOString();

  const { data, error } = await admin
    .from("quote_requests")
    .insert({
      id: crypto.randomUUID(),
      user_id: null,
      title: `${company} — ${product}`,
      category,
      product_name: product,
      quantity,
      decoration_method: decoration,
      rush: Boolean(isRush),
      unit_price_min: unitPriceMin ?? 0,
      unit_price_max: unitPriceMax ?? 0,
      total_min: totalMin ?? 0,
      total_max: totalMax ?? 0,
      lead_time: leadTime ?? "",
      destination: "",
      shipping_method: "",
      notes,
      status: "submitted",
      created_at: now,
      updated_at: now,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Quote insert error:", error);
    return NextResponse.json({ error: "Unable to submit quote. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, quoteId: data.id }, { status: 201 });
}
