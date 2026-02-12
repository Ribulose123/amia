# 🚀 Slice Machine Setup for AMIA

## Current Status ✅

- ✅ Next.js 16.1.6 (App Router)
- ✅ TypeScript
- ✅ Prismic client installed
- ✅ Multilingual setup (`[lang]` routes)
- ✅ Using npm

## What We'll Add

- Slice Machine for visual content editing
- Slice components for dynamic page building
- Custom types for AMIA content
- Integration with existing multilingual setup

---

## 📋 PHASE 1: Install Slice Machine (npm)

```bash
npm install --save-dev @slicemachine/adapter-next slice-machine-ui
```

Then initialize:

```bash
npx @slicemachine/init@latest
```

**When prompted:**
- Framework → **Next.js**
- Router → **App Router**
- TypeScript → **Yes**
- Package manager → **npm**

This will create:
- `/slices` directory
- `/customtypes` directory
- `/prismicio.ts` file
- `/slicemachine.config.json`

---

## 📋 PHASE 2: Configure slicemachine.config.json

After initialization, update `slicemachine.config.json`:

```json
{
  "repositoryName": "your-prismic-repo-name",
  "adapter": "@slicemachine/adapter-next",
  "libraries": ["./slices"],
  "localSliceSimulatorURL": "http://localhost:3000/slice-simulator"
}
```

Replace `your-prismic-repo-name` with your actual Prismic repository name.

---

## 📋 PHASE 3: Update package.json Scripts

Add Slice Machine script:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "slicemachine": "start-slicemachine"
  }
}
```

---

## 📋 PHASE 4: Create prismicio.ts (Next.js Pattern)

Create `/prismicio.ts` at root:

```typescript
import * as prismic from "@prismicio/client";
import { cookies } from "next/headers";
import { Locale } from "@/src/config/i18n";
import { getPrismicLocale } from "@/src/lib/prismicLocale";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || process.env.PRISMIC_REPO || '';

if (!repositoryName) {
  throw new Error("Missing Prismic repository name");
}

export const createClient = (locale?: Locale) => {
  const cookieStore = cookies();

  const prismicLocale = locale ? getPrismicLocale(locale) : undefined;

  return prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions: {
      next: { 
        tags: ["prismic"],
        revalidate: 60, // ISR: revalidate every 60 seconds
      },
    },
    ...(prismicLocale && { defaultParams: { lang: prismicLocale } }),
  });
};
```

**Note:** This integrates with your existing `getPrismicLocale` helper.

---

## 📋 PHASE 5: Create Custom Types in Prismic

### 1. Page Type (Generic Pages)

In Prismic Dashboard or Slice Machine:
- Create → Page Type
- Name: `page`
- API ID: `page`

**Fields:**
- `title` → Key Text
- `uid` → UID
- `meta_title` → Key Text
- `meta_description` → Text
- `slices` → Slice Zone

---

### 2. Homepage Type

- Create → Page Type
- Name: `homepage`
- API ID: `homepage`

**Fields:**
- `title` → Key Text
- `meta_title` → Key Text
- `meta_description` → Text
- `slices` → Slice Zone

---

### 3. Category Type (Award Categories)

- Create → Page Type
- Name: `category`
- API ID: `category`

**Fields:**
- `title` → Key Text
- `uid` → UID
- `description` → Rich Text
- `cover_image` → Image
- `icon` → Image (optional)

---

### 4. Nominee Type

- Create → Page Type
- Name: `nominee`
- API ID: `nominee`

**Fields:**
- `name` → Key Text
- `uid` → UID
- `category` → Content Relationship (link to category)
- `bio` → Rich Text
- `photo` → Image
- `social_links` → Group (repeatable)
  - `platform` → Key Text
  - `url` → Link
- `nominated_for` → Key Text
- `year` → Number

---

### 5. News Article Type

- Create → Page Type
- Name: `news_article`
- API ID: `news_article`

**Fields:**
- `title` → Key Text
- `uid` → UID
- `featured_image` → Image
- `publish_date` → Date
- `excerpt` → Text
- `content` → Slice Zone (or Rich Text)

---

### 6. Site Settings (Singleton)

- Create → Single Type
- Name: `site_settings`
- API ID: `site_settings`

**Fields:**
- `site_name` → Key Text
- `logo` → Image
- `footer_text` → Rich Text
- `social_links` → Group

---

## 📋 PHASE 6: Create Slices

### Slice Structure

Each slice will be in `/slices/[SliceName]/index.tsx`

### 1. Hero Slice

**Fields:**
- `heading` → Key Text
- `subheading` → Rich Text
- `background_image` → Image
- `primary_button_text` → Key Text
- `primary_button_link` → Link
- `secondary_button_text` → Key Text (optional)
- `secondary_button_link` → Link (optional)

---

### 2. Nominee Grid Slice

**Fields:**
- `title` → Key Text
- `description` → Rich Text
- `nominees` → Group (repeatable)
  - `nominee` → Content Relationship (Nominee)

---

### 3. Rich Content Slice

**Fields:**
- `content` → Rich Text

---

### 4. Image Gallery Slice

**Fields:**
- `title` → Key Text (optional)
- `images` → Group (repeatable)
  - `image` → Image
  - `caption` → Key Text

---

### 5. CTA Slice

**Fields:**
- `title` → Key Text
- `description` → Rich Text
- `button_text` → Key Text
- `button_link` → Link

---

### 6. Countdown Slice (AMIA-specific)

**Fields:**
- `event_date` → Date
- `title` → Key Text
- `description` → Rich Text

---

### 7. Stats Slice

**Fields:**
- `stats` → Group (repeatable)
  - `number` → Key Text
  - `label` → Key Text
  - `icon` → Image (optional)

---

## 📋 PHASE 7: Dynamic Routing with [lang]

### Update `/app/[lang]/[uid]/page.tsx`

Create dynamic page route that works with your `[lang]` structure:

```typescript
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";
import { type Locale } from "@/src/config/i18n";
import { i18n } from "@/src/config/i18n";

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");
  
  const params: Array<{ lang: string; uid: string }> = [];
  
  for (const page of pages) {
    for (const locale of i18n.locales) {
      params.push({ lang: locale, uid: page.uid });
    }
  }
  
  return params;
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

  const page = await client
    .getByUID("page", uid, {
      lang: getPrismicLocale(locale),
    })
    .catch(() => notFound());

  return (
    <SliceZone slices={page.data.slices} components={components} />
  );
}
```

---

## 📋 PHASE 8: Update Homepage

Update `/app/[lang]/page.tsx`:

```typescript
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { type Locale } from "@/src/config/i18n";
import { i18n } from "@/src/config/i18n";
import { getPrismicLocale } from "@/src/lib/prismicLocale";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (i18n.locales.includes(lang as Locale))
    ? (lang as Locale)
    : i18n.defaultLocale;
  
  const client = createClient(locale);

  const homepage = await client.getSingle("homepage", {
    lang: getPrismicLocale(locale),
  });

  return (
    <SliceZone slices={homepage.data.slices} components={components} />
  );
}
```

---

## 📋 PHASE 9: Nominee Pages

Create `/app/[lang]/nominees/[uid]/page.tsx`:

```typescript
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { type Locale } from "@/src/config/i18n";
import { i18n } from "@/src/config/i18n";
import { getPrismicLocale } from "@/src/lib/prismicLocale";

export async function generateStaticParams() {
  const client = createClient();
  const nominees = await client.getAllByType("nominee");
  
  const params: Array<{ lang: string; uid: string }> = [];
  
  for (const nominee of nominees) {
    for (const locale of i18n.locales) {
      params.push({ lang: locale, uid: nominee.uid });
    }
  }
  
  return params;
}

export default async function NomineePage({
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

  const nominee = await client
    .getByUID("nominee", uid, {
      lang: getPrismicLocale(locale),
    })
    .catch(() => notFound());

  return (
    <div>
      <h1>{nominee.data.name}</h1>
      {/* Render nominee details */}
    </div>
  );
}
```

---

## 📋 PHASE 10: Run Slice Machine

```bash
npm run slicemachine
```

Opens at: `http://localhost:9999`

---

## 🎯 Next Steps

1. Install Slice Machine packages
2. Run initialization
3. Configure repository name
4. Create custom types in Prismic
5. Create slice components
6. Update routing
7. Test with Slice Machine UI

---

## ⚠️ Important Notes

- All Prismic queries should use `getPrismicLocale(locale)` for multilingual support
- Slice components should be Client Components if they need interactivity
- Use ISR (revalidate) for better performance
- Test each slice in Slice Machine before pushing to Prismic

