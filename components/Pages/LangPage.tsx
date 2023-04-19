import dynamic from 'next/dynamic';

import Meta from '@/components/Meta/Meta';
import { LangPageProps } from '@/pages/snippets/[lang]';
import SnippetsList from '@/components/SnippetsList';

const NoSnippets = dynamic(() => import('@/components/NoSnippets'));

function LangPage({ snippetsData, lang, apiHandlerUrl }: LangPageProps) {
  return (
    <>
      <Meta
        title={`${lang} code snippets · snipshot`}
        keywords={`${lang}, development, programming, snippets, code, samples`}
        description={`${lang} code snippets on snipshot. Get and share your ${lang} snips`}
      />
      {snippetsData.length === 0 ? (
        <NoSnippets lang={lang} />
      ) : (
        <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
      )}
    </>
  );
}

export default LangPage;
