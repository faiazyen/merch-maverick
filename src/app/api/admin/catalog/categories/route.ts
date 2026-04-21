import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapCatalogCategories } from "@/lib/portal/record-mappers";

export async function GET() {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const result = await admin
    .from("catalog_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ categories: mapCatalogCategories(result.data ?? []) });
}

export async function POST(request: Request) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const body = (await request.json()) as Record<string, unknown>;

  const name = String(body.name ?? "").trim();
  const slug = String(body.slug ?? "").trim();

  if (!name || !slug) {
    return NextResponse.json({ error: "name and slug are required." }, { status: 400 });
  }

  const record = {
    name,
    slug,
    description: String(body.description ?? "").trim(),
    display_order: Number(body.displayOrder ?? 0),
    is_active: body.isActive !== undefined ? Boolean(body.isActive) : true,
    icon: body.icon ? String(body.icon) : null,
  };

  const result = await admin
    .from("catalog_categories")
    .insert(record)
    .select("*")
    .single();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json(
    { category: mapCatalogCategories([result.data])[0] },
    { status: 201 },
  );
}
