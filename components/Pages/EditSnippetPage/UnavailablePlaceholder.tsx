import { Button, Center } from '@chakra-ui/react';

import UnavailableAlert from './UnavailableAlert';

function UnavailablePlaceholder({
  onBackClick
}: {
  onBackClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Center mt={20} flexDirection="column" gap={5}>
      <UnavailableAlert />
      <Button
        size="lg"
        variant="outline"
        w={{ base: '80%', md: '60%', lg: '50%' }}
        onClick={onBackClick}
      >
        Go back
      </Button>
    </Center>
  );
}

export default UnavailablePlaceholder;
