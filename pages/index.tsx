import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
import get from '@/services/prisma/snippetsService/get';
import SnippetsList from '@/components/SnippetsList';
import { SnippetType } from '@/services/types';

interface HomeProps {
  snippetsData: SnippetType[];
  apiHandlerUrl: string;
}

export default function Home({ snippetsData, apiHandlerUrl }: HomeProps) {
  return <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />;
}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ req, res, log }) => {
    const device = {
      type: req.headers['x-device-type'] ?? '',
      model: req.headers['x-device-model'] ?? ''
    };
    const apiHandlerUrl = '/snippets';

    try {
      const snippets = await get();

      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=180, stale-while-revalidate=59'
      );

      return { props: { snippetsData, apiHandlerUrl, device } };
    } catch (err) {
      log.error('Error while getting props for index page', { err });

      return { props: { snippetsData: [], apiHandlerUrl, device } };
    }
  });
