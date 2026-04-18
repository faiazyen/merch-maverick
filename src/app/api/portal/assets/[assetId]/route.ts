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
