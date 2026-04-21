import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapProductVariants } from "@/lib/portal/record-mappers";

type RouteContext = { params: Promise<{ itemId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId } = await context.params;

  const result = await admin
    .from("catalog_product_variants")
    .select("*")
    .eq("item_id", itemId)
    .order("display_order", { ascending: true });

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ variants: mapProductVariants(result.data ?? []) });
}

export async function POST(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;

  // Reorder: { reorder: [{id, displayOrder}] }
  if (Array.isArray(body.reorder)) {
    const updates = body.reorder as { id: string; displayOrder: number }[];
    await Promise.all(
      updates.map(({ id, displayOrder }) =>
        admin
          .from("catalog_product_variants")
          .update({ display_order: displayOrder })
          .eq("id", id)
          .eq("item_id", itemId)
      )
    );
    return NextResponse.json({ reordered: true });
  }

  const type = String(body.type ?? "color");
  if (type !== "color" && type !== "size") {
    return NextResponse.json({ error: "type must be 'color' or 'size'." }, { status: 400 });
  }

  const label = String(body.label ?? "").trim();
  if (!label) {
    return NextResponse.json({ error: "label is required." }, { status: 400 });
  }

  // Auto-assign display_order as max+1
  const { data: maxRow } = await admin
    .from("catalog_product_variants")
    .select("display_order")
    .eq("item_id", itemId)
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const displayOrder = (maxRow?.display_order ?? -1) + 1;

  const record = {
    item_id: itemId,
    type,
    label,
    value: body.value ? String(body.value) : null,
    display_order: displayOrder,
    is_available: body.isAvailable !== undefined ? Boolean(body.isAvailable) : true,
  };

  const result = await admin
    .from("catalog_product_variants")
    .insert(record)
    .select("*")
    .single();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json(
    { variant: mapProductVariants([result.data])[0] },
    { status: 201 },
  );
}
