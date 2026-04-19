import { NextResponse } from "next/server";

import { validateQuotePayload } from "@/lib/portal/catalog";
import { formatPortalStatusLabel } from "@/lib/portal/workflow";
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

  const body = (await request.json()) as Record<string, unknown>;
  const validated = await validateQuotePayload(body);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const quoteId = crypto.randomUUID();
  const { item, calculated, payload } = validated;

  const quotePayload = {
    id: quoteId,
    user_id: user.id,
    catalog_item_id: item.id,
    title: `${user.user_metadata.business_name ?? "Client"} ${item.title} ${payload.status === "draft" ? "draft" : "estimate"}`,
    category: item.category,
    product_name: item.title,
    quantity: payload.quantity,
    decoration_method: payload.decorationMethod,
    rush: payload.rush,
    unit_price_min: calculated.unitPriceMin,
    unit_price_max: calculated.unitPriceMax,
    total_min: calculated.totalMin,
    total_max: calculated.totalMax,
    lead_time: calculated.leadTime,
    destination: payload.destination,
    shipping_method: payload.shippingMethod,
    notes: payload.notes,
    status: payload.status,
    linked_asset_ids: payload.selectedAssetIds,
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  const quoteResult = await supabase.from("quote_requests").insert(quotePayload);
  if (quoteResult.error) {
    return NextResponse.json({ error: quoteResult.error.message }, { status: 400 });
  }

  if (payload.status === "submitted") {
    const approvalResult = await supabase.from("approvals").insert({
      id: crypto.randomUUID(),
      user_id: user.id,
      title: `Review quote for ${item.title}`,
      status: "pending",
      due_label: `Awaiting operations review · ${calculated.leadTime}`,
      linked_record_type: "quote",
      linked_record_id: quoteId,
      notes: `Ops should review pricing, decoration, and delivery expectations for ${item.title}.`,
      created_at: new Date().toISOString(),
    });

    if (approvalResult.error) {
      return NextResponse.json({ error: approvalResult.error.message }, { status: 400 });
    }
  }

  if (payload.selectedAssetIds.length > 0) {
    await supabase
      .from("brand_assets")
      .update({
        linked_to: "quote",
        linked_id: quoteId,
      })
      .in("id", payload.selectedAssetIds)
      .eq("user_id", user.id);
  }

  return NextResponse.json({
    ok: true,
    quoteId,
    statusLabel: formatPortalStatusLabel(payload.status),
  });
}
