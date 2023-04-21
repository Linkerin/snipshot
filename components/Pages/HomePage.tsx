import { HomeProps } from '@/pages';
import SnippetsList from '@/components/SnippetsList';
import SnippetsListWrapper from '@/components/PageContentWrapper';

function HomePage({ snippetsData, apiHandlerUrl }: HomeProps) {
  return (
    <SnippetsListWrapper>
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </SnippetsListWrapper>
  );
}

export default HomePage;
