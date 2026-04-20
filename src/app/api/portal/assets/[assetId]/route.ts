import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    assetId: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
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

  const { assetId } = await context.params;
  const requestUrl = new URL(request.url);
  const mode = requestUrl.searchParams.get("mode") === "download" ? "download" : "preview";
  const responseFormat = requestUrl.searchParams.get("format");

  const assetResult = await supabase
    .from("brand_assets")
    .select("id,name,storage_path")
    .eq("id", assetId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (assetResult.error || !assetResult.data?.storage_path) {
    return NextResponse.json({ error: "Asset not found." }, { status: 404 });
  }

  const signedUrlResult = await admin.storage.from("portal-assets").createSignedUrl(assetResult.data.storage_path, 60, {
    download: mode === "download" ? assetResult.data.name : undefined,
  });

  if (signedUrlResult.error || !signedUrlResult.data?.signedUrl) {
    return NextResponse.json(
      { error: signedUrlResult.error?.message ?? "Unable to generate asset link." },
      { status: 400 }
    );
  }

  if (responseFormat === "json") {
    return NextResponse.json({ url: signedUrlResult.data.signedUrl });
  }

  return NextResponse.redirect(signedUrlResult.data.signedUrl);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { assetId } = await context.params;

  const { data: asset, error: fetchError } = await supabase
    .from("brand_assets")
    .select("id, user_id, storage_path")
    .eq("id", assetId)
    .maybeSingle();

  if (fetchError || !asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (asset.user_id !== sessionUser.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error: storageError } = await supabase.storage.from("portal-assets").remove([asset.storage_path]);

  if (storageError) {
    return NextResponse.json({ error: "Failed to delete file." }, { status: 500 });
  }

  const { error: deleteError } = await supabase.from("brand_assets").delete().eq("id", assetId);

  if (deleteError) {
    console.error("Failed to delete brand asset record after storage removal", {
      assetId,
      error: deleteError.message,
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
