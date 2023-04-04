import { useContext } from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';

import { DeviceContext } from '@/context/DeviceContext';
import { nLengthArray } from '@/services/utils';
import SnippetSkeleton from './SnippetSkeleton';

function SnippetsListSkeleton({ oneColumn }: { oneColumn?: boolean }) {
  const { isMobile, isTablet } = useContext(DeviceContext);
  const gridTempalate = isMobile || isTablet || oneColumn ? '1fr' : '1fr 1fr';

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
