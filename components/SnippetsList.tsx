import { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';
import usePaginatedHandler from '@/hooks/usePaginatedHandler';
import useScrollRef from '@/hooks/useScrollRef';

const snippet: SnippetType = {
  id: '36ef4ef2-3ab3-4945-8712-38c0287511dc',
  title: 'Do not translate text',
  snippet: '<p translate="no">Untranslatable text</p>',
  tree: '',
  lang: 'Bash',
  tags: ['translate', 'html', 'p', 'text', 'paragraph'],
  verified: false,
  snippets_ratings: [{ id: '1', rating: 0 }],
  created: '2022-04-18 12:08:20.008539+00',
  slug: 'do-not-translate-text',
  profiles: {
    name: 'linkerin'
  }
};

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
    <SimpleGrid minChildWidth="30vw" spacingX={5} spacingY={3}>
      {snippets.map(snippet => (
        <Snippet key={snippet.id} snippet={snippet} />
      ))}
    </SimpleGrid>
  );
}

export default SnippetsList;
