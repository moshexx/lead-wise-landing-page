'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle, Clock, UserX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProblemSection() {
  const t = useTranslations('problem');

  const painPoints = [
    { icon: Clock, text: t('painPoints.0') },
    { icon: AlertCircle, text: t('painPoints.1') },
    { icon: UserX, text: t('painPoints.2') },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
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
            {t('title')}
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

          {/* Pain Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center"
              >
                <point.icon className="w-10 h-10 md:w-12 md:h-12 text-red-600 mx-auto mb-4" />
                <p className="text-gray-800 font-medium">{point.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Impact Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-primary text-white rounded-2xl p-8 text-center"
          >
            <p className="text-xl md:text-2xl font-bold">{t('impact')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
