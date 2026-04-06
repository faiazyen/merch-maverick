"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, Package, Camera, BarChart3 } from "lucide-react";

const portalFeatures = [
  { icon: Eye, label: "Live Order Status", desc: "Track every order stage in real time" },
  { icon: Package, label: "Production Timeline", desc: "See exactly when your order ships" },
  { icon: Camera, label: "QC Photos", desc: "Review quality control photos before shipping" },
  { icon: BarChart3, label: "Order Analytics", desc: "Track spending and order history" },
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
              Real-Time Production Tracking
            </h2>
            <p className="text-lg text-muted-light dark:text-muted-dark mb-8">
              Your dedicated dashboard to track every order from production to
              delivery. Full transparency at every stage.
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

            <Link href="/portal">
              <button className="inline-flex items-center gap-2 text-text-light dark:text-text-dark font-semibold hover:gap-3 transition-all border-b border-text-light dark:border-text-dark pb-0.5">
                Access Client Portal <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-6 shadow-sm"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark">
                <div>
                  <p className="font-semibold text-text-light dark:text-text-dark">
                    Order Dashboard
                  </p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">
                    3 active orders
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-text-light dark:bg-text-dark flex items-center justify-center">
                  <span className="text-white dark:text-bg-primary-dark text-xs font-bold">MM</span>
                </div>
              </div>

              {/* Order rows */}
              {[
                { id: "#MM-2847", product: "200x Polo Shirts", status: "In Production", progress: 65, color: "bg-teal" },
                { id: "#MM-2846", product: "150x Custom Hoodies", status: "Quality Control", progress: 85, color: "bg-success" },
                { id: "#MM-2845", product: "500x Event Tees", status: "Shipped", progress: 100, color: "bg-info" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="p-3 rounded-lg border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-text-light dark:text-text-dark">
                        {order.product}
                      </p>
                      <p className="text-xs text-muted-light dark:text-muted-dark">
                        {order.id}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark px-2 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border-light dark:bg-border-dark overflow-hidden">
                    <div
                      className={`h-full rounded-full ${order.color} transition-all duration-500`}
                      style={{ width: `${order.progress}%` }}
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
