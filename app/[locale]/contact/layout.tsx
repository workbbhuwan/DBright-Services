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
      : 'Contact Us | D.BRIGHT Corporation',
    description: isJa
      ? '株式会社D.Bright（D.BRIGHT Corporation）へのお問い合わせ。電話：047-711-2099、メール：info@dbrightservices.com。千葉県市川市。'
      : 'Contact D.BRIGHT Corporation. Phone: 047-711-2099, Email: info@dbrightservices.com. Ichikawa City, Chiba, Japan.',
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
        : 'Contact D.BRIGHT Corporation',
      description: isJa
        ? '株式会社D.Brightへのお問い合わせはこちら。'
        : 'Get in touch with D.BRIGHT Corporation.',
      url: isJa ? `${SITE_URL}/contact` : `${SITE_URL}/en/contact`,
      images: [{ url: `${SITE_URL}/logo.png`, alt: 'D.Bright Contact' }],
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
