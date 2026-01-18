'use client';

import { useTranslations } from 'next-intl';
import BookDemoButton from '@/components/ui/BookDemoButton';
import LanguageToggle from '@/components/ui/LanguageToggle';
import VideoPlayer from '@/components/ui/VideoPlayer';
import Logo from '@/components/ui/Logo';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 start-20 w-64 h-64 bg-accent-purple rounded-full blur-3xl" />
        <div className="absolute bottom-20 end-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-6 start-6 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo variant="light" size="lg" />
        </motion.div>
      </div>

      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 end-6 z-20">
        <LanguageToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 md:py-32 flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto text-center flex-1 flex flex-col justify-between">
          {/* Top Section - Title */}
          <div className="pt-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              {t('title')}
            </motion.h1>
          </div>

          {/* Middle Section - Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200"
          >
            {t('subtitle')}
          </motion.p>

          {/* Bottom Section - CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center pb-16 md:pb-8"
          >
            <BookDemoButton variant="hero" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-white rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Video Section - separate component with white background
export function VideoSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <VideoPlayer className="max-w-md md:max-w-lg" autoplayDelay={2000} />
        </motion.div>
      </div>
    </section>
  );
}
