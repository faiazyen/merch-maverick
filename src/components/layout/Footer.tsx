"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Shield } from "lucide-react";
import { MaverickLogo } from "@/components/branding/MaverickLogo";

export function Footer() {
  const pathname = usePathname();
  const hideMarketingChrome =
    pathname.startsWith("/portal") || pathname.startsWith("/admin") || pathname.startsWith("/internal");

  if (hideMarketingChrome) {
    return null;
  }

  return (
    <footer className="bg-[linear-gradient(180deg,_#0f1010_0%,_#151616_100%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <MaverickLogo
                size="md"
                descriptor="Factory-owned production"
                surface="dark"
                wordmarkClassName="[--maverick-wordmark-plate:transparent] [--maverick-wordmark-text:#f8fffd] dark:[--maverick-wordmark-plate:transparent] dark:[--maverick-wordmark-text:#f8fffd]"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Factory-owned custom merchandise for brands across Europe and
              America with realistic 3D approvals, cotton-first material
              options, and fewer surprises before production begins.
            </p>
            <p className="text-xs text-white/40">
              Email is the active contact channel while richer account tooling is still rolling out.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-medium text-xs text-white/40 uppercase tracking-widest mb-5">
              Solutions
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Hospitality & Hotels", href: "/solutions/hospitality" },
                { label: "Corporate & Tech", href: "/solutions/corporate" },
                { label: "Gyms & Fitness", href: "/solutions/fitness" },
                { label: "Industrial & Workwear", href: "/solutions/industrial" },
                { label: "Events & Festivals", href: "/solutions/events" },
                { label: "Influencers & Artists", href: "/solutions/influencers-artists" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-xs text-white/40 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Pricing", href: "/pricing" },
                { label: "Case Studies", href: "/testimonials" },
                { label: "Get a Quote", href: "/quote" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-xs text-white/40 uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Serving Europe & America · Production in Bangladesh & China
              </li>
              <li>
                <a
                  href="mailto:hello@merchmaverick.com"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  hello@merchmaverick.com
                </a>
              </li>
            </ul>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="text-xs text-white/40">
                Contact path:{" "}
                <span className="text-white font-medium">
                  Email or quote builder
                </span>
              </p>
              <p className="text-xs text-white/40 mt-1">
                Portal status:{" "}
                <span className="text-white font-medium">
                  Account foundation live, order tools still rolling out
                </span>
              </p>
              <div className="mt-4 border-t border-white/10 pt-3">
                <Link
                  href="/sign-in?mode=login&next=%2Fadmin"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-white/30 transition-colors hover:text-white/60"
                >
                  <Shield size={12} />
                  Internal team access
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MaverickLogo
              size="sm"
              surface="dark"
              showDescriptor={false}
              wordmarkClassName="[--maverick-wordmark-plate:transparent] [--maverick-wordmark-text:#f8fffd] dark:[--maverick-wordmark-plate:transparent] dark:[--maverick-wordmark-text:#f8fffd]"
            />
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} The Merch Maverick. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/40 text-sm hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
