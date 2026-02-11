export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'de', 'es'],
} as const;

export type Locale = (typeof i18n.locales)[number];

export const localeRegionMap: Record<string, Locale> = {
  // English
  NG: 'en', // Nigeria
  US: 'en', // United States
  GB: 'en', // United Kingdom
  CA: 'en', // Canada
  AU: 'en', // Australia
  ZA: 'en', // South Africa
  KE: 'en', // Kenya
  GH: 'en', // Ghana
  
  // French
  FR: 'fr', // France
  BE: 'fr', // Belgium
  CH: 'fr', // Switzerland (French-speaking)
  SN: 'fr', // Senegal
  CI: 'fr', // Côte d'Ivoire
  CM: 'fr', // Cameroon
  
  // German
  DE: 'de', // Germany
  AT: 'de', // Austria
  
  // Spanish
  ES: 'es', // Spain
  MX: 'es', // Mexico
  AR: 'es', // Argentina
  CO: 'es', // Colombia
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};


