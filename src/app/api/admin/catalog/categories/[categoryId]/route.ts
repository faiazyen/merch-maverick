import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapCatalogCategories } from "@/lib/portal/record-mappers";

type RouteContext = { params: Promise<{ categoryId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { categoryId } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;

  const updates: Record<string, unknown> = {};
  if (typeof body.name === "string") updates.name = body.name.trim();
  if (typeof body.slug === "string") updates.slug = body.slug.trim();
  if (typeof body.description === "string") updates.description = body.description.trim();
  if (typeof body.displayOrder === "number") updates.display_order = body.displayOrder;
  if (typeof body.isActive === "boolean") updates.is_active = body.isActive;
  if (body.icon !== undefined) updates.icon = body.icon ? String(body.icon) : null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const result = await admin
    .from("catalog_categories")
    .update(updates)
    .eq("id", categoryId)
    .select("*")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: result.error?.message ?? "Category not found." },
      { status: 400 },
    );
  }

  return NextResponse.json({ category: mapCatalogCategories([result.data])[0] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { categoryId } = await context.params;

  // Warn if products are attached — return count so UI can show confirmation
  const { count } = await admin
    .from("catalog_items")
    .select("id", { count: "exact", head: true })
    .eq("category_id", categoryId);

  if ((count ?? 0) > 0) {
    const force = new URL(_request.url).searchParams.get("force") === "true";
    if (!force) {
      return NextResponse.json(
        { error: `${count} product(s) are linked to this category. Pass ?force=true to delete anyway.`, productCount: count },
        { status: 409 },
      );
    }
    // Null out category_id on affected products before deletion
    await admin
      .from("catalog_items")
      .update({ category_id: null })
      .eq("category_id", categoryId);
  }

  const result = await admin
    .from("catalog_categories")
    .delete()
    .eq("id", categoryId)
    .select("id")
    .maybeSingle();

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ deleted: true });
}
