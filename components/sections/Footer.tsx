'use client';

import { useTranslations } from 'next-intl';
import LanguageToggle from '@/components/ui/LanguageToggle';
import Logo from '@/components/ui/Logo';
import { MessageCircle, Mail, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { CONTACT, SOCIAL_LINKS, COMPANY_INFO } from '@/lib/constants';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Logo variant="light" size="lg" className="mb-4" />
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4">{t('contact')}</h4>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('whatsapp')}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {t('email')}
                </a>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex md:justify-end">
              <LanguageToggle />
            </div>
          </div>

          {/* Social Media Links */}
          {(SOCIAL_LINKS.facebook || SOCIAL_LINKS.linkedin || SOCIAL_LINKS.twitter || SOCIAL_LINKS.instagram || SOCIAL_LINKS.youtube) && (
            <div className="border-t border-white/10 pt-8">
              <h4 className="text-lg font-bold mb-4 text-center md:text-right">עקבו אחרינו</h4>
              <div className="flex justify-center md:justify-start gap-4">
                {SOCIAL_LINKS.facebook && (
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {SOCIAL_LINKS.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {SOCIAL_LINKS.twitter && (
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {SOCIAL_LINKS.instagram && (
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {SOCIAL_LINKS.youtube && (
                  <a
                    href={SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Links */}
              <div className="flex gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('links.privacy')}
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('links.terms')}
                </Link>
              </div>

              {/* Copyright */}
              <p className="text-sm text-gray-400">{t('copyright')}</p>
            </div>

            {/* Company Legal Info */}
            {(COMPANY_INFO.legalName || COMPANY_INFO.registrationNumber) && (
              <div className="mt-4 text-center text-xs text-gray-500">
                {COMPANY_INFO.legalName && <span>{COMPANY_INFO.legalName}</span>}
                {COMPANY_INFO.legalName && COMPANY_INFO.registrationNumber && <span> • </span>}
                {COMPANY_INFO.registrationNumber && <span>{COMPANY_INFO.registrationNumber}</span>}
                {COMPANY_INFO.address && (
                  <>
                    <span> • </span>
                    <span>{COMPANY_INFO.address}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
