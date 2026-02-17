'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { useLocalePath } from '@/lib/navigation';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, Building2, UtensilsCrossed, CheckCircle2, User, ChevronLeft, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

type Step = 1 | 2 | 3;

export default function ContactPage() {
    return (
        <Suspense>
            <ContactPageContent />
        </Suspense>
    );
}

function ContactPageContent() {
    const { language } = useLanguage();
    const servicesPath = useLocalePath('/services');
    const isJa = language === 'ja';

    const searchParams = useSearchParams();
    const [step, setStep] = useState<Step>(1);
    const [selectedService, setSelectedService] = useState('');

    // Auto-advance to step 2 if ?service= is provided (from services page "Book Now")
    useEffect(() => {
        const serviceParam = searchParams.get('service');
        if (serviceParam) {
            setSelectedService(decodeURIComponent(serviceParam));
            setStep(2);
        }
    }, [searchParams]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        date: '',
        time: '',
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
                body: JSON.stringify({ ...formData, subject: selectedService }),
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', company: '', date: '', time: '', message: '' });
                setSelectedService('');
            } else throw new Error();
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const serviceOptions = [
        {
            id: isJa ? 'ホテル清掃' : 'Hotel Cleaning',
            icon: Building2,
            title: isJa ? 'ホテル清掃' : 'Hotel Cleaning',
            desc: isJa ? '客室・共用エリアの清掃' : 'Guest rooms & common areas',
            color: 'from-teal-500/10 to-emerald-500/10',
        },
        {
            id: isJa ? '人材派遣' : 'Staffing & Dispatch',
            icon: User,
            title: isJa ? '人材派遣' : 'Staffing & Dispatch',
            desc: isJa ? '即戦力の人材をご紹介' : 'Reliable workforce solutions',
            color: 'from-blue-500/10 to-indigo-500/10',
        },
        {
            id: isJa ? 'ハラール事業' : 'Halal Business',
            icon: UtensilsCrossed,
            title: isJa ? 'ハラール事業' : 'Halal Business',
            desc: isJa ? '店舗運営・企画支援' : 'Store operations & planning',
            color: 'from-amber-500/10 to-orange-500/10',
        },
        {
            id: isJa ? 'ハウスクリーニング' : 'House Cleaning',
            icon: Home,
            title: isJa ? 'ハウスクリーニング' : 'House Cleaning',
            desc: isJa ? '住宅・マンションの清掃' : 'Residential & apartment cleaning',
            color: 'from-purple-500/10 to-pink-500/10',
        },
    ];

    const contactCards = [
        { icon: Phone, title: isJa ? '電話番号' : 'Phone', value: '047-711-2099', href: 'tel:047-711-2099', sub: isJa ? '平日対応' : 'Weekdays' },
        { icon: Mail, title: isJa ? 'メール' : 'Email', value: 'info@dbrightservices.com', href: 'mailto:info@dbrightservices.com', sub: isJa ? '24時間受付' : '24/7 Inbox' },
        { icon: MapPin, title: isJa ? '所在地' : 'Address', value: isJa ? '〒272-0035\n千葉県市川市新田4-18-22\nハイホーム田中201号室' : '4-18-22 Nitta, Ichikawa City,\nChiba 272-0035, Japan', sub: isJa ? '千葉県市川市' : 'Ichikawa, Chiba' },
        { icon: Clock, title: isJa ? '営業時間' : 'Hours', value: isJa ? '月〜金 9:00〜18:00' : 'Mon – Fri 9:00 – 18:00', sub: isJa ? '土日祝休み' : 'Closed weekends' },
    ];

    const steps = [
        { n: 1, label: isJa ? 'サービス選択' : 'Select Service' },
        { n: 2, label: isJa ? 'お客様情報' : 'Your Details' },
        { n: 3, label: isJa ? '確認・送信' : 'Confirm' },
    ];

    const inputClass = "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#116f76]/20 focus:border-[#116f76]/40 focus:bg-white transition-all disabled:opacity-50";

    return (
        <div className="flex flex-col w-full">
            {/* ━━━ HERO ━━━ */}
            <section className="relative pt-16 pb-14 sm:pt-20 sm:pb-20 overflow-hidden bg-[#f8faf9]">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <svg width="100%" height="100%"><defs><pattern id="asanoha" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 0L60 15L30 30L0 15Z" fill="none" stroke="currentColor" strokeWidth="0.5" /><path d="M30 30L60 45L30 60L0 45Z" fill="none" stroke="currentColor" strokeWidth="0.5" /><path d="M0 15L30 30L0 45" fill="none" stroke="currentColor" strokeWidth="0.5" /><path d="M60 15L30 30L60 45" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#asanoha)" /></svg>
                </div>

                <div className="site-container relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex justify-center mb-6">
                        <div className="section-badge"><span className="dot" />{isJa ? 'サービス予約' : 'Book a Service'}</div>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                        {isJa ? (<>サービスの<span className="text-[#116f76]">ご予約</span></>) : (<>Book Your <span className="text-[#116f76]">Service</span></>)}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-gray-500 text-lg mt-5 max-w-lg mx-auto leading-relaxed">
                        {isJa
                            ? 'ご希望のサービスを選び、簡単3ステップでご予約ください。'
                            : 'Choose your service and book in 3 simple steps.'}
                    </motion.p>

                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="w-16 h-0.5 bg-[#116f76]/30 mx-auto mt-8 origin-center" />
                </div>
            </section>

            {/* ━━━ BOOKING FORM ━━━ */}
            <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#116f76]/1.5 to-transparent pointer-events-none" />

                <div className="site-container relative z-10">
                    {/* Step Indicator */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto mb-12 sm:mb-16">
                        <div className="flex items-center justify-between">
                            {steps.map(({ n, label }, i) => (
                                <div key={n} className="flex items-center flex-1 last:flex-none">
                                    <button
                                        onClick={() => { if (n < step || (n === 2 && selectedService) || (n === 1)) setStep(n as Step); }}
                                        className={cn(
                                            "flex items-center gap-2.5 transition-all",
                                            n <= step ? "cursor-pointer" : "cursor-default"
                                        )}
                                    >
                                        <span className={cn(
                                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0",
                                            n < step ? "bg-[#116f76] text-white" :
                                            n === step ? "bg-[#116f76] text-white ring-4 ring-[#116f76]/10" :
                                            "bg-gray-100 text-gray-400"
                                        )}>
                                            {n < step ? <CheckCircle2 className="w-4 h-4" /> : n}
                                        </span>
                                        <span className={cn(
                                            "text-sm font-medium hidden sm:block",
                                            n <= step ? "text-gray-900" : "text-gray-400"
                                        )}>{label}</span>
                                    </button>
                                    {i < steps.length - 1 && (
                                        <div className="flex-1 mx-3 sm:mx-4">
                                            <div className="h-0.5 rounded-full overflow-hidden bg-gray-100">
                                                <motion.div
                                                    className="h-full bg-[#116f76]"
                                                    initial={{ width: '0%' }}
                                                    animate={{ width: n < step ? '100%' : '0%' }}
                                                    transition={{ duration: 0.4 }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Success State */}
                    {status === 'success' ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center py-16">
                            <div className="w-20 h-20 bg-[#e8f5c8] rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-[#116f76]" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                {isJa ? 'ご予約を受け付けました！' : 'Booking Received!'}
                            </h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                {isJa
                                    ? '内容を確認の上、1営業日以内にご連絡いたします。お急ぎの場合はお電話ください。'
                                    : 'We\'ll review your request and get back to you within 1 business day.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button onClick={() => { setStatus('idle'); setStep(1); }} className="inline-flex items-center justify-center gap-2 bg-[#116f76] text-white font-semibold text-sm rounded-xl px-6 py-3 hover:bg-[#0e5c62] transition-colors">
                                    {isJa ? '新しい予約をする' : 'Book Another Service'}
                                </button>
                                <Link href={servicesPath} className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl px-6 py-3 hover:bg-gray-200 transition-colors">
                                    {isJa ? 'サービス一覧を見る' : 'View Services'}
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="max-w-3xl mx-auto">
                            <AnimatePresence mode="wait">
                                {/* ── STEP 1: Service Selection ── */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                                        <div className="text-center mb-8">
                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                                {isJa ? 'ご希望のサービスを選択してください' : 'Which service are you interested in?'}
                                            </h2>
                                            <p className="text-gray-400 text-sm">{isJa ? 'サービスをクリックして次のステップへ' : 'Click a service to continue'}</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {serviceOptions.map((svc) => {
                                                const Icon = svc.icon;
                                                const isSelected = selectedService === svc.id;
                                                return (
                                                    <motion.button
                                                        key={svc.id}
                                                        whileHover={{ y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => { setSelectedService(svc.id); setStep(2); }}
                                                        className={cn(
                                                            "group relative text-left rounded-2xl p-6 border-2 transition-all duration-200",
                                                            isSelected
                                                                ? "border-[#116f76] bg-[#116f76]/3 shadow-md shadow-[#116f76]/10"
                                                                : "border-gray-100 hover:border-[#116f76]/30 bg-white hover:shadow-lg hover:shadow-gray-100"
                                                        )}
                                                    >
                                                        <div className={cn("absolute inset-0 rounded-2xl bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity", svc.color)} />
                                                        <div className="relative z-10">
                                                            <div className={cn(
                                                                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                                                                isSelected ? "bg-[#116f76] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#116f76]/10 group-hover:text-[#116f76]"
                                                            )}>
                                                                <Icon className="w-5 h-5" />
                                                            </div>
                                                            <h3 className="font-bold text-gray-900 mb-1">{svc.title}</h3>
                                                            <p className="text-sm text-gray-400">{svc.desc}</p>
                                                        </div>
                                                        {isSelected && (
                                                            <div className="absolute top-4 right-4">
                                                                <CheckCircle2 className="w-5 h-5 text-[#116f76]" />
                                                            </div>
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        {/* General inquiry option */}
                                        <button
                                            onClick={() => { setSelectedService(isJa ? 'その他のお問い合わせ' : 'General Inquiry'); setStep(2); }}
                                            className="mt-4 w-full text-center text-sm text-gray-400 hover:text-[#116f76] transition-colors py-3"
                                        >
                                            {isJa ? 'その他のお問い合わせ →' : 'Other / General inquiry →'}
                                        </button>
                                    </motion.div>
                                )}

                                {/* ── STEP 2: Details Form ── */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                                        {/* Selected service pill */}
                                        <div className="flex items-center gap-3 mb-8">
                                            <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                                <ChevronLeft className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <div className="flex items-center gap-2 bg-[#116f76]/5 text-[#116f76] font-medium text-sm px-4 py-2 rounded-full">
                                                <CheckCircle2 className="w-4 h-4" />
                                                {selectedService}
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
                                            <div className="mb-8">
                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                                    {isJa ? 'お客様情報をご入力ください' : 'Tell us about yourself'}
                                                </h2>
                                                <p className="text-gray-400 text-sm">{isJa ? '予約に必要な情報をご記入ください。' : 'Provide your details so we can schedule your service.'}</p>
                                            </div>

                                            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-5">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                            {isJa ? 'お名前' : 'Full Name'} <span className="text-red-400">*</span>
                                                        </label>
                                                        <input id="name" name="name" required placeholder={isJa ? '山田 太郎' : 'Your name'} value={formData.name} onChange={handleChange} className={inputClass} />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="company" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                            {isJa ? '会社名 / 施設名' : 'Company / Facility'}
                                                        </label>
                                                        <input id="company" name="company" placeholder={isJa ? '株式会社〇〇' : 'Company name'} value={formData.company} onChange={handleChange} className={inputClass} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                            {isJa ? 'メールアドレス' : 'Email'} <span className="text-red-400">*</span>
                                                        </label>
                                                        <input id="email" name="email" type="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                            {isJa ? '電話番号' : 'Phone'}
                                                        </label>
                                                        <input id="phone" name="phone" type="tel" placeholder={isJa ? '090-1234-5678' : 'Your phone'} value={formData.phone} onChange={handleChange} className={inputClass} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="date" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                            {isJa ? 'ご希望日' : 'Preferred Date'}
                                                        </label>
                                                        <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className={inputClass} />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="time" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                            {isJa ? 'ご希望時間帯' : 'Preferred Time'}
                                                        </label>
                                                        <input id="time" name="time" type="time" value={formData.time} onChange={handleChange} className={inputClass} />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                        {isJa ? 'ご要望・備考' : 'Additional Details'}
                                                    </label>
                                                    <textarea id="message" name="message" rows={4} placeholder={isJa ? '場所の詳細、特別なご要望など...' : 'Location details, special requests...'} value={formData.message} onChange={handleChange} className={cn(inputClass, "resize-none")} />
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <button type="button" onClick={() => setStep(1)} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                                                        {isJa ? '戻る' : 'Back'}
                                                    </button>
                                                    <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-[#116f76] text-white font-semibold text-sm rounded-xl px-6 py-3 hover:bg-[#0e5c62] transition-all hover:shadow-lg hover:shadow-[#116f76]/20">
                                                        {isJa ? '内容を確認する' : 'Review Booking'}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── STEP 3: Review & Submit ── */}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                                        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
                                            <div className="mb-8">
                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                                    {isJa ? 'ご予約内容の確認' : 'Review Your Booking'}
                                                </h2>
                                                <p className="text-gray-400 text-sm">{isJa ? '内容をご確認の上、送信してください。' : 'Confirm the details below and submit.'}</p>
                                            </div>

                                            {/* Review Summary */}
                                            <div className="space-y-4 mb-8">
                                                <div className="bg-[#116f76]/3 border border-[#116f76]/10 rounded-2xl p-5">
                                                    <p className="text-xs font-semibold text-[#116f76] uppercase tracking-wider mb-1">{isJa ? 'ご選択サービス' : 'Service'}</p>
                                                    <p className="font-bold text-gray-900">{selectedService}</p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {[
                                                        { label: isJa ? 'お名前' : 'Name', val: formData.name },
                                                        { label: isJa ? '会社名' : 'Company', val: formData.company || '—' },
                                                        { label: isJa ? 'メール' : 'Email', val: formData.email },
                                                        { label: isJa ? '電話番号' : 'Phone', val: formData.phone || '—' },
                                                        { label: isJa ? 'ご希望日' : 'Date', val: formData.date || (isJa ? '未指定' : 'Not specified') },
                                                        { label: isJa ? '時間帯' : 'Time', val: formData.time || (isJa ? '未指定' : 'Not specified') },
                                                    ].map((item) => (
                                                        <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                                                            <p className="text-sm font-medium text-gray-900">{item.val}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {formData.message && (
                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{isJa ? 'ご要望・備考' : 'Notes'}</p>
                                                        <p className="text-sm text-gray-700 whitespace-pre-line">{formData.message}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Error */}
                                            {status === 'error' && (
                                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold text-center mb-4">
                                                    {isJa ? '送信に失敗しました。後でもう一度お試しください。' : 'Failed to submit. Please try again later.'}
                                                </motion.div>
                                            )}

                                            <form onSubmit={handleSubmit}>
                                                <div className="flex gap-3">
                                                    <button type="button" onClick={() => setStep(2)} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                                                        {isJa ? '修正する' : 'Edit'}
                                                    </button>
                                                    <button type="submit" disabled={status === 'loading'} className="group flex-1 inline-flex items-center justify-center gap-2.5 bg-[#116f76] text-white font-semibold text-sm rounded-xl px-6 py-3.5 hover:bg-[#0e5c62] transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-[#116f76]/20">
                                                        <Send className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                        {status === 'loading' ? (isJa ? '送信中...' : 'Submitting...') : (isJa ? '予約を送信する' : 'Submit Booking')}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            {/* ━━━ CONTACT INFO CARDS ━━━ */}
            <section className="py-16 sm:py-20 bg-[#f8faf9] relative">
                <div className="site-container">
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            {isJa ? 'お電話・メールでもお気軽にどうぞ' : 'Prefer to reach us directly?'}
                        </h2>
                        <p className="text-gray-400 text-sm">{isJa ? '以下の方法でもご連絡いただけます。' : 'You can also contact us via the channels below.'}</p>
                    </motion.div>

                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
                        {contactCards.map(({ icon: Icon, title, value, href, sub }, i) => (
                            <motion.div key={i} variants={fadeInUp}>
                                <div className="group relative bg-white rounded-2xl p-6 sm:p-7 h-full border border-gray-100 hover:border-[#116f76]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#116f76]/5">
                                    <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-[#116f76]/20 to-transparent" />
                                    <div className="w-11 h-11 bg-[#116f76]/5 group-hover:bg-[#116f76]/10 rounded-xl flex items-center justify-center mb-5 transition-colors">
                                        <Icon className="w-5 h-5 text-[#116f76]" />
                                    </div>
                                    <p className="text-xs font-semibold text-[#116f76] uppercase tracking-widest mb-2">{title}</p>
                                    {href ? (
                                        <a href={href} className="text-gray-900 font-medium text-sm hover:text-[#116f76] transition-colors break-all leading-relaxed">{value}</a>
                                    ) : (
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{value}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-3">{sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
