import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Grid, GridItem } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import fetchIsPostingAllowed from '@/services/redis/services/fetchIsPostingAllowed';
import LoadingInfo from './LoadingInfo';
import Meta from '@/components/Meta/Meta';
import PageContentWrapper from '@/components/PageContentWrapper';
import SnippetInputForm from '@/components/SnippetInput/SnippetInputForm';
import SnippetSkeleton from '@/components/Skeletons/SnippetSkeleton';
import useSnippetInputHandler from '@/hooks/forPages/useSnippetInputHandler';

const Alerts = dynamic(() => import('@/components/SnippetInput/Alerts'), {
  ssr: false
});
const SnippetPreview = dynamic(
  () => import('@/components/SnippetInput/SnippetPreview'),
  { loading: () => <SnippetSkeleton />, ssr: false }
);
const UnavailablePlaceholder = dynamic(
  () => import('./UnavailablePlaceholder'),
  {
    ssr: false
  }
);

function EditSnippetPage() {
  const {
    userInput,
    tags,
    inputHelpers,
    handleChange,
    handleTagDelete,
    updateUserValues
  } = useSnippetInputHandler();
  const [isLoadingSnippet, setIsLoadingSnippet] = useState(true);
  const [unavailableSnippet, setUnavailableSnippet] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const [user] = useContext(AuthContext);

  const router = useRouter();
  const { snippetId } = router.query;

  const handleSave = async () => {
    for (let [key, value] of Object.entries(userInput)) {
      if (!value && key !== 'tag') return;
    }

    setIsUploading(true);
    setError('');
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
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: userInput.title,
          snippet: userInput.snippet,
          lang: userInput.lang,
          tags: tags,
          snippetId,
          jwt
        })
      };

      const res = await fetch('/api/snippets/', options);

      if (!res.ok) {
        const err = await res.json();
        throw err;
      }

      if (res.status === 200) {
        const data = await res.json();

        typeof window !== 'undefined' &&
          (await router.push(
            `/snippets/${encodeURIComponent(data.snippet.lang)}/${
              data.snippet.slug
            }?status=edited`
          ));
      }
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.error('Error while editing snippet', { err });
      setError(
        'Sorry, something went wrong. Please, try again in a few minutes'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleUnavailableBackClick: MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      router.back();
    },
    [router]
  );

  // Initial fetch of snippet data
  useEffect(() => {
    // Check whether the user is authenticated
    if (!user?.id || !snippetId) {
      setUnavailableSnippet(true);
      setIsLoadingSnippet(false);
      return;
    }

    const controller = new AbortController();

    const fetchSnippet = async () => {
      try {
        const supabase = (await import('@/services/supabase/supabase')).default;

        const { data, error } = await supabase
          .from('snippets')
          .select(
            `title, 
             snippet,
             lang,
             tags,
             user_id`
          )
          .eq('id', snippetId)
          .abortSignal(controller.signal);
        if (error) throw error;
        const snippet = data[0];
        if (snippet['user_id'] !== user?.id) {
          setUnavailableSnippet(true);
          setIsLoadingSnippet(false);

          return;
        }

        setUnavailableSnippet(false);
        updateUserValues(
          {
            title: snippet.title,
            snippet: snippet.snippet,
            lang: snippet.lang,
            tag: ''
          },
          snippet.tags
        );
        setIsLoadingSnippet(false);
      } catch (err) {
        const log = (await import('next-axiom')).log;
        log.error('Error while fetching snippet data for editing', {
          err,
          snippetId
        });
        setUnavailableSnippet(true);
      } finally {
        setIsLoadingSnippet(false);
      }
    };

    fetchSnippet();

    () => controller.abort();
  }, [user?.id, snippetId, updateUserValues]);

  return (
    <>
      <Meta
        title="Editing · snipshot"
        description="Edit your code snippet on this page"
        keywords="edit, snippet, code, snipshot"
      />
      <PageContentWrapper>
        {isLoadingSnippet ? (
          <LoadingInfo />
        ) : (
          <>
            {unavailableSnippet && (
              <UnavailablePlaceholder
                onBackClick={handleUnavailableBackClick}
              />
            )}
            {!unavailableSnippet && (
              <>
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
            )}
          </>
        )}
      </PageContentWrapper>
    </>
  );
}

export default EditSnippetPage;
