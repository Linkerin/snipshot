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
  useColorModeValue
} from '@chakra-ui/react';

import SaveIcon from '@/components/Icons/SaveIcon';
import TickIcon from '@/components/Icons/TickIcon';
import useActionConfirmation from '@/hooks/useActionConfirmation';
import useChangeUsername from '@/hooks/forPages/useChangeUsername';
import useTrottling from '@/hooks/useTrottling';

function ChangeUsername() {
  const {
    inputUsername,
    error,
    helper,
    validUsername,
    isSaving,
    checkNewUsername,
    handleChange,
    handleSave
  } = useChangeUsername();
  const { showConfirmation, toggleConfirmation } = useActionConfirmation();

  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );
  const tickIconColor = useColorModeValue('secondary', 'primary');

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
                <TickIcon color={tickIconColor} boxSize={6} />
              </InputRightElement>
            )}
          </InputGroup>
          {!showConfirmation && (
            <Button
              leftIcon={<SaveIcon />}
              variant="outline"
              colorScheme={btnColor}
              isDisabled={!validUsername}
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
            Looks like &lsquo;{inputUsername}&rsquo; is available
          </Text>
        )}
      </FormControl>
    </Flex>
  );
}

export default ChangeUsername;
