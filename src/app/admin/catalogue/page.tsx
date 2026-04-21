import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import AdminCatalogManager from "@/components/internal/AdminCatalogManager";
import AdminCategoryManager from "@/components/internal/AdminCategoryManager";
import { internalRoutesEnabled } from "@/lib/portal/admin-auth";
import { getPortalSessionUser, isInternalUser } from "@/lib/portal/data";
import { mapCatalogCategories, mapCatalogItems } from "@/lib/portal/record-mappers";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type ViewTab = "products" | "categories";

export default async function AdminCataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  if (!internalRoutesEnabled) notFound();

  const user = await getPortalSessionUser();
  if (!user) redirect("/sign-in?mode=login&next=%2Fadmin%2Fcatalogue");

  const allowed = await isInternalUser();
  if (!allowed) notFound();

  const admin = getSupabaseAdminClient();
  const params = await searchParams;
  const view: ViewTab = params.view === "categories" ? "categories" : "products";

  let items = mapCatalogItems([]);
  let categories = mapCatalogCategories([]);

  if (admin) {
    const [itemsResult, catsResult] = await Promise.all([
      admin
        .from("catalog_items")
        .select(`*, catalog_product_images(id,item_id,url,alt_text,is_primary,display_order,created_at), catalog_product_variants(id,item_id,type,label,value,display_order,is_available,created_at)`)
        .order("created_at", { ascending: false }),
      admin
        .from("catalog_categories")
        .select("*")
        .order("display_order", { ascending: true }),
    ]);
    items = mapCatalogItems(itemsResult.data ?? []);
    categories = mapCatalogCategories(catsResult.data ?? []);
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-[13px] text-[#5f7087] transition-colors hover:text-[#2563EB]">
            ← Back to CRM
          </Link>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#10233f]">
                Catalog Management
              </h1>
              <p className="mt-1 text-[13px] text-[#73839b]">
                {items.length} product{items.length !== 1 ? "s" : ""} · {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
              </p>
            </div>
          </div>
        </div>

        {/* View tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-[#e2e8f0] bg-white p-1 w-fit shadow-[0_1px_4px_rgba(16,35,63,0.04)]">
          {(["products", "categories"] as ViewTab[]).map((tab) => (
            <Link
              key={tab}
              href={`/admin/catalogue${tab === "categories" ? "?view=categories" : ""}`}
              className={`rounded-lg px-5 py-2 text-[13px] font-medium capitalize transition-colors ${view === tab ? "bg-[#2563EB] text-white shadow-sm" : "text-[#7b8aa0] hover:text-[#10233f]"}`}
            >
              {tab}
            </Link>
          ))}
        </div>

        {view === "products" && <AdminCatalogManager initialItems={items} categories={categories} />}
        {view === "categories" && <AdminCategoryManager initialCategories={categories} />}
      </div>
    </div>
  );
}
