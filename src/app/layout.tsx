import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "Merch Maverick — Factory-Owned Custom Merchandise for Europe and America",
  description:
    "Premium custom-branded apparel, uniforms, and merchandise for businesses across Europe and America. Factory-owned production, 3D approval, cotton-first material options, and 30–50% better pricing than distributors.",
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
    title: "Merch Maverick — Factory-Direct B2B Merchandise",
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
    <html lang="en" suppressHydrationWarning>
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
