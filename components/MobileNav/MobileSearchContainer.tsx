import { useCallback, useState } from 'react';
import {
  Box,
  Card,
  List,
  ListIcon,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';

import CenteredListItem from '@/components/Common/CenteredListItem';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import SearchInput from '@/components/Common/SearchInput';
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
        overflowY="scroll"
        mb={2}
        bgColor="chakra-body-bg"
      >
        <List minHeight="20vh" maxHeight="45vh">
          {searchValue &&
            results?.fetched &&
            (results?.snippets.length > 0 ? (
              results.snippets.map(snippet => (
                <LinkBox key={snippet.title}>
                  <CenteredListItem px={3} py={2} tabIndex={0}>
                    <ListIcon>
                      <LangIcon lang={snippet.lang} />
                    </ListIcon>
                    <LinkOverlay
                      href={`/snippets/${snippet.lang}/${snippet.slug}`}
                      aria-label={`Navigate to ${snippet.title} page`}
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
            ))}
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
