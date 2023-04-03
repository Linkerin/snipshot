import { useContext } from 'react';
import NextLink from 'next/link';
import { Heading, Link } from '@chakra-ui/react';

import SnippetContext from '@/context/SnippetContext';

function SnippetTitle() {
  const { lang, slug, title } = useContext(SnippetContext);
  return (
    <Heading as="h3" fontSize="0.85rem" noOfLines={1} pl={1}>
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
