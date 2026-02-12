import { Locale } from '@/src/config/i18n';

/**
 * Creates a navigation handler that preserves the current locale
 * @deprecated Use useNavigation hook in Client Components instead
 */
export function createNavigationHandler(lang: Locale) {
  return (page: string) => {
    const routes: Record<string, string> = {
      home: `/${lang}`,
      categories: `/${lang}/categories`,
      nominees: `/${lang}/nominees`,
      jury: `/${lang}/jury`,
      'hall-of-fame': `/${lang}/hall-of-fame`,
      event: `/${lang}/event`,
      news: `/${lang}/news`,
      about: `/${lang}/about`,
    };
    
    return routes[page] || `/${lang}`;
  };
}

/**
 * Gets the current page identifier from a pathname
 */
export function getCurrentPageFromPathname(pathname: string): string {
  // Remove locale prefix
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
  
  if (pathWithoutLang === '/' || pathWithoutLang === '') return 'home';
  if (pathWithoutLang.startsWith('/categories')) return 'categories';
  if (pathWithoutLang.startsWith('/nominees')) return 'nominees';
  if (pathWithoutLang.startsWith('/jury')) return 'jury';
  if (pathWithoutLang.startsWith('/winners')) return 'jury'; // Legacy support
  if (pathWithoutLang.startsWith('/hall-of-fame')) return 'hall-of-fame';
  if (pathWithoutLang.startsWith('/event')) return 'event';
  if (pathWithoutLang.startsWith('/news')) return 'news';
  if (pathWithoutLang.startsWith('/about')) return 'about';
  
  return 'home';
}

