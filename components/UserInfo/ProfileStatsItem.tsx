import { Stack, Text, SpaceProps, TypographyProps } from '@chakra-ui/react';

interface ProfileStatsItemProps {
  value: null | number | string;
  label: 'snips' | 'favorites' | 'rating';
  py?: SpaceProps['py'];
  valueFontSize?: TypographyProps['fontSize'];
  labelFontSize?: TypographyProps['fontSize'];
}

function ProfileStatsItem({
  value,
  label,
  py,
  valueFontSize,
  labelFontSize = 'sm'
}: ProfileStatsItemProps) {
  return (
    <Stack alignItems="center" spacing={0} py={py}>
      <Text as="b" fontSize={valueFontSize}>
        {value}
      </Text>
      <Text fontSize={labelFontSize} color="text-secondary">
        {label}
      </Text>
    </Stack>
  );
}

export default ProfileStatsItem;
