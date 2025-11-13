'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ServicesPage() {
    const { language } = useLanguage();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const services = [
        {
            image: '/hotel.png',
            title: language === 'ja' ? 'ホテル清掃' : 'Hotel Cleaning',
            description:
                language === 'ja'
                    ? 'マナーを心得たホテル清掃のエキスパート!信頼と実績をもとに、高品質なサービスを提供します。'
                    : 'Expert hotel cleaning with excellent manners! We provide high-quality service based on trust and proven experience.',
        },
        {
            image: '/staffing.png',
            title: language === 'ja' ? '人材派遣サービス' : 'Staffing Services',
            description:
                language === 'ja'
                    ? 'さまざまな業界に対応した信頼できる人材を派遣し、貴社のニーズに合わせた柔軟で効果的なサポート。'
                    : 'We dispatch reliable personnel for various industries, offering flexible and effective support tailored to your needs.',
        },
        {
            image: '/halal.png',
            title: language === 'ja' ? 'ハラール事業支援' : 'Halal Business Support',
            description:
                language === 'ja'
                    ? 'ハラール食品店、レストラン、商品店、青果店の管理・運営・企画を行い、文化的・法的な基準に準拠。'
                    : 'We manage, operate, and plan halal food stores, restaurants, and product shops in compliance with cultural and legal standards.',
        },
        {
            image: '/study.png',
            title: language === 'ja' ? '留学サポート' : 'Study Abroad Support',
            description:
                language === 'ja'
                    ? '日本人および外国人学生に向けて、国内外の留学先を紹介し、手続き全般をサポート。'
                    : 'We introduce study abroad destinations both domestically and internationally, providing full support for students.',
        },
        {
            image: '/foreinger.png',
            title: language === 'ja' ? '外国人向けコンサルティング' : 'Consulting for Foreigners',
            description:
                language === 'ja'
                    ? '外国人の日本での生活、文化、ビジネスに関する情報提供とコンサルティングを通じて、安心して暮ら。'
                    : 'We provide consulting on life, culture, and business in Japan for foreigners, ensuring a comfortable experience.',
        },
        {
            image: '/translation.png',
            title: language === 'ja' ? '通訳・翻訳サービス' : 'Interpretation & Translation',
            description:
                language === 'ja'
                    ? 'ビジネス、法律、医療、日常生活に対応する専門的な通訳・翻訳サービスを提供します。'
                    : 'We provide professional interpretation and translation services for business, legal, and medical needs.',
        },
    ];

    return (
        <div className="flex flex-col">
            <section className="py-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="site-container px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {language === 'ja' ? '提供サービス' : 'What We Offer'}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {language === 'ja'
                                ? '卓越性とプロフェッショナリズムで、お客様の多様なニーズに合わせた包括的なソリューションを提供します'
                                : 'Comprehensive solutions tailored to meet your diverse needs with excellence and professionalism'}
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        {services.map((service, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="relative h-96 rounded-3xl overflow-hidden shadow-lg group border-0">
                                    {/* Background image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500" />
                                    </div>

                                    {/* Text Content */}
                                    <CardHeader className="relative z-10 h-full flex flex-col justify-end p-6">
                                        <div className="backdrop-blur-sm bg-white/10 p-4 rounded-xl">
                                            <CardTitle className="text-2xl font-bold text-white mb-2">
                                                {service.title}
                                            </CardTitle>
                                            <CardDescription className="text-gray-200 text-sm leading-relaxed">
                                                {service.description}
                                            </CardDescription>
                                            <div className="mt-4 flex items-center text-blue-200 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                <span className="text-sm">
                                                    {language === 'ja' ? '詳しく見る' : 'Learn more'}
                                                </span>
                                                <svg
                                                    className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-20 text-center"
                    >
                        <div className="bg-[#135b3e] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                        backgroundSize: '30px 30px',
                                    }}
                                />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {language === 'ja' ? '今すぐ始めませんか？' : 'Ready to Get Started?'}
                                </h3>
                                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                    {language === 'ja'
                                        ? '私たちのサービスがどのようにあなたのビジネスに貢献できるか、今すぐご相談ください'
                                        : 'Contact us today to discuss how our services can benefit your business'}
                                </p>
                                <button className="px-8 py-4 bg-white text-blue-700 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    {language === 'ja' ? '今すぐお問い合わせ' : 'Contact Us Now'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
