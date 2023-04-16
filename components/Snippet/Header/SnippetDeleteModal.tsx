import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import SnippetContext from '@/context/SnippetContext';

interface SnippetDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SnippetDeleteModal({ isOpen, onClose }: SnippetDeleteModalProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { id, author, title } = useContext(SnippetContext);

  const router = useRouter();

  const toast = useToast();
  const cancelBtnColor = useColorModeValue(
    'secondary-light-theme',
    'primary-dark-theme'
  );

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();

    try {
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      // Check whether the current user is the creator
      const userId = sessionData.session?.user?.id;
      if (userId !== author.id) {
        toast({
          title: 'Something went wrong',
          description:
            'Ooops, seems like you are not the creator of this snippet',
          status: 'warning',
          duration: 4000
        });
        setIsRemoving(false);
        onClose();

        return;
      }

      setIsRemoving(true);

      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      if (error) throw error;

      onClose();
      // Go to main page if the snippet was deleted from its page
      if (router.asPath.split('/snippets/')[0] === '') {
        router.push('/');
      }

      toast({
        title: 'Snippet deleted',
        description: `Snippet '${title}' was permanently deleted`,
        status: 'success',
        duration: 3000
      });
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.error('Error while deleting snippet', {
        snippetId: id,
        timestamp: Date.now(),
        err
      });
      toast({
        title: 'An error occured',
        description: 'Something went wrong. Please, try again later',
        status: 'error',
        duration: 3000
      });
      onClose();

      return;
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'xs', md: 'md' }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody mt={4}>
          <Text mb={1}>Are you sure that you want to delete the snippet?</Text>
          <Text fontWeight="bold">This action can&apos;t be undone.</Text>
        </ModalBody>
        <ModalFooter as={ButtonGroup} variant="outline" spacing={4}>
          <Button
            aria-label="Delete snippet"
            colorScheme="red"
            isLoading={isRemoving}
            loadingText="Deleting..."
            onClick={handleDelete}
          >
            Delete snippet
          </Button>
          <Button
            aria-label="Close delete confirmation"
            colorScheme={cancelBtnColor}
            isDisabled={isRemoving}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SnippetDeleteModal;
