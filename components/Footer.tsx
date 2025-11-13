'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FooterProps {
    className?: string;
    containerClassName?: string;
}

export function Footer({ className, containerClassName }: FooterProps) {
    const { t, language } = useLanguage();

    return (
        <footer className={cn("bg-linear-to-b from-gray-900 to-gray-800 text-white w-full", className)}>
            <div className={cn("site-container px-4 sm:px-6 py-8 sm:py-10 pb-4 sm:pb-5", containerClassName)}>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 text-center md:text-left md:ml-40">

                    {/* Logo & Social */}
                    <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start lg:justify-start space-y-4">
                        <div className="flex items-center justify-center md:justify-start mb-2">
                            <Image
                                src="/logo.png"
                                alt="D.BRIGHT Logo"
                                width={168}
                                height={48}
                                className="rounded-xl"
                            />
                        </div>

                        <p className="text-gray-400 leading-relaxed text-xs sm:text-sm max-w-xs mx-auto md:mx-0">
                            {language === 'ja'
                                ? '清掃、人材派遣、留学サポート、不動産など、幅広いサービスを提供し、日本と世界をつなぎます。'
                                : 'Providing diverse services including cleaning, staffing, study abroad support, and real estate—connecting Japan and the world.'}
                        </p>

                        {/* Akaru Cleaning */}
                        <div className="mt-4 pt-4 border-t border-gray-700 w-full">
                            <Link
                                href="https://akarucleaning.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center md:justify-start gap-3 hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/akaru_logo.png"
                                    alt="Akaru Cleaning"
                                    width={40}
                                    height={40}
                                    className="rounded-lg"
                                />
                                <div className="text-left">
                                    <p className="text-white font-semibold text-sm">
                                        {language === 'ja' ? 'AKARU クリーニング' : 'Akaru Cleaning'}
                                    </p>
                                    <p className="text-gray-400 text-xs">akarucleaning.com</p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 sm:p-2.5 bg-white/10 hover:bg-blue-500 rounded-full transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 sm:p-2.5 bg-white/10 hover:bg-pink-500 rounded-full transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 sm:p-2.5 bg-white/10 hover:bg-sky-500 rounded-full transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg">
                            {language === 'ja' ? 'クイックリンク' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-3 sm:space-y-4 text-gray-300 flex flex-col items-center md:items-start">
                            {[
                                { href: '/', label: t.nav.home },
                                { href: '/services', label: t.nav.services },
                                { href: '/company-profile', label: t.nav.companyProfile },
                                { href: '/contact', label: t.nav.contact },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-blue-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start gap-4 sm:gap-5">
                        <h3 className="font-bold text-white text-base sm:text-lg text-center md:text-left w-full">
                            {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
                        </h3>

                        {/* Address */}
                        <div className="flex items-start gap-3 sm:gap-4 w-full max-w-md mx-auto md:mx-0">
                            <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg shrink-0">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                            </div>
                            <div className="text-left md:text-left">
                                <p className="font-medium text-white mb-1 text-sm sm:text-base">
                                    {language === 'ja' ? '所在地' : 'Address'}
                                </p>
                                <p className="text-xs sm:text-sm leading-relaxed text-gray-300">
                                    〒272-0034 千葉県市川市市川4-18-22<br />
                                    ハイホームタナカ201号室
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3 sm:gap-4 w-full max-w-md mx-auto md:mx-0">
                            <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg shrink-0">
                                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                            </div>
                            <div className="text-left md:text-left">
                                <p className="font-medium text-white mb-1 text-sm sm:text-base">
                                    {language === 'ja' ? '電話番号' : 'Phone'}
                                </p>
                                <a href="tel:047-711-2099" className="text-xs sm:text-sm hover:text-blue-400 transition-colors text-gray-300 block">
                                    047-711-2099
                                </a>
                                <p className="text-xs text-gray-400 mt-1">
                                    {language === 'ja' ? '営業時間: 月〜金 / 10:00 - 19:00' : 'Business Hours: Mon - Fri / 10AM - 7PM'}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-3 sm:gap-4 w-full max-w-md mx-auto md:mx-0">
                            <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg shrink-0">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                            </div>
                            <div className="text-left md:text-left">
                                <p className="font-medium text-white mb-1 text-sm sm:text-base">
                                    {language === 'ja' ? 'メールアドレス' : 'Email'}
                                </p>
                                <a href="mailto:info@dbrightservices.com" className="text-xs sm:text-sm hover:text-blue-400 transition-colors text-gray-300 break-all">
                                    info@dbrightservices.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-6 sm:my-8 border-t border-gray-700" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        {language === 'ja'
                            ? '© 2025 株式会社D.BRIGHT. All rights reserved.'
                            : '© 2025 株式会社D.BRIGHT. All rights reserved.'}
                    </p>
                    {/* <div className="flex items-center gap-6 text-sm text-gray-400">
                        <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                            {language === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
                        </Link>
                        <Link href="/terms" className="hover:text-blue-400 transition-colors">
                            {language === 'ja' ? '利用規約' : 'Terms of Service'}
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
