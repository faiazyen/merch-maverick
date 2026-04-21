import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";
import { mapProductImages } from "@/lib/portal/record-mappers";

const IMAGES_BUCKET = "catalog-images";

type RouteContext = { params: Promise<{ itemId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId } = await context.params;

  const result = await admin
    .from("catalog_product_images")
    .select("*")
    .eq("item_id", itemId)
    .order("display_order", { ascending: true });

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ images: mapProductImages(result.data ?? []) });
}

export async function POST(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { itemId } = await context.params;
  const contentType = request.headers.get("content-type") ?? "";

  // Reorder: JSON body with reorder array
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    if (Array.isArray(body.reorder)) {
      const updates = body.reorder as { id: string; displayOrder: number }[];
      await Promise.all(
        updates.map(({ id, displayOrder }) =>
          admin
            .from("catalog_product_images")
            .update({ display_order: displayOrder })
            .eq("id", id)
            .eq("item_id", itemId)
        )
      );
      return NextResponse.json({ reordered: true });
    }
    return NextResponse.json({ error: "Expected multipart/form-data for image upload or reorder array." }, { status: 400 });
  }

  // File upload via multipart/form-data
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files") as File[];
  const altText = String(formData.get("altText") ?? "");
  const makePrimary = formData.get("isPrimary") === "true";

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 });
  }

  // Validate types and sizes (JPEG, PNG, WebP, AVIF, max 10MB each)
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  const MAX_SIZE = 10 * 1024 * 1024;

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, AVIF.` },
        { status: 400 },
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File ${file.name} exceeds 10 MB limit.` },
        { status: 400 },
      );
    }
  }

  // Auto display_order: start after current max
  const { data: maxRow } = await admin
    .from("catalog_product_images")
    .select("display_order")
    .eq("item_id", itemId)
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  let nextOrder = (maxRow?.display_order ?? -1) + 1;
  const createdImages = [];

  // If setting a new primary, clear existing primaries first
  if (makePrimary) {
    await admin
      .from("catalog_product_images")
      .update({ is_primary: false })
      .eq("item_id", itemId);
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop() ?? "jpg";
    const storagePath = `catalog/${itemId}/${Date.now()}-${i}.${ext}`;

    const buffer = await file.arrayBuffer();
    const { error: uploadError } = await admin.storage
      .from(IMAGES_BUCKET)
      .upload(storagePath, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = admin.storage.from(IMAGES_BUCKET).getPublicUrl(storagePath);
    const publicUrl = urlData.publicUrl;

    const record = {
      item_id: itemId,
      url: publicUrl,
      alt_text: altText || file.name,
      is_primary: makePrimary && i === 0,
      display_order: nextOrder++,
    };

    const dbResult = await admin
      .from("catalog_product_images")
      .insert(record)
      .select("*")
      .single();

    if (dbResult.error) {
      return NextResponse.json({ error: dbResult.error.message }, { status: 500 });
    }

    createdImages.push(mapProductImages([dbResult.data])[0]);
  }

  return NextResponse.json({ images: createdImages }, { status: 201 });
}
