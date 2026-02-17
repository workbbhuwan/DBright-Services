'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import { Users, Leaf, LayoutGrid, Award, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from './animations';

interface Reason {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

function ReasonCard({ reason }: { reason: Reason }) {
    const Icon = reason.icon;
    return (
        <div className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-[#d4e8dc] w-full max-w-75 card-hover">
            <div className="w-12 h-12 rounded-xl bg-[#eef7e9] flex items-center justify-center mb-5 group-hover:bg-[#135b3e] transition-colors duration-300">
                <Icon className="h-6 w-6 text-[#135b3e] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                {reason.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
                {reason.description}
            </p>
        </div>
    );
}

export default function WhyChooseUs() {
    const { language } = useLanguage();

    const title = language === 'ja'
        ? '株式会社D.Brightが\n選ばれる理由'
        : 'Why Customers Trust\n株式会社D.Bright';

    const badgeText = language === 'ja' ? '選ばれる理由' : 'Why Choose Us';
    const ctaText = language === 'ja' ? 'サービスを見る' : 'Get A Service';

    const reasons: Reason[] = language === 'ja'
        ? [
            {
                icon: Users,
                title: 'プロの訓練されたスタッフ',
                description: '厳しい研修を受けたスタッフが、常に高品質で一貫したサービスをお届けします。',
            },
            {
                icon: Leaf,
                title: '安心・安全なクリーニング製品',
                description: '環境に優しい無毒な素材を使用し、ご家族やペット、環境を守ります。',
            },
            {
                icon: LayoutGrid,
                title: '迅速で柔軟なスケジューリング',
                description: 'ご都合に合わせた時間帯を選び、オンラインで即座に予約・変更が可能です。',
            },
            {
                icon: Award,
                title: '品質保証',
                description: '卓越したクリーニング品質を保証し、ご期待に添えない場合は無償で対応いたします。',
            },
        ]
        : [
            {
                icon: Users,
                title: 'Professional & Trained Cleaners',
                description: 'Our cleaners are fully trained, background-checked, and dedicated to delivering consistent.',
            },
            {
                icon: Leaf,
                title: 'Eco-Safe Cleaning Products',
                description: 'We use non-toxic, eco-friendly materials that protect families, pets, and the environment.',
            },
            {
                icon: LayoutGrid,
                title: 'Fast, Flexible Scheduling',
                description: 'Choose times that fit your day, book instantly online, and easily reschedule plans change.',
            },
            {
                icon: Award,
                title: 'Guaranteed Service Quality',
                description: 'We guarantee exceptional cleaning quality and offer free corrections if something expectations.',
            },
        ];

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-[#f8fafc] w-full">
            <div className="site-container">
                {/* Top Bar: Badge + CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-10 sm:mb-14"
                >
                    <div className="section-badge">
                        <span className="dot" />
                        {badgeText}
                    </div>
                    <Link href="/services" className="btn-primary text-sm">
                        {ctaText}
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Link>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight whitespace-pre-line">
                        {title}
                    </h2>
                </motion.div>

                {/* Desktop Layout: cards around center image */}
                <div className="hidden md:block">
                    <div className="relative max-w-5xl mx-auto">
                        {/* SVG Connector Lines */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-0"
                            viewBox="0 0 1000 600"
                            preserveAspectRatio="none"
                            fill="none"
                        >
                            {/* Top-left card → center image */}
                            <path
                                d="M 295 195 C 340 230, 420 260, 440 275"
                                stroke="#c8d8d0"
                                strokeWidth="1.5"
                                strokeDasharray="8 5"
                            />
                            {/* Top-right card → center image */}
                            <path
                                d="M 705 195 C 660 230, 580 260, 560 275"
                                stroke="#c8d8d0"
                                strokeWidth="1.5"
                                strokeDasharray="8 5"
                            />
                            {/* Bottom-left card → center image */}
                            <path
                                d="M 295 405 C 340 370, 420 340, 440 325"
                                stroke="#c8d8d0"
                                strokeWidth="1.5"
                                strokeDasharray="8 5"
                            />
                            {/* Bottom-right card → center image */}
                            <path
                                d="M 705 405 C 660 370, 580 340, 560 325"
                                stroke="#c8d8d0"
                                strokeWidth="1.5"
                                strokeDasharray="8 5"
                            />
                        </svg>

                        {/* Top Row Cards */}
                        <motion.div
                            className="flex justify-between relative z-10"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp}>
                                <ReasonCard reason={reasons[0]} />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <ReasonCard reason={reasons[1]} />
                            </motion.div>
                        </motion.div>

                        {/* Center Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-center my-6 lg:my-8 relative z-10"
                        >
                            <div className="relative w-70 h-45 lg:w-80 lg:h-52.5 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="/why-choose-us/1.png"
                                    alt="Professional cleaning team"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Bottom Row Cards */}
                        <motion.div
                            className="flex justify-between relative z-10"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp}>
                                <ReasonCard reason={reasons[2]} />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <ReasonCard reason={reasons[3]} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Layout: stacked cards + image */}
                <div className="md:hidden">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {reasons.slice(0, 2).map((reason, index) => (
                            <motion.div key={index} variants={fadeInUp} className="flex justify-center">
                                <ReasonCard reason={reason} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="my-6 rounded-2xl overflow-hidden shadow-lg max-w-xs mx-auto"
                    >
                        <Image
                            src="/why-choose-us/1.png"
                            alt="Professional cleaning team"
                            width={400}
                            height={260}
                            className="object-cover w-full"
                        />
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {reasons.slice(2).map((reason, index) => (
                            <motion.div key={index} variants={fadeInUp} className="flex justify-center">
                                <ReasonCard reason={reason} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
