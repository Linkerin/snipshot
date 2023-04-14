import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Box, Text } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import DescriptionAlert from '@/components/UserInfo/DescriptionAlert';
import DescriptionBtn from './DescriptionBtn';
import EditIcon from '@/components/Icons/EditIcon';
import useUserDescription from '@/hooks/forPages/useUserDescription';

const DescriptionEditor = dynamic(() => import('./DescriptionEditor'));

function UserDescription({ username }: { username: string | undefined }) {
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

  return isLoading ? (
    <></>
  ) : (
    <Box mt={5}>
      {!isEditing &&
        initialDescription &&
        initialDescription.split(/\n|\r/).map((paragraph, i) => (
          <Text key={i} fontSize="xs" lineHeight="1.3rem" px={1}>
            {paragraph}
          </Text>
        ))}
      {!isEditing && user?.id === fetchedUserId && (
        <>
          {!initialDescription && (
            <Text fontSize=".7rem" fontStyle="italic" color="text-secondary">
              Do you want to write something about yourself here?
            </Text>
          )}
          <DescriptionBtn
            leftIcon={<EditIcon />}
            onClick={toggleEditingMode}
            mt={2}
          >
            Edit description
          </DescriptionBtn>
        </>
      )}
      {isEditing && user?.id === fetchedUserId && (
        <DescriptionEditor
          description={description}
          onChange={handleChange}
          onSave={handleSave}
          toggleEditingMode={toggleEditingMode}
          isSaving={isSaving}
        />
      )}
      {!!error && <DescriptionAlert error={error} />}
    </Box>
  );
}

export default UserDescription;
