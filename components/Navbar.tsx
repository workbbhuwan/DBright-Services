'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, ChevronsRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Navbar() {
    const { t, language } = useLanguage();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navItems = [
        { href: '/', label: t.nav.home },
        { href: '/services', label: t.nav.services },
        { href: '/company-profile', label: t.nav.companyProfile },
        { href: '/contact', label: t.nav.contact },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            <nav
                className={cn(
                    'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-300',
                    scrolled ? 'shadow-sm border-b border-gray-100' : 'border-b border-transparent'
                )}
            >
                <div className="site-container">
                    <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                        {/* Logo */}
                        <Link href="/" aria-label="D.BRIGHT Home" className="flex items-center shrink-0">
                            <Image
                                src="/logo.png"
                                alt="D.BRIGHT Logo"
                                width={130}
                                height={40}
                                className="transition-transform duration-300 hover:scale-105 w-28 h-auto sm:w-32"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav - pill container */}
                        <div className="hidden md:flex items-center gap-0 border border-gray-200 rounded-full px-2 py-1.5 bg-white shadow-sm">
                            {navItems.map((item, index) => (
                                <div key={item.href} className="flex items-center">
                                    {index > 0 && (
                                        <Sparkles className="w-3 h-3 text-gray-300 mx-1 shrink-0" />
                                    )}
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                                            isActive(item.href)
                                                ? 'text-[#135b3e] bg-[#f0fdf4]'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <LanguageSwitcher />
                            <div className="rounded-full border-2 border-[#b8e6d0] p-0.5">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#135b3e] text-white text-sm font-semibold hover:bg-[#1a7a54] transition-all duration-300 hover:shadow-md"
                                >
                                    {language === 'ja' ? 'お問い合わせ' : 'Book Now'}
                                    <ChevronsRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-2xl z-50 md:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100">
                                <Image src="/logo.png" alt="Logo" width={100} height={28} />
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                'block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200',
                                                isActive(item.href)
                                                    ? 'bg-[#f0fdf4] text-[#135b3e]'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="border-t border-gray-100 p-5 space-y-4">
                                <LanguageSwitcher />
                                <div className="rounded-full border-2 border-[#b8e6d0] p-0.5">
                                    <Link
                                        href="/contact"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#135b3e] text-white font-semibold hover:bg-[#1a7a54] transition-colors"
                                    >
                                        {language === 'ja' ? 'お問い合わせ' : 'Book Now'}
                                        <ChevronsRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}