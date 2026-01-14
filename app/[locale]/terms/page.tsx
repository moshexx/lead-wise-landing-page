'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const t = useTranslations('terms');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-dark text-white py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>חזרה לדף הבית</span>
          </Link>
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {t('title')}
          </motion.h1>
          <p className="text-white/70 mt-2">
            {t('lastUpdated')}: ינואר 2025
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('intro.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('intro.content')}
            </p>
          </motion.section>

          {/* Service Use */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('serviceUse.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('serviceUse.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.raw('serviceUse.rules').map((rule: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {rule}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Account Registration */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('accountRegistration.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('accountRegistration.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.raw('accountRegistration.responsibilities').map((resp: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {resp}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Payment Terms */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('paymentTerms.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('paymentTerms.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              {t.raw('paymentTerms.terms').map((term: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {term}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 italic">
              {t('paymentTerms.refundPolicy')}
            </p>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('intellectualProperty.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('intellectualProperty.content')}
            </p>
            <p className="text-gray-700 font-semibold mb-2">
              {t('intellectualProperty.restrictions')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.raw('intellectualProperty.prohibitions').map((prohibition: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {prohibition}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Disclaimer */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('disclaimer.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('disclaimer.content')}
            </p>
            <p className="text-gray-700 font-semibold mb-2">
              {t('disclaimer.noWarranty')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              {t.raw('disclaimer.limitations').map((limitation: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {limitation}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 italic">
              {t('disclaimer.limitationOfLiability')}
            </p>
          </motion.section>

          {/* Indemnification */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('indemnification.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('indemnification.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.raw('indemnification.scenarios').map((scenario: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {scenario}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Termination */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('termination.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('termination.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              {t.raw('termination.reasons').map((reason: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {reason}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('termination.effect')}
            </p>
          </motion.section>

          {/* Changes to Terms */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('changesToTerms.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('changesToTerms.content')}
            </p>
          </motion.section>

          {/* Governing Law */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('governingLaw.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('governingLaw.content')}
            </p>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              {t('contact.content')}
            </p>
            <p className="text-gray-600">
              {t('contact.methods')}
            </p>
          </motion.section>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>חזרה לדף הבית</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
