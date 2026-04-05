import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "Merch Maverick — Factory-Direct Custom Merchandise for European B2B",
  description:
    "Premium custom-branded apparel, uniforms, and merchandise for European businesses. Factory-direct from Bangladesh. 30–50% cheaper than distributors. AI-powered quoting in under 2 minutes.",
  keywords: [
    "custom merchandise Europe",
    "B2B branded apparel",
    "custom uniforms Europe",
    "factory direct merchandise",
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
      "Premium custom merch for European businesses. 30–50% cheaper than distributors.",
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
