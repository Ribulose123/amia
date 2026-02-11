import Link from 'next/link';
import { i18n, type Locale } from '@/src/config/i18n';

export default async function NotFound({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang && i18n.locales.includes(resolvedParams.lang as Locale))
    ? (resolvedParams.lang as Locale)
    : i18n.defaultLocale;
  
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black light:bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white light:text-black">404</h1>
        <p className="text-lg mb-8 dark:text-white/70 light:text-black/70">
          Page not found
        </p>
        <Link
          href={`/${lang}`}
          className="px-6 py-3 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}


