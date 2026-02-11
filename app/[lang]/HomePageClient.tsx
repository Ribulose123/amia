'use client';

import { HomePage } from '../pages/HomePage';
import { type Locale } from '@/src/config/i18n';

export function HomePageClient({ lang }: { lang: Locale }) {
  return <HomePage lang={lang} />;
}


