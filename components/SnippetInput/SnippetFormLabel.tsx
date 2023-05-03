import { FormLabel, SpaceProps, Text } from '@chakra-ui/react';

interface SnippetFormLabelProps {
  label: string;
  mb?: SpaceProps['mb'];
  ml?: SpaceProps['ml'];
}

function SnippetFormLabel({ label, mb, ml }: SnippetFormLabelProps) {
  return (
    <FormLabel mb={mb} ml={ml ?? 2} sx={{ span: { color: 'primary' } }}>
      <Text fontSize="xs" display="inline">
        {label}
      </Text>
    </FormLabel>
  );
}

export default SnippetFormLabel;
