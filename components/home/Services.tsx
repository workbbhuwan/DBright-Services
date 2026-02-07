'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';

export default function Services() {
    const { language } = useLanguage();

    const services = [
        {
            num: '01',
            image: '/hotel.png',
            title: language === 'ja' ? 'ホテル清掃' : 'Hotel Cleaning',
            tags: language === 'ja'
                ? ['高品質', 'プロ対応', 'マナー重視', '即対応']
                : ['Premium Quality', 'Professional', 'Expert Team', 'Quick Response'],
        },
        {
            num: '02',
            image: '/staffing.png',
            title: language === 'ja' ? '人材派遣サービス' : 'Staffing Services',
            tags: language === 'ja'
                ? ['即戦力', '多業種対応', '信頼の実績', '柔軟対応']
                : ['Skilled Workers', 'Multi-Industry', 'Reliable', 'Flexible Staff'],
        },
        {
            num: '03',
            image: '/halal.png',
            title: language === 'ja' ? 'ハラール事業支援' : 'Halal Business Support',
            tags: language === 'ja'
                ? ['認証対応', '文化理解', '店舗運営', 'コンサル']
                : ['Certified', 'Cultural Expertise', 'Store Operations', 'Consulting'],
        },
        {
            num: '04',
            image: '/study.png',
            title: language === 'ja' ? '留学サポート' : 'Study Abroad Support',
            tags: language === 'ja'
                ? ['手続き代行', '学校紹介', '完全サポート', '多言語対応']
                : ['Full Support', 'School Search', 'Documentation', 'Multilingual'],
        },
    ];

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-white w-full">
            <div className="site-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        {language === 'ja' ? '提供サービス' : 'Our Services'}
                    </h2>
                </motion.div>

                {/* Services List */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-4 sm:space-y-5"
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Link href="/services" className="group block">
                                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 rounded-2xl border border-gray-100 bg-white hover:bg-[#f0fdf4] hover:border-[#bbf7d0] transition-all duration-400 card-hover">
                                    {/* Number */}
                                    <span className="text-sm font-bold text-[#135b3e] opacity-60 shrink-0 min-w-9">
                                        {service.num}.
                                    </span>

                                    {/* Image Thumbnail */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 relative">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#135b3e] transition-colors mb-2 sm:mb-3">
                                            {service.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {service.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs sm:text-sm font-medium group-hover:bg-[#dcfce7] group-hover:text-[#135b3e] transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#135b3e] group-hover:border-[#135b3e] transition-all duration-300 absolute top-5 right-5 sm:relative sm:top-auto sm:right-auto">
                                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 sm:mt-12 flex justify-center"
                >
                    <Link
                        href="/services"
                        className="btn-primary text-base px-8 py-3.5"
                    >
                        {language === 'ja' ? 'すべてのサービスを見る' : 'Explore All Services'}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
