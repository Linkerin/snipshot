import React, { createContext, useEffect, useState } from 'react';
import { log } from 'next-axiom';
import type { Session, Subscription } from '@supabase/supabase-js';

interface AuthProviderProps {
  children: React.ReactElement;
}

interface UserState {
  id: string;
  email?: string;
  role?: string;
  username?: string;
  provider?: string;
  avatar?: string;
  registered?: string;
  appRole?: Array<'user' | 'admin'>;
}

/**
 * Create a custom user object with necessary data from user object
 * returned by Supabase
 * @param session Supabase session data
 * @returns user object for Context API
 */
function parseUserInfo(session: Session | null): UserState | null {
  if (session?.user) {
    return {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
      username: session.user.user_metadata?.user_name,
      provider: session.user.app_metadata?.provider,
      avatar: session.user.user_metadata?.avatar_url
    };
  }

  return null;
}

export const AuthContext = createContext<UserState | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserState | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const user = parseUserInfo(sessionData.session);

        if (!user) {
          setUser(null);
          return;
        }

        setUser(user);

        const { data, error } = await supabase
          .from('users_roles')
          .select('roles')
          .match({ id: user?.id })
          .limit(1)
          .single();
        if (error) throw error;
        if (!data) return;

        setUser(prevState => {
          if (prevState === null) return prevState;

          return { ...prevState, appRole: data.roles };
        });
      } catch (err) {
        log.error('AuthContext: getting user info', { err });
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    let listener: Subscription;

    const setListener = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          let user;
          switch (event) {
            case 'SIGNED_IN':
              user = parseUserInfo(session);
              user ? setUser(user) : setUser(null);
              break;

            case 'USER_UPDATED':
              user = parseUserInfo(session);
              user ? setUser(user) : setUser(null);
              break;

            case 'SIGNED_OUT':
              setUser(null);
              break;

            case 'USER_DELETED':
              setUser(null);
              break;

            default:
              break;
          }
        });

        listener = data.subscription;
      } catch (err) {
        log.error('AuthContext: creating change subscription', { err });
      }

      return;
    };

    setListener();

    return () => listener?.unsubscribe();
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
