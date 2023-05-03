import RawSnippet from '@/components/Snippet/RawSnippet';
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
    <RawSnippet
      snippet={{
        ...defaultSnippetProps,
        title: userInput.title,
        lang: userInput.lang,
        snippet: userInput.snippet,
        tags
      }}
    />
  );
}

export default SnippetPreview;
