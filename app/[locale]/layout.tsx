import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '@/app/globals.css';

import CookieConsent from '@/components/ui/CookieConsent';
import AccessibilityWidget from '@/components/ui/AccessibilityWidget';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  // Import messages to get title and description
  const messages = await import(`@/messages/${locale}.json`);

  return {
    title: messages.site.title,
    description: messages.site.description,
    icons: {
      icon: '/favicon.ico?v=2',
      shortcut: '/favicon.ico?v=2',
      apple: '/favicon.ico?v=2',
    },
    openGraph: {
      title: messages.site.title,
      description: messages.site.description,
      type: 'website',
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  // Determine text direction
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
          <AccessibilityWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
