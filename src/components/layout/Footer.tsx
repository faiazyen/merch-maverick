import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0c1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2351a4] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MM</span>
              </div>
              <span className="font-bold text-xl">Merch Maverick</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Factory-direct B2B custom merchandise for European businesses. Premium quality,
              30–50% cheaper than distributors, powered by AI.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#2351a4] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#2351a4] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-sm text-neutral-300 uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Hospitality & Hotels", href: "/hospitality" },
                { label: "Gyms & Fitness", href: "/fitness" },
                { label: "Corporate & Tech", href: "/corporate" },
                { label: "Industrial & Workwear", href: "/industrial" },
                { label: "Events & Festivals", href: "/events" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm text-neutral-300 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Pricing", href: "/pricing" },
                { label: "Get a Quote", href: "/quote" },
                { label: "Client Portal", href: "/portal" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-neutral-300 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-neutral-400">
                <MapPin size={15} className="mt-0.5 text-[#3b6fd4] shrink-0" />
                Europe-Based · Production in Bangladesh & China
              </li>
              <li>
                <a
                  href="mailto:hello@merchmaverick.com"
                  className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail size={15} className="text-[#3b6fd4]" />
                  hello@merchmaverick.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+31000000000"
                  className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone size={15} className="text-[#3b6fd4]" />
                  +31 (0) 000 000 000
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-neutral-400">
                Response time: <span className="text-white font-medium">Under 2 hours</span>
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Quotes delivered: <span className="text-white font-medium">Same day</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Merch Maverick. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "GDPR"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
