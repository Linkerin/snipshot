import { useContext } from 'react';
import { Box, Collapse, Flex, Text, IconButton } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import EditIcon from '@/components/Icons/EditIcon';
import MobileDescriptionEditor from './MobileDescriptionEditor';
import useUserDescription from '@/hooks/special/useUserDescription';

import DescriptionAlert from '../DescriptionAlert';

function MobileUserDescription({ username }: { username?: string }) {
  const {
    description,
    initialDescription,
    fetchedUserId,
    isEditing,
    isLoading,
    isSaving,
    toggleEditingMode,
    handleChange,
    handleSave,
    error
  } = useUserDescription(username);
  const user = useContext(AuthContext);

  return (
    <Collapse in={!isLoading}>
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        w="100%"
        mb={2}
        pl={1}
      >
        {!isEditing && initialDescription && (
          <Box>
            {initialDescription.split(/\n|\r/).map((paragraph, i) => (
              <Text key={i} fontSize="sm">
                {paragraph}
              </Text>
            ))}
          </Box>
        )}

        {!isEditing && user?.id === fetchedUserId && (
          <>
            {!initialDescription && (
              <Text fontSize="xs" fontStyle="italic" color="text-secondary">
                Do you want to write something about yourself here?
              </Text>
            )}
            <IconButton
              aria-label="Edit description"
              icon={<EditIcon />}
              variant="ghost"
              onClick={toggleEditingMode}
              size={{ base: 'md', sm: 'lg' }}
            />
          </>
        )}
        {user?.id === fetchedUserId && isEditing && (
          <MobileDescriptionEditor
            description={description}
            onChange={handleChange}
            onSave={handleSave}
            toggleEditingMode={toggleEditingMode}
            isSaving={isSaving}
          />
        )}
      </Flex>
      {!!error && <DescriptionAlert error={error} my={2} />}
    </Collapse>
  );
}

export default MobileUserDescription;
