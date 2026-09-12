'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { ChevronsRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    const { language } = useLanguage();

    const headline = language === 'ja'
        ? '株式会社D.Bright\n確かな技術と信頼で輝く空間を'
        : '株式会社D.Bright\nTrusted Expertise For Cleaning';
    const subtitle = language === 'ja'
        ? '株式会社D.Brightは、経験豊富なプロフェッショナルが\n厳格な品質基準のもと最高の清掃サービスをご提供いたします。'
        : '株式会社D.Bright delivers professional cleaning services\nwith rigorous quality standards you can count on.';
    const ctaPrimary = language === 'ja' ? 'お問い合わせ' : 'Book Your Cleaning';
    const ctaSecondary = language === 'ja' ? 'サービスを見る' : 'View All Services';

    return (
        <section className="relative w-full bg-white overflow-hidden">
            <div className="site-container relative">
                <div className="flex flex-col items-center pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8">

                    {/* Rating Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3 mb-5"
                    >
                        <div className="flex -space-x-2">
                            {['/rating/1.webp', '/rating/2.png', '/rating/3.avif'].map((src, i) => (
                                <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                    <Image src={src} alt="" width={36} height={36} className="object-cover w-full h-full" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="flex">
                                {[1, 2, 3, 4].map(i => (
                                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                ))}
                                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" style={{ clipPath: 'inset(0 10% 0 0)' }} />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">4.9/5</span>
                            <span className="text-sm text-[#135b3e] font-medium">{language === 'ja' ? 'お客様評価' : 'Customer Rating'}</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <div className="w-full flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5 text-center whitespace-pre-line"
                            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                        >
                            {headline}
                        </motion.div>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-base sm:text-lg text-gray-500 leading-relaxed text-center max-w-xl mb-8"
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
                    >
                        <Link
                            href="/contact"
                            className="btn-primary text-base px-7 py-3.5"
                        >
                            {ctaPrimary}
                            <ChevronsRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/services"
                            className="btn-outline text-base px-7 py-3.5"
                        >
                            {ctaSecondary}
                            <ChevronsRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                </div>

                {/* Images Layout - Left & Right on top row, Center below */}
                <div className="relative mt-2 sm:mt-4 pb-10 sm:pb-16">

                    {/* Decorative curved lines - left */}
                    <svg className="hidden lg:block absolute left-55 xl:left-65 -top-2 z-0 w-24 h-40" viewBox="0 0 100 160" fill="none">
                        <path d="M10 0 C 50 20, 60 80, 90 155" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                    </svg>

                    {/* Decorative curved lines - right */}
                    <svg className="hidden lg:block absolute right-55 xl:right-65 -top-2 z-0 w-24 h-40" viewBox="0 0 100 160" fill="none">
                        <path d="M90 0 C 50 20, 40 80, 10 155" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                    </svg>

                    {/* Top Row - Left and Right images pushed to edges */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                        {/* Left Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            className="relative w-full sm:w-60 lg:w-70 aspect-4/5 rounded-2xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src="/service-page/office-cleaning.png"
                                alt="Professional cleaning team"
                                fill
                                className="object-cover object-right"
                                sizes="(max-width: 640px) 100vw, 280px"
                            />
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                            className="relative w-full sm:w-60 lg:w-70 aspect-4/5 rounded-2xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src="/hotel.png"
                                alt="Expert cleaning staff"
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 280px"
                            />
                        </motion.div>
                    </div>

                    {/* Center Image (Featured) - overlapping below */}
                    <div className="flex justify-center -mt-16 sm:-mt-24 lg:-mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                            className="relative w-full sm:w-90 lg:w-105 aspect-4/3 rounded-2xl overflow-hidden shadow-xl"
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/clean.mp4" type="video/mp4" />
                            </video>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}