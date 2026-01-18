'use client';

import { useTranslations } from 'next-intl';
import BookDemoButton from '@/components/ui/BookDemoButton';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function FinalCTASection() {
  const t = useTranslations('finalCta');

  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 start-10 w-64 h-64 bg-accent-purple rounded-full blur-3xl" />
        <div className="absolute bottom-10 end-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-full">
              <Rocket className="w-16 h-16 md:w-20 md:h-20" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            {t('title')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <BookDemoButton variant="hero">
              {t('cta')}
            </BookDemoButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
