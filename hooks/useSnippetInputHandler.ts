import { useCallback, useState } from 'react';

import { isAscii } from '@/services/utils';
import { LangsType } from '@/services/types';

export interface UserInput {
  title: string;
  snippet: string;
  lang: LangsType;
  tag?: string;
}

const defaultInput: UserInput = {
  title: '',
  snippet: '',
  lang: '',
  tag: ''
};

function useSnippetInputHandler() {
  const [userInput, setUserInput] = useState(defaultInput);
  const [inputHelpers, setInputHelpers] = useState(defaultInput);
  const [tags, setTags] = useState([] as string[]);

  const updateUserValues = useCallback((input?: UserInput, tags?: string[]) => {
    if (input && typeof input === 'object') {
      const validKeys = Object.keys(defaultInput);
      for (let [key, value] of Object.entries(input)) {
        if (!validKeys.includes(key) || typeof value !== 'string') return;
      }

      setUserInput(input);
    }

    if (tags && Array.isArray(tags) && tags.length > 0) setTags(tags);
  }, []);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      let { name, value } = e.target;

      switch (name) {
        // Cut snippet line length to 80 symbols
        // and show info if maximum symbols or lines met
        case 'snippet':
          const splittedSnippet = value.split(/\n|\r/);

          const lastLineLength =
            splittedSnippet[splittedSnippet.length - 1].length;

          // Message part
          if (
            value.length >= 818 ||
            splittedSnippet.length > 10 ||
            (lastLineLength > 80 && splittedSnippet.length == 10)
          ) {
            setInputHelpers(prevState => {
              return {
                ...prevState,
                snippet: 'Maximum is 10 rows of 80 symbols'
              };
            });
            return;
          } else if (inputHelpers.snippet !== '') {
            setInputHelpers(prevState => ({ ...prevState, snippet: '' }));
          }

          if (lastLineLength <= 80) break;

          const lineExceed = lastLineLength - 80;
          if (lineExceed > 0 && splittedSnippet.length < 10) {
            const breakPoint = value.length - lineExceed;
            value = value.slice(0, breakPoint) + '\n' + value.slice(breakPoint);
          } else {
            return;
          }

          break;

        // Set helper messages for title input
        case 'title':
          // Check that every last character is ASCII
          if (value && !isAscii(value[value.length - 1])) {
            setInputHelpers(prevState => {
              return { ...prevState, title: 'Only ASCII characters allowed' };
            });
            // Do not update state if the last character is not ASCII
            return;
          }

          if (value[0] === ' ') {
            setInputHelpers(prevState => {
              return {
                ...prevState,
                title: "The title can't start with a space"
              };
            });
            return;
          }

          if (value.length >= 50) {
            setInputHelpers(prevState => {
              return { ...prevState, title: 'Maximum length is 50 symbols' };
            });
            break;
          }

          if (inputHelpers.title !== '') {
            setInputHelpers(prevState => ({ ...prevState, title: '' }));
            break;
          }
          break;

        case 'tag':
          if (tags.length >= 10) {
            setInputHelpers(prevState => {
              return { ...prevState, tag: 'Sorry, only 10 tags allowed' };
            });
            break;
          }

          // Check that every last character is ASCII
          if (value && !isAscii(value[value.length - 1])) {
            setInputHelpers(prevState => {
              return { ...prevState, tag: 'Only ASCII characters allowed' };
            });
            // Do not update state if the last character is not ASCII
            return;
          }

          if (value[0] === ' ') {
            setInputHelpers(prevState => {
              return { ...prevState, tag: "Tags can't start with a space" };
            });
            return;
          }

          const splittedValue = value.split(' ');

          if (value.length > 32 && splittedValue.length < 2) {
            setInputHelpers(prevState => {
              return { ...prevState, tag: 'Maximum length is 32 symbols' };
            });
            break;
          }

          // Clear helper message for tags if there are no errors
          setInputHelpers(prevState => {
            return { ...prevState, tag: '' };
          });

          // Add a new tag to the tags list after pressing `space`
          if (splittedValue.length > 1 && splittedValue[0].length > 0) {
            setTags(prevState => {
              const uniqueTags: Set<string> = new Set([
                ...prevState,
                splittedValue[0].toLowerCase()
              ]);
              return [...uniqueTags];
            });
            setUserInput(prevState => ({ ...prevState, tag: '' }));

            return;
          }
          break;

        default:
          break;
      }
      setUserInput(prevState => ({ ...prevState, [name]: value }));
    },
    [inputHelpers.snippet, inputHelpers.title, tags.length]
  );

  const handleTagDelete = useCallback((tagValue: string) => {
    setTags(prevState => prevState.filter(tag => tag !== tagValue));
  }, []);

  return {
    handleChange,
    handleTagDelete,
    updateUserValues,
    inputHelpers,
    userInput,
    tags
  };
}

export default useSnippetInputHandler;
