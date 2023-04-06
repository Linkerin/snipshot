import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { log } from 'next-axiom';
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  Input,
  ListIcon,
  Show,
  SpaceProps,
  Text,
  Textarea,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

import { snippetContextValueDefault } from '@/context/SnippetContext';
import { fetchIsPostingAllowed } from '@/services/redis/postingServices';
import { LANGS } from '@/services/constants';
import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import Meta from '@/components/Meta/Meta';
import SelectInput, { SelectOption } from '../../SelectInput';
import useButtonDisabled from '@/hooks/useButtonDisabled';
import useSnippetInputHandler from '@/hooks/useSnippetInputHandler';

const Alerts = dynamic(() => import('./Alerts'), { ssr: false });
const Snippet = dynamic(() => import('@/components/Snippet/Snippet'), {
  ssr: false
});
const SnippetTagsList = dynamic(
  () => import('@/components/Snippet/Body/SnippetTagsList'),
  { ssr: false }
);

interface AddSnippetFormLabelProps {
  label: string;
  mb?: SpaceProps['mb'];
  ml?: SpaceProps['ml'];
}

function AddSnippetFormLabel({ label, mb, ml }: AddSnippetFormLabelProps) {
  return (
    <FormLabel mb={mb} ml={ml ?? 2} sx={{ span: { color: 'primary' } }}>
      <Text fontSize="xs" display="inline">
        {label}
      </Text>
    </FormLabel>
  );
}

function AddSnippetPage() {
  const { userInput, tags, inputHelpers, handleChange, handleTagDelete } =
    useSnippetInputHandler();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);

  const disabledSaveBtn = useButtonDisabled(userInput, ['tag']);
  const saveBtnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );

  const router = useRouter();

  const handleSave = async () => {
    for (let [key, value] of Object.entries(userInput)) {
      if (!value && key !== 'tag') return;
    }

    try {
      // Get user's id and JWT
      const supabase = (await import('@/services/supabase')).default;
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const postingPermission = await fetchIsPostingAllowed(
        data.session?.user.id
      );
      if (!postingPermission.allowed) {
        setError(true);
        console.log(postingPermission.message);
        return;
      }

      const jwt = data.session?.access_token;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: userInput.title,
          snippet: userInput.snippet,
          lang: userInput.lang,
          tags: tags,
          jwt
        })
      };

      setIsUploading(true);
      const res = await fetch('/api/snippets/', options);

      if (!res.ok) {
        const err = await res.json();
        throw err;
      }

      if (res.status === 201) {
        const data = await res.json();
        router.push(
          `/snippets/${encodeURIComponent(data.snippet.lang)}/${
            data.snippet.slug
          }/`
        );
      }
    } catch (err) {
      log.error('Error while adding snippet', { err });
      setError(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Meta
        title="Create a new snippet – snipshot"
        description="Post a code snippet to snipshot on this page"
        keywords="add, create, post, new, snippet, code, snipshot"
      />
      <Alerts error={error} />
      <Grid
        templateAreas={{
          base: `"preview"
                 "form"`,
          lg: `"form preview"`
        }}
        as="section"
        templateColumns={{ sm: '1fr', lg: '1fr 1fr' }}
        gap={{ base: 2, lg: 4 }}
      >
        <GridItem area="form">
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
                px={4}
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
                size={{ base: 'lg', lg: 'md' }}
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
              h={{ base: 12, lg: 10 }}
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
            <Button
              isDisabled={disabledSaveBtn}
              onClick={handleSave}
              isLoading={isUploading}
              colorScheme={saveBtnColor}
              variant="outline"
              w="100%"
            >
              Save
            </Button>
          </VStack>
        </GridItem>
        {userInput.snippet && (
          <GridItem area="preview" mt={0} mb={1}>
            <Show above="lg">
              <Heading size="sm" mb={2}>
                Preview
              </Heading>
            </Show>
            <Snippet
              snippet={{
                ...snippetContextValueDefault,
                title: userInput.title,
                lang: userInput.lang,
                snippet: userInput.snippet,
                tags
              }}
              noFooter
            />
          </GridItem>
        )}
      </Grid>
    </>
  );
}

export default AddSnippetPage;
