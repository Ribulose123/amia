import { notFound } from 'next/navigation';
import { i18n, type Locale } from '@/src/config/i18n';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ClientApp } from '../components/ClientApp';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://amia2026.com';

  // Generate hreflang and canonical URLs
  const languages: Record<string, string> = {};
  i18n.locales.forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}`;
  });

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;

  // Validate locale
  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen dark:bg-black dark:text-white light:bg-white light:text-black">
        <ThemeProvider>
          <LanguageProvider>
            <ClientApp lang={locale}>{children}</ClientApp>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

