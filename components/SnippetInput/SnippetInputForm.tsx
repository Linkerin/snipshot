import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Input,
  Textarea,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';

import LangsSelectInput from './LangsSelectInput';
import SnippetFormLabel from './SnippetFormLabel';
import { SnippetTagsListProps } from '@/components/Snippet/Card/Footer/SnippetTagsList';
import useButtonDisabled from '@/hooks/useButtonDisabled';
import { UserInput } from '@/hooks/forPages/useSnippetInputHandler';

const SnippetTagsList = dynamic(
  () => import('@/components/Snippet/Card/Footer/SnippetTagsList'),
  { ssr: false }
);

interface SnippetInputFormProps extends SnippetTagsListProps {
  userInput: UserInput;
  inputHelpers: UserInput;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  isUploading: boolean;
}

function SnippetInputForm({
  userInput,
  inputHelpers,
  onChange,
  onSave,
  isUploading,
  tags,
  handleTagDelete
}: SnippetInputFormProps) {
  const disabledSaveBtn = useButtonDisabled(userInput, ['tag']);
  const saveBtnColor = useColorModeValue(
    'secondary-light-theme',
    'primary-dark-theme'
  );
  const backBtnColor = useColorModeValue(
    'primary-light-theme',
    'secondary-dark-theme'
  );

  const router = useRouter();

  const handleBackClick: React.MouseEventHandler = e => {
    e.preventDefault();
    router.back();
    return;
  };

  return (
    <VStack as="form" autoComplete="off" spacing={3} role="form">
      <FormControl isRequired>
        <SnippetFormLabel label="Title" mb={0} />
        <Input
          id="title"
          name="title"
          title="No more than 50 symbols"
          onChange={onChange}
          value={userInput.title}
          variant="flushed"
          maxLength={50}
          autoFocus
          px={4}
        />
        {!!inputHelpers.title && (
          <FormHelperText>{inputHelpers.title}</FormHelperText>
        )}
      </FormControl>
      <FormControl isRequired>
        <SnippetFormLabel label="Code Snippet" mb={1} />
        <Textarea
          id="snippet"
          name="snippet"
          title="No more than 10 rows of 80 symbols"
          onChange={onChange}
          value={userInput.snippet}
          maxLength={818}
          resize="none"
          rows={5}
        />
        {!!inputHelpers.snippet && (
          <FormHelperText>{inputHelpers.snippet}</FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <SnippetFormLabel label="Tags (separated by `Space`)" mb={1} />
        <Input
          id="tag"
          name="tag"
          title="No more than 10 tags"
          onChange={onChange}
          value={userInput.tag}
          size={{ base: 'lg', lg: 'md' }}
          maxLength={33}
        />
        {!!inputHelpers.tag && (
          <FormHelperText>{inputHelpers.tag}</FormHelperText>
        )}
      </FormControl>
      {tags && tags.length > 0 && (
        <SnippetTagsList tags={tags} handleTagDelete={handleTagDelete} />
      )}
      <LangsSelectInput onChange={onChange} langValue={userInput.lang} />
      <ButtonGroup w="100%">
        <Button
          onClick={handleBackClick}
          isDisabled={isUploading}
          colorScheme={backBtnColor}
          variant="outline"
          w="35%"
        >
          Go back
        </Button>
        <Button
          isDisabled={disabledSaveBtn}
          onClick={onSave}
          isLoading={isUploading}
          loadingText="Saving..."
          colorScheme={saveBtnColor}
          variant="outline"
          w="65%"
        >
          Save
        </Button>
      </ButtonGroup>
    </VStack>
  );
}

export default SnippetInputForm;
