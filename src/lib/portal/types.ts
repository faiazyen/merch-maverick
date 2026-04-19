export type QuoteStatus =
  | "draft"
  | "submitted"
  | "in-review"
  | "quoted"
  | "approved"
  | "rejected"
  | "converted";

export type OrderStatus =
  | "confirmed"
  | "in-production"
  | "quality-control"
  | "shipped"
  | "delivered";

export type ApprovalStatus = "pending" | "approved" | "changes-requested";

export type PortalStatus = QuoteStatus | OrderStatus | ApprovalStatus;

export type OrderEventState = "done" | "current" | "upcoming";

export interface PortalProfile {
  id: string;
  email: string;
  fullName: string;
  businessName: string;
  website: string;
  phone: string;
  industry: string;
  country: string;
  jobTitle: string;
  estimatedOrderVolume: string;
  preferredCategories: string[];
  marketingOptIn: boolean;
  profileCompleted: boolean;
}

export interface OrderEvent {
  id: string;
  orderId: string;
  label: string;
  description: string;
  createdAt: string;
  state: OrderEventState;
  internalOnly?: boolean;
}

export interface PortalOrder {
  id: string;
  userId: string;
  clientName?: string;
  clientEmail?: string;
  orderNumber: string;
  productName: string;
  category: string;
  quantity: number;
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  statusLabel: string;
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  internalNotes?: string;
  sourceQuoteId?: string;
  reorderQuoteId?: string;
  events: OrderEvent[];
}

export interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  material: string;
  colorFamily: string;
  sku: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  badge?: string;
  moq: number;
  leadTimeDays: number;
  leadTimeLabel: string;
  decorationMethods: string[];
  variants: string[];
}

export interface BrandAsset {
  id: string;
  userId: string;
  name: string;
  type: string;
  mimeType?: string;
  sizeLabel: string;
  linkedTo: "account" | "quote" | "order";
  linkedId?: string;
  storagePath?: string;
  createdAt: string;
  status: "ready" | "pending-review";
}

export interface ApprovalItem {
  id: string;
  userId: string;
  title: string;
  status: ApprovalStatus;
  dueLabel: string;
  linkedRecordType?: "quote" | "order";
  linkedRecordId?: string;
  notes?: string;
  resolvedAt?: string;
}

export interface QuoteRequest {
  id: string;
  userId: string;
  clientName?: string;
  clientEmail?: string;
  catalogItemId?: string;
  title: string;
  category: string;
  productName: string;
  quantity: number;
  decorationMethod: string;
  rush: boolean;
  unitPriceMin: number;
  unitPriceMax: number;
  totalMin: number;
  totalMax: number;
  leadTime: string;
  destination: string;
  shippingMethod: string;
  notes: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  internalNotes?: string;
  convertedOrderId?: string;
  linkedAssetIds: string[];
}

export interface PortalDashboardData {
  activeOrders: number;
  totalSpent: number;
  repeatOrders: number;
  pendingApprovals: number;
}

export interface PortalDataBundle {
  profile: PortalProfile;
  dashboard: PortalDashboardData;
  orders: PortalOrder[];
  catalogItems: CatalogItem[];
  quotes: QuoteRequest[];
  assets: BrandAsset[];
  approvals: ApprovalItem[];
}
