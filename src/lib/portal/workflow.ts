import type {
  CatalogItem,
  OrderEvent,
  OrderEventState,
  OrderStatus,
  QuoteRequest,
  QuoteStatus,
} from "@/lib/portal/types";

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
  "cancelled",
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

export const VALID_QUOTE_TRANSITIONS: Record<QuoteStatus, QuoteStatus[]> = {
  draft: ["submitted"],
  submitted: ["in-review", "rejected"],
  "in-review": ["quoted", "rejected", "submitted"],
  quoted: ["approved", "rejected", "in-review"],
  approved: ["converted", "rejected"],
  rejected: ["submitted"],
  converted: [],
};

export const VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  confirmed: ["in-production", "cancelled"],
  "in-production": ["quality-control", "confirmed", "cancelled"],
  "quality-control": ["shipped", "in-production", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export function getValidNextQuoteStatuses(current: QuoteStatus): QuoteStatus[] {
  return VALID_QUOTE_TRANSITIONS[current] ?? [];
}

export function getValidNextOrderStatuses(current: OrderStatus): OrderStatus[] {
  return VALID_ORDER_TRANSITIONS[current] ?? [];
}

export function isValidQuoteTransition(from: QuoteStatus, to: QuoteStatus): boolean {
  return VALID_QUOTE_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isValidOrderTransition(from: OrderStatus, to: OrderStatus): boolean {
  return VALID_ORDER_TRANSITIONS[from]?.includes(to) ?? false;
}

export function buildOrderEventLabel(status: OrderStatus) {
  switch (status) {
    case "confirmed":
      return "Quote approved & deposit received";
    case "in-production":
      return "Artwork approved & production released";
    case "quality-control":
      return "Quality check in progress";
    case "shipped":
      return "Shipment booked & final balance due";
    case "delivered":
      return "Delivered & closed";
    default:
      return formatPortalStatusLabel(status);
  }
}

export function buildOrderEventDescription(status: OrderStatus) {
  switch (status) {
    case "confirmed":
      return "Quote terms were approved, any requested surcharges were aligned, and the 60% deposit secured the production slot.";
    case "in-production":
      return "Artwork has been cleared for factory execution. Orders may move here after sample approval or by direct-to-production client sign-off.";
    case "quality-control":
      return "The order is in final quality review, audit preparation, and packing control before dispatch.";
    case "shipped":
      return "Air or sea freight has been scheduled, VAT/shipping paperwork is being finalized, and the remaining 40% balance is due before handoff.";
    case "delivered":
      return "Delivery is complete and the program has been closed in the portal for reorder planning.";
    default:
      return `Order moved to ${formatPortalStatusLabel(status)}.`;
  }
}

export function buildOrderStatusSummary(status: OrderStatus) {
  switch (status) {
    case "confirmed":
      return "Your quote is approved, deposit has been secured, and the order is being prepared for artwork sign-off and production release.";
    case "in-production":
      return "Artwork is approved and the order is moving through sampling or direct production, depending on the route confirmed with your team.";
    case "quality-control":
      return "Quality control is underway. Optional third-party inspection and the audit report are handled here before dispatch.";
    case "shipped":
      return "Shipment is booked by air or sea, final shipping details are being coordinated, and the remaining balance is due before final release.";
    case "delivered":
      return "The order has been delivered successfully and is ready to be referenced for reorders or repeat programs.";
    default:
      return `Order is currently ${formatPortalStatusLabel(status)}.`;
  }
}

export function inferProductionPath(quote: Pick<QuoteRequest, "notes" | "productName" | "category">) {
  const note = quote.notes.toLowerCase();

  if (
    note.includes("sample") ||
    note.includes("sampling") ||
    note.includes("prototype") ||
    note.includes("approval sample")
  ) {
    return {
      label: "Sample review recommended",
      description: "The request suggests a sample should be approved before main production begins.",
    };
  }

  if (
    note.includes("direct production") ||
    note.includes("skip sample") ||
    note.includes("no sample") ||
    note.includes("fast track")
  ) {
    return {
      label: "Direct production likely",
      description: "The request points toward artwork approval followed by direct production without a physical sample round.",
    };
  }

  if (quote.category.toLowerCase() === "apparel" || quote.productName.toLowerCase().includes("hoodie")) {
    return {
      label: "Review sample need with client",
      description: "Apparel programs often benefit from confirming fabric weight, fit, and finishing before full production.",
    };
  }

  return {
    label: "Production path not confirmed",
    description: "Confirm whether the client wants a pre-production sample or direct release after artwork approval.",
  };
}

export function extractQuoteSignals(notes: string) {
  const normalized = notes.toLowerCase();
  const signals: string[] = [];

  if (
    normalized.includes("gsm") ||
    normalized.includes("fabric") ||
    normalized.includes("material") ||
    normalized.includes("heavier")
  ) {
    signals.push("Spec upgrade or fabrication review requested");
  }

  if (
    normalized.includes("design") ||
    normalized.includes("3d") ||
    normalized.includes("artwork") ||
    normalized.includes("proof")
  ) {
    signals.push("Designer or artwork support may need to be priced manually");
  }

  if (normalized.includes("sample") || normalized.includes("prototype")) {
    signals.push("Sampling expectations mentioned in client notes");
  }

  if (
    normalized.includes("quality") ||
    normalized.includes("audit") ||
    normalized.includes("inspection") ||
    normalized.includes("qc")
  ) {
    signals.push("Optional quality-control service may need follow-up");
  }

  if (
    normalized.includes("air") ||
    normalized.includes("sea") ||
    normalized.includes("ship") ||
    normalized.includes("vat")
  ) {
    signals.push("Shipping route or VAT coordination needs confirmation");
  }

  return signals;
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
