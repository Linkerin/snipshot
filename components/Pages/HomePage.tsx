import { HomeProps } from '@/pages';
import SnippetsList from '@/components/SnippetsList';
import PageContentWrapper from '@/components/PageContentWrapper';

function HomePage({ snippetsData, apiHandlerUrl }: HomeProps) {
  return (
    <PageContentWrapper>
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </PageContentWrapper>
  );
}

export default HomePage;
