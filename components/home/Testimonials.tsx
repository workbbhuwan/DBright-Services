'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeft, ChevronsRight, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Testimonials() {
    const { language } = useLanguage();
    const [page, setPage] = useState(0);

    const testimonials = language === 'ja'
        ? [
            {
                quote: 'D.BRIGHTのチームは、あらゆる期待を超えるサービスを提供してくれました。常に高い品質と信頼性で、私たちの職場環境を大きく改善してくれ、より清潔で健康的かつ生産的な環境を毎日作り上げてくれています。',
                name: '彩花',
                role: '運営マネージャー',
                image: '/testinomials/female.png',
            },
            {
                quote: '清掃サービスは常に高品質で、細部への注意と信頼性が際立っています。アパートは毎回訪問後に明らかに清潔で快適になり、チームは本当に頼れるパートナーです。',
                name: '大輝',
                role: 'プロダクトデザイナー',
                image: '/testinomials/male.png',
            },
            {
                quote: '人材派遣サービスを利用しましたが、紹介されたスタッフは即戦力として活躍してくれました。対応も迅速で、候補者の質も非常に高く、大変満足しています。',
                name: '悠斗',
                role: 'ホテルオーナー',
                image: '/testinomials/male.png',
            },
            {
                quote: 'ハラールビジネスの立ち上げに際して、D.BRIGHTのコンサルティングは非常に的確でした。文化理解と実務知識の両方を持った、まさにプロフェッショナルなチームです。',
                name: '空',
                role: '事業オーナー',
                image: '/testinomials/male.png',
            },
        ]
        : [
            {
                quote: 'The cleaning team exceeded every expectation by delivering spotless results, consistent reliability, and genuine professionalism. Their service improved our workspace atmosphere, creating a cleaner, healthier, and more productive environment every day.',
                name: 'Ayaka',
                role: 'Operations Manager',
                image: '/testinomials/female.png',
            },
            {
                quote: 'Their cleaning service consistently delivers exceptional quality, strong attention to detail, and reliable results. Our apartment feels noticeably fresher, healthier, and more comfortable after each visit, making their team our dependable partner.',
                name: 'Daiki',
                role: 'Product Designer',
                image: '/testinomials/male.png',
            },
            {
                quote: 'Their staffing service provided us with skilled workers who immediately became valuable team members. The response time and quality of candidates were outstanding.',
                name: 'Yuto',
                role: 'Hotel Owner',
                image: '/testinomials/male.png',
            },
            {
                quote: 'Their halal business consulting was incredibly precise and professional. A team truly experienced in both cultural understanding and practical business knowledge.',
                name: 'Sora',
                role: 'Business Owner',
                image: '/testinomials/male.png',
            },
        ];

    const perPage = 2;
    const totalPages = Math.ceil(testimonials.length / perPage);
    const currentTestimonials = testimonials.slice(page * perPage, page * perPage + perPage);

    const next = () => setPage((prev) => (prev + 1) % totalPages);
    const prev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

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
                        {language === 'ja' ? 'お客様の声' : 'Our Testimonial'}
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

                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center mb-12 sm:mb-16"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                    {language === 'ja' ? 'お客様からの\nリアルな声' : 'Real Words From\nReal Clients'}
                </motion.h2>

                {/* Testimonial Cards Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14"
                    >
                        {currentTestimonials.map((t, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 sm:p-8 flex flex-col"
                            >
                                {/* Author Row: Photo + Name + Company */}
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Photo */}
                                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-gray-200">
                                        <Image
                                            src={t.image}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Name + Role */}
                                    <div className="flex-1 pt-1">
                                        <p className="text-lg sm:text-xl font-bold text-gray-900">
                                            — {t.name},
                                        </p>
                                        <p className="text-sm text-[#135b3e] font-medium">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-0.5 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <Star key={s} className="w-5 h-5 fill-[#135b3e] text-[#135b3e]" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-center gap-6">
                    {/* Page number */}
                    <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-500">
                        {page + 1}
                    </span>

                    {/* Progress bar */}
                    <div className="w-40 sm:w-56 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gray-900 rounded-full"
                            initial={false}
                            animate={{ width: `${((page + 1) / totalPages) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Arrow buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#135b3e] hover:text-white hover:border-[#135b3e] transition-all duration-300 text-gray-600"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#135b3e] hover:text-white hover:border-[#135b3e] transition-all duration-300 text-gray-600"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
