import { CardFooter, IconButton, Link } from '@chakra-ui/react';

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
        as={Link}
        href={`/snippets/${escapedLang}`}
        aria-label={`${lang} snippets`}
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
