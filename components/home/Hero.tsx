'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from './animations';

export default function Hero() {
    const { language } = useLanguage();

    const badge = language === 'ja' ? '信頼のプロフェッショナル' : 'Verified & Trained Professionals';
    const headline = language === 'ja'
        ? 'あらゆるニーズに\n応えるサービス'
        : 'Effortless Solutions\nFor Every Need';
    const subtitle = language === 'ja'
        ? '清掃、人材派遣、留学サポートから不動産まで。\nスピード・信頼・確かな品質でお届けします。'
        : 'Professional services delivering spotless results with speed, care, and reliability.';
    const ctaPrimary = language === 'ja' ? 'お問い合わせ' : 'Get Started';
    const ctaSecondary = language === 'ja' ? 'サービスを見る' : 'View All Services';

    return (
        <section className="relative w-full bg-white overflow-hidden">
            <div className="site-container">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] py-16 sm:py-20 lg:py-24">
                    {/* Left Content */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#dcfce7] bg-[#f0fdf4] text-[#135b3e] text-sm font-medium">
                                <CheckCircle className="w-4 h-4" />
                                {badge}
                            </div>
                        </motion.div>

                        {/* Rating */}
                        <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                            <div className="flex -space-x-2">
                                {['/intro.png', '/hotel.png', '/staffing.png'].map((src, i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                        <Image src={src} alt="" width={36} height={36} className="object-cover w-full h-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-900">4.9/5</span>
                                <span className="text-sm text-gray-500">{language === 'ja' ? 'お客様評価' : 'Customer Rating'}</span>
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 whitespace-pre-line"
                        >
                            {headline}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 whitespace-pre-line"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                            <Link
                                href="/contact"
                                className="btn-primary text-base px-7 py-3.5"
                            >
                                {ctaPrimary}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/services"
                                className="btn-outline text-base px-7 py-3.5"
                            >
                                {ctaSecondary}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="order-1 lg:order-2 relative"
                    >
                        <div className="relative aspect-4/3 lg:aspect-3/4 xl:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/heroine.png"
                                alt="D.BRIGHT Services"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                        </div>

                        {/* Floating badge - bottom left */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-gray-100"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-[#135b3e]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">100+</p>
                                <p className="text-xs text-gray-500">{language === 'ja' ? '満足したお客様' : 'Satisfied Clients'}</p>
                            </div>
                        </motion.div>

                        {/* Floating badge - top right */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -top-2 -right-2 sm:top-4 sm:right-4 bg-[#135b3e] text-white rounded-2xl shadow-xl px-4 py-2.5"
                        >
                            <p className="text-xs font-medium opacity-80">{language === 'ja' ? '満足度' : 'Satisfaction'}</p>
                            <p className="text-xl font-bold">100%</p>
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-3xl bg-[#f0fdf4] hidden lg:block" />
                    </motion.div>
                </div>
            </div>

            {/* Background decorative dots */}
            <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-30 pointer-events-none" />
        </section>
    );
}