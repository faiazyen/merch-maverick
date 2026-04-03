// Pricing data derived from Merch Maverick business plan

export type ProductCategory =
  | "basic-apparel"
  | "uniforms"
  | "embroidered"
  | "towels-linens"
  | "footwear"
  | "accessories";

export type DecorationMethod = "screen-print" | "embroidery" | "dtg" | "sublimation";

export const CATEGORIES: Record<ProductCategory, { label: string; products: string[] }> = {
  "basic-apparel": {
    label: "Basic Apparel",
    products: ["T-Shirts", "Polo Shirts", "Hoodies", "Sweatshirts", "Jackets"],
  },
  uniforms: {
    label: "Uniforms & Workwear",
    products: ["Hotel Uniforms", "Restaurant Uniforms", "Industrial Workwear", "Chef Coats", "Aprons"],
  },
  embroidered: {
    label: "Embroidered Items",
    products: ["Embroidered Caps", "Embroidered Polos", "Embroidered Jackets"],
  },
  "towels-linens": {
    label: "Towels & Linens",
    products: ["Hotel Towels", "Gym Towels", "Bathrobes", "Table Linens", "Bed Linens"],
  },
  footwear: {
    label: "Footwear",
    products: ["Hotel Slippers", "Custom Shoes", "Branded Sandals"],
  },
  accessories: {
    label: "Accessories",
    products: ["Caps & Beanies", "Tote Bags", "Backpacks", "Scarves", "Socks"],
  },
};

// Standard MOQ per category
export const MOQ: Record<ProductCategory, { standard: number; rush: number }> = {
  "basic-apparel": { standard: 100, rush: 50 },
  uniforms: { standard: 50, rush: 25 },
  embroidered: { standard: 50, rush: 25 },
  "towels-linens": { standard: 200, rush: 100 },
  footwear: { standard: 200, rush: 100 },
  accessories: { standard: 100, rush: 50 },
};

// Rush surcharge by category
export const RUSH_SURCHARGE: Record<ProductCategory, number> = {
  "basic-apparel": 0.15,
  uniforms: 0.20,
  embroidered: 0.15,
  "towels-linens": 0.10,
  footwear: 0.25,
  accessories: 0.15,
};

// Base unit price range (our price, EUR)
export const BASE_PRICE: Record<ProductCategory, { min: number; max: number }> = {
  "basic-apparel": { min: 4, max: 12 },
  uniforms: { min: 22, max: 38 },
  embroidered: { min: 8, max: 20 },
  "towels-linens": { min: 4, max: 7 },
  footwear: { min: 15, max: 35 },
  accessories: { min: 2.5, max: 10 },
};

// Distributor price multiplier (what competitors charge)
export const DISTRIBUTOR_MULTIPLIER = 1.85; // ~85% more expensive

// Volume discount tiers
export function getVolumeDiscount(quantity: number): number {
  if (quantity >= 1000) return 0.20;
  if (quantity >= 500) return 0.15;
  if (quantity >= 200) return 0.10;
  if (quantity >= 100) return 0.05;
  return 0;
}

// Lead times
export const LEAD_TIMES = {
  standard: { min: 21, max: 35, label: "3–5 weeks" },
  rush: { min: 7, max: 10, label: "7–10 days" },
};

export interface QuoteResult {
  category: ProductCategory;
  product: string;
  quantity: number;
  decoration: DecorationMethod;
  isRush: boolean;
  unitPriceMin: number;
  unitPriceMax: number;
  totalMin: number;
  totalMax: number;
  distributorTotalMin: number;
  distributorTotalMax: number;
  savings: number;
  leadTime: string;
  moq: number;
  valid: boolean;
  errorMessage?: string;
}

export function calculateQuote(
  category: ProductCategory,
  product: string,
  quantity: number,
  decoration: DecorationMethod,
  isRush: boolean
): QuoteResult {
  const moq = isRush ? MOQ[category].rush : MOQ[category].standard;

  if (quantity < moq) {
    return {
      category, product, quantity, decoration, isRush,
      unitPriceMin: 0, unitPriceMax: 0,
      totalMin: 0, totalMax: 0,
      distributorTotalMin: 0, distributorTotalMax: 0,
      savings: 0,
      leadTime: "",
      moq,
      valid: false,
      errorMessage: `Minimum order quantity is ${moq} units for ${isRush ? "rush" : "standard"} orders.`,
    };
  }

  const base = BASE_PRICE[category];
  const volumeDiscount = getVolumeDiscount(quantity);
  const rushMultiplier = isRush ? (1 + RUSH_SURCHARGE[category]) : 1;

  // Embroidery adds a small cost
  const decorationAdder = decoration === "embroidery" ? 1.5 : 0;

  let unitMin = (base.min + decorationAdder) * (1 - volumeDiscount) * rushMultiplier;
  let unitMax = (base.max + decorationAdder) * (1 - volumeDiscount) * rushMultiplier;

  unitMin = Math.round(unitMin * 100) / 100;
  unitMax = Math.round(unitMax * 100) / 100;

  const totalMin = Math.round(unitMin * quantity);
  const totalMax = Math.round(unitMax * quantity);

  const distributorTotalMin = Math.round(totalMin * DISTRIBUTOR_MULTIPLIER);
  const distributorTotalMax = Math.round(totalMax * DISTRIBUTOR_MULTIPLIER);

  const savings = Math.round(((distributorTotalMin + distributorTotalMax) / 2 - (totalMin + totalMax) / 2));

  return {
    category, product, quantity, decoration, isRush,
    unitPriceMin: unitMin,
    unitPriceMax: unitMax,
    totalMin,
    totalMax,
    distributorTotalMin,
    distributorTotalMax,
    savings,
    leadTime: isRush ? LEAD_TIMES.rush.label : LEAD_TIMES.standard.label,
    moq,
    valid: true,
  };
}

// Competitor comparison data for pricing page
export const COMPETITOR_COMPARISON = [
  {
    product: "Custom Polo Shirt (500 units)",
    distributorMin: 12,
    distributorMax: 18,
    ourMin: 6,
    ourMax: 10,
  },
  {
    product: "Embroidered Uniform Set",
    distributorMin: 45,
    distributorMax: 70,
    ourMin: 22,
    ourMax: 38,
  },
  {
    product: "Hotel Towels (1000 units)",
    distributorMin: 8,
    distributorMax: 14,
    ourMin: 4,
    ourMax: 7,
  },
  {
    product: "Branded Hoodie (200 units)",
    distributorMin: 20,
    distributorMax: 30,
    ourMin: 10,
    ourMax: 16,
  },
  {
    product: "Custom Tote Bags (500 units)",
    distributorMin: 5,
    distributorMax: 8,
    ourMin: 2.5,
    ourMax: 4.5,
  },
];
