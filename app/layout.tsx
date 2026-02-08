import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/translations/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import StickySidebar from "@/components/StickySidebar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

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
  title: {
    default: "株式会社D.Bright（D.BRIGHT Corporation）| 清掃・人材派遣・留学サポート・不動産",
    template: "%s | 株式会社D.Bright",
  },
  description:
    "株式会社D.Bright（D.BRIGHT Corporation）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供しています。D.BRIGHT provides cleaning, staffing, study abroad support, and halal business services in Japan.",
  keywords: [
    "株式会社D.Bright",
    "D.Bright",
    "D.BRIGHT",
    "ディーブライト",
    "D.BRIGHT Corporation",
    "清掃サービス",
    "ホテル清掃",
    "人材派遣",
    "留学サポート",
    "ハラール事業",
    "千葉県市川市",
    "cleaning service Japan",
    "staffing agency Japan",
    "study abroad support",
    "worker dispatch",
    "留学サポート",
    "人材派遣",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "ja": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "株式会社D.Bright",
    title: "株式会社D.Bright（D.BRIGHT Corporation）| 清掃・人材派遣・留学サポート",
    description:
      "株式会社D.Bright（D.BRIGHT Corporation）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供。",
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社D.Bright（D.BRIGHT Corporation）",
    description:
      "千葉県市川市のホテル清掃・人材派遣・留学サポート・ハラール事業支援",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
  other: {
    "format-detection": "telephone=no",
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "株式会社D.Bright",
    "alternateName": ["D.BRIGHT Corporation", "D.Bright", "D.BRIGHT", "ディーブライト", "Dbright Services"],
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "株式会社D.Bright（D.BRIGHT Corporation）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供しています。",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "新田4-18-22 ハイホーム田中201号室",
      "addressLocality": "市川市",
      "addressRegion": "千葉県",
      "postalCode": "272-0035",
      "addressCountry": "JP"
    },
    "telephone": "+81-47-711-2099",
    "email": "info@dbrightservices.com",
    "legalName": "株式会社D.Bright",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+81-47-711-2099",
      "contactType": "customer service",
      "availableLanguage": ["Japanese", "English", "Nepali"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Japan"
    },
    "knowsAbout": [
      "ホテル清掃",
      "人材派遣",
      "留学サポート",
      "ハラール事業支援",
      "Hotel Cleaning",
      "Worker Dispatch",
      "Study Abroad Support",
      "Halal Business Support"
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "株式会社D.Bright ホーム",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "株式会社D.Bright サービス一覧",
        "item": `${SITE_URL}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "株式会社D.Bright 会社概要",
        "item": `${SITE_URL}/company-profile`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "株式会社D.Bright お問い合わせ",
        "item": `${SITE_URL}/contact`
      }
    ]
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "株式会社D.Bright",
    "alternateName": ["D.BRIGHT Corporation", "D.Bright", "ディーブライト"],
    "description": "株式会社D.Brightは千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供。",
    "url": SITE_URL,
    "telephone": "+81-47-711-2099",
    "email": "info@dbrightservices.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "新田4-18-22 ハイホーム田中201号室",
      "addressLocality": "市川市",
      "addressRegion": "千葉県",
      "postalCode": "272-0035",
      "addressCountry": "JP"
    },
    "openingHours": "Mo-Fr 10:00-19:00",
    "priceRange": "¥¥"
  };

  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.variable} ${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <AnalyticsTracker />
          <StickySidebar />
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
