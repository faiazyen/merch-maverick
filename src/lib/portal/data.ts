import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { buildMockPortalBundle } from "@/lib/portal/mock-data";
import type {
  ApprovalItem,
  BrandAsset,
  CatalogItem,
  OrderEvent,
  PortalDataBundle,
  PortalProfile,
  PortalOrder,
  QuoteRequest,
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

async function maybeSelectRows<T>(table: string, userId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  try {
    const result = await supabase.from(table).select("*").eq("user_id", userId);
    if (result.error) {
      return null;
    }
    return (result.data ?? []) as T[];
  } catch {
    return null;
  }
}

function mapOrderEvents(records: Record<string, unknown>[] | null | undefined): OrderEvent[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    orderId: String(record.order_id),
    label: String(record.label),
    description: String(record.description ?? ""),
    createdAt: String(record.created_at ?? new Date().toISOString()),
    state:
      record.state === "done" || record.state === "current" || record.state === "upcoming"
        ? record.state
        : "upcoming",
  }));
}

function mapOrders(records: Record<string, unknown>[] | null | undefined): PortalOrder[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    userId: String(record.user_id),
    orderNumber: String(record.order_number),
    productName: String(record.product_name),
    category: String(record.category),
    quantity: Number(record.quantity ?? 0),
    totalAmount: Number(record.total_amount ?? 0),
    currency: String(record.currency ?? "USD"),
    status:
      typeof record.status === "string"
        ? (record.status as PortalOrder["status"])
        : "confirmed",
    statusLabel: String(record.status_label ?? record.status ?? "Confirmed"),
    deliveryDate: String(record.delivery_date ?? new Date().toISOString()),
    createdAt: String(record.created_at ?? new Date().toISOString()),
    reorderQuoteId: record.reorder_quote_id ? String(record.reorder_quote_id) : undefined,
    events: mapOrderEvents(Array.isArray(record.events) ? (record.events as Record<string, unknown>[]) : []),
  }));
}

function mapQuotes(records: Record<string, unknown>[] | null | undefined): QuoteRequest[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    userId: String(record.user_id),
    title: String(record.title),
    category: String(record.category),
    productName: String(record.product_name),
    quantity: Number(record.quantity ?? 0),
    decorationMethod: String(record.decoration_method),
    rush: Boolean(record.rush),
    unitPriceMin: Number(record.unit_price_min ?? 0),
    unitPriceMax: Number(record.unit_price_max ?? 0),
    totalMin: Number(record.total_min ?? 0),
    totalMax: Number(record.total_max ?? 0),
    leadTime: String(record.lead_time ?? ""),
    destination: String(record.destination ?? ""),
    shippingMethod: String(record.shipping_method ?? ""),
    notes: String(record.notes ?? ""),
    status: record.status === "submitted" ? "submitted" : "draft",
    createdAt: String(record.created_at ?? new Date().toISOString()),
    linkedAssetIds: Array.isArray(record.linked_asset_ids)
      ? record.linked_asset_ids.map(String)
      : [],
  }));
}

function mapAssets(records: Record<string, unknown>[] | null | undefined): BrandAsset[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    userId: String(record.user_id),
    name: String(record.name),
    type: String(record.type ?? "FILE"),
    mimeType: record.mime_type ? String(record.mime_type) : undefined,
    sizeLabel: String(record.size_label ?? "Uploaded file"),
    linkedTo:
      record.linked_to === "quote" || record.linked_to === "order" ? record.linked_to : "account",
    linkedId: record.linked_id ? String(record.linked_id) : undefined,
    storagePath: record.storage_path ? String(record.storage_path) : undefined,
    createdAt: String(record.created_at ?? new Date().toISOString()),
    status: record.status === "pending-review" ? "pending-review" : "ready",
  }));
}

function mapApprovals(records: Record<string, unknown>[] | null | undefined): ApprovalItem[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    userId: String(record.user_id),
    title: String(record.title),
    status: record.status === "approved" ? "approved" : "pending",
    dueLabel: String(record.due_label ?? "Pending review"),
  }));
}

function mapCatalogItems(records: Record<string, unknown>[] | null | undefined): CatalogItem[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    slug: String(record.slug),
    title: String(record.title),
    category: String(record.category),
    subcategory: String(record.subcategory ?? ""),
    description: String(record.description ?? ""),
    material: String(record.material ?? ""),
    colorFamily: String(record.color_family ?? ""),
    minPrice: Number(record.min_price ?? 0),
    image: String(record.image ?? ""),
    badge: record.badge ? String(record.badge) : undefined,
    moq: Number(record.moq ?? 0),
  }));
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
    maybeSelectRows<Record<string, unknown>>("catalog_items", user.id),
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
