'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Type, Sun, Moon, Eye, X, RotateCcw } from 'lucide-react';

export default function AccessibilityWidget() {
    const t = useTranslations('accessibility');
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(0); // 0: normal, 1: large, 2: extra large
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isGrayscale, setIsGrayscale] = useState(false);
    const [isReadableFont, setIsReadableFont] = useState(false);

    // Apply settings to document
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        // Font size
        html.classList.remove('text-lg', 'text-xl');
        if (fontSize === 1) html.classList.add('text-lg');
        if (fontSize === 2) html.classList.add('text-xl');

        // High contrast
        if (isHighContrast) html.classList.add('high-contrast');
        else html.classList.remove('high-contrast');

        // Grayscale
        if (isGrayscale) html.classList.add('grayscale');
        else html.classList.remove('grayscale');

        // Readable font
        if (isReadableFont) body.classList.add('font-readable');
        else body.classList.remove('font-readable');

    }, [fontSize, isHighContrast, isGrayscale, isReadableFont]);

    const resetSettings = () => {
        setFontSize(0);
        setIsHighContrast(false);
        setIsGrayscale(false);
        setIsReadableFont(false);
        setIsOpen(false);
    };

    const toggleFontSize = () => setFontSize((prev) => (prev + 1) % 3);

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 left-4 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                role="button"
                aria-label={isOpen ? t('close') : t('open')}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-20 left-4 z-40 w-72 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
                    >
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Accessibility className="w-4 h-4" />
                                {t('title')}
                            </h3>
                            <button
                                onClick={resetSettings}
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <RotateCcw className="w-3 h-3" />
                                {t('reset')}
                            </button>
                        </div>

                        <div className="p-2 grid grid-cols-2 gap-2">
                            <button
                                onClick={toggleFontSize}
                                className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${fontSize > 0 ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <Type className="w-6 h-6" />
                                <span className="text-xs font-medium text-center">{t('textSize')}</span>
                            </button>

                            <button
                                onClick={() => setIsHighContrast(!isHighContrast)}
                                className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isHighContrast ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                {isHighContrast ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                                <span className="text-xs font-medium text-center">{t('highContrast')}</span>
                            </button>

                            <button
                                onClick={() => setIsGrayscale(!isGrayscale)}
                                className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isGrayscale ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <Eye className="w-6 h-6" />
                                <span className="text-xs font-medium text-center">{t('grayscale')}</span>
                            </button>

                            <button
                                onClick={() => setIsReadableFont(!isReadableFont)}
                                className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isReadableFont ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <span className="w-6 h-6 flex items-center justify-center text-lg font-sans font-bold">Aa</span>
                                <span className="text-xs font-medium text-center">{t('readableFont')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
