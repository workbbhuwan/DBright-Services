'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { fadeInUp, staggerContainer } from './animations';

interface FaqItem {
    label: string;
    question: string;
    answer: string;
}

export default function FAQ() {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const title = language === 'ja'
        ? 'よくあるご質問'
        : 'Quick Answers to\nCommon Questions';

    const badgeText = language === 'ja' ? 'よくある質問' : 'FAQ Question';
    const ctaText = language === 'ja' ? 'サービスを見る' : 'Get A Service';

    const faqs: FaqItem[] = language === 'ja'
        ? [
            { label: 'Q1.', question: 'オンラインシステムでクリーニングの予約はどのようにすればよいですか？', answer: '株式会社D.Brightのウェブサイトのお問い合わせフォームから簡単にご予約いただけます。営業時間中はお電話でも対応可能です。' },
            { label: 'Q2.', question: 'プロのクリーナーはエコフレンドリーな用品や必要な機材を持参しますか？', answer: 'はい、株式会社D.Brightのスタッフは環境に優しいクリーニング用品と専門機材をすべて持参します。お客様にご準備いただくものはございません。' },
            { label: 'Q3.', question: '確定したクリーニング予約を追加料金なしで後から変更できますか？', answer: 'はい、予定日の24時間前までであれば追加料金なしで変更可能です。お気軽に株式会社D.Brightまでご連絡ください。' },
            { label: 'Q4.', question: 'クリーニング製品はお子様やペット、敏感な方にも安全ですか？', answer: 'はい、株式会社D.Brightでは無毒でエコフレンドリーな製品のみを使用しており、ご家族やペットにも完全に安全です。' },
            { label: 'Q5.', question: 'お住まいの地域の空き状況に応じて当日予約は可能ですか？', answer: 'はい、株式会社D.Brightでは空き状況に応じて当日予約も承っております。まずはお電話またはオンラインでご確認ください。' },
            { label: 'Q6.', question: 'クリーニングが期待に沿わなかった場合はどうすればよいですか？', answer: '株式会社D.Brightはお客様の満足を最優先に考えています。ご期待に沿えない場合は、無償で再対応させていただきます。' },
        ]
        : [
            { label: 'Q1.', question: 'How can I easily book a cleaning appointment through your online system?', answer: 'You can book through the D.Bright Corporation (株式会社D.Bright) website contact form or call us directly during business hours. We respond to all inquiries within 24 hours.' },
            { label: 'Q2.', question: 'Do your professional cleaners bring their own eco-friendly supplies and necessary equipment?', answer: 'Yes, all D.Bright Corporation cleaners arrive fully equipped with eco-friendly cleaning supplies and professional-grade equipment. You don\'t need to provide anything.' },
            { label: 'Q3.', question: 'Can I reschedule my confirmed cleaning appointment later without paying additional fees?', answer: 'Absolutely! You can reschedule free of charge up to 24 hours before your appointment. Simply contact D.Bright Corporation to arrange a new time.' },
            { label: 'Q4.', question: 'Are your cleaning products completely safe for children, pets, and sensitive individuals?', answer: 'Yes, D.Bright Corporation (株式会社D.Bright) exclusively uses non-toxic, eco-friendly products that are completely safe for families, pets, and individuals with sensitivities.' },
            { label: 'Q5.', question: 'Do you provide same-day cleaning appointments depending on availability within my area?', answer: 'Yes, D.Bright Corporation offers same-day appointments based on availability. Contact us by phone or online to check current openings in your area.' },
            { label: 'Q6.', question: 'What can I do if the cleaning does not meet my expectations?', answer: 'Customer satisfaction is the top priority at D.Bright Corporation (株式会社D.Bright). If you\'re not fully satisfied, we offer free re-service and corrections at no additional cost.' },
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

                {/* FAQ Cards Grid */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
                >
                    {faqs.map((faq, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <div
                                className="bg-[#f1f5f9] rounded-2xl p-6 sm:p-7 h-full flex flex-col cursor-pointer select-none transition-colors duration-200 hover:bg-[#e8ecf1]"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                                    {faq.label}
                                </span>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    {faq.question}
                                </p>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="text-sm text-gray-500 leading-relaxed overflow-hidden border-t border-gray-200 pt-4"
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
