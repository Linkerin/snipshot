import { useEffect } from 'react';

/**
 * Service worker registration hook
 */
function useRegisterServiceWorker() {
  useEffect(() => {
    const registerSW = async () => {
      if (navigator && 'serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
        } catch (err) {
          const log = (await import('next-axiom')).log;
          log.error('Service worker was not registered', { err });
        }
      }
    };

    registerSW();
  }, []);
}

export default useRegisterServiceWorker;
