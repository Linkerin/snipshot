import { createContext, useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { log } from 'next-axiom';
import { Grid, GridItem } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import Meta from '@/components/Meta/Meta';
import Snippet from '../Snippet/Snippet';
import { SnippetType } from '@/services/types';

const Button = dynamic(
  () => import('@chakra-ui/react').then(chakra => chakra.Button),
  { ssr: false }
);

const CheckedIcon = dynamic(() => import('@/components/Icons/CheckedIcon'), {
  ssr: false
});
const CommentsContainer = dynamic(
  () => import('@/components/Comments/CommentsContainer'),
  { ssr: false }
);

export const SnippetIdContext = createContext<string | null>(null);

function SnippetPage({ snippetData }: { snippetData: SnippetType[] }) {
  const [snippet] = snippetData;
  const [verifying, setVerifying] = useState(false);

  const user = useContext(AuthContext);

  let description = `Page of "${snippet.title}" snippet source code in ${snippet.lang}.`;
  if (snippet.author?.name) {
    description += ` Created by ${snippet.author.name}`;
  }

  const keywordsTags = snippet.tags?.join(', ');

  const handleVerification = async () => {
    if (!user?.appRole?.includes('admin')) return;

    setVerifying(true);
    try {
      const supabase = (await import('@/services/supabase')).default;
      const { data, error } = await supabase
        .from('snippets')
        .update({ verified: true })
        .eq('id', snippet.id);
      if (error) throw error;
    } catch (err) {
      log.error(`Error while verifying snippet ID ${snippet.id}`, {
        err,
        snippetId: snippet.id
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      <Meta
        title={`${snippet.title} - snipshot`}
        description={description}
        keywords={`development, programming, snippets, code, samples${
          keywordsTags ? `, ${keywordsTags}` : ''
        }`}
      />
      <Grid templateColumns={{ base: '1fr', lg: '4fr 3fr' }} gap={1}>
        <GridItem>
          <Snippet snippet={snippet} />
          {!snippet.verified && user?.appRole?.includes('admin') && (
            <Button
              rightIcon={<CheckedIcon boxSize={4} />}
              size="sm"
              colorScheme="green"
              variant="outline"
              px={2}
              mt={3}
              isLoading={verifying}
              onClick={handleVerification}
            >
              Verify snippet
            </Button>
          )}
        </GridItem>
        <GridItem>
          <SnippetIdContext.Provider value={snippet.id}>
            <CommentsContainer />
          </SnippetIdContext.Provider>
        </GridItem>
      </Grid>
    </>
  );
}

export default SnippetPage;
