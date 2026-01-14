'use client';

import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RiskReversalSection() {
  const t = useTranslations('riskReversal');

  const points = [0, 1];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8"
          >
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t('title')}
              </h2>
            </div>

            {/* Points */}
            <div className="space-y-4">
              {points.map((key) => (
                <p key={key} className="text-lg text-gray-700 leading-relaxed">
                  {t(`points.${key}`)}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
