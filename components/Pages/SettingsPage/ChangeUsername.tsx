import { useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import SaveIcon from '@/components/Icons/SaveIcon';
import TickIcon from '@/components/Icons/TickIcon';
import useActionConfirmation from '@/hooks/useActionConfirmation';
import useTrottling from '@/hooks/useTrottling';

function ChangeUsername() {
  const user = useContext(AuthContext);
  const [inputUsername, setInputUsername] = useState(user?.username ?? '');
  const [validUsername, setValidUsername] = useState(false);
  const [helper, setHelper] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const disabled = useMemo(() => {
    return (
      inputUsername === user?.username ||
      inputUsername.length === 0 ||
      !!error ||
      !!helper
    );
  }, [inputUsername, user?.username, error, helper]);

  const { showConfirmation, toggleConfirmation } = useActionConfirmation();
  const router = useRouter();
  const toast = useToast();

  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
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
  };

  const handleSave = useCallback(async () => {
    if (disabled || !validUsername) return;
    if (!inputUsername || inputUsername === user?.username) return;

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

      router.push(`/users/${encodeURIComponent(inputUsername)}`);
      setValidUsername(false);
      toast({
        description: 'New username was saved',
        status: 'success',
        duration: 3000
      });
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
  }, [disabled, inputUsername, validUsername, user?.username, router, toast]);

  const checkNewUsername = useCallback(async () => {
    setValidUsername(false);
    if (disabled) return;

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
  }, [disabled, inputUsername]);

  useTrottling(checkNewUsername, inputUsername, 400);

  return (
    <Flex direction="column" gap={2}>
      <Heading size="md" fontWeight="normal">
        Change name
      </Heading>
      <Text fontSize="sm">
        You may change your username here if the one you prefer is not occupied
        by another user.
      </Text>
      <FormControl isInvalid={!!error}>
        <Flex alignItems="center" justifyContent="flex-start" gap={2}>
          <InputGroup w={{ base: '100%', lg: '50%' }}>
            <Input
              placeholder="New username"
              name="username"
              value={inputUsername}
              onChange={handleChange}
            />
            {validUsername && (
              <InputRightElement>
                <TickIcon color="primary" boxSize={6} />
              </InputRightElement>
            )}
          </InputGroup>
          {!showConfirmation && (
            <Button
              leftIcon={<SaveIcon />}
              variant="outline"
              colorScheme={btnColor}
              isDisabled={!validUsername}
              // isLoading={isSaving}
              // loadingText="Saving..."
              onClick={toggleConfirmation}
            >
              Save
            </Button>
          )}
          {showConfirmation && (
            <ButtonGroup gap={1} variant="outline">
              <Button
                colorScheme="green"
                variant="outline"
                isLoading={isSaving}
                loadingText="Saving..."
                onClick={handleSave}
              >
                Confirm
              </Button>
              <Button
                colorScheme="red"
                isDisabled={isSaving}
                onClick={toggleConfirmation}
              >
                Cancel
              </Button>
            </ButtonGroup>
          )}
        </Flex>
        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          <FormHelperText>{helper}</FormHelperText>
        )}
        {validUsername && (
          <Text color="primary" fontSize="sm">
            Looks like &lsquo;{inputUsername}&rsquo; name is available
          </Text>
        )}
      </FormControl>
    </Flex>
  );
}

export default ChangeUsername;
