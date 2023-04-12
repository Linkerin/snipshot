import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

function DescriptionAlert({ error }: { error: string }) {
  return (
    <Alert status="error" mt={4}>
      <AlertIcon />
      <AlertDescription fontSize="sm">{error}</AlertDescription>
    </Alert>
  );
}

export default DescriptionAlert;
