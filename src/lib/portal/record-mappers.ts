import type {
  ApprovalItem,
  BrandAsset,
  CatalogItem,
  OrderEvent,
  PortalOrder,
  QuoteRequest,
} from "@/lib/portal/types";
import {
  APPROVAL_STATUS_OPTIONS,
  ORDER_STATUS_OPTIONS,
  QUOTE_STATUS_OPTIONS,
  formatPortalStatusLabel,
  isApprovalStatus,
  isOrderEventState,
  isOrderStatus,
  isQuoteStatus,
  normalizeOrderEvents,
} from "@/lib/portal/workflow";

export {
  APPROVAL_STATUS_OPTIONS,
  ORDER_STATUS_OPTIONS,
  QUOTE_STATUS_OPTIONS,
  formatPortalStatusLabel,
};

export function mapOrderEvents(records: Record<string, unknown>[] | null | undefined): OrderEvent[] {
  const mapped = (records ?? []).map((record) => {
    const state = String(record.state ?? "");

    return {
      id: String(record.id),
      orderId: String(record.order_id),
      label: String(record.label),
      description: String(record.description ?? ""),
      createdAt: String(record.created_at ?? new Date().toISOString()),
      state: isOrderEventState(state) ? state : "upcoming",
      internalOnly: Boolean(record.internal_only ?? false),
    };
  });

  return normalizeOrderEvents(mapped);
}

export function mapOrders(records: Record<string, unknown>[] | null | undefined): PortalOrder[] {
  return (records ?? []).map((record) => {
    const status = String(record.status ?? "");

    return {
      id: String(record.id),
      userId: String(record.user_id),
      orderNumber: String(record.order_number),
      productName: String(record.product_name),
      category: String(record.category),
      quantity: Number(record.quantity ?? 0),
      totalAmount: Number(record.total_amount ?? 0),
      currency: String(record.currency ?? "USD"),
      status: isOrderStatus(status) ? status : "confirmed",
      statusLabel: String(
        record.status_label ?? (status ? formatPortalStatusLabel(status) : "Confirmed")
      ),
      deliveryDate: String(record.delivery_date ?? new Date().toISOString()),
      createdAt: String(record.created_at ?? new Date().toISOString()),
      updatedAt: String(record.updated_at ?? record.created_at ?? new Date().toISOString()),
      assignedTo: record.assigned_to ? String(record.assigned_to) : undefined,
      internalNotes: record.internal_notes ? String(record.internal_notes) : undefined,
      sourceQuoteId: record.source_quote_id ? String(record.source_quote_id) : undefined,
      reorderQuoteId: record.reorder_quote_id ? String(record.reorder_quote_id) : undefined,
      events: mapOrderEvents(Array.isArray(record.events) ? (record.events as Record<string, unknown>[]) : []),
    };
  });
}

export function mapQuotes(records: Record<string, unknown>[] | null | undefined): QuoteRequest[] {
  return (records ?? []).map((record) => {
    const status = String(record.status ?? "");

    return {
      id: String(record.id),
      userId: String(record.user_id),
      catalogItemId: record.catalog_item_id ? String(record.catalog_item_id) : undefined,
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
      status: isQuoteStatus(status) ? status : "draft",
      createdAt: String(record.created_at ?? new Date().toISOString()),
      updatedAt: String(record.updated_at ?? record.created_at ?? new Date().toISOString()),
      assignedTo: record.assigned_to ? String(record.assigned_to) : undefined,
      internalNotes: record.internal_notes ? String(record.internal_notes) : undefined,
      convertedOrderId: record.converted_order_id ? String(record.converted_order_id) : undefined,
      linkedAssetIds: Array.isArray(record.linked_asset_ids) ? record.linked_asset_ids.map(String) : [],
    };
  });
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
  return (records ?? []).map((record) => {
    const status = String(record.status ?? "");

    return {
      id: String(record.id),
      userId: String(record.user_id),
      title: String(record.title),
      status: isApprovalStatus(status) ? status : "pending",
      dueLabel: String(record.due_label ?? "Pending review"),
      linkedRecordType:
        record.linked_record_type === "quote" || record.linked_record_type === "order"
          ? record.linked_record_type
          : undefined,
      linkedRecordId: record.linked_record_id ? String(record.linked_record_id) : undefined,
      notes: record.notes ? String(record.notes) : undefined,
      resolvedAt: record.resolved_at ? String(record.resolved_at) : undefined,
    };
  });
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
    sku: String(record.sku ?? record.slug),
    minPrice: Number(record.min_price ?? 0),
    maxPrice: Number(record.max_price ?? record.min_price ?? 0),
    image: String(record.image ?? ""),
    badge: record.badge ? String(record.badge) : undefined,
    moq: Number(record.moq ?? 0),
    leadTimeDays: Number(record.lead_time_days ?? 21),
    leadTimeLabel: String(record.lead_time_label ?? "3-5 weeks"),
    decorationMethods: Array.isArray(record.decoration_methods)
      ? record.decoration_methods.map(String)
      : [],
    variants: Array.isArray(record.variants) ? record.variants.map(String) : [],
  }));
}
