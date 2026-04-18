"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FolderClock, Building2, LogIn } from "lucide-react";
import { MaverickIcon, MaverickLogo } from "@/components/branding/MaverickLogo";

const portalFeatures = [
  { icon: ShieldCheck, label: "Secure sign-in", desc: "Access starts with a protected business account" },
  { icon: Building2, label: "Saved company profile", desc: "Keep core business details ready for future orders" },
  { icon: FolderClock, label: "Portal foundation", desc: "Orders, specs, and documents are still rolling out" },
  { icon: LogIn, label: "Return path", desc: "Sign back in later instead of restarting from scratch" },
];

export function ClientPortalSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary-light dark:bg-bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
              Secure portal access, without pretending it is further along than it is
            </h2>
            <p className="text-lg text-muted-light dark:text-muted-dark mb-8">
              Today the portal lets clients create an account and save their business profile.
              Order tracking, saved specs, invoices, and richer account tooling are still being phased in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {portalFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark"
                  >
                    <Icon size={18} className="text-text-light dark:text-text-dark mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-text-light dark:text-text-dark">
                        {feature.label}
                      </p>
                      <p className="text-xs text-muted-light dark:text-muted-dark">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/portal"
              className="inline-flex items-center gap-2 border-b border-text-light pb-0.5 font-semibold text-text-light transition-all hover:gap-3 dark:border-text-dark dark:text-text-dark"
            >
              See portal access <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[1.8rem] border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-6 shadow-[0_18px_55px_rgba(17,24,39,0.06)]"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark">
                <div className="space-y-2">
                  <MaverickLogo size="sm" descriptor="Client portal" />
                  <p className="text-xs text-muted-light dark:text-muted-dark">
                    Profile-first access for orders, reorders, and approvals
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-text-light shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-text-dark">
                  <MaverickIcon className="h-5 w-auto" />
                </div>
              </div>

              {/* Order rows */}
              {[
                {
                  title: "Saved business profile",
                  copy: "Business details, industry, country, and primary email stored for faster follow-up.",
                  progress: 100,
                  color: "bg-success",
                },
                {
                  title: "Orders and reorders",
                  copy: "Order visibility and reorder actions are planned next, but they are not live in the account yet.",
                  progress: 64,
                  color: "bg-teal",
                },
                {
                  title: "Assets and invoices",
                  copy: "Brand files, specs, invoices, and approvals are roadmap items for later portal phases.",
                  progress: 38,
                  color: "bg-info",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-text-light dark:text-text-dark">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-light dark:text-muted-dark">
                        {item.copy}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark px-2 py-0.5 rounded-full">
                      Phase 1
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border-light dark:bg-border-dark overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
