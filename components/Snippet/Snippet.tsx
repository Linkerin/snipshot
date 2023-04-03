import { chakra } from '@chakra-ui/react';

import SnippetCard from './Body/SnippetCard';
import SnippetCode from './Body/SnippetCode';
import SnippetInfoFooter from './Footer/SnippetInfoFooter';
import { SnippetType } from '@/services/types';

import SnippetContext from '@/context/SnippetContext';

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
