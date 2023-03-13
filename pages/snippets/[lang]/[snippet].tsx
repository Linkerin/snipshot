import { GetServerSideProps } from 'next';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import getBySlug from '@/services/prisma/snippetsService/getBySlug';
import Meta from '@/components/Meta/Meta';
import Snippet from '@/components/Snippet/Snippet';
import { SnippetType } from '@/services/types';

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
      <Snippet snippet={snippet} />
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
