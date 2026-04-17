import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next") ?? "/portal";
  const next = nextParam.startsWith("/") ? nextParam : "/portal";

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(
      new URL("/sign-in?error=supabase-not-configured", requestUrl.origin)
    );
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const metadata = user.user_metadata ?? {};
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          full_name: metadata.full_name ?? null,
          business_name: metadata.business_name ?? null,
          website: metadata.website ?? null,
          phone: metadata.phone ?? null,
          industry: metadata.industry ?? null,
          country: metadata.country ?? null,
          marketing_opt_in: Boolean(metadata.marketing_opt_in),
          profile_completed: true,
        },
        { onConflict: "id" }
      );

      if (profileError) {
        return NextResponse.redirect(
          new URL(
            `/sign-in?error=${encodeURIComponent(profileError.message)}`,
            requestUrl.origin
          )
        );
      }
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
