import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const quoteId = crypto.randomUUID();

  const quotePayload = {
    id: quoteId,
    user_id: user.id,
    title: body.title,
    category: body.category,
    product_name: body.productName,
    quantity: body.quantity,
    decoration_method: body.decorationMethod,
    rush: body.rush,
    unit_price_min: body.unitPriceMin,
    unit_price_max: body.unitPriceMax,
    total_min: body.totalMin,
    total_max: body.totalMax,
    lead_time: body.leadTime,
    destination: body.destination,
    shipping_method: body.shippingMethod,
    notes: body.notes,
    status: body.status,
    created_at: new Date().toISOString(),
  };

  const quoteResult = await supabase.from("quote_requests").insert(quotePayload);
  if (quoteResult.error) {
    return NextResponse.json({ error: quoteResult.error.message }, { status: 400 });
  }

  const selectedAssetNames = Array.isArray(body.selectedAssetNames)
    ? body.selectedAssetNames.map((name: unknown) => String(name))
    : [];

  if (selectedAssetNames.length > 0) {
    const assetRows = selectedAssetNames.map((name: string) => ({
      id: crypto.randomUUID(),
      user_id: user.id,
      name,
      type: name.split(".").pop()?.toUpperCase() ?? "FILE",
      size_label: "Linked asset",
      linked_to: "quote",
      linked_id: quoteId,
      status: "ready",
      created_at: new Date().toISOString(),
    }));

    await supabase.from("brand_assets").insert(assetRows);
  }

  return NextResponse.json({ ok: true, quoteId });
}
