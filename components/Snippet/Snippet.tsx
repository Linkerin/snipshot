import dynamic from 'next/dynamic';
import { chakra } from '@chakra-ui/react';

import SnippetCard from './Body/SnippetCard';
import SnippetContext from '@/context/SnippetContext';
import SnippetInfoFooter from '@/components/Snippet/Footer/SnippetInfoFooter';
import { SnippetType } from '@/services/types';

const SnippetCode = dynamic(
  () => import('@/components/Snippet/Body/SnippetCode')
);

export interface SnippetProps {
  snippet: SnippetType;
  provideRef?: React.RefObject<HTMLElement>;
  noFooter?: boolean;
}

function Snippet({ snippet, provideRef, noFooter = false }: SnippetProps) {
  const snippetContent = snippet.tree ? snippet.tree : snippet.snippet;
  return (
    <chakra.article ref={provideRef} w="100%">
      <SnippetContext.Provider value={snippet}>
        <SnippetCard snippet={snippetContent} source={snippet.snippet}>
          <SnippetCode snippetTree={!!snippet.tree} />
        </SnippetCard>
        {!noFooter && <SnippetInfoFooter />}
      </SnippetContext.Provider>
    </chakra.article>
  );
}

export default Snippet;
