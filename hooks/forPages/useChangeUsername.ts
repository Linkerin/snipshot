import { useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';

/**
 * Hook that processes all the functionality of changing a username like
 * input validation, username availability check, saving to the DB,
 * showing error and helper messages.
 * @returns An object with relevant state values and handler functions
 * @example
 * const {
 *   inputUsername,
 *   error,
 *   helper,
 *   validUsername,
 *   isSaving,
 *   checkNewUsername,
 *   handleChange,
 *   handleSave
 * } = useChangeUsername();
 */
function useChangeUsername() {
  const [user, userAction] = useContext(AuthContext);

  const [inputUsername, setInputUsername] = useState(user?.username ?? '');
  const [validUsername, setValidUsername] = useState(false);
  const [helper, setHelper] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const incorrectInput = useMemo(() => {
    return (
      inputUsername === user?.username ||
      inputUsername.length === 0 ||
      !!error ||
      !!helper
    );
  }, [inputUsername, user?.username, error, helper]);

  const router = useRouter();
  const toast = useToast();

  /**
   * Handler for username's input `onChange` event.
   */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      e.preventDefault();
      const { name, value } = e.target;
      if (name !== 'username') return;

      setHelper('');
      setError('');
      setValidUsername(false);
      const newValue = value.trim();

      if (newValue === user?.username) {
        setHelper('Nice, you may keep your username ☺️');
        setValidUsername(false);
      }
      if (!newValue) {
        setHelper("Username can't be empty");
        setValidUsername(false);
      }

      setInputUsername(newValue);
    },
    [user?.username]
  );

  /**
   * DB query to check whether the provided username is available
   */
  const checkNewUsername = useCallback(async () => {
    setValidUsername(false);
    if (incorrectInput) return;

    try {
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { count, error } = await supabase
        .from('profiles')
        .select('name', { count: 'exact', head: true })
        .eq('name', inputUsername);
      if (error) throw error;
      if (count === null) return;
      if (count && count > 0) {
        setError(
          `Name '${inputUsername}' is not available. Please, try something else`
        );
        return;
      }
      setError('');
      setHelper('');
      setValidUsername(true);
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.error('Error while fetching supabase for new username check', {
        err
      });
    }
  }, [incorrectInput, inputUsername]);

  /**
   * Process recording of a new username to the DB
   */
  const handleSave = useCallback(async () => {
    if (incorrectInput || !validUsername) return;

    try {
      setIsSaving(true);
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      const userId = sessionData.session?.user.id;
      if (!userId) throw new Error('The user is not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ name: inputUsername, updated: new Date() })
        .eq('id', userId);
      if (error) throw error;

      toast({
        description: 'New username was saved',
        status: 'success',
        duration: 3000
      });
      userAction && userAction('update');
      await router.push(`/users/${encodeURIComponent(inputUsername)}`);
      setValidUsername(false);
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.error('Error while recording new username', {
        err,
        original: user?.username,
        new: inputUsername
      });
    } finally {
      setIsSaving(false);
    }
  }, [
    incorrectInput,
    inputUsername,
    validUsername,
    user?.username,
    userAction,
    router,
    toast
  ]);

  return {
    inputUsername,
    error,
    helper,
    validUsername,
    isSaving,
    checkNewUsername,
    handleChange,
    handleSave
  };
}

export default useChangeUsername;
