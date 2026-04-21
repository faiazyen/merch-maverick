import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapProductVariants } from "@/lib/portal/record-mappers";

type RouteContext = { params: Promise<{ itemId: string; variantId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId, variantId } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;

  const updates: Record<string, unknown> = {};
  if (typeof body.label === "string") updates.label = body.label.trim();
  if (body.value !== undefined) updates.value = body.value ? String(body.value) : null;
  if (typeof body.displayOrder === "number") updates.display_order = body.displayOrder;
  if (typeof body.isAvailable === "boolean") updates.is_available = body.isAvailable;
  if (typeof body.type === "string" && (body.type === "color" || body.type === "size")) {
    updates.type = body.type;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const result = await admin
    .from("catalog_product_variants")
    .update(updates)
    .eq("id", variantId)
    .eq("item_id", itemId)
    .select("*")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: result.error?.message ?? "Variant not found." },
      { status: 400 },
    );
  }

  return NextResponse.json({ variant: mapProductVariants([result.data])[0] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId, variantId } = await context.params;

  const result = await admin
    .from("catalog_product_variants")
    .delete()
    .eq("id", variantId)
    .eq("item_id", itemId)
    .select("id")
    .maybeSingle();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ deleted: true });
}
