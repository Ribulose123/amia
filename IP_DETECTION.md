# IP Address & Location Change Detection

This document explains how the application detects when a user's IP address or location (country) changes.

## How It Works

### 1. Middleware Detection

The middleware (`middleware.ts`) runs on every request and:

1. **Extracts IP Address**: Gets the user's IP from headers:
   - `x-forwarded-for` (first IP in the chain)
   - `x-real-ip` (direct client IP)
   - `request.ip` (Next.js request IP)

2. **Detects Country**: Gets the country from:
   - `request.geo.country` (Vercel/Cloudflare Edge)
   - `x-vercel-ip-country` header (Vercel)
   - `cf-ipcountry` header (Cloudflare)

3. **Compares with Previous**: Reads cookies to get previous IP/country:
   - `amia-detected-country`: Previously detected country
   - `amia-detected-ip`: Previously detected IP

4. **Stores Current Values**: Sets cookies with current IP and country

5. **Sets Headers**: Adds custom headers to the response:
   - `x-ip-changed`: `true` if IP changed
   - `x-country-changed`: `true` if country changed
   - `x-detected-country`: Current detected country
   - `x-previous-country`: Previous country (or "none")
   - `x-current-ip`: Current IP address
   - `x-previous-ip`: Previous IP (or "none")

### 2. Client-Side Detection

#### Using the Hook

```tsx
'use client';

import { useLocationChange } from '@/src/lib/useLocationChange';

export function MyComponent() {
  const { ipChanged, countryChanged, detectedCountry, previousCountry } = useLocationChange();

  if (countryChanged) {
    console.log(`Country changed from ${previousCountry} to ${detectedCountry}`);
  }

  if (ipChanged) {
    console.log('IP address changed');
  }

  return <div>...</div>;
}
```

#### Using the API Route

```tsx
// In a Server Component
import { getLocationChangeInfo } from '@/src/lib/useLocationChange';

export default async function Page() {
  const locationInfo = await getLocationChangeInfo();
  
  if (locationInfo.countryChanged) {
    // Handle country change
  }
}
```

### 3. Notification Component

A ready-to-use component that shows notifications when location changes:

```tsx
import { LocationChangeNotification } from '@/components/LocationChangeNotification';

export default function Layout({ children }) {
  return (
    <>
      <LocationChangeNotification />
      {children}
    </>
  );
}
```

## Use Cases

### 1. Detect VPN Usage
When a user's IP changes but they're still in the same physical location, it might indicate VPN usage.

### 2. Detect Travel
When the country changes, the user might be traveling and you can offer to switch languages.

### 3. Network Changes
IP changes can indicate:
- Switching from WiFi to mobile data
- Changing networks
- Using a different device

### 4. Security Monitoring
Track suspicious location changes for security purposes.

## Cookie Storage

- **Name**: `amia-detected-country` and `amia-detected-ip`
- **Duration**: 1 year
- **Path**: `/` (entire site)
- **SameSite**: `lax`
- **Secure**: `true` in production

## Headers Available

All responses include these custom headers:

- `x-ip-changed`: Boolean string (`"true"` or `"false"`)
- `x-country-changed`: Boolean string (`"true"` or `"false"`)
- `x-detected-country`: Current country code (e.g., `"US"`, `"FR"`)
- `x-previous-country`: Previous country or `"none"`
- `x-current-ip`: Current IP address
- `x-previous-ip`: Previous IP or `"none"`

## Example: Auto-Switch Language on Country Change

```tsx
'use client';

import { useEffect } from 'react';
import { useLocationChange } from '@/src/lib/useLocationChange';
import { useRouter, usePathname } from 'next/navigation';
import { localeRegionMap } from '@/src/config/i18n';

export function AutoLanguageSwitcher() {
  const { countryChanged, detectedCountry } = useLocationChange();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (countryChanged && detectedCountry) {
      const newLocale = localeRegionMap[detectedCountry];
      if (newLocale) {
        // Replace locale in pathname
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] && ['en', 'fr', 'de', 'es'].includes(segments[0])) {
          segments[0] = newLocale;
        } else {
          segments.unshift(newLocale);
        }
        router.push(`/${segments.join('/')}`);
      }
    }
  }, [countryChanged, detectedCountry, router, pathname]);

  return null;
}
```

## Limitations

1. **IP Privacy**: Some users may use VPNs, which will show different countries
2. **Mobile Networks**: IPs can change frequently on mobile networks
3. **Corporate Networks**: Corporate proxies may show different locations
4. **Cookie Deletion**: If cookies are cleared, previous values won't be available

## Testing

To test IP change detection:

1. **Use a VPN**: Connect to a VPN in a different country
2. **Clear Cookies**: Clear cookies and reload to see initial detection
3. **Switch Networks**: Change from WiFi to mobile data
4. **Use DevTools**: Check the `x-ip-changed` and `x-country-changed` headers in Network tab

## API Endpoint

**GET** `/api/location-info`

Returns JSON with current location change information:

```json
{
  "ipChanged": false,
  "countryChanged": true,
  "detectedCountry": "FR",
  "previousCountry": "US",
  "currentIp": "192.168.1.1",
  "previousIp": "10.0.0.1"
}
```

