'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { Mail, Phone, MapPin, Clock, ChevronsRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';
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

export default function ContactPage() {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else throw new Error();
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const contactCards = [
        {
            icon: Phone,
            title: language === 'ja' ? '電話番号' : 'Phone',
            value: '047-711-2099',
            href: 'tel:047-711-2099',
        },
        {
            icon: Mail,
            title: language === 'ja' ? 'メール' : 'Email',
            value: 'info@dbrightservices.com',
            href: 'mailto:info@dbrightservices.com',
        },
        {
            icon: MapPin,
            title: language === 'ja' ? '所在地' : 'Address',
            value: language === 'ja'
                ? '〒272-0035 千葉県市川市新田4-18-22 ハイホーム田中201号室'
                : '4-18-22 Nitta, Ichikawa City, Chiba 272-0035, High Home Tanaka Room 201',
        },
        {
            icon: Clock,
            title: language === 'ja' ? '営業時間' : 'Hours',
            value: language === 'ja' ? '月〜金 9:00〜18:00' : 'Mon – Fri, 9:00 – 18:00',
        },
    ];

    return (
        <div className="flex flex-col w-full">
            {/* ===== HERO / HEADER ===== */}
            <section className="pt-10 pb-4 bg-[#f8fafc]">
                <div className="site-container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="section-badge">
                            <span className="dot" />
                            {language === 'ja' ? 'お問い合わせ' : 'Contact'}
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight whitespace-pre-line"
                    >
                        {language === 'ja'
                            ? 'お気軽に\nご連絡ください'
                            : 'Get In Touch With Us'}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-gray-500 text-lg mt-5 max-w-xl mx-auto"
                    >
                        {language === 'ja'
                            ? 'ご質問やご相談がありましたら、いつでもお気軽にお問い合わせください。'
                            : "Have questions or need assistance? Reach out and we'll get back to you shortly."}
                    </motion.p>
                </div>
            </section>

            {/* ===== CONTACT INFO CARDS ===== */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="site-container">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {contactCards.map(({ icon: Icon, title, value, href }, i) => (
                            <motion.div key={i} variants={fadeInUp}>
                                <div className="bg-[#f3f6f8] rounded-2xl p-6 sm:p-7 h-full">
                                    <div className="w-12 h-12 bg-[#e8f5c8] rounded-xl flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6 text-[#116f76]" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-[#116f76] uppercase tracking-wider mb-2">
                                        {title}
                                    </h3>
                                    {href ? (
                                        <a href={href} className="text-gray-900 font-medium hover:text-[#116f76] transition-colors break-all">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="text-gray-700 text-sm leading-relaxed">{value}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== FORM + MAP ===== */}
            <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
                <div className="site-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                    {language === 'ja' ? 'メッセージを送信' : 'Send Us A Message'}
                                </h2>
                                <p className="text-gray-500 text-sm mb-8">
                                    {language === 'ja'
                                        ? 'フォームにご記入の上、送信してください。'
                                        : "Fill out the form below and we'll respond promptly."}
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {language === 'ja' ? 'お名前' : 'Name'}
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            placeholder={language === 'ja' ? '山田 太郎' : 'Your name'}
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            disabled={status === 'loading'}
                                            className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#116f76]/30 focus:border-[#116f76] transition-colors disabled:opacity-50"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {language === 'ja' ? 'メールアドレス' : 'Email'}
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={status === 'loading'}
                                            className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#116f76]/30 focus:border-[#116f76] transition-colors disabled:opacity-50"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {language === 'ja' ? '電話番号' : 'Phone'}
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder={language === 'ja' ? '090-1234-5678' : 'Your phone number'}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                            className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#116f76]/30 focus:border-[#116f76] transition-colors disabled:opacity-50"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            {language === 'ja' ? 'メッセージ' : 'Message'}
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder={language === 'ja' ? 'ご用件を入力してください...' : 'Type your message...'}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            disabled={status === 'loading'}
                                            className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#116f76]/30 focus:border-[#116f76] transition-colors resize-none disabled:opacity-50"
                                        />
                                    </div>

                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-[#e8f5c8] border border-[#116f76]/30 text-[#116f76] rounded-xl text-sm font-semibold text-center"
                                        >
                                            {language === 'ja'
                                                ? '✅ メッセージが正常に送信されました！担当者が確認後、ご連絡いたします。'
                                                : '✅ Message sent successfully! We will get back to you soon.'}
                                        </motion.div>
                                    )}

                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold text-center"
                                        >
                                            {language === 'ja'
                                                ? '❌ メッセージの送信に失敗しました。後でもう一度お試しください。'
                                                : '❌ Failed to send message. Please try again later.'}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-[#116f76] text-white font-semibold text-sm rounded-xl px-6 py-3.5 hover:bg-[#0e5c62] transition-colors disabled:opacity-50"
                                    >
                                        <Send className="w-4 h-4" />
                                        {status === 'loading'
                                            ? language === 'ja' ? '送信中...' : 'Sending...'
                                            : language === 'ja' ? '送信する' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Map + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex-1 min-h-80">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8947562987543!2d139.91891!3d35.72635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188a0d8c8f8c8f%3A0x8c8f8c8f8c8f8c8f!2s4-ch%C5%8Dme-18-22%20Shinden%2C%20Ichikawa%2C%20Chiba%20272-0035%2C%20Japan!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '100%' }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Quick CTA */}
                            <div className="bg-[#116f76] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                        {language === 'ja' ? '今すぐご相談ください' : 'Ready to Get Started?'}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-5">
                                        {language === 'ja'
                                            ? 'プロの清掃サービスで快適な空間を。'
                                            : 'Let our professional team handle the cleaning for you.'}
                                    </p>
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center gap-2 bg-[#d4f57a] text-gray-900 font-medium text-sm rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[#c8eb6a] transition-colors"
                                    >
                                        {language === 'ja' ? 'サービスを見る' : 'View Services'}
                                        <span className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full">
                                            <ChevronsRight className="w-4 h-4 text-white" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
