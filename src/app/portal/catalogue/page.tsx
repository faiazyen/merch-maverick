import Link from "next/link";

import { getPortalDataBundle } from "@/lib/portal/data";

export default async function PortalCataloguePage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-6 xl:flex-row">
        <aside className="w-full rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)] xl:w-72 xl:self-start">
          <div className="space-y-8">
            <FilterBlock title="Categories" items={["Apparel", "Accessories", "Office", "Drinkware"]} />
            <FilterBlock title="Material" items={["Organic Cotton", "Recycled Polyester", "Ceramic", "Stainless Steel"]} />
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                Primary Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {["#0f172a", "#ffffff", "#215dbe", "#9f6b16", "#9fb0c9"].map((color) => (
                  <span
                    key={color}
                    className="block h-6 w-6 rounded-full border border-[#dbe5f1]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#677992]">
                Factory Direct Precision
              </p>
              <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#10233f]">
                Curated Collections
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#73839b]">
                Browse benchmark-ready product families with clear materials, MOQ guidance, decoration compatibility, and realistic production expectations before you brief our team.
              </p>
            </div>
            <div className="rounded-xl border border-[#dbe5f1] bg-white px-4 py-3 text-sm font-medium text-[#5f7087]">
              Sort by: Production fit
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
            {bundle.catalogItems.map((item) => (
              <article key={item.id} className="group">
                <div className="aspect-[4/5] rounded-2xl bg-[#e9eff8]" />
                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#215dbe]">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#10233f]">{item.title}</h3>
                  <p className="mt-2 min-h-[42px] text-sm text-[#73839b]">{item.description}</p>
                  <div className="mt-4 grid gap-2 text-xs text-[#5a6d87]">
                    <div className="rounded-xl bg-[#f7fbff] px-3 py-2">
                      {item.material} · MOQ {item.moq}
                    </div>
                    <div className="rounded-xl bg-[#f7fbff] px-3 py-2">
                      Decorates well with {item.decorationMethods.map((method) => method.replace("-", " ")).join(", ")}
                    </div>
                    <div className="rounded-xl bg-[#f7fbff] px-3 py-2">
                      Production benchmark: {item.leadTimeLabel}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#10233f]">
                      From ${item.minPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#73839b]">Spec-led quote</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-[#73839b]">
                    Special fabric, GSM, packaging, designer support, and QC requests are handled during quote review.
                  </p>
                  <Link
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                    href={`/portal/quotes?product=${item.slug}`}
                  >
                    Configure now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-xl border border-[#dbe5f1] bg-[#f7fbff] px-4 py-2.5 text-sm text-[#556882]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
