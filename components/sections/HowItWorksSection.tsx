'use client';

import { useTranslations } from 'next-intl';
import ProcessStep from '@/components/ui/ProcessStep';
import { ProcessIcons } from '@/components/ui/Logo';
import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const icons = ProcessIcons();

  const steps = [
    { number: '1', icon: icons.Magnet },
    { number: '2', icon: icons.Funnel },
    { number: '3', icon: icons.Meeting },
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProcessStep
                  number={step.number}
                  title={t(`steps.${index}.title`)}
                  description={t(`steps.${index}.description`)}
                  icon={step.icon}
                  isLast={index === steps.length - 1}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
