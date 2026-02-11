import { Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

/**
 * Maps Next.js locale codes to Prismic locale codes
 * Prismic uses format: language-region (e.g., 'en-us', 'fr-fr')
 */
export const prismicLocaleMap: Record<Locale, string> = {
  en: 'en-us',
  fr: 'fr-fr',
  de: 'de-de',
  es: 'es-es',
};

/**
 * Reverse mapping: Prismic locale → Next.js locale
 */
export const prismicToNextLocale: Record<string, Locale> = {
  'en-us': 'en',
  'fr-fr': 'fr',
  'de-de': 'de',
  'es-es': 'es',
};

/**
 * Safely get Prismic locale from Next.js locale with fallback
 */
export function getPrismicLocale(lang: Locale | string | undefined): string {
  // Validate and normalize the locale
  const normalizedLang = (lang && i18n.locales.includes(lang as Locale)) 
    ? (lang as Locale) 
    : i18n.defaultLocale;
  
  return prismicLocaleMap[normalizedLang] || prismicLocaleMap[i18n.defaultLocale];
}

