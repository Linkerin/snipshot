import { useCallback, useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { log } from 'next-axiom';
import { Box, Text, useToast } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import DescriptionBtn from './DescriptionBtn';
import EditIcon from '@/components/Icons/EditIcon';
import DescriptionAlert from './DescriptionAlert';

const DescriptionEditor = dynamic(() => import('./DescriptionEditor'));

function UserDescription({ username }: { username: string | undefined }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [fetchedIds, setFetchedIds] = useState({
    userId: '',
    descriptionId: ''
  });

  const user = useContext(AuthContext);
  const toast = useToast();

  const toggleEditingMode: React.MouseEventHandler = e => {
    e.preventDefault();

    setIsEditing(prevState => !prevState);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(e => {
      if (e.target?.name !== 'description') return;

      const { value } = e.target;

      if (value.length >= 501) return;
      setDescription(value);
    }, []);

  // Uploading the changed description to Supabase
  const handleSave: React.MouseEventHandler = useCallback(
    async e => {
      e.preventDefault();
      setError('');
      if (!user?.id) return;

      try {
        setIsSaving(true);
        const supabase = (await import('@/services/supabase/supabase')).default;

        if (fetchedIds.descriptionId && fetchedIds.descriptionId.length > 1) {
          const { error } = await supabase
            .from('profiles_descriptions')
            .update({
              description,
              updated: new Date()
            })
            .eq('user_id', user?.id)
            .eq('id', fetchedIds.descriptionId)
            .select();
          if (error) throw error;
        } else {
          // create a new description record as the user did never have a description
          const { error } = await supabase
            .from('profiles_descriptions')
            .insert({
              description,
              user_id: user?.id
            });
          if (error) throw error;
        }

        setIsEditing(false);
        toast({
          description: 'The description was saved',
          status: 'success',
          duration: 2000
        });
      } catch (err) {
        log.error(`Error while saving user's description`, {
          err,
          userId: user?.id
        });
        setError('Something went wrong. The description was not saved.');
      } finally {
        setIsSaving(false);
      }
    },
    [user?.id, description, toast, fetchedIds]
  );

  // Initially get user's description
  useEffect(() => {
    const controller = new AbortController();

    const fetchDescription = async () => {
      try {
        setIsLoading(true);
        if (!username) return;

        const supabase = (await import('@/services/supabase/supabase')).default;
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('id')
          .eq('name', username)
          .abortSignal(controller.signal)
          .limit(1);
        if (userError) throw userError;

        const userId = userData[0]?.id;
        if (!userId) throw new Error(`ID for ${username} was not found`);
        setFetchedIds(prevState => ({ ...prevState, userId }));

        const { data: descriptionData, error } = await supabase
          .from('profiles_descriptions')
          .select('id, description')
          .eq('user_id', userId)
          .abortSignal(controller.signal)
          .limit(1);
        if (error) throw error;

        if (!descriptionData[0]?.description) return;
        setDescription(descriptionData[0].description);
        setFetchedIds(prevState => ({
          ...prevState,
          descriptionId: descriptionData[0].id
        }));
      } catch (err) {
        log.error(`Error while fetching user's description`, { err, username });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();

    return () => controller.abort();
  }, [username]);

  return isLoading ? (
    <></>
  ) : (
    <Box mt={5}>
      {!isEditing &&
        description &&
        description.split(/\n|\r/).map((paragraph, i) => (
          <Text key={i} fontSize="xs" lineHeight="1.3rem" px={1}>
            {paragraph}
          </Text>
        ))}
      {!isEditing && user?.id === fetchedIds.userId && (
        <>
          {!description && (
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
      {isEditing && user?.id === fetchedIds.userId && (
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
