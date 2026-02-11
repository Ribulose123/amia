import { EventNightPage } from '../../pages/EventNightPage';
import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

export default async function Event({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || i18n.defaultLocale) as Locale;
  
  return <EventNightPage lang={locale} />;
}

