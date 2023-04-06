import { Spinner, SpinnerProps } from '@chakra-ui/react';

function CustomSpinner(props: SpinnerProps) {
  return (
    <Spinner
      thickness="5px"
      color="primary"
      emptyColor="gray.200"
      size="xl"
      speed="0.5s"
      {...props}
    />
  );
}

export default CustomSpinner;
