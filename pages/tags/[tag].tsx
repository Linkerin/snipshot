import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import get from '@/services/prisma/snippetsService/get';
import { SnippetType } from '@/services/types';
import TagPage from '@/components/Pages/TagPage';

export interface TagPageProps {
  snippetsData: SnippetType[];
  tag: string;
  apiHandlerUrl: string;
}

function Tag({ snippetsData, tag, apiHandlerUrl }: TagPageProps) {
  return (
    <TagPage
      snippetsData={snippetsData}
      tag={tag}
      apiHandlerUrl={apiHandlerUrl}
    />
  );
}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ params, log }) => {
    const apiHandlerUrl = `/snippets?tag=${params?.tag}`;
    try {
      const snippets = await get({ tag: params?.tag });
      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      return { props: { snippetsData, apiHandlerUrl, tag: params?.tag } };
    } catch (err) {
      log.error(`Error while fetchind data for '${params?.tag}' tag page`, {
        err
      });

      return { props: { snippetsData: [], apiHandlerUrl, tag: params?.tag } };
    }
  });

export default Tag;
