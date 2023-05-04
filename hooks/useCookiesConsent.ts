import { useCallback, useEffect, useState } from 'react';

import NextLocalStorage from '@/services/NextLocalStorage';

/**
 * Hook that handles cookies consent modal state
 * @returns An onject with 2 properties: boolean `showConsent`
 * and a callback function `acceptCookiesHandler` to close the modal
 */
function useCookiesConsent() {
  const [showConsent, setShowConsent] = useState(false);

  const acceptCookiesHandler = useCallback(() => {
    NextLocalStorage.setItem('cookiesConsent', 'true');
    setShowConsent(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowConsent(!(NextLocalStorage.getItem('cookiesConsent') === 'true'));
    }
  }, []);

  return { showConsent, acceptCookiesHandler };
}

export default useCookiesConsent;
