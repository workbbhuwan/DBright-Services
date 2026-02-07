"use client";

import Hero from '@/components/home/Hero';
import SectionDivider from '@/components/home/SectionDivider';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';
import { useLanguage } from '@/lib/translations/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />

      <Intro />

      <Services />

      <Testimonials />

      <SectionDivider
        label={language === 'ja' ? '選ばれる理由' : 'Why Choose Us'}
        linkText={language === 'ja' ? 'サービスを見る' : 'Get A Service'}
        linkHref="/services"
      />
      <WhyChooseUs />

      <SectionDivider
        label={language === 'ja' ? 'よくある質問' : 'FAQ'}
        linkText={language === 'ja' ? 'サービスを見る' : 'Get A Service'}
        linkHref="/services"
      />
      <FAQ />

      <CTA />
    </div>
  );
}

