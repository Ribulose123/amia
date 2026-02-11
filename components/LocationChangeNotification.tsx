'use client';

import { useEffect, useState } from 'react';
import { useLocationChange } from '@/src/lib/useLocationChange';
import { X, MapPin, AlertCircle } from 'lucide-react';

/**
 * Component that shows a notification when user's location/IP changes
 * Useful for detecting VPN usage, travel, or network changes
 */
export function LocationChangeNotification() {
  const { ipChanged, countryChanged, detectedCountry, previousCountry } = useLocationChange();
  const [showNotification, setShowNotification] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ((ipChanged || countryChanged) && !dismissed) {
      setShowNotification(true);
      
      // Auto-dismiss after 10 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [ipChanged, countryChanged, dismissed]);

  if (!showNotification || dismissed) {
    return null;
  }

  const getMessage = () => {
    if (countryChanged) {
      return `We detected you're now in ${detectedCountry} (previously ${previousCountry}). Would you like to switch languages?`;
    }
    if (ipChanged) {
      return 'We detected a change in your network connection.';
    }
    return null;
  };

  const message = getMessage();
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-5">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 flex items-start gap-3">
        <div className="flex-shrink-0">
          {countryChanged ? (
            <MapPin className="w-5 h-5 text-blue-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setDismissed(true);
            setShowNotification(false);
          }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

