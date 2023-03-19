import { chakra } from '@chakra-ui/react';

import SnippetCard from './SnippetCard';
import SnippetCode from './SnippetCode';
import SnippetInfoFooter from './SnippetInfoFooter';
import { SnippetType } from '@/services/types';

export interface SnippetProps {
  snippet: SnippetType;
  provideRef?: React.RefObject<HTMLElement>;
}

function Snippet({ snippet, provideRef }: SnippetProps) {
  const snippetContent = snippet.tree ? snippet.tree : snippet.snippet;
  return (
    <chakra.article ref={provideRef} w="100%">
      <SnippetCard
        title={snippet.title}
        snippet={snippetContent}
        source={snippet.snippet}
        slug={snippet.slug}
        lang={snippet.lang}
        tags={snippet.tags}
      >
        <SnippetCode snippetTree={!!snippet.tree} />
      </SnippetCard>
      <SnippetInfoFooter
        author={snippet.author}
        created={snippet.created}
        rating={snippet.rating}
        verified={snippet.verified}
      />
    </chakra.article>
  );
}

export default Snippet;
