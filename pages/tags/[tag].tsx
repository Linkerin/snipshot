import { GetServerSideProps } from 'next';
import { Text } from '@chakra-ui/react';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import get from '@/services/prisma/snippetsService/get';
import Meta from '@/components/Meta/Meta';
import SnippetsList from '@/components/SnippetsList';
import { SnippetType } from '@/services/types';

interface TagProps {
  snippetsData: SnippetType[];
  tag: string;
  apiHandlerUrl: string;
}

function Tag({ snippetsData, tag, apiHandlerUrl }: TagProps) {
  if (snippetsData.length === 0) {
    return (
      <Text mt={5} fontSize="2xl" textAlign="center">
        {`No snippets for "${tag}" tag yet 😞`}
      </Text>
    );
  }
  return (
    <>
      <Meta
        title={`snipshot — ${tag} code snippets`}
        keywords={`${tag}, development, programming, snippets, code, samples`}
        description={`Code snippets for ${tag} on snipshot. Get and share your snips for ${tag}`}
      />
      <SnippetsList snippetsData={snippetsData} fetchUrl={apiHandlerUrl} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apiHandlerUrl = `/snippets?tag=${params?.tag}`;
  try {
    const snippets = await get({ tag: params?.tag });
    const snippetsData = snippets.map(snippet =>
      cleanObjDataTypesForNextJS(snippet)
    );

    return { props: { snippetsData, apiHandlerUrl, tag: params?.tag } };
  } catch (err) {
    console.error(err);
    return { props: { snippetsData: [], apiHandlerUrl, tag: params?.tag } };
  }
};

export default Tag;
