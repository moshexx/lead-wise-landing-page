'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle, Clock, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import BookDemoButton from '@/components/ui/BookDemoButton';

export default function ProblemSection() {
  const t = useTranslations('problem');

  const painPoints = [
    { icon: Clock, titleKey: 'painPoints.0.title', descKey: 'painPoints.0.description' },
    { icon: AlertCircle, titleKey: 'painPoints.1.title', descKey: 'painPoints.1.description' },
    { icon: UserX, titleKey: 'painPoints.2.title', descKey: 'painPoints.2.description' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8"
          >
            {t('title').split('\n').map((line, index) => (
              <span key={index} className={index === 1 ? 'block text-4xl md:text-5xl lg:text-6xl mt-2' : 'block'}>
                {line}
              </span>
            ))}
          </motion.h2>

          {/* Story */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 text-center mb-12 leading-relaxed"
          >
            {t('story')}
          </motion.p>

          {/* Pain Points - Stacked cards with white background */}
          <div className="space-y-4 mb-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col items-center text-center">
                  <point.icon className="w-10 h-10 text-red-500 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t(point.titleKey)}</h3>
                  <p className="text-gray-600">{t(point.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Familiar Question */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8"
          >
            {t('familiar')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <BookDemoButton variant="hero" className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
