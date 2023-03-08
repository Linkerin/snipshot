import React, { createContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import supabase from '@/services/supabase';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const user = parseUserInfo(sessionData.session);

        if (!user) {
          setUser(null);
          setIsLoading(false);
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

        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
      {/* {isLoading ? <SnipshotLogoLoader /> : children} */}
    </AuthContext.Provider>
  );
};
