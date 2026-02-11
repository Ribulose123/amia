import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * API route to get current location/IP change information
 * This reads the cookies set by middleware
 */
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  
  const detectedCountry = cookieStore.get('amia-detected-country')?.value || null;
  const currentIp = cookieStore.get('amia-detected-ip')?.value || null;

  // Get previous values from request headers (set by middleware)
  const previousCountry = request.headers.get('x-previous-country') || null;
  const previousIp = request.headers.get('x-previous-ip') || null;
  
  const ipChanged = request.headers.get('x-ip-changed') === 'true';
  const countryChanged = request.headers.get('x-country-changed') === 'true';

  return NextResponse.json({
    ipChanged,
    countryChanged,
    detectedCountry,
    previousCountry: previousCountry === 'none' ? null : previousCountry,
    currentIp,
    previousIp: previousIp === 'none' ? null : previousIp,
  });
}

