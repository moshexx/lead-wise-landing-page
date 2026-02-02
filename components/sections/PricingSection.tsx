'use client';

import { useTranslations, useLocale } from 'next-intl';
import BookDemoButton from '@/components/ui/BookDemoButton';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { Check, Gift, Clock, Users, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRICE_ILS, PRICE_USD, URGENCY } from '@/lib/constants';

export default function PricingSection() {
  const t = useTranslations('pricing');
  const locale = useLocale();

  const featureKeys = [0, 1, 2, 3, 4, 5];
  const price = locale === 'he' ? PRICE_ILS : PRICE_USD;
  const currency = locale === 'he' ? '₪' : '$';

  // Calculate urgency values
  const slotsRemaining = URGENCY.monthlySlotsTotal - URGENCY.monthlySlotsUsed;
  const bonusDeadline = new Date(URGENCY.bonusDeadline);
  const today = new Date();
  const daysRemaining = Math.ceil((bonusDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const formattedDeadline = locale === 'he'
    ? bonusDeadline.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })
    : bonusDeadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  // Calculate dynamic timer deadline (end of current month at 23:59:59)
  // Using local timezone consistently for accurate countdown
  const getEndOfMonth = () => {
    const now = new Date();

    // Get the last day of the current month in local timezone
    // Day 0 of next month = last day of current month
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1, // Next month
      0, // Day 0 = last day of previous month (current month)
      23,
      59,
      59,
      999
    );

    return endOfMonth.toISOString();
  };
  const timerDeadline = getEndOfMonth();

  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Bonus Badge with Urgency */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3 mb-8"
          >
            <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg text-center whitespace-pre-line">
              {t('bonus')}
            </div>

            {/* Urgency indicators */}
            {URGENCY.enabled && (
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                {slotsRemaining > 0 && slotsRemaining <= 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    {t('urgency.slotsRemaining', { count: slotsRemaining })}
                  </motion.div>
                )}
                {daysRemaining > 0 && daysRemaining <= 30 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    {t('urgency.bonusEnding', { date: formattedDeadline })} • {t('urgency.daysRemaining', { count: daysRemaining })}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Price Header */}
            <div className="bg-primary text-white p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t('title').replace('2,930 ₪', `${price} ${currency}`).replace('$799', `${currency}${price}`)}
              </h2>
              <p className="text-lg opacity-90">{t('subtitle')}</p>
              <p className="text-xl mt-4 font-semibold">{t('payment')}</p>
              <p className="text-xs opacity-75 mt-2 italic">{t('disclaimer')}</p>
            </div>

            {/* Value Comparison */}
            <div className="bg-blue-50 p-6 border-b border-blue-100">
              <h3 className="text-lg font-bold mb-4 text-gray-900">{t('comparison.title')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('comparison.va')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('comparison.agency')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t('comparison.lost')}</span>
                </div>
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-blue-200">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-900 font-semibold">{t('comparison.leadwise')}</span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-8">
              <h3 className="text-xl font-bold mb-6">{t('includes')}</h3>
              <ul className="space-y-4 mb-8">
                {featureKeys.map((key, index) => (
                  <motion.li
                    key={key}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">
                      {t(`features.${key}`)}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-6 text-gray-600 text-sm"
              >
                {t('social')}
              </motion.div>

              {/* Urgency Reason */}
              {URGENCY.enabled && slotsRemaining > 0 && slotsRemaining <= 5 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center text-gray-500 text-sm mb-6 italic"
                >
                  {t('urgency.limitedCapacity')}
                </motion.p>
              )}

              {/* Countdown Timer */}
              {URGENCY.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 p-6 bg-primary rounded-xl"
                >
                  <CountdownTimer
                    deadline={timerDeadline}
                    label={t('timer.label')}
                    size="lg"
                    variant="urgent"
                    showIcon={true}
                  />
                </motion.div>
              )}

              {/* CTA Button */}
              <div className="text-center">
                <BookDemoButton variant="hero">
                  {t('cta')}
                </BookDemoButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
