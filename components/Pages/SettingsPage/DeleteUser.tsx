import { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Highlight,
  Text,
  useToast
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { DeviceContext } from '@/context/DeviceContext';
import useActionConfirmation from '@/hooks/useActionConfirmation';

function DeleteUser() {
  const [isRemoving, setIsRemoving] = useState(false);

  const { showConfirmation, toggleConfirmation } = useActionConfirmation();
  const { isMobile } = useContext(DeviceContext);
  const [user, userAction] = useContext(AuthContext);

  const router = useRouter();
  const toast = useToast();

  const handleDelete: React.MouseEventHandler = useCallback(
    async e => {
      e.preventDefault;
      if (!user?.id) return;
      try {
        setIsRemoving(true);
        const supabase = (await import('@/services/supabase/supabase')).default;
        const { error } = await supabase.functions.invoke('delete-user');
        if (error) throw error;

        userAction && userAction('delete');
        typeof window !== 'undefined' && (await router.push('/'));
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('Error while removing user account', { err });
        toast({
          description: 'Something went wrong. Deletion was not completed',
          status: 'error',
          duration: 4000
        });
      } finally {
        setIsRemoving(false);
        toggleConfirmation();
      }
    },
    [router, toast, user?.id, toggleConfirmation, userAction]
  );

  return (
    <Flex direction="column" gap={2}>
      <Heading size="md" fontWeight="normal" color="red.500">
        Delete account
      </Heading>
      <Text fontSize="sm">
        Once you delete your account, it won&lsquo;t be possible to restore it.
        <br />
        Your profile, likes, dislikes and all the comments you posted will be
        permanently deleted.
        <br />
        <Highlight
          query="&lsquo;anonymous&rsquo;"
          styles={{ fontStyle: 'italic', color: 'primary' }}
        >
          However, public snippets that you created will remain under
          &lsquo;anonymous&rsquo; name.
        </Highlight>
      </Text>
      {!showConfirmation && (
        <Button
          colorScheme="red"
          width="fit-content"
          onClick={toggleConfirmation}
        >
          Delete your account
        </Button>
      )}
      {showConfirmation && !isMobile && (
        <ButtonGroup gap={3}>
          <Button
            colorScheme="green"
            isDisabled={isRemoving}
            onClick={toggleConfirmation}
          >
            Cancel deletion
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            isLoading={isRemoving}
            loadingText="Deleting..."
            onClick={handleDelete}
          >
            Confirm permanent deletion
          </Button>
        </ButtonGroup>
      )}
      {showConfirmation && isMobile && (
        <ButtonGroup gap={3}>
          <Button
            colorScheme="red"
            variant="outline"
            isLoading={isRemoving}
            loadingText="Deleting..."
            onClick={handleDelete}
          >
            Confirm deletion
          </Button>
          <Button
            colorScheme="green"
            isDisabled={isRemoving}
            minWidth="40%"
            onClick={toggleConfirmation}
          >
            Cancel
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
}

export default DeleteUser;
