import { HomeProps } from '@/pages';
import SnippetsList from '@/components/SnippetsList';
import PageContentWrapper from '@/components/PageContentWrapper';
import Meta from '@/components/Meta/Meta';

function HomePage({ snippetsData, apiHandlerUrl }: HomeProps) {
  return (
    <PageContentWrapper>
      <Meta canonicalLink="https://snipshot.dev" />
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </PageContentWrapper>
  );
}

export default HomePage;
