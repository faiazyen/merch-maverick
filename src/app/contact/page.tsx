import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — The Merch Maverick",
  description: "Get in touch with The Merch Maverick to start a factory-owned custom merchandise project across Europe and America.",
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
            Reach us through the channels that actually work today. For pricing,
            start with the quote builder or email your brief directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Direct contact methods */}
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Direct contact
            </h2>
            <div className="space-y-5">
              <p className="text-sm leading-7 text-muted-light dark:text-muted-dark">
                We removed the old contact form because it was not connected to a
                real submission pipeline. Use one of the working options below so
                your request actually reaches the team.
              </p>
              <div className="rounded-xl border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark p-5">
                <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                  Best for quotes and project briefs
                </p>
                <a
                  href="mailto:hello@merchmaverick.com?subject=Merch%20Maverick%20project%20brief"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline"
                >
                  <Mail size={16} />
                  hello@merchmaverick.com
                </a>
                <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">
                  Include your product type, quantity, branding needs, and timeline.
                </p>
              </div>
              <div className="rounded-xl border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark p-5">
                <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                  Best for pricing first
                </p>
                <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">
                  Build an estimate on the quote page and submit your project directly to our production team.
                </p>
                <Link
                  href="/quote"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-dark"
                >
                  Open quote builder
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
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
                  Email is the fastest reliable contact method right now
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Quote builder gives you an on-site estimate — submit directly for a response within one business day
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  No fake form submission or hidden handoff
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  Real project briefs go straight to the team inbox
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8 text-center">
              <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                Need a quote quickly?
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-dark"
              >
                Get Instant Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
