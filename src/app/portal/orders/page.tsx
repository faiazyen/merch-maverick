import { getPortalDataBundle } from "@/lib/portal/data";
import { OrdersView } from "@/components/portal/OrdersView";

export default async function PortalOrdersPage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return <OrdersView orders={bundle.orders} />;
}
