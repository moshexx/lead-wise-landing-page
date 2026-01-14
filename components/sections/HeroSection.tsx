'use client';

import { useTranslations } from 'next-intl';
import BookDemoButton from '@/components/ui/BookDemoButton';
import LanguageToggle from '@/components/ui/LanguageToggle';
import VideoPlayer from '@/components/ui/VideoPlayer';
import Logo from '@/components/ui/Logo';
import { PhoneOff, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Grid Layout - Text on one side, Video on the other (stacked on mobile) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-start space-y-8">
              {/* Visual Metaphor - Escaping Lead */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center lg:justify-start gap-4 mb-8"
              >
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                  <PhoneOff className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                  <TrendingDown className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                {t('title')}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200"
              >
                {t('subtitle')}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center lg:justify-start"
              >
                <BookDemoButton variant="hero" />
              </motion.div>
            </div>

            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <VideoPlayer className="max-w-sm" autoplayDelay={2000} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 start-1/2 -translate-x-1/2"
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
