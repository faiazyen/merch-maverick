import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

function TriangleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M20 2L38 34H2L20 2Z" stroke="url(#footerGrad)" strokeWidth="2" fill="none" />
      <path d="M20 10L31 30H9L20 10Z" stroke="url(#footerGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
      <defs>
        <linearGradient id="footerGrad" x1="0" y1="0" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#000000" }} className="text-white">
      {/* Purple gradient divider at top */}
      <div className="divider-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <TriangleMark className="w-8 h-8" />
              <span
                className="font-black italic text-2xl text-white uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                MAVERICK<span style={{ color: "#8B5CF6" }}>.</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Factory-direct B2B custom merchandise for European businesses.
              30–50% cheaper than distributors. No middlemen.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all hover:bg-purple-500/10"
                aria-label="LinkedIn"
              >
                <ExternalLink size={15} className="text-white/50 hover:text-purple-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all hover:bg-purple-500/10"
                aria-label="Instagram"
              >
                <ExternalLink size={15} className="text-white/50 hover:text-purple-400" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-xs text-white/30 uppercase tracking-widest mb-5">
              Solutions
            </h4>
            <ul className="space-y-3">
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
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs text-white/30 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
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
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs text-white/30 uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <MapPin size={14} className="mt-0.5 text-purple-500 shrink-0" />
                Europe-Based · Production in Bangladesh & China
              </li>
              <li>
                <a
                  href="mailto:hello@merchmaverick.com"
                  className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-purple-500" />
                  hello@merchmaverick.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+31000000000"
                  className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-purple-500" />
                  +31 (0) 000 000 000
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3.5 rounded-xl border border-white/5" style={{ background: "#111111" }}>
              <p className="text-xs text-white/40">
                Response time: <span className="text-white font-medium">Under 2 hours</span>
              </p>
              <p className="text-xs text-white/40 mt-1">
                Quotes delivered: <span className="text-white font-medium">Same day</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Maverick. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "GDPR"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-white/20 hover:text-white/50 text-sm transition-colors"
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
