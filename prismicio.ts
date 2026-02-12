import * as prismic from "@prismicio/client";
import { Locale } from "@/src/config/i18n";
import { getPrismicLocale } from "@/src/lib/prismicLocale";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || process.env.PRISMIC_REPO || '';

// Don't throw during build if repository name is missing - allow graceful fallback
// The error will be caught in pages that use Prismic

/**
 * Creates a Prismic client for use in Server Components
 * Integrates with your existing multilingual setup
 */
export const createClient = (locale?: Locale) => {
  // Return a mock client if repository name is not set (for build time)
  if (!repositoryName) {
    // Return a client that will fail gracefully when used
    return prismic.createClient('placeholder', {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN || '',
    });
  }

  const prismicLocale = locale ? getPrismicLocale(locale) : undefined;

  return prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...(prismicLocale && { defaultParams: { lang: prismicLocale } }),
  });
};

