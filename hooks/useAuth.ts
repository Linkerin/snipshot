import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../context/AuthContext';

/**
 * Hook that returns an authorization value and set method from the Context
 * and redirects unauthorized users to `/` or `/login` routes
 * @param redirectHome If `true` authorized user redirects to `/` route,
 *                     otherwise to `/login`
 * @returns Authorization status as `auth` value and `setAuth` function from the Context
 * @example const user = useAuth(true) // redirects to home page if authorized
 */
export default function useAuth(redirectHome?: boolean) {
  const user = useContext(AuthContext);
  const router = useRouter();

  // if `redirectHome` is true, authorized users will be redirected to '/' route
  const home = !!redirectHome;

  // redirect to '/login' route is always opposite to `home` redirect
  const login = !home;

  useEffect(() => {
    const checkForRedirect = () => {
      if (user?.id) {
        home && typeof window !== undefined && router.push('/');
        return;
      }

      login && typeof window !== undefined && router.push('/login');
    };

    checkForRedirect();
  }, [user, router, home, login]);

  return user;
}
