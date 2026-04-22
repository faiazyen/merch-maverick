import { mapCatalogCategories, mapCatalogItems } from "@/lib/portal/record-mappers";
import type { CatalogCategory, CatalogItem } from "@/lib/portal/types";
import { calculateCatalogQuote, getCatalogDecorationOptions } from "@/lib/portal/workflow";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const IMAGES_JOIN = `
  catalog_product_images (
    id, item_id, url, alt_text, is_primary, display_order, created_at
  )
`.trim();

const VARIANTS_JOIN = `
  catalog_product_variants (
    id, item_id, type, label, value, display_order, is_available, created_at
  )
`.trim();

const FULL_CATALOG_SELECT = `
  *,
  ${IMAGES_JOIN},
  ${VARIANTS_JOIN}
`.trim();

export function buildFallbackCatalogItems(): CatalogItem[] {
  return mapCatalogItems([
    {
      id: "seed-hoodie",
      slug: "premium-cotton-hoodie",
      sku: "MM-HOOD-001",
      title: "Premium Cotton Hoodie",
      category: "Apparel",
      subcategory: "Hoodies",
      description: "Heavyweight cotton fleece hoodie for staff kits and premium merch drops.",
      material: "Organic Cotton",
      color_family: "Navy",
      pricing_type: "range",
      min_price: 18.5,
      max_price: 22.5,
      sale_price: 0,
      compare_at_price: 0,
      image: "/images/solutions/corporate/product.jpg",
      labels: ["Best Seller"],
      badge: "Best Seller",
      moq: 50,
      lead_time_days: 28,
      lead_time_label: "3-5 weeks",
      decoration_methods: ["embroidery", "screen-print", "dtg"],
      variants: ["Navy", "Black", "Heather Grey"],
      supports_direct_order: false,
      is_active: true,
    },
    {
      id: "seed-mug",
      slug: "matte-ceramic-mug",
      sku: "MM-MUG-002",
      title: "Matte Ceramic Mug",
      category: "Drinkware",
      subcategory: "Mugs",
      description: "Minimal ceramic mug for gifting kits and client onboarding sets.",
      material: "Ceramic",
      color_family: "White",
      pricing_type: "range",
      min_price: 10.8,
      max_price: 12,
      sale_price: 0,
      compare_at_price: 0,
      image: "/images/solutions/corporate/process.jpg",
      labels: [],
      moq: 100,
      lead_time_days: 24,
      lead_time_label: "3-4 weeks",
      decoration_methods: ["screen-print", "sublimation"],
      variants: ["White", "Charcoal"],
      supports_direct_order: false,
      is_active: true,
    },
    {
      id: "seed-tote",
      slug: "eco-friendly-tote-bag",
      sku: "MM-TOTE-003",
      title: "Eco-friendly Tote Bag",
      category: "Accessories",
      subcategory: "Tote Bags",
      description: "Canvas tote with reinforced handles and print-ready panel.",
      material: "Organic Cotton",
      color_family: "Natural",
      pricing_type: "range",
      min_price: 7.5,
      max_price: 9.8,
      sale_price: 0,
      compare_at_price: 0,
      image: "/images/solutions/events/product.jpg",
      labels: ["Eco Friendly"],
      badge: "Program Favorite",
      moq: 100,
      lead_time_days: 21,
      lead_time_label: "3-4 weeks",
      decoration_methods: ["screen-print", "embroidery", "dtg"],
      variants: ["Natural", "Black", "Olive"],
      supports_direct_order: false,
      is_active: true,
    },
  ]);
}

export async function getCatalogItemById(catalogItemId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const result = await supabase
    .from("catalog_items")
    .select(FULL_CATALOG_SELECT)
    .eq("id", catalogItemId)
    .maybeSingle();

  if (result.error || !result.data) {
    return null;
  }

  return mapCatalogItems([result.data as unknown as Record<string, unknown>])[0] ?? null;
}

/** Full catalog with images + variants — used by portal catalog page */
export async function getCatalogPageData(): Promise<{
  items: CatalogItem[];
  categories: CatalogCategory[];
}> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { items: [], categories: [] };

  const [itemsResult, categoriesResult] = await Promise.all([
    supabase
      .from("catalog_items")
      .select(FULL_CATALOG_SELECT)
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("catalog_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
  ]);

  const items = mapCatalogItems(
    (itemsResult.data ?? []) as unknown as Record<string, unknown>[]
  );

  const categories = mapCatalogCategories(
    (categoriesResult.data ?? []) as unknown as Record<string, unknown>[]
  );

  return { items, categories };
}

/** Lightweight catalog list — used inside getPortalDataBundle (primary image only) */
export async function getCatalogItemsLight(): Promise<CatalogItem[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const result = await supabase
    .from("catalog_items")
    .select(`*, catalog_product_images(id, item_id, url, alt_text, is_primary, display_order, created_at)`)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return mapCatalogItems((result.data ?? []) as Record<string, unknown>[]);
}

type QuotePayload = {
  catalogItemId: string;
  quantity: number;
  decorationMethod: string;
  rush: boolean;
  destination: string;
  shippingMethod: string;
  notes: string;
  status: string;
  selectedAssetIds: string[];
};

export async function validateQuotePayload(body: Record<string, unknown>) {
  const catalogItemId = String(body.catalogItemId ?? "");
  const quantity = Number(body.quantity ?? 0);
  const decorationMethod = String(body.decorationMethod ?? "");
  const rush = Boolean(body.rush);
  const destination = String(body.destination ?? "").trim();
  const shippingMethod = String(body.shippingMethod ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  const status = String(body.status ?? "submitted");
  const selectedAssetIds = Array.isArray(body.selectedAssetIds) ? body.selectedAssetIds.map(String) : [];

  if (!catalogItemId) {
    return { error: "A catalogue item is required." };
  }

  const item = await getCatalogItemById(catalogItemId);
  if (!item) {
    return { error: "The selected catalogue item could not be found." };
  }

  if (!Number.isFinite(quantity) || quantity < item.moq) {
    return { error: `Minimum order quantity for ${item.title} is ${item.moq} units.` };
  }

  const supportedDecorationMethods = getCatalogDecorationOptions(item);
  if (!supportedDecorationMethods.includes(decorationMethod)) {
    return {
      error: `${item.title} supports ${supportedDecorationMethods.join(", ")} decoration methods.`,
    };
  }

  if (!destination) {
    return { error: "Destination is required for quote submissions." };
  }

  if (!shippingMethod) {
    return { error: "Shipping method is required for quote submissions." };
  }

  if (status !== "draft" && status !== "submitted") {
    return { error: "Portal quote submissions can only be saved as draft or submitted." };
  }

  const calculated = calculateCatalogQuote({
    item,
    quantity,
    decorationMethod,
    rush,
  });

  const payload: QuotePayload = {
    catalogItemId,
    quantity,
    decorationMethod,
    rush,
    destination,
    shippingMethod,
    notes,
    status,
    selectedAssetIds,
  };

  return { item, calculated, payload };
}
