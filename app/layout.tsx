import type { Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root layout – lean shell.
 * All metadata, JSON-LD, Navbar, Footer, and LanguageProvider
 * are now handled by app/[locale]/layout.tsx so each locale
 * gets its own SEO-optimised output.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
