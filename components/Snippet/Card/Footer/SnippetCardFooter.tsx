import NextLink from 'next/link';
import { CardFooter, IconButton } from '@chakra-ui/react';

import fadeInAnimation from '@/services/utils/styling/fadeInAnimation';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { SnippetType } from '@/services/types';

interface SnippetCardFooterProps {
  lang: SnippetType['lang'];
  children: React.ReactElement;
}

function SnippetCardFooter({ lang, children }: SnippetCardFooterProps) {
  const escapedLang = lang ? encodeURIComponent(lang) : '';

  return (
    <CardFooter pt={0}>
      <IconButton
        as={NextLink}
        aria-label={`${lang} snippets`}
        href={`/snippets/${escapedLang}`}
        prefetch={false}
        icon={
          <LangIcon
            lang={lang}
            role="link"
            focusable
            sx={fadeInAnimation(0.2)}
          />
        }
        variant="ghost"
        size="sm"
        mr={2}
        colorScheme="none"
      />
      {children}
    </CardFooter>
  );
}

export default SnippetCardFooter;
