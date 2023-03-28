import NextLink from 'next/link';
import { Heading, Link } from '@chakra-ui/react';

import { SnippetType } from '@/services/types';

type SnippetTitleProps = Pick<SnippetType, 'title' | 'slug' | 'lang'>;

function SnippetTitle({ title, slug, lang }: SnippetTitleProps) {
  return (
    <Heading as="h3" fontSize="0.8rem" noOfLines={1} pl={1}>
      {slug ? (
        <Link as={NextLink} href={`/snippets/${lang}/${slug}/`}>
          {title}
        </Link>
      ) : (
        title
      )}
    </Heading>
  );
}

export default SnippetTitle;
