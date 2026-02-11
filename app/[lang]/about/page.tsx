import { AboutPage } from '../../pages/AboutPage';
import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || i18n.defaultLocale) as Locale;
  
  return <AboutPage lang={locale} />;
}

