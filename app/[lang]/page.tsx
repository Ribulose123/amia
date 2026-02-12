import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { type Locale } from '@/src/config/i18n';
import { i18n } from '@/src/config/i18n';
import { getPrismicLocale } from "@/src/lib/prismicLocale";
import { HomePageClient } from './HomePageClient';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang || i18n.defaultLocale) as Locale;
  
  const client = createClient(locale);

  try {
    // Try to fetch homepage from Prismic
    const homepage = await client.getSingle("homepage", {
      lang: getPrismicLocale(locale),
    });

    // If homepage exists with slices, use SliceZone
    if (homepage.data.slices && homepage.data.slices.length > 0) {
      return (
        <SliceZone slices={homepage.data.slices} components={components} />
      );
    }
  } catch (error) {
    // If homepage doesn't exist in Prismic, fall back to existing HomePageClient
    console.log("Homepage not found in Prismic, using default HomePageClient");
  }
  
  // Fallback to existing HomePageClient component
  return <HomePageClient lang={locale} />;
}

