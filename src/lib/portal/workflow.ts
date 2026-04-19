import type { CatalogItem, OrderEvent, OrderEventState, OrderStatus, QuoteStatus } from "@/lib/portal/types";

export const QUOTE_STATUS_OPTIONS = [
  "draft",
  "submitted",
  "in-review",
  "quoted",
  "approved",
  "rejected",
  "converted",
] as const satisfies readonly QuoteStatus[];

export const ORDER_STATUS_OPTIONS = [
  "confirmed",
  "in-production",
  "quality-control",
  "shipped",
  "delivered",
] as const satisfies readonly OrderStatus[];

export const APPROVAL_STATUS_OPTIONS = [
  "pending",
  "approved",
  "changes-requested",
] as const;

export const ORDER_EVENT_STATES = ["done", "current", "upcoming"] as const satisfies readonly OrderEventState[];

export function formatPortalStatusLabel(status: string) {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function isQuoteStatus(value: string): value is QuoteStatus {
  return QUOTE_STATUS_OPTIONS.includes(value as QuoteStatus);
}

export function isOrderStatus(value: string): value is OrderStatus {
  return ORDER_STATUS_OPTIONS.includes(value as OrderStatus);
}

export function isApprovalStatus(value: string): value is "pending" | "approved" | "changes-requested" {
  return APPROVAL_STATUS_OPTIONS.includes(value as "pending" | "approved" | "changes-requested");
}

export function isOrderEventState(value: string): value is OrderEventState {
  return ORDER_EVENT_STATES.includes(value as OrderEventState);
}

export function buildOrderEventLabel(status: OrderStatus) {
  switch (status) {
    case "confirmed":
      return "Order confirmed";
    case "in-production":
      return "Production started";
    case "quality-control":
      return "Quality control";
    case "shipped":
      return "Shipment booked";
    case "delivered":
      return "Order delivered";
    default:
      return formatPortalStatusLabel(status);
  }
}

export function buildOrderEventDescription(status: OrderStatus) {
  switch (status) {
    case "confirmed":
      return "Operations approved pricing and reserved a production slot.";
    case "in-production":
      return "Manufacturing is active and the order is moving through the factory.";
    case "quality-control":
      return "Final QC, proof checks, and packing validation are underway.";
    case "shipped":
      return "Freight and delivery handoff are confirmed for dispatch.";
    case "delivered":
      return "The delivery has been completed and closed in the client portal.";
    default:
      return `Order moved to ${formatPortalStatusLabel(status)}.`;
  }
}

export function buildOrderStatusSummary(status: OrderStatus) {
  switch (status) {
    case "confirmed":
      return "Operations has confirmed your order and production planning is underway.";
    case "in-production":
      return "Manufacturing is active and the order is moving through the factory floor.";
    case "quality-control":
      return "Quality checks, proof validation, and packing review are in progress.";
    case "shipped":
      return "Shipment has been booked and handoff to delivery is underway.";
    case "delivered":
      return "Delivery has been completed and this order is now closed.";
    default:
      return `Order is currently ${formatPortalStatusLabel(status)}.`;
  }
}

export function normalizeOrderEvents(events: OrderEvent[]) {
  const sorted = [...events].sort(
    (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
  );

  let seenCurrent = false;

  for (let index = sorted.length - 1; index >= 0; index -= 1) {
    const event = sorted[index];
    if (event.state !== "current") {
      continue;
    }

    if (!seenCurrent) {
      seenCurrent = true;
      continue;
    }

    sorted[index] = {
      ...event,
      state: "done",
    };
  }

  return sorted;
}

type QuoteCalculationInput = {
  item: CatalogItem;
  quantity: number;
  decorationMethod: string;
  rush: boolean;
};

export type CatalogQuote = {
  unitPriceMin: number;
  unitPriceMax: number;
  totalMin: number;
  totalMax: number;
  leadTime: string;
};

function getVolumeDiscount(quantity: number) {
  if (quantity >= 1000) return 0.12;
  if (quantity >= 500) return 0.08;
  if (quantity >= 250) return 0.05;
  return 0;
}

function getDecorationAdder(method: string) {
  switch (method) {
    case "embroidery":
      return 1.8;
    case "screen-print":
      return 0.9;
    case "dtg":
      return 1.2;
    case "laser":
      return 1.5;
    case "deboss":
      return 1.6;
    default:
      return 0.75;
  }
}

export function calculateCatalogQuote({ item, quantity, decorationMethod, rush }: QuoteCalculationInput): CatalogQuote {
  const baseMin = item.minPrice;
  const baseMax = item.maxPrice ?? Math.round(item.minPrice * 1.18 * 100) / 100;
  const volumeDiscount = getVolumeDiscount(quantity);
  const rushMultiplier = rush ? 1.18 : 1;
  const decorationAdder = getDecorationAdder(decorationMethod);

  const unitPriceMin = Math.round((baseMin + decorationAdder) * (1 - volumeDiscount) * rushMultiplier * 100) / 100;
  const unitPriceMax = Math.round((baseMax + decorationAdder) * (1 - volumeDiscount) * rushMultiplier * 100) / 100;

  return {
    unitPriceMin,
    unitPriceMax,
    totalMin: Math.round(unitPriceMin * quantity * 100) / 100,
    totalMax: Math.round(unitPriceMax * quantity * 100) / 100,
    leadTime: rush
      ? `${Math.max(7, Math.round((item.leadTimeDays ?? 21) * 0.55))}-${Math.max(
          10,
          Math.round((item.leadTimeDays ?? 28) * 0.65)
        )} days`
      : item.leadTimeLabel || `${item.leadTimeDays ?? 21}-${(item.leadTimeDays ?? 21) + 10} days`,
  };
}

export function getCatalogDecorationOptions(item: CatalogItem) {
  return item.decorationMethods.length > 0
    ? item.decorationMethods
    : ["embroidery", "screen-print", "dtg", "sublimation"];
}
