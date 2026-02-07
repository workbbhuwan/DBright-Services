'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/translations/LanguageContext';

export default function CTA() {
    const { language } = useLanguage();

    const title = language === 'ja'
        ? 'プレミアムなサービスを、\n今すぐ体験してください。'
        : 'Unlock premium service, seamless performance, and results built to exceed expectations.';

    const ctaPrimary = language === 'ja' ? 'お問い合わせ' : 'Get Started Now';
    const ctaSecondary = language === 'ja' ? 'サービスを見る' : 'View All Services';

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-[#135b3e] text-white w-full overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />

            <div className="site-container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-8 sm:mb-10 max-w-3xl mx-auto whitespace-pre-line">
                        {title}
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#135b3e] font-semibold text-base hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
                        >
                            {ctaPrimary}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
                        >
                            {ctaSecondary}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
