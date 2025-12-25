import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/translations/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

// Noto Sans JP for Japanese text
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// Inter for English text
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D.BRIGHT - Cleaning, Staffing, Study Abroad & Real Estate Services in Japan",
  description: "D.BRIGHT provides a wide range of services including cleaning, temporary staffing, study abroad support, and real estate. We connect Japan and the world with high-quality solutions tailored to your needs.",
  keywords: ["cleaning service", "staffing agency", "study abroad support", "real estate Japan", "temporary staffing", "Japan services", "worker dispatch", "留学サポート", "人材派遣"],
};

// Move viewport to dedicated export as per Next.js guidance
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${notoSansJP.variable} ${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <AnalyticsTracker />
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <Navbar />
            <main className="grow w-full">
              {/* Central fixed-width content wrapper */}
              <div className="site-container">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
