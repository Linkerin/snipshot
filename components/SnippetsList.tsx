import { useContext, useEffect, useState } from 'react';
import {
  Center,
  Grid,
  GridItem,
  VStack,
  useBreakpoint
} from '@chakra-ui/react';

import CustomSpinner from '@/components/CustomSpinner';
import { DeviceContext } from '@/context/DeviceContext';
import { MOBILE_BREAKPOINTS } from '@/services/constants';
import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';
import usePaginatedHandler from '@/hooks/usePaginatedHandler';
import useScrollRef from '@/hooks/useScrollRef';

interface SnippetsListProps {
  snippetsData: SnippetType[];
  fetchUrl: string;
  oneColumn?: boolean;
}

function SnippetsList({
  snippetsData,
  fetchUrl,
  oneColumn = false
}: SnippetsListProps) {
  const [snippets, setSnippets] = useState(snippetsData);
  const [isLoading, setIsLoading] = useState(false);

  const { isMobile } = useContext(DeviceContext);
  const breakpoint = useBreakpoint();

  const [isIntersecting, targetRef, updateObserver] = useScrollRef();
  const [fetchData, hasMore] = usePaginatedHandler<SnippetType>(fetchUrl);

  useEffect(() => {
    // Check for end of the page, no current fetching and that there are items left
    if (!isIntersecting || isLoading || !hasMore) return;

    const fetchSnippets = async () => {
      setIsLoading(true);

      try {
        const snippets = await fetchData();
        if (snippets && snippets?.length > 0) {
          setSnippets(prevState => [...prevState, ...snippets]);
          updateObserver();
        }
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('Error occurred while fetching snippets', { err });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippets();
  }, [isIntersecting, isLoading, hasMore, updateObserver, fetchData]);

  useEffect(() => {
    setSnippets(snippetsData);
  }, [snippetsData]);

  return (
    <>
      {isMobile || oneColumn || MOBILE_BREAKPOINTS.includes(breakpoint) ? (
        <Grid templateColumns="1fr" gap={4}>
          <GridItem as={VStack} alignItems="flex-start" spacing={4}>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 3;
              return (
                <Snippet
                  key={snippet.id}
                  snippet={snippet}
                  provideRef={refItem ? targetRef : undefined}
                />
              );
            })}
          </GridItem>
        </Grid>
      ) : (
        <Grid templateColumns="1fr 1fr" gap={4}>
          <GridItem as={VStack} alignItems="flex-start" spacing={5}>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 3;
              if (index % 2 === 0)
                return (
                  <Snippet
                    key={snippet.id}
                    snippet={snippet}
                    provideRef={refItem ? targetRef : undefined}
                  />
                );
            })}
          </GridItem>
          <GridItem as={VStack} alignItems="flex-start" spacing={5}>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 3;
              if (index % 2 !== 0)
                return (
                  <Snippet
                    key={snippet.id}
                    snippet={snippet}
                    provideRef={refItem ? targetRef : undefined}
                  />
                );
            })}
          </GridItem>
        </Grid>
      )}

      {isLoading && (
        <Center my={5}>
          <CustomSpinner />
        </Center>
      )}
    </>
  );
}

export default SnippetsList;
