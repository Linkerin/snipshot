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
  const [results, setResults] = useState({
    fetched: false,
    snippets: [] as SnippetInfo[]
  });
  const [focused, setFocused] = useState(false);

  const searchResultsRef = useRef<HTMLDivElement>(null);

  const handleSearchInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchResults = useCallback(
    (searchResults: { fetched: boolean; snippets: SnippetInfo[] }) => {
      setResults(searchResults);
    },
    []
  );

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
      {focused && searchValue && results?.fetched && (
        <Card
          ref={searchResultsRef}
          position="absolute"
          top={12}
          zIndex={1}
          w="100%"
        >
          <List>
            {results?.snippets.length > 0 ? (
              results.snippets.map(snippet => (
                <LinkBox key={snippet.title} onClick={e => setFocused(false)}>
                  <CenteredListItem px={3} py={2} tabIndex={0}>
                    <ListIcon>
                      <LangIcon lang={snippet.lang} />
                    </ListIcon>
                    <LinkOverlay
                      as={NextLink}
                      href={`/snippets/${snippet.lang}/${snippet.slug}`}
                    >
                      {snippet.title}
                    </LinkOverlay>
                  </CenteredListItem>
                </LinkBox>
              ))
            ) : (
              <CenteredListItem px={3} py={2}>
                Nothing found
              </CenteredListItem>
            )}
          </List>
        </Card>
      )}
    </Box>
  );
}

export default SearchBox;
