'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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

    return (
        <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100">
            {/* Subtle background shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2, y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[-10%] left-[10%] w-72 h-72 bg-blue-200 rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15, y: [0, -40, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-cyan-200 rounded-full blur-3xl"
                />
            </div>

            {/* Main Content */}
            <section className="relative z-10 py-8 pt-4">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-5">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-2xl font-bold text-gray-900"
                        >
                            {language === 'ja' ? 'お問い合わせ' : 'Get In Touch'}
                        </motion.h1>
                        <p className="mt-1 text-gray-600 text-sm">
                            {language === 'ja'
                                ? 'ご質問やご相談がありましたら、いつでもお気軽にお問い合わせください。'
                                : 'Have questions? Reach out to us and we’ll get back to you shortly.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Left — Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: Phone,
                                        title: language === 'ja' ? '電話番号' : 'Phone Number',
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
                                        title: language === 'ja' ? '住所' : 'Address',
                                        value:
                                            '4-18-22 Nitta, Ichikawa City, Chiba Prefecture High Home Tanaka Room 201',
                                    },
                                    {
                                        icon: Clock,
                                        title: language === 'ja' ? '営業時間' : 'Business Hours',
                                        value: language === 'ja' ? '月〜金 9:00〜18:00' : 'Mon - Fri 9:00 - 18:00',
                                    },
                                ].map(({ icon: Icon, title, value, href }, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.03 }}
                                        className="backdrop-blur-xl bg-white/60 border border-blue-100 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
                                    >
                                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                                        {href ? (
                                            <a
                                                href={href}
                                                className="text-blue-600 hover:text-blue-700 font-medium break-all"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="text-gray-700 text-sm leading-relaxed">{value}</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map */}
                            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                                <CardContent className="p-0">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8947562987543!2d139.91891!3d35.72635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188a0d8c8f8c8f%3A0x8c8f8c8f8c8f8c8f!2s4-ch%C5%8Dme-18-22%20Shinden%2C%20Ichikawa%2C%20Chiba%20272-0035%2C%20Japan!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                                        width="100%"
                                        height="280"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Right — Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="border-none backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-900">
                                        {language === 'ja' ? 'メッセージを送信' : 'Send Us A Message'}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        {language === 'ja'
                                            ? 'フォームにご記入の上、送信してください。'
                                            : 'Fill out the form and we’ll reply promptly.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <Label htmlFor="name" className="text-gray-800">
                                                {language === 'ja' ? 'お名前' : 'Name'}
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder={language === 'ja' ? '山田 太郎' : 'Your name'}
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                disabled={status === 'loading'}
                                                className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="email" className="text-gray-800">
                                                {language === 'ja' ? 'メールアドレス' : 'Email'}
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={status === 'loading'}
                                                className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="phone" className="text-gray-800">
                                                {language === 'ja' ? '電話番号' : 'Phone'}
                                            </Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder={language === 'ja' ? '090-1234-5678' : 'Your phone number'}
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={status === 'loading'}
                                                className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="message" className="text-gray-800">
                                                {language === 'ja' ? 'メッセージ' : 'Message'}
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                placeholder={language === 'ja' ? 'ご用件を入力してください...' : 'Type your message...'}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                disabled={status === 'loading'}
                                                className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        {status === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-green-100 border-2 border-green-500 text-green-800 rounded-lg text-base font-semibold text-center shadow-md"
                                            >
                                                ✅ {language === 'ja'
                                                    ? 'メッセージが正常に送信されました！担当者が確認後、ご連絡いたします。'
                                                    : 'Message sent successfully! We will get back to you soon.'}
                                            </motion.div>
                                        )}

                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-red-100 border-2 border-red-500 text-red-800 rounded-lg text-base font-semibold text-center shadow-md"
                                            >
                                                ❌ {language === 'ja'
                                                    ? 'メッセージの送信に失敗しました。後でもう一度お試しください。'
                                                    : 'Failed to send message. Please try again later or contact us directly.'}
                                            </motion.div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2"
                                            disabled={status === 'loading'}
                                        >
                                            <Send className="h-4 w-4" />
                                            {status === 'loading'
                                                ? language === 'ja'
                                                    ? '送信中...'
                                                    : 'Sending...'
                                                : language === 'ja'
                                                    ? '送信する'
                                                    : 'Send Message'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
