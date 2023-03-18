import { createContext } from 'react';
import { GetServerSideProps } from 'next';
import { Grid, GridItem } from '@chakra-ui/react';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import CommentsContainer from '@/components/Comments/CommentsContainer';
import getBySlug from '@/services/prisma/snippetsService/getBySlug';
import Meta from '@/components/Meta/Meta';
import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';

export const SnippetIdContext = createContext<string | null>(null);

function SnippetPage({ snippetData }: { snippetData: SnippetType[] }) {
  const [snippet] = snippetData;

  let description = `Page of "${snippet.title}" snippet source code in ${snippet.lang}.`;
  if (snippet.author?.name) {
    description += ` Created by ${snippet.author.name}`;
  }

  const keywordsTags = snippet.tags?.join(', ');

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
