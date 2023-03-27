import { chakra } from '@chakra-ui/react';

export function VerticalDivider({
  color = 'currentColor'
}: {
  color?: string;
}) {
  return <chakra.div borderLeft={`1px solid ${color}`} />;
}

export default VerticalDivider;
