import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n, type Locale } from '@/config/i18n';
import { getContent } from '@/content';
import { LanguageProvider } from '@/lib/translations/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import StickySidebar from '@/components/StickySidebar';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dbrightservices.com';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === 'ja';

  const title = isJa
    ? '株式会社D.Bright | プロ清掃サービス・人材派遣・ハラール事業 | 千葉県市川市'
    : '株式会社D.Bright | Professional Cleaning Service, Staffing, Halal Business | Ichikawa, Chiba';

  const description = isJa
    ? '株式会社D.Bright（ディーブライト）は千葉県市川市を拠点に、プロ清掃サービス、人材派遣、ハラール事業支援など幅広いサービスを提供する総合サービス企業です。'
    : '株式会社D.Bright provides professional cleaning services, worker dispatch, and halal business services from Ichikawa City, Chiba, Japan.';

  return {
    title: {
      default: title,
      template: '%s | 株式会社D.Bright',
    },
    description,
    keywords: isJa
      ? [
          '株式会社D.Bright', 'ディーブライト', 'D.Bright',
          'プロ清掃サービス 千葉', '人材派遣 市川市',
          'ハラール事業支援', '清掃サービス 市川市', '千葉県市川市 清掃会社',
        ]
      : [
          '株式会社D.Bright', 'D.Bright', 'cleaning service Japan',
          'professional cleaning Chiba', 'staffing agency Japan',
          'halal business Japan',
          'worker dispatch Japan', 'Ichikawa Chiba',
        ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: isJa ? SITE_URL : `${SITE_URL}/en`,
      languages: {
        ja: SITE_URL,
        en: `${SITE_URL}/en`,
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      type: 'website',
      locale: isJa ? 'ja_JP' : 'en_US',
      alternateLocale: isJa ? 'en_US' : 'ja_JP',
      url: isJa ? SITE_URL : `${SITE_URL}/en`,
      siteName: '株式会社D.Bright',
      title: isJa
        ? '株式会社D.Bright | プロ清掃サービス・人材派遣・ハラール事業'
        : '株式会社D.Bright | Professional Services in Japan',
      description,
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: '株式会社D.Bright ロゴ',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isJa
        ? '株式会社D.Bright'
        : '株式会社D.Bright | Professional Services',
      description: isJa
        ? '株式会社D.Bright（ディーブライト）- 千葉県市川市のプロ清掃サービス・人材派遣・ハラール事業支援'
        : '株式会社D.Bright - Professional cleaning, staffing, and halal business services in Ichikawa, Chiba.',
      images: [`${SITE_URL}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: '6ThUQMa9oJIQdwucJPejDBreBzABpvHtEMZ0m9j19mk',
    },
    icons: {
      icon: '/logo.png',
      apple: '/logo.png',
    },
    other: {
      'format-detection': 'telephone=no',
      'geo.region': 'JP-12',
      'geo.placename': 'Ichikawa, Chiba',
      'geo.position': '35.7219;139.9312',
      ICBM: '35.7219, 139.9312',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!i18n.locales.includes(locale as Locale)) {
    notFound();
  }

  const content = getContent(locale as Locale);
  const isJa = locale === 'ja';

  // JSON-LD Structured Data
  const corporationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${SITE_URL}/#corporation`,
    name: '株式会社D.Bright',
    alternateName: [
      'D.Bright', 'ディーブライト', '株式会社ディーブライト',
      'DBright', 'D Bright',
    ],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
    image: `${SITE_URL}/logo.png`,
    description: content.common.footer.brand,
    foundingDate: '2020',
    founder: {
      '@type': 'Person',
      name: 'オザ・ケサブ・ラズ',
      alternateName: 'OJHA KESHAV RAJ',
      jobTitle: isJa ? '代表取締役' : 'Representative Director',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.location.address.streetAddress,
      addressLocality: content.location.address.locality,
      addressRegion: content.location.address.region,
      postalCode: '272-0035',
      addressCountry: 'JP',
    },
    telephone: content.location.phone.intl,
    email: content.location.email.value,
    legalName: '株式会社D.Bright',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: content.location.phone.intl,
        contactType: 'customer service',
        availableLanguage: ['Japanese', 'English', 'Nepali'],
        areaServed: 'JP',
      },
    ],
    areaServed: { '@type': 'Country', name: 'Japan' },
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    knowsAbout: isJa
      ? ['プロ清掃サービス', '人材派遣', 'ハラール事業支援', '清掃業', '労働者派遣業']
      : ['Professional Cleaning Service', 'Worker Dispatch', 'Halal Business Support', 'Cleaning Services'],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: '株式会社D.Bright',
    alternateName: ['D.Bright', 'ディーブライト', 'DBright'],
    description: content.common.footer.brand,
    url: isJa ? SITE_URL : `${SITE_URL}/en`,
    telephone: content.location.phone.intl,
    email: content.location.email.value,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.location.address.streetAddress,
      addressLocality: content.location.address.locality,
      addressRegion: content.location.address.region,
      postalCode: '272-0035',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: content.location.geo.latitude,
      longitude: content.location.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    priceRange: '¥¥',
    paymentAccepted: 'Cash, Bank Transfer',
    currenciesAccepted: 'JPY',
  };

  // Breadcrumbs are now page-specific (in each sub-page layout)

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: '株式会社D.Bright',
    alternateName: ['D.Bright', 'ディーブライト', 'DBright'],
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#corporation` },
    inLanguage: ['ja', 'en'],
    // Note: SearchAction omitted — site has no search page.
    // Adding a fake SearchAction is invalid structured data
    // that Google may flag in Search Console.
  };

  const siteNavigationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${SITE_URL}/#navigation`,
    name: isJa ? 'メインナビゲーション' : 'Main Navigation',
    hasPart: [
      {
        '@type': 'WebPage',
        name: isJa ? 'ホーム' : 'Home',
        url: isJa ? SITE_URL : `${SITE_URL}/en`,
      },
      {
        '@type': 'WebPage',
        name: isJa ? 'サービス一覧' : 'Services',
        url: isJa ? `${SITE_URL}/services` : `${SITE_URL}/en/services`,
      },
      {
        '@type': 'WebPage',
        name: isJa ? '会社概要' : 'Company Profile',
        url: isJa ? `${SITE_URL}/company-profile` : `${SITE_URL}/en/company-profile`,
      },
      {
        '@type': 'WebPage',
        name: isJa ? 'お問い合わせ' : 'Contact',
        url: isJa ? `${SITE_URL}/contact` : `${SITE_URL}/en/contact`,
      },
    ],
  };

  return (
    <LanguageProvider initialLocale={locale as Locale}>
      <AnalyticsTracker />
      <StickySidebar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            corporationJsonLd,
            localBusinessJsonLd,
            websiteJsonLd,
            siteNavigationJsonLd,
          ]),
        }}
      />
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <main className="grow w-full">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
