import { PortalQuoteConfigurator } from "@/components/portal/PortalQuoteConfigurator";
import { getPortalDataBundle } from "@/lib/portal/data";

type QuotesPageProps = {
  searchParams: Promise<{
    product?: string;
    reorder?: string;
  }>;
};

export default async function PortalQuotesPage({ searchParams }: QuotesPageProps) {
  const bundle = await getPortalDataBundle();
  const params = await searchParams;

  if (!bundle) {
    return null;
  }

  const reorderSource = params.reorder
    ? bundle.orders.find((order) => order.id === params.reorder)
    : undefined;
  const initialProductSlug = params.product ?? reorderSource?.productName.toLowerCase().replace(/\s+/g, "-");

  return (
    <PortalQuoteConfigurator
      availableAssets={bundle.assets}
      catalogItems={bundle.catalogItems}
      existingQuotes={bundle.quotes}
      initialProductSlug={initialProductSlug}
      profile={bundle.profile}
    />
  );
}
