export type PortalStatus =
  | "draft"
  | "submitted"
  | "quote"
  | "confirmed"
  | "in-production"
  | "shipped"
  | "delivered"
  | "approved"
  | "needs-review";

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
  state: "done" | "current" | "upcoming";
}

export interface PortalOrder {
  id: string;
  userId: string;
  orderNumber: string;
  productName: string;
  category: string;
  quantity: number;
  totalAmount: number;
  currency: string;
  status: PortalStatus;
  statusLabel: string;
  deliveryDate: string;
  createdAt: string;
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
  minPrice: number;
  image: string;
  badge?: string;
  moq: number;
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
  status: "pending" | "approved";
  dueLabel: string;
}

export interface QuoteRequest {
  id: string;
  userId: string;
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
  status: "draft" | "submitted";
  createdAt: string;
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
