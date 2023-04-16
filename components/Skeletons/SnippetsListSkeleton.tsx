import { Grid, GridItem } from '@chakra-ui/react';

import nLengthArray from '@/services/utils/nLengthArray';
import SnippetSkeleton from './SnippetSkeleton';

function SnippetsListSkeleton({ oneColumn }: { oneColumn?: boolean }) {
  const gridTempalate = oneColumn ? '1fr' : { base: '1fr', lg: '1fr 1fr' };

  return (
    <>
      <Grid templateColumns={gridTempalate} gap={4}>
        {nLengthArray(8).map(elem => {
          return (
            <GridItem key={elem} alignItems="flex-start">
              <SnippetSkeleton />
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}

export default SnippetsListSkeleton;
