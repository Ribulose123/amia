import { NewsPage } from '../../pages/NewsPage';
import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

export default async function News({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || i18n.defaultLocale) as Locale;
  
  return <NewsPage lang={locale} />;
}

