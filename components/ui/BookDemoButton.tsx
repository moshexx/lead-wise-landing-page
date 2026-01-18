'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import ContactModal from './ContactModal';

interface BookDemoButtonProps {
  variant?: 'hero' | 'inline' | 'sticky';
  className?: string;
  children?: React.ReactNode;
}

export default function BookDemoButton({
  variant = 'inline',
  className,
  children
}: BookDemoButtonProps) {
  const t = useTranslations('nav');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 rounded-lg';

  const variantStyles = {
    hero: 'px-8 py-4 text-lg md:text-xl bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl',
    inline: 'px-6 py-3 text-base md:text-lg bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg',
    sticky: 'px-6 py-3 text-base bg-purple-600 text-white hover:bg-purple-700 shadow-lg fixed bottom-4 start-4 end-4 z-50 md:hidden',
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(baseStyles, variantStyles[variant], className)}
        type="button"
      >
        <Calendar className="w-5 h-5" />
        {children || t('cta')}
      </button>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
