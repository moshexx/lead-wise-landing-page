'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense, useEffect } from 'react';
import Script from 'next/script';

function ThankYouContent() {
  const t = useTranslations('thankYou');
  const searchParams = useSearchParams();
  const leadId = searchParams.get('lead_id');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center gap-4"
          >
            <CheckCircle className="w-16 h-16 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {t('title')}
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Form Section */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Fillout Form Embed */}
          <div
            style={{ width: '100%', minHeight: '500px' }}
            data-fillout-id="6mgdnzETVNus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          />
        </motion.div>
      </main>

      {/* Fillout Script */}
      <Script
        src="https://server.fillout.com/embed/v1/"
        strategy="afterInteractive"
      />
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
