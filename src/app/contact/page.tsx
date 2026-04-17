import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Merch Maverick",
  description: "Get in touch with Merch Maverick to start a factory-owned custom merchandise project across Europe and America.",
};

export default function ContactPage() {
  return (
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
            Ready to start a premium custom merchandise project? Send your brief
            and we will turn it into pricing, next steps, and a real production
            path.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Send us a message
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-light dark:text-text-dark text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-light dark:text-text-dark text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-light dark:text-text-dark text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                    Industry
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-light dark:text-text-dark text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all">
                    <option value="">Select industry</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="corporate">Corporate</option>
                    <option value="fitness">Fitness</option>
                    <option value="industrial">Industrial</option>
                    <option value="events">Events</option>
                    <option value="influencers">Influencers & Artists</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-light dark:text-text-dark text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all resize-none"
                  placeholder="Tell us about your project — product type, quantity, timeline..."
                />
              </div>
              <button
                type="submit"
                className="bg-teal hover:bg-teal-dark text-white w-full py-4 rounded-xl font-semibold transition-all hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8">
              <h3 className="font-semibold text-text-light dark:text-text-dark mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-text-light dark:text-text-dark">Email</p>
                    <a href="mailto:hello@merchmaverick.com" className="text-sm text-teal hover:underline">
                      hello@merchmaverick.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-text-light dark:text-text-dark">Phone</p>
                    <a href="tel:+31000000000" className="text-sm text-teal hover:underline">
                      +31 (0) 000 000 000
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-text-light dark:text-text-dark">Location</p>
                    <p className="text-sm text-muted-light dark:text-muted-dark">
                      Serving Europe & America · Production in Bangladesh & China
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-teal/30 bg-teal/5 dark:bg-teal/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-teal" />
                <h3 className="font-semibold text-text-light dark:text-text-dark">
                  Response Time Guarantee
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-light dark:text-muted-dark">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  We respond to all inquiries within 2 hours
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Detailed quotes delivered same day
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  No commitment required
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  3D approval and material guidance available
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8 text-center">
              <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                Need a quote quickly?
              </p>
              <Link href="/quote">
                <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                  Get Instant Quote <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
