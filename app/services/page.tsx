'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronsRight, ClipboardList, CalendarClock, Users, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

interface ServiceItem {
    number: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
}

interface FaqItem {
    label: string;
    question: string;
    answer: string;
}

interface ProcessStep {
    step: string;
    title: string;
    description: string;
}

export default function ServicesPage() {
    const { language } = useLanguage();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const services: ServiceItem[] = language === 'ja'
        ? [
            {
                number: '01',
                title: 'ホテル清掃',
                description: '客室、ロビー、共用エリアにおける信頼性の高いホテル清掃を提供し、常に清潔で快適な環境を維持します。',
                tags: ['エコフレンドリー', '安全・安心', '定期清掃', '専門スタッフ'],
                image: '/service-page/home-cleaning.png',
            },
            {
                number: '02',
                title: '人材派遣サービス',
                description: 'さまざまな業界に対応した信頼できる人材を派遣し、貴社のニーズに合わせた柔軟で効果的なサポートを提供します。',
                tags: ['業界対応', '柔軟対応', '即戦力', '信頼の人材'],
                image: '/service-page/office-cleaning.png',
            },
            {
                number: '03',
                title: 'ハラール事業支援',
                description: 'ハラール食品店、レストラン、商品店の管理・運営・企画を行い、文化的・法的基準に完全準拠します。',
                tags: ['ハラール認証', '店舗運営', '企画支援', '法令遵守'],
                image: '/service-page/deep-cleaning.png',
            },
            {
                number: '04',
                title: '留学サポート',
                description: '日本人および外国人学生に向けて、国内外の留学先を紹介し、手続き全般を包括的にサポートします。',
                tags: ['留学相談', '手続き支援', '国内外対応', '学生サポート'],
                image: '/service-page/window-cleaning.png',
            },
            {
                number: '05',
                title: '外国人向けコンサルティング',
                description: '外国人の日本での生活、文化、ビジネスに関する情報提供とコンサルティングで安心した暮らしを支援します。',
                tags: ['生活支援', '文化理解', 'ビジネス相談', '多言語対応'],
                image: '/foreinger.png',
            },
            {
                number: '06',
                title: '通訳・翻訳サービス',
                description: 'ビジネス、法律、医療、日常生活に対応する専門的な通訳・翻訳サービスを提供します。',
                tags: ['ビジネス翻訳', '法律通訳', '医療通訳', '専門対応'],
                image: '/translation.png',
            },
        ]
        : [
            {
                number: '01',
                title: 'Home Cleaning',
                description: 'Reliable home cleaning designed to maintain a fresh, tidy, and healthy living environment with consistent results.',
                tags: ['Eco-Friendly', 'Family Safe', 'Routine Clean', 'Trained Cleaners'],
                image: '/service-page/home-cleaning.png',
            },
            {
                number: '02',
                title: 'Office Cleaning',
                description: 'Daily or scheduled office cleaning that ensures a hygienic, organized workspace for teams and clients.',
                tags: ['Workspace Care', 'Daily Cleaning', 'Sanitization', 'Professional Team'],
                image: '/service-page/office-cleaning.png',
            },
            {
                number: '03',
                title: 'Deep Cleaning',
                description: 'Thorough cleaning targeting hidden dirt, tough grime, and neglected spaces for a complete refreshed environment.',
                tags: ['Intensive Clean', 'High Detail', 'Hard-To-Reach', 'Full Refresh'],
                image: '/service-page/deep-cleaning.png',
            },
            {
                number: '04',
                title: 'Window Cleaning',
                description: 'Crystal-clear window cleaning that removes streaks, smudges, and dirt for brighter interiors and improved visibility.',
                tags: ['Streak-Free', 'Glass Shine', 'Indoor/Outdoor', 'Clear View'],
                image: '/service-page/window-cleaning.png',
            },
        ];

    const processSteps: ProcessStep[] = language === 'ja'
        ? [
            { step: 'STEP-01', title: 'サービスを選択', description: '豊富なサービスの中から、お客様のニーズに最適なオプションをお選びください。' },
            { step: 'STEP-02', title: '予約をスケジュール', description: '簡単な予約システムで、ご都合の良い日時をお選びいただけます。' },
            { step: 'STEP-03', title: '万全の準備で到着', description: 'プロのスタッフがエコフレンドリーな道具と必要な機材を持って伺います。' },
            { step: 'STEP-04', title: '完璧な仕上がりを体験', description: 'サービス後、お客様の空間はより明るく、清潔で、心地よい環境に生まれ変わります。' },
        ]
        : [
            { step: 'STEP-01', title: 'Select Your Service', description: 'Pick from our full range of services and select the option that best fits your cleaning requirements.' },
            { step: 'STEP-02', title: 'Schedule Your Appointment', description: 'Use our simple booking system to choose an available date and time that fits your schedule perfectly.' },
            { step: 'STEP-03', title: 'We Arrive Fully Prepared', description: 'Professional cleaners show up equipped with eco-friendly supplies and all essential tools required.' },
            { step: 'STEP-04', title: 'Enjoy Spotless Clean Results', description: 'After cleaning, your space looks brighter, feels healthier, and stays beautifully organized for longer.' },
        ];

    const stepIcons = [
        <ClipboardList key="icon-0" className="w-6 h-6 text-[#116f76]" />,
        <CalendarClock key="icon-1" className="w-6 h-6 text-[#116f76]" />,
        <Users key="icon-2" className="w-6 h-6 text-[#116f76]" />,
        <Sparkles key="icon-3" className="w-6 h-6 text-[#116f76]" />,
    ];

    const faqs: FaqItem[] = language === 'ja'
        ? [
            { label: 'Q1.', question: 'オンラインシステムでサービスの予約はどのようにすればよいですか？', answer: 'ウェブサイトのお問い合わせフォームから簡単にご予約いただけます。営業時間中はお電話でも対応可能です。' },
            { label: 'Q2.', question: 'プロのスタッフはエコフレンドリーな用品や必要な機材を持参しますか？', answer: 'はい、環境に優しい用品と専門機材はすべてスタッフが持参します。' },
            { label: 'Q3.', question: '確定した予約を追加料金なしで後から変更できますか？', answer: 'はい、予定日の24時間前までであれば追加料金なしで変更可能です。' },
            { label: 'Q4.', question: '使用する製品はお子様やペット、敏感な方にも安全ですか？', answer: 'はい、無毒でエコフレンドリーな製品のみを使用しており、完全に安全です。' },
            { label: 'Q5.', question: '空き状況に応じて当日予約は可能ですか？', answer: 'はい、空き状況に応じて当日予約も承っております。まずはお問い合わせください。' },
            { label: 'Q6.', question: 'サービスが期待に沿わなかった場合はどうすればよいですか？', answer: 'お客様の満足を最優先に考えています。ご期待に添えない場合は、無償で再対応させていただきます。' },
        ]
        : [
            { label: 'Q1.', question: 'How can I easily book a cleaning appointment through your online system?', answer: 'You can book through our website contact form or call us directly during business hours. We respond within 24 hours.' },
            { label: 'Q2.', question: 'Do your professional cleaners bring their own eco-friendly supplies and necessary equipment?', answer: 'Yes, our team arrives fully equipped with all eco-friendly supplies and professional-grade equipment.' },
            { label: 'Q3.', question: 'Can I reschedule my confirmed cleaning appointment later without paying additional fees?', answer: 'Absolutely! You can reschedule free of charge up to 24 hours before your appointment.' },
            { label: 'Q4.', question: 'Are your cleaning products completely safe for children, pets, and sensitive individuals?', answer: 'Yes, we exclusively use non-toxic, eco-friendly products that are completely safe for everyone.' },
            { label: 'Q5.', question: 'Do you provide same-day cleaning appointments depending on availability within my area?', answer: 'Yes, we offer same-day appointments based on availability. Contact us to check current openings.' },
            { label: 'Q6.', question: 'What can I do if the cleaning does not meet my expectations?', answer: 'Customer satisfaction is our top priority. We offer free re-service at no additional cost.' },
        ];

    return (
        <div className="flex flex-col w-full">
            {/* ===== HERO / HEADER ===== */}
            <section className="pt-10 sm:pt-10 pb-12 sm:pb-16 bg-[#f8fafc]">
                <div className="site-container text-center">
                    {/* Service Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="section-badge">
                            <span className="dot" />
                            {language === 'ja' ? 'サービス' : 'Service'}
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight whitespace-pre-line"
                    >
                        {language === 'ja'
                            ? 'プロフェッショナル\nサービスのご案内'
                            : 'Professional Cleaning\nServices We Offer'}
                    </motion.h1>
                </div>
            </section>

            {/* ===== SERVICE CARDS LIST ===== */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <motion.div
                    className="site-container space-y-6 sm:space-y-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="group bg-[#f3f6f8] rounded-3xl overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row items-stretch">
                                {/* Image with organic rounded shape */}
                                <div className="relative w-full md:w-[50%] shrink-0 p-4 sm:p-5">
                                    <div className="relative h-full min-h-70 md:min-h-90 rounded-2xl overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 flex flex-col justify-center px-6 pb-8 md:px-8 md:py-10 lg:px-12 lg:py-14">
                                    <span className="text-base font-semibold text-[#135b3e] mb-2 block">
                                        {service.number}.
                                    </span>
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                                        {service.description}
                                    </p>

                                    {/* Tags - lime/yellow-green pills */}
                                    <div className="flex flex-wrap gap-2.5 mb-8">
                                        {service.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-4 py-2 rounded-full bg-[#e8f5c8] text-sm font-medium text-gray-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View More Button */}
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2.5 w-fit px-5 py-2.5 rounded-full border-2 border-[#1a7a7a] text-base font-semibold text-gray-900 hover:bg-[#1a7a7a]/5 transition-colors"
                                    >
                                        {language === 'ja' ? '詳しく見る' : 'View More'}
                                        <span className="w-8 h-8 rounded-full bg-[#1a7a7a] flex items-center justify-center">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                                                <path d="M7 7l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ===== HOW WE WORK - PROCESS ===== */}
            <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
                <div className="site-container">
                    <div className="bg-[#116f76] rounded-3xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
                        {/* Top Row: Badge + CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-between mb-8"
                        >
                            <div className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2">
                                <span className="text-[#d4f57a] text-sm">✦</span>
                                <span className="text-white text-sm font-medium">
                                    {language === 'ja' ? '作業の流れ' : 'How We Work'}
                                </span>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-[#d4f57a] text-gray-900 font-medium text-sm rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[#c8eb6a] transition-colors"
                            >
                                {language === 'ja' ? 'サービスを見る' : 'Get A Service'}
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full">
                                    <ChevronsRight className="w-4 h-4 text-white" />
                                </span>
                            </Link>
                        </motion.div>

                        {/* Divider */}
                        <div className="border-t border-white/20 mb-10" />

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center whitespace-pre-line mb-12 sm:mb-16"
                        >
                            {language === 'ja'
                                ? 'シンプルでスムーズな\nサービスの流れ'
                                : 'A Smooth, Simple\nCleaning Process'}
                        </motion.h2>

                        {/* Process Steps Grid */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {processSteps.map((step, index) => (
                                <motion.div key={index} variants={fadeInUp}>
                                    <div className="bg-white rounded-2xl p-6 sm:p-7 h-full">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-12 h-12 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                                {stepIcons[index]}
                                            </div>
                                            <span className="text-sm font-bold text-gray-400 tracking-wider">
                                                {step.step}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

        

            {/* ===== FAQ SECTION ===== */}
            <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
                <div className="site-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight whitespace-pre-line">
                            {language === 'ja'
                                ? 'よくあるご質問'
                                : 'Quick Answers to\nCommon Questions'}
                        </h2>
                    </motion.div>

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
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                                        {faq.label}
                                    </span>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        {faq.question}
                                    </p>
                                    <AnimatePresence>
                                        {openFaq === index && (
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

            {/* ===== BOTTOM CTA BUTTONS ===== */}
            <section className="pb-16 sm:pb-20 md:pb-28 bg-[#f8fafc]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-[#d4f57a] text-[#116f76] font-semibold text-base rounded-full pl-7 pr-2 py-2 hover:bg-[#c8eb6a] transition-colors shadow-sm"
                    >
                        {language === 'ja' ? '清掃を予約する' : 'Book Your Cleaning'}
                        <span className="flex items-center justify-center w-10 h-10 bg-[#116f76] rounded-full">
                            <ChevronsRight className="w-5 h-5 text-white" />
                        </span>
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-3 bg-white text-[#116f76] font-semibold text-base rounded-full pl-7 pr-2 py-2 border-2 border-[#116f76] hover:bg-gray-50 transition-colors"
                    >
                        {language === 'ja' ? 'すべてのサービス' : 'View All Services'}
                        <span className="flex items-center justify-center w-10 h-10 bg-[#116f76] rounded-full">
                            <ChevronsRight className="w-5 h-5 text-white" />
                        </span>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
