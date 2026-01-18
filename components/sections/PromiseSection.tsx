'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Zap, Calendar, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PromiseSection() {
  const t = useTranslations('promise');

  const benefits = [
    { icon: MessageCircle, key: 0 },
    { icon: Zap, key: 1 },
    { icon: Calendar, key: 2 },
    { icon: Shield, key: 3 },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-primary rounded-lg">
                    <benefit.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t(`benefits.${benefit.key}.title`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`benefits.${benefit.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
