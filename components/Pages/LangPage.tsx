import { Img, Highlight, Text } from '@chakra-ui/react';

import Meta from '@/components/Meta/Meta';
import { LangPageProps } from '@/pages/snippets/[lang]';
import SnippetsList from '@/components/SnippetsList';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';

function LangPage({ snippetsData, lang, apiHandlerUrl }: LangPageProps) {
  if (snippetsData.length === 0) {
    return (
      <>
        <Img
          src="/images/YogaSloth.webp"
          alt="Meditating Sloth as a Yoga"
          width="auto"
          height="25vh"
          mt={8}
          mx="auto"
        />
        <Text mt={1} fontSize="2xl" align="center" letterSpacing="wide">
          No snippets for
          <LangIcon lang={lang} mb={1.5} ml={2} mr={1.5} />
          {`${lang} `}
          yet.
        </Text>
        <Text fontSize="2.2rem" align="center">
          <Highlight
            query="the first"
            styles={{ color: 'primary', fontStyle: 'italic' }}
          >
            Be the first to create!
          </Highlight>
        </Text>
      </>
    );
  }

  return (
    <>
      <Meta
        title={`${lang} code snippets · snipshot`}
        keywords={`${lang}, development, programming, snippets, code, samples`}
        description={`${lang} code snippets on snipshot. Get and share your ${lang} snips`}
      />
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </>
  );
}

export default LangPage;
