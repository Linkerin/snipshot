import NextLink from 'next/link';
import { HStack, LinkBox, LinkOverlay, Tag, TagLabel } from '@chakra-ui/react';

function SnippetTagsList({ tags }: { tags?: string[] }) {
  return (
    <HStack spacing={1} align="center" wrap="wrap">
      {tags &&
        tags.map(tag => (
          <LinkBox key={tag} display="flex" alignItems="center">
            <Tag size="sm" borderRadius="full" variant="outline" m={0}>
              <TagLabel>
                <LinkOverlay as={NextLink} href={`/tags/${tag}`}>
                  {tag.toLowerCase()}
                </LinkOverlay>
              </TagLabel>
            </Tag>
          </LinkBox>
        ))}
    </HStack>
  );
}

export default SnippetTagsList;
