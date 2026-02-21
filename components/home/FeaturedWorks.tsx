'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from './animations';

export default function FeaturedWorks() {
    const { language } = useLanguage();

    const sectionTitle = language === 'ja'
        ? '私たちの実績をご覧ください'
        : 'Real Results We Achieved';

    const works = language === 'ja'
        ? [
            {
                title: 'プロ清掃プロジェクト',
                image: '/hotel.png',
                href: '/services',
            },
            {
                title: '人材派遣ソリューション',
                image: '/staffing.png',
                href: '/services',
            },
            {
                title: 'ハラールビジネス支援',
                image: '/halal.png',
                href: '/services',
            },
        ]
        : [
            {
                title: 'Professional Cleaning Project',
                image: '/hotel.png',
                href: '/services',
            },
            {
                title: 'Staffing Solutions',
                image: '/staffing.png',
                href: '/services',
            },
            {
                title: 'Halal Business Support',
                image: '/halal.png',
                href: '/services',
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
                        {sectionTitle}
                    </h2>
                </motion.div>

                {/* Works Grid */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    {works.map((work, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Link href={work.href} className="group block">
                                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
                                    <Image
                                        src={work.image}
                                        alt={work.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-[#135b3e]/0 group-hover:bg-[#135b3e]/60 transition-all duration-400 flex items-end">
                                        <div className="p-5 sm:p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                                            <h3 className="text-lg sm:text-xl font-bold text-white">
                                                {work.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
