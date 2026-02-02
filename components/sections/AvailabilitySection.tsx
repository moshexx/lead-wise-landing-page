'use client';

import { useTranslations, useLocale } from 'next-intl';
import BookDemoButton from '@/components/ui/BookDemoButton';
import { motion } from 'framer-motion';
import { URGENCY, getDynamicSlotsUsed } from '@/lib/constants';

export default function AvailabilitySection() {
  const t = useTranslations('availability');
  const locale = useLocale();

  // Calculate dynamic values
  const monthlySlotsUsed = getDynamicSlotsUsed();
  const slotsRemaining = URGENCY.monthlySlotsTotal - monthlySlotsUsed;
  const currentMonth = new Date().toLocaleDateString(locale, { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Card */}
          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-12">

            {/* Availability Status Badge - FIRST */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-xl mb-8 text-center"
            >
              <p className="text-gray-800 mb-2">
                {t('statusDate', { month: currentMonth, year: currentYear })}
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {t('statusSpots', { count: slotsRemaining })}
              </p>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              {t('title')}
            </h2>

            {/* Paragraph 1 */}
            <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
              {t('paragraph1')}
            </p>

            {/* Paragraph 2 */}
            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
              {t('paragraph2')}
            </p>

            {/* CTA Button */}
            <div className="text-center">
              <BookDemoButton variant="hero">
                {t('cta')}
              </BookDemoButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
