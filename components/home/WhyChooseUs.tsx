'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Shield, Zap, Globe, Award } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';
import { cn } from '@/lib/utils';

export interface WhyChooseUsProps {
    /** Spacing utilities for outer section */
    className?: string;
    /** Control spacing between cards grid */
    gridClassName?: string;
    /** Override heading wrapper spacing */
    headerClassName?: string;
}

export default function WhyChooseUs({ className, gridClassName, headerClassName }: WhyChooseUsProps) {
    const { language } = useLanguage();

    const title =
        language === 'ja' ? 'D.BRIGHTを選ぶ理由' : 'Why Choose D.BRIGHT';
    const subtitle =
        language === 'ja'
            ? '私たちは多様なサービスで、お客様の成功をサポートします'
            : 'We support your success with our diverse range of services';

    const reasons =
        language === 'ja'
            ? [
                {
                    icon: Zap,
                    title: '多様なサービス',
                    description:
                        '清掃、人材派遣、留学サポート、不動産まで、幅広いニーズに対応します。',
                    color: 'blue',
                },
                {
                    icon: Shield,
                    title: '信頼と実績',
                    description:
                        '豊富な経験と実績で、安心・安全なサービスを提供いたします。',
                    color: 'green',
                },
                {
                    icon: Globe,
                    title: 'グローバル対応',
                    description:
                        '日本と世界をつなぐ架け橋として、国際的な視点でサポートします。',
                    color: 'purple',
                },
                {
                    icon: Award,
                    title: '高品質保証',
                    description:
                        'お客様満足度100%を目指し、最高品質のサービスを提供します。',
                    color: 'orange',
                },
            ]
            : [
                {
                    icon: Zap,
                    title: 'Diverse Services',
                    description:
                        'From cleaning to staffing, study abroad support, and real estate — we cover it all.',
                    color: 'blue',
                },
                {
                    icon: Shield,
                    title: 'Trust & Reliability',
                    description:
                        'Proven track record and extensive experience for safe and secure services.',
                    color: 'green',
                },
                {
                    icon: Globe,
                    title: 'Global Reach',
                    description:
                        'Bridging Japan and the world with an international perspective and support.',
                    color: 'purple',
                },
                {
                    icon: Award,
                    title: 'Quality Assurance',
                    description:
                        'Aiming for 100% customer satisfaction with the highest quality services.',
                    color: 'orange',
                },
            ];

    const colorClasses = {
        blue: {
            gradient: 'from-blue-500 to-blue-600',
            border: 'hover:border-blue-200',
        },
        green: {
            gradient: 'from-emerald-500 to-emerald-600',
            border: 'hover:border-emerald-200',
        },
        purple: {
            gradient: 'from-violet-500 to-violet-600',
            border: 'hover:border-violet-200',
        },
        orange: {
            gradient: 'from-amber-500 to-amber-600',
            border: 'hover:border-amber-200',
        },
    };

    return (
        <section className={cn("relative py-12 sm:py-16 md:py-18 bg-linear-to-b from-gray-50 to-white w-full mb-12 sm:mb-16 md:mb-20", className)}>
            <div className="site-container px-4 sm:px-6">
                {/* Title & Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={cn("text-center mb-10 sm:mb-10 md:mb-10", headerClassName)}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 sm:mb-3">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-x-10 md:gap-y-16 lg:gap-y-20", gridClassName)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        const colors =
                            colorClasses[reason.color as keyof typeof colorClasses];

                        return (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card
                                    className={`group relative h-full bg-white border-2 border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${colors.border} rounded-xl sm:rounded-2xl`}
                                >
                                    <CardHeader className="p-5 sm:p-6 md:p-8 pb-3 sm:pb-4">
                                        <div
                                            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-r ${colors.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                                            {reason.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-5 sm:px-6 md:px-8 pb-8 sm:pb-10">
                                        <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {reason.description}
                                        </CardDescription>
                                    </CardContent>

                                    {/* Hover Overlay */}
                                    <div
                                        className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-r ${colors.gradient} rounded-2xl transition-opacity duration-500`}
                                    />
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
