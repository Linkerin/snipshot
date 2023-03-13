import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ListIcon,
  SimpleGrid,
  SpaceProps,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';

import Alerts from './Alerts';
import { isAscii } from '@/services/utils';
import { LANGS } from '@/services/constants';
import LangIcon from '../Icons/LangIcons/LangIcon';
import { LangsType } from '@/services/types';
import SelectInput, { SelectOption } from '../SelectInput';
import SnippetCard from '@/components/Snippet/SnippetCard';
import SnippetCode from '@/components/Snippet/SnippetCode';
import SnippetTagsList from '../Snippet/SnippetTagsList';
import useButtonDisabled from '@/hooks/useButtonDisabled';

interface UserInput {
  title: string;
  snippet: string;
  lang: LangsType;
  tag?: string;
}

interface AddSnippetFormLabelProps {
  label: string;
  mb?: SpaceProps['mb'];
  ml?: SpaceProps['ml'];
}

function AddSnippetFormLabel({ label, mb, ml }: AddSnippetFormLabelProps) {
  return (
    <FormLabel mb={mb} ml={ml ?? 2}>
      <Text fontSize="xs" display="inline">
        {label}
      </Text>
    </FormLabel>
  );
}

function AddSnippetPage() {
  const defaultInput: UserInput = {
    title: '',
    snippet: '',
    lang: '',
    tag: ''
  };
  const [userInput, setUserInput] = useState(defaultInput);
  const [inputHelpers, setInputHelpers] = useState(defaultInput);
  const [tags, setTags] = useState([] as string[]);
  const [error, setError] = useState(false);

  const disabledSaveBtn = useButtonDisabled(userInput, ['tag']);
  const router = useRouter();

  const handleChange = (
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
  };

  const handleTagDelete = (tagValue: string) => {
    setTags(prevState => prevState.filter(tag => tag !== tagValue));
  };

  const handleSave = async () => {
    for (let [key, value] of Object.entries(userInput)) {
      if (!value && key !== 'tag') return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: userInput.title,
        snippet: userInput.snippet,
        lang: userInput.lang,
        tags: tags
      })
    };

    try {
      const res = await fetch('/api/snippets/', options);

      if (!res.ok) {
        console.error(await res.json());
        setError(true);
      }

      if (res.status === 201) {
        const data = await res.json();
        router.push(`/snippets/${data.snippet.lang}/${data.snippet.slug}/`);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <>
      <Alerts error={error} />
      <SimpleGrid
        as="section"
        columns={{ sm: 1, md: 2 }}
        spacing={{ sm: 1, md: 3 }}
      >
        <VStack as="form" autoComplete="off" spacing={3}>
          <FormControl isRequired>
            <AddSnippetFormLabel label="Title" mb={0} />
            <Input
              id="title"
              name="title"
              title="No more than 50 symbols"
              onChange={handleChange}
              value={userInput.title}
              variant="flushed"
              maxLength={50}
              autoFocus
            />
            {!!inputHelpers.title && (
              <FormHelperText>{inputHelpers.title}</FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired>
            <AddSnippetFormLabel label="Code Snippet" mb={1} />
            <Textarea
              id="snippet"
              name="snippet"
              title="No more than 10 rows of 80 symbols"
              onChange={handleChange}
              value={userInput.snippet}
              maxLength={818}
              resize="none"
              rows={5}
            />
            {!!inputHelpers.snippet && (
              <FormHelperText>{inputHelpers.snippet}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <AddSnippetFormLabel label="Tags (separated by `Space`)" mb={1} />
            <Input
              id="tag"
              name="tag"
              title="No more than 10 tags"
              onChange={handleChange}
              value={userInput.tag}
              maxLength={33}
            />
            {!!inputHelpers.tag && (
              <FormHelperText>{inputHelpers.tag}</FormHelperText>
            )}
          </FormControl>
          {tags.length > 0 && (
            <SnippetTagsList tags={tags} handleTagDelete={handleTagDelete} />
          )}
          <SelectInput
            id="lang"
            name="lang"
            placeholder="Select language"
            value={userInput.lang}
            onChange={handleChange}
          >
            {LANGS.map(lang => {
              return (
                <SelectOption key={lang} value={lang}>
                  <ListIcon boxSize={6}>
                    <LangIcon lang={lang} />
                  </ListIcon>
                  {lang}
                </SelectOption>
              );
            })}
          </SelectInput>
          <Button disabled={disabledSaveBtn} onClick={handleSave} w="100%">
            Save
          </Button>
        </VStack>
        {userInput.snippet && (
          <SnippetCard
            title={userInput.title}
            snippet={userInput.snippet}
            lang={userInput.lang}
            tags={tags}
            mt={0}
            mb={1}
          >
            <SnippetCode snippet={userInput.snippet} lang={userInput.lang} />
          </SnippetCard>
        )}
      </SimpleGrid>
    </>
  );
}

export default AddSnippetPage;
