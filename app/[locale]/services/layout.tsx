import type { Metadata } from 'next';
import { i18n, type Locale } from '@/config/i18n';
import { getContent } from '@/content';

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
      ? '株式会社D.Bright サービス一覧 | ホテル清掃・人材派遣・留学サポート・ハラール事業'
      : 'Our Services | Hotel Cleaning, Staffing, Study Abroad, Halal Business',
    description: isJa
      ? '株式会社D.Bright（D.BRIGHT Corporation）のサービス一覧。ホテル清掃、人材派遣、ハラール事業支援、留学サポートなど幅広いサービスを千葉県市川市より提供。'
      : 'Services by D.BRIGHT Corporation: hotel cleaning, worker dispatch, halal business, study abroad support from Ichikawa, Chiba, Japan.',
    alternates: {
      canonical: isJa ? `${SITE_URL}/services` : `${SITE_URL}/en/services`,
      languages: {
        ja: `${SITE_URL}/services`,
        en: `${SITE_URL}/en/services`,
        'x-default': `${SITE_URL}/services`,
      },
    },
    openGraph: {
      title: isJa
        ? '株式会社D.Bright サービス一覧'
        : 'D.BRIGHT Corporation Services',
      description: isJa
        ? '株式会社D.Brightのホテル清掃、人材派遣、留学サポート、ハラール事業支援のサービス一覧。'
        : 'Professional hotel cleaning, staffing, study abroad, and halal business services.',
      url: isJa ? `${SITE_URL}/services` : `${SITE_URL}/en/services`,
      images: [{ url: `${SITE_URL}/logo.png`, alt: 'D.Bright Services' }],
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isJa = locale === 'ja';
  const content = getContent(locale as Locale);

  const pageUrl = isJa ? `${SITE_URL}/services` : `${SITE_URL}/en/services`;

  // BreadcrumbList for services page
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
        name: isJa ? 'サービス一覧' : 'Services',
        item: pageUrl,
      },
    ],
  };

  // WebPage schema
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: isJa
      ? '株式会社D.Bright サービス一覧'
      : 'D.BRIGHT Corporation Services',
    description: isJa
      ? '株式会社D.Brightのホテル清掃、人材派遣、留学サポート、ハラール事業支援のサービス一覧。'
      : 'Professional hotel cleaning, staffing, study abroad, and halal business services.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#corporation` },
    inLanguage: isJa ? 'ja' : 'en',
  };

  // Service schema for each service offered
  const serviceSchemas = content.services.items.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Corporation',
      '@id': `${SITE_URL}/#corporation`,
      name: '株式会社D.Bright',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    url: pageUrl,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, webPageJsonLd, ...serviceSchemas]),
        }}
      />
      {children}
    </>
  );
}
