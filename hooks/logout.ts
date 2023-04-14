import { useCallback } from 'react';

function useLogout() {
  const handleLogout = useCallback(async (e: React.MouseEvent) => {
    try {
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.error('Error while logging out', { err });
    }
  }, []);

  return handleLogout;
}

export default useLogout;
