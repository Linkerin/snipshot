import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertProps
} from '@chakra-ui/react';

interface DescriptionAlertProps extends AlertProps {
  error: string;
}

function DescriptionAlert({ error, ...props }: DescriptionAlertProps) {
  return (
    <Alert status="error" mt={4} {...props}>
      <AlertIcon />
      <AlertDescription fontSize="sm">{error}</AlertDescription>
    </Alert>
  );
}

export default DescriptionAlert;
