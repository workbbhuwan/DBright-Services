'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { fadeInUp, staggerContainer } from './animations';

export default function FAQ() {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = language === 'ja'
        ? [
            {
                q: 'Q1. サービスの予約はどのようにすればよいですか？',
                a: 'お電話またはウェブサイトのお問い合わせフォームから簡単にご予約いただけます。営業時間中はお電話でも対応可能です。',
            },
            {
                q: 'Q2. 対応エリアはどこですか？',
                a: '千葉県市川市を拠点に、東京都内および近郊エリアに対応しています。詳しくはお問い合わせください。',
            },
            {
                q: 'Q3. 人材派遣の最低契約期間はありますか？',
                a: 'ご要望に応じて柔軟に対応いたします。短期から長期まで、お客様のニーズに合わせたプランをご提案します。',
            },
            {
                q: 'Q4. 多言語でのサポートは可能ですか？',
                a: 'はい、日本語・英語をはじめ、複数の言語に対応可能なスタッフが在籍しています。',
            },
            {
                q: 'Q5. 料金の見積もりは無料ですか？',
                a: 'はい、お見積もりは完全無料です。お気軽にお問い合わせください。',
            },
            {
                q: 'Q6. サービスに満足できなかった場合はどうなりますか？',
                a: 'お客様の満足を最優先に考えています。万が一ご期待に添えない場合は、無償で再対応させていただきます。',
            },
        ]
        : [
            {
                q: 'Q1. How can I easily book a service through your online system?',
                a: 'You can book through our website contact form or call us directly during business hours. We respond to all inquiries within 24 hours.',
            },
            {
                q: 'Q2. What areas do you provide services in?',
                a: 'Based in Ichikawa City, Chiba Prefecture, we serve the greater Tokyo metropolitan area. Contact us for details about your specific location.',
            },
            {
                q: 'Q3. Is there a minimum contract period for staffing services?',
                a: 'We offer flexible arrangements from short-term to long-term placements. We tailor our plans to fit your specific needs.',
            },
            {
                q: 'Q4. Do you provide multilingual support?',
                a: 'Yes, our team includes staff fluent in Japanese, English, and several other languages to serve our diverse clientele.',
            },
            {
                q: 'Q5. Are your quotes and estimates free of charge?',
                a: 'Absolutely! All estimates are completely free with no obligation. Contact us anytime for a detailed quote.',
            },
            {
                q: 'Q6. What can I do if the service does not meet my expectations?',
                a: 'Customer satisfaction is our top priority. If you are not fully satisfied, we offer free re-service and corrections at no additional cost.',
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
                        {language === 'ja' ? 'よくあるご質問' : 'Quick Answers to Common Questions'}
                    </h2>
                </motion.div>

                {/* FAQ List */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-3xl mx-auto"
                >
                    {faqs.map((faq, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <div className="faq-item">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between py-5 sm:py-6 text-left group"
                                >
                                    <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4 group-hover:text-[#135b3e] transition-colors">
                                        {faq.q}
                                    </span>
                                    <div className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? 'bg-[#135b3e] text-white rotate-0'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}>
                                        {openIndex === index
                                            ? <Minus className="w-4 h-4" />
                                            : <Plus className="w-4 h-4" />
                                        }
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-5 sm:pb-6 text-sm sm:text-base text-gray-500 leading-relaxed pr-12">
                                                {faq.a}
                                            </p>
                                        </motion.div>
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
