import NextLink from 'next/link';
import { Link, Text, TextProps } from '@chakra-ui/react';

interface ActionTextProp {
  actionText?: string;
}

function LegalDisclaimer({
  actionText = 'using snipshot.dev',
  ...props
}: TextProps & ActionTextProp) {
  return (
    <Text fontSize="sm" {...props}>
      By {actionText}, you acknowledge that you have read, understood, and agree
      to be bound by our{' '}
      <Link
        as={NextLink}
        aria-label="Terms of Service page"
        href="/legal/terms-of-service"
        fontWeight="bold"
      >
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        as={NextLink}
        aria-label="Privacy Policy page"
        href="/legal/privacy-policy"
        fontWeight="bold"
      >
        Privacy Policy.
      </Link>
    </Text>
  );
}

export default LegalDisclaimer;
