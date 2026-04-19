import { getPortalDataBundle } from "@/lib/portal/data";
import { buildMockPortalBundle } from "@/lib/portal/mock-data";
import {
  mapApprovals,
  mapOrders,
  mapQuotes,
} from "@/lib/portal/record-mappers";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PortalDataBundle, PortalProfile } from "@/lib/portal/types";

type InternalClientSummary = {
  businessName: string;
  email: string;
  orderCount: number;
  quoteCount: number;
  totalValue: number;
};

export type InternalCrmData = {
  stats: {
    activeOrders: number;
    activeClients: number;
    openQuotes: number;
    totalPipeline: number;
  };
  clients: InternalClientSummary[];
  recentOrders: PortalDataBundle["orders"];
  recentQuotes: PortalDataBundle["quotes"];
  approvals: PortalDataBundle["approvals"];
};

export async function getInternalCrmData(): Promise<InternalCrmData> {
  const admin = getSupabaseAdminClient();

  if (admin) {
    try {
      const [profilesResult, ordersResult, quotesResult, approvalsResult] = await Promise.all([
        admin.from("profiles").select("id,business_name,email"),
        admin.from("orders").select("*, events:order_events(*)").order("created_at", { ascending: false }),
        admin.from("quote_requests").select("*"),
        admin.from("approvals").select("*"),
      ]);

      if (!profilesResult.error && !ordersResult.error && !quotesResult.error && !approvalsResult.error) {
        const profiles = profilesResult.data ?? [];
        const orders = ordersResult.data ?? [];
        const quotes = quotesResult.data ?? [];
        const approvals = approvalsResult.data ?? [];

        const normalizedOrders = mapOrders(orders);
        const normalizedQuotes = mapQuotes(quotes);
        const normalizedApprovals = mapApprovals(approvals);

        const clients = profiles.map((profile) => {
          const clientOrders = orders.filter((order) => order.user_id === profile.id);
          const clientQuotes = quotes.filter((quote) => quote.user_id === profile.id);

          return {
            businessName: String(profile.business_name ?? "Client"),
            email: String(profile.email ?? ""),
            orderCount: clientOrders.length,
            quoteCount: clientQuotes.length,
            totalValue: clientOrders.reduce((sum, order) => sum + Number(order.total_amount ?? 0), 0),
          };
        });

        return {
          stats: {
            activeOrders: normalizedOrders.filter((order) => order.status !== "delivered").length,
            activeClients: clients.length,
            openQuotes: normalizedQuotes.filter(
              (quote) =>
                quote.status === "submitted" ||
                quote.status === "in-review" ||
                quote.status === "quoted" ||
                quote.status === "approved"
            ).length,
            totalPipeline: normalizedQuotes.reduce((sum, quote) => sum + quote.totalMax, 0),
          },
          clients,
          recentOrders: normalizedOrders,
          recentQuotes: normalizedQuotes,
          approvals: normalizedApprovals,
        };
      }
    } catch {
      // Fall through to user-scoped fallback.
    }
  }

  const bundle = await getPortalDataBundle();
  if (bundle) {
    return {
      stats: {
        activeOrders: bundle.orders.filter((order) => order.status !== "delivered").length,
        activeClients: 1,
        openQuotes: bundle.quotes.filter(
          (quote) =>
            quote.status === "submitted" ||
            quote.status === "in-review" ||
            quote.status === "quoted" ||
            quote.status === "approved"
        ).length,
        totalPipeline: bundle.quotes.reduce((sum, quote) => sum + quote.totalMax, 0),
      },
      clients: [
        {
          businessName: bundle.profile.businessName,
          email: bundle.profile.email,
          orderCount: bundle.orders.length,
          quoteCount: bundle.quotes.length,
          totalValue: bundle.orders.reduce((sum, order) => sum + order.totalAmount, 0),
        },
      ],
      recentOrders: bundle.orders,
      recentQuotes: bundle.quotes,
      approvals: bundle.approvals,
    };
  }

  const fallbackProfile: PortalProfile = {
    id: "internal-demo",
    email: "ops@merchmaverick.com",
    fullName: "Operations Team",
    businessName: "TechCorp",
    website: "",
    phone: "",
    industry: "Corporate",
    country: "Germany",
    jobTitle: "Operations",
    estimatedOrderVolume: "Quarterly programs",
    preferredCategories: ["Apparel", "Drinkware"],
    marketingOptIn: false,
    profileCompleted: true,
  };
  const fallback = buildMockPortalBundle(fallbackProfile);

  return {
    stats: {
      activeOrders: fallback.orders.filter((order) => order.status !== "delivered").length,
      activeClients: 1,
      openQuotes: fallback.quotes.filter(
        (quote) =>
          quote.status === "submitted" ||
          quote.status === "in-review" ||
          quote.status === "quoted" ||
          quote.status === "approved"
      ).length,
      totalPipeline: fallback.quotes.reduce((sum, quote) => sum + quote.totalMax, 0),
    },
    clients: [
      {
        businessName: fallback.profile.businessName,
        email: fallback.profile.email,
        orderCount: fallback.orders.length,
        quoteCount: fallback.quotes.length,
        totalValue: fallback.orders.reduce((sum, order) => sum + order.totalAmount, 0),
      },
    ],
    recentOrders: fallback.orders,
    recentQuotes: fallback.quotes,
    approvals: fallback.approvals,
  };
}
