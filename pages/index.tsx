import { GetServerSideProps } from 'next';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import SnippetsList from '@/components/SnippetsList';
import { SnippetType } from '@/services/types';

interface HomeProps {
  snippetsData: SnippetType[];
  apiHandlerUrl: string;
}

export default function Home() {
  return (
    <>
      {/* <SnippetsList /> */}
      <h1>Snipshot</h1>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const apiHandlerUrl = '/snippets';

//   try {
//     const snippets = await get();

//     const snippetsData = snippets.map(snippet =>
//       cleanObjDataTypesForNextJS(snippet)
//     );

//     return { props: { snippetsData, apiHandlerUrl } };
//   } catch (err) {
//     console.log('Error while getting props for index page');
//     console.error(err);
//     return { props: { snippetsData: [], apiHandlerUrl } };
//   }
// };
