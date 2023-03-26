import { GetServerSideProps } from 'next';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import get from '@/services/prisma/snippetsService/get';
import SnippetsList from '@/components/SnippetsList';
import { SnippetType } from '@/services/types';

import { withAxiomGetServerSideProps } from 'next-axiom';

interface HomeProps {
  snippetsData: SnippetType[];
  apiHandlerUrl: string;
}

export default function Home({ snippetsData, apiHandlerUrl }: HomeProps) {
  return <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />;
}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ log }) => {
    const apiHandlerUrl = '/snippets';

    log.warn('Test log. Snippets were fetched.', { test: 'my value' });

    try {
      const snippets = await get();

      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      return { props: { snippetsData, apiHandlerUrl } };
    } catch (err) {
      console.log('Error while getting props for index page');
      console.error(err);
      return { props: { snippetsData: [], apiHandlerUrl } };
    }
  });
