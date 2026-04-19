import { mapCatalogItems } from "@/lib/portal/record-mappers";
import type { CatalogItem } from "@/lib/portal/types";
import { calculateCatalogQuote, getCatalogDecorationOptions } from "@/lib/portal/workflow";
import { getSupabaseServerClient } from "@/lib/supabase/server";

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
      min_price: 18.5,
      max_price: 22.5,
      image: "/images/solutions/corporate/product.jpg",
      badge: "Best Seller",
      moq: 50,
      lead_time_days: 28,
      lead_time_label: "3-5 weeks",
      decoration_methods: ["embroidery", "screen-print", "dtg"],
      variants: ["Navy", "Black", "Heather Grey"],
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
      min_price: 10.8,
      max_price: 12,
      image: "/images/solutions/corporate/process.jpg",
      moq: 100,
      lead_time_days: 24,
      lead_time_label: "3-4 weeks",
      decoration_methods: ["screen-print", "sublimation"],
      variants: ["White", "Charcoal"],
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
      min_price: 7.5,
      max_price: 9.8,
      image: "/images/solutions/events/product.jpg",
      badge: "Program Favorite",
      moq: 100,
      lead_time_days: 21,
      lead_time_label: "3-4 weeks",
      decoration_methods: ["screen-print", "embroidery", "dtg"],
      variants: ["Natural", "Black", "Olive"],
    },
  ]);
}

export async function getCatalogItemById(catalogItemId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return buildFallbackCatalogItems().find((item) => item.id === catalogItemId) ?? null;
  }

  const result = await supabase
    .from("catalog_items")
    .select("*")
    .eq("id", catalogItemId)
    .maybeSingle();

  if (result.error || !result.data) {
    return buildFallbackCatalogItems().find((item) => item.id === catalogItemId) ?? null;
  }

  return mapCatalogItems([result.data])[0] ?? null;
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
