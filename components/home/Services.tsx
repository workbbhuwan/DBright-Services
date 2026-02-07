'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronsRight, Plus } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';

export default function Services() {
    const { language } = useLanguage();

    const services = [
        {
            num: '01',
            image: '/hotel.png',
            title: language === 'ja' ? 'ホーム清掃' : 'Home Cleaning',
            tags: language === 'ja'
                ? ['エコ素材', '家族安心', '定期清掃', '研修済み']
                : ['Eco-Friendly', 'Family Safe', 'Routine Clean', 'Trained Cleaners'],
            showTags: true,
        },
        {
            num: '02',
            image: '/staffing.png',
            title: language === 'ja' ? 'オフィス清掃' : 'Office Cleaning',
            tags: [],
            showTags: false,
        },
        {
            num: '03',
            image: '/halal.png',
            title: language === 'ja' ? 'ディープクリーニング' : 'Deep Cleaning',
            tags: [],
            showTags: false,
        },
        {
            num: '04',
            image: '/study.png',
            title: language === 'ja' ? '窓ガラス清掃' : 'Window Cleaning',
            tags: [],
            showTags: false,
        },
    ];

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-[#1a7a6e] w-full overflow-hidden">
            <div className="site-container">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-bold text-white text-center mb-12 sm:mb-16"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                    {language === 'ja' ? '提供サービス' : 'Our Services'}
                </motion.h2>

                {/* Services List */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-0"
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Link href="/services" className="group block">
                                <div className="relative border-t border-white/20 py-6 sm:py-8 md:py-10">
                                    <div className="flex items-center gap-4 sm:gap-8">
                                        {/* Number */}
                                        <span className="text-sm font-medium text-white/50 shrink-0">
                                            {service.num}.
                                        </span>

                                        {/* Content area */}
                                        <div className="flex-1 min-w-0">
                                            {/* Tags (only on first service) */}
                                            {service.showTags && service.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {service.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 rounded-full border border-[#c8f547]/50 text-[#c8f547] text-xs font-medium"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Service Title */}
                                            <h3
                                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight group-hover:text-[#c8f547] transition-colors duration-300"
                                                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                                            >
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Tilted Image with + icon */}
                                        <div className="hidden sm:block shrink-0 relative">
                                            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden rotate-6 shadow-lg group-hover:rotate-0 transition-transform duration-500">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            {/* Plus icon badge */}
                                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Plus className="w-4 h-4 text-[#1a7a6e]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                    {/* Bottom border */}
                    <div className="border-t border-white/20" />
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 sm:mt-14 flex justify-center"
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#135b3e] text-white text-sm font-semibold hover:bg-[#0e4a32] transition-all duration-300 hover:shadow-lg border border-white/10"
                    >
                        {language === 'ja' ? 'すべてのサービスを見る' : 'Explore All Services'}
                        <ChevronsRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
