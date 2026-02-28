'use client';

import { useLanguage } from '@/lib/translations/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

const content = {
  en: {
    badge: "Chairman's Message",
    name: 'Keshav Ojha',
    role: 'Chairman, 株式会社D.Bright',
    message: [
      'When I founded 株式会社D.Bright, I had a simple but powerful vision: to deliver cleaning and facility services that people could truly rely on — services built on honesty, discipline, and an unwavering commitment to quality.',
      'Over the years, we have grown from a small team into a trusted partner for homes, offices, and businesses across Japan. That growth has been possible only because of the trust our customers place in us, and the dedication of every single member of our team.',
      'We do not just clean spaces — we create environments where people feel comfortable, safe, and proud. That is the standard I hold for every project we undertake, and it is the promise we make to every client we serve.',
      'Thank you for trusting 株式会社D.Bright. We will continue to earn that trust, every day.',
    ],
  },
  ja: {
    badge: '会長からのメッセージ',
    name: 'オジャ・ケシャブ',
    role: '代表取締役会長、株式会社D.Bright',
    message: [
      '株式会社D.Brightを設立した時、私にはシンプルでありながら力強いビジョンがありました。それは、誠実さ・規律・品質への揺るぎないこだわりを基盤とした、本当に信頼できる清掃・施設サービスを提供することです。',
      '長年にわたり、私たちは小さなチームから、日本全国のご家庭・オフィス・企業に信頼されるパートナーへと成長しました。その成長は、お客様からの信頼と、チームの一人ひとりの献身なくしては実現できませんでした。',
      '私たちは単に空間を清掃するだけでなく、人々が快適で安心して誇りを感じられる環境を創り出しています。それが、すべての案件に対して私が持つ基準であり、すべてのお客様に対してお約束することです。',
      '株式会社D.Brightをご信頼いただきありがとうございます。これからも毎日その信頼に応え続けてまいります。',
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.12 } }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function ChairmanMessage() {
  const { language } = useLanguage();
  const t = language === 'ja' ? content.ja : content.en;

  return (
    <section className="relative py-24 sm:py-32 md:py-40 bg-white overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/3 w-96 h-96 bg-emerald-100/60 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-teal-100/50 rounded-full blur-[150px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t.badge}
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-xl"
        >
          {/* Inner glow on card */}
          <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-transparent to-teal-50/50 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
            {/* Photo */}
            <div className="lg:col-span-2 relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-auto lg:min-h-0">
              <Image
                src="/about-us/chairman.png"
                alt={t.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              {/* Dark gradient fade into card */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent lg:hidden" />
              <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-transparent to-white/10" />
              {/* Name overlay on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                <p className="text-white font-bold text-lg">{t.name}</p>
                <p className="text-emerald-400 text-sm mt-0.5">{t.role}</p>
              </div>
            </div>

            {/* Message */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-3 p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-center"
            >
              {/* Giant decorative quote mark */}
              <motion.div variants={fadeUp} className="mb-6">
                <svg className="w-14 h-14 text-emerald-300" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </motion.div>

              {/* Paragraphs */}
              <div className="space-y-4 mb-10">
                {t.message.map((para, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i} className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Signature row */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-8 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-200">
                  <Image src="/about-us/chairman.png" alt={t.name} fill className="object-cover object-top" sizes="48px" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-emerald-600 mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
