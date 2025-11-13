'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface IntroProps {
    /** Apply spacing utilities to the section root */
    className?: string;
    /** Override classes for the inner grid to control gap/padding */
    gridClassName?: string;
}

export default function Intro({ className, gridClassName }: IntroProps) {
    const { language } = useLanguage();

    const title = language === 'ja' ? '私たちについて' : 'About D.BRIGHT';
    const description = language === 'ja'
        ? 'D.BRIGHTは、清掃、人材派遣、留学サポート、不動産など、幅広いサービスを提供しています。お客様のニーズに合わせた高品質なソリューションで、日本と世界をつなぎます。'
        : 'D.BRIGHT provides a wide range of services including cleaning, temporary staffing, study abroad support, and real estate. We connect Japan and the world with high-quality solutions tailored to your needs.';

    const features = language === 'ja'
        ? [
            {
                title: '多様なサービス',
                desc: '清掃から人材派遣、留学サポート、不動産まで幅広く対応',
            },
            {
                title: 'グローバルな視点',
                desc: '日本と世界をつなぐ架け橋として活動',
            },
            {
                title: '顧客満足保証',
                desc: 'お客様のニーズに合わせた最高品質のサービス',
            },
        ]
        : [
            {
                title: 'Diverse Services',
                desc: 'From cleaning to staffing, study abroad support, and real estate',
            },
            {
                title: 'Global Perspective',
                desc: 'Bridging Japan and the world with innovative solutions',
            },
            {
                title: 'Customer Satisfaction',
                desc: 'High-quality services tailored to your specific needs',
            },
        ];

    return (
        <section className={cn("relative py-10 sm:py-10 md:py-5 bg-linear-to-b from-white via-blue-50/30 to-white w-full overflow-hidden", className)}>
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="site-container relative z-10 px-4 sm:px-6">
                <div className={cn("grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center", gridClassName)}>
                    {/* === Left - Image / Graphic Section === */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative">
                            <Image
                                src="/intro.png"
                                alt="D.BRIGHT Services"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Floating Blobs */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 hidden lg:block"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400 rounded-full opacity-10 hidden lg:block"></div>
                    </motion.div>

                    {/* === Right - Content Section === */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-left order-1 lg:order-2"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
                            {title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                            {description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 sm:space-y-6">
                            {features.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 sm:gap-4">
                                    <div className="shrink-0">
                                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-0.5 sm:mt-1" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{item.title}</h4>
                                        <p className="text-gray-600 text-sm md:text-base mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
