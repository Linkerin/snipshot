import { ChangeEventHandler, useEffect, useRef } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps
} from '@chakra-ui/react';

import SearchIcon from '../Icons/SearchIcon';
import { SearchFocusHandler, SnippetInfo } from '@/services/types';

const delay = 600; // 600ms delay before making a search request to the server

interface SearchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  handleResults: (resData: {
    fetched: boolean;
    snippets: SnippetInfo[];
  }) => void;
  handleFocus?: SearchFocusHandler;
  size?: InputProps['size'];
}

function SearchInput({
  onChange,
  value,
  handleResults,
  handleFocus,
  size = 'md'
}: SearchInputProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (inputRef && inputRef?.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (timerRef?.current) {
        clearTimeout(timerRef.current);
      }

      if (!value || value.length < 1) {
        handleResults({ fetched: false, snippets: [] });
        return;
      }

      const sendRequest = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/snippets/search?q=${value}`
          );
          if (!res.ok) {
            handleResults({ fetched: true, snippets: [] });
            return;
          }

          handleResults({ fetched: true, snippets: await res.json() });
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
      <InputLeftElement h="100%" cursor="pointer" onClick={handleIconClick}>
        <SearchIcon />
      </InputLeftElement>
      <Input
        ref={inputRef}
        name="search"
        title="Search input"
        value={value}
        size={size}
        placeholder="Search"
        autoFocus={false}
        autoComplete="off"
        onChange={onChange}
        onBlur={handleFocus ? e => handleFocus(false, e) : undefined}
        onFocus={handleFocus ? e => handleFocus(true) : undefined}
      />
    </InputGroup>
  );
}

export default SearchInput;
