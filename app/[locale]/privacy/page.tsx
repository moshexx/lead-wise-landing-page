'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

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

          {/* Data Collection */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('dataCollection.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('dataCollection.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.raw('dataCollection.types').map((type: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {type}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Data Usage */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('dataUsage.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('dataUsage.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {t.raw('dataUsage.purposes').map((purpose: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {purpose}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Data Sharing */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('dataSharing.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('dataSharing.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              {t.raw('dataSharing.parties').map((party: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {party}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 italic">
              {t('dataSharing.note')}
            </p>
          </motion.section>

          {/* Data Security */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('dataSecurity.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('dataSecurity.content')}
            </p>
          </motion.section>

          {/* Cookies */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('cookies.content')}
            </p>
          </motion.section>

          {/* User Rights */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('userRights.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('userRights.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              {t.raw('userRights.rights').map((right: string, index: number) => (
                <li key={index} className="leading-relaxed">
                  {right}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('userRights.contact')}
            </p>
          </motion.section>

          {/* Policy Changes */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {t('policyChanges.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('policyChanges.content')}
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
