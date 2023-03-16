import { ChangeEventHandler, useEffect, useRef } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import SearchIcon from './Icons/SearchIcon';
import { SearchFocusHandler, SnippetInfo } from '@/services/types';

const delay = 600; // 600ms delay before making a search request to the server

interface SearchBoxProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  handleResults: (resData: SnippetInfo[]) => void;
  handleFocus?: SearchFocusHandler;
}

function SearchInput({
  onChange,
  value,
  handleResults,
  handleFocus
}: SearchBoxProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (!value || value.length < 1) {
        handleResults([]);
        return;
      }

      const sendRequest = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/snippets/search?q=${value}`
          );
          if (!res.ok) {
            handleResults([]);
            return;
          }

          handleResults(await res.json());
        } catch (err) {
          console.error('Error occured while fetching search results');
        }
      };

      timerRef.current = setTimeout(() => {
        sendRequest();
      }, delay);
    };

    fetchSearchResults();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, handleResults]);

  return (
    <InputGroup>
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <Input
        name="search"
        value={value}
        size="md"
        placeholder="Search"
        onChange={onChange}
        onBlur={handleFocus ? e => handleFocus(false, e) : undefined}
        onFocus={handleFocus ? e => handleFocus(true) : undefined}
      />
    </InputGroup>
  );
}

export default SearchInput;
