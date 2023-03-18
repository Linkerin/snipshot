import { createContext, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Button, Grid, GridItem } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import CheckedIcon from '@/components/Icons/CheckedIcon';
import { cleanObjDataTypesForNextJS } from '@/services/utils';
import CommentsContainer from '@/components/Comments/CommentsContainer';
import getBySlug from '@/services/prisma/snippetsService/getBySlug';
import Meta from '@/components/Meta/Meta';
import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';
import supabase from '@/services/supabase';

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
      const { data, error } = await supabase
        .from('snippets')
        .update({ verified: true })
        .eq('id', snippet.id);
      if (error) throw error;
    } catch (err) {
      console.error(`Error while verifying snippet ID ${snippet.id}`);
      console.error(err);
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
      <Grid templateColumns="4fr 3fr" gap={1}>
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
        <GridItem h="60vh">
          <SnippetIdContext.Provider value={snippet.id}>
            <CommentsContainer />
          </SnippetIdContext.Provider>
        </GridItem>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.snippet;
    if (!slug || slug instanceof Array) throw new Error('Invalid slug value');

    const snippet = await getBySlug(slug);
    const snippetData = snippet.map(snippet =>
      cleanObjDataTypesForNextJS(snippet)
    );

    return { props: { snippetData } };
  } catch (err) {
    console.error(err);
    return { props: { snippetsData: [] } };
  }
};

export default SnippetPage;
