import * as prismic from '@prismicio/client';
import { prismicLocaleMap, prismicToNextLocale, getPrismicLocale } from './prismicLocale';
import { Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

// Initialize Prismic client
export const client = prismic.createClient(
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || process.env.PRISMIC_REPO || '',
  {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  }
);

/**
 * Get a document by UID with locale support
 */
export async function getPageByUID(
  type: string,
  uid: string,
  lang: Locale | string | undefined
) {
  // Safely get Prismic locale with fallback
  const prismicLocale = getPrismicLocale(lang);
  const normalizedLang = (lang && i18n.locales.includes(lang as Locale)) 
    ? (lang as Locale) 
    : i18n.defaultLocale;
  
  try {
    return await client.getByUID(type, uid, {
      lang: prismicLocale,
    });
  } catch (error) {
    // Fallback to default locale if translation doesn't exist
    if (normalizedLang !== i18n.defaultLocale) {
      return await client.getByUID(type, uid, {
        lang: prismicLocaleMap[i18n.defaultLocale],
      });
    }
    throw error;
  }
}

/**
 * Get all documents of a type with locale support
 */
export async function getAllByType(
  type: string,
  lang: Locale | string | undefined,
  options?: Parameters<typeof client.getAllByType>[1]
) {
  // Safely get Prismic locale with fallback
  const prismicLocale = getPrismicLocale(lang);
  
  return await client.getAllByType(type, {
    lang: prismicLocale,
    ...options,
  } as any);
}

/**
 * Get documents by type with locale support
 */
export async function getByType(
  type: string,
  lang: Locale | string | undefined,
  options?: Parameters<typeof client.getByType>[1]
) {
  // Safely get Prismic locale with fallback
  const prismicLocale = getPrismicLocale(lang);
  
  return await client.getByType(type, {
    lang: prismicLocale,
    ...options,
  } as any);
}

