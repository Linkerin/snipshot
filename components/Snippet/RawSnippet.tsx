import { Card } from '@chakra-ui/react';

import SnippetCardBody from '@/components/Snippet/Card/Body/SnippetCardBody';
import SnippetCardFooter from '@/components/Snippet/Card/Footer/SnippetCardFooter';
import SnippetCardHeader from '@/components/Snippet/Card/Header/SnippetCardHeader';
import SnippetCodeRawText from '@/components/Snippet/Card/Body/SnippetCodeRawText';
import SnippetTagsList from '@/components/Snippet/Card/Footer/SnippetTagsList';
import { SnippetType } from '@/services/types';

function RawSnippet({ snippet }: { snippet: SnippetType }) {
  return (
    <Card
      as="article"
      aria-label={`${snippet.title}`}
      className="snippet-card"
      variant="elevated"
      size="sm"
      borderRadius={10}
      h="max-content"
      w="100%"
    >
      <SnippetCardHeader
        title={snippet.title}
        slug={snippet.slug}
        lang={snippet.lang}
      />
      <SnippetCardBody snippet={snippet.snippet}>
        <SnippetCodeRawText snippet={snippet.snippet} lang={snippet.lang} />
      </SnippetCardBody>
      <SnippetCardFooter lang={snippet.lang}>
        <SnippetTagsList tags={snippet.tags} />
      </SnippetCardFooter>
    </Card>
  );
}

export default RawSnippet;
