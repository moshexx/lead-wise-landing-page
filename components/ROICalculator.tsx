'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ROI_DEFAULTS } from '@/lib/constants';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactModal from '@/components/ui/ContactModal';

export default function ROICalculator() {
  const t = useTranslations('roiCalculator');
  const [leadValue, setLeadValue] = useState<string>('5000');
  const [leadsPerMonth, setLeadsPerMonth] = useState<string>('10');
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateROI = (): number => {
    // Parse inputs
    const value = parseFloat(leadValue);
    const leads = parseFloat(leadsPerMonth);

    // Validation checks
    if (isNaN(value) || isNaN(leads)) {
      return 0;
    }

    // Check bounds
    if (value < ROI_DEFAULTS.minLeadValue || value > ROI_DEFAULTS.maxLeadValue) {
      return 0;
    }
    if (leads < ROI_DEFAULTS.minLeadsPerMonth || leads > ROI_DEFAULTS.maxLeadsPerMonth) {
      return 0;
    }

    // Check for negative or zero values
    if (value <= 0 || leads <= 0) {
      return 0;
    }

    // Calculate potential revenue recovered with 20% improvement in conversion
    const result = value * leads * ROI_DEFAULTS.conversionImprovement;

    // Ensure result is finite
    return isFinite(result) ? result : 0;
  };

  const roi = calculateROI();
  const yearlyROI = roi * 12;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-primary" />
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t('title')}
        </h3>
      </div>

      <p className="text-center text-gray-600 mb-8">{t('subtitle')}</p>

      <div className="space-y-6">
        {/* Lead Value Input */}
        <div>
          <label
            htmlFor="leadValue"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t('leadValue')}
          </label>
          <input
            type="number"
            id="leadValue"
            value={leadValue}
            onChange={(e) => {
              setLeadValue(e.target.value);
              setShowResult(false);
            }}
            min={ROI_DEFAULTS.minLeadValue}
            max={ROI_DEFAULTS.maxLeadValue}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
            placeholder="5000"
          />
        </div>

        {/* Leads Per Month Input */}
        <div>
          <label
            htmlFor="leadsPerMonth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t('leadsPerMonth')}
          </label>
          <input
            type="number"
            id="leadsPerMonth"
            value={leadsPerMonth}
            onChange={(e) => {
              setLeadsPerMonth(e.target.value);
              setShowResult(false);
            }}
            min={ROI_DEFAULTS.minLeadsPerMonth}
            max={ROI_DEFAULTS.maxLeadsPerMonth}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
            placeholder="10"
          />
        </div>

        {/* Calculate Button */}
        <button
          type="button"
          onClick={() => setShowResult(true)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-center transition-all shadow-lg"
        >
          חשב עכשיו
        </button>

        {/* Result - Show only after clicking calculate */}
        {showResult && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 border border-blue-200 text-gray-900 rounded-xl p-8 text-center"
          >
            <p className="text-lg mb-3 text-blue-800">{t('result')}</p>

            {/* Monthly ROI - Hero number */}
            <motion.p
              key={roi}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-5xl md:text-6xl font-bold mb-2 text-blue-900"
            >
              ₪{roi.toLocaleString('he-IL', {
                maximumFractionDigits: 0,
              })}
            </motion.p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-center transition-all shadow-lg"
            >
              {t('cta')}
            </button>
          </motion.div>
        )}




        {/* Simple Note */}
        <p className="text-sm text-gray-500 text-center mt-4">
          {t('note')}
        </p>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
