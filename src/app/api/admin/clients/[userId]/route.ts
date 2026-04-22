import { NextResponse } from "next/server";

import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";

type RouteContext = {
  params: Promise<{ userId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { userId } = await context.params;

  const [profileResult, ordersResult, quotesResult, assetsResult] = await Promise.all([
    admin.from("profiles").select("*").eq("id", userId).maybeSingle(),
    admin
      .from("orders")
      .select("id,order_number,product_name,status,total_amount,currency,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    admin
      .from("quote_requests")
      .select("id,product_type,status,total_min,total_max,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    admin
      .from("brand_assets")
      .select("id,file_name,file_type,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  if (profileResult.error || !profileResult.data) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  return NextResponse.json({
    profile: profileResult.data,
    orders: ordersResult.data ?? [],
    quotes: quotesResult.data ?? [],
    assets: assetsResult.data ?? [],
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { admin } = access;
  const { userId } = await context.params;

  const body = (await request.json()) as {
    businessName?: string;
    fullName?: string;
    phone?: string;
    country?: string;
    industry?: string;
    website?: string;
    jobTitle?: string;
    clientTier?: string;
    suspended?: boolean;
  };

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (typeof body.businessName === "string") updates.business_name = body.businessName.trim() || null;
  if (typeof body.fullName === "string") updates.full_name = body.fullName.trim() || null;
  if (typeof body.phone === "string") updates.phone = body.phone.trim() || null;
  if (typeof body.country === "string") updates.country = body.country.trim() || null;
  if (typeof body.industry === "string") updates.industry = body.industry.trim() || null;
  if (typeof body.website === "string") updates.website = body.website.trim() || null;
  if (typeof body.jobTitle === "string") updates.job_title = body.jobTitle.trim() || null;
  if (typeof body.clientTier === "string") updates.client_tier = body.clientTier.trim() || null;
  if (typeof body.suspended === "boolean") updates.suspended = body.suspended;

  if (Object.keys(updates).length === 1) {
    return NextResponse.json({ error: "No valid fields provided." }, { status: 400 });
  }

  const result = await admin
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select("id,business_name,full_name,email,suspended")
    .maybeSingle();

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: result.error?.message ?? "Client not found." },
      { status: 400 }
    );
  }

  return NextResponse.json({ profile: result.data });
}
