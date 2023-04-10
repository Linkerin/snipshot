import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle
} from '@chakra-ui/react';

function UnavailableAlert() {
  return (
    <Alert
      status="warning"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={1}
      w={{ base: '80%', md: '60%', lg: '50%' }}
    >
      <AlertIcon boxSize={5} mb={2} />
      <AlertTitle fontSize="lg" mb={1}>
        Editing is not possible
      </AlertTitle>
      <AlertDescription fontSize="md">
        Ooops, seems like your are not allowed to edit this snippet (or
        something went wrong 🤔)
      </AlertDescription>
    </Alert>
  );
}

export default UnavailableAlert;
