import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { log } from 'next-axiom';
import { Grid, GridItem } from '@chakra-ui/react';

import fetchIsPostingAllowed from '@/services/redis/services/fetchIsPostingAllowed';
import Meta from '@/components/Meta/Meta';
import SnippetInputForm from '@/components/SnippetInput/SnippetInputForm';
import useSnippetInputHandler from '@/hooks/useSnippetInputHandler';

const Alerts = dynamic(() => import('@/components/SnippetInput/Alerts'), {
  ssr: false
});
const SnippetPreview = dynamic(
  () => import('@/components/SnippetInput/SnippetPreview'),
  { ssr: false }
);

function AddSnippetPage() {
  const { userInput, tags, inputHelpers, handleChange, handleTagDelete } =
    useSnippetInputHandler();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSave = async () => {
    for (let [key, value] of Object.entries(userInput)) {
      if (!value && key !== 'tag') return;
    }

    setIsUploading(true);
    try {
      // Get user's id and JWT
      const supabase = (await import('@/services/supabase/supabase')).default;
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const postingPermission = await fetchIsPostingAllowed(
        data.session?.user.id
      );
      if (!postingPermission.allowed) {
        setError(postingPermission.message);
        setIsUploading(false);

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

      const res = await fetch('/api/snippets/', options);

      if (!res.ok) {
        const err = await res.json();
        throw err;
      }

      if (res.status === 201) {
        const data = await res.json();

        await router.push(
          `/snippets/${encodeURIComponent(data.snippet.lang)}/${
            data.snippet.slug
          }/`
        );
      }
    } catch (err) {
      log.error('Error while adding snippet', { err });
      setError(
        'Sorry, something went wrong. Please, try again in a few minutes'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Meta
        title="Create a new snippet · snipshot"
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
          <SnippetInputForm
            userInput={userInput}
            inputHelpers={inputHelpers}
            tags={tags}
            handleTagDelete={handleTagDelete}
            onChange={handleChange}
            onSave={handleSave}
            isUploading={isUploading}
          />
        </GridItem>
        {userInput.snippet && (
          <GridItem area="preview" mt={0} mb={1}>
            <SnippetPreview userInput={userInput} tags={tags} />
          </GridItem>
        )}
      </Grid>
    </>
  );
}

export default AddSnippetPage;