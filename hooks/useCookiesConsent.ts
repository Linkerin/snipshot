import { useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';
import NextLocalStorage from '@/services/NextLocalStorage';

/**
 * Hook that handles cookies consent modal state
 * @returns An onject with 2 properties: boolean `showConsent`
 * and a callback function `acceptCookiesHandler` to close the modal
 */
function useCookiesConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [user] = useContext(AuthContext);

  const acceptCookiesHandler = useCallback(() => {
    NextLocalStorage.setItem('cookiesConsent', 'true');
    setShowConsent(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageConsent = NextLocalStorage.getItem('cookiesConsent');

      setShowConsent(!(user?.id || storageConsent === 'true'));

      if (user?.id && storageConsent !== 'true') {
        NextLocalStorage.setItem('cookiesConsent', 'true');
        setShowConsent(false);
      }
    }
  }, [user?.id]);

  return { showConsent, acceptCookiesHandler };
}

export default useCookiesConsent;
