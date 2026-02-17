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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
