import React, {
  createContext,
  startTransition,
  useCallback,
  useEffect,
  useState
} from 'react';
import type {
  Session,
  Subscription,
  SupabaseClient
} from '@supabase/supabase-js';

interface AuthProviderProps {
  children: React.ReactElement;
}

interface UserState {
  id: string;
  username?: string;
  avatar?: string;
  registered?: string;
  appRole?: Array<'user' | 'admin'>;
}

interface RetrieveUserDataParams {
  userId: string;
  supabase: SupabaseClient;
  signal: AbortSignal;
}

/**
 * Fetch Supabase for user's info
 * @returns null in case there are no records in the database or UserData
 */
async function retrieveUserData({
  userId,
  supabase,
  signal
}: RetrieveUserDataParams) {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `id,
       name,
       avatar,
       created,
       users_roles (
         roles
      )`
    )
    .eq('id', userId)
    .abortSignal(signal)
    .limit(1);
  if (error) throw error;
  if (data.length === 0) return null;

  return data[0];
}

type UserData = Awaited<ReturnType<typeof retrieveUserData>>;
/**
 * Create a custom user object with necessary data from user object
 * returned by Supabase
 * @returns user object for Context API
 */
function parseUserInfo(userData: UserData): UserState | null {
  if (userData && userData?.id) {
    return {
      id: userData.id,
      username: userData.name,
      avatar: userData.avatar,
      registered: userData.created,
      appRole:
        Array.isArray(userData.users_roles) && userData.users_roles[0]?.roles
    };
  }

  return null;
}

export const AuthContext = createContext<
  [UserState | null, (action: 'delete' | 'update') => Promise<void>] | []
>([]);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserState | null>(null);

  const handleUserUpdate = useCallback(
    async (
      session: Session | null,
      signal: AbortSignal,
      supabase: SupabaseClient
    ) => {
      if (!session?.user.id) {
        startTransition(() => {
          setUser(null);
        });
        return;
      }

      const userState = parseUserInfo(
        await retrieveUserData({
          userId: session.user.id,
          signal,
          supabase
        })
      );

      startTransition(() => {
        userState ? setUser(userState) : setUser(null);
      });
    },
    []
  );

  const userStateAction = useCallback(
    async (action: 'delete' | 'update') => {
      try {
        const controller = new AbortController();
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        switch (action) {
          case 'update':
            await handleUserUpdate(
              sessionData.session,
              controller.signal,
              supabase
            );
            break;

          case 'delete':
            setUser(null);
            break;

          default:
            break;
        }
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error(`AuthStateAction: ${action} failed`, { err });
      }
    },
    [handleUserUpdate]
  );

  useEffect(() => {
    const controller = new AbortController();
    const getUserInfo = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        await handleUserUpdate(
          sessionData.session,
          controller.signal,
          supabase
        );
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('AuthContext: getting user info', { err });
      }
    };

    getUserInfo();

    return () => controller.abort();
  }, [handleUserUpdate]);

  useEffect(() => {
    let listener: Subscription;
    const controller = new AbortController();

    const setListener = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;

        const { data } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            try {
              switch (event) {
                case 'SIGNED_IN':
                  await handleUserUpdate(session, controller.signal, supabase);
                  break;

                case 'USER_UPDATED':
                  await handleUserUpdate(session, controller.signal, supabase);
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
            } catch (err) {
              const log = (await import('next-axiom')).log;
              log.error('AuthContext: error while handling state change', {
                err
              });
            }
          }
        );

        listener = data.subscription;
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('AuthContext: creating change subscription', { err });
      }

      return;
    };

    setListener();

    return () => {
      listener?.unsubscribe();
      controller.abort();
    };
  }, [handleUserUpdate]);

  return (
    <AuthContext.Provider value={[user, userStateAction]}>
      {children}
    </AuthContext.Provider>
  );
};
