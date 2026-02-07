'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, ChevronsRight } from 'lucide-react';

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

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-white w-full">
            <div className="site-container">

                {/* Top Row: Badge + CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-6"
                >
                    <div className="section-badge">
                        <Sparkles className="w-3.5 h-3.5 text-[#135b3e]" />
                        {language === 'ja' ? '私たちについて' : 'About Us'}
                    </div>
                    <div className="rounded-full border-2 border-[#b8e6d0] p-0.5">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#135b3e] text-white text-sm font-semibold hover:bg-[#1a7a54] transition-all duration-300"
                        >
                            {language === 'ja' ? 'サービスを見る' : 'Get A Service'}
                            <ChevronsRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Divider line */}
                <div className="w-full h-px bg-gray-200 mb-12 sm:mb-16" />

                {/* Large headline with inline images */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold text-gray-900 leading-[1.15] tracking-tight text-center max-w-5xl mx-auto mb-14 sm:mb-20"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                    {language === 'ja' ? (
                        <>
                            経験と信頼で確かな成果を届ける
                            <span className="inline-block align-middle mx-2 relative w-28 sm:w-36 h-8 sm:h-10 rounded-full overflow-hidden">
                                <Image src="/staffing.png" alt="" fill className="object-cover" />
                            </span>
                            プロチーム。一貫した品質とお客様第一の
                            <span className="inline-block align-middle mx-2 relative w-28 sm:w-36 h-8 sm:h-10 rounded-full overflow-hidden">
                                <Image src="/hotel.png" alt="" fill className="object-cover" />
                            </span>
                            サービスをお届けします。
                        </>
                    ) : (
                        <>
                            We are trusted team delivering spotless results through experience{' '}
                            <span className="inline-block align-middle mx-1 relative w-28 sm:w-36 h-8 sm:h-10 rounded-full overflow-hidden">
                                <Image src="/staffing.png" alt="Our team" fill className="object-cover" />
                            </span>
                            , reliability consistency, and customer-focused{' '}
                            <span className="inline-block align-middle mx-1 relative w-28 sm:w-36 h-8 sm:h-10 rounded-full overflow-hidden">
                                <Image src="/hotel.png" alt="Our service" fill className="object-cover" />
                            </span>
                            {' '}service every time.
                        </>
                    )}
                </motion.h2>

                {/* Bottom Grid: Stat - Image - Stat - Image */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
                >
                    {/* Stat Card 1 */}
                    <div className="flex flex-col justify-center rounded-2xl border border-dashed border-gray-300 p-6 sm:p-8">
                        <p className="text-sm font-medium text-[#135b3e] mb-4">
                            {language === 'ja' ? '完了済み' : 'Completed'}
                        </p>
                        <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-none mb-3">
                            <AnimatedCounter target={500} />+
                        </div>
                        <p className="text-sm sm:text-base font-medium text-[#135b3e]">
                            {language === 'ja' ? 'プロジェクト実績' : 'Projects Done'}
                        </p>
                    </div>

                    {/* Image 1 */}
                    <div className="relative rounded-2xl overflow-hidden aspect-4/5 sm:aspect-auto sm:min-h-70">
                        <Image
                            src="/about-us/1.png"
                            alt="D.BRIGHT cleaning team"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>

                    {/* Stat Card 2 */}
                    <div className="flex flex-col justify-center rounded-2xl border border-dashed border-gray-300 p-6 sm:p-8">
                        <p className="text-sm font-medium text-[#135b3e] mb-4">
                            {language === 'ja' ? '満足度' : 'Satisfaction'}
                        </p>
                        <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-none mb-3">
                            <AnimatedCounter target={98} suffix="%" />
                        </div>
                        <p className="text-sm sm:text-base font-medium text-[#135b3e]">
                            {language === 'ja' ? '顧客満足度' : 'Satisfaction Rating'}
                        </p>
                    </div>

                    {/* Image 2 */}
                    <div className="relative rounded-2xl overflow-hidden aspect-4/5 sm:aspect-auto sm:min-h-70">
                        <Image
                            src="/about-us/2.png"
                            alt="Professional cleaner at work"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
