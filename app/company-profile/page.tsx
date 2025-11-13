'use client';

/**
 * Company Profile Page
 * Displays company information, mission, and values
 */

import { useLanguage } from '@/lib/translations/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Shield, Sparkles, Award, Building2, User, Briefcase, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyProfilePage() {
    const { t, language } = useLanguage();

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Company values data
    const values = [
        {
            icon: Target,
            title: t.companyProfile.values.quality.title,
            description: t.companyProfile.values.quality.description,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: Shield,
            title: t.companyProfile.values.trust.title,
            description: t.companyProfile.values.trust.description,
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: Sparkles,
            title: t.companyProfile.values.cleanliness.title,
            description: t.companyProfile.values.cleanliness.description,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            icon: Award,
            title: t.companyProfile.values.professionalism.title,
            description: t.companyProfile.values.professionalism.description,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    return (
        <div className="flex flex-col">
            {/* Company Description Section */}
            <section className="py-12 md:py-12 bg-white relative overflow-visible">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-visible"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-blue-600">
                            {language === 'ja' ? '会社情報' : 'Company Information'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Company Name */}
                            <div className="group">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-blue-500" />
                                    {language === 'ja' ? '会社名' : 'Company Name'}
                                </h3>
                                <p className="text-lg text-gray-900 font-medium">
                                    {language === 'ja' ? '株式会社 D.BRIGHT' : 'D.BRIGHT Corporation'}
                                </p>
                            </div>

                            {/* Representative */}
                            <div className="group">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <User className="w-4 h-4 text-green-500" />
                                    {language === 'ja' ? '代表取締役' : 'Representative Director'}
                                </h3>
                                <p className="text-lg text-gray-900 font-medium">
                                    {language === 'ja' ? 'オザ・ケサブ・ラズ' : 'OJHA KESHAV RAJ'}
                                </p>
                            </div>

                            {/* Capital */}
                            <div className="group">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <p className="w-1 h-6 text-amber-500" >¥ </p>
                                    {language === 'ja' ? '資本金' : 'Capital'}
                                </h3>
                                <p className="text-lg text-gray-900 font-medium">
                                    {language === 'ja' ? '500万円' : '¥5,000,000'}
                                </p>
                            </div>

                            {/* Bank */}
                            <div className="group">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-teal-500" />
                                    {language === 'ja' ? '取引先銀行' : 'Bank'}
                                </h3>
                                <p className="text-lg text-gray-900 font-medium">
                                    {language === 'ja' ? '千葉銀行、京葉銀行' : 'Chiba Bank, Keiyo Bank'}
                                </p>
                            </div>

                            {/* Main Business */}
                            <div className="group md:row-span-2">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-purple-500" />
                                    {language === 'ja' ? '主な事業内容' : 'Main Business'}
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{language === 'ja' ? '清掃業' : 'Cleaning services'}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{language === 'ja' ? '労働者派遣業' : 'Worker dispatch services'}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{language === 'ja' ? '寮、ホテル、その他宿泊施設の経営・コンサルティング' : 'Dormitory, hotel, and other accommodation management/consulting'}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{language === 'ja' ? '通訳・翻訳サービス' : 'Interpretation and translation services'}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Address */}
                            <div className="group">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    {language === 'ja' ? '所在地' : 'Address'}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    〒272-0035<br />
                                    {language === 'ja'
                                        ? '千葉県市川市新田4-18-22'
                                        : 'Chiba Prefecture, Ichikawa City, Shinden 4-18-22'}<br />
                                    {language === 'ja' ? 'ハイホーム田中201号室' : 'High Home Tanaka Room 201'}
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="group">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-indigo-500" />
                                    {language === 'ja' ? '連絡先' : 'Contact'}
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <span className="font-semibold text-gray-900">TEL:</span> 047-711-2099
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold text-gray-900">FAX:</span> 047-711-2066
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group md:col-span-2">
                                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-cyan-500" />
                                    {language === 'ja' ? 'メールアドレス' : 'Email Address'}
                                </h3>
                                <p>
                                    <a
                                        href="mailto:info@dbrightservices.com"
                                        className="text-lg text-blue-600 hover:text-blue-700 transition-colors font-medium inline-flex items-center group"
                                    >
                                        info@dbrightservices.com
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl"></div>
                </div>

                <div className="site-container px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block mb-4 px-4 py-1 bg-blue-100 rounded-full">
                            <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                                {language === 'ja' ? '私たちの価値観' : 'Our Values'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t.companyProfile.values.title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {language === 'ja'
                                ? '私たちの事業を支える4つの柱'
                                : 'The four pillars that support our business'}
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div key={index} variants={fadeInUp}>
                                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                        <CardHeader className="relative z-10">
                                            <div className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="h-8 w-8" />
                                            </div>
                                            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                                                {value.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="relative z-10">
                                            <CardDescription className="text-base leading-relaxed text-gray-600">
                                                {value.description}
                                            </CardDescription>
                                        </CardContent>

                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}