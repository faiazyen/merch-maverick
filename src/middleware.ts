import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin", "/api/admin"];

function isAdminPath(pathname: string) {
  return ADMIN_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminPath(pathname)) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const enableInternal = process.env.ENABLE_INTERNAL_ROUTES === "true";
  const adminEmails = (process.env.INTERNAL_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // If internal routes are disabled, return 404 for admin pages, 403 for API
  if (!enableInternal) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // No Supabase config — can't verify session, block
  if (!supabaseUrl || !supabaseAnonKey) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/sign-in?next=%2Fadmin", request.url));
  }

  const response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No session
  if (!user) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/sign-in?next=%2Fadmin", request.url));
  }

  // Session exists but email not in allowlist
  const email = user.email?.toLowerCase() ?? "";
  if (adminEmails.length > 0 && !adminEmails.includes(email)) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
