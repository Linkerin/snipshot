import {
  ButtonGroup,
  FormControl,
  FormHelperText,
  IconButton,
  Textarea
} from '@chakra-ui/react';

import SaveIcon from '@/components/Icons/SaveIcon';
import CrossIcon from '@/components/Icons/CrossCircledIcon';

interface MobileDescriptionEditorProps {
  description: string;
  onChange: React.ChangeEventHandler;
  onSave: React.MouseEventHandler;
  toggleEditingMode: React.MouseEventHandler;
  isSaving?: boolean;
}

function MobileDescriptionEditor({
  description,
  onChange,
  onSave,
  isSaving,
  toggleEditingMode
}: MobileDescriptionEditorProps) {
  return (
    <>
      <FormControl>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          fontSize="sm"
          lineHeight="1.35rem"
          resize="vertical"
          title="No more than 500 symbols of description"
          maxLength={500}
          rows={description.split(/\n|\r/).length + 1}
          p={0}
          variant="flushed"
        />
        <FormHelperText fontSize="0.7rem" textAlign="end">
          {description.length} / 500
        </FormHelperText>
      </FormControl>
      <ButtonGroup
        variant="outline"
        ml={2}
        gap={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <IconButton
          aria-label="Save descripton"
          icon={<SaveIcon />}
          colorScheme="primary-dark-theme"
          isLoading={isSaving}
          onClick={onSave}
        />
        <IconButton
          aria-label="Cancel descripton editing"
          icon={<CrossIcon />}
          colorScheme="red"
          isDisabled={isSaving}
          onClick={toggleEditingMode}
        />
      </ButtonGroup>
    </>
  );
}

export default MobileDescriptionEditor;
