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
      ? '株式会社D.Bright お問い合わせ | 電話・メール'
      : 'Contact Us | 株式会社D.Bright',
    description: isJa
      ? '株式会社D.Brightへのお問い合わせ。電話：047-711-2099、メール：info@dbrightservices.com。千葉県市川市。'
      : 'Contact 株式会社D.Bright. Phone: 047-711-2099, Email: info@dbrightservices.com. Ichikawa City, Chiba, Japan.',
    alternates: {
      canonical: isJa ? `${SITE_URL}/contact` : `${SITE_URL}/en/contact`,
      languages: {
        ja: `${SITE_URL}/contact`,
        en: `${SITE_URL}/en/contact`,
        'x-default': `${SITE_URL}/contact`,
      },
    },
    openGraph: {
      title: isJa
        ? '株式会社D.Bright お問い合わせ'
        : 'Contact 株式会社D.Bright',
      description: isJa
        ? '株式会社D.Brightへのお問い合わせはこちら。'
        : 'Get in touch with 株式会社D.Bright.',
      url: isJa ? `${SITE_URL}/contact` : `${SITE_URL}/en/contact`,
      images: [{ url: `${SITE_URL}/logo.png`, alt: 'D.Bright Contact' }],
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isJa = locale === 'ja';

  const pageUrl = isJa ? `${SITE_URL}/contact` : `${SITE_URL}/en/contact`;

  // BreadcrumbList for contact page
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
        name: isJa ? 'お問い合わせ' : 'Contact',
        item: pageUrl,
      },
    ],
  };

  // ContactPage schema
  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: isJa
      ? '株式会社D.Bright お問い合わせ'
      : 'Contact 株式会社D.Bright',
    description: isJa
      ? '株式会社D.Brightへのお問い合わせはこちら。電話：047-711-2099。'
      : 'Contact 株式会社D.Bright. Phone: 047-711-2099, Email: info@dbrightservices.com.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#corporation` },
    inLanguage: isJa ? 'ja' : 'en',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, contactPageJsonLd]),
        }}
      />
      {children}
    </>
  );
}
