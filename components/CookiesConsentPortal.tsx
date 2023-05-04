import { useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  Portal,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

interface CookiesConsentPortalProps {
  show: boolean;
  onClose: () => void;
}

function CookiesConsentPortal({ show, onClose }: CookiesConsentPortalProps) {
  const router = useRouter();
  const allowedPage = useMemo(
    () =>
      router.pathname.includes('/legal/') || router.pathname.includes('/about'),
    [router.pathname]
  );

  const btnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );

  return (
    <Portal>
      <Box
        className="overlay"
        display={show ? 'flex' : 'none'}
        alignItems="flex-end"
        justifyContent="center"
        position="fixed"
        zIndex={5}
        bottom={0}
        left={0}
        bg={allowedPage ? 'none' : 'blackAlpha.600'}
        backdropFilter={allowedPage ? 'none' : 'blur(5px)'}
        pb={{ base: '1rem', lg: '2rem' }}
        w="100dvw"
        h={allowedPage ? 'fit-content' : '100dvh'}
      >
        <Card
          as="section"
          maxWidth="90dvw"
          width={{ lg: '40%' }}
          sx={{
            animation: '2s shake infinite alternate',
            '@keyframes shake': {
              from: { transform: 'scale(1.04)' },
              to: { transform: 'scale(0.98)' }
            }
          }}
        >
          <CardBody px={{ base: 6, lg: 10 }} pb={0}>
            <Text fontSize="lg" textAlign="center">
              Our application uses stricly necessary cookies 🍪. Before
              continuing, you agree and accept our{' '}
              <Link
                as={NextLink}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/legal/privacy-policy#cookies`}
                aria-label="Navigate to Privacy Policy page"
                fontWeight="bold"
              >
                Privacy Policy
              </Link>
              .
            </Text>
          </CardBody>
          <CardFooter as="footer" justifyContent="center">
            <Button colorScheme={btnColor} size="lg" onClick={onClose}>
              Accept
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </Portal>
  );
}

export default CookiesConsentPortal;
