'use client';

import { useTranslations } from 'next-intl';
import ROICalculator from '@/components/ROICalculator';
import { motion } from 'framer-motion';

export default function ROICalculatorSection() {
  const t = useTranslations('roiCalculator');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ROICalculator />
        </motion.div>
      </div>
    </section>
  );
}
