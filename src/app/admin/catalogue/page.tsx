import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import AdminCatalogManager from "@/components/internal/AdminCatalogManager";
import { internalRoutesEnabled } from "@/lib/portal/admin-auth";
import { getPortalSessionUser, isInternalUser } from "@/lib/portal/data";
import { mapCatalogItems } from "@/lib/portal/record-mappers";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export default async function AdminCataloguePage() {
  if (!internalRoutesEnabled) {
    notFound();
  }

  const user = await getPortalSessionUser();
  if (!user) {
    redirect("/sign-in?mode=login&next=%2Fadmin%2Fcatalogue");
  }

  const allowed = await isInternalUser();
  if (!allowed) {
    notFound();
  }

  const admin = getSupabaseAdminClient();
  let items = mapCatalogItems([]);

  if (admin) {
    const result = await admin
      .from("catalog_items")
      .select("*")
      .order("created_at", { ascending: false });
    items = mapCatalogItems(result.data ?? []);
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm text-[#5f7087] transition-colors hover:text-[#215dbe]"
          >
            ← Back to CRM
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#10233f]">
            Catalog Management
          </h1>
          <p className="mt-1 text-sm text-[#73839b]">
            {items.length} product{items.length !== 1 ? "s" : ""} · add, edit, or remove catalog
            items
          </p>
        </div>

        <AdminCatalogManager initialItems={items} />
      </div>
    </div>
  );
}
