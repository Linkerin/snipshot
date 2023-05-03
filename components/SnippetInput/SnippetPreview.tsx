import { Heading, Show } from '@chakra-ui/react';

import Snippet from '@/components/Snippet/Snippet';
import { UserInput } from '@/hooks/forPages/useSnippetInputHandler';

const defaultSnippetProps = {
  id: '',
  tree: '',
  verified: false,
  created: '',
  rating: {
    id: '',
    rating: 0
  }
};

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
          ...defaultSnippetProps,
          title: userInput.title,
          lang: userInput.lang,
          snippet: userInput.snippet,
          tags
        }}
        noFooter
        noOptionsBar
      />
    </>
  );
}

export default SnippetPreview;
