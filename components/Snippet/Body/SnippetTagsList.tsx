import NextLink from 'next/link';
import { LinkBox, LinkOverlay, TagLabel } from '@chakra-ui/react';

import CloseIcon from '@/components/Icons/CloseIcon';
import TagWrapper from '@/components/CustomTag/TagWrapper';
import TagsListContainer from '@/components/CustomTag/TagsListContainer';

export interface SnippetTagsListProps {
  tags?: string[];
  handleTagDelete?: (tag: string) => void;
}
/**
 * Component for rendering list of snippet tags.
 * Could be used only with delete buttons or as links.
 * Default option is with links.
 */
function SnippetTagsList({ tags, handleTagDelete }: SnippetTagsListProps) {
  return !handleTagDelete ? (
    <TagsListContainer>
      {tags &&
        tags.map(tag => (
          <LinkBox key={tag} display="flex" alignItems="center">
            <TagWrapper>
              <TagLabel>
                <LinkOverlay as={NextLink} href={`/tags/${tag}`}>
                  {tag.toLowerCase()}
                </LinkOverlay>
              </TagLabel>
            </TagWrapper>
          </LinkBox>
        ))}
    </TagsListContainer>
  ) : (
    <TagsListContainer>
      {tags &&
        tags.map(tag => (
          <TagWrapper
            key={tag}
            onClick={e => handleTagDelete(tag)}
            cursor="pointer"
          >
            <TagLabel>{tag.toLowerCase()}</TagLabel>
            {!!handleTagDelete && <CloseIcon ml={1} boxSize={4} />}
          </TagWrapper>
        ))}
    </TagsListContainer>
  );
}

export default SnippetTagsList;
