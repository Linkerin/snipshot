import { useCallback, useState } from 'react';
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
import { SnippetInfo } from '@/services/types';

function MobileSearchContainer() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [results, setResults] = useState({
    fetched: false,
    snippets: [] as SnippetInfo[]
  });

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

  return (
    <Box w="100%" pb={4}>
      <Card
        variant="none"
        justifyContent="flex-end"
        h="50vh"
        overflowY="scroll"
        mb={2}
      >
        <List>
          {searchValue && results?.fetched && results?.snippets.length > 0 ? (
            results.snippets.map(snippet => (
              <LinkBox key={snippet.title}>
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
      <SearchInput
        value={searchValue}
        onChange={handleSearchInputChange}
        handleResults={handleSearchResults}
        size="lg"
      />
    </Box>
  );
}

export default MobileSearchContainer;
