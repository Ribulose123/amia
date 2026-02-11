# LinkedIn-Style Location-Aware Multilingual Setup

This project implements a production-grade, location-aware multilingual website using Next.js App Router and Prismic CMS, following the same pattern used by LinkedIn, Meta, and Stripe.

## 🎯 Features

- **Geo-based auto-routing**: Automatically redirects users to their language based on location
- **Path-based locale routing**: SEO-friendly URLs like `/en/`, `/fr/`, `/de/`
- **Prismic CMS integration**: Content management with locale support
- **Language switcher**: Manual override for users
- **SEO optimized**: hreflang tags and canonical URLs
- **Edge-optimized**: Middleware runs at the edge for fast redirects

## 📁 Architecture

```
app/
├── [lang]/                    # Dynamic locale route
│   ├── layout.tsx            # Locale-specific layout with SEO
│   ├── page.tsx              # Home page
│   ├── categories/
│   ├── nominees/
│   ├── winners/
│   ├── news/
│   ├── about/
│   ├── event/
│   └── hall-of-fame/
├── components/
│   └── LanguageSwitcher.tsx   # Language switcher component
└── middleware.ts             # Geo-based routing logic

src/
├── config/
│   └── i18n.ts              # Locale configuration
└── lib/
    ├── prismic.ts           # Prismic client
    ├── prismicLocale.ts    # Locale mapping
    └── navigation.ts       # Navigation helpers
```

## 🚀 Setup

### 1. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=your-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 2. Prismic Configuration

1. Go to your Prismic dashboard
2. Settings → Languages
3. Add languages:
   - `en-us` (English - US)
   - `fr-fr` (French - France)
   - `de-de` (German - Germany)
   - `es-es` (Spanish - Spain)
4. Set `en-us` as the master locale

### 3. Supported Locales

Edit `src/config/i18n.ts` to add/remove locales:

```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'de', 'es'],
}
```

### 4. Country → Locale Mapping

Update `localeRegionMap` in `src/config/i18n.ts` to map countries to languages:

```typescript
export const localeRegionMap: Record<string, Locale> = {
  NG: 'en',  // Nigeria → English
  FR: 'fr',  // France → French
  // ... add more mappings
}
```

## 🔄 How It Works

### 1. User Visits Website

```
User visits: https://website.com
```

### 2. Middleware Detects Location

The middleware (`middleware.ts`) runs at the edge and:
- Detects user's country from headers (`x-vercel-ip-country` or `cf-ipcountry`)
- Maps country to locale using `localeRegionMap`
- Redirects to locale-prefixed URL

```
Nigeria → /en/
France → /fr/
Germany → /de/
```

### 3. Locale-Specific Content

Pages fetch content from Prismic using the locale:

```typescript
const page = await getPageByUID('page', 'home', params.lang);
```

### 4. Language Switcher

Users can manually change language using the `LanguageSwitcher` component, which updates the URL while preserving the current page.

## 📝 Usage Examples

### Fetching Prismic Content

```typescript
import { getPageByUID } from '@/src/lib/prismic';

export default async function Page({ params }: { params: { lang: string } }) {
  const page = await getPageByUID('page', 'home', params.lang);
  
  return <div>{page.data.title}</div>;
}
```

### Navigation

```typescript
import { createNavigationHandler } from '@/src/lib/navigation';

export default function Page({ params }: { params: { lang: string } }) {
  const onNavigate = createNavigationHandler(params.lang);
  
  return <YourComponent onNavigate={onNavigate} />;
}
```

### Language Switcher

```typescript
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

<LanguageSwitcher currentLang={params.lang} />
```

## 🔍 SEO Features

### hreflang Tags

Automatically generated in `[lang]/layout.tsx`:

```html
<link rel="alternate" hreflang="en" href="https://website.com/en" />
<link rel="alternate" hreflang="fr" href="https://website.com/fr" />
```

### Canonical URLs

Each page has a canonical URL pointing to its locale-specific version.

## 🎨 Customization

### Adding New Locales

1. Add to `i18n.locales` in `src/config/i18n.ts`
2. Add Prismic locale mapping in `src/lib/prismicLocale.ts`
3. Add country mappings in `localeRegionMap`
4. Configure in Prismic dashboard

### Customizing Middleware

Edit `middleware.ts` to:
- Change redirect logic
- Add cookie-based preference
- Implement A/B testing

## 🚨 Important Notes

1. **Old Routes**: The old routes (`/categories`, `/nominees`, etc.) are now under `/[lang]/categories`, etc.
2. **Middleware**: Runs on every request, so keep it lightweight
3. **Static Generation**: Use `generateStaticParams()` for all locales
4. **Fallbacks**: Prismic falls back to English if translation doesn't exist

## 📚 Resources

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Prismic Documentation](https://prismic.io/docs)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)


