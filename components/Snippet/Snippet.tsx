import dynamic from 'next/dynamic';
import { Card, chakra } from '@chakra-ui/react';

import fadeInAnimation from '@/services/utils/styling/fadeInAnimation';
import SnippetBarOptions from '@/components/Snippet/Card/Header/SnippetBarOptions';
import SnippetCardBody from '@/components/Snippet/Card/Body/SnippetCardBody';
import SnippetCardFooter from '@/components/Snippet/Card/Footer/SnippetCardFooter';
import SnippetCardHeader from '@/components/Snippet/Card/Header/SnippetCardHeader';
import SnippetInfoFooter from '@/components/Snippet/InfoFooter/SnippetInfoFooter';
import SnippetTagsList from '@/components/Snippet/Card/Footer/SnippetTagsList';
import { SnippetType } from '@/services/types';
import RatingInfoSkeleton from '@/components/Skeletons/RatingInfoSkeleton';

const SnippetCode = dynamic(
  () => import('@/components/Snippet/Card/Body/SnippetCode')
);
const VerificationTag = dynamic(
  () => import('@/components/Snippet/InfoFooter/VerificationTag'),
  { ssr: false }
);
const SnippetRatingInfo = dynamic(
  () => import('@/components/Snippet/InfoFooter/SnippetRatingInfo'),
  { loading: () => <RatingInfoSkeleton />, ssr: false }
);

export interface SnippetProps {
  snippet: SnippetType;
  provideRef?: React.RefObject<HTMLDivElement>;
  noFooter?: boolean;
  noOptionsBar?: boolean;
}

function Snippet({
  snippet,
  provideRef,
  noFooter = false,
  noOptionsBar = false
}: SnippetProps) {
  return (
    <chakra.article ref={provideRef} w="100%" sx={fadeInAnimation()}>
      <Card
        as="section"
        className="snippet-card"
        variant="elevated"
        size="sm"
        borderRadius={10}
        h="max-content"
        w="100%"
      >
        <SnippetCardHeader
          title={snippet.title}
          slug={snippet.slug}
          lang={snippet.lang}
        >
          {!noOptionsBar && (
            <SnippetBarOptions
              snippetId={snippet.id}
              authorId={snippet.author?.id}
              lang={snippet.lang}
              slug={snippet.slug}
            />
          )}
        </SnippetCardHeader>
        <SnippetCardBody snippet={snippet.snippet}>
          <SnippetCode snippetTree={snippet.tree} />
        </SnippetCardBody>
        <SnippetCardFooter lang={snippet.lang}>
          <SnippetTagsList tags={snippet.tags} />
        </SnippetCardFooter>
      </Card>
      {!noFooter && (
        <SnippetInfoFooter author={snippet.author} created={snippet.created}>
          <SnippetRatingInfo
            ratingId={snippet.rating.id}
            rating={snippet.rating.rating}
          />
          {snippet.verified && <VerificationTag />}
        </SnippetInfoFooter>
      )}
    </chakra.article>
  );
}

export default Snippet;
