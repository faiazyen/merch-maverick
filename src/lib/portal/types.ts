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
  | "delivered"
  | "cancelled";

export type OrderSource = "quote_conversion" | "direct_order";

export type ApprovalStatus = "pending" | "approved" | "changes-requested";

export type PortalStatus = QuoteStatus | OrderStatus | ApprovalStatus;

export type OrderEventState = "done" | "current" | "upcoming";

export type PricingType = "range" | "fixed" | "sale";

export type ProductLabel = "Best Seller" | "New" | "Eco Friendly" | "Premium Quality";

export interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  icon: string;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  itemId: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  itemId: string;
  type: "color" | "size";
  label: string;
  value: string; // hex for color, empty for size
  displayOrder: number;
  isAvailable: boolean;
  createdAt: string;
}

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
  onboardingCompleted: boolean;
  onboardingStep: number;
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
  orderSource?: OrderSource;
  catalogItemId?: string;
  variantIds?: string[];
  unitPrice?: number;
  cancellationReason?: string;
  events: OrderEvent[];
}

export interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId?: string;
  subcategory: string;
  description: string;
  material: string;
  colorFamily: string;
  sku: string;
  pricingType: PricingType;
  minPrice: number;
  maxPrice: number;
  salePrice: number;
  compareAtPrice: number;
  image: string; // legacy primary image url — kept for fallback
  images: ProductImage[];
  badge?: string; // legacy — kept for fallback display
  labels: string[];
  moq: number;
  leadTimeDays: number;
  leadTimeLabel: string;
  decorationMethods: string[];
  variants: string[]; // legacy flat array — kept for quote tool
  productVariants: ProductVariant[];
  supportsDirectOrder: boolean;
  isActive: boolean;
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
