"use client";

import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Spacing is now controlled by the parent (this file) */}
      <Hero />
      <Intro />
      <Services />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}

