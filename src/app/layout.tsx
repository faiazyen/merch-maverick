import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  ],
  openGraph: {
    title: "Merch Maverick — Factory-Direct B2B Merchandise",
    description: "Premium custom merch for European businesses. 30–50% cheaper than distributors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
