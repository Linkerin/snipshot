import { GetStaticProps } from 'next';

import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
import getAllSnippetsSlugs from '@/services/prisma/snippetsService/getAllSnippetsSlugs';
import getBySlug from '@/services/prisma/snippetsService/getBySlug';
import { SnippetType } from '@/services/types';
import SnippetPage from '@/components/Pages/SnippetPage/SnippetPage';

function Snippet({ snippetData }: { snippetData: SnippetType[] }) {
  return <SnippetPage snippetData={snippetData} />;
}

export async function getStaticPaths() {
  try {
    const slugsInfo = await getAllSnippetsSlugs();

    return {
      paths: slugsInfo.map(slug => ({
        params: { snippet: slug.slug, lang: slug.lang }
      })),
      fallback: 'blocking'
    };
  } catch (err) {
    console.warn('Error while fetching all ids of all snippets');
    console.error(err);

    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.snippet;
    if (!slug || slug instanceof Array) throw new Error('Invalid slug value');
    const snippet = await getBySlug(slug);
    const snippetData = snippet.map(snippet =>
      cleanObjDataTypesForNextJS(snippet)
    );

    return { props: { snippetData } };
  } catch (err) {
    console.warn('Error while fetching all snippets for SSG');
    console.error(err);

    return { props: { snippetsData: [] } };
  }
};

export default Snippet;
