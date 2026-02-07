'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';

export default function Blog() {
    const { language } = useLanguage();

    const sectionTitle = language === 'ja'
        ? '役立つヒントとインサイト'
        : 'Helpful Tips and Insights';

    const posts = language === 'ja'
        ? [
            {
                category: '清掃ガイド',
                date: '2024年10月9日',
                readTime: '4分',
                title: 'ホテル清掃を効率化する10のプロの技術',
                author: '山田 太郎',
                image: '/hotel.png',
                href: '/services',
            },
            {
                category: '人材派遣',
                date: '2024年10月8日',
                readTime: '5分',
                title: '外国人人材の採用で事業を成長させる方法',
                author: '佐藤 花子',
                image: '/staffing.png',
                href: '/services',
            },
            {
                category: '留学情報',
                date: '2024年10月7日',
                readTime: '6分',
                title: '日本留学を成功させるための完全ガイド',
                author: '田中 健一',
                image: '/study.png',
                href: '/services',
            },
        ]
        : [
            {
                category: 'Cleaning Guide',
                date: 'October 9, 2023',
                readTime: '4 min',
                title: '10 Professional Tips for Hotel Cleaning Efficiency',
                author: 'John Carter',
                image: '/hotel.png',
                href: '/services',
            },
            {
                category: 'Staffing',
                date: 'October 8, 2023',
                readTime: '5 min',
                title: 'How to Grow Your Business With International Talent',
                author: 'Lucas Hall',
                image: '/staffing.png',
                href: '/services',
            },
            {
                category: 'Study Abroad',
                date: 'October 7, 2023',
                readTime: '6 min',
                title: 'Complete Guide to Studying Abroad in Japan',
                author: 'Mia Lawson',
                image: '/study.png',
                href: '/services',
            },
        ];

    return (
        <section className="relative py-16 sm:py-20 md:py-28 bg-white w-full">
            <div className="site-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        {sectionTitle}
                    </h2>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    {posts.map((post, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Link href={post.href} className="group block">
                                <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white card-hover">
                                    {/* Image */}
                                    <div className="relative aspect-16/10 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6">
                                        {/* Meta */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 rounded-full bg-[#f0fdf4] text-[#135b3e] text-xs font-semibold">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-400">{post.date}</span>
                                            <span className="text-xs text-gray-400">{post.readTime}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#135b3e] transition-colors leading-snug mb-4">
                                            {post.title}
                                        </h3>

                                        {/* Author + Arrow */}
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-500">
                                                {language === 'ja' ? '著者' : 'Author'} - {post.author}
                                            </p>
                                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#135b3e] group-hover:border-[#135b3e] transition-all duration-300">
                                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
