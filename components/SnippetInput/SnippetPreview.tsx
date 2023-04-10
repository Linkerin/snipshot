import { Heading, Show } from '@chakra-ui/react';

import Snippet from '@/components/Snippet/Snippet';
import { snippetContextValueDefault } from '@/context/SnippetContext';
import { UserInput } from '@/hooks/useSnippetInputHandler';

interface SnippetPreviewProps {
  userInput: UserInput;
  tags: string[];
}

function SnippetPreview({ userInput, tags }: SnippetPreviewProps) {
  return (
    <>
      <Show above="lg">
        <Heading size="sm" mb={2}>
          Preview
        </Heading>
      </Show>
      <Snippet
        snippet={{
          ...snippetContextValueDefault,
          title: userInput.title,
          lang: userInput.lang,
          snippet: userInput.snippet,
          tags
        }}
        noFooter
      />
    </>
  );
}

export default SnippetPreview;
