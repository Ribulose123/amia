import { NextRequest, NextResponse } from 'next/server';
import { i18n, localeRegionMap } from './src/config/i18n';

// Cookie names for tracking IP/location changes
const COUNTRY_COOKIE = 'amia-detected-country';
const IP_COOKIE = 'amia-detected-ip';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignore static assets, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // Get current IP address (if available)
  // Note: request.ip is not available in NextRequest type, so we rely on headers
  const currentIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-client-ip') ||
    'unknown';

  // Detect country from headers (Vercel/Cloudflare Edge)
  // Note: request.geo is available at runtime on Vercel/Cloudflare but not in types
  const country =
    (request as any).geo?.country ||
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    'US';

  // Get previous country and IP from cookies
  const previousCountry = request.cookies.get(COUNTRY_COOKIE)?.value;
  const previousIp = request.cookies.get(IP_COOKIE)?.value;

  // Detect if IP or country has changed
  const ipChanged = previousIp && previousIp !== 'unknown' && previousIp !== currentIp;
  const countryChanged = previousCountry && previousCountry !== country;

  // Map country to locale
  const locale = localeRegionMap[country] || i18n.defaultLocale;

  // Check if URL already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Create response
  let response: NextResponse;

  if (pathnameHasLocale) {
    // URL already has locale, just update cookies and add headers
    response = NextResponse.next();
  } else {
    // Redirect to locale-prefixed URL
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    response = NextResponse.redirect(url);
  }

  // Set cookies to track current country and IP
  response.cookies.set(COUNTRY_COOKIE, country, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  response.cookies.set(IP_COOKIE, currentIp, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  // Add custom headers to indicate changes (can be read by client-side code)
  response.headers.set('x-ip-changed', ipChanged ? 'true' : 'false');
  response.headers.set('x-country-changed', countryChanged ? 'true' : 'false');
  response.headers.set('x-detected-country', country);
  response.headers.set('x-previous-country', previousCountry || 'none');
  response.headers.set('x-current-ip', currentIp);
  response.headers.set('x-previous-ip', previousIp || 'none');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts, etc. (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

