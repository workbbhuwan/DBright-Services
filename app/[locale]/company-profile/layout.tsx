import type { Metadata } from 'next';
import { i18n } from '@/config/i18n';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dbrightservices.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === 'ja';

  return {
    title: isJa
      ? '株式会社D.Bright 会社概要 | 千葉県市川市'
      : 'Company Profile | D.BRIGHT Corporation',
    description: isJa
      ? '株式会社D.Bright（D.BRIGHT Corporation）の会社概要。代表取締役：オザ・ケサブ・ラズ。千葉県市川市を拠点に清掃業、人材派遣業、留学サポート、ハラール事業支援を展開。'
      : 'Company profile of D.BRIGHT Corporation (株式会社D.Bright). Representative Director: OJHA KESHAV RAJ. Based in Ichikawa, Chiba, Japan.',
    alternates: {
      canonical: isJa ? `${SITE_URL}/company-profile` : `${SITE_URL}/en/company-profile`,
      languages: {
        ja: `${SITE_URL}/company-profile`,
        en: `${SITE_URL}/en/company-profile`,
        'x-default': `${SITE_URL}/company-profile`,
      },
    },
    openGraph: {
      title: isJa
        ? '株式会社D.Bright 会社概要'
        : 'D.BRIGHT Corporation Company Profile',
      description: isJa
        ? '株式会社D.Bright（D.BRIGHT Corporation）の会社概要・事業内容・企業情報。'
        : 'About D.BRIGHT Corporation - Company overview, services, and business information.',
      url: isJa ? `${SITE_URL}/company-profile` : `${SITE_URL}/en/company-profile`,
      images: [{ url: `${SITE_URL}/logo.png`, alt: 'D.Bright Company Profile' }],
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function CompanyProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isJa = locale === 'ja';

  const pageUrl = isJa
    ? `${SITE_URL}/company-profile`
    : `${SITE_URL}/en/company-profile`;

  // BreadcrumbList for company profile page
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isJa ? 'ホーム' : 'Home',
        item: isJa ? SITE_URL : `${SITE_URL}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isJa ? '会社概要' : 'Company Profile',
        item: pageUrl,
      },
    ],
  };

  // AboutPage schema
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: isJa
      ? '株式会社D.Bright 会社概要'
      : 'D.BRIGHT Corporation Company Profile',
    description: isJa
      ? '株式会社D.Bright（D.BRIGHT Corporation）の会社概要・事業内容・企業情報。'
      : 'About D.BRIGHT Corporation - Company overview, services, and business information.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#corporation` },
    inLanguage: isJa ? 'ja' : 'en',
    mainEntity: { '@id': `${SITE_URL}/#corporation` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, aboutPageJsonLd]),
        }}
      />
      {children}
    </>
  );
}
