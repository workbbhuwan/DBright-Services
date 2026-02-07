import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/translations/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D.BRIGHT - Cleaning, Staffing, Study Abroad & Real Estate Services in Japan",
  description: "D.BRIGHT provides a wide range of services including cleaning, temporary staffing, study abroad support, and real estate. We connect Japan and the world with high-quality solutions tailored to your needs.",
  keywords: ["cleaning service", "staffing agency", "study abroad support", "real estate Japan", "temporary staffing", "Japan services", "worker dispatch", "留学サポート", "人材派遣"],
};

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
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
