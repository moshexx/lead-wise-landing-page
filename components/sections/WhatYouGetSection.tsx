'use client';

import { useTranslations } from 'next-intl';
import { Target, FileText, Link2, LayoutDashboard, GraduationCap, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatYouGetSection() {
  const t = useTranslations('whatYouGet');

  const items = [
    { icon: Target, key: 0 },
    { icon: FileText, key: 1 },
    { icon: Link2, key: 2 },
    { icon: LayoutDashboard, key: 3 },
    { icon: GraduationCap, key: 4 },
    { icon: Bell, key: 5 },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </motion.div>

          {/* Items Grid - Centered */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {items.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all w-full text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`items.${item.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
