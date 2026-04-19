import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const BUCKET_NAME = "portal-assets";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  const admin = getSupabaseAdminClient();

  if (!supabase || !admin) {
    return NextResponse.json(
      { error: "Supabase storage is not configured. Add auth keys and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const linkedTo = String(formData.get("linkedTo") ?? "account");
  const linkedId = formData.get("linkedId");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if ((linkedTo === "quote" || linkedTo === "order") && typeof linkedId !== "string") {
    return NextResponse.json(
      { error: "A quote or order asset link requires a linked record id." },
      { status: 400 }
    );
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const storagePath = `${user.id}/${Date.now()}-${safeName}`;

  const uploadResult = await admin.storage.from(BUCKET_NAME).upload(storagePath, fileBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (uploadResult.error) {
    return NextResponse.json({ error: uploadResult.error.message }, { status: 400 });
  }

  const asset = {
    id: crypto.randomUUID(),
    user_id: user.id,
    name: file.name,
    type: file.name.split(".").pop()?.toUpperCase() ?? "FILE",
    mime_type: file.type || "application/octet-stream",
    size_label: formatBytes(file.size),
    linked_to: linkedTo === "quote" || linkedTo === "order" ? linkedTo : "account",
    linked_id: typeof linkedId === "string" ? linkedId : null,
    storage_path: storagePath,
    status: "ready",
    created_at: new Date().toISOString(),
  };

  const insertResult = await admin.from("brand_assets").insert(asset).select("*").single();
  if (insertResult.error) {
    return NextResponse.json({ error: insertResult.error.message }, { status: 400 });
  }

  return NextResponse.json({
    asset: {
      id: String(insertResult.data.id),
      userId: String(insertResult.data.user_id),
      name: String(insertResult.data.name),
      type: String(insertResult.data.type ?? "FILE"),
      mimeType: String(insertResult.data.mime_type ?? file.type),
      sizeLabel: String(insertResult.data.size_label),
      linkedTo: insertResult.data.linked_to,
      linkedId: insertResult.data.linked_id ? String(insertResult.data.linked_id) : undefined,
      storagePath: String(insertResult.data.storage_path ?? storagePath),
      createdAt: String(insertResult.data.created_at),
      status: insertResult.data.status === "pending-review" ? "pending-review" : "ready",
    },
  });
}
