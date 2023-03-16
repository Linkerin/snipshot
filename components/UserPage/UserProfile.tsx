import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  GridItem,
  Center,
  Flex,
  VStack,
  Spinner,
  Text
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import CodeIcon from '../Icons/CodeIcon';
import { parseDate } from '@/services/date';
import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';
import supabase from '@/services/supabase';
import UserInfo from '@/components/UserInfo/UserInfo';
import usePaginatedHandler from '@/hooks/usePaginatedHandler';
import useScrollRef from '@/hooks/useScrollRef';

const gridTempalate = {
  base: '1fr',
  md: '25vw 20fr 1fr',
  lg: '22vw 18fr 1fr',
  xl: '18vw 5fr 1fr'
};

interface profileInfoState {
  registered?: string;
  avatar?: string;
}

function UserProfile() {
  const router = useRouter();
  const [profileInfo, setprofileInfo] = useState<profileInfoState>({
    registered: '',
    avatar: ''
  });
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(false);

  const user = useContext(AuthContext);

  const username = router.query.userpage as string;

  const [fetchData, hasMore] = usePaginatedHandler<SnippetType>(
    `/users/${username}`,
    { first: true }
  );
  const [isIntersecting, targetRef, updateObserver] = useScrollRef();

  useEffect(() => {
    // Check for end of the page, no current fetching and that there are items left
    if (
      (snippets.length > 0 && !isIntersecting) ||
      isLoadingSnippets ||
      !hasMore
    )
      return;

    const fetchSnippets = async () => {
      setIsLoadingSnippets(true);

      const fetchedSnippets = await fetchData();
      if (fetchedSnippets && fetchedSnippets?.length > 0) {
        setSnippets(prevState => [...prevState, ...fetchedSnippets]);
        updateObserver();
      }
      setIsLoadingSnippets(false);
    };

    fetchSnippets();
  }, [
    isIntersecting,
    isLoadingSnippets,
    hasMore,
    updateObserver,
    fetchData,
    snippets
  ]);

  // Fetch user's register date on page load
  useEffect(() => {
    const fetchprofileInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('created, avatar')
          .eq('name', username)
          .limit(1)
          .single();
        if (error) throw error;

        const registered = parseDate(data?.created);
        setprofileInfo(prevState => ({
          ...prevState,
          avatar: data.avatar,
          registered
        }));
      } catch (err) {
        console.error("Error while fetching user's register date");
        console.error(err);
        return;
      }
    };

    if (username) fetchprofileInfo();
  }, [username]);

  return (
    <Grid
      // gridTemplateColumns={username === user?.username ? '1fr' : gridTempalate}
      gridTemplateColumns={gridTempalate}
    >
      {/* {username !== user?.username && ( */}
      {username && (
        <GridItem as={VStack} spacing={1} mt={2.5}>
          <UserInfo
            avatar={profileInfo.avatar}
            username={username}
            registered={profileInfo.registered}
          />
        </GridItem>
      )}
      <GridItem px={{ sm: 2, lg: 7 }} h="calc(100vh - 76px)" overflowY="scroll">
        {snippets.length > 0 ? (
          <>
            <Flex alignItems="center" mb={3} gap={1}>
              <CodeIcon boxSize={5} />
              <Text fontSize="xl">Snippets</Text>
            </Flex>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 2;

              return (
                <Snippet
                  key={index}
                  snippet={snippet}
                  provideRef={refItem ? targetRef : undefined}
                />
              );
            })}
          </>
        ) : (
          !isLoadingSnippets && (
            <Text textAlign="center">{`${username} has not posted any snippets yet`}</Text>
          )
        )}
        {isLoadingSnippets && (
          <Center my={5}>
            <Spinner
              thickness="5px"
              emptyColor="gray.200"
              size="xl"
              speed="0.5s"
            />
          </Center>
        )}
      </GridItem>
    </Grid>
  );
}

export default UserProfile;
