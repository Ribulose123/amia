'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Locale } from '@/src/config/i18n';

/**
 * Hook for Client Components to create a navigation handler
 * This avoids passing functions from Server Components to Client Components
 */
export function useNavigation(lang: Locale) {
  const router = useRouter();

  const navigate = useMemo(() => {
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
      
      const path = routes[page] || `/${lang}`;
      router.push(path);
    };
  }, [lang, router]);

  return navigate;
}

