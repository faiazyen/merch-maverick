import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Merch Maverick — Factory-Owned Custom Merchandise for Europe and America",
  description:
    "Premium custom-branded apparel, uniforms, and merchandise for businesses across Europe and America. Factory-owned production, 3D approval, cotton-first material options, and 30–50% better pricing than distributors.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-light-192x192.png", sizes: "192x192", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-192x192.png", sizes: "192x192", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-light-512x512.png", sizes: "512x512", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-512x512.png", sizes: "512x512", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon-light-192x192.png",
  },
  keywords: [
    "custom merchandise Europe",
    "custom merchandise America",
    "B2B branded apparel",
    "custom uniforms Europe",
    "custom uniforms USA",
    "factory direct merchandise",
    "factory owned merchandise",
    "corporate merchandise supplier",
    "hotel uniforms supplier",
    "gym branded apparel",
    "influencer merch",
    "artist merchandise",
    "custom textile solutions",
  ],
  openGraph: {
    title: "The Merch Maverick — Factory-Direct B2B Merchandise",
    description:
      "Premium custom merch for businesses across Europe and America with factory-owned production and stronger margins.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
