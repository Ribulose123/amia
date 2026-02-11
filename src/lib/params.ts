import { use } from 'react';
import { i18n } from '@/src/config/i18n';
import type { Locale } from '@/src/config/i18n';

/**
 * Helper to extract lang from params (handles both sync and async params)
 * 
 * NOTE: This is for Client Components only. For Server Components, use:
 * const { lang } = await params;
 * 
 * @param params - Promise or resolved params object
 * @returns Validated locale string (defaults to 'en')
 */
export function useLang(params: Promise<{ lang: string }> | { lang: string } | undefined): Locale {
  if (!params) {
    return i18n.defaultLocale;
  }
  
  if ('then' in params && typeof params.then === 'function') {
    // It's a Promise (Next.js 15+)
    try {
      const resolved = use(params);
      const lang = resolved?.lang;
      // Validate the locale
      if (lang && i18n.locales.includes(lang as Locale)) {
        return lang as Locale;
      }
      return i18n.defaultLocale;
    } catch {
      return i18n.defaultLocale;
    }
  }
  
  // It's already resolved (sync params)
  const lang = (params as { lang: string }).lang;
  // Validate the locale
  if (lang && i18n.locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return i18n.defaultLocale;
}

