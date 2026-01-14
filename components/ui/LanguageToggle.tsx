'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'he' ? 'en' : 'he';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
        'bg-white/10 backdrop-blur-sm text-white',
        'hover:bg-white/20 transition-all duration-200',
        'border border-white/20'
      )}
      type="button"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5" />
      <span className="font-medium">{locale === 'he' ? 'EN' : 'עב'}</span>
    </button>
  );
}
