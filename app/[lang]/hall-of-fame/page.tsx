import { HallOfFamePage } from '../../pages/HallOfFamePage';
import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

export default async function HallOfFame({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || i18n.defaultLocale) as Locale;
  
  return <HallOfFamePage lang={locale} />;
}

