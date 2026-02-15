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
    default: "株式会社D.Bright | D.BRIGHT Corporation | ホテル清掃・人材派遣・留学サポート・ハラール事業 | 千葉県市川市",
    template: "%s | 株式会社D.Bright（D.BRIGHT Corporation）",
  },
  description:
    "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供する総合サービス企業です。代表取締役：オザ・ケサブ・ラズ。電話：047-711-2099。D.BRIGHT provides professional cleaning, staffing, study abroad support, and halal business services in Japan.",
  keywords: [
    "株式会社D.Bright",
    "株式会社D.BRIGHT",
    "株式会社ディーブライト",
    "D.Bright",
    "D.BRIGHT",
    "D.BRIGHT Corporation",
    "ディーブライト",
    "DBright",
    "D Bright",
    "dbright services",
    "dbrightservices",
    "D.Bright 市川市",
    "D.Bright 千葉",
    "清掃サービス 市川市",
    "ホテル清掃 千葉",
    "人材派遣 市川市",
    "留学サポート 日本",
    "ハラール事業 日本",
    "ハラール事業支援",
    "千葉県市川市 清掃会社",
    "cleaning service Japan",
    "staffing agency Japan",
    "study abroad support Japan",
    "worker dispatch Japan",
    "halal business Japan",
    "hotel cleaning Chiba",
    "D.BRIGHT Ichikawa",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ja": SITE_URL,
      "en": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "株式会社D.Bright（D.BRIGHT Corporation）",
    title: "株式会社D.Bright | D.BRIGHT Corporation | ホテル清掃・人材派遣・留学サポート",
    description:
      "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供する総合サービス企業です。",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "株式会社D.Bright ロゴ - D.BRIGHT Corporation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社D.Bright | D.BRIGHT Corporation",
    description:
      "株式会社D.Bright（ディーブライト）- 千葉県市川市のホテル清掃・人材派遣・留学サポート・ハラール事業支援",
    images: [`${SITE_URL}/logo.png`],
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
    google: "6ThUQMa9oJIQdwucJPejDBreBzABpvHtEMZ0m9j19mk",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "format-detection": "telephone=no",
    "geo.region": "JP-12",
    "geo.placename": "Ichikawa, Chiba",
    "geo.position": "35.7219;139.9312",
    "ICBM": "35.7219, 139.9312",
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
    "@id": `${SITE_URL}/#corporation`,
    "name": "株式会社D.Bright",
    "alternateName": [
      "D.BRIGHT Corporation",
      "D.Bright",
      "D.BRIGHT",
      "ディーブライト",
      "株式会社ディーブライト",
      "株式会社D.BRIGHT",
      "Dbright Services",
      "DBright",
      "D Bright",
      "D.Bright Corporation"
    ],
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png`,
      "width": 512,
      "height": 512
    },
    "image": `${SITE_URL}/logo.png`,
    "description": "株式会社D.Bright（D.BRIGHT Corporation / ディーブライト）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供する総合サービス企業です。",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "オザ・ケサブ・ラズ",
      "alternateName": "OJHA KESHAV RAJ",
      "jobTitle": "代表取締役"
    },
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
    "taxID": "",
    "sameAs": [
      SITE_URL
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+81-47-711-2099",
        "contactType": "customer service",
        "availableLanguage": ["Japanese", "English", "Nepali"],
        "areaServed": "JP"
      },
      {
        "@type": "ContactPoint",
        "email": "info@dbrightservices.com",
        "contactType": "customer service",
        "availableLanguage": ["Japanese", "English", "Nepali"]
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Japan"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "knowsAbout": [
      "ホテル清掃",
      "人材派遣",
      "留学サポート",
      "ハラール事業支援",
      "清掃業",
      "労働者派遣業",
      "通訳・翻訳サービス",
      "Hotel Cleaning",
      "Worker Dispatch",
      "Study Abroad Support",
      "Halal Business Support",
      "Cleaning Services",
      "Staffing Agency"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "株式会社D.Bright サービス一覧",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ホテル清掃サービス",
            "description": "客室、ロビー、共用エリアにおける信頼性の高いホテル清掃"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "人材派遣サービス",
            "description": "さまざまな業界に対応した信頼できる人材派遣"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ハラール事業支援",
            "description": "ハラール食品店、レストラン、商品店の管理・運営・企画"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "留学サポート",
            "description": "日本人および外国人学生に向けた国内外の留学サポート"
          }
        }
      ]
    }
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
    "@id": `${SITE_URL}/#localbusiness`,
    "name": "株式会社D.Bright",
    "alternateName": ["D.BRIGHT Corporation", "D.Bright", "D.BRIGHT", "ディーブライト", "株式会社ディーブライト", "DBright"],
    "description": "株式会社D.Bright（D.BRIGHT Corporation）は千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供する総合サービス企業です。",
    "url": SITE_URL,
    "telephone": "+81-47-711-2099",
    "email": "info@dbrightservices.com",
    "image": `${SITE_URL}/logo.png`,
    "logo": `${SITE_URL}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "新田4-18-22 ハイホーム田中201号室",
      "addressLocality": "市川市",
      "addressRegion": "千葉県",
      "postalCode": "272-0035",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.7219,
      "longitude": 139.9312
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    "priceRange": "¥¥",
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "JPY",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 35.7219,
        "longitude": 139.9312
      },
      "geoRadius": "50000"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": "株式会社D.Bright",
    "alternateName": ["D.BRIGHT Corporation", "ディーブライト", "DBright Services"],
    "url": SITE_URL,
    "publisher": {
      "@id": `${SITE_URL}/#corporation`
    },
    "inLanguage": ["ja", "en"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    "url": SITE_URL,
    "name": "株式会社D.Bright | D.BRIGHT Corporation | 公式サイト",
    "description": "株式会社D.Bright（D.BRIGHT Corporation）公式ウェブサイト。ホテル清掃、人材派遣、留学サポート、ハラール事業支援。",
    "isPartOf": {
      "@id": `${SITE_URL}/#website`
    },
    "about": {
      "@id": `${SITE_URL}/#corporation`
    },
    "inLanguage": "ja"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
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
