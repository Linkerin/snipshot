import {
  ButtonGroup,
  FormControl,
  FormHelperText,
  Textarea
} from '@chakra-ui/react';

import CrossCircledIcon from '@/components/Icons/CrossCircledIcon';
import DescriptionBtn from './DescriptionBtn';
import SaveIcon from '@/components/Icons/SaveIcon';

interface DescriptionEditorProps {
  description: string;
  onChange: React.ChangeEventHandler;
  onSave: React.MouseEventHandler;
  toggleEditingMode: React.MouseEventHandler;
  isSaving?: boolean;
}

function DescriptionEditor({
  description,
  onChange,
  onSave,
  isSaving,
  toggleEditingMode
}: DescriptionEditorProps) {
  return (
    <FormControl>
      <Textarea
        id="description"
        name="description"
        value={description}
        onChange={onChange}
        fontSize="xs"
        lineHeight="1.3rem"
        resize="vertical"
        title="No more than 500 symbols of description"
        maxLength={500}
        rows={description.split(/\n|\r/).length + 1}
        py={0}
        px={1}
        variant="flushed"
      />
      <FormHelperText fontSize="0.7rem" textAlign="end">
        {description.length} / 500
      </FormHelperText>
      <ButtonGroup mt={2} gap={1}>
        <DescriptionBtn
          isLoading={isSaving}
          loadingText="Saving..."
          leftIcon={<SaveIcon />}
          onClick={onSave}
        >
          Save description
        </DescriptionBtn>
        <DescriptionBtn
          leftIcon={<CrossCircledIcon />}
          isDisabled={isSaving}
          onClick={toggleEditingMode}
        >
          Cancel
        </DescriptionBtn>
      </ButtonGroup>
    </FormControl>
  );
}

export default DescriptionEditor;
