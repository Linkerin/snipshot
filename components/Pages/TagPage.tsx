import dynamic from 'next/dynamic';

import Meta from '@/components/Meta/Meta';
import SnippetsList from '@/components/SnippetsList';
import PageContentWrapper from '@/components/PageContentWrapper';
import { TagPageProps } from '@/pages/tags/[tag]';

const NoSnippets = dynamic(() => import('@/components/NoSnippets'));

function TagPage({ snippetsData, tag, apiHandlerUrl }: TagPageProps) {
  return (
    <>
      <Meta
        title={`${tag} code snippets · snipshot`}
        keywords={`${tag}, development, programming, snippets, code, samples`}
        description={`Code snippets for ${tag} on snipshot. Get and share your snips for ${tag}`}
      />
      <PageContentWrapper>
        {snippetsData.length === 0 ? (
          <NoSnippets tag={tag} />
        ) : (
          <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
        )}
      </PageContentWrapper>
    </>
  );
}

export default TagPage;
