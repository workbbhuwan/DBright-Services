'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Testimonials() {
    const { language } = useLanguage();
    const [current, setCurrent] = useState(0);

    const testimonials = language === 'ja'
        ? [
            {
                quote: 'D.BRIGHTのチームは、あらゆる期待を超えるサービスを提供してくれました。常に高い品質と信頼性で、私たちの職場環境を大きく改善してくれ、より清潔で健康的かつ生産的な環境を毎日作り上げてくれています。',
                name: '田中 美咲',
                role: 'ホテル運営マネージャー',
                image: '/hotel.png',
            },
            {
                quote: '人材派遣サービスを利用しましたが、紹介されたスタッフは即戦力として活躍してくれました。対応も迅速で、候補者の質も非常に高く、大変満足しています。',
                name: '佐藤 健太',
                role: '飲食店オーナー',
                image: '/staffing.png',
            },
            {
                quote: '留学サポートのおかげで、手続きがスムーズに進みました。多言語対応も素晴らしく、細部への配慮が安心感を与えてくれました。',
                name: '山田 あゆみ',
                role: '留学生の母',
                image: '/study.png',
            },
            {
                quote: 'ハラールビジネスの立ち上げに際して、D.BRIGHTのコンサルティングは非常に的確でした。文化理解と実務知識の両方を持った、まさにプロフェッショナルなチームです。',
                name: '鈴木 一郎',
                role: '事業オーナー',
                image: '/halal.png',
            },
        ]
        : [
            {
                quote: 'The D.BRIGHT team exceeded every expectation by delivering spotless results, consistent reliability, and genuine professionalism. Their service improved our workspace atmosphere, creating a cleaner, healthier, and more productive environment every day.',
                name: 'Sarah Mitchell',
                role: 'Operations Manager',
                image: '/hotel.png',
            },
            {
                quote: 'Their staffing service provided us with skilled workers who immediately became valuable team members. The response time and quality of candidates were outstanding.',
                name: 'James Chen',
                role: 'Restaurant Owner',
                image: '/staffing.png',
            },
            {
                quote: 'The study abroad support team made the entire process seamless. Their multilingual staff and attention to detail gave us complete peace of mind.',
                name: 'Emily Parker',
                role: 'Parent of Student',
                image: '/study.png',
            },
            {
                quote: 'Their halal business consulting was incredibly precise and professional. A team truly experienced in both cultural understanding and practical business knowledge.',
                name: 'Ahmed Rashid',
                role: 'Business Owner',
                image: '/halal.png',
            },
        ];

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-white w-full">
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
                        {language === 'ja' ? 'お客様の声' : 'Real Words From Real Clients'}
                    </h2>
                </motion.div>

                {/* Testimonial Card - Wipeora style: author left, quote right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative bg-[#f8fafc] rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
                            {/* Left - Author Photo */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`img-${current}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative aspect-square md:aspect-auto md:min-h-[400px] bg-gray-200"
                                >
                                    <Image
                                        src={testimonials[current].image}
                                        alt={testimonials[current].name}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Author info overlay on image */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 via-black/40 to-transparent p-5 sm:p-6">
                                        <p className="font-bold text-white text-base sm:text-lg">
                                            — {testimonials[current].name}
                                        </p>
                                        <p className="text-sm text-white/70">
                                            {testimonials[current].role}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Right - Quote Content */}
                            <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                                {/* Stars + Company */}
                                <div className="flex items-center justify-between mb-6 sm:mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <Image
                                        src="/logo.png"
                                        alt="D.BRIGHT"
                                        width={80}
                                        height={24}
                                        className="h-6 w-auto opacity-40"
                                    />
                                </div>

                                {/* Quote */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={current}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex-1"
                                    >
                                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                                            &ldquo;{testimonials[current].quote}&rdquo;
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation - Numbered pagination + arrows (Wipeora style) */}
                                <div className="flex items-center justify-between mt-8 sm:mt-10 pt-6 border-t border-gray-200">
                                    {/* Numbered pagination */}
                                    <div className="flex items-center gap-1">
                                        {testimonials.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrent(i)}
                                                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${i === current
                                                    ? 'bg-[#135b3e] text-white'
                                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Arrows */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={prev}
                                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#135b3e] hover:text-white hover:border-[#135b3e] transition-all duration-300 text-gray-600"
                                        >
                                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <button
                                            onClick={next}
                                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#135b3e] hover:text-white hover:border-[#135b3e] transition-all duration-300 text-gray-600"
                                        >
                                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
