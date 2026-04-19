import { Fragment } from "react";
import Link from "next/link";
import { Download, Eye } from "lucide-react";

import { getPortalDataBundle } from "@/lib/portal/data";
import { buildOrderStatusSummary } from "@/lib/portal/workflow";
import { cn } from "@/lib/utils";

export default async function PortalOrdersPage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#10233f]">Order History</h2>
            <p className="mt-2 text-sm text-[#73839b]">
              Review your manufacturing pipeline, track progress, and launch reorders from completed work.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 self-start rounded-xl border border-[#dbe5f1] bg-white px-4 py-2.5 text-sm font-semibold text-[#526883] transition-colors hover:text-[#215dbe]">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {["Last 30 Days", "All Products", "All Statuses", "Clear Filters"].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#dbe5f1] bg-[#f7fbff] px-4 py-3 text-sm font-medium text-[#5f7087]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#dbe5f1] bg-white shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px]">
            <thead className="bg-[#f6f9fd]">
              <tr>
                {["Order ID", "Date", "Product", "Qty", "Total", "Status", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {bundle.orders.map((order, index) => (
                <Fragment key={order.id}>
                  <tr id={order.id} className={cn(index === 0 && "bg-[#f8fbff]")}>
                    <td className="px-6 py-5 font-semibold text-[#215dbe]">{order.orderNumber}</td>
                    <td className="px-6 py-5 text-sm text-[#51657f]">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-[#10233f]">{order.productName}</p>
                      <p className="mt-1 text-xs text-[#73839b]">{order.category}</p>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#425873]">{order.quantity}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-[#10233f]">
                      ${order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full bg-[#e8f1ff] px-2.5 py-1 text-xs font-semibold text-[#215dbe]">
                        {order.statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-[#dbe5f1] p-2 text-[#61728f] transition-colors hover:text-[#215dbe]">
                          <Eye size={14} />
                        </button>
                        <Link
                          className="rounded-lg bg-[#ffac18] px-3 py-2 text-xs font-semibold text-white"
                          href={`/portal/quotes?reorder=${order.id}`}
                        >
                          Reorder
                        </Link>
                      </div>
                    </td>
                  </tr>
                  {index === 0 && (
                    <tr className="bg-[#fbfdff]">
                      <td className="px-6 py-5" colSpan={7}>
                        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                          <div className="space-y-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                              Tracking Info
                            </p>
                            {order.events.map((event) => (
                              <div key={event.id} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={cn(
                                      "h-3 w-3 rounded-full",
                                      event.state === "done"
                                        ? "bg-[#1f9177]"
                                        : event.state === "current"
                                        ? "bg-[#215dbe]"
                                        : "bg-[#d5dfeb]"
                                    )}
                                  />
                                  <div className="mt-1 h-full w-px bg-[#dfe8f1]" />
                                </div>
                                <div className="pb-3">
                                  <p className="text-sm font-semibold text-[#10233f]">{event.label}</p>
                                  <p className="mt-1 text-xs text-[#73839b]">{event.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                              Order Breakdown
                            </p>
                            <div className="rounded-2xl bg-[#f6f9fd] p-4">
                              <div className="flex items-center justify-between py-2 text-sm">
                                <span className="text-[#73839b]">
                                  {order.productName} ({order.quantity} units)
                                </span>
                                <span className="font-semibold text-[#10233f]">
                                  ${order.totalAmount.toLocaleString()}
                                </span>
                              </div>
                              <div className="mt-3 rounded-xl bg-[#e8f1ff] px-4 py-3 text-sm text-[#215dbe]">
                                {buildOrderStatusSummary(order.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
