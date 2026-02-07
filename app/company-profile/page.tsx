'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronsRight, Building2, User, Briefcase, MapPin, Phone, Mail, Landmark, Target, Shield, Sparkles, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

export default function CompanyProfilePage() {
    const { t, language } = useLanguage();

    const values = [
        {
            icon: Target,
            title: t.companyProfile.values.quality.title,
            description: t.companyProfile.values.quality.description,
        },
        {
            icon: Shield,
            title: t.companyProfile.values.trust.title,
            description: t.companyProfile.values.trust.description,
        },
        {
            icon: Sparkles,
            title: t.companyProfile.values.cleanliness.title,
            description: t.companyProfile.values.cleanliness.description,
        },
        {
            icon: Award,
            title: t.companyProfile.values.professionalism.title,
            description: t.companyProfile.values.professionalism.description,
        },
    ];

    const companyInfo = [
        {
            icon: Building2,
            label: language === 'ja' ? '会社名' : 'Company Name',
            value: language === 'ja' ? '株式会社 D.BRIGHT' : 'D.BRIGHT Corporation',
        },
        {
            icon: User,
            label: language === 'ja' ? '代表取締役' : 'Representative Director',
            value: language === 'ja' ? 'オザ・ケサブ・ラズ' : 'OJHA KESHAV RAJ',
        },
        {
            icon: Landmark,
            label: language === 'ja' ? '資本金' : 'Capital',
            value: language === 'ja' ? '500万円' : '¥5,000,000',
        },
        {
            icon: Landmark,
            label: language === 'ja' ? '取引先銀行' : 'Bank',
            value: language === 'ja' ? '千葉銀行、京葉銀行' : 'Chiba Bank, Keiyo Bank',
        },
    ];

    const businessItems = language === 'ja'
        ? ['清掃業', '労働者派遣業', '寮、ホテル、その他宿泊施設の経営・コンサルティング', '通訳・翻訳サービス']
        : ['Cleaning services', 'Worker dispatch services', 'Dormitory, hotel, and other accommodation management/consulting', 'Interpretation and translation services'];

    const majorClients = language === 'ja'
        ? ['株式会社ハウゼスタッフ', '株式会社ベストクリエイト', '株式会社ユニバーサル企業']
        : ['Hauze Staff Corporation', 'Best Create Corporation', 'Universal Corporation'];

    return (
        <div className="flex flex-col w-full">
            {/* ===== HERO / HEADER ===== */}
            <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-[#f8fafc]">
                <div className="site-container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="section-badge">
                            <span className="dot" />
                            {language === 'ja' ? '会社概要' : 'About Us'}
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight whitespace-pre-line"
                    >
                        {language === 'ja'
                            ? '私たちについて'
                            : 'Company Profile'}
                    </motion.h1>
                </div>
            </section>

            {/* ===== ABOUT / MISSION ===== */}
            <section className="py-16 sm:py-20 md:py-28 bg-white">
                <div className="site-container">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative rounded-3xl overflow-hidden aspect-4/3">
                                <Image
                                    src="/about-us/1.png"
                                    alt="About DBright Services"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </motion.div>

                        {/* Text Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="section-badge mb-6">
                                <span className="dot" />
                                {language === 'ja' ? '私たちのミッション' : 'Our Mission'}
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-6">
                                {language === 'ja'
                                    ? '清潔で快適な空間を\nすべての方に'
                                    : 'Clean & Comfortable\nSpaces for Everyone'}
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {t.companyProfile.description}
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                {t.companyProfile.mission.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
                <div className="site-container">
                    <div className="bg-[#116f76] rounded-3xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
                        {/* Top Row */}
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
                                    {language === 'ja' ? '私たちの価値観' : 'Our Values'}
                                </span>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-[#d4f57a] text-gray-900 font-medium text-sm rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[#c8eb6a] transition-colors"
                            >
                                {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full">
                                    <ChevronsRight className="w-4 h-4 text-white" />
                                </span>
                            </Link>
                        </motion.div>

                        <div className="border-t border-white/20 mb-10" />

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center whitespace-pre-line mb-12 sm:mb-16"
                        >
                            {language === 'ja'
                                ? '私たちの事業を支える\n4つの柱'
                                : 'The Four Pillars That\nDrive Our Business'}
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div key={index} variants={fadeInUp}>
                                        <div className="bg-white rounded-2xl p-6 sm:p-7 h-full">
                                            <div className="w-12 h-12 bg-[#e8f5c8] rounded-xl flex items-center justify-center mb-6">
                                                <Icon className="w-6 h-6 text-[#116f76]" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                {value.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== COMPANY INFORMATION ===== */}
            <section className="py-16 sm:py-20 md:py-28 bg-white">
                <div className="site-container">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="section-badge">
                            <span className="dot" />
                            {language === 'ja' ? '会社情報' : 'Company Details'}
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center whitespace-pre-line mb-12 sm:mb-16"
                    >
                        {language === 'ja' ? '会社についての\n基本情報' : 'Essential Information\nAbout Our Company'}
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {companyInfo.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={index} variants={fadeInUp}>
                                    <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-[#116f76]" />
                                            </div>
                                            <span className="text-sm font-semibold text-[#116f76] uppercase tracking-wider">
                                                {item.label}
                                            </span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Main Business + Major Clients + Address/Contact Row */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto mt-5 sm:mt-6"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {/* Main Business */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-[#116f76]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#116f76] uppercase tracking-wider">
                                        {language === 'ja' ? '主な事業内容' : 'Main Business'}
                                    </span>
                                </div>
                                <ul className="space-y-3">
                                    {businessItems.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="inline-block w-1.5 h-1.5 bg-[#116f76] rounded-full mt-2 shrink-0" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Major Clients */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-[#116f76]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#116f76] uppercase tracking-wider">
                                        {language === 'ja' ? '主要取引先' : 'Major Clients'}
                                    </span>
                                </div>
                                <ul className="space-y-3">
                                    {majorClients.map((client, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="inline-block w-1.5 h-1.5 bg-[#116f76] rounded-full mt-2 shrink-0" />
                                            <span className="text-gray-700">{client}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Address + Contact Row */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto mt-5 sm:mt-6"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {/* Address */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-[#116f76]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#116f76] uppercase tracking-wider">
                                        {language === 'ja' ? '所在地' : 'Address'}
                                    </span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    〒272-0035<br />
                                    {language === 'ja'
                                        ? '千葉県市川市新田4-18-22'
                                        : 'Chiba Prefecture, Ichikawa City, Shinden 4-18-22'}<br />
                                    {language === 'ja' ? 'ハイホーム田中201号室' : 'High Home Tanaka Room 201'}
                                </p>
                            </div>
                        </motion.div>

                        {/* Phone / Fax */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-[#116f76]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#116f76] uppercase tracking-wider">
                                        {language === 'ja' ? '連絡先' : 'Contact'}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <span className="font-semibold text-gray-900">TEL:</span> 047-711-2099
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold text-gray-900">FAX:</span> 047-711-2066
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-[#e8f5c8] rounded-xl flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-[#116f76]" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#116f76] uppercase tracking-wider">
                                        {language === 'ja' ? 'メール' : 'Email'}
                                    </span>
                                </div>
                                <a
                                    href="mailto:info@dbrightservices.com"
                                    className="text-[#116f76] font-medium hover:underline transition-colors"
                                >
                                    info@dbrightservices.com
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="pb-16 sm:pb-20 md:pb-28 bg-white">
                <div className="site-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-[#116f76] rounded-3xl p-10 sm:p-14 lg:p-16 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-dot-pattern opacity-10" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                                    {language === 'ja'
                                        ? 'お気軽にお問い合わせください'
                                        : 'Get In Touch With Us'}
                                </h2>
                                <p className="text-white/70 text-lg max-w-xl">
                                    {language === 'ja'
                                        ? 'ご質問やご相談がありましたら、いつでもお気軽にご連絡ください。'
                                        : 'Have questions or need assistance? We\'d love to hear from you.'}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 bg-[#d4f57a] text-gray-900 font-semibold text-base rounded-full pl-7 pr-2 py-2 hover:bg-[#c8eb6a] transition-colors"
                                >
                                    {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                                    <span className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full">
                                        <ChevronsRight className="w-5 h-5 text-white" />
                                    </span>
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-3 bg-white/10 text-white font-semibold text-base rounded-full pl-7 pr-2 py-2 border border-white/30 hover:bg-white/20 transition-colors"
                                >
                                    {language === 'ja' ? 'サービス一覧' : 'Our Services'}
                                    <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                                        <ChevronsRight className="w-5 h-5 text-white" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}