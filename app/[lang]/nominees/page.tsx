import { NomineesPage } from '../../pages/NomineesPage';
import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Nominees({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  try {
    const resolvedParams = await params;
    if (!resolvedParams || !resolvedParams.lang) {
      return <NomineesPage lang={i18n.defaultLocale} />;
    }
    
    const lang = resolvedParams.lang;
    const locale = (i18n.locales.includes(lang as Locale))
      ? (lang as Locale)
      : i18n.defaultLocale;
    
    return <NomineesPage lang={locale} />;
  } catch (error) {
    console.error('Error in Nominees page:', error);
    return <NomineesPage lang={i18n.defaultLocale} />;
  }
}

