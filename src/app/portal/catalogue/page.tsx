import { getPortalDataBundle } from "@/lib/portal/data";
import { CatalogGrid } from "@/components/portal/CatalogGrid";

export default async function PortalCataloguePage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return (
    <div className="space-y-6">
      <CatalogGrid items={bundle.catalogItems} />
    </div>
  );
}
