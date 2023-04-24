import { chakra } from '@chakra-ui/react';

export function VerticalDivider({
  color = 'primary-dark'
}: {
  color?: string;
}) {
  return <chakra.div borderLeft={`1px`} borderColor={color} />;
}

export default VerticalDivider;
