import { useEffect, useState } from 'react';
import { Center, SimpleGrid, Spinner, VStack } from '@chakra-ui/react';

import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';
import usePaginatedHandler from '@/hooks/usePaginatedHandler';
import useScrollRef from '@/hooks/useScrollRef';

interface SnippetsListProps {
  snippetsData: SnippetType[];
  fetchUrl: string;
}

function SnippetsList({ snippetsData, fetchUrl }: SnippetsListProps) {
  const [snippets, setSnippets] = useState(snippetsData);
  const [isLoading, setIsLoading] = useState(false);
  const [isIntersecting, targetRef, updateObserver] = useScrollRef();
  const [fetchData, hasMore] = usePaginatedHandler<SnippetType>(fetchUrl);

  useEffect(() => {
    // Check for end of the page, no current fetching and that there are items left
    if (!isIntersecting || isLoading || !hasMore) return;

    const fetchSnippets = async () => {
      setIsLoading(true);

      const snippets = await fetchData();
      if (snippets && snippets?.length > 0) {
        setSnippets(prevState => [...prevState, ...snippets]);
        updateObserver();
      }
      setIsLoading(false);
    };

    fetchSnippets();
  }, [isIntersecting, isLoading, hasMore, updateObserver, fetchData]);

  useEffect(() => {
    setSnippets(snippetsData);
  }, [snippetsData]);

  return (
    <>
      <SimpleGrid minChildWidth="35vw" spacingX={4}>
        <VStack alignItems="flex-start" spacing={3}>
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
        </VStack>
        <VStack alignItems="flex-start" spacing={4}>
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
        </VStack>
      </SimpleGrid>
      <Center my={5}>
        {isLoading && (
          <Spinner
            thickness="5px"
            emptyColor="gray.200"
            size="xl"
            speed="0.5s"
          />
        )}
      </Center>
    </>
  );
}

export default SnippetsList;
