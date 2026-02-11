'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, localeNames, type Locale } from '@/src/config/i18n';
import { Globe } from 'lucide-react';
import { useState } from 'react';

interface LanguageSwitcherProps {
  currentLang: Locale;
  className?: string;
}

export function LanguageSwitcher({ currentLang, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLang = (newLang: Locale) => {
    // Replace the current locale in the pathname
    const segments = pathname.split('/').filter(Boolean);
    
    // Remove current locale if it exists
    if (i18n.locales.includes(segments[0] as Locale)) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    
    const newPath = `/${segments.join('/')}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{currentLang}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLang(locale)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  currentLang === locale
                    ? 'bg-[#6401CF]/20 text-[#6401CF]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{localeNames[locale]}</span>
                  {currentLang === locale && (
                    <span className="text-[#6401CF]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


