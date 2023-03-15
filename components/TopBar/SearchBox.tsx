import { useCallback, useRef, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Card,
  List,
  ListIcon,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';

import CenteredListItem from '@/components/CenteredListItem';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import SearchInput from '@/components/SearchInput';
import { SearchFocusHandler, SnippetInfo } from '@/services/types';

function SearchBox() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [results, setResults] = useState([] as SnippetInfo[]);
  const [focused, setFocused] = useState(false);

  const searchResultsRef = useRef<HTMLDivElement>(null);

  const handleSearchInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchResults = useCallback((searchResults: SnippetInfo[]) => {
    setResults(searchResults);
  }, []);

  const handleFocus: SearchFocusHandler = (focused, e) => {
    if (e) {
      if (searchResultsRef?.current?.contains(e.relatedTarget)) {
        return;
      }
    }
    setFocused(focused);
  };

  return (
    <Box w="35%" position="relative">
      <SearchInput
        value={searchValue}
        onChange={handleSearchInputChange}
        handleResults={handleSearchResults}
        handleFocus={handleFocus}
      />
      {focused && results?.length > 0 && (
        <Card
          ref={searchResultsRef}
          position="absolute"
          top={12}
          zIndex={1}
          w="100%"
        >
          <List>
            {results.map(result => (
              <LinkBox key={result.title} onClick={e => setFocused(false)}>
                <CenteredListItem px={3} py={2} tabIndex={0}>
                  <ListIcon>
                    <LangIcon lang={result.lang} />
                  </ListIcon>
                  <LinkOverlay
                    as={NextLink}
                    href={`/snippets/${result.lang}/${result.slug}`}
                  >
                    {result.title}
                  </LinkOverlay>
                </CenteredListItem>
              </LinkBox>
            ))}
          </List>
        </Card>
      )}
    </Box>
  );
}

export default SearchBox;
