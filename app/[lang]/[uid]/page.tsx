import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";
import { type Locale } from "@/src/config/i18n";
import { i18n } from "@/src/config/i18n";
import { getPrismicLocale } from "@/src/lib/prismicLocale";

export async function generateStaticParams() {
  // Skip static generation if Prismic is not configured
  if (!process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME && !process.env.PRISMIC_REPO) {
    return [];
  }

  try {
    const client = createClient();
    const pages = await client.getAllByType("page");
    
    const params: Array<{ lang: string; uid: string }> = [];
    
    for (const page of pages) {
      // Skip pages without a UID
      if (!page.uid) continue;
      
      for (const locale of i18n.locales) {
        params.push({ lang: locale, uid: page.uid });
      }
    }
    
    return params;
  } catch (error) {
    // If Prismic is not available during build, return empty array
    // Pages will be generated on-demand
    console.error("Error generating static params for pages:", error);
    return [];
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;
  
  const locale = (i18n.locales.includes(lang as Locale))
    ? (lang as Locale)
    : i18n.defaultLocale;
  
  const client = createClient(locale);

  try {
    const page = await client.getByUID("page", uid, {
      lang: getPrismicLocale(locale),
    });

    return (
      <SliceZone slices={page.data.slices} components={components} />
    );
  } catch (error) {
    console.error(`Error fetching page ${uid} for locale ${locale}:`, error);
    notFound();
  }
}

