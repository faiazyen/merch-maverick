import type {
  ApprovalItem,
  BrandAsset,
  CatalogItem,
  OrderEvent,
  PortalOrder,
  QuoteRequest,
} from "@/lib/portal/types";

export const ORDER_STATUS_OPTIONS = [
  "confirmed",
  "in-production",
  "shipped",
  "delivered",
] as const satisfies readonly PortalOrder["status"][];

export const QUOTE_STATUS_OPTIONS = [
  "draft",
  "submitted",
  "needs-review",
  "approved",
] as const;

export const APPROVAL_STATUS_OPTIONS = ["pending", "approved"] as const;

export function formatPortalStatusLabel(status: string) {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function mapOrderEvents(records: Record<string, unknown>[] | null | undefined): OrderEvent[] {
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

export function mapOrders(records: Record<string, unknown>[] | null | undefined): PortalOrder[] {
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
    statusLabel: String(
      record.status_label ??
        (typeof record.status === "string" ? formatPortalStatusLabel(record.status) : "Confirmed")
    ),
    deliveryDate: String(record.delivery_date ?? new Date().toISOString()),
    createdAt: String(record.created_at ?? new Date().toISOString()),
    reorderQuoteId: record.reorder_quote_id ? String(record.reorder_quote_id) : undefined,
    events: mapOrderEvents(Array.isArray(record.events) ? (record.events as Record<string, unknown>[]) : []),
  }));
}

export function mapQuotes(records: Record<string, unknown>[] | null | undefined): QuoteRequest[] {
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
    status:
      record.status === "submitted" || record.status === "approved" || record.status === "needs-review"
        ? record.status
        : "draft",
    createdAt: String(record.created_at ?? new Date().toISOString()),
    linkedAssetIds: Array.isArray(record.linked_asset_ids) ? record.linked_asset_ids.map(String) : [],
  }));
}

export function mapAssets(records: Record<string, unknown>[] | null | undefined): BrandAsset[] {
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

export function mapApprovals(records: Record<string, unknown>[] | null | undefined): ApprovalItem[] {
  return (records ?? []).map((record) => ({
    id: String(record.id),
    userId: String(record.user_id),
    title: String(record.title),
    status: record.status === "approved" ? "approved" : "pending",
    dueLabel: String(record.due_label ?? "Pending review"),
  }));
}

export function mapCatalogItems(records: Record<string, unknown>[] | null | undefined): CatalogItem[] {
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
