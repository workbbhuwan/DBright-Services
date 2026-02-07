'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

export default function Intro() {
    const { language } = useLanguage();

    const title = language === 'ja'
        ? '経験、信頼性、一貫した品質、そしてお客様第一のサービスで確かな成果をお届けする信頼のチームです。'
        : 'We are a trusted team delivering outstanding results through experience, reliability, consistency, and customer-focused service every time.';

    const counters = [
        {
            value: 10,
            suffix: '+',
            label: language === 'ja' ? '年のサービス実績' : 'Years of Service',
        },
        {
            value: 98,
            suffix: '%',
            label: language === 'ja' ? '顧客満足度' : 'Satisfaction Rating',
        },
    ];

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-white w-full">
            <div className="site-container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg">
                            <Image
                                src="/intro.png"
                                alt="D.BRIGHT Team"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative green block behind */}
                        <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-[#f0fdf4] hidden lg:block" />
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 leading-snug mb-10">
                            {title}
                        </h2>

                        {/* Counter Cards */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {counters.map((counter, i) => (
                                <div
                                    key={i}
                                    className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-gray-100"
                                >
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#135b3e] mb-2">
                                        <AnimatedCounter target={counter.value} suffix={counter.suffix} />
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-500 font-medium">
                                        {counter.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
