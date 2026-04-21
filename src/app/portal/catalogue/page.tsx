import { getCatalogPageData } from "@/lib/portal/catalog";
import { CatalogGrid } from "@/components/portal/CatalogGrid";

export default async function PortalCataloguePage() {
  const { items, categories } = await getCatalogPageData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#10233f]">Product Catalogue</h2>
        <p className="mt-1 text-sm text-[#73839b]">
          Browse our full range. Order directly or request a custom quote.
        </p>
      </div>
      <CatalogGrid items={items} categories={categories} />
    </div>
  );
}
