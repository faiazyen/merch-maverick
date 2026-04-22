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
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Page header */}
      <header className="border-b border-[#E5E2DB] bg-white px-6 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
              ← Back to Operations
            </Link>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
              Catalog Management
            </h1>
            <p className="mt-0.5 text-sm text-[#6B7280]">
              {items.length} product{items.length !== 1 ? "s" : ""} · {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* View tabs */}
        <div className="mb-6 flex gap-1.5 rounded-2xl border border-[#E5E2DB] bg-white p-1.5 w-fit">
          {(["products", "categories"] as ViewTab[]).map((tab) => (
            <Link
              key={tab}
              href={`/admin/catalogue${tab === "categories" ? "?view=categories" : ""}`}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold capitalize transition-colors ${view === tab ? "bg-[#1A1A1A] text-white shadow-sm" : "text-[#6B7280] hover:bg-[#F5F4F0] hover:text-[#1A1A1A]"}`}
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
