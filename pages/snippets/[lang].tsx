import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';
import { Text } from '@chakra-ui/react';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import get from '@/services/prisma/snippetsService/get';
import Meta from '@/components/Meta/Meta';
import SnippetsList from '@/components/SnippetsList';
import { SnippetType } from '@/services/types';

interface LangProps {
  snippetsData: SnippetType[];
  lang: string;
  apiHandlerUrl: string;
}

function Lang({ snippetsData, lang, apiHandlerUrl }: LangProps) {
  if (snippetsData.length === 0) {
    return (
      <>
        <Text mt={5} fontSize="2xl" align="center">
          {`No snippets for ${lang} yet 😞`}
          <br />
          Be the first to create!
        </Text>
      </>
    );
  }

  return (
    <>
      <Meta
        title={`${lang} code snippets – snipshot`}
        keywords={`${lang}, development, programming, snippets, code, samples`}
        description={`${lang} code snippets on snipshot. Get and share your ${lang} snips`}
      />
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ res, params, log }) => {
    const apiHandlerUrl = `/snippets?lang=${params?.lang}`;

    try {
      const snippets = await get({ lang: params?.lang });
      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
      );

      return { props: { snippetsData, apiHandlerUrl, lang: params?.lang } };
    } catch (err) {
      log.error('Error while getting props for /snippets/lang page', {
        err,
        params
      });

      return { props: { snippetsData: [], apiHandlerUrl, lang: params?.lang } };
    }
  });

export default Lang;
