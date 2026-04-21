import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapCatalogItems } from "@/lib/portal/record-mappers";

type RouteContext = { params: Promise<{ itemId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;

  const updates: Record<string, unknown> = {};

  if (typeof body.title === "string") updates.title = body.title.trim();
  if (typeof body.slug === "string") updates.slug = body.slug.trim();
  if (typeof body.sku === "string") updates.sku = body.sku.trim();
  if (typeof body.category === "string") updates.category = body.category.trim();
  if (typeof body.subcategory === "string") updates.subcategory = body.subcategory.trim();
  if (typeof body.description === "string") updates.description = body.description.trim();
  if (typeof body.material === "string") updates.material = body.material.trim();
  if (typeof body.colorFamily === "string") updates.color_family = body.colorFamily.trim();
  if (typeof body.minPrice === "number") updates.min_price = body.minPrice;
  if (typeof body.maxPrice === "number") updates.max_price = body.maxPrice;
  if (typeof body.image === "string") updates.image = body.image;
  if (body.badge !== undefined) updates.badge = body.badge ? String(body.badge) : null;
  if (typeof body.moq === "number") updates.moq = body.moq;
  if (typeof body.leadTimeDays === "number") updates.lead_time_days = body.leadTimeDays;
  if (typeof body.leadTimeLabel === "string") updates.lead_time_label = body.leadTimeLabel.trim();
  if (Array.isArray(body.decorationMethods))
    updates.decoration_methods = body.decorationMethods.map(String);
  if (Array.isArray(body.variants)) updates.variants = body.variants.map(String);
  // Sprint 4 fields
  if (body.categoryId !== undefined) updates.category_id = body.categoryId || null;
  const validPricingTypes = ["range", "fixed", "sale"];
  if (typeof body.pricingType === "string" && validPricingTypes.includes(body.pricingType))
    updates.pricing_type = body.pricingType;
  if (typeof body.salePrice === "number") updates.sale_price = body.salePrice;
  if (typeof body.compareAtPrice === "number") updates.compare_at_price = body.compareAtPrice;
  if (Array.isArray(body.labels)) updates.labels = body.labels.map(String);
  if (typeof body.supportsDirectOrder === "boolean") updates.supports_direct_order = body.supportsDirectOrder;
  if (typeof body.isActive === "boolean") updates.is_active = body.isActive;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const result = await admin
    .from("catalog_items")
    .update(updates)
    .eq("id", itemId)
    .select("*")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: result.error?.message ?? "Item not found." },
      { status: 400 },
    );
  }

  return NextResponse.json({ item: mapCatalogItems([result.data])[0] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId } = await context.params;

  const result = await admin
    .from("catalog_items")
    .delete()
    .eq("id", itemId)
    .select("id")
    .maybeSingle();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ deleted: true });
}
