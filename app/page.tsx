"use client";

import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import { useLanguage } from '@/lib/translations/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />

      <Intro />

      <Services />

      <Testimonials />

      <WhyChooseUs />

      <FAQ />

    </div>
  );
}

