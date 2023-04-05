import { Text } from '@chakra-ui/react';

import Meta from '../Meta/Meta';
import SnippetsList from '../SnippetsList';
import { TagPageProps } from '@/pages/tags/[tag]';

function TagPage({ snippetsData, tag, apiHandlerUrl }: TagPageProps) {
  if (snippetsData.length === 0) {
    return (
      <Text mt={5} fontSize="2xl" textAlign="center">
        {`No snippets for "${tag}" tag yet 😞`}
      </Text>
    );
  }
  return (
    <>
      <Meta
        title={`${tag} code snippets – snipshot`}
        keywords={`${tag}, development, programming, snippets, code, samples`}
        description={`Code snippets for ${tag} on snipshot. Get and share your snips for ${tag}`}
      />
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </>
  );
}

export default TagPage;
