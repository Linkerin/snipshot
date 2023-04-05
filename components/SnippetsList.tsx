import { useEffect, useState } from 'react';
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  VStack,
  useBreakpoint
} from '@chakra-ui/react';
import { log } from 'next-axiom';

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
        console.warn('Error while fetching snippets');
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
      {MOBILE_BREAKPOINTS.includes(breakpoint) || oneColumn ? (
        <Grid templateColumns="1fr" gap={4}>
          <GridItem as={VStack} alignItems="flex-start" spacing={3}>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 2;
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
          <GridItem as={VStack} alignItems="flex-start" spacing={3}>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 2;
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
          <GridItem as={VStack} alignItems="flex-start" spacing={3}>
            {snippets.map((snippet, index) => {
              const refItem = index === snippets.length - 2;
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
          <Spinner
            thickness="5px"
            color="primary"
            emptyColor="gray.200"
            size="xl"
            speed="0.5s"
          />
        </Center>
      )}
    </>
  );
}

export default SnippetsList;
