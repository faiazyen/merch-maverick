import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapCatalogItems } from "@/lib/portal/record-mappers";

export async function GET() {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const result = await admin
    .from("catalog_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ items: mapCatalogItems(result.data ?? []) });
}

export async function POST(request: Request) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const body = (await request.json()) as Record<string, unknown>;

  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? "").trim();
  const category = String(body.category ?? "").trim();
  const sku = String(body.sku ?? "").trim();

  if (!title || !slug || !category || !sku) {
    return NextResponse.json(
      { error: "title, slug, category, and sku are required." },
      { status: 400 },
    );
  }

  const record = {
    title,
    slug,
    sku,
    category,
    subcategory: String(body.subcategory ?? ""),
    description: String(body.description ?? ""),
    material: String(body.material ?? ""),
    color_family: String(body.colorFamily ?? ""),
    min_price: Number(body.minPrice ?? 0),
    max_price: Number(body.maxPrice ?? body.minPrice ?? 0),
    image: String(body.image ?? ""),
    badge: body.badge ? String(body.badge) : null,
    moq: Number(body.moq ?? 1),
    lead_time_days: Number(body.leadTimeDays ?? 21),
    lead_time_label: String(body.leadTimeLabel ?? ""),
    decoration_methods: Array.isArray(body.decorationMethods)
      ? body.decorationMethods.map(String)
      : [],
    variants: Array.isArray(body.variants) ? body.variants.map(String) : [],
  };

  const result = await admin
    .from("catalog_items")
    .insert(record)
    .select("*")
    .single();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json(
    { item: mapCatalogItems([result.data])[0] },
    { status: 201 },
  );
}
