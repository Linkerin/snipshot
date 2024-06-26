import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
import get from '@/services/prisma/snippetsService/get';
import { LangsType, SnippetType } from '@/services/types';

import LangPage from '@/components/Pages/LangPage';

export interface LangPageProps {
  snippetsData: SnippetType[];
  lang: LangsType;
  apiHandlerUrl: string;
}

function Lang({ snippetsData, lang, apiHandlerUrl }: LangPageProps) {
  return (
    <LangPage
      snippetsData={snippetsData}
      lang={lang}
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
    const apiHandlerUrl = `/snippets?lang=${params?.lang}`;

    try {
      const snippets = await get({ lang: params?.lang });
      const snippetsData = snippets.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=59'
      );

      return {
        props: { snippetsData, apiHandlerUrl, device, lang: params?.lang }
      };
    } catch (err) {
      log.error('Error while getting props for /snippets/lang page', {
        err,
        params
      });

      return {
        props: { snippetsData: [], apiHandlerUrl, device, lang: params?.lang }
      };
    }
  });

export default Lang;
