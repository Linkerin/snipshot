import { useCallback, useContext, useState } from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import SnippetContext from '@/context/SnippetContext';

interface SnippetReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SnippetReportModal({ isOpen, onClose }: SnippetReportModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [report, setReport] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { id: snippetId } = useContext(SnippetContext);
  const [user] = useContext(AuthContext);

  const toast = useToast();
  const backBtnColor = useColorModeValue(
    'secondary-light-theme',
    'secondary-dark-theme'
  );
  const sendBtnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );

  const resetStates = useCallback(() => {
    setIsSending(false);
    setReport('');
    setErrorMsg('');
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(e => {
      e.preventDefault();
      setErrorMsg('');

      let { name, value } = e.target;
      if (name !== 'report') return;

      setReport(value);

      return;
    }, []);

  const handleReportSend: React.MouseEventHandler<
    HTMLButtonElement
  > = async e => {
    e.preventDefault();

    try {
      setErrorMsg('');
      if (!snippetId) {
        toast({
          description: 'The snippet was not identified',
          status: 'warning',
          duration: 3000
        });
        setReport('');
        onClose();

        return;
      }

      setIsSending(true);
      const fetchIsPostingAllowed = (
        await import('@/services/redis/services/fetchIsPostingAllowed')
      ).default;
      const postingPermission = await fetchIsPostingAllowed(user?.id);

      if (!postingPermission.allowed) {
        setErrorMsg(postingPermission.message);
        return;
      }

      const supabase = (await import('@/services/supabase/supabase')).default;

      const { error } = await supabase.from('reports').insert({
        snippet_id: snippetId,
        from_user_id: user?.id ?? null,
        report
      });

      if (error) throw error;

      setReport('');
      onClose();

      toast({
        description: 'Thanks! Your report was sent.',
        status: 'success',
        duration: 3000
      });
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.error('Error while posting report on snippet', {
        snippetId,
        timestamp: Date.now(),
        err
      });
      toast({
        title: 'An error occured',
        description: 'Something went wrong. Please, try again later',
        status: 'error',
        duration: 3000
      });
      setErrorMsg('The report was not send');

      return;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => resetStates()}
      size={{ base: 'xs', md: 'md' }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody mt={4}>
          <Text ml={4}>
            Please let us know if you find this snippet wrong, offensive,
            malicious or in any way inappropriate.
          </Text>
          <Text ml={4}>Thank you!</Text>
          <FormControl mt={4} isInvalid={!!errorMsg}>
            <FormLabel ml={4} fontSize="sm">
              Issue details (if applicable)
            </FormLabel>
            <Textarea
              id="report"
              name="report"
              placeholder="If you have any notes for us, please type them here"
              title="No more than 256 symbols"
              onChange={handleChange}
              value={report}
              maxLength={256}
              resize="none"
              rows={4}
            />
            {errorMsg ? (
              <FormErrorMessage ml={4}>{errorMsg}</FormErrorMessage>
            ) : (
              <FormHelperText fontSize="xs" textAlign="end">
                {report.length} / 256
              </FormHelperText>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter as={ButtonGroup} variant="outline" spacing={4}>
          <Button
            aria-label="Send the report"
            colorScheme={sendBtnColor}
            isLoading={isSending}
            onClick={handleReportSend}
          >
            Send
          </Button>
          <Button
            aria-label="Close the modal window"
            colorScheme={backBtnColor}
            isDisabled={isSending}
            onClick={onClose}
          >
            Go back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SnippetReportModal;
