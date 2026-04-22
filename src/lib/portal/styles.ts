import type { PortalOrder, QuoteRequest, ApprovalItem } from "@/lib/portal/types";

export function orderStatusClasses(status: PortalOrder["status"]): string {
  switch (status) {
    case "in-production":   return "bg-[#DBEAFE] text-[#1D4ED8]";
    case "quality-control": return "bg-[#EDE9FE] text-[#6D28D9]";
    case "shipped":         return "bg-[#FEF3C7] text-[#92400E]";
    case "delivered":       return "bg-[#DCFCE7] text-[#166534]";
    case "confirmed":       return "bg-[#F0FDF4] text-[#15803D]";
    case "cancelled":       return "bg-[#FEE2E2] text-[#991B1B]";
    default:                return "bg-[#F3F4F6] text-[#374151]";
  }
}

export function quoteStatusClasses(status: QuoteRequest["status"]): string {
  switch (status) {
    case "submitted":  return "bg-[#DBEAFE] text-[#1D4ED8]";
    case "in-review":  return "bg-[#EDE9FE] text-[#6D28D9]";
    case "quoted":     return "bg-[#CFFAFE] text-[#0E7490]";
    case "approved":   return "bg-[#DCFCE7] text-[#166534]";
    case "rejected":   return "bg-[#FEE2E2] text-[#991B1B]";
    case "converted":  return "bg-[#F0FDF4] text-[#14532D]";
    default:           return "bg-[#F3F4F6] text-[#374151]";
  }
}

export function approvalStatusClasses(status: ApprovalItem["status"]): string {
  switch (status) {
    case "approved":           return "bg-[#DCFCE7] text-[#166534]";
    case "changes-requested":  return "bg-[#FEE2E2] text-[#991B1B]";
    default:                   return "bg-[#FEF9C3] text-[#854D0E]";
  }
}
