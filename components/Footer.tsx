'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
    const { t, language } = useLanguage();

    const quickLinks = [
        { href: '/', label: t.nav.home },
        { href: '/services', label: t.nav.services },
        { href: '/company-profile', label: t.nav.companyProfile },
        { href: '/contact', label: t.nav.contact },
    ];

    return (
        <footer className="bg-[#116f76] text-white w-full">
        

            {/* Main Footer Content */}
            <div className="site-container py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Image
                            src="/logo.png"
                            alt="D.BRIGHT Logo"
                            width={140}
                            height={40}
                            className="rounded-xl mb-4"
                        />
                        <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs">
                            {language === 'ja'
                                ? '経験、信頼性、一貫した品質、そしてお客様第一のサービスをお届けする信頼のチームです。'
                                : 'We are a trusted team delivering spotless results through experience, consistency, and customer-focused service every time.'}
                        </p>

                        {/* Akaru Cleaning Partner */}
                        <div className="pt-4 border-t border-white/10">
                            <Link
                                href="https://akarucleaning.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/akaru_logo.png"
                                    alt="Akaru Cleaning"
                                    width={36}
                                    height={36}
                                    className="rounded-lg"
                                />
                                <div>
                                    <p className="text-white font-semibold text-sm">
                                        {language === 'ja' ? 'AKARU クリーニング' : 'Akaru Cleaning'}
                                    </p>
                                    <p className="text-white/60 text-xs">akarucleaning.com</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                            {language === 'ja' ? 'クイックリンク' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/80 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-5 group-hover:ml-0" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-2">
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                            {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                                <p className="text-white/80 text-sm leading-relaxed">
                                    〒272-0034 千葉県市川市市川4-18-22<br />
                                    ハイホームタナカ201号室
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#22c55e] shrink-0" />
                                <a href="tel:047-711-2099" className="text-white/80 text-sm hover:text-white transition-colors">
                                    047-711-2099
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#22c55e] shrink-0" />
                                <a href="mailto:info@dbrightservices.com" className="text-white/80 text-sm hover:text-white transition-colors">
                                    info@dbrightservices.com
                                </a>
                            </div>
                            <p className="text-xs text-white/60 pl-7">
                                {language === 'ja' ? '営業時間: 月〜金 / 10:00 - 19:00' : 'Business Hours: Mon - Fri / 10AM - 7PM'}
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            {[
                                { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
                                { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
                                { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
                            ].map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#135b3e] flex items-center justify-center transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="site-container py-5 flex flex-col sm:flex-row items-center justify-center text-center">
                    <p className="text-white/70 text-xs sm:text-sm">
                        © {new Date().getFullYear()} {language === 'ja' ? '株式会社D.BRIGHT. All rights reserved.' : 'D.BRIGHT Co., Ltd. All rights reserved.'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
