import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Box, Collapse, Flex, Text, IconButton } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import DescriptionAlert from '@/components/UserInfo/DescriptionAlert';
import EditIcon from '@/components/Icons/EditIcon';
import MobileDescriptionEditor from './MobileDescriptionEditor';
import useUserDescription from '@/hooks/forPages/useUserDescription';

const NoDescriptionPlaceholder = dynamic(
  () => import('@/components/UserInfo/NoDescriptionPlaceholder')
);

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
  const [user] = useContext(AuthContext);

  return (
    <Collapse in={!isLoading}>
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        w="100%"
        mb={2}
        pl={4}
        pr={3}
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
            {!initialDescription && <NoDescriptionPlaceholder />}
            <IconButton
              aria-label="Edit description"
              icon={<EditIcon />}
              variant="ghost"
              onClick={toggleEditingMode}
              size="lg"
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
