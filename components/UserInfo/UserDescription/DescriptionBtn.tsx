import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react';

function DescriptionBtn(props: ButtonProps) {
  const btnHoverBgColor = useColorModeValue('gray.100', 'whiteAlpha.200');

  return (
    <Button
      size="xs"
      variant="outline"
      color="text-secondary"
      _hover={{ color: 'primary', bgColor: btnHoverBgColor }}
      {...props}
    />
  );
}

export default DescriptionBtn;
