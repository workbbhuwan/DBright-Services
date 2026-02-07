'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SectionDividerProps {
    label: string;
    linkText?: string;
    linkHref?: string;
}

export default function SectionDivider({ label, linkText, linkHref }: SectionDividerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="site-container flex items-center justify-between py-6 sm:py-8"
        >
            <div className="section-badge">
                <span className="dot" />
                {label}
            </div>
            {linkText && linkHref && (
                <Link
                    href={linkHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#135b3e] hover:text-[#1a7a54] transition-colors group"
                >
                    {linkText}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            )}
        </motion.div>
    );
}
