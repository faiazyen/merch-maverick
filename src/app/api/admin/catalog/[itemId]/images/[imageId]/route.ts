import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapProductImages } from "@/lib/portal/record-mappers";

const IMAGES_BUCKET = "catalog-images";

type RouteContext = { params: Promise<{ itemId: string; imageId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId, imageId } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;

  const updates: Record<string, unknown> = {};
  if (typeof body.altText === "string") updates.alt_text = body.altText.trim();
  if (typeof body.displayOrder === "number") updates.display_order = body.displayOrder;

  // Setting as primary: clear others first
  if (body.isPrimary === true) {
    await admin
      .from("catalog_product_images")
      .update({ is_primary: false })
      .eq("item_id", itemId);
    updates.is_primary = true;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const result = await admin
    .from("catalog_product_images")
    .update(updates)
    .eq("id", imageId)
    .eq("item_id", itemId)
    .select("*")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: result.error?.message ?? "Image not found." },
      { status: 400 },
    );
  }

  return NextResponse.json({ image: mapProductImages([result.data])[0] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId, imageId } = await context.params;

  // Fetch the image record first to get the storage path
  const imageResult = await admin
    .from("catalog_product_images")
    .select("id, url")
    .eq("id", imageId)
    .eq("item_id", itemId)
    .maybeSingle();

  if (imageResult.error || !imageResult.data) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  // Extract storage path from public URL
  const url = imageResult.data.url as string;
  const bucketMarker = `/${IMAGES_BUCKET}/`;
  const bucketIdx = url.indexOf(bucketMarker);
  if (bucketIdx !== -1) {
    const storagePath = url.slice(bucketIdx + bucketMarker.length);
    await admin.storage.from(IMAGES_BUCKET).remove([storagePath]);
  }

  const deleteResult = await admin
    .from("catalog_product_images")
    .delete()
    .eq("id", imageId)
    .eq("item_id", itemId)
    .select("id")
    .maybeSingle();

  if (deleteResult.error) {
    return NextResponse.json({ error: deleteResult.error.message }, { status: 400 });
  }

  return NextResponse.json({ deleted: true });
}
