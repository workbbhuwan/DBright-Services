'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Star } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';

export default function WhyChooseUs() {
    const { language } = useLanguage();

    const title = language === 'ja'
        ? 'お客様に選ばれる理由'
        : 'Why Customers Trust Our Service';

    const reasons = language === 'ja'
        ? [
            {
                icon: Users,
                title: 'プロの訓練されたスタッフ',
                description: '厳しい研修を受けたスタッフが、常に高品質で一貫したサービスをお届けします。',
                showStars: false,
            },
            {
                icon: Shield,
                title: '安心・安全なサービス',
                description: '環境に配慮した方法と厳格な品質管理で、ご家族やペットにも安全なサービスを提供します。',
                showStars: false,
            },
            {
                icon: Globe,
                title: 'グローバルな対応力',
                description: '多言語対応可能なスタッフが、日本と世界をつなぐ架け橋としてサポートします。',
                showStars: true,
            },
            {
                icon: Award,
                title: '品質保証',
                description: '卓越したサービス品質を保証し、ご期待に添えない場合は無償で対応いたします。',
                showStars: true,
            },
        ]
        : [
            {
                icon: Users,
                title: 'Professional & Trained Staff',
                description: 'Our team is fully trained, background-checked, and dedicated to delivering consistent quality.',
                showStars: false,
            },
            {
                icon: Shield,
                title: 'Safe & Reliable Service',
                description: 'We use eco-friendly methods and strict quality control to protect families, pets, and the environment.',
                showStars: false,
            },
            {
                icon: Globe,
                title: 'Fast, Flexible Scheduling',
                description: 'Choose times that fit your day, book instantly online, and easily reschedule when plans change.',
                showStars: true,
            },
            {
                icon: Award,
                title: 'Guaranteed Service Quality',
                description: 'We guarantee exceptional quality and offer free corrections if something falls short of expectations.',
                showStars: true,
            },
        ];

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-[#f8fafc] w-full">
            <div className="site-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        {title}
                    </h2>
                </motion.div>

                {/* Cards Grid - 2x2 like Wipeora */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div key={index} variants={fadeInUp}>
                                <div className="group relative h-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-hover">
                                    {/* Icon */}
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[#135b3e] transition-colors duration-300">
                                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#135b3e] group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                                        {reason.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                                        {reason.description}
                                    </p>

                                    {/* Star rating row (Wipeora style) */}
                                    {reason.showStars && (
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    )}

                                    {/* Subtle corner accent on hover */}
                                    <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-[#f0fdf4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-2xl" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
