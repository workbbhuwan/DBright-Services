'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Star, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from './animations';
import { cn } from '@/lib/utils';

export interface HeroProps {
    /** Optional className to inject margin, padding, gap, etc. */
    className?: string;
}

export default function Hero({ className }: HeroProps) {
    const { language } = useLanguage();

    // Marketing copy (bilingual)
    const overline = language === 'ja'
        ? '多様なサービスで社会に貢献'
        : 'Contributing to society through diverse services';
    const headline = language === 'ja'
        ? '私たちは未来を創ります。'
        : 'We create the future.';
    const subcopy = language === 'ja'
        ? 'D.BRIGHT は清掃、人材派遣、留学サポートから不動産まで、幅広いサービスでお客様のニーズにお応えします。グローバルな視点で、日本と世界をつなぐ架け橋に。'
        : 'D.BRIGHT meets the needs of our customers with a wide range of services—from cleaning, temporary staffing, and study abroad support to real estate. With a global perspective, we are a bridge between Japan and the world.';

    const stats = [
        { icon: Users, value: '100+', label: language === 'ja' ? '満足したお客様' : 'Satisfied Clients', color: 'bg-blue-500' },
        { icon: Star, value: '5 stars', label: language === 'ja' ? '平均評価' : 'Average Rating', color: 'bg-orange-500' },
        { icon: Clock, value: '24/7', label: language === 'ja' ? 'サポート対応' : 'Support Available', color: 'bg-pink-500' },
        { icon: Award, value: '100%', label: language === 'ja' ? '満足度' : 'Satisfaction Rate', color: 'bg-green-500' },
    ];

    return (
        <section className={cn("relative w-full min-h-screen flex flex-col mb-8 sm:mb-10 ", className)}>
            {/* Background Layer - Low z-index */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/heroine.png"
                    alt="Hero background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-blue-900/40 to-blue-900/30" />
            </div>

            {/* Content Layer - High z-index */}
            <div className="relative z-10 flex-1 flex flex-col">


                {/* Main Content - Centered */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-7 sm:pt-11">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={staggerContainer}
                            className=""
                        >
                            {/* Overline Badge */}
                            <motion.div variants={fadeInUp} className="flex justify-center mb-1 sm:mb-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md text-xs sm:text-sm text-white font-medium border border-white/20">
                                    <span className="text-lg sm:text-xl">✨</span>
                                    {overline}
                                </div>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight mb-1 sm:mb-4"
                            >
                                {headline}
                            </motion.h1>

                            {/* Subcopy */}
                            <motion.p
                                variants={fadeInUp}
                                className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 mb-6 sm:mb-8"
                            >
                                {subcopy}
                            </motion.p>

                            {/* CTAs and Badges */}
                            <motion.div variants={fadeInUp} className="flex flex-col items-center pt-4 sm:pt-5">
                                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-blue-500 text-white hover:bg-blue-600 text-sm sm:text-base font-semibold shadow-lg w-full sm:w-auto"
                                    >
                                        <Link href="/services" className="flex items-center justify-center gap-2">
                                            {language === 'ja' ? 'サービスを見る' : 'View Services'}
                                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 text-sm sm:text-base font-semibold w-full sm:w-auto"
                                    >
                                        <Link href="/contact">
                                            {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                                        </Link>
                                    </Button>
                                </div>


                            </motion.div>

                            {/* Stats Cards - Below Achievement Badges */}
                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-8 sm:pt-12 max-w-4xl mx-auto px-2"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeInUp}
                                        className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        <div className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.color} mb-2 sm:mb-3`}>
                                            <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                        </div>
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs md:text-sm text-blue-200">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Wave Separator - Low z-index */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-16 sm:h-20 md:h-28"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}