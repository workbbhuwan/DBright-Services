import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import { getContent } from '@/content';
import type { Locale } from '@/config/i18n';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dbrightservices.com';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isJa = locale === 'ja';
  const content = getContent(locale as Locale);

  // FAQPage structured data – boosts rich snippet eligibility
  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Homepage breadcrumb
  const homeBreadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isJa ? 'ホーム' : 'Home',
        item: isJa ? SITE_URL : `${SITE_URL}/en`,
      },
    ],
  };

  // WebPage schema for the homepage
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': isJa ? `${SITE_URL}/#webpage` : `${SITE_URL}/en/#webpage`,
    url: isJa ? SITE_URL : `${SITE_URL}/en`,
    name: isJa
      ? '株式会社D.Bright | ホテル清掃・人材派遣・留学サポート・ハラール事業'
      : '株式会社D.Bright | Hotel Cleaning, Staffing, Study Abroad, Halal Business',
    description: isJa
      ? '株式会社D.Brightは千葉県市川市を拠点に、ホテル清掃、人材派遣、留学サポート、ハラール事業支援など幅広いサービスを提供する総合サービス企業です。'
      : '株式会社D.Bright provides professional hotel cleaning, worker dispatch, study abroad support, and halal business services from Ichikawa City, Chiba, Japan.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#corporation` },
    inLanguage: isJa ? 'ja' : 'en',
    breadcrumb: { '@id': `${isJa ? SITE_URL : `${SITE_URL}/en`}/#breadcrumb` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqPageJsonLd, homeBreadcrumbJsonLd, webPageJsonLd]),
        }}
      />
      <div className="flex flex-col w-full overflow-hidden">
        <Hero />
        <Intro />
        <Services />
        <Testimonials />
        <WhyChooseUs />
        <FAQ />
      </div>
    </>
  );
}
