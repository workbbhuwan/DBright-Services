'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ChevronsRight, Building2, User, Briefcase, MapPin, Phone, Mail, Landmark, Shield, Sparkles, Award, Zap, ArrowDown, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalePath } from '@/lib/navigation';
import ChairmanMessage from '@/components/home/ChairmanMessage';
import { useRef, useState, useEffect, useCallback } from 'react';

/* ── Animated counter ── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1800;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);
    return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

/* ── 3-D tilt card ── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 14;
        const y = ((e.clientY - top) / height - 0.5) * -14;
        setTilt({ x, y });
    }, []);
    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
            style={{
                transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovered ? 1.025 : 1})`,
                transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
            className={className}
        >
            {children}
        </div>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.1 } }),
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export default function CompanyProfilePage() {
    const { t, language } = useLanguage();
    const contactPath = useLocalePath('/contact');
    const servicesPath = useLocalePath('/services');

    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const smoothY = useSpring(heroY, { stiffness: 80, damping: 20 });

    const values = [
        { icon: Zap,      title: language === 'ja' ? '品質へのこだわり' : 'Commitment to Quality',   desc: t.companyProfile.values.quality.description,        gradient: 'from-emerald-400 to-teal-500' },
        { icon: Shield,   title: language === 'ja' ? '信頼の構築' : 'Building Trust',               desc: t.companyProfile.values.trust.description,           gradient: 'from-sky-400 to-blue-500' },
        { icon: Sparkles, title: language === 'ja' ? '清潔の追求' : 'Pursuit of Cleanliness',        desc: t.companyProfile.values.cleanliness.description,     gradient: 'from-violet-400 to-purple-500' },
        { icon: Award,    title: language === 'ja' ? 'プロフェッショナリズム' : 'Professionalism',    desc: t.companyProfile.values.professionalism.description, gradient: 'from-amber-400 to-orange-500' },
    ];

    const stats = [
        { value: 500, suffix: '+', label: language === 'ja' ? 'プロジェクト実績' : 'Projects Done' },
        { value: 98,  suffix: '%', label: language === 'ja' ? '顧客満足度' : 'Satisfaction Rate' },
        { value: 10,  suffix: '+', label: language === 'ja' ? '年の経験' : 'Years Experience' },
        { value: 3,   suffix: '',  label: language === 'ja' ? '主要拠点' : 'Core Locations' },
    ];

    const companyInfo = [
        { icon: Building2, label: language === 'ja' ? '会社名' : 'Company Name',              value: '株式会社D.Bright' },
        { icon: User,      label: language === 'ja' ? '代表取締役' : 'Representative Director', value: language === 'ja' ? 'オザ・ケサブ・ラズ' : 'OJHA KESHAV RAJ' },
        { icon: Landmark,  label: language === 'ja' ? '資本金' : 'Capital',                    value: language === 'ja' ? '500万円' : '¥5,000,000' },
        { icon: Landmark,  label: language === 'ja' ? '取引先銀行' : 'Bank',                   value: language === 'ja' ? '千葉銀行、京葉銀行' : 'Chiba Bank, Keiyo Bank' },
    ];

    const businessItems = language === 'ja'
        ? ['清掃業', '労働者派遣業', '寮、ホテル、その他宿泊施設の経営・コンサルティング', '通訳・翻訳サービス']
        : ['Cleaning services', 'Worker dispatch services', 'Dormitory, hotel & accommodation management / consulting', 'Interpretation & translation services'];

    const majorClients = language === 'ja'
        ? ['株式会社ハウゼスタッフ', '株式会社ベストクリエイト', '株式会社ユニバーサル企業']
        : ['Hauze Staff Corporation', 'Best Create Corporation', 'Universal Corporation'];

    const marqueeItems = language === 'ja'
        ? ['プロ清掃', '人材派遣', 'ハラール事業', '通訳・翻訳', '施設管理', '品質保証']
        : ['Pro Cleaning', 'Worker Dispatch', 'Halal Business', 'Interpretation', 'Facility Management', 'Quality Assured'];

    return (
        <div className="flex flex-col w-full bg-white overflow-hidden">

            {/* ══════════════════════════════════════════
                HERO — dark, immersive, parallax
            ══════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Parallax backdrop */}
                <motion.div style={{ y: smoothY }} className="absolute inset-0 z-0">
                    <Image src="/about-us/1.png" alt="D.Bright Facilities" fill priority className="object-cover object-center" sizes="100vw" />
                    <div className="absolute inset-0 bg-linear-to-b from-[#060a0f]/70 via-[#060a0f]/50 to-[#060a0f]" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#060a0f]/60 via-transparent to-[#060a0f]/60" />
                </motion.div>

                {/* Noise grain */}
                <div className="absolute inset-0 z-1 opacity-[0.035] pointer-events-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '128px 128px' }} />

                {/* Glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-150 h-150 bg-[#135b3e]/20 rounded-full blur-[120px] pointer-events-none z-1" />
                <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-teal-900/20 rounded-full blur-[100px] pointer-events-none z-1" />

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex flex-col items-center text-center px-4 pt-28 pb-20">
                    {/* Pulse badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-white/80"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        {language === 'ja' ? '会社概要' : 'Company Profile'}
                    </motion.div>

                    {/* Hero headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight max-w-5xl"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                        {language === 'ja' ? (
                            <>信頼と誠実さで<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-teal-300 to-emerald-400">輝く空間を</span></>
                        ) : (
                            <>Built on Trust.<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-teal-300 to-emerald-400">Driven by Excellence.</span></>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                        className="mt-7 max-w-2xl text-base sm:text-lg text-white/55 leading-relaxed"
                    >
                        {language === 'ja'
                            ? '株式会社D.Brightは千葉県市川市を拠点に、プロ清掃・人材派遣・ハラール事業支援を提供する総合サービス企業です。'
                            : 'D.Bright is a full-service company based in Ichikawa, Chiba — delivering professional cleaning, worker dispatch, and halal business support across Japan.'}
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
                        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm"
                    >
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col items-center justify-center py-6 px-6 bg-white/4 hover:bg-white/8 transition-colors duration-300">
                                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                                </span>
                                <span className="mt-1.5 text-xs font-medium text-white/45 text-center">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll cue */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="mt-16 flex flex-col items-center gap-2 text-white/30"
                    >
                        <span className="text-xs tracking-widest uppercase">{language === 'ja' ? 'スクロール' : 'Scroll'}</span>
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════
                MARQUEE — trust tags
            ══════════════════════════════════════════ */}
            <div className="relative bg-[#f0fdf4] border-y border-emerald-100 py-4 overflow-hidden">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="flex items-center gap-8 whitespace-nowrap"
                >
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-400 uppercase tracking-widest">
                            <Star className="w-3 h-3 text-emerald-500 shrink-0" />
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════
                CHAIRMAN'S MESSAGE
            ══════════════════════════════════════════ */}
            <div className="bg-white">
                <ChairmanMessage />
            </div>

            {/* ══════════════════════════════════════════
                ABOUT / MISSION
            ══════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 md:py-40 bg-white">
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.04] pointer-events-none" />
                <div className="site-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden aspect-4/3 ring-1 ring-gray-200 shadow-xl">
                                <Image src="/about-us/2.png" alt="D.Bright Mission" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                                <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent" />
                            </div>
                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="absolute -bottom-6 -right-4 sm:right-8 bg-[#0f1f1a] border border-emerald-500/20 rounded-2xl p-4 shadow-2xl backdrop-blur-sm"
                            >
                                <p className="text-xs text-emerald-400 font-semibold mb-1">{language === 'ja' ? '顧客満足度' : 'Satisfaction Rate'}</p>
                                <p className="text-3xl font-black text-white">98%</p>
                            </motion.div>
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {language === 'ja' ? '私たちのミッション' : 'Our Mission'}
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                                {language === 'ja' ? (
                                    <>清潔で快適な空間を<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">すべての方に</span></>
                                ) : (
                                    <>Clean & Comfortable<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Spaces for Everyone</span></>
                                )}
                            </motion.h2>

                            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-5 text-base">
                                {t.companyProfile.description}
                            </motion.p>
                            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed text-base">
                                {t.companyProfile.mission.description}
                            </motion.p>

                            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                                <Link href={servicesPath} className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm rounded-full pl-6 pr-2 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)]">
                                    {language === 'ja' ? 'サービスを見る' : 'View Our Services'}
                                    <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full"><ChevronsRight className="w-4 h-4" /></span>
                                </Link>
                                <Link href={contactPath} className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300">
                                    {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                VALUES — 3-D tilt cards
            ══════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 md:py-40 bg-[#f8fafc] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 bg-emerald-100/60 rounded-full blur-[150px] pointer-events-none" />
                <div className="site-container relative z-10">
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="text-center mb-16 sm:mb-20">
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {language === 'ja' ? '私たちの価値観' : 'Core Values'}
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                            {language === 'ja' ? (
                                <>事業を支える<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">4つの柱</span></>
                            ) : (
                                <>The Four Pillars That<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Drive Our Business</span></>
                            )}
                        </motion.h2>
                    </motion.div>

                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div key={i} variants={fadeUp} custom={i}>
                                    <TiltCard className="h-full">
                                        <div className="relative h-full rounded-2xl border border-gray-200 bg-white shadow-sm p-7 overflow-hidden group cursor-default hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-linear-to-br ${v.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
                                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${v.gradient} mb-6 shadow-lg`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">{v.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                COMPANY INFORMATION
            ══════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-32 md:py-40 bg-[#f8fafc]">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
                <div className="site-container relative z-10">
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="text-center mb-16 sm:mb-20">
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {language === 'ja' ? '会社情報' : 'Company Details'}
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                            {language === 'ja' ? (
                                <>会社についての<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">基本情報</span></>
                            ) : (
                                <>Essential Information<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">About Our Company</span></>
                            )}
                        </motion.h2>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-4">
                        {/* 4-col info grid */}
                        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {companyInfo.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={index} variants={fadeUp} custom={index}>
                                        <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 hover:bg-gray-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors duration-300">
                                                <Icon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider mb-1">{item.label}</p>
                                                <p className="text-base font-bold text-gray-900">{item.value}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Business + Clients */}
                        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {[
                                { icon: Briefcase, label: language === 'ja' ? '主な事業内容' : 'Main Business', items: businessItems },
                                { icon: Building2,  label: language === 'ja' ? '主要取引先'   : 'Major Clients',  items: majorClients  },
                            ].map((group, gi) => {
                                const Icon = group.icon;
                                return (
                                    <motion.div key={gi} variants={fadeUp} custom={gi}>
                                        <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:bg-gray-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 h-full group">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                                                    <Icon className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">{group.label}</p>
                                            </div>
                                            <ul className="space-y-3">
                                                {group.items.map((item, ii) => (
                                                    <li key={ii} className="flex items-start gap-3">
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Address / Phone / Email */}
                        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                {
                                    icon: MapPin,
                                    label: language === 'ja' ? '所在地' : 'Address',
                                    content: (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            〒272-0035<br />
                                            {language === 'ja' ? '千葉県市川市新田4-18-22' : 'Shinden 4-18-22, Ichikawa, Chiba'}<br />
                                            {language === 'ja' ? 'ハイホーム田中201号室' : 'High Home Tanaka, Room 201'}
                                        </p>
                                    ),
                                },
                                {
                                    icon: Phone,
                                    label: language === 'ja' ? '連絡先' : 'Contact',
                                    content: (
                                        <div className="space-y-2 text-sm">
                                            <p className="text-gray-600"><span className="font-semibold text-gray-400">TEL</span>&nbsp; 047-711-2099</p>
                                            <p className="text-gray-600"><span className="font-semibold text-gray-400">FAX</span>&nbsp; 047-711-2066</p>
                                        </div>
                                    ),
                                },
                                {
                                    icon: Mail,
                                    label: language === 'ja' ? 'メール' : 'Email',
                                    content: (
                                        <a href="mailto:info@dbrightservices.com" className="text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium break-all">
                                            info@dbrightservices.com
                                        </a>
                                    ),
                                },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={i} variants={fadeUp} custom={i}>
                                        <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:bg-gray-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 h-full group">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                                                    <Icon className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">{item.label}</p>
                                            </div>
                                            {item.content}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                CTA BANNER
            ══════════════════════════════════════════ */}
            <section className="pb-24 sm:pb-32 md:pb-40 bg-[#f8fafc]">
                <div className="site-container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0">
                            <Image src="/about-us/1.png" alt="CTA background" fill className="object-cover object-center" sizes="100vw" />
                            <div className="absolute inset-0 bg-[#0a1f16]/88" />
                            <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                        </div>
                        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-500/20 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-10 sm:p-14 lg:p-16">
                            <div className="text-center lg:text-left">
                                <p className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
                                    <span className="w-6 h-px bg-emerald-400" />
                                    {language === 'ja' ? '今すぐ始めましょう' : "Let's get started"}
                                </p>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight whitespace-pre-line" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                                    {language === 'ja' ? 'お気軽に\nお問い合わせください' : 'Ready to Transform\nYour Space?'}
                                </h2>
                                <p className="mt-4 text-white/50 text-base max-w-md">
                                    {language === 'ja'
                                        ? 'ご質問やご相談があれば、いつでもお気軽にご連絡ください。'
                                        : "Have questions or need a quote? We'd love to hear from you."}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <Link href={contactPath} className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-base rounded-full pl-7 pr-2 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)]">
                                    {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                                    <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full"><ChevronsRight className="w-5 h-5" /></span>
                                </Link>
                                <Link href={servicesPath} className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 hover:bg-white/15 text-white font-semibold text-base pl-7 pr-2 py-2 transition-all duration-300">
                                    {language === 'ja' ? 'サービス一覧' : 'Our Services'}
                                    <span className="flex items-center justify-center w-10 h-10 bg-white/15 rounded-full"><ChevronsRight className="w-5 h-5" /></span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
