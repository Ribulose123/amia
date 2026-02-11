import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';
import { HomePageClient } from './HomePageClient';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || i18n.defaultLocale) as Locale;
  
  return <HomePageClient lang={locale} />;
}

