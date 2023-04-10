import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';

function ValidationAlert() {
  return (
    <Alert
      status="warning"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="left"
      gap={1}
      mb={5}
    >
      <AlertIcon />
      <AlertTitle>Potentially inappropriate snippet</AlertTitle>
      <AlertDescription>
        This snippet was marked as inapproprite by our automatic verification
        system.
      </AlertDescription>
      <AlertDescription>
        It hasn&apos;t been checked manually yet. Use it with caution at your
        own risk.
      </AlertDescription>
    </Alert>
  );
}

export default ValidationAlert;
