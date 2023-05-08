import { GetServerSideProps } from 'next';
import { withAxiomGetServerSideProps } from 'next-axiom';

import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
import getBySlug from '@/services/prisma/snippetsService/getBySlug';
import { SnippetType } from '@/services/types';
import SnippetPage from '@/components/Pages/SnippetPage/SnippetPage';

function Snippet({ snippetData }: { snippetData: SnippetType[] }) {
  return <SnippetPage snippetData={snippetData} />;
}

export const getServerSideProps: GetServerSideProps =
  withAxiomGetServerSideProps(async ({ req, res, params, log }) => {
    const device = {
      type: req.headers['x-device-type'] ?? '',
      model: req.headers['x-device-model'] ?? ''
    };
    const slug = params?.snippet ?? null;

    try {
      if (Array.isArray(slug) || slug === null) {
        throw new Error('Invalid `slug` value');
      }

      const snippet = await getBySlug(slug);
      const snippetData = snippet.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=59'
      );

      return {
        props: { snippetData, device }
      };
    } catch (err) {
      log.error('Error while getting props for /snippets/lang page', {
        err,
        params
      });

      return { notFound: true };
    }
  });

export default Snippet;
