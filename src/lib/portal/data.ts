import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { buildMockPortalBundle } from "@/lib/portal/mock-data";
import {
  mapApprovals,
  mapAssets,
  mapCatalogItems,
  mapOrders,
  mapQuotes,
} from "@/lib/portal/record-mappers";
import type {
  PortalDataBundle,
  PortalProfile,
} from "@/lib/portal/types";

type SessionUser = {
  id: string;
  email: string;
  metadata: Record<string, unknown>;
};

function normalizeProfile(user: SessionUser, profile?: Record<string, unknown> | null): PortalProfile {
  const metadata = user.metadata ?? {};

  return {
    id: user.id,
    email: String(profile?.email ?? user.email ?? ""),
    fullName: String(profile?.full_name ?? metadata.full_name ?? "Client Account"),
    businessName: String(profile?.business_name ?? metadata.business_name ?? "Merch Maverick"),
    website: String(profile?.website ?? metadata.website ?? ""),
    phone: String(profile?.phone ?? metadata.phone ?? ""),
    industry: String(profile?.industry ?? metadata.industry ?? "Business profile"),
    country: String(profile?.country ?? metadata.country ?? ""),
    jobTitle: String(profile?.job_title ?? metadata.job_title ?? ""),
    estimatedOrderVolume: String(
      profile?.estimated_order_volume ?? metadata.estimated_order_volume ?? "Project-based"
    ),
    preferredCategories: Array.isArray(profile?.preferred_categories)
      ? profile?.preferred_categories.map(String)
      : Array.isArray(metadata.preferred_categories)
      ? metadata.preferred_categories.map(String)
      : [],
    marketingOptIn: Boolean(profile?.marketing_opt_in ?? metadata.marketing_opt_in ?? false),
    profileCompleted: Boolean(profile?.profile_completed ?? metadata.profile_completed ?? false),
  };
}

export const getPortalSessionUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    metadata: user.user_metadata ?? {},
  };
});

async function maybeSelectRows<T>(table: string, userId?: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  try {
    const query = supabase.from(table).select("*");
    const result = userId ? await query.eq("user_id", userId) : await query;
    if (result.error) {
      return null;
    }
    return (result.data ?? []) as T[];
  } catch {
    return null;
  }
}

async function loadProfile(userId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  try {
    const result = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    if (result.error) {
      return null;
    }
    return result.data;
  } catch {
    return null;
  }
}

export const getPortalDataBundle = cache(async (): Promise<PortalDataBundle | null> => {
  const user = await getPortalSessionUser();
  if (!user) {
    return null;
  }

  const profileRecord = await loadProfile(user.id);
  const profile = normalizeProfile(user, profileRecord);
  const fallback = buildMockPortalBundle(profile);

  const [orders, quotes, assets, approvals, catalogItems] = await Promise.all([
    maybeSelectRows<Record<string, unknown>>("orders", user.id),
    maybeSelectRows<Record<string, unknown>>("quote_requests", user.id),
    maybeSelectRows<Record<string, unknown>>("brand_assets", user.id),
    maybeSelectRows<Record<string, unknown>>("approvals", user.id),
    maybeSelectRows<Record<string, unknown>>("catalog_items"),
  ]);

  const normalizedOrders = mapOrders(orders);
  const normalizedQuotes = mapQuotes(quotes);
  const normalizedAssets = mapAssets(assets);
  const normalizedApprovals = mapApprovals(approvals);
  const normalizedCatalogItems = mapCatalogItems(catalogItems);

  return {
    profile,
    dashboard: {
      activeOrders: (normalizedOrders.length > 0 ? normalizedOrders : fallback.orders).filter(
        (order) => order.status !== "delivered"
      ).length,
      totalSpent: (normalizedOrders.length > 0 ? normalizedOrders : fallback.orders).reduce(
        (sum, order) => sum + Number(order.totalAmount),
        0
      ),
      repeatOrders: (normalizedOrders.length > 0 ? normalizedOrders : fallback.orders).length,
      pendingApprovals: (normalizedApprovals.length > 0 ? normalizedApprovals : fallback.approvals).filter(
        (approval) => approval.status === "pending"
      ).length,
    },
    orders: normalizedOrders.length > 0 ? normalizedOrders : fallback.orders,
    quotes: normalizedQuotes.length > 0 ? normalizedQuotes : fallback.quotes,
    assets: normalizedAssets.length > 0 ? normalizedAssets : fallback.assets,
    approvals: normalizedApprovals.length > 0 ? normalizedApprovals : fallback.approvals,
    catalogItems: normalizedCatalogItems.length > 0 ? normalizedCatalogItems : fallback.catalogItems,
  };
});

export async function isInternalUser() {
  const user = await getPortalSessionUser();
  if (!user) {
    return false;
  }

  const internalEmails = (process.env.INTERNAL_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return internalEmails.includes(user.email.toLowerCase());
}
