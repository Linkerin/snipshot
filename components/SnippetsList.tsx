import { startTransition, useCallback, useEffect, useState } from 'react';
import { Center, Grid, GridItem } from '@chakra-ui/react';

import CustomSpinner from '@/components/Common/CustomSpinner';
import Snippet from '@/components/Snippet/Snippet';
import { SnippetRemoveHandlerType, SnippetType } from '@/services/types';
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

  const [isIntersecting, targetRef, updateObserver] = useScrollRef();
  const [fetchData, hasMore] = usePaginatedHandler<SnippetType>(fetchUrl);

  const handleSnippetRemove: SnippetRemoveHandlerType = useCallback(id => {
    startTransition(() => {
      setSnippets(prevState => prevState.filter(snippet => snippet.id !== id));
    });
  }, []);

  useEffect(() => {
    // Check for end of the page, no current fetching and that there are items left
    if (!isIntersecting || isLoading || !hasMore) return;
    const controller = new AbortController();

    const fetchSnippets = async () => {
      setIsLoading(true);

      try {
        const snippets = await fetchData(controller);
        if (snippets && snippets?.length > 0) {
          startTransition(() => {
            setSnippets(prevState => [...prevState, ...snippets]);
          });
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
      <Grid
        templateColumns={{
          base: '1fr',
          lg: oneColumn ? '1fr' : '1fr 1fr'
        }}
        rowGap={2}
        columnGap={{ base: 4, '2xl': 10 }}
      >
        {snippets.map((snippet, index) => {
          const refItem = index === snippets.length - 3;
          return (
            <GridItem key={snippet.id}>
              <Snippet
                snippet={snippet}
                provideRef={refItem ? targetRef : undefined}
                handleSnippetRemove={handleSnippetRemove}
              />
            </GridItem>
          );
        })}
      </Grid>

      {isLoading && (
        <Center my={5}>
          <CustomSpinner />
        </Center>
      )}
    </>
  );
}

export default SnippetsList;
