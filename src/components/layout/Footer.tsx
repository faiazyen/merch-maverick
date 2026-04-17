import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(180deg,_#0f1010_0%,_#151616_100%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div>
                <span className="block font-semibold text-lg tracking-tight">
                  Merch Maverick
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Factory-owned production
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Factory-owned custom merchandise for brands across Europe and
              America with realistic 3D approvals, cotton-first material
              options, and fewer surprises before production begins.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-xl border border-white/14 hover:border-white/28 flex items-center justify-center transition-all text-white/60 hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl border border-white/14 hover:border-white/28 flex items-center justify-center transition-all text-white/60 hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
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
                { label: "Client Portal", href: "/portal" },
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
              <li>
                <a
                  href="tel:+31000000000"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  +31 (0) 000 000 000
                </a>
              </li>
            </ul>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="text-xs text-white/40">
                Response time:{" "}
                <span className="text-white font-medium">
                  Under 2 hours
                </span>
              </p>
              <p className="text-xs text-white/40 mt-1">
                Quotes delivered:{" "}
                <span className="text-white font-medium">
                  Same day
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Merch Maverick. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span
                key={item}
                className="text-white/40 text-sm hover:text-white cursor-pointer transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
