import { getPortalSessionUser, isInternalUser } from "@/lib/portal/data";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const internalRoutesEnabled = process.env.ENABLE_INTERNAL_ROUTES === "true";

export async function requireInternalRouteAccess() {
  if (!internalRoutesEnabled) {
    return { error: "Not found.", status: 404 as const };
  }

  const user = await getPortalSessionUser();
  if (!user) {
    return { error: "Unauthorized.", status: 401 as const };
  }

  const allowed = await isInternalUser();
  if (!allowed) {
    return { error: "Forbidden.", status: 403 as const };
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return {
      error: "Supabase admin access is required for internal CRM actions.",
      status: 503 as const,
    };
  }

  return { admin, user };
}
