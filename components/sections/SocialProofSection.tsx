'use client';

import { useTranslations } from 'next-intl';
import { Quote, TrendingUp, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialProofSection() {
  const t = useTranslations('socialProof');

  const testimonialKeys = [0, 1, 2];

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

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonialKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-accent-purple mb-4" />

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed italic flex-grow">
                  &ldquo;{t(`testimonials.${key}.quote`)}&rdquo;
                </p>

                {/* Metrics */}
                <div className="space-y-3 mb-4">
                  {/* Result Badge */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-green-800">
                      {t(`testimonials.${key}.result`)}
                    </p>
                  </div>

                  {/* Metric Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                    <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-blue-800">
                      {t(`testimonials.${key}.metric`)}
                    </p>
                  </div>

                  {/* Timeframe */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-start gap-2">
                    <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-purple-800">
                      {t(`testimonials.${key}.timeframe`)}
                    </p>
                  </div>
                </div>

                {/* Author */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-900">
                    {t(`testimonials.${key}.name`)}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {t(`testimonials.${key}.title`)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t(`testimonials.${key}.business`)}
                  </p>
                </div>

                {/* Optional: Add placeholder for customer photo */}
                {/*
                <div className="absolute top-6 end-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {t(`testimonials.${key}.name`).charAt(0)}
                </div>
                */}
              </motion.div>
            ))}
          </div>

          {/* Note about placeholder testimonials */}
          {/* You can add customer photos here when available */}
        </div>
      </div>
    </section>
  );
}
