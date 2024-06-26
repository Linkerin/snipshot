import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
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
  withAxiomGetServerSideProps(async ({ req, res, params, log }) => {
    const device = {
      type: req.headers['x-device-type'] ?? '',
      model: req.headers['x-device-model'] ?? ''
    };
    const apiHandlerUrl = `/snippets?tag=${params?.tag}`;

    try {
      const snippets = await get({ tag: params?.tag });
      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=59'
      );

      return {
        props: { snippetsData, apiHandlerUrl, device, tag: params?.tag }
      };
    } catch (err) {
      log.error(`Error while fetchind data for '${params?.tag}' tag page`, {
        err,
        params
      });

      return {
        props: { snippetsData: [], apiHandlerUrl, device, tag: params?.tag }
      };
    }
  });

export default Tag;
