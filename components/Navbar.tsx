'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/translations/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NavbarProps {
    className?: string;
    containerClassName?: string;
}

export function Navbar({ className, containerClassName }: NavbarProps) {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add shadow when scrolling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent background scroll when mobile menu open
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
                    'sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b transition-all duration-300',
                    scrolled ? 'border-gray-200 shadow-lg' : 'border-transparent shadow-sm',
                    className
                )}
            >
                <div
                    className={cn(
                        'max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-10',
                        containerClassName
                    )}
                >
                    <div className="sticky top-0 flex items-center justify-between h-14 sm:h-16 lg:h-16">
                        {/* === Logo === */}
                        <Link href="/" aria-label="Dbright Services Home" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Dbright Services Logo"
                                width={130}
                                height={40}
                                className="transition-transform duration-300 hover:scale-105 w-[110px] h-auto sm:w-[130px]"
                                priority
                            />
                        </Link>

                        {/* === Desktop Nav === */}
                        <div className="hidden md:flex flex-1 justify-center">
                            <ul className="flex items-center gap-6 lg:gap-8 xl:gap-14">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'relative px-2 lg:px-3 py-2 text-sm lg:text-[15px] font-semibold transition-all duration-200',
                                                isActive(item.href)
                                                    ? 'text-blue-600' // Active text = blue
                                                    : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50/60 rounded-md'
                                            )}
                                        >
                                            <span className="relative z-10">{item.label}</span>
                                            {isActive(item.href) && (
                                                <motion.div
                                                    layoutId="navbar-active"
                                                    className="absolute inset-0 bg-blue-50 rounded-md border border-blue-100"
                                                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* === Language Switcher (Right) === */}
                        <div className="hidden md:flex items-center">
                            <LanguageSwitcher />
                        </div>

                        {/* === Mobile Menu Button === */}
                        <button
                            className={cn(
                                'md:hidden p-2 rounded-md transition-colors duration-200 ml-auto',
                                mobileMenuOpen
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            )}
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
                                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* === Mobile Drawer === */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.35 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 border-b border-gray-200">
                                <Image src="/logo.png" alt="Logo" width={100} height={28} className="sm:w-[120px] sm:h-[30px]" />
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-md hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-3 sm:space-y-4">
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
                                                'block px-4 sm:px-5 py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200',
                                                isActive(item.href)
                                                    ? 'bg-blue-600 text-white shadow-md' // Active: blue bg + white text
                                                    : 'text-gray-800 hover:bg-gray-100'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="border-t border-gray-200 p-4 sm:p-6">
                                <LanguageSwitcher />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}