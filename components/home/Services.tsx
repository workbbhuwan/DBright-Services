'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Sparkles } from 'lucide-react';

interface ServicesProps {
    className?: string;
}

export default function Services({ className }: ServicesProps) {
    const { language } = useLanguage();

    const services = [
        {
            image: '/hotel.png',
            title: language === 'ja' ? 'ホテル清掃' : 'Hotel Cleaning',
            description: language === 'ja'
                ? 'マナーを心得たホテル清掃のエキスパート!信頼と実績をもとに、高品質なサービスを提供します。'
                : 'Expert hotel cleaning with excellent manners! We provide high-quality service based on trust and proven experience.',
        },
        {
            image: '/staffing.png',
            title: language === 'ja' ? '人材派遣サービス' : 'Staffing Services',
            description: language === 'ja'
                ? 'さまざまな業界に対応した信頼できる人材を派遣し、即戦力となる人材をご紹介します。'
                : 'We dispatch reliable personnel for various industries, introducing staff who can immediately contribute to your business.',
        },
        {
            image: '/halal.png',
            title: language === 'ja' ? 'ハラール事業支援' : 'Halal Business Support',
            description: language === 'ja'
                ? 'ハラール食品店やレストランの運営・企画を行い、文化的・法的基準に準拠した事業展開をサポート。'
                : 'We manage and plan halal food stores and restaurants in compliance with cultural and legal standards.',
        },
        {
            image: '/study.png',
            title: language === 'ja' ? '留学サポート' : 'Study Abroad Support',
            description: language === 'ja'
                ? '国内外の留学先を紹介し、手続き全般をサポートします。'
                : 'We introduce study abroad destinations both domestically and internationally and provide full support.',
        },
        {
            image: '/foreinger.png',
            title: language === 'ja' ? '外国人向けコンサルティング' : 'Consulting for Foreigners',
            description: language === 'ja'
                ? '外国人の日本での生活やビジネスに関する情報とコンサルティングを提供。'
                : 'We provide information and consulting on life and business in Japan for foreigners.',
        },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5 }
    };

    return (
        <section className={`py-12 sm:py-12 md:py-15 pb-8 sm:pb-7 md:pb-5 bg-linear-to-b from-gray-50 to-white relative overflow-hidden ${className || ''}`}>
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200 rounded-full filter blur-3xl"></div>
            </div>

            <div className="site-container px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 sm:mb-8 md:mb-10"
                >
                    <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 bg-blue-100 rounded-full">
                        <span className="text-blue-700 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            {language === 'ja' ? 'サービス' : 'Services'}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {language === 'ja' ? '提供サービス' : 'Our Services'}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                        {language === 'ja'
                            ? 'お客様の多様なニーズに合わせた包括的なソリューションを提供します'
                            : 'Comprehensive solutions tailored to meet your diverse needs'}
                    </p>
                </motion.div>

                {/* Services Carousel */}
                <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
                    <Carousel opts={{ align: "start", loop: true }} className="w-full">
                        <CarouselContent className="-ml-3 sm:-ml-4">
                            {services.map((service, index) => (
                                <CarouselItem key={index} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group overflow-hidden relative">

                                        {/* ✨ Decorative Golden Sparkles for Every Card */}
                                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                                            <motion.div
                                                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" style={{ color: '#0000FF' }} />
                                            </motion.div>
                                        </div>

                                        <div className="absolute top-2 left-3 sm:left-4 z-20 opacity-70">
                                            <motion.div
                                                animate={{ y: [-2, 2, -2], rotate: [0, 180, 360] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 drop-shadow-lg" style={{ color: '#FFD700' }} />
                                            </motion.div>
                                        </div>

                                        <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 z-20 opacity-60">
                                            <motion.div
                                                animate={{ y: [2, -2, 2], rotate: [360, 180, 0] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                            >
                                                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 drop-shadow-md" style={{ color: '#800080' }} />
                                            </motion.div>
                                        </div>

                                        {/* Gradient Overlay */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                        <CardContent className="p-0">
                                            {/* Image */}
                                            <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                                    {service.description}
                                                </p>
                                                <Link href="/services">
                                                    <Button
                                                        variant="ghost"
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-semibold group/btn text-sm"
                                                    >
                                                        {language === 'ja' ? '詳しく見る' : 'Learn More'}
                                                        <svg
                                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover/btn:translate-x-1 transition-transform"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>

                                        {/* Bottom Accent Line */}
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12" />
                        <CarouselNext className="hidden md:flex -right-12" />
                    </Carousel>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-8 sm:mt-10 md:mt-13"
                >
                    <Link href="/services">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                            {language === 'ja' ? 'すべてのサービスを見る' : 'View All Services'}
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
