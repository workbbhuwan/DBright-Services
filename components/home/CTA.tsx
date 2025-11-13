'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/translations/LanguageContext';

export interface CTAProps {
    /** Spacing utilities for the section wrapper */
    className?: string;
}

export default function CTA({ className }: CTAProps) {
    const { language } = useLanguage();

    const title = language === 'ja'
        ? '今すぐ体験してみませんか？'
        : 'Ready to Experience Our Services?';

    const description = language === 'ja'
        ? '今すぐ始めて、多くのお客様が私たちのサービスを信頼している理由を発見してください。'
        : 'Get started today and discover why hundreds of clients trust us with their diverse service needs.';

    const buttonPrimary = language === 'ja' ? '無料見積もりを取得' : 'Get a Free Quote';
    const buttonSecondary = language === 'ja' ? '全サービスを見る' : 'View All Services';

    return (
        <section className={cn("py-10 sm:py-12 md:py-12 mb-10 sm:mb-12 bg-[#135b3e] text-white relative overflow-hidden w-full rounded-md", className)}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="site-container px-4 sm:px-6 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-4">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-sm sm:text-base font-semibold shadow-lg w-full sm:w-auto">
                            <Link href="/contact" className="gap-2">
                                {buttonPrimary}
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-blue-700 hover:bg-white hover:text-blue-700 text-sm sm:text-base font-semibold w-full sm:w-auto"
                        >
                            <Link href="/services">{buttonSecondary}</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
