'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Star } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';

export default function PricingPlan() {
    const { language } = useLanguage();

    const sectionTitle = language === 'ja'
        ? 'あなたに合ったプランを選ぶ'
        : 'Choose The Plan That Fits Your Needs';

    const plans = language === 'ja'
        ? [
            {
                name: 'ベーシック',
                description: '小規模なスペースや軽い定期清掃に最適です。',
                price: '¥35,000',
                period: '/ 月額',
                features: [
                    '基本的な表面清掃',
                    'ダスティング・拭き掃除',
                    'バスルームの簡易清掃',
                    '軽いキッチン清掃',
                ],
                popular: false,
            },
            {
                name: 'スタンダード',
                description: '定期的なオフィスや店舗の清掃に最適です。',
                price: '¥98,000',
                period: '/ 月額',
                features: [
                    'ベーシックの全機能',
                    '全室フルクリーニング',
                    '細部のダスティング',
                    '設備の外部清掃',
                ],
                popular: true,
            },
            {
                name: 'プレミアム',
                description: '最大限の清潔さを求める徹底清掃プラン。',
                price: '¥148,000',
                period: '/ 月額',
                features: [
                    'スタンダードの全機能',
                    '徹底的なスクラブ清掃',
                    'キャビネット内部清掃',
                    '巾木・細部の清掃',
                ],
                popular: false,
            },
        ]
        : [
            {
                name: 'Basic Clean',
                description: 'Perfect for small spaces or light weekly cleaning.',
                price: '$32.00',
                period: '/ Per Month',
                features: [
                    'Essential surface cleaning',
                    'Basic dusting',
                    'Bathroom refresh',
                    'Light kitchen cleaning',
                ],
                popular: false,
            },
            {
                name: 'Standard Clean',
                description: 'Ideal for routine home or office cleaning.',
                price: '$99.00',
                period: '/ Per Month',
                features: [
                    'All Basic Clean features',
                    'Full-room cleaning',
                    'Detailed dusting',
                    'Appliance exterior cleaning',
                ],
                popular: true,
            },
            {
                name: 'Premium Deep Clean',
                description: 'Full-detail cleaning for maximum freshness.',
                price: '$149.00',
                period: '/ Per Month',
                features: [
                    'All Standard Clean features',
                    'Deep scrubbing',
                    'Inside cabinets',
                    'Baseboards & edges',
                ],
                popular: false,
            },
        ];

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
                        {sectionTitle}
                    </h2>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto"
                >
                    {plans.map((plan, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <div
                                className={`relative h-full rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${plan.popular
                                    ? 'border-[#135b3e] bg-[#135b3e] text-white shadow-xl scale-[1.02]'
                                    : 'border-gray-100 bg-white hover:border-gray-200 card-hover'
                                    }`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-yellow-400 text-gray-900 text-xs font-bold uppercase tracking-wider">
                                            <Star className="w-3 h-3 fill-current" />
                                            {language === 'ja' ? '一番人気' : 'MOST POPULAR'}
                                        </div>
                                    </div>
                                )}

                                {/* Plan Name & Description */}
                                <div className="mb-6">
                                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-6 pb-6 border-b border-white/20">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-3xl sm:text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href="/contact"
                                    className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 mb-6 ${plan.popular
                                        ? 'bg-white text-[#135b3e] hover:bg-gray-100'
                                        : 'bg-[#135b3e] text-white hover:bg-[#1a7a54]'
                                        }`}
                                >
                                    {language === 'ja' ? '今すぐ始める' : 'Get Started Now'}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                {/* Features */}
                                <div>
                                    <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                                        {language === 'ja' ? '含まれる内容' : 'What will you get?'}
                                    </p>
                                    <ul className="space-y-2.5">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2.5">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular
                                                    ? 'bg-white/20'
                                                    : 'bg-[#f0fdf4]'
                                                    }`}>
                                                    <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-[#135b3e]'}`} />
                                                </div>
                                                <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
