import { Highlight, Img, Text } from '@chakra-ui/react';

import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LangsType } from '@/services/types';

type NoSnippetsProps =
  | {
      lang: LangsType;
      tag?: never;
    }
  | {
      lang?: never;
      tag: string;
    };

function NoSnippets({ lang, tag }: NoSnippetsProps) {
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
        {lang && (
          <>
            No snippets for
            <LangIcon lang={lang} mb={1.5} ml={2} mr={1.5} />
            {`${lang} `}
            yet.
          </>
        )}
        {tag && (
          <Highlight
            query={tag}
            styles={{
              border: '1px solid text',
              borderRadius: '20px',
              color: 'text',
              px: 3,
              py: 1.5
            }}
          >
            {`No snippets for ${tag} tag yet.`}
          </Highlight>
        )}
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

export default NoSnippets;
