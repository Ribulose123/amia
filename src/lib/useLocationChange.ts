'use client';

import { useEffect, useState } from 'react';

interface LocationChangeInfo {
  ipChanged: boolean;
  countryChanged: boolean;
  detectedCountry: string | null;
  previousCountry: string | null;
  currentIp: string | null;
  previousIp: string | null;
}

/**
 * Hook to detect if user's IP address or country has changed
 * Reads headers set by middleware
 */
export function useLocationChange() {
  const [locationInfo, setLocationInfo] = useState<LocationChangeInfo>({
    ipChanged: false,
    countryChanged: false,
    detectedCountry: null,
    previousCountry: null,
    currentIp: null,
    previousIp: null,
  });

  useEffect(() => {
    // This will only work on the client side after navigation
    // For initial detection, we need to check on mount
    const checkLocationChange = () => {
      // Note: Headers are only available in Server Components/Middleware
      // For client-side detection, we can use cookies or make an API call
      
      // Check cookies set by middleware
      const detectedCountry = document.cookie
        .split('; ')
        .find((row) => row.startsWith('amia-detected-country='))
        ?.split('=')[1] || null;

      const currentIp = document.cookie
        .split('; ')
        .find((row) => row.startsWith('amia-detected-ip='))
        ?.split('=')[1] || null;

      // Store previous values in sessionStorage for comparison
      const previousCountry = sessionStorage.getItem('previous-country');
      const previousIp = sessionStorage.getItem('previous-ip');

      const ipChanged = !!(previousIp && previousIp !== 'unknown' && previousIp !== currentIp);
      const countryChanged = !!(previousCountry && previousCountry !== detectedCountry);

      setLocationInfo({
        ipChanged,
        countryChanged,
        detectedCountry,
        previousCountry,
        currentIp,
        previousIp,
      });

      // Update sessionStorage with current values
      if (detectedCountry) {
        sessionStorage.setItem('previous-country', detectedCountry);
      }
      if (currentIp) {
        sessionStorage.setItem('previous-ip', currentIp);
      }
    };

    checkLocationChange();

    // Check periodically (every 30 seconds) for changes
    const interval = setInterval(checkLocationChange, 30000);

    return () => clearInterval(interval);
  }, []);

  return locationInfo;
}

/**
 * API route helper to get location change info from headers
 * Call this from a Server Component or API route
 */
export async function getLocationChangeInfo(): Promise<LocationChangeInfo> {
  try {
    const response = await fetch('/api/location-info', {
      cache: 'no-store',
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch location info:', error);
  }

  return {
    ipChanged: false,
    countryChanged: false,
    detectedCountry: null,
    previousCountry: null,
    currentIp: null,
    previousIp: null,
  };
}

